module.exports = {
    port: 9000,
    database: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: 'wfh_linux',
        db: 'website-gfj'
    },
    databasetwo: {
        port: 3306,
        host: '112.124.98.9',
        user: 'root',
        password: 'Dsh12345',
        db: 'guangfujie_qa'
    },
    qiniu: {
        bucket: 'guangfujie',
        accessKey: 'zrAvv0stUaPwrAYiaSuVgvsUSgajrFDcJoIn62Vp',
        secretKey: '8onamuD2Evcu6nzoozjydlRL0oybHrRuc45fy_yA',
        domainUrl: 'http://ob4e8ww8r.bkt.clouddn.com/'
    }
};