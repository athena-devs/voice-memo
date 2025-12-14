import { AppError } from "@shared/app-error";
import fs from "fs";

export class FsClient {
  create(streamFile: string) {
    return fs.createReadStream(streamFile)
  }

  rename(path: string, streamFile: string) {
    if (fs.existsSync(streamFile) && fs.existsSync(path)) {
        fs.renameSync(path, streamFile)
    }else {
        throw new AppError("Error verifing if files exists", 500)
    }    
  }

  delete(path: string, streamFile: string) {
    if (fs.existsSync(streamFile) && fs.existsSync(path)) {
        fs.unlinkSync(path)
        fs.unlinkSync(streamFile);
    }else {
        throw new AppError("Error verifing if files exists", 500)
    }
  }
}