import { selectCategories } from "../../features/category/categorySlice";
import {
  getProductByCategoryAsync,
  selectProduct,
} from "../../features/product/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardList from "../../components/ProductCardList";
import "./styles.scss";
import CircleCategory from "../../components/CircleCategory";
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss/grid";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import { isValidArray } from "../../helpers/common";

export const fakeProds = [
  {
    id: '',
    sku: "",
    description: "",
    price: "",
    unit: "",
    discount: "",
    categoryId: "",
    supplierId: "",
    createdAt: "2021-08-12T02:22:27.664Z",
    updatedAt: "2021-08-12T02:22:27.664Z",
    smallImage: "",
    largeImage: "",
    isDelete: false,
    category: {
      id: 1,
      name: "Rau Củ",
      description: "",
      image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:09.199Z",
      updatedAt: "2021-08-11T00:10:09.199Z"
    },
    supplier: {
      id: 8,
      name: "Trái cây nhập khẩu",
      email: "traicaynhapkhau@gmail.com",
      phone: "123456789",
      address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
      createdAt: "2021-08-11T00:17:11.590Z",
      updatedAt: "2021-08-11T00:17:11.590Z",
      isDelete: false
    },
    productName: ""
  },
  {
    id: '',
    sku: "",
    description: "",
    price: "",
    unit: "",
    discount: "",
    categoryId: 4,
    supplierId: 1,
    createdAt: "2021-08-12T01:45:58.817Z",
    updatedAt: "2021-08-12T01:45:58.817Z",
    smallImage: "",
    largeImage: "",
    isDelete: false,
    category: {
      id: 4,
      name: "Thịt - Hải sản - Trứng",
      description: "",
      image: "https://image.cooky.vn/ads/s320/e7728abb-2f5c-4e3e-8a7e-ee8d9bfab13a.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:26.629Z",
      updatedAt: "2021-08-11T00:10:26.629Z"
    },
    supplier: {
      id: 1,
      name: "MEATDeli",
      email: "meatdeli@gmail.com",
      phone: "123456789",
      address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
      createdAt: "2021-08-11T00:14:58.838Z",
      updatedAt: "2021-08-11T00:14:58.838Z",
      isDelete: false
    },
    productName: ""
  },
  {
    id: '',
    sku: "",
    description: "",
    price: "",
    unit: "",
    discount: 0,
    categoryId: 3,
    supplierId: 4,
    createdAt: "2021-08-13T01:45:26.386Z",
    updatedAt: "2021-08-13T01:45:26.386Z",
    smallImage: "",
    largeImage: "",
    isDelete: false,
    category: {
      id: 3,
      name: "Gia Vị - Đồ Khô",
      description: "",
      image: "https://image.cooky.vn/ads/s320/1459e7e9-0d7f-4812-a74b-edebc92d9950.jpeg",
      isDelete: false,
      createdAt: "2021-08-11T00:10:38.438Z",
      updatedAt: "2021-08-11T00:10:38.438Z"
    },
    supplier: {
      id: 4,
      name: "Omachi",
      email: "omachi@gmail.com",
      phone: "123456789",
      address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
      createdAt: "2021-08-11T00:16:00.822Z",
      updatedAt: "2021-08-11T00:16:00.822Z",
      isDelete: false
    },
    productName: ""
  },
  {
    id: '',
    sku: "",
    description: "",
    price: "",
    unit: "",
    discount: 0,
    categoryId: 2,
    supplierId: 8,
    createdAt: "2021-08-12T02:05:21.545Z",
    updatedAt: "2021-08-12T02:05:21.545Z",
    smallImage: "",
    largeImage: "",
    isDelete: false,
    category: {
      id: 2,
      name: "Trái Cây",
      description: "",
      image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
      isDelete: false,
      createdAt: "2021-08-11T00:10:09.199Z",
      updatedAt: "2021-08-11T00:10:09.199Z"
    },
    supplier: {
      id: 8,
      name: "",
      email: "",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
      isDelete: false
    },
    productName: ""
  }
]

const HomePage = () => {
  const dispatch = useDispatch();
  const productData = useSelector(selectProduct);
  const categories = useSelector(selectCategories);
  const { 
    productList1,
    productList2,
    productList3,
    productList4,
    productList5,
    isFetchingProductList1,
    isFetchingProductList2,
    isFetchingProductList3,
    isFetchingProductList4,
    isFetchingProductList5
  } = productData;
  const layout = {
    gutter: [ 16, 24 ],
    span: { xs: 6 },
  };

  const renderCategoriesBlock = (categories) =>
    isValidArray(categories) && (
      <div className="category-list__wrapper">
        <div className="category-title">
          Danh mục sản phẩm
        </div>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true
          }}
          navigation
          slidesPerView={6}
          onSlideChange={() => console.log('slide change')}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id} className="category-list__item-wrapper">
              <CircleCategory
                id={category.id}
                name={category.name}
                image={category.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );

  useEffect(() => {
    dispatch(getProductByCategoryAsync(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductByCategoryAsync(2));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductByCategoryAsync(3));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductByCategoryAsync(4));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductByCategoryAsync(5));
  }, [dispatch]);

  return (
    <>
      {
        renderCategoriesBlock(categories)
      }
      <ProductCardList
        products={ isFetchingProductList1 ? fakeProds : productList1?.slice(0, 4)}
        title="Rau Củ"
        layout={layout}
        catId={1}
        isHomepage
        isFetching={isFetchingProductList1}
      />
      <ProductCardList
        products={ isFetchingProductList2 ? fakeProds : productList2?.slice(0, 4)}
        title="Trái Cây"
        layout={layout}
        catId={2}
        isHomepage
        isFetching={isFetchingProductList2}
      />
      <div className="custom-divider" />
      <ProductCardList
        products={ isFetchingProductList3 ? fakeProds : productList3?.slice(0, 4)}
        title="Gia vị - Đồ khô"
        layout={layout}
        catId={3}
        isHomepage
        isFetching={isFetchingProductList3}
      />
      <div className="custom-divider" />
      <ProductCardList
        products={ isFetchingProductList4 ? fakeProds : productList4?.slice(0, 4)}
        title="Thịt - Hải Sản"
        layout={layout}
        catId={4}
        isHomepage
        isFetching={isFetchingProductList4}
      />
      <div className="custom-divider" />
       <ProductCardList
        products={ isFetchingProductList5 ? fakeProds : productList5?.slice(0, 4)}
        title="Sữa"
        layout={layout}
        catId={5}
        isHomepage
        isFetching={isFetchingProductList5}
      />
    </>
  );
};

export default HomePage;
