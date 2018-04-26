'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_njplus';

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  };

  config.proxy = true;

  config.security = {
    // ignore: '/api/',
    domainWhiteList: [
      '127.0.0.1:80',
      '127.0.0.1:8001',
      'chinabyte.com',
    ],
    methodnoallow: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };

  exports.cors = {
    origin: () => '*',
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      // host: '10.10.10.216',
      host: '10.10.10.216',
      // 端口号
      port: '3306',
      // 用户名
      user: 'tmg',
      // user: 'root',
      // 密码
      password: 'tmgzcb',
      // password: 'root',
      // 数据库名
      database: 'commentdb',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  exports.io = {
    namespace: {
      '/chat': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [ 'filter' ],
      },
    },
  };

  // add your config here
  config.middleware = [ 'errorHandler' ];

  return config;
};
