import React, { useMemo, memo } from 'react';
import { Form, Row, Col, Input, Select, DatePicker, InputNumber, Switch, Radio, Checkbox, Upload, Button, Space } from 'antd';
import type { BaseFormProps, FormField } from './types';
import styles from './index.module.scss';

const { TextArea } = Input;

// 缓存表单项渲染
const FormItem = memo(({ field, renderField }: { field: FormField; renderField: (field: FormField) => React.ReactNode }) => (
  <Col span={field.colProps?.span || 24} {...field.colProps}>
    <Form.Item
      name={field.name}
      label={field.label}
      rules={field.rules}
      hidden={field.hidden}
    >
      {renderField(field)}
    </Form.Item>
  </Col>
));

export const BaseForm = memo(function BaseForm({
  fields,
  formProps,
  layout = 'horizontal',
  colSpan = 24,
  labelWidth,
  initialValues,
  onFinish,
  onReset,
  submitText = '提交',
  resetText = '重置',
  showActions = true
}: BaseFormProps) {
  const [form] = Form.useForm();

  const formItemLayout = useMemo(() => {
    if (layout === 'vertical' || !labelWidth) return {};
    return {
      labelCol: { style: { width: labelWidth } },
      wrapperCol: { style: { width: `calc(100% - ${labelWidth}px)` } }
    };
  }, [layout, labelWidth]);

  const renderField = (field: FormField) => {
    const { type, props = {}, options = [] } = field;

    switch (type) {
      case 'input':
        return <Input {...props} />;
      case 'select':
        return <Select options={options} {...props} />;
      case 'date':
        return <DatePicker {...props} />;
      case 'number':
        return <InputNumber style={{ width: '100%' }} {...props} />;
      case 'textarea':
        return <TextArea {...props} />;
      case 'switch':
        return <Switch {...props} />;
      case 'radio':
        return <Radio.Group options={options} {...props} />;
      case 'checkbox':
        return <Checkbox.Group options={options} {...props} />;
      case 'upload':
        return <Upload {...props} />;
      default:
        return field.component || null;
    }
  };

  return (
    <Form
      form={form}
      layout={layout}
      initialValues={initialValues}
      onFinish={onFinish}
      {...formItemLayout}
      {...formProps}
    >
      <Row gutter={24}>
        {fields.map(field => {
          if (field.hidden) return null;
          
          return (
            <FormItem key={field.name} field={field} renderField={renderField} />
          );
        })}
      </Row>
      {showActions && (
        <Form.Item wrapperCol={{ offset: layout === 'horizontal' ? 6 : 0 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              {submitText}
            </Button>
            <Button onClick={() => {
              form.resetFields();
              onReset?.();
            }}>
              {resetText}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
}); 