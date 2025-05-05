import { createHash } from 'node:crypto';
import fsAsync from 'node:fs/promises';
import path from 'path';
import {pathConcat, isFileExists} from '../helper.js';

export const hashInfo = async (pathToFile, curPath) => {
  const resPath = pathConcat(curPath, pathToFile);
  const fileName = path.parse(resPath).base || '';
  const dirName = path.dirname(resPath);

  try {
    if (isFileExists(resPath)) {
      console.log('waiting for a data');
      const data = await fsAsync.readFile(resPath, {encoding: 'utf-8'});
      console.log('DATA', data);
      const hash = createHash('sha256')
        .update(data, 'utf8')
        .digest('hex');

      console.log(hash, '\n');
    };
  } catch (e) {
    console.log(`${fileName} is not a file or missed in the ${dirName}`);
    return;
  }

};
