const fs = require('fs');
const path = require('path');

const FILE_FOLDER = path.join(process.cwd(), 'public', 'files');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'files.json');

const exploreDir = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  const directory = {};

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const fileInfo = fs.lstatSync(path.join(dirPath, file));

    if (fileInfo.isFile()) {
      directory[file] = {
        isFile: true,
        fileType: file.split('.').pop(),
        size: fileInfo.size,
      };
    } else if (fileInfo.isDirectory()) {
      directory[file] = exploreDir(path.join(dirPath, file));
    }
  }

  return directory;
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(exploreDir(FILE_FOLDER)));
