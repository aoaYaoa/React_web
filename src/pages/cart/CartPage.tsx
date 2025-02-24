import React, { useState } from 'react';
import { Table, Button, InputNumber, Space, Typography, Card, Empty, Input, Tooltip } from 'antd';
import { DeleteOutlined, ShoppingOutlined, MinusOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useCartStore, type CartItem } from '@/zustand/modules/cart';
import type { ProductState } from '@/reduxTookit/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import styles from './CartPage.module.scss';

const { Text, Title } = Typography;

const CartPage: React.FC = () => {
  const { items, totalAmount, removeFromCart, updateQuantity, updateRemark, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((item: CartItem) => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      updateQuantity(id, newQuantity);
    }
  };

  const columns: ColumnsType<CartItem> = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      render: (price: number) => `¥${price.toLocaleString()}`
    },
    {
      title: '数量',
      key: 'quantity',
      width: '20%',
      render: (_: unknown, record: CartItem) => (
        <Space>
          <Button 
            icon={<MinusOutlined />} 
            onClick={() => handleQuantityChange(record.id, -1)}
            disabled={record.quantity <= 1}
          />
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={(value) => updateQuantity(record.id, value || 1)}
            style={{ width: 60 }}
          />
          <Button 
            icon={<PlusOutlined />} 
            onClick={() => handleQuantityChange(record.id, 1)}
          />
        </Space>
      )
    },
    {
      title: '备注',
      key: 'remark',
      width: '20%',
      render: (_: unknown, record: CartItem) => (
        editingId === record.id ? (
          <Input
            defaultValue={record.remark}
            onPressEnter={(e) => {
              updateRemark(record.id, e.currentTarget.value);
              setEditingId(null);
            }}
            onBlur={(e) => {
              updateRemark(record.id, e.target.value);
              setEditingId(null);
            }}
            autoFocus
          />
        ) : (
          <Space>
            <Text>{record.remark || '-'}</Text>
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => setEditingId(record.id)}
            />
          </Space>
        )
      )
    },
    {
      title: '小计',
      key: 'subtotal',
      width: '15%',
      render: (_: unknown, record: CartItem) => (
        <Text type="danger">
          ¥{(record.price * record.quantity).toLocaleString()}
        </Text>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: '15%',
      render: (_: unknown, record: CartItem) => (
        <Tooltip title="删除">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeFromCart(record.id)}
          />
        </Tooltip>
      )
    }
  ];

  if (items.length === 0) {
    return (
      <Card>
        <Empty
          image={<ShoppingOutlined style={{ fontSize: 48 }} />}
          description="购物车是空的"
        >
          <Button type="primary" onClick={() => navigate('/product/list')}>
            去购物
          </Button>
        </Empty>
      </Card>
    );
  }

  return (
    <div className={styles.cartPage}>
      <Card>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Title level={4}>我的购物车</Title>
          
          <Table
            columns={columns}
            dataSource={items}
            rowKey="id"
            pagination={false}
            summary={() => (
              <Table.Summary>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={4}>
                    <Space>
                      <Button onClick={clearCart} danger>清空购物车</Button>
                      <Button onClick={() => navigate('/product/list')}>继续购物</Button>
                    </Space>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <Text strong>总计：</Text>
                    <Text type="danger" strong>
                      ¥{totalAmount.toLocaleString()}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <Button type="primary" size="large">
                      结算 ({items.length} 件商品)
                    </Button>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </Space>
      </Card>
    </div>
  );
};

export default CartPage; 