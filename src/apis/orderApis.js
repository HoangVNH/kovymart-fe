import axiosClient from "./axiosClient"

const prefix = "order"

const orderApis = {
    insertOrder(data) {
        const url = prefix
        return axiosClient.post(url, data)
    }
}

export default orderApis;