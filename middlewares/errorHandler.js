import {DEV_MODE} from '../config/index.js'
import Joi from 'joi'
import customErrorHandler from '../services/customErrorHandler.js';
const  {ValidationError} = Joi;
const errorHandler = (err, req, res, next) => {
              let statuscode = 500;
              let data = {
                               message : 'internal server error dev',
                               ...(DEV_MODE === 'true' && {original_error : err.message})
              }
              if (err instanceof ValidationError){
                  statuscode = 422;
                  data = {
                    message : err.message
                  }
              }
              if (err instanceof customErrorHandler){
                statuscode = err.status;
                data = {
                  message : err.message
                }
            }
              return res.status(statuscode).json(data);
}

export default errorHandler