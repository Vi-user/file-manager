import { worker } from "./worker.js";

export let username = '';

const parseName = async () => {
  const userName = Object.entries(process.argv)
    .filter(([key, val]) => val.startsWith('--username'))
    .map(([key, value]) => value.split('=')[1]);

  username = userName[0];
  return;
}

async function startApp() {
  await parseName();

  console.log(`Welcome to the File Manager, ${username}!`);
  await worker();
}

await startApp();