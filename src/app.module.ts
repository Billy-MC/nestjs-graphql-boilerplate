import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';

import { HealthModule } from './health/health.module';
import { HelloWorldModule } from './hello-world/hello-world.module';
import configValidationSchema from './config.schema';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				type: 'postgres',
				autoLoadEntities: true,
				synchronize: true,
				host: configService.get('POSTGRES_DB_HOST'),
				port: configService.get('POSTGRES_DB_PORT'),
				username: configService.get('POSTGRES_USER'),
				password: configService.get('POSTGRES_PASSWORD'),
				database: configService.get('POSTGRES_DB'),
				models: [],
			}),
		}),
		ConfigModule.forRoot({
			envFilePath: ['.env'],
			isGlobal: true,
			validationSchema: configValidationSchema,
		}),
		HealthModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
		}),
		HelloWorldModule,
	],
})
export class AppModule {}
