import fs from 'node:fs';
import {isFileExists, pathConcat} from '../helper.js';


export const cat = async (pathToFile, curPath) => {
  const resPath = pathConcat(curPath, pathToFile);
  const isFileEx = isFileExists(resPath);

  if (isFileEx) {
    const stream = fs.createReadStream(resPath, 'utf-8');
    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => console.log(data));
    stream.on('error', error => console.log('Error', error.message));
  }

};

