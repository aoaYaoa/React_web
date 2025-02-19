import React, { useState, useEffect } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import Tus from '@uppy/tus';
import FileInput from '@uppy/file-input';
import ImageEditor from '@uppy/image-editor';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import './ResumableUpload.css';
import { useUploadStore } from '@/stores/uploadStore';
import type { UppyFile } from '@uppy/core';
import { Card, List, Typography, Space, Tag } from 'antd';
import { FileOutlined, PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';

interface ResumableUploadProps {
  action: string;
  chunkSize?: number;
  maxSize?: number;
  multiple?: boolean;
  allowedFileTypes?: string[];
  onSuccess?: (files: Array<{ name: string; type: string; size: number; url: string }>) => void;
  onError?: (error: Error) => void;
}

type UppyEvent = 'file-added' | 'upload-success' | 'upload-error';

export function ResumableUpload({
  action,
  chunkSize = 2 * 1024 * 1024,
  maxSize = 1024,
  multiple = true,
  allowedFileTypes,
  onSuccess,
  onError
}: ResumableUploadProps) {
  const { setFiles, setProgress, setStatus, setError, files, progress, status } = useUploadStore();
  
  const [uppy] = useState(() => {
    const uppyInstance = new Uppy({
      id: 'uppy-resumable',
      restrictions: {
        maxFileSize: maxSize * 1024 * 1024,
        maxNumberOfFiles: multiple ? undefined : 1,
        allowedFileTypes
      },
      autoProceed: true
    });

    uppyInstance.use(Tus, {
      endpoint: action,
      chunkSize,
      removeFingerprintOnSuccess: true
    });

    return uppyInstance;
  });

  useEffect(() => {
    const uppyInstance = uppy;

    const eventHandlers: Record<UppyEvent, any> = {
      'file-added': (file: any) => {
        console.log('文件添加:', file);
        setFiles(uppyInstance.getFiles());
      },
      'upload-success': (file: any, response: any) => {
        console.log('上传成功:', file, response);
        setStatus('complete');
        if (file && onSuccess) {
          const uploadedFile = {
            name: file.name,
            type: file.type || 'application/octet-stream',
            size: file.size,
            url: response?.uploadURL || ''
          };
          onSuccess([uploadedFile]);
        }
      },
      'upload-error': (file: any, error: Error) => {
        console.log('上传失败:', error);
        setError(error);
        setStatus('error');
        onError?.(error);
      }
    };

    // 绑定事件
    (Object.entries(eventHandlers) as [UppyEvent, any][]).forEach(([event, handler]) => {
      uppyInstance.on(event, handler);
    });

    return () => {
      // 解绑事件
      (Object.entries(eventHandlers) as [UppyEvent, any][]).forEach(([event, handler]) => {
        uppyInstance.off(event, handler);
      });
      try {
        uppyInstance.close();
      } catch (error) {
        console.warn('Uppy cleanup error:', error);
      }
    };
  }, [uppy, setFiles, setProgress, setStatus, setError, onSuccess, onError]);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <PictureOutlined />;
    if (type.startsWith('video/')) return <VideoCameraOutlined />;
    return <FileOutlined />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="resumable-upload-container">
      <Dashboard
        uppy={uppy}
        target=".resumable-upload-container"
        width="100%"
        height={350}
        showProgressDetails={true}
        showSelectedFiles={true}
        showRemoveButtonAfterComplete={true}
        showLinkToFileUploadResult={true}
        showNativePhotoCameraButton={true}
        showNativeVideoCameraButton={true}
        thumbnailWidth={200}
        metaFields={[
          { id: 'name', name: '文件名', placeholder: '文件名' },
          { id: 'description', name: '描述', placeholder: '文件描述' }
        ]}
        note={`支持文件续传 | 最大 ${maxSize}MB ${allowedFileTypes ? `| 允许类型: ${allowedFileTypes.join(', ')}` : ''}`}
        locale={{
          strings: {
            dropPasteFiles: '拖拽文件到这里，或者点击浏览',
            uploadComplete: '上传完成',
            uploadPaused: '上传暂停',
            resumeUpload: '继续上传',
            pauseUpload: '暂停上传',
            retryUpload: '重试',
            cancelUpload: '取消',
            removeFile: '删除文件',
            editFile: '编辑文件',
            editing: '编辑',
            // edit: '编辑',
            done: '完成',
            // name: '文件名',
            // description: '描述'
          }
        }}
      />
      
      {files.length > 0 && (
        <Card title="已上传文件" className="uploaded-files-card">
          <List
            dataSource={files}
            renderItem={(file: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={getFileIcon(file.type)}
                  title={file.name}
                  description={
                    <Space direction="vertical" size="small">
                      <Space>
                        <Tag color="blue">{file.type}</Tag>
                        <Tag color="green">{formatFileSize(file.size)}</Tag>
                      </Space>
                      {file.meta?.description && (
                        <Typography.Text type="secondary">
                          {file.meta.description}
                        </Typography.Text>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
}