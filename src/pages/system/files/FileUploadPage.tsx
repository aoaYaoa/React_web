import React from 'react'
import { Card, Typography, Space, Tabs, message } from 'antd'
import { ResumableUpload } from '../../../components/Upload/ResumableUpload'
import { DragUpload } from '../../../components/Upload/DragUpload'
import { ChunkUpload } from '../../../components/Upload/ChunkUpload'
import { 
  CloudUploadOutlined, 
  FileImageOutlined, 
  FileOutlined,
  InboxOutlined 
} from '@ant-design/icons'
import { useUploadStore } from '../../../stores/uploadStore'

const { Title, Text } = Typography
const { TabPane } = Tabs

interface UploadedFile {
  name: string
  type: string
  size: number
  url: string
}

export function FileUploadPage() {
  const { files, progress, status, error } = useUploadStore()

  const handleUploadSuccess = (files: Array<{ name: string; type: string; size: number; url: string }>) => {
    console.log('上传成功:', files)
    message.success('文件上传成功')
  }

  const handleUploadError = (error: Error) => {
    console.error('上传失败:', error)
    message.error('文件上传失败')
  }

  const handleDragUploadSuccess = (response: { url: string; name: string; size: number }) => {
    handleUploadSuccess([{
      ...response,
      type: 'application/octet-stream'
    }])
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={2}>文件上传</Title>
        <Text type="secondary">支持多种上传方式，包括断点续传、分片上传、拖拽上传等功能</Text>
      </Card>

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={
              <Space>
                <InboxOutlined />
                拖拽上传
              </Space>
            } 
            key="1"
          >
            <DragUpload 
              action="/api/upload"
              maxSize={50}
              onSuccess={handleDragUploadSuccess}
              onError={handleUploadError}
            />
          </TabPane>

          <TabPane 
            tab={
              <Space>
                <FileOutlined />
                断点续传
              </Space>
            } 
            key="2"
          >
            <ResumableUpload
              action="https://tusd.tusdemo.net/files/"
              maxSize={100}
              allowedFileTypes={['.jpg', '.jpeg', '.png', '.gif', '.mp4']}
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
            />
            {status === 'uploading' && (
              <div>上传进度: {progress}%</div>
            )}
            {status === 'error' && (
              <div>上传出错: {error?.message}</div>
            )}
          </TabPane>

          <TabPane 
            tab={
              <Space>
                <FileImageOutlined />
                分片上传
              </Space>
            } 
            key="3"
          >
            <ChunkUpload 
              action="/api/upload/chunk"
              maxSize={2048} // 2GB
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
            />
          </TabPane>
        </Tabs>
      </Card>
      <div>
        已上传文件: {files.length} 个
      </div>
    </Space>
  )
} 