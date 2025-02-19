import React, { useState, useRef } from 'react'
import { Upload, Button, Progress, Card, message } from 'antd'
import { UploadOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import { calculateMD5 } from './utils'

/** 上传组件属性 */
interface ChunkUploadProps {
  /** 上传接口地址 */
  action: string
  /** 分片大小(字节) */
  chunkSize?: number
  /** 最大文件大小(字节) */
  maxSize?: number
  /** 上传成功回调 */
  onSuccess?: (response: any) => void
  /** 上传失败回调 */
  onError?: (error: Error) => void
}

/** 分片信息 */
interface ChunkInfo {
  /** 分片数据 */
  chunk: Blob
  /** 分片索引 */
  index: number
  /** 文件哈希 */
  hash: string
  /** 上传进度 */
  progress: number
}

export function ChunkUpload({ 
  action, 
  chunkSize = 2 * 1024 * 1024, // 2MB 
  maxSize = 1024 * 1024 * 1024, // 1GB
  onSuccess,
  onError 
}: ChunkUploadProps) {
  // 文件列表状态
  const [fileList, setFileList] = useState<UploadFile[]>([])
  // 上传状态
  const [uploading, setUploading] = useState(false)
  // 暂停状态
  const [paused, setPaused] = useState(false)
  // 总进度
  const [totalProgress, setTotalProgress] = useState(0)
  // 分片列表引用
  const chunksRef = useRef<ChunkInfo[]>([])
  // 中止控制器引用
  const abortControllerRef = useRef<AbortController | null>(null)

  // 处理上传错误
  const handleError = (error: unknown) => {
    const err = error instanceof Error ? error : new Error(String(error))
    onError?.(err)
    message.error('上传失败')
  }

  const handleFileChange = async (file: File) => {
    if (file.size > maxSize) {
      message.error('文件大小超出限制')
      return
    }

    // 计算文件 hash
    const fileHash = await calculateMD5(file)
    
    // 检查是否可以续传
    const uploadedChunks = await checkUploadedChunks(fileHash)
    
    // 分片
    const chunks: ChunkInfo[] = []
    let start = 0
    let index = 0

    while (start < file.size) {
      const end = Math.min(start + chunkSize, file.size)
      const chunk = file.slice(start, end)
      
      // 如果该分片未上传过，则添加到待上传列表
      if (!uploadedChunks.includes(index)) {
        chunks.push({
          chunk,
          index,
          hash: fileHash,
          progress: 0
        })
      }
      
      start = end
      index++
    }

    chunksRef.current = chunks
    setFileList([{ uid: fileHash, name: file.name, size: file.size } as UploadFile])
  }

  const checkUploadedChunks = async (fileHash: string): Promise<number[]> => {
    try {
      const response = await fetch(`${action}/check?hash=${fileHash}`)
      const data = await response.json()
      return data.uploadedChunks || []
    } catch (error) {
      console.error('检查已上传分片失败:', error)
      return []
    }
  }

  const uploadChunk = async (chunk: ChunkInfo): Promise<void> => {
    const formData = new FormData()
    formData.append('chunk', chunk.chunk)
    formData.append('hash', chunk.hash)
    formData.append('index', chunk.index.toString())

    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      })

      if (!response.ok) throw new Error('上传失败')
      
      chunk.progress = 100
      updateTotalProgress()
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('上传已暂停')
      } else {
        handleError(error)
      }
    }
  }

  const updateTotalProgress = () => {
    const progress = chunksRef.current.reduce((acc, chunk) => acc + chunk.progress, 0) / 
      chunksRef.current.length
    setTotalProgress(Math.round(progress))
  }

  const handleUpload = async () => {
    if (chunksRef.current.length === 0) return
    
    setUploading(true)
    setPaused(false)

    try {
      // 并发上传分片
      const tasks = chunksRef.current
        .filter(chunk => chunk.progress < 100)
        .map(chunk => uploadChunk(chunk))

      await Promise.all(tasks)
      
      // 通知服务器所有分片已上传完成
      await fetch(`${action}/merge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          hash: chunksRef.current[0].hash,
          filename: fileList[0].name,
          size: fileList[0].size
        })
      })

      message.success('上传成功')
      onSuccess?.({ hash: chunksRef.current[0].hash })
    } catch (error) {
      handleError(error)
    } finally {
      setUploading(false)
    }
  }

  const handlePause = () => {
    setPaused(true)
    abortControllerRef.current?.abort()
  }

  const handleResume = () => {
    setPaused(false)
    handleUpload()
  }

  return (
    <Card title="文件上传" style={{ width: 400 }}>
      <Upload
        fileList={fileList}
        beforeUpload={handleFileChange}
        onRemove={() => {
          setFileList([])
          chunksRef.current = []
          setTotalProgress(0)
        }}
      >
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      
      {fileList.length > 0 && (
        <>
          <Progress percent={totalProgress} style={{ marginTop: 16 }} />
          <div style={{ marginTop: 16 }}>
            {!uploading && !paused && (
              <Button 
                type="primary" 
                onClick={handleUpload}
                disabled={totalProgress === 100}
              >
                开始上传
              </Button>
            )}
            {uploading && !paused && (
              <Button 
                icon={<PauseCircleOutlined />} 
                onClick={handlePause}
              >
                暂停
              </Button>
            )}
            {paused && (
              <Button 
                icon={<PlayCircleOutlined />} 
                onClick={handleResume}
              >
                继续
              </Button>
            )}
          </div>
        </>
      )}
    </Card>
  )
} 