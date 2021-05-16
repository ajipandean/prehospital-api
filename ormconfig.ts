module.exports = {
  type: process.env.DB_TYPE,
  host: `/cloudsql/${process.env.DB_CONNECTION_NAME}`,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNC,
  extra: {
    socketPath: `/cloudsql/${process.env.DB_CONNECTION_NAME}`,
  },
};
