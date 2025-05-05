import { stdin as input, stdout as output} from 'node:process';
import * as readline from 'node:readline/promises';
import {logMsg, parseInput} from "./helper.js";
import os from "node:os";
import { username } from "./index.js";
import {list} from "./commands/ls.js";
import { up } from "./commands/up.js";
import { cd } from "./commands/cd.js";
import { cat } from "./commands/cat.js";
import { add } from "./commands/add.js";
import { mkdir } from "./commands/mkdir.js";
import { osinfo } from "./commands/os.js";
import { hashInfo } from "./commands/hashInfo.js";
import { remove } from "./commands/remove.js";
import * as compresser from "./commands/compress.js";


const HOMEDIR = os.userInfo().homedir;
let curPath = HOMEDIR;

export async function worker() {
  const rl = readline.createInterface({input, output })

  rl.on('line', async (input) => {

    const { command, params } = parseInput(input.trim());

    switch (command) {
      case 'ls':
        if (params.length) {
          output.write(`Invalid input.\nYou are currently in ${curPath}.\n`);
        } else {
          try {
            await list(curPath);
            output.write(`\nYou are currently in ${curPath}.\n`);
          } catch (error) {
            logMsg({
              msg: error.message,
              cause: error,
              type: 'error',
            });
          }
        }
        break;
      case 'up':
      if (params.length) {
        output.write(`Invalid input.\nYou are currently in ${curPath}.\n`);
      } else {
          try {
            const newPath = up(curPath);
            curPath = newPath;
            output.write(`You are currently in ${curPath}.\n`);
          } catch (error) {
            logMsg({
              msg: error.message,
              cause: error,
              type: 'error',
            });
          }
        }
        break;
      case 'cd':
      if (params.length != 1) {
        output.write(`Invalid input - the Path is missing.\nYou are currently in ${curPath}.\n`);
        return;
      }
        const newPath = cd(curPath, params[0]);
        if (newPath) {
          curPath = newPath;
        } else {
          output.write(`Incorrect path "${params[0]}".\n`);
        }
          output.write(`You are currently in ${curPath}.\n`);
        break;
      case 'cat':
        if (params.length != 1) {
          output.write(`Invalid input - the Path is missing or to much parameters are given.\nYou are currently in ${curPath}.\n`);
          return;
        }
        await cat(params[0], curPath);
        output.write(`You are currently in ${curPath}.\n`);
        break;
      case 'add':
        if (params.length != 1) {
          output.write(`Invalid input - new Filename is missing or to many parameters are given.\nYou are currently in ${curPath}.\n`);
          return;
        }
        await add(params[0], curPath);
        output.write(`You are currently in ${curPath}.\n`);
        break;
      case 'mkdir':
        if (params.length != 1) {
          output.write(`Invalid input - new Filename is missing or to many parameters are given.\nYou are currently in ${curPath}.\n`);
          return;
        }
        await mkdir(params[0], curPath);
        output.write(`You are currently in ${curPath}.\n`);
        break;
      case 'rm':
        if (params.length != 1) {
          output.write(`Invalid input - path-to-file is missing or to many parameters are given.\nYou are currently in ${curPath}.\n`);
          return;
        }
        await remove(params[0], curPath);
        output.write(`You are currently in ${curPath}.\n`);
        break;
      case 'os':
        if (params.length != 1) {
          output.write(`Invalid input - parametr is missing or to many args are given.\nYou are currently in ${curPath}.\n`);
          return;
        }
        await osinfo(params[0]);
        output.write(`You are currently in ${curPath}.\n`);
        break;
      case 'hash':
        if (params.length != 1) {
          output.write(`Invalid input - parametr is missing or to many args are given.\nYou are currently in ${curPath}.\n`);
          return;
        }
        await hashInfo(params[0], curPath);
        output.write(`You are currently in ${curPath}.\n`);
        break;
      case 'compress':
        if (params.length != 2) {
          output.write(`Invalid input - parametr is missing or to many args are given.\nYou are currently in ${curPath}.\n`);
          return;
        }
        await compresser.compress(params[0], params[1], curPath);
        output.write(`You are currently in ${curPath}.\n`);
        break;
      case 'decompress':
        if (params.length != 2) {
          output.write(`Invalid input - parametr is missing or to many args are given.\nYou are currently in ${curPath}.\n`);
          return;
        }
        await compresser.decompress(params[0], params[1], curPath);
        output.write(`You are currently in ${curPath}.\n`);
        break;
      case '.exit':
        output.write(`Thank you for using File Manager, ${username}, goodbye!\n`)
        rl.close();
        break;
      default:
        output.write(`Invalid input.\nYou are currently in ${curPath}.\n`);
    }
  });

  rl.on('SIGINT', () => {
    output.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
    rl.close();
  })
};
