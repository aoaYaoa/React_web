import type { FormProps, FormItemProps } from 'antd/es/form';
import type { ColProps } from 'antd/es/grid';

export interface FormField {
  name: string;
  label: string;
  type: 'input' | 'select' | 'date' | 'number' | 'textarea' | 'switch' | 'radio' | 'checkbox' | 'upload';
  component?: React.ReactNode; // 自定义组件
  rules?: FormItemProps['rules'];
  props?: Record<string, any>; // 组件属性
  options?: { label: string; value: any }[]; // 选项
  colProps?: ColProps; // 布局属性
  hidden?: boolean;
  disabled?: boolean;
}

export interface BaseFormProps {
  fields: FormField[];
  formProps?: FormProps;
  layout?: 'horizontal' | 'vertical' | 'inline';
  colSpan?: number;
  labelWidth?: number;
  initialValues?: Record<string, any>;
  onFinish?: (values: any) => void;
  onReset?: () => void;
  submitText?: string;
  resetText?: string;
  showActions?: boolean;
} 