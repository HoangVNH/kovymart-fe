import { selectCategories } from "../../features/category/categorySlice";
import {
  getProductsByCategoryId,
  selectProduct,
} from "../../features/product/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardList from "../../components/ProductCardList";
import "./styles.scss";
import CircleCategory from "../../components/CircleCategory";
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss/grid";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

const HomePage = () => {
  const dispatch = useDispatch();
  const productData = useSelector(selectProduct);
  const categories = useSelector(selectCategories);
  // const { productList1, productList2, productList3 } = productData;
  // const layout = {
  //   gutter: { xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 },
  //   span: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
  // };

  const shouldRenderCategories = (categories) =>
    Array.isArray(categories) && categories.length > 0;

  const renderCategoriesBlock = (categories) =>
    shouldRenderCategories(categories) && (
      <div className="category-list__wrapper">
        <div className="category-title">
          Danh mục sản phẩm
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true
          }}
          slidesPerView={6}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
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

  // useEffect(() => {
  //   dispatch(getProductsByCategoryId(1));
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getProductsByCategoryId(2));
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getProductsByCategoryId(3));
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getCategoryList());
  // }, [dispatch]);

  return (
    <>
      { 
      renderCategoriesBlock(categories)
      
      // <ProductCardList
      //   products={productList1.slice(0, 4)}
      //   title="Rau - Củ - Trái cây"
      //   layout={layout}
      // />
      /*
      <ProductCardList
        products={productList2.slice(0, 4)}
        title="Thịt - Hải sản - Trứng"
        layout={layout}
      />
      <ProductCardList
        products={productList3.slice(0, 4)}
        title="Dầu ăn - Gia vị - Đồ khô"
        layout={layout}
      /> */}
    </>
  );
};

export default HomePage;
