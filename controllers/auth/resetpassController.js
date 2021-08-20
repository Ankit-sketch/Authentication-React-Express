import * as crypto from 'crypto'

import { User } from '../../models/index.js'

import customErrorHandler from '../../services/customErrorHandler.js'

import bcrypt from 'bcrypt'

const resetpassController = {
    async resetpass(req, res, next) {
        
        const resetpasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest('hex');
        try {
            const user = await User.findOne({
                resetpasswordToken,
                resetpasswordExpire : {$gt: Date.now()}
            });
            if(!user){
                return next(customErrorHandler.invalidtoken("token is invalid"));
            }
            const {password} = req.body;
            // user.password = req.body.password;
            const hashPassword = await bcrypt.hash(password, 10);

            // user.password = hashPassword;
            const updateduser = await User.findOneAndUpdate({_id: user._id},{
                password:hashPassword,
                resetpasswordToken : undefined,
                resetpasswordExpire : undefined,
            })
            console.log('updated')
            // user.resetpasswordToken = undefined;
            // user.resetpasswordExpire = undefined;
        } catch (error) {
            console.log(error)
        }
    }
}

    export default resetpassController;