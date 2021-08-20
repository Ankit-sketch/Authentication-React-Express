import dotenv from 'dotenv';

dotenv.config();

export const { PORT, DB_URI, DEV_MODE, JWT_SECRET, EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM} = process.env;