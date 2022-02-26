import { useParams } from "react-router-dom";
import ButtonUI from "../../components/UIKit/ButtonUI";
import { useDispatch, useSelector } from "react-redux";
import {
  sortCategory,
  selectCategoryDetails,
  getCategoryById,
  selectIsRequestingCategory,
  removeDataWhenUnmounting
} from "./categorySlice";
import {
  getProductByCategorySingleAsync,
  selectIsFetching,
  selectProducts
} from '../product/productSlice';
import { useState, useEffect } from "react";
import { Row, Col, Typography, Select } from "antd";
import ProductCardList from "../../components/ProductCardList";
import { fakeProds } from "../home";

const { Title } = Typography;
const { Option } = Select;

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("incrementPrice");
  const products = useSelector(selectProducts);
  const categoryDetails = useSelector(selectCategoryDetails);
  const isRequestingCategory = useSelector(selectIsRequestingCategory);
  const isFetchingProducts = useSelector(selectIsFetching);

  const { name: categoryName } = categoryDetails;

  const layout = {
    gutter: [16, 24],
    span: { xs: 6 },
  };

  function handleSelect() {
    dispatch(sortCategory({ selected }));
  }

  useEffect(() => {
    dispatch(getCategoryById(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(getProductByCategorySingleAsync(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    return () => {
      dispatch(removeDataWhenUnmounting());
    }
  }, [dispatch]);

  return (
  <>
    <Row className="mt-3 me-5" type="flex" justify="end">
      <Col xs={12} md={8} xl={6}>
        <Title level={5}>Sắp xếp sản phẩm </Title>
        <Select
          defaultValue="incrementPrice"
          onChange={(e) => {
            setSelected((prevState) => (prevState = e));
          }}
          style={{ width: "100%" }}
        >
          <Option value="incrementPrice">Giá tăng dần</Option>
          <Option value="decrementPrice">Giá giảm dần</Option>
          <Option value="alphabet">Sắp xếp a-z</Option>
        </Select>
        <Row 
          type="flex"
          justify="end"
          className="mt-3"
        >
          <ButtonUI
            text="Lọc sản phẩm"
            onClick={handleSelect}
          />
        </Row>
      </Col>
    </Row>
    <Row className="mt-5">
      <Col span={22}>
        <ProductCardList
          products={ isRequestingCategory ? fakeProds : products}
          title={categoryName}
          layout={layout}
          isFetchingCategory={isRequestingCategory}
          isFetching={isFetchingProducts}
        />
      </Col>
    </Row>
    </>
  )
};

export default Category;
