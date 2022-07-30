import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
	@Query(_returns => String, { description: 'First Query' })
	async hello() {
		return 'Hello, World';
	}
}
