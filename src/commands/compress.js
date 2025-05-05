import fs from 'node:fs';
import zlib from "node:zlib";
import {pathConcat,isFileExists} from '../helper.js';

export const compress = async (path_to_file, path_to_destination, curDir) => {
  const pathToFile = pathConcat(curDir, path_to_file);
  const pathToDestination = pathConcat(curDir, path_to_destination);

  if (isFileExists(pathToFile)) {
    try {
      const zip = zlib.createBrotliCompress();
      const data = fs.createReadStream(pathToFile);
      const res = fs.createWriteStream(pathToDestination);

      data.pipe(zip).pipe(res);
    } catch (e) {
      console.log('compr err', e.message);
    }
  }
};

export const decompress = async (path_to_file, path_to_destination, curDir) => {
  const pathToFile = pathConcat(curDir, path_to_file);
  const pathToDestination = pathConcat(curDir, path_to_destination);

  if (isFileExists(pathToFile)) {
    try {
      const unzip = zlib.createBrotliDecompress();
      const data = fs.createReadStream(pathToFile);
      const res = fs.createWriteStream(pathToDestination);

      data.pipe(unzip).pipe(res);
    } catch (e) {
      console.log('decompr err', e.message);
    }
  }
};