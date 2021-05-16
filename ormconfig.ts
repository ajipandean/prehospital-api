module.exports = {
  type: process.env.DB_TYPE,
  host:
    process.env.NODE_ENV === 'development'
      ? process.env.DB_HOST
      : `/cloudsql/${process.env.DB_CONNECTION_NAME}`,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNC,

  ...(process.env.NODE_ENV !== 'development' && {
    extra: {
      socketPath: `/cloudsql/${process.env.DB_CONNECTION_NAME}`,
    },
  }),
};
