import { Controller, Get } from '@nestjs/common';
import {
	HealthCheck,
	HealthCheckService,
	HttpHealthIndicator,
	SequelizeHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
	constructor(
		private healthCheckService: HealthCheckService,
		private httpHealthIndicator: HttpHealthIndicator,
		private dbHealthIndicator: SequelizeHealthIndicator,
	) {}

	@Get()
	@HealthCheck()
	check() {
		return this.healthCheckService.check([
			() => this.httpHealthIndicator.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
			() => this.dbHealthIndicator.pingCheck('database'),
		]);
	}
}
