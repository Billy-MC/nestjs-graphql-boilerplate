import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';

import { HealthModule } from './health/health.module';
import { HelloWorldModule } from './hello-world/hello-world.module';
import configValidationSchema from './config.schema';

@Module({
	imports: [
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				dialect: 'postgres',
				autoLoadEntities: true,
				synchronize: true,
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				database: configService.get('DB_DATABASE'),
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
