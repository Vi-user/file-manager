import path from 'path';
import fs from 'node:fs';


export const add = (fileName, pathDirectory) => {
  const pathToFile = path.join(pathDirectory, fileName);
  if (fs.existsSync(pathToFile)) {
    console.log(`${fileName} is already exists in the ${pathDirectory}`);
    return;
  };

  fs.appendFile(pathToFile, '', (err) => {
    if(err) throw new Error();
    console.log(`${fileName} was created in the ${pathDirectory}`);
  });

}
