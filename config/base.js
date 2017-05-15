module.exports = {
    cdn: {
        js: [
            'http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js',
            'http://cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js'
        ],
        css: [
            'http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css'
        ]
    },
    frontEndIndex: {
        websitTitle: '高得光伏',
        banner: {
            defaultAlt: '轮播图'
        },
        service: {
            mainTitle: '平台服务',
            defaultAlt: '高得服务'
        },
        contactUs: {
            mainTitle: '安装制定',
            list: [
                {
                    title: '系统设计',
                    texts: ['屋顶承载测量', '安装方案', '安装图纸']
                },
                {
                    title: '系统安装',
                    texts: ['产品供应', '电站安装', '协助并网']
                },
                {
                    title: '电站运维',
                    texts: ['收益计算', '发电监测', '高得质保']
                }
            ]
        },
        successCase: {
            mainTitle: '成功案例',
            defaultAlt: '成功案例'
        },
        team: {
            mainTitle: '高得团队',
            defaultAlt: '团队成员'
        },
        news: {
            mainTitle: '高得咨询',
            defaultAlt: '咨询信息'
        },
        about: {
            mainTitle: '关于高得',
            sections: [
                '2017年2月，光伏街和村村乐联合成立“高得太阳能”，高得太阳能提供从原料生产、产品供应、电站安装到后期运维的一体化服务，为全国拥有自家屋顶的居民用户带来绿色电力服务。',
                '高得太阳能选用高效组件、高端逆变器、国标辅材、高品质集成配置，并且拥有专业的施工团队和资深的项目管理，努力成为光伏领域的佼佼者。'
            ]
        }
    },
    frontFooterConfig: {
        footerLogo: '/images/logo2.png',
        footerInfo: {
            companyName: '江苏高得光伏电力有限公司',
            tel: '400-6229-666',
            email: 'info@gaodesolar.com',
            address: '江苏省昆山市玉山镇前进西路119号长城国际大厦1702室',
            qrcodeUrl: '/images/qrcode.png',
            qrcodeText: '官方微信',
            scripts: [
                '/js/jquery.min.js',
                '/js/bootstrap.min.js',
                '/js/slick.min.js',
                '/js/main.js'
            ]
        }
    },
    linkHrefs: {
        bootstrap: '/css/bootstrap.min.css',
        slick: '/css/slick.css',
        main: '/css/main.css'
    }
}