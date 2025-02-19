import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Table, Button, Space, Tag, Tooltip, Drawer, Form, Input, Select, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.scss';
import { mockCrudList } from '@/mock/todoData';
import { getCrudList, addCrud, updateCrud, deleteCrud } from '@/api/crud';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { CrudForm } from './CrudForm';
import { CrudDetail } from './CrudDetail';
import type { CrudItem } from '@/mock/todoData';
import { SearchTable } from '@/components/SearchTable';

export default function CrudPage() {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [title, setTitle] = useState('');
  const [list, setData] = useState<CrudItem[]>([]);
  const [currentRecord, setCurrentRecord] = useState<CrudItem>();
  const [drawerType, setDrawerType] = useState<'form' | 'detail'>('form');
  const [searchForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<Partial<CrudItem>>({});
  const [loading, setLoading] = useState(false);

  // 缓存表格列配置
  const columns: ColumnsType<CrudItem> = useMemo(() => [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100,
      fixed: 'left' as const
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
      sorter: (a: CrudItem, b: CrudItem) => a.age - b.age
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 120,
      ellipsis: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 180,
      ellipsis: true
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 120
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 160,
      sorter: (a: CrudItem, b: CrudItem) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 160
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status ? 'success' : 'error'}>
          {status ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right' as const,
      width: 150,
      render: (_, record: CrudItem) => (
        <Space>
          <Tooltip title="查看">
            <Button onClick={() => showDetail(record)} type="link" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button onClick={() => edit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="删除">
            <Button onClick={() => handleDelete(record.id)} type="link" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      )
    }
  ], []);

  // 缓存搜索字段配置
  const searchFields = useMemo(() => [
    {
      name: 'name',
      label: '姓名',
      component: <Input placeholder="请输入姓名" allowClear />,
      rules: [{ required: true, message: '请输入姓名' }]
    },
    {
      name: 'phone',
      label: '电话',
      component: <Input placeholder="请输入电话" allowClear />
    },
    {
      name: 'status',
      label: '状态',
      component: (
        <Select
          placeholder="请选择状态"
          allowClear
          options={[
            { value: true, label: '启用' },
            { value: false, label: '禁用' }
          ]}
        />
      )
    }
  ], []);

  // 缓存事件处理函数
  const handleSearch = useCallback((values: Partial<CrudItem>) => {
    setSearchParams(values);
    const filtered = getCrudList().filter(item => {
      return Object.entries(values).every(([key, value]) => {
        if (!value) return true;
        if (key === 'status' && value !== undefined) {
          return item[key] === value;
        }
        return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
      });
    });
    setData(filtered);
  }, []);

  // 缓存数据处理
  const processedData = useMemo(() => {
    return list.map(item => ({
      ...item,
      key: item.id
    }));
  }, [list]);

  useEffect(() => {
    const list = getCrudList();
    setData(list);
  }, []);

  const showDetail = (record: CrudItem) => {
    setCurrentRecord(record);
    setTitle('详情');
    setDrawerType('detail');
    setIsShowDrawer(true);
  };

  const edit = (record?: CrudItem) => {
    setIsShowDrawer(true);
    setTitle(record ? '编辑' : '新增');
    setCurrentRecord(record);
    setDrawerType('form');
  };

  const handleDelete = (id:number) => {
    deleteCrud(id);
  }

  const handleSubmit=(values:Partial<CrudItem>)=>{}

  return (
    <div className={styles.container}>
      <SearchTable<CrudItem>
        columns={columns}
        dataSource={processedData}
        searchFields={searchFields}
        toolbarActions={[
          <Button 
            key="add" 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => edit()}
          >
            新增
          </Button>
        ]}
        onSearch={handleSearch}
        virtualScroll={list.length > 100}
        rowHeight={54}
        loading={loading}
        size="middle"
        bordered
      />
      <Drawer 
        title={title} 
        open={isShowDrawer} 
        onClose={() => setIsShowDrawer(false)}
        width={600}
        bodyStyle={{ padding: '24px' }}
        maskClosable={false}
        destroyOnClose
        extra={
          <Space>
            {drawerType === 'detail' && (
              <Button type="primary" onClick={() => {
                setDrawerType('form');
                setTitle('编辑');
              }}>
                编辑
              </Button>
            )}
            <Button onClick={() => setIsShowDrawer(false)}>关闭</Button>
          </Space>
        }
      >
        <div className={styles.drawerContent}>
          {drawerType === 'form' ? (
            <CrudForm
              record={currentRecord}
              onSubmit={handleSubmit}
              onCancel={() => setIsShowDrawer(false)}
            />
          ) : (
            <CrudDetail record={currentRecord!} />
          )}
        </div>
      </Drawer>
    </div>
  );
}

