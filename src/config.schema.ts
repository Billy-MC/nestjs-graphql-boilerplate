import * as Joi from 'joi';

const configValidationSchema = Joi.object({
	DB_HOST: Joi.string().required(),
	DB_PORT: Joi.number().default(5432).required(),
	DB_DATABASE: Joi.string().required(),
	PORT: Joi.number().default(4000).required(),
});

export default configValidationSchema;
