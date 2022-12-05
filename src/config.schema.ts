import * as Joi from 'joi';

const configValidationSchema = Joi.object({
	POSTGRES_DB_HOST: Joi.string().required(),
	POSTGRES_DB_PORT: Joi.number().default(5432).required(),
	POSTGRES_DB: Joi.string().required(),
	//TODO: add back when decide the user name and password
	// POSTGRES_USER: Joi.string().required(),
	// POSTGRES_PASSWORD: Joi.string().required(),
	PORT: Joi.number().default(4000).required(),
});

export default configValidationSchema;
