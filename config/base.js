module.exports = {
    frontEndIndex: {
        websitTitle: '光伏街',
        banner: {
            defaultAlt: '轮播图'
        },
        service: {
            mainTitle: '平台服务',
            defaultAlt: '服务'
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
            mainTitle: '光伏团队',
            defaultAlt: '团队成员'
        },
        news: {
            mainTitle: '光伏资讯',
            defaultAlt: '资讯信息'
        },
        about: {
            mainTitle: '关于光伏街',
            sections: [
                '光伏街是一家基于“互联网”的新能源提供商，是太阳能发电行业最优秀的系统集成商之一。公司创始团队由太阳能发电行业资深人员组成，对整体新能源产业供应链有很深入的研究，并且精通光伏市场的前沿技术。',
                '我们选用高效组件、高端逆变器、国标辅材、高品质集成配置，并且拥有专业的施工团队和资深的项目管理，努力成为光伏领域的佼佼者。',
                '光伏街依托手机互联网移动端，打造便捷、迅速、专业的家庭电站全服务平台。线上客户只需通过一键下单，线下工作人员24小时全天服务，不仅实现专业人员上门测定、设计、送货及安装，还可协助客户进行项目融资和并网申请，令客户轻松享受家庭电站带来的优质绿色电力服务。'
            ]
        }
    },
    frontFooterConfig: {
        footerLogo: '/images/logo.png',
        footerInfo: {
            companyName: '昆山速融互联网信息科技有限公司',
            tel: '4006229666',
            email: '15825566666@163.com',
            address: '江苏省昆山市玉山镇前进西路119号长城国际大厦1702室',
            qrcode: [
                {
                    imgUrl: '/images/service-qrcode.png',
                    text: '微信服务号'
                },
                {
                    imgUrl: '/images/subscribe-qrcode.jpg',
                    text: '微信订阅号'
                }
            ],
            scripts: [
                '/js/jquery.min.js',
                '/js/bootstrap.min.js',
                '/js/slick.min.js',
                '/js/pnotify.js',
                '/js/main.js'
            ]
        }
    },
    linkHrefs: {
        bootstrap: '/css/bootstrap.min.css',
        slick: '/css/slick.css',
        pnotify: '/css/pnotify.css',
        main: '/css/main.css'
    }
}