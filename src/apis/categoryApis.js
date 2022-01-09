import axiosClient from "./axiosClient"

const categoryApis = {
  getCategoryList() {
    return new Promise((resolve) => setTimeout(() => resolve({ data: [
      {
        id: 1,
        name: "Rau Củ - Trái Cây",
        description: "",
        image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:09.199Z",
        updatedAt: "2021-08-11T00:10:09.199Z"
      },
      {
        id: 2,
        name: "Thịt - Hải sản - Trứng",
        description: "",
        image: "https://image.cooky.vn/ads/s320/e7728abb-2f5c-4e3e-8a7e-ee8d9bfab13a.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:26.629Z",
        updatedAt: "2021-08-11T00:10:26.629Z"
      },
      {
        id: 3,
        name: "Gia Vị",
        description: "",
        image: "https://image.cooky.vn/ads/s320/1459e7e9-0d7f-4812-a74b-edebc92d9950.jpeg",
        isDelete: false,
        createdAt: "2021-08-11T00:10:38.438Z",
        updatedAt: "2021-08-11T00:10:38.438Z"
      },
      {
        id: 4,
        name: "Đồ Tươi",
        description: "",
        image: "https://image.cooky.vn/ads/s320/7a9252a4-ac13-437f-9ec5-7321963ef691.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:45.096Z",
        updatedAt: "2021-08-11T00:10:45.096Z"
      },
      {
        id: 5,
        name: "Sữa",
        description: "",
        image: "https://image.cooky.vn/ads/s320/26d4fb05-a828-4292-a8b4-4e7a10e3722d.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:52.148Z",
        updatedAt: "2021-08-11T00:10:52.148Z"
      },
      {
        id: 6,
        name: "Đồ uống",
        description: "",
        image: "https://image.cooky.vn/ads/s320/ac8d4890-4838-429f-8b9e-a8532a1df6cb.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:58.533Z",
        updatedAt: "2021-08-11T00:10:58.533Z"
      },
      {
        id: 7,
        name: "Bánh Kẹo",
        description: "",
        image: "https://image.cooky.vn/ads/s320/8a2bac80-036d-4e0c-914d-17ac130c50ec.png",
        isDelete: false,
        createdAt: "2021-08-11T00:11:05.429Z",
        updatedAt: "2021-08-11T00:11:05.429Z"
      },
      {
        id: 8,
        name: "Hóa Phẩm",
        description: "  ",
        image: "https://image.cooky.vn/ads/s320/c74c6a42-95cd-4c5e-9632-c9a29b8f9c3d.png",
        isDelete: false,
        createdAt: "2021-08-11T00:11:12.334Z",
        updatedAt: "2021-08-11T00:11:12.334Z"
      }
    ]}), 500))
  },
  getCategoryById(id) {
    const url = `/category/${id}`
    return axiosClient.get(url)
  },
}

export default categoryApis;
