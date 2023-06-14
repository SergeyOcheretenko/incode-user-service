import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE: string;
}

@Injectable()
export class ConfigService implements OnModuleInit {
  constructor(@Inject('ENV') private env: EnvironmentVariables) {}

  async onModuleInit() {
    this.env = this.validateConfig();
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    this.env = this.validateConfig();
    return {
      type: 'postgres',
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      username: this.env.DB_USERNAME,
      password: this.env.DB_PASSWORD,
      database: this.env.DB_DATABASE,
      synchronize: false,
      entities: [path.resolve(__dirname, '../**/*.entity{.ts,.js}')],
      subscribers: [path.resolve(__dirname, '../**/*.subscriber{.ts,.js}')],
      migrations: [path.resolve(__dirname, '../db/migrations/**/*{.ts,.js}')],
    };
  }

  private validateConfig() {
    const validatedConfig = plainToClass(EnvironmentVariables, this.env, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }
}
