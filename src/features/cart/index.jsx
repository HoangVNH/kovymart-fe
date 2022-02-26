import Payment from "./components/Payment";
import ProductCartItem from "./components/ProductCartItem";
import { Col, Row, Modal, Button } from "antd";
import ButtonUI from "../../components/UIKit/ButtonUI";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  selectCartItems,
  getCart,
  selectTotalPrice,
  clearCart,
} from "./cartSlice";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { checkAuth } from "../../helpers/auth";
import EmptyCartIcon from '../../assets/images/empty-cart.svg';
const { confirm } = Modal;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isUserLoggedIn = checkAuth();

  const checkCartHasItems = (cartItems) =>
    Array.isArray(cartItems) && cartItems.length > 0;

  const hasItems = checkCartHasItems(cartItems);

  const showConfirmModal = () => {
    return confirm({
      visible: isModalVisible,
      title: 'Thông báo',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc muốn xóa toàn bộ sản phẩm ?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Đóng',
      onOk() {
        dispatch(clearCart());
      },
      onCancel() {
        setIsModalVisible(false);
      },
    });
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(getCart());
    } else {
      navigate("/");
    }
  }, [dispatch, isUserLoggedIn, navigate]);

  return hasItems ? (
  <Row type="flex" justify="center">
    <Col className="my-5" span={24} xl={20}>
      <div className="cart-detail__header">
        <div className="cart-detail__title">Giỏ hàng của bạn</div>
        <div className="clear-button__wrapper">
          <button
            onClick={showConfirmModal}
            className="n-btn"
          >
            Xóa hết
          </button>
        </div>
      </div>
      <Row className="mt-5 " type="flex" justify="center">
        <Col
          span={24}
          sm={13}
          lg={16}
          className="mb-4 d-flex justify-content-center"
        >
          <Row span={24}>
            {cartItems.map((item) => (
              <ProductCartItem key={item.productId} product={item} />
            ))}
          </Row>
        </Col>
        <Col span={22} sm={11} lg={8} style={{ paddingLeft: '48px' }}>
          <Payment totalPrice={totalPrice} totalProducts={cartItems?.length}/>
        </Col>
      </Row>
    </Col>
  </Row>
  ) : (
    <div className="cart--no-items">
      <img src={EmptyCartIcon} alt="Empty cart"/>
      <div className='not-found-page__heading' />
      <div className='not-found-page__content'>
        Chưa có sản phẩm trong giỏ hàng
      </div>
      <div className='not-found-page__heading' />
      <Button
        type="primary"
        htmlType="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Tiếp tục mua hàng
      </Button>
    </div>
  );
};

export default Cart;
