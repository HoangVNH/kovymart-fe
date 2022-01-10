import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../apis/productApis";
import categoryApi from "../../apis/categoryApis";
import { NotifyHelper } from "../../helpers/notify-helper";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  list_products: [],
  category_detail: {
    id: 0,
    name: "",
    description: "",
  },
  pagination: {
    page: 0,
    finished: false,
  },
  categories: [
    {
      id: 0,
      name: "Giảm đến 25%",
      description: "",
      image: "https://image.cooky.vn/ads/s320/f8b2fae1-59a8-4ee3-b3c7-ffa2e0d47570.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:09.199Z",
      updatedAt: "2021-08-11T00:10:09.199Z"
    },
    {
      id: 1,
      name: "Rau Củ",
      description: "",
      image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:09.199Z",
      updatedAt: "2021-08-11T00:10:09.199Z"
    },
    {
      id: 2,
      name: "Trái Cây",
      description: "",
      image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:09.199Z",
      updatedAt: "2021-08-11T00:10:09.199Z"
    },
    {
      id: 3,
      name: "Thịt - Hải sản - Trứng",
      description: "",
      image: "https://image.cooky.vn/ads/s320/e7728abb-2f5c-4e3e-8a7e-ee8d9bfab13a.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:26.629Z",
      updatedAt: "2021-08-11T00:10:26.629Z"
    },
    {
      id: 4,
      name: "Gia Vị",
      description: "",
      image: "https://image.cooky.vn/ads/s320/1459e7e9-0d7f-4812-a74b-edebc92d9950.jpeg",
      isDelete: false,
      createdAt: "2021-08-11T00:10:38.438Z",
      updatedAt: "2021-08-11T00:10:38.438Z"
    },
    {
      id: 5,
      name: "Đồ Tươi",
      description: "",
      image: "https://image.cooky.vn/ads/s320/7a9252a4-ac13-437f-9ec5-7321963ef691.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:45.096Z",
      updatedAt: "2021-08-11T00:10:45.096Z"
    },
    {
      id: 6,
      name: "Sữa",
      description: "",
      image: "https://image.cooky.vn/ads/s320/26d4fb05-a828-4292-a8b4-4e7a10e3722d.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:52.148Z",
      updatedAt: "2021-08-11T00:10:52.148Z"
    },
    {
      id: 7,
      name: "Đồ uống",
      description: "",
      image: "https://image.cooky.vn/ads/s320/ac8d4890-4838-429f-8b9e-a8532a1df6cb.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:58.533Z",
      updatedAt: "2021-08-11T00:10:58.533Z"
    },
    {
      id: 8,
      name: "Bánh Kẹo",
      description: "",
      image: "https://image.cooky.vn/ads/s320/8a2bac80-036d-4e0c-914d-17ac130c50ec.png",
      isDelete: false,
      createdAt: "2021-08-11T00:11:05.429Z",
      updatedAt: "2021-08-11T00:11:05.429Z"
    },
    {
      id: 9,
      name: "Hóa Phẩm",
      description: "",
      image: "https://image.cooky.vn/ads/s320/c74c6a42-95cd-4c5e-9632-c9a29b8f9c3d.png",
      isDelete: false,
      createdAt: "2021-08-11T00:11:12.334Z",
      updatedAt: "2021-08-11T00:11:12.334Z"
    },
    {
      id: 10,
      name: "Lương thực",
      description: "",
      image: "https://image.cooky.vn/ads/s320/5f225ed6-a1c3-4ef6-a246-3a6cd2a33397.png",
      isDelete: false,
      createdAt: "2021-08-11T00:11:12.334Z",
      updatedAt: "2021-08-11T00:11:12.334Z"
    }
  ],
};

//----------ACTIONS----------
export const getProductsPagination = createAsyncThunk(
  "category/getProductsPagination",
  async (data) => {
    const response = await productApi.getProductsPagination(data);
    return response.data;
  }
);

// export const getCategoryList = createAsyncThunk(
//   "category/getCategoryList",
//   async () => {
//     const response = await categoryApi.getCategoryList();
//     return response.data;
//   }
// );

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id) => {
    const response = await categoryApi.getCategoryById(id);
    return response.data;
  }
);

//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("category");
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("category");

//----------REDUCERS----------
const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    sortCategory: (state, action) => {
      switch (action.payload.selected) {
        case "incrementPrice":
          state.list_products.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
          break;
        case "decrementPrice":
          state.list_products.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
          break;
        case "alphabet":
          state.list_products.sort((a, b) => {
            if (a.productName < b.productName) return -1;
            if (a.productName > b.productName) return 1;
            return 0;
          });
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsPagination.fulfilled, (state, action) => {
        if (action.payload.data.length === 0) {
          //check if loadmore is done
          state.success = state.requesting = false;
          state.pagination.finished = true;
        } else {
          if (action.payload.data.page > 1) {
            state.list_products = state.list_products.concat(
              action.payload.data
            );
          } else {
            state.list_products = action.payload.data;
          }
          state.requesting = false;
          state.success = true;
        }
        state.pagination.page++;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.category_detail = action.payload;
      })
      // .addCase(getCategoryList.pending, (state) => {
      //   state.requesting = true;
      // })
      // .addCase(getCategoryList.fulfilled, (state, { payload }) => {
      //   state.requesting = false;
      //   state.categories = payload.data;
      // })
      //---------------PENDING & REJECTION---------------
      .addMatcher(isPendingAction, (state) => {
        state.requesting = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.requesting = state.success = false;
        state.message = action.error.message;
        NotifyHelper.error(action.error.message, "Yêu cầu thất bại!");
      });
  },
});

export const selectCategory = (state) => state.category.category_detail;
export const selectProducts = (state) => state.category.list_products;
export const selectPagination = (state) => state.category.pagination.page;
export const selectCategories = (state) => state.category.categories;
export const { sortCategory } = categorySlice.actions;
export default categorySlice.reducer;
