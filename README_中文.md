# Siyu Chen — 个人学术网站（GitHub Pages）

这是一个可长期自行维护的网站。**访客只能阅读，只有有 GitHub 仓库写入权限的人才能修改网页内容。** 公开 GitHub 仓库不意味着其他人有修改权限。

## 一、发布到 GitHub Pages
1. 登录 GitHub，建立一个 Public 仓库，例如 `你的用户名.github.io`。
2. 将这个文件夹里的 `index.html`、`styles.css`、`app.js`、`content.json`、`assets` 目录上传到仓库根目录。
3. 打开仓库 Settings → Pages → Build and deployment，Source 选 Deploy from a branch，Branch 选 main / (root)，Save。
4. 等 GitHub 发布完成，在 `https://你的用户名.github.io` 浏览网站。也可以设置自定义域名。
5. **不要直接双击 index.html 来测试**，因为浏览器本地文件协议通常不允许读取 JSON。先在网站目录运行 `python3 -m http.server 8000`，用浏览器打开 http://localhost:8000。也可直接通过 GitHub Pages 预览。

## 二、修改单位或个人信息
打开 GitHub 仓库 → `content.json` → 右上角铅笔图标 Edit。找到 `role`、`affiliation`、`about`、`email` 字段修改，点击 Commit changes。刷新网站即可。

## 三、新增论文
在 `content.json` 的 `publications` 数组最后一篇的 `}` 后面加英文逗号，然后添加：
```json
{
  "number": 52,
  "title": "Your new paper title",
  "authors": "Chen S, et al.",
  "year": 2027,
  "journal": "Journal Name",
  "doi": "10.xxxx/example",
  "url": "https://doi.org/10.xxxx/example",
  "selected": false,
  "category": "Research"
}
```
`selected: true` = 同时显示在 Selected Publications；`false` = 仅显示在 All Publications。DOI 链接指向论文的出版社主页。删除论文请留意数组逗号、JSON 引号格式。

## 四、新增 News
在 `news` 数组最前面插入一项：
```json
{ "date": "2027-03", "text": "Joined a new institution as a postdoctoral researcher.", "url": "" },
```
`url` 可以留空，也可以写入公告地址。建议新消息在最前面。

## 五、更换照片
把你的正面头像命名为 `profile.jpg`，放到 `assets` 文件夹中即可。当前没有提供真实头像，网页显示字母占位；不要把私人证件照上传。

## 六、公开只读与后台权限
这是**无登录功能的静态公开网页**，不存在访客编辑入口。修改权限由 GitHub 仓库的拥有者和协作者角色控制。不要分享账号密码；建议开启 GitHub 双重身份验证。发布后内容对所有互联网访客公开。

## 七、后续维护提示
CV 中有 51 篇论文，已预加载 51 条 DOI 记录。网页根据 `content.json` 自动排序、搜索和筛选年份，不需要改代码。发布前建议人工核对自动从 PDF 解析得到的论文标题、作者和期刊，以及 News 日期。完整 CV 不会公开放在网站里。


## 修改 Education 和交换经历

在 `content.json` 中修改 `education` 数组里的博士、两个硕士条目。Yale 访问研究经历单独放在 `visiting_experience` 数组中，以免误认为是 Yale 学位。每条数据的 `url` 都是可点击的学校官网链接；`years` 可以自行修改日期。提交 GitHub 更改后公开页面会更新，访客无法编辑。
