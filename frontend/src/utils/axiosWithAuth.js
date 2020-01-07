import axios from "axios";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("userToken");
    return axios.create({
        "Content-Type": "application/json",
        headers: {
            Authorization: token
        }
    });
};
