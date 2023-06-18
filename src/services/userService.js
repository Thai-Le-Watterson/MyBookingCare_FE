import { symbolName } from "typescript";
import axios from "../axios";

const handleUserLogin = async (email, password) => {
    try {
        const response = await axios.post("/api/login", { email, password });
        return response.userData;
    } catch (e) {
        console.log(e.response);
    }
};

export { handleUserLogin };
