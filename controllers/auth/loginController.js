import Joi from 'joi'

import bcrypt from 'bcrypt'

import { User } from '../../models/index.js'

import customErrorHandler from '../../services/customErrorHandler.js'

import jwtService from '../../services/jwtService.js'

const loginController = {
    async login(req, res, next) {
        const loginSchema = Joi.object({
            //validating
            email: Joi.string()
                .email().required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return next(error)
        }
        let access_token
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return next(customErrorHandler.wrongCredentials("email or password is wrong"));
            }
            //compare password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return next(customErrorHandler.wrongCredentials("email or password is wrong"));
            }
            //generating token
            access_token = jwtService.sign({ _id: user.id, role: user.role })
        } catch (error) {
            return next(err);
        }
        res.json({ access_token: access_token })
    }
}
export default loginController