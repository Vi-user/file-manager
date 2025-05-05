import  { opendir }  from 'node:fs/promises';

export const list = async (dirPath) => {
  const res = [];
  let i = 0;
  res.push('(index)\t Type\t\t Name\n');
  try {
    const dir = await opendir(dirPath);
    for await (const dirent of dir) {
      res.push(`${i}\t ${(dirent.isFile()) ? 'file\t' : 'directory'} \t ${dirent.name}\n`);
      i++;
    }
  } catch (err) {
    console.error(err);
  }
  console.log(res.join(''));
};
