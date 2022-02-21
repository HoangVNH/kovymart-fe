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
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss/grid";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

const HomePage = () => {
  const dispatch = useDispatch();
  const productData = useSelector(selectProduct);
  const categories = useSelector(selectCategories);
  const { 
    filteredProducts1,
    filteredProducts2,
    filteredProducts3,
    filteredProducts4,
    filteredProducts5
  } = productData;
  const layout = {
    gutter: [ 16, 24 ],
    span: { xs: 6 },
  };

  const shouldRenderCategories = (categories) =>
    Array.isArray(categories) && categories.length > 0;

  const renderCategoriesBlock = (categories) =>
    shouldRenderCategories(categories) && (
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
          // onSwiper={(swiper) => console.log(swiper)}
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
    dispatch(getProductsByCategoryId({ catId: 1}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCategoryId({ catId: 2}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCategoryId({ catId: 3}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCategoryId({ catId: 4}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCategoryId({ catId: 5}));
  }, [dispatch]);

  return (
    <>
      { renderCategoriesBlock(categories) }
      
      <ProductCardList
        products={filteredProducts1 || [].slice(0, 4)}
        title="Rau Củ"
        layout={layout}
        catId={1}
        isHomepage
      />
      <ProductCardList
        products={filteredProducts2 || [].slice(0, 4)}
        title="Trái Cây"
        layout={layout}
        catId={2}
        isHomepage
      />
      <div className="custom-divider" />
      <ProductCardList
        products={filteredProducts3 || [].slice(0, 4)}
        title="Gia vị - Đồ khô"
        layout={layout}
        catId={3}
        isHomepage
      />
      <div className="custom-divider" />
      <ProductCardList
        products={filteredProducts4 || [].slice(0, 4)}
        title="Thịt - Hải Sản"
        layout={layout}
        catId={4}
        isHomepage
      />
      <div className="custom-divider" />
       <ProductCardList
        products={filteredProducts5 || [].slice(0, 4)}
        title="Sữa"
        layout={layout}
        catId={5}
        isHomepage
      />
    </>
  );
};

export default HomePage;
