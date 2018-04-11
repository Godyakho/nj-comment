'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_njplus';

  config.security = {
    csrf: {
      enable: false,
    },
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '8889',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'comment',
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
