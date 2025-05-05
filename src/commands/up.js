import path from 'node:path';

export const up = (dirPath) => {
  const newPath =  dirPath.split(path.sep).slice(0, -1).join(path.sep);
  if (newPath === path.parse(newPath).root) {
    return `${newPath}${path.sep}`;
  }
  return newPath;
};
