import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, Button, Space } from 'antd'
import { UploadOutlined, FileOutlined } from '@ant-design/icons'

interface DragUploadProps {
  action: string
  maxSize?: number
  accept?: string[]
  multiple?: boolean
  onSuccess?: (response: { url: string; name: string; size: number }) => void
  onError?: (error: Error) => void
}

export function DragUpload({
  action,
  maxSize = 100,
  accept = ['image/*', 'application/pdf'],
  multiple = true,
  onSuccess,
  onError
}: DragUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const formData = new FormData()
      acceptedFiles.forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch(action, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      if (!response.ok) throw new Error('上传失败')

      const result = await response.json()
      onSuccess?.(result)
    } catch (error) {
      onError?.(error as Error)
    }
  }, [action, onSuccess, onError])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    maxSize: maxSize * 1024 * 1024,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    multiple
  })

  return (
    <Card title="文件上传">
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #d9d9d9',
          borderRadius: 8,
          padding: 20,
          textAlign: 'center',
          background: isDragActive ? '#fafafa' : 'white',
          cursor: 'pointer'
        }}
      >
        <input {...getInputProps()} />
        <Space direction="vertical">
          <UploadOutlined style={{ fontSize: 48, color: '#40a9ff' }} />
          {isDragActive ? (
            <p>将文件拖放到此处</p>
          ) : (
            <p>拖放文件到此处，或点击选择文件</p>
          )}
          <p style={{ color: '#888' }}>
            支持{multiple ? '批量' : '单个'}上传，单个文件最大 {maxSize}MB
          </p>
        </Space>
      </div>

      {acceptedFiles.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h4>已选择的文件：</h4>
          {acceptedFiles.map(file => (
            <div key={file.name} style={{ marginTop: 8 }}>
              <Space>
                <FileOutlined />
                <span>{file.name}</span>
                <span style={{ color: '#888' }}>
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </Space>
            </div>
          ))}
          <Button
            type="primary"
            onClick={() => onDrop([...acceptedFiles])}
            style={{ marginTop: 16 }}
          >
            开始上传
          </Button>
        </div>
      )}
    </Card>
  )
} 