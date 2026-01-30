import { Readable } from "stream"

export interface IMemo {
    id: string
    title: string | null
    status: string | null
    summary: string | null
    text: string
    path: string
    userId: string
}

export interface IMemoCreate {
    title: string | null
    status: string | null
    summary: string | null
    text: string
    path: string
    userId: string
}

export interface IMemoUpdate {
    title?: string
    summary?: string
    status?: string
    text?: string
}

export interface ICreateMemoInput {
    filePath: string;
    userId: string;
    mimetype: string;
    language?: string;
}

export interface ITranscripitonMemo {
    file: Readable, 
    model: string,
    responseFormat: 'json' | 'text' | 'verbose_json', 
    language?: string
}

export interface ITranscriptionJobData {
    memoId: string;
    fileKey: string;
    userId: string;
    language?: string;
    
}

export interface ITranscribeAudioInput {
    memoId: string;
    fileKey: string;
    language?: string;
}