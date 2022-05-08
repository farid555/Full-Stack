import api from "../../../api"

interface IUserData {
    email: string
}

const login = async (userData: IUserData) => {
    const res = await api.post('api/v1/users/login', userData) 

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
    logout
}

export default authService