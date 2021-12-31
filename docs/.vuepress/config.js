module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: '个人笔记',
    home: "/",
    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        navbar:[

        ],
        repo: "https://github.com/xizhan1995/xizhan1995.github.io"
    },
    markdown:{

        extractHeaders:{
            level: [1,2,3]
        },
        toc: {
            level: [1,2,3]
        }
    }

}
