import { Col, Row, Typography } from "antd";
import ImageWithFallBack from "../../../components/ImageWithFallback";
import Utils from "../../../components/UIKit/Utils";
import PropTypes from "prop-types";
import { changeQuantity, removeProductFromCart } from "../cartSlice";
import { useDispatch } from "react-redux";
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles.scss";
import Quantity from "../../../components/Quantity";

const { Title } = Typography;

const ProductCartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const minValue = 0;
  const maxValue = 90;

  // const handleDeleteProduct = useCallback(
  //   (id) => {
  //     dispatch(removeProductFromCart({ itemId: id }));
  //     setIsModalVisible(false);
  //   },
  //   [dispatch]
  // );

  const handleChangeQuantity = useCallback((productId, quantity) => {
    dispatch(changeQuantity({ productId, quantity }));
  }, [dispatch]);

  const handleIncrease = useCallback(() => {
    if (quantity + 1 <= maxValue) {
      const newQuantity = +(quantity + 1);

      setQuantity(quantity + 1);
      handleChangeQuantity(product.productId, newQuantity)
    }
  }, [handleChangeQuantity, product.productId, quantity]);

  const handleDecrease = useCallback(() => {
    const newQuantity = +(quantity - 1);

    if (newQuantity === minValue) {
      dispatch(removeProductFromCart({ itemId: product.productId }));
    } else {
      setQuantity(newQuantity);
      handleChangeQuantity(product.productId, newQuantity)
    }
  }, [dispatch, product.productId, quantity, handleChangeQuantity]);

  return (
    <Col span={24} className="rounded-3 mb-3 border p-2 shadow-sm">
      <Row className="my-3" style={{ alignItems: 'center' }}>
        <Col span={9} sm={8} lg={6} className="ps-2">
          <Link to={`/product/${product.productId}`}>
            <ImageWithFallBack
              className="rounded"
              src={product.smallImage || ""}
            />
          </Link>
        </Col>
        <Col span={15} sm={12} lg={14} className="ps-4">
          <Link to={`/product/${product.productId}`}>
            <Title level={5} style={{ fontSize: '18px' }}>
              {product.productName ? (
                product.productName
              ) : (
                <>{product.name ? product.name : "Title"}</>
              )}
            </Title>
          </Link>
          <div className="cart-detail__price-wrapper">
            <span className="cart-detail__price-title">
              Đơn giá:&nbsp;
            </span>
            {Utils.Money({ money: product.price })}
          </div>
          <div className="cart-detail__price-wrapper">
            <span className="cart-detail__price-title">
              Số tiền:&nbsp;
            </span>
            {Utils.Money({ money: product.total })}
          </div>
        </Col>
        <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Quantity
            quantity={quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
          />
        </Col>
      </Row>
    </Col>
  );
};

ProductCartItem.propTypes = {
  product: PropTypes.object,
  onChangeQuantity: PropTypes.func,
};

export default ProductCartItem;
