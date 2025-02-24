import type { ProductState } from '@/reduxTookit/slices/productSlice';

// Cart Types
export interface CartItem extends ProductState {
  quantity: number;
  remark?: string;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

// User Types
export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  role?: string;
  permissions: string[];
}

export interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  isLoggedIn: boolean;
}

// Upload Types
export interface UploadFile {
  id: string;
  name: string;
  url: string;
  status: 'uploading' | 'done' | 'error';
  progress?: number;
}

export interface UploadState {
  files: UploadFile[];
  uploading: boolean;
  currentProgress: number;
  progress: number;
  status: 'idle' | 'uploading' | 'complete' | 'error';
  error: Error | null;
}

export interface UploadActions {
  setFiles: (files: UploadFile[]) => void;
  setProgress: (progress: number) => void;
  setStatus: (status: UploadState['status']) => void;
  setError: (error: Error | null) => void;
  addFile: (file: UploadFile) => void;
  removeFile: (id: string) => void;
  updateFileProgress: (id: string, progress: number) => void;
  updateFileStatus: (id: string, status: UploadFile['status']) => void;
  clearFiles: () => void;
  setUploading: (uploading: boolean) => void;
}

// Root Store Type
export interface RootStore {
  cart: CartState;
  user: UserState;
  upload: UploadState;
} 