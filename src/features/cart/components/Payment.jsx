import { Row, Col, Typography } from "antd";
import Utils from "../../../components/UIKit/Utils";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { NotifyHelper } from "../../../helpers/notify-helper";
import { checkAuth } from "../../../helpers/auth";
import { fee } from "../../../constants";
import React, { useCallback } from "react";

const { Text } = Typography;

const Payment = ({ totalPrice, totalProducts }) => {
  const navigate = useNavigate();

  const handlePayment = useCallback(() => {
    const isUserLoggedIn = checkAuth();

    if (!isUserLoggedIn) {
      NotifyHelper.error(
        "Vui lòng đăng nhập để tiến hành thanh toán !",
        "Không thể thanh toán"
      );
    } else {
      navigate("/order");
    }
  }, [navigate]);

  return (
    <div className="border shadow-sm rounded-2 sticky-payment-form cart-detail__payment">
      {/* <Row className="mb-3">
        <Col xs={12} sm={24} md={12} span={12}>
          <Text strong>Tạm tính:</Text>
        </Col>
        <Col
          xs={12}
          sm={24}
          md={12}
          span={12}
          className="d-flex justify-content-end align-items-end"
        >
          <Text>{Utils.Money({ money: totalPrice })}</Text>
        </Col>
      </Row> */}
      {/* <Row className="mb-3">
        <Col xs={12} sm={24} md={12} span={12}>
          <Text strong>Phí vận chuyển:</Text>
        </Col>
        <Col
          xs={12}
          sm={24}
          md={12}
          span={12}
          className="d-flex justify-content-end align-items-end"
        >
          <Text>{Utils.Money({ money: fee.shipping })}</Text>
        </Col>
      </Row> */}
      <Row style={{ flex: '1 0 auto', marginBottom: '16px' }}>
        <span>
          <Text strong> Tổng thanh toán ({totalProducts} sản phẩm)</Text>
        </span>
        <Col
          xs={12}
          sm={24}
          md={12}
          span={12}
          className="d-flex justify-content-end align-items-end"
        >
          <Text></Text>
        </Col>
      </Row>
      <div className="cart-detail__checkout">
        <button
          className="n-btn"
          onClick={handlePayment}
        >
          {Utils.Money({ money: totalPrice })} - Mua hàng
        </button>
      </div>
    </div>
  );
};

Payment.propTypes = {
  totalPrice: PropTypes.number,
  totalProducts: PropTypes.number
};

Payment.defaultProps = {
  totalPrice: 0,
  totalProducts: 0
};

export default Payment;
