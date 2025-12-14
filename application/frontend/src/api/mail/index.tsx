import { mailApi } from "../../services/axios";

export const getSendConfirmation = async (email: string) =>{
    try {
        const response = await mailApi.get(`data/${email}`)
        return response.data
    } catch (err) {
        console.error(`An error occurred getting API data: ${err}`)
    }
}