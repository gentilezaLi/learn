import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Button, Space, Image } from 'antd-mobile';
import { fetchItems } from './index';
import type { Item } from './index';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error('Failed to load items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <h1>Items List</h1>
        <List>
          {items.map((item) => (
            <List.Item
              key={item.id}
              prefix={
                <Image
                  src={item.image}
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
              }
              title={item.title}
              description={item.description}
              onClick={() => navigate(`/detail/${item.id}`)}
              extra={<Button size="small">View Detail</Button>}
            />
          ))}
        </List>
      </Space>
    </div>
  );
};

export default HomePage;
