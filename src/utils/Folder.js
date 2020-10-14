import shortid from 'shortid';
import pathBrowserify from 'path-browserify';

class Folder {
  constructor(folder, path) {
    this.folder = folder;
    this.path = path || '/';

    if (!this.path.startsWith('/')) {
      this.path = `/${this.path}`;
    }
  }

  static isFile(file) {
    return file.isFile && typeof file.isFile === 'boolean';
  }

  static isFolder(file) {
    return !Folder.isFile(file);
  }

  static size(document) {
    if (Folder.isFile(document)) {
      return document.size;
    }

    return Object.keys(document).reduce((size, file) => size + Folder.size(document[file]), 0);
  }

  static parsePath(path) {
    const formattedPath = path.slice(
      path.startsWith('/') ? 1 : 0,
      path.endsWith('/') ? path.length - 1 : path.length,
    );

    if (path.length <= 1 && formattedPath.length === 0) {
      return [];
    }

    return formattedPath.split('/');
  }

  subFolder(path) {
    const folders = Folder.parsePath(path);

    let subFolder = this.folder;
    for (let i = 0; i < folders.length; i += 1) {
      subFolder = subFolder[folders[i]];

      if (!subFolder || Folder.isFile(subFolder)) {
        return null;
      }
    }

    return new Folder(subFolder, pathBrowserify.join(this.path, folders.join('/')));
  }

  get files() {
    return Object.keys(this.folder)
      .filter((fileName) => Folder.isFile(this.folder[fileName]))
      .map((fileName) => ({
        name: fileName,
        path: pathBrowserify.join(this.path, fileName),
        fileInfo: this.folder[fileName],
        id: shortid.generate(),
      }));
  }

  get folders() {
    return Object.keys(this.folder)
      .filter((folderName) => Folder.isFolder(this.folder[folderName]))
      .map((folderName) => ({
        name: folderName,
        path: pathBrowserify.join(this.path, folderName),
        folder: this.folder[folderName],
        folderInfo: { size: Folder.size(this.folder[folderName]) },
        id: shortid.generate(),
      }));
  }
}

export default Folder;
