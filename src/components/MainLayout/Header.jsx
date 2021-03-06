/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ShoppingCartOutlined,
  UserOutlined,
  PoweroffOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Col, Form, Layout, Row, Menu, Dropdown } from "antd";
import {
  selectAuth,
  setSignInMsgToDefault,
  setSignOutMsgToDefault,
  setSignOutMsgToSuccess,
  setSignUpMsgToDefault,
  signIn,
  signUp,
} from "../../features/auth/authSlice";
import { checkAuth, clearAccessToken } from "../../helpers/auth";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ASYNC_STATUS } from "../../constants";
import LoginForm from "../../features/auth/components/LoginForm";
import RegisterForm from "../../features/auth/components/RegisterForm";
import { NotifyHelper } from "../../helpers/notify-helper";
import Search from "./Search";
import AuthContext from "./AuthContext";

const { Header } = Layout;

const MainHeader = () => {
  const { isDisplayLoginModal, setIsDisplayLoginModal } = useContext(AuthContext);
  const [isDisplayRegisterModal, setIsDisplayRegisterModal] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [loginFormInstance] = Form.useForm();
  const [registerFormInstance] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, signUpStatus, signInStatus, signOutStatus } =
    useSelector(selectAuth);
  const isUserLoggedIn = checkAuth();

  const handleCloseLoginModal = useCallback(() => {
    setIsDisplayLoginModal(false);
    loginFormInstance.resetFields();
  }, [loginFormInstance, setIsDisplayLoginModal]);

  const handleCloseRegisterModal = useCallback(() => {
    setIsDisplayRegisterModal(false);
    registerFormInstance.resetFields();
  }, [registerFormInstance]);

  const switchToRegisterModal = useCallback(() => {
    setIsDisplayLoginModal(false);
    loginFormInstance.resetFields();
    setIsDisplayRegisterModal(true);
  }, [loginFormInstance, setIsDisplayLoginModal]);

  const switchToLoginModal = useCallback(() => {
    setIsDisplayRegisterModal(false);
    registerFormInstance.resetFields();
    setIsDisplayLoginModal(true);
  }, [registerFormInstance, setIsDisplayLoginModal]);

  const handleRegister = useCallback(
    (values) => {
      dispatch(signUp(values));
    },
    [dispatch]
  );

  const handleLogin = useCallback(
    (values) => {
      dispatch(signIn(values));
      setIsLoggedOut(false);
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    clearAccessToken();
    navigate("/");
    setIsLoggedOut(true);
    dispatch(setSignOutMsgToSuccess());
  }, [navigate, dispatch]);

  const renderMenuItem = () => {
    const menu = (
      <Menu>
        <Menu.Item
          key="info"
          icon={<InfoCircleOutlined />}
          onClick={() => navigate("/info")}
        >
          Th??ng Tin
        </Menu.Item>
        <Menu.Item
          key="logout"
          icon={<PoweroffOutlined />}
          onClick={handleLogout}
        >
          ????ng Xu???t
        </Menu.Item>
      </Menu>
    );

    return isUserLoggedIn && !isLoggedOut ? (
      <Dropdown overlay={menu}>
        <a
          href="#"
          className="link--normalize"
          onClick={(e) => e.preventDefault()}
        >
          <UserOutlined className="navigation-bar__login" /> T??i Kho???n
        </a>
      </Dropdown>
    ) : (
      <button
        type="button"
        className="navigation-bar__login"
        onClick={() => setIsDisplayLoginModal(true)}
      >
        <UserOutlined className="vertical-align-icon" />
        <span>????ng Nh???p</span>
      </button>
    );
  };

  useEffect(() => {
    if (signUpStatus === ASYNC_STATUS.SUCCESS) {
      NotifyHelper.success("????ng k?? th??nh c??ng", "Th??ng b??o");
      handleCloseRegisterModal();
      dispatch(setSignUpMsgToDefault());
    }
  }, [signUpStatus, handleCloseRegisterModal, dispatch]);

  useEffect(() => {
    if (signInStatus === ASYNC_STATUS.SUCCESS) {
      NotifyHelper.success("????ng nh???p th??nh c??ng", "Th??ng b??o");
      handleCloseLoginModal();
      dispatch(setSignInMsgToDefault());
    }
  }, [signInStatus, handleCloseLoginModal, dispatch]);

  useEffect(() => {
    if (signOutStatus === ASYNC_STATUS.SUCCESS) {
      NotifyHelper.success("????ng xu???t th??nh c??ng", "Th??ng b??o");
      dispatch(setSignOutMsgToDefault());
    }
  }, [signOutStatus, dispatch]);

  return (
    <>
      <Header>
        <Row className="navigation-bar">
          <Col flex={3} className="navigation-bar__left">
            <Link to="/" className="navigation-bar__logo link--normalize">
              KovyMart
            </Link>
            <Search />
          </Col>
          <Col flex={2} className="navigation-bar__right">
            {renderMenuItem()}
            {isUserLoggedIn && !isLoggedOut && (
              <Link to="/cart" className="link--normalize navigation-bar__cart">
                <ShoppingCartOutlined className="vertical-align-icon" />
                <span>Gi??? H??ng</span>
              </Link>
            )}
          </Col>
        </Row>
      </Header>

      <LoginForm
        isDisplay={isDisplayLoginModal}
        isFetching={isFetching}
        formInstance={loginFormInstance}
        onClose={handleCloseLoginModal}
        onFinish={handleLogin}
        onRegisterClick={switchToRegisterModal}
      />

      <RegisterForm
        isDisplay={isDisplayRegisterModal}
        isFetching={isFetching}
        formInstance={registerFormInstance}
        onClose={handleCloseRegisterModal}
        onFinish={handleRegister}
        onLoginClick={switchToLoginModal}
      />
    </>
  );
};

export default MainHeader;
