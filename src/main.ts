import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';

import { TransformInterceptor } from './transform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
	const PORT = process.env.PORT || 4000;
	const logger = new Logger();

	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new TransformInterceptor());
	app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

	await app.listen(PORT);

	logger.log(`Application listening on port ${PORT} 🚀`);
}
bootstrap();
