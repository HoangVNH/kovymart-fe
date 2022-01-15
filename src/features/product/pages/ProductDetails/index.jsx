import "./styles.scss";

import { Col, InputNumber, Row, Typography } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import ImageWithFallBack from "../../../../components/ImageWithFallback";
import Utils from "../../../../components/UIKit/Utils";
import {
  getProductById,
  selectProductDetails,
} from "../../productSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { addToCart } from "../../../cart/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const productDetails = useSelector(selectProductDetails);
  const [quantity, setQuantity] = useState(1);

  const { productName, price, description, discount, largeImage } =
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

      dispatch(addToCart(modifiedProduct));
    },
    [dispatch, modifyProduct]
  );

  useEffect(() => {
    if (Number(productId) > 0) {
      dispatch(getProductById({ productId }));
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
          <Col lg={12} className="pe-5">
            <ImageWithFallBack
              className="rounded"
              src={largeImage}
              alt={productName}
            />
          </Col>
          <Col lg={12} className="px-2">
            <h1 className="product-details__name"> {productName}</h1>
            <div className="text-wrap lh-1 mb-3">
              <span className="product-details__price">
                {Utils.Money({ money: price })}
              </span>
              { discount > 0 ? 
              <>
                <br />
                <Text delete type="secondary">
                  {Utils.Money({ money: price * (1 + discount * 0.01) })}
                </Text>
              </> : null}
            </div>
            <InputNumber
              className="mb-3"
              defaultValue={quantity}
              onChange={(e) => setQuantity(e)}
              min={1}
              max={99}
            />
            <br />
            <button
              className="product-details__add-to-cart-btn"
              onClick={() => handleAddToCart(productDetails, quantity)}
            >
              <PlusOutlined /> Thêm vào giỏ
            </button>
            <button className="product-details__buy-now-btn" >
              Mua ngay
            </button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={16}>
            <div className="mt-4">
              <div>{ReactHtmlParser(description)}</div>
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
