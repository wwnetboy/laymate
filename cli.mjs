#!/usr/bin/env node
// Installs the laymate skill into the cross-agent skills directory
// (~/.agents/skills). Claude Code is the one major agent that does not read
// that directory, so it gets an extra copy in ~/.claude/skills when detected.
// Zero dependencies; requires Node.js 20+.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const skillName = "laymate";
const payload = ["SKILL.md", "agents", "assets", "references", "scripts"];

const agentsSkillsDir = () => path.join(homedir(), ".agents", "skills");
const claudeSkillsDir = () => path.join(homedir(), ".claude", "skills");

// ~/.agents/skills is read natively by Codex, Cursor, Gemini CLI, VS Code,
// ZCode and other agents following the open convention; unknown and future
// agents work too, with no per-agent knowledge needed here.
const STANDARD_READERS =
  "Read natively by Codex, Cursor, Gemini CLI, VS Code/Copilot, ZCode and other agents following the open convention.";

// Claude Code only reads its own ~/.claude/skills. A ~/.claude root holding a
// single stray settings.json is not a real install.
function claudeCodeInstalled() {
  if (existsSync(path.join(homedir(), ".claude.json"))) return true;
  if (existsSync(claudeSkillsDir())) return true;
  const root = path.join(homedir(), ".claude");
  return existsSync(root) && readdirSync(root).length > 1;
}

function usage() {
  console.log(`laymate-skill - WeChat Official Account article skill

Usage:
  npx laymate-skill [install] [--claude] [--no-claude] [--dir <path>]
      Install into ~/.agents/skills (the cross-agent directory) and, when
      Claude Code is detected, also into ~/.claude/skills. --claude forces
      the Claude Code copy, --no-claude skips it, --dir installs into one
      custom directory only. Re-run to update.
  npx laymate-skill uninstall [--dir <path>]
      Remove the skill from the directories above.
  npx laymate-skill list
      Show install locations and status.`);
}

function expandDir(target) {
  if (target === "~") return homedir();
  if (target.startsWith("~/") || target.startsWith("~\\")) {
    return path.join(homedir(), target.slice(2));
  }
  return path.resolve(target);
}

function countFiles(target) {
  if (statSync(target).isFile()) return 1;
  let count = 0;
  for (const entry of readdirSync(target, { withFileTypes: true })) {
    count += entry.isDirectory() ? countFiles(path.join(target, entry.name)) : 1;
  }
  return count;
}

function installInto(skillsDir, label) {
  const dest = path.join(skillsDir, skillName);
  const updated = existsSync(dest);
  if (updated) rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  let files = 0;
  for (const item of payload) {
    cpSync(path.join(pkgRoot, item), path.join(dest, item), { recursive: true });
    files += countFiles(path.join(dest, item));
  }
  console.log(`${updated ? "Updated" : "Installed"} laymate for ${label}`);
  console.log(`  ${dest}  (${files} files)`);
}

function removeFrom(skillsDir, label) {
  const dest = path.join(skillsDir, skillName);
  if (!existsSync(dest)) return;
  rmSync(dest, { recursive: true, force: true });
  console.log(`Removed laymate for ${label}`);
  console.log(`  ${dest}`);
}

const argv = process.argv.slice(2);
let command = "install";
if (["install", "uninstall", "list", "help", "--help", "-h"].includes(argv[0])) {
  command = argv[0] === "--help" || argv[0] === "-h" ? "help" : argv[0];
  argv.shift();
}

let dirFlag = null;
let claudeFlag = null; // "force" | "skip" | null (auto-detect)
for (let i = 0; i < argv.length; i += 1) {
  if (argv[i] === "--dir") {
    dirFlag = argv[i + 1];
    if (!dirFlag) {
      console.error("--dir requires a path.");
      process.exit(1);
    }
    i += 1;
  } else if (argv[i] === "--claude") {
    claudeFlag = "force";
  } else if (argv[i] === "--no-claude") {
    claudeFlag = "skip";
  } else {
    console.error(`Unknown argument "${argv[i]}".`);
    usage();
    process.exit(1);
  }
}

if (command === "help") {
  usage();
  process.exit(0);
}

if (command === "list") {
  const agents = agentsSkillsDir();
  console.log(`${agents}  ${existsSync(path.join(agents, skillName)) ? "[laymate installed]" : "[laymate not installed]"}`);
  console.log(`  ${STANDARD_READERS}`);
  const claude = claudeSkillsDir();
  const detected = claudeCodeInstalled();
  console.log(
    `${claude}  ${existsSync(path.join(claude, skillName)) ? "[laymate installed]" : "[laymate not installed]"}  (Claude Code${detected ? " detected" : " not detected"})`,
  );
  process.exit(0);
}

if (dirFlag) {
  const custom = { skillsDir: expandDir(dirFlag), label: "custom directory" };
  if (command === "uninstall") removeFrom(custom.skillsDir, custom.label);
  else installInto(custom.skillsDir, custom.label);
} else {
  const standard = { skillsDir: agentsSkillsDir(), label: "all agents (~/.agents/skills)" };
  const claude = { skillsDir: claudeSkillsDir(), label: "Claude Code" };
  const targets = [standard];
  const wantClaude = claudeFlag === "force" || (claudeFlag !== "skip" && claudeCodeInstalled());
  if (wantClaude) targets.push(claude);
  for (const { skillsDir, label } of targets) {
    if (command === "uninstall") removeFrom(skillsDir, label);
    else installInto(skillsDir, label);
  }
  if (command === "install") {
    console.log(`\n${STANDARD_READERS}`);
  }
}

if (command === "install") {
  console.log("Done. Reopen your assistant if laymate does not show up.");
}
