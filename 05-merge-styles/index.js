const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

let arrBundle = [];
const pathBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const pathStyle = path.join(__dirname, 'styles');


async function getBandle() {
  const styleArr = await fsPromises.readdir(pathStyle, { withFileTypes: true });

  for (let item of styleArr) {
    const pathStyleFile = path.join(pathStyle, item.name);

    if (path.extname(pathStyleFile) === '.css') {
      const styleContent = await fsPromises.readFile(pathStyleFile, 'utf8');
      arrBundle.push(`${styleContent}\n`);
    }
  }

  await fsPromises.writeFile(pathBundle, arrBundle);
};
getBandle();