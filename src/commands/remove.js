import fs from 'node:fs/promises';
import {pathConcat} from '../helper.js';


export const remove = async (pathToFile, curPath) => {
  const resPath = pathConcat(curPath, pathToFile);

  try{
    await fs.rm(resPath, {recursive: true});
  } catch (err) {
    console.error(`Error: ${err}`)
  }

};