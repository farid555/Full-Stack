import api from "../../../api"

interface IUserData {
    email: string
}

interface IUserPasswordData {
    email: string
    password: string
}

const login = async (userData: IUserData) => {
    const res = await api.post('api/v1/users/login', userData) 

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data))
    }

    return res.data
}

const loginWithPassword = async (userData: IUserPasswordData) => {
    const res = await api.post('api/v1/users/login2', userData) 

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data))
    }

    return res.data
}

const logout = async () => {
    localStorage.removeItem("user")
}

const authService = {
    login,
    loginWithPassword,
    logout
}

export default authService