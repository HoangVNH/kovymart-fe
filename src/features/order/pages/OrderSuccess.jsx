import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, Row, Col, Typography, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { setMessageOrderToDefault } from "../orderSlice";
const { Text, Title } = Typography;

const OrderSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMessageOrderToDefault());
  })
  return (
    <Row type="flex" align="middle" justify="center" className="my-5">
      <Col lg={14} xs={22}>
        <Card
          className="card-shadow px-5"
          type="flex"
          align="middle"
          justify="center"
        >
          <Row type="flex" align="middle" justify="center">
            <Col sm={24} md={14}>
              <Title level={2}>
                <CheckCircleOutlined style={{ color: '#40a9ff' }} />
                <br />
              </Title>
              <Title level={1}>
                Đặt hàng thành công !
              </Title>
              <br />{" "}
              <Text style={{ fontSize: "1.2em" }}>
                Đơn hàng của bạn đã được đặt hàng thành công chúng tôi sẽ cố
                gắng giao hàng nhanh nhất !
              </Text>
              <br />
              <Link to={"/"}>
                <Button
                  className="my-5"
                  type="primary"
                  htmlType="submit"
                  block={true}
                  size="large"
                >
                  Tiếp tục mua hàng
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderSuccess;
