import React, { useState } from 'react'
import { Upload, Card, Button, message } from 'antd'
import { UploadOutlined, PictureOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'

interface AntUploadProps {
  action: string
  imageOnly?: boolean
  multiple?: boolean
  maxSize?: number
  onSuccess?: (files: Array<{ name: string; type: string; size: number; url: string }>) => void
  onError?: (error: Error) => void
}

export function AntUpload({
  action,
  imageOnly = false,
  multiple = true,
  maxSize = 100,
  onSuccess,
  onError
}: AntUploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const uploadProps: UploadProps = {
    action,
    multiple,
    fileList,
    accept: imageOnly ? 'image/*' : undefined,
    maxCount: multiple ? undefined : 1,
    listType: imageOnly ? 'picture-card' : 'text',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    beforeUpload: (file) => {
      const isLt = file.size / 1024 / 1024 < maxSize
      if (!isLt) {
        message.error(`文件必须小于 ${maxSize}MB!`)
        return false
      }
      return true
    },
    onChange: (info) => {
      setFileList(info.fileList)

      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`)
        const files = info.fileList
          .filter(file => file.status === 'done')
          .map(file => ({
            name: file.name,
            type: file.type || 'application/octet-stream',
            size: file.size || 0,
            url: file.response?.url || ''
          }))
        onSuccess?.(files)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`)
        onError?.(new Error('Upload failed'))
      }
    },
    onRemove: (file) => {
      setFileList(prev => prev.filter(item => item.uid !== file.uid))
    }
  }

  return (
    <Card title={imageOnly ? "图片上传" : "文件上传"}>
      <Upload {...uploadProps}>
        {imageOnly ? (
          <div>
            <PictureOutlined />
            <div style={{ marginTop: 8 }}>上传图片</div>
          </div>
        ) : (
          <Button icon={<UploadOutlined />}>选择文件</Button>
        )}
      </Upload>
    </Card>
  )
} 