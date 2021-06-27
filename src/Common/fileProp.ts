import { extname } from 'path';

export class CommonFunction {
  //Delete File
  async deleteFile(file_path: string) {
    const fs = require('fs');
    fs.unlink(file_path, function (err) {
      if (err) {
        console.log('Error ' + err);
        throw err;
      } else {
        console.log('Successfully deleted the file.');
      }
    });
  }
}
