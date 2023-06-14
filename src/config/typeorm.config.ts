import 'dotenv/config';
import { ConfigService, EnvironmentVariables } from './config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

const configService = new ConfigService(
  process.env as unknown as EnvironmentVariables,
);

export default new DataSource(
  <DataSourceOptions>configService.getTypeOrmConfig(),
);
