const { assert } = require('console');
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const pathComponents = path.join(__dirname, 'components');
const pathTemplate = path.join(__dirname, 'template.html');
const assets = path.join(__dirname, 'assets');
const projectDist = path.join(__dirname, 'project-dist');
const assetsCopy = path.join(projectDist, 'assets');
const style = path.join(__dirname, 'styles');
const styleDist = path.join(__dirname, 'project-dist', 'style.css');
const pathNewHtml = path.join(projectDist, 'index.html')
let arrBundle = [];

fs.mkdir(path.join(__dirname, 'project-dist'), err => {
  if (err) {console.log('Папка project-dist уже создана');}});

fs.mkdir(assetsCopy, err => {
  if (err) {console.log('Папка assets уже создана');}
});
//сборка style
async function getBandle() {
const styleArr = await fsPromises.readdir(style, { withFileTypes: true });
  
  for (let item of styleArr) {
    const pathStyleFile = path.join(style, item.name);
  
    if (path.extname(pathStyleFile) === '.css') {
      const styleContent = await fsPromises.readFile(pathStyleFile, 'utf8');
      arrBundle.push(`${styleContent}\n`);
    }
  }
  
  await fsPromises.writeFile(styleDist, arrBundle);
}
getBandle();
//копирование папки assets
 
async function copyDir() {
  const filesCopy = await fsPromises.readdir(assetsCopy,  { withFileTypes: true });
  for (let item of filesCopy) {
    const copyItemPath2 = path.join(assetsCopy, item.name);
    fs.unlink(`${copyItemPath2}`, (err => {
      if (err) {}
    }))};

  const files = await fsPromises.readdir(assets,  { withFileTypes: true });
  for (let item2 of files) {
    const currentItemPath = path.join(assets, item2.name);
    const copyItemPath = path.join(assetsCopy, item2.name);
    if (item2.isDirectory()) {
      fs.mkdir(path.join(assetsCopy, `${item2.name}`), err => {
        if (err) {}
      });
      const files2 = await fsPromises.readdir(currentItemPath,  { withFileTypes: true });
      for (let item3 of files2) {
        await fsPromises.copyFile(path.join(assets, item2.name, item3.name), path.join(assetsCopy, item2.name, item3.name));
      }
    } else if (item2.isFile()) {
      await fsPromises.copyFile(currentItemPath, copyItemPath);
    }
  }
}
copyDir();


async function createFile(inputPath, content) {
  return await fsPromises.writeFile(inputPath, content);
}

async function pasteHtml() {
  let htmlTemp = await fsPromises.readFile(pathTemplate, 'utf-8');
  const filesComponents = await fsPromises.readdir(pathComponents, { withFileTypes: true });

  for (let item of filesComponents) {
    const componentItem = await fsPromises.readFile(path.join(pathComponents, `${item.name}`), 'utf-8');
    const regExp = new RegExp(`{{${(item.name).split('.')[0]}}}`, 'g');
    htmlTemp = htmlTemp.replace(regExp, componentItem);
  }

  createFile(pathNewHtml, htmlTemp);
}

pasteHtml();