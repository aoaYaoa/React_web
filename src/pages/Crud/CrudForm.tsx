import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Space } from 'antd';
import type { CrudItem } from '@/mock/todoData';
import { BaseForm } from '@/components/BaseForm';
import type { FormField } from '@/components/BaseForm/types';

interface Props {
  record?: CrudItem;
  onSubmit: (values: Partial<CrudItem>) => void;
  onCancel: () => void;
}

export function CrudForm({ record, onSubmit, onCancel }: Props) {
  const fields = [
    {
      name: 'name',
      label: '姓名',
      type: 'input',
      rules: [{ required: true, message: '请输入姓名' }],
      props: {
        placeholder: '请输入姓名',
        allowClear: true
      },
      colProps: { span: 12 }
    },
    {
      name: 'age',
      label: '年龄',
      type: 'number',
      rules: [{ required: true, message: '请输入年龄' }],
      props: {
        min: 1,
        max: 120,
        placeholder: '请输入年龄'
      },
      colProps: { span: 12 }
    },
    {
      name: 'address',
      label: '地址',
      type: 'textarea',
      rules: [{ required: true, message: '请输入地址' }],
      props: {
        placeholder: '请输入地址',
        rows: 4
      },
      colProps: { span: 24 }
    },
    {
      name: 'status',
      label: '状态',
      type: 'switch',
      props: {
        checkedChildren: '启用',
        unCheckedChildren: '禁用'
      },
      colProps: { span: 12 }
    }
  ];

  return (
    <BaseForm
      fields={fields as FormField[]}
      initialValues={record}
      onFinish={onSubmit}
      onReset={onCancel}
      layout="vertical"
      submitText="保存"
      resetText="取消"
    />
  );
} 