#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

export function localDateStamp(now = new Date()) {
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
}

export function createOutputDirectory({ root = path.join(process.cwd(), 'output'), date = localDateStamp() } = {}) {
  const parsed = typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(date + 'T00:00:00Z') : null;
  if (!parsed || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    throw new Error('日期请使用有效的 YYYY-MM-DD 格式。');
  }
  const outputRoot = path.resolve(root);
  fs.mkdirSync(outputRoot, { recursive: true });
  for (let sequence = 1; ; sequence++) {
    const name = date + (sequence === 1 ? '' : '-' + String(sequence).padStart(2, '0'));
    const directory = path.join(outputRoot, name);
    try {
      fs.mkdirSync(directory);
      return directory;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
    }
  }
}

function main() {
  const { values } = parseArgs({ options: {
    root: { type: 'string' }, date: { type: 'string' }, help: { type: 'boolean', short: 'h' }
  } });
  if (values.help) {
    console.log('node create-output-dir.mjs [--root output] [--date YYYY-MM-DD]\n默认使用当前工作目录下的 output 和本机当天日期；同日多次生成自动追加 -02、-03。');
    return;
  }
  console.log(JSON.stringify({ directory: createOutputDirectory(values) }, null, 2));
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  try { main(); } catch (error) { console.error('创建输出目录失败：' + error.message); process.exitCode = 1; }
}
