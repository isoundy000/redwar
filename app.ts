'use strict';

export default (app) => {

  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动

    await app.model.sync({
      force: app.config.env === 'unittest'
    });

    if (app.config.env === 'unittest'){

      app.model.Config.bulkCreate([
        { id: 1, key: 'packet_duration', value: 60},
        { id: 2, key: 'award_present', value: [0.08, 0.08, 0.08, 0.06, 0.03, 0.03, 0.03]},
        { id: 3, key: 'award_1030', value: {
            spical: 1.11,
            lei: [0, 0, 0, 3.33, 6.66, 26.66, 66.66, 166.66]
          }
        },
        { id: 4, key: 'award_3060', value: {
            spical: 6.66,
            lei: [0, 0, 0, 6.66, 18.88, 66.66, 166.66, 888]
        }}
      ]);
      app.model.Admin.create({
        id: 1,
        role: 'admin',
        name: '管理员',
        account: 'admin',
        password: 'e10adc3949ba59abbe56e057f20f883e'
      });
      app.model.Balance.bulkCreate([
        { id: 1, award: 100 },
        { id: 2, award: 200 },
        { id: 3, award: 300 },
        { id: 4, award: 400 },
        { id: 5, award: 500 },
        { id: 6, award: 600 }
      ]);
      app.model.Room.create({
        name: '红包房间',
        award: 10000
      });
    }
  });

  app.Sequelize.postgres.DECIMAL.parse = (value) => {
    return parseFloat(Number(value).toFixed(2));
  };

  process.on('unhandledRejection', (reason, promise) => {
    app.logger.error('[unhandledRejection]', { promise, reason });
  });

  process.on('uncaughtException', (e) => {
    app.logger.error('[uncaughtException]', e);
  });
};