import React from "react";
import { Input } from "antd";
import {
  useNavigate
} from "react-router-dom";

const Search = () => {
  const navigate = useNavigate()

  const handleSearch = (value) => {
      if(value && value.length > 1)
        navigate(`/product?search=${value}`);
  };

  return (
    <Input.Search
      placeholder="Tìm sản phẩm"
      enterButton="Tìm kiếm"
      onSearch={handleSearch}
      className="ant-input-search--override"
    />
  );
};

export default Search;
