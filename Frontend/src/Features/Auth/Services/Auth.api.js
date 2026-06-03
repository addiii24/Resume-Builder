import axios from "axios";

export const registeruser = async ({ username, email, password }) => {
    try {
        const response = await axios.post("http://localhost:300/api/auth/registeruser",
            {
                username,
                email,
                password
            }, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}