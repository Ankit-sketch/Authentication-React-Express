import Joi from 'joi'

import bcrypt from 'bcrypt'

import { User } from '../../models/index.js'

import customErrorHandler from '../../services/customErrorHandler.js'

const registerController = {
    async register(req, res, next) {

        // validaating the request 
        const registerSchema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email().required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            repeat_password: Joi.ref('password'),
        });
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error)
        }
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(customErrorHandler.alreadyExists('email already exists'));
            }

            //hashing the password
            const { name, email, password } = req.body;
            const hashPassword = await bcrypt.hash(password, 10)

            // prepare the model
            const user = await User({
                name,
                email,
                password: hashPassword
            });
            const result = await user.save();
            console.log(result)
        } catch (error) {
            console.log(error)
        }
        res.send('user created successfully');
    }
}

export default registerController;