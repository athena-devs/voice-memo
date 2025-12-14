import axios from "axios";

export const mailApi = axios.create({
    baseURL: "http://localhost:8080"
})

