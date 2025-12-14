import { ICreateMemoInput } from '@models/memo'
import { AppError } from '@shared/app-error'
import { env } from '@shared/env'
import { responseFormat } from '@shared/response-format'
import * as Minio from 'minio'

export class MinioClient {
  private client: Minio.Client;
  private bucketName = "voice-memo-storage"

  constructor() {
    this.client = new Minio.Client({
      endPoint: env.MINIO_HOST,
      port: env.MINIO_PORT,
      useSSL: true,
      accessKey: env.MINIO_ACESS_KEY,
      secretKey: env.MINIO_SECRET_KEY,
    })
  }

  async upload(data: ICreateMemoInput) {    
    try {  
      const exists = await this.client.bucketExists(this.bucketName)
    
      if (!exists) {
        await this.client.makeBucket(this.bucketName, "sa-east-1")
        console.log(responseFormat({
          statusCode: 200,
          message: "WARNING! A Bucket was created see if nothing nasty is happening!"
        }))
      }
      
      const sourceFile: string = data.filePath
      const objectName: string = `${data.userId}-${Date.now()}-${data.mimetype}`  
      
      const metaData = { 
        'Content-Type': `${data.mimetype}`,
        'userId': `${data.userId}`,
        'path': `${data.filePath}`
      }

      const put = await this.client.fPutObject(this.bucketName, objectName, sourceFile, metaData)

      const response: object = {
        src: sourceFile,
        dest: objectName,
        meta: metaData,
        etag: put.etag,
        bucket: this.bucketName
      }

      return responseFormat({
        statusCode: 200,
        message: "Audio Created!",
        data: response
      })
    } catch (err) {
      throw new AppError(`An error ocurried trying upload a audio: ${err}`, 500)
    }
  }
}