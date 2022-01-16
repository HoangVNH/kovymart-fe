import { Button, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ImageWithFallBack from "../ImageWithFallback";
import PropTypes from "prop-types";
import Utils from "../UIKit/Utils";
import "./styles.scss";

const ProductCard = ({
  id,
  smallImage,
  name,
  price,
  className,
  style,
  onAddToCart,
}) => {
  return (
    <Card
      hoverable
      className={`product-card__wrapper ${className}`}
      style={style}
    >
      <Link to={`/product/${id}`}>
        <div className="product-card__image">
          <ImageWithFallBack src={smallImage} alt={name} />
        </div>
      </Link>
      <Link to={`/product/${id}`} style={{ flex: '1 0 auto' }}>
        <p className="product-card__name">{name}</p>
      </Link>
      <div className="product-card__price">
        <div className="product-card__price--left">
          <span className="product-card__net-price">
            {Utils.Money({ money: price })}
          </span>
        </div>
        <Button className="product-card__button" onClick={onAddToCart}>
          Thêm vào giỏ
        </Button>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  smallImage: PropTypes.string,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
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
