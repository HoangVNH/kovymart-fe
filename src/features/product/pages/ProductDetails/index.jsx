import "./styles.scss";

import { Col, Row, Typography } from "antd";
import {
  PlusOutlined
} from '@ant-design/icons';
import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import ImageWithFallBack from "../../../../components/ImageWithFallback";
import Utils from "../../../../components/UIKit/Utils";
import {
  getProductByIdAsync,
  selectProductDetails,
  selectIsFetching
} from "../../productSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { addProductToCart } from "../../../cart/cartSlice";
import Quantity from "../../../../components/Quantity";
import Skeleton from 'react-loading-skeleton'

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const productDetails = useSelector(selectProductDetails);
  const isFetching = useSelector(selectIsFetching);
  const [quantity, setQuantity] = useState(1);

  const { name, price, description, discount, largeImage } =
    productDetails;
  const { Text } = Typography;

  const modifyProduct = useCallback((product, quantity) => {
    const modifiedProduct = {
      ...product,
      quantity,
      productId: product.id,
    };
    delete modifiedProduct["id"];
    delete modifiedProduct["name"];

    return modifiedProduct;
  }, []);

  const handleAddToCart = useCallback(
    (product, quantity) => {
      const modifiedProduct = modifyProduct(product, quantity);

      dispatch(addProductToCart(modifiedProduct));
    },
    [dispatch, modifyProduct]
  );

  const handleIncrease = () => {
    if (quantity + 1 <= 90) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (Number(productId)) {
      dispatch(getProductByIdAsync(productId));
    }
  }, [dispatch, productId]);

  return productId ? (
    <Row type="flex" justify="center">
      <Col
        className="mt-4 mb-5 shadow-sm  border border-2 rounded-2 p-5"
        md={16}
        xs={23}
      >
        <Row>
          <Col lg={10} className="pe-5">
            { 
              isFetching ? <Skeleton height={195} /> : 
              <ImageWithFallBack
                className="rounded"
                src={largeImage}
                alt={name}
              /> 
            }
          </Col>
          <Col lg={12} className="px-3">
            <h1 className="product-details__name">
              {
                isFetching ? <Skeleton /> : name
              }
            </h1>
            <div className="text-wrap lh-1 mb-3">
              <span className="product-details__price">
                { 
                  isFetching ? <Skeleton /> : Utils.Money({ money: price })
                }
              </span>
              { !isFetching && discount > 0 ?
              <>
                <br />
                <Text delete type="secondary">
                  {
                    isFetching ? <Skeleton /> : Utils.Money({ money: price * (1 + discount * 0.01) })
                  }
                </Text>
              </> : null}
            </div>
            <Quantity
              quantity={quantity} 
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
              isLoading={isFetching}
            />
            <br />
            <button
              className="product-details__add-to-cart-btn"
              onClick={() => handleAddToCart(productDetails, quantity)}
              disabled={isFetching}
            >
              <PlusOutlined /> Thêm vào giỏ
            </button>
            <button
              className="product-details__buy-now-btn"
              disabled={isFetching}
            >
              Mua ngay
            </button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={16}>
            <div className="mt-4">
              <div
                className="product-details__description"
              >
                { isFetching ? <Skeleton count={5}/> : ReactHtmlParser(description)}
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  ) : (
    <p>No Data</p>
  );
};

export default ProductDetails;
