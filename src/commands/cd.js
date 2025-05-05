import { existsSync } from 'node:fs';
import path from 'node:path';

export const cd = (curPath, targetPath) => {
  let newPath = '';
  if (path.parse(targetPath).ext) {
    console.log('not a folder', targetPath)
    return;
  }
  if (path.isAbsolute(targetPath)) {
    console.log('path.isAbsolute targetPath', newPath)
    newPath = targetPath;
  };


  newPath = path.resolve(curPath, targetPath);

  if (newPath && existsSync(newPath)) {
    return newPath;
  }

  return;
};