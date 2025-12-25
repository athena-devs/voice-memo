import {IUserCreateDTO, IUser, IUserResponseDTO } from "@models/user"

export interface UsersRepository {
    createUser(data: IUserCreateDTO): Promise<IUserResponseDTO>
    getUser(id: string): Promise<IUserResponseDTO | null>
    findByEmail(email: string): Promise<IUser | null>
    updateUser(id: string, data: IUserResponseDTO): Promise<IUserResponseDTO | null>
    deleteUser(id: string | null): Promise<void>
}