import "./styles.scss";

import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Suspense, useState } from "react";
import AuthContext from "./AuthContext";
import HomePage from "../../features/home";
import ProductDetails from "../../features/product/pages/ProductDetails";
import Category from "../../features/category";
import Cart from "../../features/cart";
import Address from "../../features/address";
import Order from "../../features/order";
import OrderSuccess from "../../features/order/pages/OrderSuccess";
import SearchResult from '../../features/search';
import PageNotFound from '../../components/NotFound';

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path='/product/:productId' element={<ProductDetails />} />
              <Route path='/category/:categoryId' element={<Category />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/address" element={<Address />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/product" element={<SearchResult />} />
              <Route path="/order" element={<Order />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Content>
          <Footer />
        </AuthContext.Provider>
      </Layout>
    </Suspense>
  );
}

export default MainLayout;
