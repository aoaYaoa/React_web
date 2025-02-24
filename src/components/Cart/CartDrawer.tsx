import React from 'react';
import { Drawer, List, Button, InputNumber, Empty, Space, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCartStore, type CartItem } from '@/zustand/modules/cart';
import { useNavigate } from 'react-router-dom';
import styles from './CartDrawer.module.scss';

const { Text } = Typography;

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { items, totalAmount, removeFromCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <Drawer
      title="购物车"
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      extra={
        items.length > 0 && (
          <Text strong>总计: ¥{totalAmount.toLocaleString()}</Text>
        )
      }
    >
      {items.length === 0 ? (
        <Empty description="购物车是空的" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item: CartItem) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeFromCart(item.id)}
                />
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={`¥${item.price.toLocaleString()}`}
              />
              <Space direction="vertical" align="end">
                <InputNumber
                  min={1}
                  value={item.quantity}
                  onChange={(value) => updateQuantity(item.id, value || 1)}
                />
                <Text type="secondary">
                  小计: ¥{(item.price * item.quantity).toLocaleString()}
                </Text>
              </Space>
            </List.Item>
          )}
        />
      )}
      {items.length > 0 && (
        <div className={styles.cartFooter}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="primary" block size="large" onClick={() => navigate('/checkout')}>
              结算 (¥{totalAmount.toLocaleString()})
            </Button>
            <Button block onClick={handleViewCart}>
              查看购物车
            </Button>
          </Space>
        </div>
      )}
    </Drawer>
  );
}; 