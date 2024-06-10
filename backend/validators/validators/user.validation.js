const Joi = require('joi');
const { password} = require('./custom.validation');
const { validateSchema } = require('../validator');

const login = (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(password)
        });
        let validFields = validateSchema(req.body, schema);
        if (validFields)
            return next();
    }
    catch (error) {
        return res.status(400).json({error});
    }
};

const createUser = (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(password),
        });

        let validFields = validateSchema(req.body, schema);
        if (validFields) {
            next();
        }
    } catch (error) {
         return res.status(400).json({error});
    }
};

const updateUser = (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
        }).unknown(true);

        let validFields = validateSchema(req.body, schema);
        if (validFields) {
            next();
        }
    } catch (error) {
         return res.status(400).json({error});
    }
};

const uploadImg = (req, res, next) => {
    try {
       const schema = Joi.object({
          image: Joi.object({
            filename: Joi.string().required(),
            mimetype: Joi.string().required(),
            size: Joi.number().max(400 * 400 * 5).required() // Example: max 5 MB
          }).required()
        }).unknown(true);

        let validFields = validateSchema(req.body, schema);
        if (validFields) {
            next();
        }
    } catch (error) {
         return res.status(400).json({error});
    }
};

const viewMedia = (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            id: Joi.string().required(),
        }).unknown(true);

        let validFields = validateSchema(req.body, schema);
        if (validFields) {
            next();
        }
    } catch (error) {
         return res.status(400).json({error});
    }
};
module.exports = {
    createUser,
    login,
    updateUser,
    uploadImg,
    viewMedia
};