import { AppError } from "@shared/app-error";
import fs from "fs";

export class FsClient {
  create(streamFile: string) {
    return fs.createReadStream(streamFile)
  }

  rename(srcPath: string, destPath: string) {
    if (fs.existsSync(srcPath)) {
        fs.renameSync(srcPath, destPath)
    } else {
        throw new AppError(`File not found for rename. Source: ${srcPath}, Dest: ${destPath}`, 500)
    }    
  }

  delete(path: string, streamFile: string) {
    try {
        if (fs.existsSync(path)) fs.unlinkSync(path);
        if (fs.existsSync(streamFile)) fs.unlinkSync(streamFile);
    } catch (error) {
        throw new AppError(`Error deleting files: ${error}`, 500)
    }
  }
}