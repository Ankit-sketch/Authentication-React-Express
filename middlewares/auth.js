import customErrorHandler from '../services/customErrorHandler.js';

import jwtService from '../services/jwtService.js'

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(customErrorHandler.unauthorised('unauthorised'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const {_id, role} = await jwtService.verify(token); 
        const user = {
            _id,
            role
        }
        req.user = user;
        next();
    } catch (error) {
        return next(customErrorHandler.unauthorised('unauthorised'));
    }
}
export default auth;