import "./styles.scss";

import { Col, Row, Tag, Space, InputNumber, Typography } from "antd";
import {
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageWithFallBack from "../../../../components/ImageWithFallback";
import Utils from "../../../../components/UIKit/Utils";
import ButtonUI from "../../../../components/UIKit/ButtonUI";
import {
  getProductById,
  selectProductDetails,
} from "../../productSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

const ProductDetails = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const productDetails = useSelector(selectProductDetails);
  const [quantity, setQuantity] = useState(1);

  const { productName, price, description, discount, largeImage } =
    productDetails;
  const { Text } = Typography;

  // const modifyProduct = useCallback((product, quantity) => {
  //   const modifiedProduct = {
  //     ...product,
  //     quantity,
  //     productId: product.id,
  //     productName: product.name,
  //   };
  //   delete modifiedProduct["id"];
  //   delete modifiedProduct["name"];

  //   return modifiedProduct;
  // }, []);

  // const handleBuyNow = useCallback(
  //   (product) => {
  //     const modifiedProduct = modifyProduct(product, 1);

  //     dispatch(addProductToCart(modifiedProduct));
  //     history.push("/cart");
  //   },
  //   [dispatch, modifyProduct, history]
  // );

  // const handleAddToCart = useCallback(
  //   (product, quantity) => {
  //     const modifiedProduct = modifyProduct(product, quantity);

  //     dispatch(addProductToCart(modifiedProduct));
  //   },
  //   [dispatch, modifyProduct]
  // );

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
            <Tag className="mb-2" color="warning">
              <Text strong type="warning">
                {" "}
                {discount}% OFF
              </Text>
            </Tag>
            <br />
            <h2 className="fw-bold mb-0"> {productName}</h2>
            <div className="text-muted mb-5">
              {/* <CheckCircleOutlined className="me-2 align-baseline" />
            <span className="mb-2"></span>Sẵn có 5kg */}
            </div>
            <div className="text-wrap lh-1 mb-3">
              <Text strong style={{ lineHeight: "0" }}>
                Giá:
                {Utils.Money({ money: price })}
              </Text>
              <br />
              <Text delete type="secondary">
                {Utils.Money({ money: price * (1 + discount * 0.01) })}
              </Text>
              <br />
              <Text type="secondary">(Đã tính thuế)</Text>
            </div>
            <InputNumber
              className="mb-3"
              defaultValue={quantity}
              onChange={(e) => setQuantity(e)}
              min={1}
              max={99}
            />
            <br />
            <Space>
              <ButtonUI
                text="Thêm giỏ hàng"
                withIcon={<PlusOutlined className="align-baseline" />}
                // onClick={() => handleAddToCart(productDetail, quantity)}
              />
              {/* <ButtonUI
                text="Mua ngay"
                withIcon={<ShoppingCartOutlined className="align-baseline" />}
                onClick={() => handleBuyNow(productDetail)}
              /> */}
            </Space>
            <div className="mt-5">
              <Text>Lý do nên mua sản phẩm ?</Text>
              <br />
              <Text style={{ color: "#0dcaf0" }}>
                <CheckOutlined className="align-baseline" /> Dễ dàng đổi và hoàn
                trả
              </Text>
              <br />
              <Text style={{ color: "#0dcaf0" }}>
                <CheckOutlined className="align-baseline" /> Đảm bảo giá cả phải
                chăng
              </Text>
            </div>
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
