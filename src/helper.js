import path from "node:path";
import fs from "node:fs";

export function logMsg({msg, cause, type = 'info'}) {
  if (type === 'error') {
    throw new Error('Operation failed\n', {msg, cause});
  } else {
    console.log(msg);
  }
}

export function parseInput(input) {
  const command = input.split(' ').slice(0, 1)[0];
  const params = input.split(' ').slice(1);

  return {command, params};
}

export function pathConcat(curDir, destination) {
  return path.resolve(curDir, destination);
}

export function isDirExists(path) {

}

export function isFileExists(path) {
  try {
    fs.lstatSync(path).isFile();
    return true;
  } catch (e) {
    console.log(`Operation Failed. This is not a file or missed in the directory, ${e.message}`);
    return false;
  }
}

