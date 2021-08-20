import * as crypto from 'crypto'

import { User } from '../../models/index.js'

import customErrorHandler from '../../services/customErrorHandler.js'

import sendEmail from '../../services/sendEmail.js'

const forgotpassController = {
    async forgotpass(req, res, next) {
        const { email } = req.body;
        try {
            if (!email) {
                return next(customErrorHandler.notfound('field must not be empty'));
            }
            const user = await User.findOne({ email });
            if (!user) {
                return next(customErrorHandler.notsent('email could not be sent1'));
            }

            const resetToken = crypto.randomBytes(20).toString('hex');
            const hashPassword = crypto.createHash("sha256").update(resetToken).digest('hex');
            const resetpasswordExpire = Date.now() + 40 * (60 * 1000);
            const updatedUser = await User.findOneAndUpdate({ email }, {
                resetpasswordToken: hashPassword,
                resetpasswordExpire,
            });
            // console.log("updatedUser",updatedUser);
            const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
            console.log(resetUrl)
            const message = `
            <h1>you have requested a password reset</h1>
            <p>please go to this link to reset password</p>
            <a href = ${resetUrl} clicktracking = off>${resetToken}</a>
            `
            try {
                await sendEmail({
                    to : user.email,
                    subject : "passwordreset",
                    text : message
                })
            } catch (error) {
                const updatedUser2 = await User.findOneAndUpdate({ email }, {
                    resetpasswordToken: null,
                    resetpasswordExpire : null ,
                });
                console.log("updatedUser2", updatedUser2);
                return next(customErrorHandler.notsent('email could not be sent2'));               
            }

        } catch (error) {
            return next(error);
        }
        res.send(resetUrl)
    }
}
export default forgotpassController;