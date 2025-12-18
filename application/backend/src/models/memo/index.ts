import { ReadStream } from "fs"

export interface IMemo {
    title: string | null
    summary: string | null
    text: string
    path: string
    userId: string
}

export interface ICreateMemoInput {
    filePath: string;
    userId: string;
    mimetype: string;
}

export interface ITranscrpitonMemo {
    file: ReadStream, 
    model: string,
    responseFormat: 'json' | 'text' | 'verbose_json', 
    language: string
}