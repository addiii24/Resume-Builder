import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const registeruser = async ({ username, email, password }) => {
    try {
        const response = await api.post("/api/auth/registeruser", { username, email, password })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const loginuser = async ({ email, password }) => {
    try {
        const response = await api.post("/api/auth/loginuser", { email, password })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const logoutuser = async () => {
    try {
        const response = await api.get("/api/auth/logoutuser")
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getmeuser = async () => {
    try {
        const response = await api.get("/api/auth/getme")
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}