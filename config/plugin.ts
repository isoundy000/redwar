import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  logger: {
    enable: true,
    package: 'egg-json-logger',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  cache: {
    enable: true,
    package: 'egg-cache',
  },
  grpcServer: {
    enable: true,
    package: 'egg-grpc-server',
  },
  // graphql: {
  //   enable: true,
  //   package: 'egg-graphql',
  // },
};

export default plugin;
