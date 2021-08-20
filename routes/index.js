import {Router} from 'express';

import {registerController, loginController, forgotpassController, resetpassController}  from '../controllers/index.js';

const route = Router();

route.post('/register', registerController.register);

route.post('/login', loginController.login);

route.put('/forgotpassword', forgotpassController.forgotpass);

route.put('/resetpassword/:resetToken', resetpassController.resetpass);

export default route;