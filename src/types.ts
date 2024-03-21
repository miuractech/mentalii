export interface message {
    text: string,
    uid: string,
    photoURL: string,
    id: string
    emotion?:string
}

export type ChatMessageProps = {
    message: message,
    key: string
}