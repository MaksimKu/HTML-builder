const fs = require('fs');
const path = require('path');

fs.mkdir(
    path.join(__dirname, 'files-copy'),
    (err) => {
        if (err) throw err;
}
    )
