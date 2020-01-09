import axios from "axios";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("Authorization");
    console.log(token);
    return axios.create({
        "Content-Type": "application/json",
        baseURL: "https://dev-desk-back-end.herokuapp.com/",
        headers: {
            Authorization: token
        }
    });
};
