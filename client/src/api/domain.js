import axios from "axios";

const Domain = axios.create({
    baseURL:"http://localhost:5000"
})

export default Domain ;