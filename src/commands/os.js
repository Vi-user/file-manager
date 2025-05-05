import os from "node:os";

export const osinfo = (param) => {
  console.log('in OS', param);
  switch (param) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      console.log(os.cpus().length);
      os.cpus()
        .map((el) => console.log(`${el.model}: ${el.speed/1000}GHz`))
      break;
    case '--homedir':
      console.log(os.userInfo().homedir);
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      console.log(`Incorrect command ${param}`);
      break;
  }
}