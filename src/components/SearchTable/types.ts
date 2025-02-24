import type { ColumnsType, TableProps } from 'antd/es/table';
import type { FormProps } from 'antd/es/form';
import type { InputProps } from 'antd/es/input';
import type { InputNumberProps } from 'antd/es/input-number';
import type { ReactElement } from 'react';

export interface SearchField {
  name: string;
  label: string;
  component: ReactElement;
  span?: number;
  rules?: any[];
  placeholder?: string;
  allowClear?: boolean;
}

export interface SearchConfig {
  showSearch?: boolean;
  formProps?: FormProps;
  colSpan?: number;
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelWidth?: number;
}

export interface ToolbarConfig {
  showToolbar?: boolean;
  align?: 'left' | 'right';
  extra?: React.ReactNode;
}

export interface SearchTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: ColumnsType<T>;
  searchFields?: SearchField[];
  formProps?: FormProps;
  showSearch?: boolean;
  showToolbar?: boolean;
  toolbarActions?: React.ReactNode[];
  onSearch?: (values: any) => void;
  onReset?: () => void;
  virtualScroll?: boolean;
  rowHeight?: number;
  variant?: 'bordered' | 'inner' | 'outer';
} 