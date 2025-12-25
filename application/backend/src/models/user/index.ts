export interface IUser {
    id: string
    name: string
    email: string
    password: string
}

export interface IUserCreateDTO {
    name: string
    email: string
    password: string
}

export interface IUserRequestDTO {
    email: string
    password: string
}

export interface IUserResponseDTO {
    id: string
    name: string
    email: string
}