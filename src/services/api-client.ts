import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "669d6f507708485b98d3516e28f8e8da",

    }
})