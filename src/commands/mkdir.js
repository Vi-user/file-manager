import path from 'path';
import fs from 'node:fs';
import {mkdir as makeDir} from 'node:fs/promises';

export const mkdir = async (dirName, pathDirectory) => {
  const newDirName = path.join(pathDirectory, dirName);
  if (fs.existsSync(newDirName)) {
    console.log(`${dirName} is already exists in the ${pathDirectory}`);
    return;
  };
    await makeDir(newDirName, {recursive: true})
      .then(() => console.log(`${dirName} was created in the ${pathDirectory}`))
      .catch((err) => `Sth went wrong, ${err.message}`);
}