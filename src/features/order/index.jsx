import {
  Col,
  Row,
  Card,
  Typography,
  Space,
  Divider,
  Input,
  Form,
  Tag,
  Button,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import ButtonUI from "../../components/UIKit/ButtonUI";
import Utils from "../../components/UIKit/Utils";
import { useNavigate, Link } from "react-router-dom";
import { checkAuth } from "../../helpers/auth";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalListAddress from "../../features/address/components/ModalListAdress";
import {
  getAddressList,
  selectDefaultAddress,
  selectRequesting,
} from "../address/addressSlice";
import {
  selectOrderMessage,
  setMessageOrderToDefault,
  insertOrder,
} from "./orderSlice";
import { getCart, selectTotalItemsInCart } from "../../features/cart/cartSlice";
import { paymentId, ASYNC_STATUS } from "../../constants";
import { NotifyHelper } from "../../helpers/notify-helper";

const { Text, Title } = Typography;
const { TextArea } = Input;

const Order = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const default_address = useSelector(selectDefaultAddress);
  const order_message = useSelector(selectOrderMessage);
  const totalItemsInCart = useSelector(selectTotalItemsInCart);
  const dispatch = useDispatch();

  useEffect(() => {
    const isUserLoggedIn = checkAuth();
    if (!isUserLoggedIn || totalItemsInCart <= 0) {
      navigate("/");
    } else {
      dispatch(getAddressList());
      dispatch(getCart());
    }
  }, [dispatch, navigate, totalItemsInCart]);

  const handleSubmit = (e) => {
    if (default_address.id) {
      const data = {
        note: e.note,
        totalPrice: cart.totalPrice,
        paymentId: paymentId,
        addressId: default_address.id,
        items: cart.items,
      };
      dispatch(insertOrder(data));
    }
    else {
      NotifyHelper.error('Vui lòng thêm địa chỉ để đặt hàng', '');
    }
  };

  useEffect(() => {
    if (order_message === ASYNC_STATUS.SUCCESS) {
      dispatch(setMessageOrderToDefault());
      navigate("/order-success");
    }
  }, [dispatch, order_message, navigate]);

  const requesting = useSelector(selectRequesting);
  const [visibleListAddress, setVisibleListAddress] = useState(false);
  const handleChangeAddress = () => {
    setVisibleListAddress(true);
  };

  const callbackVisibleListAddress = useCallback(
    (val) => {
      setVisibleListAddress(val);
    },
    [setVisibleListAddress]
  );

  return (
    <Row type="flex" align="middle" justify="center" className="my-5">
      <ModalListAddress
        visible={visibleListAddress}
        setVisibility={callbackVisibleListAddress}
      />
      <Col lg={14} xs={23}>
        <Card className="card-shadow border-3 px-4 pb-4">
            <Form onFinish={handleSubmit}>
              <Row>
                <Col span={24}>
                  <Title level={4} style={{ color: "#e99667" }}>
                    <Space>
                      <HomeOutlined />
                      Thông tin địa chỉ
                    </Space>
                  </Title>
                  <Row>
                    <Col md={20} xs={24}>
                      {/* Name */}
                      {Object.keys(default_address).length > 0 && !requesting ? (
                        <>
                          {" "}
                          <Row className="mt-3">
                            <Col md={5} xs={10}>
                              <Text strong>Tên: </Text>
                            </Col>
                            <Col>
                              <Text> {default_address.name}</Text>
                            </Col>
                          </Row>
                          {/* Phone */}
                          <Row>
                            <Col md={5} xs={10}>
                              <Text strong>Số điện thoại: </Text>
                            </Col>
                            <Col>
                              <Text> {default_address.phone}</Text>
                            </Col>
                          </Row>
                          {/* Address */}
                          <Row>
                            <Col md={5} xs={10}>
                              <Text strong>Địa chỉ: </Text>
                            </Col>
                            <Col>
                              <Text>
                                {default_address.address} -{" "}
                                {default_address.ward.name} -{" "}
                                {default_address.district.name} -{" "}
                                {default_address.province.name}
                              </Text>
                            </Col>
                          </Row>
                          {/* Payment method */}
                          <Row>
                            <Col md={5} xs={10} />
                            <Col>
                              <Tag color="blue">Thanh toán bằng tiền mặt</Tag>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <>
                          {Object.keys(default_address).length === 0
                            ? <>
                              <Text strong> Vui lòng thêm địa chỉ để tiến hành thanh toán</Text>
                            </>
                            : null
                          }
                        </>
                      )}
                    </Col>
                    <Col xs={24} md={4} className="mt-3">
                      {Object.keys(default_address).length === 0
                        ? <>
                          <Link to="/address">
                            <ButtonUI
                              htmlType="button"
                              variant="light"
                              text="Thêm địa chỉ"
                            />
                          </Link>
                        </>
                        : <ButtonUI
                            className="float-right"
                            text="Thay đổi"
                            variant="light"
                            htmlType="button"
                            onClick={handleChangeAddress}
                          />
                      }
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Col span={16}>
                <Form.Item
                  label={<Text strong>Ghi chú</Text>}
                  name="note"
                  className="mt-4"
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
              <Row style={{ marginTop: "14%" }}>
                <Space
                  type="flex"
                  align="middle"
                  justify="center"
                  direction="vertical"
                  style={{ flex: "1" }}
                  value={30}
                >
                  <Row align="middle" justify="center">
                    <Col xs={14} md={8}>
                      <Text strong>Tạm tính: </Text>
                    </Col>
                    <Col xs={10} md={8} className="align-end">
                      <Text strong>
                        {Utils.Money({ money: cart.totalPrice })}
                      </Text>
                    </Col>
                  </Row>
                  {/* <Row align="middle" justify="center">
                    <Col xs={14} md={8}>
                      <Text strong>Phí vận chuyển: </Text>
                    </Col>
                    <Col xs={10} md={8} className="align-end">
                      <Text strong>{Utils.Money({ money: fee.shipping })}</Text>
                    </Col>
                  </Row> */}
                  <Divider />
                  <Row align="middle" justify="center">
                    <Col xs={14} md={8}>
                      <Text strong>Tổng tiền: </Text>
                    </Col>
                    <Col xs={10} md={8} className="align-end">
                      <Text strong>
                        {Utils.Money({ money: cart.totalPrice })}
                      </Text>
                    </Col>
                  </Row>
                </Space>
              </Row>
              <Col style={{ textAlign: "center", marginTop: "2em" }}>
                <Row type="flex" justify="center">
                  <Link to={"/cart"}>
                    <Button
                      style={{ marginRight: '8px' }}
                      htmlType="button"
                    >
                      Quay lại
                    </Button>
                  </Link>
                  {
                    default_address &&
                    <Button
                      type="primary"
                      htmlType="submit"
                    >
                      Xác nhận thanh toán
                    </Button>
                  }
                </Row>
              </Col>
            </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Order;
