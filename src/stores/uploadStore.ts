import { create } from 'zustand';
import type { UppyFile } from '@uppy/core';

interface UploadState {
  files: UppyFile[];
  progress: number;
  status: 'idle' | 'uploading' | 'complete' | 'error';
  error: Error | null;
  setFiles: (files: UppyFile[]) => void;
  setProgress: (progress: number) => void;
  setStatus: (status: 'idle' | 'uploading' | 'complete' | 'error') => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  files: [],
  progress: 0,
  status: 'idle',
  error: null,
  setFiles: (files) => set({ files }),
  setProgress: (progress) => set({ progress }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  reset: () => set({ files: [], progress: 0, status: 'idle', error: null })
})); 