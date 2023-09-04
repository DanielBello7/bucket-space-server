import dotenv from 'dotenv';
import path from 'path';

const environment_type = process.env.NODE_ENV as string;
const environment_language = process.env.ENV as string;
const location = environment_language === "js" ? `../../env` : '../env';
const file_path = path.join(__dirname, location, `/${environment_type}.env`);

export default () => dotenv.config({ path: file_path });
