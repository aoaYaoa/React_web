import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Statistic } from 'antd'
import { UserOutlined, ProjectOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { BaseChart } from '../../components/Charts/BaseChart'
import { todoApi } from '../../api/todo'
import type { EChartsOption } from 'echarts'

interface DashboardData {
  totalTasks: number
  completedTasks: number
  weeklyData: Array<{
    date: string
    count: number
  }>
  typeDistribution: Array<{
    type: string
    value: number
  }>
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    totalTasks: 0,
    completedTasks: 0,
    weeklyData: [],
    typeDistribution: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await todoApi.getList()
        
        // 计算基础统计数据
        const totalTasks = todos.length
        const completedTasks = todos.filter(todo => todo.isDone).length
        
        // 生成周数据（示例数据）
        const weeklyData = [
          { date: '周一', count: 3 },
          { date: '周二', count: 4 },
          { date: '周三', count: 6 },
          { date: '周四', count: 5 },
          { date: '周五', count: 7 },
          { date: '周六', count: 2 },
          { date: '周日', count: 3 }
        ]

        // 任务类型分布（示例数据）
        const typeDistribution = [
          { type: '已完成', value: completedTasks },
          { type: '进行中', value: totalTasks - completedTasks }
        ]

        setData({
          totalTasks,
          completedTasks,
          weeklyData,
          typeDistribution
        })
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    }

    fetchData()
  }, [])

  const lineChartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: data.weeklyData.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: data.weeklyData.map(item => item.count),
      type: 'line',
      smooth: true
    }]
  }

  const pieChartOption: EChartsOption = {
    series: [{
      type: 'pie',
      data: data.typeDistribution.map(item => ({
        name: item.type,
        value: item.value
      })),
      radius: '70%'
    }]
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="总任务数"
              value={data.totalTasks}
              prefix={<ProjectOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="完成率"
              value={data.totalTasks ? Math.round((data.completedTasks / data.totalTasks) * 100) : 0}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="活跃用户"
              value={123}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="本周任务趋势">
            <BaseChart option={lineChartOption} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="任务状态分布">
            <BaseChart option={pieChartOption} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Card title="最近活动" style={{ minHeight: '300px' }}>
            {/* 这里可以添加最近活动列表 */}
          </Card>
        </Col>
      </Row>
    </div>
  )
} 