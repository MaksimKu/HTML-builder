const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const FilesPath = path.join(__dirname, 'files');
const FilesCopyPath = path.join(__dirname, 'files-copy');

fs.mkdir(path.join(__dirname, 'files-copy'), err => {
  if (err) {console.log('Папка уже создана');}

});
async function copyDir() {
    const filesCopy = await fsPromises.readdir(FilesCopyPath,  { withFileTypes: true });
    for (let item of filesCopy) {
      const copyItemPath = path.join(FilesCopyPath, item.name);
      fs.unlink(`${copyItemPath}`)

const files = await fsPromises.readdir(FilesPath,  { withFileTypes: true });
  for (let item of files) {
    const currentItemPath = path.join(FilesPath, item.name);
    const copyItemPath = path.join(FilesCopyPath, item.name);
    await fsPromises.copyFile(currentItemPath, copyItemPath);
}

}
copyDir();