module.exports = {
    port: 80,
    database: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: 'Dsh12345',
        db: 'website-gfj'
    },
    databasetwo: {
        port: 3306,
        host: '112.124.98.9',
        user: 'root',
        password: 'Dsh12345',
        db: 'guangfujie_prod'
    },
    qiniu: {
        bucket: 'guangfujie',
        accessKey: 'zrAvv0stUaPwrAYiaSuVgvsUSgajrFDcJoIn62Vp',
        secretKey: '8onamuD2Evcu6nzoozjydlRL0oybHrRuc45fy_yA',
        domainUrl: 'http://ob4e8ww8r.bkt.clouddn.com/'
    }
};