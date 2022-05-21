const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;
fs.writeFile(
    path.join(__dirname, 'text2.txt'),
    '',
    (err) => {
        if (err) throw err;
}
    )
    stdout.write('Введите текст\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') exit();
  fs.appendFile(
    path.join(__dirname, 'text2.txt'), 
    data,
  err => {
    if (err) throw err;
}
    )})
    process.on('exit', () => stdout.write('До свидания'));
    process.on('SIGINT', exit);
