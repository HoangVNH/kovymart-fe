import './styles.scss';

import React from 'react';
import { Spin } from 'antd';

const CustomizedSpin = () => {
  return (
    <div className="spin__wrapper">
      <Spin />
    </div>
  )
};

export default CustomizedSpin;