import { useParams } from "react-router-dom";
import ButtonUI from "../../components/UIKit/ButtonUI";
import { useDispatch, useSelector } from "react-redux";
import {
  sortCategory,
  getProductsPagination,
  selectProducts,
  selectCategoryDetails,
  getCategoryById,
  selectIsRequestingCategory,
  selectIsRequestingProducts,
  removeDataWhenUnmounting
} from "./categorySlice";
import { useState, useEffect } from "react";
import { Row, Col, Typography, Select } from "antd";
import { isValidArray } from "../../helpers/common";
import { NotFoundComponent } from "../../components/NotFound";
import ProductCardList from "../../components/ProductCardList";
import CustomizedSpin from "../../components/Spin";

const { Title } = Typography;
const { Option } = Select;

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("incrementPrice");
  const products = useSelector(selectProducts);
  // const pagination = useSelector(selectPagination);
  const categoryDetails = useSelector(selectCategoryDetails);
  const isRequestingCategory = useSelector(selectIsRequestingCategory);
  const isRequestingProducts = useSelector(selectIsRequestingProducts);

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
    dispatch(getProductsPagination({ categoryId, page: 1 }));
  }, [dispatch, categoryId]);

  useEffect(() => {
    return () => {
      dispatch(removeDataWhenUnmounting());
    }
  }, [dispatch]);

  return (
    (isRequestingCategory || isRequestingProducts) ? <CustomizedSpin /> :
    isValidArray(products) && categoryName ? (
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
            <Row type="flex" justify="end" className="mt-3">
              <ButtonUI text="Lọc sản phẩm" onClick={handleSelect} />
            </Row>
          </Col>
        </Row>
      <Row className="mt-5">
        <Col span={22}>
          {products && categoryName && (
            <ProductCardList
              products={products}
              title={categoryName}
              layout={layout}
            />
          )}
        </Col>
      </Row>
      </>
    ) : <NotFoundComponent />
  );
};

export default Category;
