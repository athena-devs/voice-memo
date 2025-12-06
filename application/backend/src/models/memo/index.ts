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