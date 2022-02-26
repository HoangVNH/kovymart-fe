import './styles.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundProductImage from '../../assets/images/no-product-result.svg';
import { Button } from 'antd';

export const NotFoundComponent = ({ shouldRenderButton = true }) => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page__wrapper">
      <img src={NotFoundProductImage} alt="Not found product"/>
      <div className='not-found-page__heading' />
      <div className='not-found-page__content'>
        Không có kết quả được tìm thấy theo yêu cầu của bạn
      </div>
      <div className='not-found-page__heading' />
      {
        shouldRenderButton &&
        <Button
          type='primary'
          htmlType='button'
          onClick={() => {
            navigate("/");
          }}
        >
          Quay lại trang chủ
        </Button>
      }
    </div>
  );
};

const PageNotFound = () => {
  return <NotFoundComponent />;
};

export default PageNotFound;
