# Laymate-Skill 公众号排版助手

**中文** | [English](README.en.md)

![公众号排版助手：多样模板，一键复制](assets/readme-cover-zh.jpg)

告诉 AI 助手你想写什么，提供主题或参考链接，再选一个喜欢的模板，就能生成写好并排好版的公众号文章。打开生成的 HTML，即可一键复制到微信公众号。

**目前有 59 款模板，后续会持续更新。** 如果这个项目对你有帮助，欢迎点个 **Star ⭐**，支持我们继续完善。

适用于 Claude Code、Codex、Cursor 等支持 Skill、可以执行本地命令的 AI 助手。

## 安装

**方式一：npm 一键安装（推荐）**

需要 **Node.js 20 或更高版本**。在终端运行：

```bash
npx laymate-skill@latest
```

安装器会把 Skill 装进跨工具的 `~/.agents/skills` 目录，Codex、Cursor、Gemini CLI、VS Code、ZCode 等助手都原生读取；检测到 Claude Code 时会额外装一份到 `~/.claude/skills`（它不读标准目录）。再次运行同一命令即可更新，卸载用 `npx laymate-skill uninstall`；自定义目录用 `--dir`，强制增减 Claude Code 副本用 `--claude` / `--no-claude`。

**方式二：交给 AI 助手**

复制这句话，发给你的 AI 助手：

```text
请将这个仓库中的 Skill 安装到当前助手的技能目录：https://github.com/wwnetboy/laymate-skill
```

更新时，告诉它「从同一仓库更新 laymate」即可。

<details>
<summary>手动安装</summary>

下载 [仓库 ZIP](https://github.com/wwnetboy/laymate-skill/archive/refs/heads/main.zip)，在所用助手的技能目录中新建 `laymate` 文件夹，再把仓库根目录中的 `SKILL.md`、`agents`、`assets`、`references` 和 `scripts` 复制进去：

| AI 助手 | 个人技能目录 |
| --- | --- |
| Codex、Cursor、Gemini CLI、VS Code、ZCode 等 | `~/.agents/skills/`（跨工具通用） |
| [Claude Code](https://code.claude.com/docs/en/skills#choose-where-skills-load) | `~/.claude/skills/` |

其他客户端按其说明安装。请复制完整 Skill 文件；安装后若未识别，重新打开客户端。

</details>

## 使用

告诉助手文章主题或参考链接，也可以指定模板、目标读者、字数和写作风格。

**示例一：指定模板写文章**

```text
使用 laymate，用「翡翠序章」写一篇介绍 AI 编程的公众号文章。
```

**示例二：只给主题写文章**

```text
使用 laymate，写一篇关于时间管理的公众号文章。
```

**示例三：不写技能名**

```text
写一篇介绍 AI 编程的公众号文章。
```

助手需已安装本技能并支持自动选择 Skill；未自动调用时，可加上技能名。

未指定模板时，助手会根据内容推荐，帮助你选择；也可以先用「翡翠序章」生成文章，再在页面里切换模板。

已有文章也可以交给助手润色或只做排版。代码会自动高亮，配图可选原图、圆角阴影或苹果窗口外观。

### 发布到公众号

1. 打开生成的 HTML，查看排版，选择喜欢的模板。
2. 点击「复制标题」和「一键复制正文」，分别粘贴到公众号编辑器。
3. 在公众号中预览，确认效果后发布。

如果图片没有随正文粘贴，可以在页面底部保存图片，再上传到公众号。

## 模板预览

下面展示部分模板。点击图片可放大，更多样式见[模板目录](references/template-catalog.md)。

<table>
  <tr>
    <td width="33%" align="center"><b>翡翠序章</b><br><sub>emerald-prologue</sub></td>
    <td width="33%" align="center"><b>樱粉柔砂</b><br><sub>sakura-grain</sub></td>
    <td width="33%" align="center"><b>紫序菱线</b><br><sub>lilac-diamond</sub></td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top"><a href="assets/previews/emerald-prologue.png"><img src="assets/previews/emerald-prologue.png" width="260" height="360" alt="翡翠序章模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/sakura-grain.png"><img src="assets/previews/sakura-grain.png" width="260" height="360" alt="樱粉柔砂模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/lilac-diamond.png"><img src="assets/previews/lilac-diamond.png" width="260" height="360" alt="紫序菱线模板实际排版预览"></a></td>
  </tr>
  <tr>
    <td width="33%" align="center"><b>杏橙暖报</b><br><sub>apricot-bulletin</sub></td>
    <td width="33%" align="center"><b>蓝绿步骤</b><br><sub>blue-green-guide</sub></td>
    <td width="33%" align="center"><b>手绘蓝笺</b><br><sub>handdrawn-blue</sub></td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top"><a href="assets/previews/apricot-bulletin.png"><img src="assets/previews/apricot-bulletin.png" width="260" height="360" alt="杏橙暖报模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/blue-green-guide.png"><img src="assets/previews/blue-green-guide.png" width="260" height="360" alt="蓝绿步骤模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/handdrawn-blue.png"><img src="assets/previews/handdrawn-blue.png" width="260" height="360" alt="手绘蓝笺模板实际排版预览"></a></td>
  </tr>
  <tr>
    <td width="33%" align="center"><b>晴蓝方格</b><br><sub>sky-grid</sub></td>
    <td width="33%" align="center"><b>蓝标简报</b><br><sub>blue-bar-brief</sub></td>
    <td width="33%" align="center"><b>青绿出游</b><br><sub>green-flight</sub></td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top"><a href="assets/previews/sky-grid.png"><img src="assets/previews/sky-grid.png" width="260" height="360" alt="晴蓝方格模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/blue-bar-brief.png"><img src="assets/previews/blue-bar-brief.png" width="260" height="360" alt="蓝标简报模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/green-flight.png"><img src="assets/previews/green-flight.png" width="260" height="360" alt="青绿出游模板实际排版预览"></a></td>
  </tr>
  <tr>
    <td width="33%" align="center"><b>墨曜刊</b><br><sub>obsidian-editorial</sub></td>
    <td width="33%" align="center"><b>朱砂书卷</b><br><sub>cinnabar-folio</sub></td>
    <td width="33%" align="center"><b>城市时报</b><br><sub>city-newspaper</sub></td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top"><a href="assets/previews/obsidian-editorial.png"><img src="assets/previews/obsidian-editorial.png" width="260" height="360" alt="墨曜刊模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/cinnabar-folio.png"><img src="assets/previews/cinnabar-folio.png" width="260" height="360" alt="朱砂书卷模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/city-newspaper.png"><img src="assets/previews/city-newspaper.png" width="260" height="360" alt="城市时报模板实际排版预览"></a></td>
  </tr>
  <tr>
    <td width="33%" align="center"><b>奶油来信</b><br><sub>cream-letter</sub></td>
    <td width="33%" align="center"><b>旅途票根</b><br><sub>travel-ticket</sub></td>
    <td width="33%" align="center"><b>网格宣言</b><br><sub>swiss-grid</sub></td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top"><a href="assets/previews/cream-letter.png"><img src="assets/previews/cream-letter.png" width="260" height="360" alt="奶油来信模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/travel-ticket.png"><img src="assets/previews/travel-ticket.png" width="260" height="360" alt="旅途票根模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/swiss-grid.png"><img src="assets/previews/swiss-grid.png" width="260" height="360" alt="网格宣言模板实际排版预览"></a></td>
  </tr>
  <tr>
    <td width="33%" align="center"><b>极客终端</b><br><sub>terminal-lab</sub></td>
    <td width="33%" align="center"><b>工程蓝图</b><br><sub>engineering-blueprint</sub></td>
    <td width="33%" align="center"><b>午夜荧屏</b><br><sub>midnight-screen</sub></td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top"><a href="assets/previews/terminal-lab.png"><img src="assets/previews/terminal-lab.png" width="260" height="360" alt="极客终端模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/engineering-blueprint.png"><img src="assets/previews/engineering-blueprint.png" width="260" height="360" alt="工程蓝图模板实际排版预览"></a></td>
    <td width="33%" align="center" valign="top"><a href="assets/previews/midnight-screen.png"><img src="assets/previews/midnight-screen.png" width="260" height="360" alt="午夜荧屏模板实际排版预览"></a></td>
  </tr>
</table>

<details>
<summary>已有 Markdown？也可以直接生成 HTML</summary>

下载仓库后，在仓库根目录运行下面的命令。`article.md` 是你的文章文件，生成后打开 `article.html` 即可。

```bash
node scripts/render-article.mjs --input article.md --output article.html --template emerald-prologue
```

提示框、步骤、表格等写法见[文章组件说明](references/components.md)。

</details>

## 持续更新与反馈

我们会继续增加模板、改进排版与公众号复制体验。欢迎 [Star 这个项目](https://github.com/wwnetboy/laymate-skill)，也欢迎通过 [Issues](https://github.com/wwnetboy/laymate-skill/issues) 提交模板建议或使用问题。

## 开源协议

本项目采用 [MIT 协议](LICENSE)，允许个人和商业使用、修改、二次开发及分发。分发时需保留版权声明和许可证。项目按现状提供，无任何担保。

第三方库保留各自协议：[Marked（MIT）](scripts/vendor/LICENSE)、[highlight.js（BSD-3-Clause）](scripts/vendor/highlight/LICENSE)。
