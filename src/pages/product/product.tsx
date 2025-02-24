import React, { useState } from 'react';
import { Button, Input, InputNumber, Form, Space, Modal, Select, message, Badge } from 'antd';
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { SearchTable } from '@/components/SearchTable';
import { useAppDispatch, useAppSelector } from '@/reduxTookit/store';
import { addProduct, updateProduct, deleteProduct, searchProducts, selectProducts } from '@/reduxTookit/slices/productSlice';
import type { ProductState } from '@/reduxTookit/slices/productSlice';
import { CartDrawer } from '@/components/Cart/CartDrawer';
import { useCartStore } from '@/zustand/modules/cart';
import { ColumnsType } from 'antd/es/table';

const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ProductState | null>(null);
  const [selectedRows, setSelectedRows] = useState<ProductState[]>([]);
  const [cartVisible, setCartVisible] = useState(false);
  const { addToCart, totalQuantity } = useCartStore();

  const columns: ColumnsType<ProductState> = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `¥${price.toLocaleString()}`
    },
    {
      title: '商品状态',
      dataIndex: 'state',
      key: 'state',
      filters: [
        { text: '在售', value: '1' },
        { text: '下架', value: '0' }
      ],
      onFilter: (value, record) => record.state.toString() === value,
      render: (state: number, record: ProductState) => (
        <Select
          value={state}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 100 }}
        >
          <Select.Option value={1}>在售</Select.Option>
          <Select.Option value={0}>下架</Select.Option>
        </Select>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: ProductState) => (
        <Space>
          <Button 
            type="link" 
            icon={<ShoppingCartOutlined />}
            onClick={() => addToCart({ ...record, quantity: 1 })}
          >
            加入购物车
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      )
    }
  ];

  const searchFields = [
    {
      name: 'name',
      label: '商品名称',
      component: <Input placeholder="搜索商品名称" allowClear />
    },
    {
      name: 'price',
      label: '价格范围',
      component: <InputNumber placeholder="输入价格" style={{ width: '100%' }} />
    },
    {
      name: 'state',
      label: '商品状态',
      component: (
        <Select placeholder="选择状态" allowClear>
          <Select.Option value={1}>在售</Select.Option>
          <Select.Option value={0}>下架</Select.Option>
        </Select>
      )
    }
  ];

  const handleAdd = () => {
    form.resetFields();
    setEditingRecord(null);
    setModalVisible(true);
  };

  const handleEdit = (record: ProductState) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleStatusChange = (id: string, state: number) => {
    const product = products.find(p => p.id === id);
    if (product) {
      dispatch(updateProduct({ ...product, state }));
      message.success('状态更新成功');
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个商品吗？',
      onOk: () => {
        dispatch(deleteProduct(id));
        message.success('删除成功');
      }
    });
  };

  const handleBatchDelete = () => {
    if (selectedRows.length === 0) {
      message.warning('请选择要删除的商品');
      return;
    }
    Modal.confirm({
      title: '确认批量删除',
      content: `确定要删除选中的 ${selectedRows.length} 个商品吗？`,
      onOk: () => {
        selectedRows.forEach(row => dispatch(deleteProduct(row.id)));
        setSelectedRows([]);
        message.success('批量删除成功');
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        dispatch(updateProduct({ ...values, id: editingRecord.id }));
        message.success('更新成功');
      } else {
        dispatch(addProduct({ ...values, id: Date.now().toString() }));
        message.success('添加成功');
      }
      setModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const CartButton = () => {
    const { totalQuantity } = useCartStore();
    return (
      <Badge count={totalQuantity}>
        <Button 
          icon={<ShoppingCartOutlined />}
          onClick={() => setCartVisible(true)}
        >
          购物车
        </Button>
      </Badge>
    );
  };

  const toolbarActions = [
    <CartButton key="cart" />,
    <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
      添加商品
    </Button>,
    <Button 
      key="batchDelete" 
      danger 
      disabled={selectedRows.length === 0}
      onClick={handleBatchDelete}
    >
      批量删除
    </Button>
  ];

  return (
    <div style={{ padding: 24 }}>
      <SearchTable
        rowKey="id"
        columns={columns}
        dataSource={products}
        searchFields={searchFields}
        toolbarActions={toolbarActions}
        onSearch={(values) => dispatch(searchProducts(values))}
        onReset={() => dispatch(searchProducts({}))}
        rowSelection={{
          onChange: (_, rows) => setSelectedRows(rows)
        }}
        bordered
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`
        }}
      />

      <Modal
        title={editingRecord ? '编辑商品' : '添加商品'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="商品名称"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item
            name="price"
            label="商品价格"
            rules={[{ required: true, message: '请输入商品价格' }]}
          >
            <InputNumber
              min={0}
              precision={2}
              style={{ width: '100%' }}
              placeholder="请输入商品价格"
            />
          </Form.Item>
          <Form.Item
            name="state"
            label="商品状态"
            rules={[{ required: true, message: '请选择商品状态' }]}
          >
            <Select>
              <Select.Option value={1}>在售</Select.Option>
              <Select.Option value={0}>下架</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <CartDrawer 
        open={cartVisible}
        onClose={() => setCartVisible(false)}
      />
    </div>
  );
};

export default ProductPage; 