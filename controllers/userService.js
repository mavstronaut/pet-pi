const Joi = require('joi');

module.exports = {
    validateSchema(body) {
        const schema = Joi.object().keys({
            email: Joi.string()
            .email()
            .required(),
            password: Joi.string().required()
        });
        const { value, error } = Joi.validate(body, schema);
        if ( error && error.details) {
            return { error };
        }
        return { value };
    }
};