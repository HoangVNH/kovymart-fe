import './styles.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundProductImage from '../../assets/images/no-product-result.svg';
import ButtonUI from '../UIKit/ButtonUI';

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
        <ButtonUI
          variant="success"
          text="Quay lại trang chủ"
          onClick={() => {
            navigate("/");
          }}
        />
        // <button
        //   className="product-details__add-to-cart-btn not-found-page__back-button"
        //   onClick={() => navigate('/')}
        // >
        //   Quay lại trang chủ
        // </button> 
      }
    </div>
  );
};

const PageNotFound = () => {
  console.log('hello world')
  return <NotFoundComponent />;
};

export default PageNotFound;
