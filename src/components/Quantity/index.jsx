import { Button } from 'antd';
import {
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons';
import React from 'react';
import './styles.scss'

const Quantity = ({
  className,
  onDecrease,
  onIncrease,
  quantity,
  isLoading
}) => {
  return (
    <div className={`group-quantity ${className}`}>
      <Button
        className="group-quantity__button decrease"
        onClick={onDecrease}
        icon={<MinusOutlined />}
        disabled={isLoading}
      />
      <div className="value">
        {quantity}
      </div>
      <Button
        className="group-quantity__button increase"
        onClick={onIncrease}
        icon={<PlusOutlined /> }
        disabled={isLoading}
      />
    </div>
  )
};

export default Quantity;
