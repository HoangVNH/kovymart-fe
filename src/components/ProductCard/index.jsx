import { Button, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ImageWithFallBack from "../ImageWithFallback";
import PropTypes from "prop-types";
import Utils from "../UIKit/Utils";
import "./styles.scss";
import Skeleton from "react-loading-skeleton";

const ProductCard = ({
  id,
  smallImage,
  name,
  price,
  className,
  style,
  onAddToCart,
  isFetching
}) => {
  return (
    <Card
      hoverable
      className={`product-card__wrapper ${className}`}
      style={style}
    >
      <Link to={`/product/${id}`}>
        <div className="product-card__image">
          {
            isFetching ?
            <Skeleton height={310} /> :
            <ImageWithFallBack src={smallImage} alt={name} />
          }
        </div>
      </Link>
      <Link to={`/product/${id}`} style={{ flex: '1 0 auto' }}>
        <p className="product-card__name">{ isFetching ? <Skeleton /> : name}</p>
      </Link>
      <div className="product-card__price">
        <div className="product-card__price--left">
          <span className="product-card__net-price">
            { isFetching ? <Skeleton /> : Utils.Money({ money: price })}
          </span>
        </div>
        <Button
          className="product-card__button"
          onClick={onAddToCart}
          disabled={isFetching}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  name: PropTypes.string.isRequired,
  smallImage: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]) ,
  discount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  className: PropTypes.string,
  style: PropTypes.shape({}),
  onAddToCart: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  smallImage: "",
  discount: 0,
  className: "",
  style: {},
};

export default ProductCard;
