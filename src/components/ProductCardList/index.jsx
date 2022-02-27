import { Col, Row, Skeleton } from "antd";
import { addProductToCart } from "../../features/cart/cartSlice";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard";
import "./styles.scss";
import { useNavigate } from 'react-router-dom';
import { isValidArray, modifyProduct } from "../../helpers/common"; 
import { NotFoundComponent } from "../NotFound";

const ProductCardList = ({
  isFetching,
  isFetchingCategory,
  catId,
  products,
  title,
  layout,
  className,
  style,
  isHomepage = false
  }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modifyProduct = useCallback((product, quantity) => {
    const modifiedProduct = {
      ...product,
      quantity,
      productId: product.id,
    };
    delete modifiedProduct["id"];

    return modifiedProduct;
  }, []);

  const handleAddToCart = useCallback(
    (product, quantity = 1) => {
      const modifiedProduct = modifyProduct(product, quantity);

      dispatch(addProductToCart(modifiedProduct));
    },
    [dispatch, modifyProduct]
  );

  const handleNavigateToCategoryPage = useCallback(() => {
    navigate(`/category/${catId}`);
  }, [navigate, catId]);

  return (
    isValidArray(products) ?
      <div className="product-list__container">
        <div className={`product-list__header ${className}`} style={style}>
          <span>{ isFetchingCategory ? <Skeleton /> : title}</span>
          {isHomepage &&
            <button
              onClick={handleNavigateToCategoryPage}
            >
              Xem thêm
            </button>}
        </div>
        <Row gutter={layout.gutter} className="product-list__wrapper">
          {products.map((product) => (
            <Col
              {...layout.span}
              key={`${product.id + product.categoryId}`}
            >
              <ProductCard
                id={product.id}
                name={product.productName}
                price={product.price}
                netPrice={product.netPrice}
                discount={product.discount}
                onAddToCart={() => handleAddToCart(product)}
                smallImage={product.smallImage}
                isFetching={isFetching}
              />
            </Col>
          ))}
        </Row>
      </div> : <NotFoundComponent />
  );
};

ProductCardList.propTypes = {
  catId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  products: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  layout: PropTypes.object,
};

ProductCardList.defaultProps = {
  catId: 1,
  className: "",
  style: {},
  layout: {},
};

export default ProductCardList;
