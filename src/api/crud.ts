//生成mock数据
import Mock from 'mockjs';
import { mockCrudList, type CrudItem } from '@/mock/todoData';

export const getCrudList = () => {
  return mockCrudList;
};

// 添加数据
export const addCrud = (data: CrudItem) => {
  mockCrudList.push(data);
};

// 更新数据
export const updateCrud = (data: CrudItem) => {
  const index = mockCrudList.findIndex(item => item.id === data.id);
  if (index !== -1) {
    mockCrudList[index] = data;
  }
};

// 删除数据
export const deleteCrud = (id: number) => {
  const index = mockCrudList.findIndex(item => item.id === id);
  if (index !== -1) {
    mockCrudList.splice(index, 1);
  }
};



