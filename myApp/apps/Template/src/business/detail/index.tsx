import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Space, Image } from 'antd-mobile';
import type { Item } from '../home';
import { fetchItems, getItemById } from '../home';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = React.useState<Item | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadItem = async () => {
      if (id) {
        setLoading(true);
        try {
          const items = await fetchItems();
          const foundItem = getItemById(items, parseInt(id, 10));
          setItem(foundItem || null);
        } catch (error) {
          console.error('Failed to load item:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
    );
  }

  if (!item) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Item not found</p>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button onClick={() => navigate('/')}>Go Back</Button>
        <Card title="Item Details">
          <div style={{ padding: '16px' }}>
            <Image
              src={item.image}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h2 style={{ marginTop: '16px' }}>{item.title}</h2>
            <p style={{ marginTop: '8px' }}>{item.description}</p>
          </div>
        </Card>
      </Space>
    </div>
  );
};

export default DetailPage;
