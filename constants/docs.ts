import path from 'path';
import fs from 'fs';
import variables from './variables';

const location = variables.ENV === "js" ? "../../assets/docs.yml" : "../assets/docs.yml";
const swaggerFileLocation = path.join(__dirname, location);
const swaggerFile = fs.readFileSync(swaggerFileLocation, 'utf8');

export {
  swaggerFile
}