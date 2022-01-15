import "./styles.scss";

import { Layout } from "antd";
import { Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import mappedRoutes from "../../routes";
import { Suspense, useState } from "react";
import AuthContext from "./AuthContext";

const { Content } = Layout;

const MainLayout = () => {
  const [isDisplayLoginModal, setIsDisplayLoginModal] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout style={{ minHeight: "inherit", background: "#FFF" }}>
        <AuthContext.Provider value={{
          isDisplayLoginModal,
          setIsDisplayLoginModal,
        }}>
          <Header />
          <Content>
            <Routes>{mappedRoutes}</Routes>
          </Content>
          <Footer />
        </AuthContext.Provider>
      </Layout>
    </Suspense>
  );
}

export default MainLayout;
