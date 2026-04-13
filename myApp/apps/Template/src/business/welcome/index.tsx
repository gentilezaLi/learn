import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Image } from 'antd-mobile';
import './index.less';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <Image
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20react%20application%20welcome%20page%20with%20clean%20design&image_size=square_hd"
          style={{ width: '200px', height: '200px', marginBottom: '24px' }}
        />
        <h1>Welcome to Template</h1>
        <p className="welcome-description">
          This is a modern React template with Ant Design Mobile, Axios, and Lodash.
        </p>
        <Space direction="vertical" style={{ marginTop: '32px' }}>
          <Button
            color="primary"
            size="large"
            onClick={() => navigate('/home')}
          >
            Go to Items List
          </Button>
          <Button
            size="large"
            onClick={() => navigate('/detail/1')}
          >
            View Sample Detail
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default WelcomePage;