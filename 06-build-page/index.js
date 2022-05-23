const { assert } = require('console');
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const assets = path.join(__dirname, 'assets');
const projectDist = path.join(__dirname, 'project-dist');
const assetsCopy = path.join(projectDist, 'assets');
const style = path.join(__dirname, 'styles');
const styleDist = path.join(__dirname, 'project-dist', 'style.css');
let arrBundle = [];
console.log(path.join(assets, 'assets'));

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
  };
  getBandle();
//копирование папки assets
 
async function copyDir() {
  const filesCopy = await fsPromises.readdir(assetsCopy,  { withFileTypes: true });
  for (let item of filesCopy) {
    const copyItemPath = path.join(assetsCopy, item.name);
    fs.unlink(`${copyItemPath}`, (err => {
      if (err) {}
    }))};

  const files = await fsPromises.readdir(assets,  { withFileTypes: true });
    for (let item of files) {
      const currentItemPath = path.join(assets, item.name);
      const copyItemPath = path.join(assetsCopy, item.name);
      await fsPromises.copyFile(currentItemPath, copyItemPath);
  }
  }
  copyDir();