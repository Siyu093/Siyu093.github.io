# Siyu Chen Academic CV Website — GitHub Pages

这是完整替换版，采用 Inter 字体、蓝白配色和 Academic CV 时间轴。

## 上传

先备份当前仓库文件。在 GitHub 仓库 `Siyu093/Siyu093.github.io` 中上传本 ZIP **解压后**的 `index.html`、`styles.css`、`app.js`、`content.json` 并覆盖对应同名文件；`assets` 文件夹可以保留原来的头像。不要把 ZIP 本身上传到仓库。

## 自己更新

- `content.json`：所有文字、教育、职位、教学、获奖、News、论文信息；严格保持双引号和逗号格式。
- `publications` 列表：新增文章时按现有条目结构写 `title`、`authors`、`year`、`journal`、`doi`、`url`；设 `selected: true` 就会出现在 Selected Publications。
- `education`：按数组排列顺序显示，Yale 放在 PhD 下方。
- `experience`, `teaching`, `awards`, `news`, `service`：按现有条目格式添加。
- `styles.css`：字体字号、间距、配色。
- 头像：将真实 JPG 文件重命名为 `profile.jpg`，上传到 `assets/profile.jpg`。

GitHub 提交更改后 Pages 会自动重新部署，其他人仅能浏览公开网页，不能直接更改你的仓库。

提示：若你已经在 GitHub 上修改过内容，覆盖 `content.json` 前先备份并合并你的改动。本版本以提供的 CV 和之前生成的论文数据为基础。
