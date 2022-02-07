
## 侧边栏提取一级标题

默认，提取的是 2，3 级标题，通过 markdown.extractHeaders.level 和 sidebarDepth 可以调整。

sidebarDepth 设置根据页面标题自动生成的侧边栏的最大深度。

- 设为 0 来禁用所有级别的页面标题。
- 设为 1 来包含 `<h2>` 标题。
- 设为 2 来包含 `<h2>` 和 `<h3>` 标题。

最大值取决于你通过 markdown.extractHeaders.level 提取了哪些级别的标题。

由于 markdown.extractHeaders.level 的默认值是 [2, 3] ，因此 sidebarDepth 的默认最大值是 2 。

参考链接：
- <https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebardepth>
- [vuepress如何生成目录 | 全栈直通车-王世彪的博客](https://www.sofineday.com/vuepress-catalog.html#定义的位置)
## 自定义容器

Custom Containers

Usage:
```
::: <type> [title]
[content]
:::
```
The type is required, and the title and content are optional.

Supported type :

- tip
- warning
- danger
- details
- Alias of CodeGroup and CodeGroupItem:
  - code-group
  - code-group-item

示例
```markdown
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block
:::
```
这些 tip、warning、danger 都是有特殊背景色的。而 details 则是折叠效果。

## Q
- 设置 lastUpdate 的显示格式：默认类似
  `Last Updated: 2021/12/31 上午1:15:18`
  我希望日期以 ISO 8601 格式显示。

https://github.com/valeriangalliat/blog
