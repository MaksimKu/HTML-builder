const fsPromises = require('fs').promises; // <--- Возможно здесь надо исправить. У меня работает только так))
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

(async () => {
const files = await fsPromises.readdir(folderPath,  { withFileTypes: true });
for (let item of files) {
    if (item.isFile()) {
        const FileName = item.name.split('.');
        const stats = await fsPromises.stat(path.join(__dirname, 'secret-folder', item.name));
        console.log(`${FileName[0]} - ${FileName[1]} - ${(stats.size / 1024)}Kb`)
}
}

})
()
