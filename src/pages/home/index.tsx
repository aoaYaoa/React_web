import React from 'react';
import { Card, Typography, Row, Col, Statistic } from 'antd';
import { useAppSelector } from '@/reduxTookit/store';
import { selectUser } from '@/reduxTookit/slices/userSlice';
import { BaseChart } from '@/components/Charts/BaseChart';
import type { EChartsOption } from 'echarts';
import styles from './HomePage.module.scss';

const { Title } = Typography;

export function HomePage() {
  const user = useAppSelector(selectUser);

  // 折线图配置
  const lineChartOptions: EChartsOption = {
    title: {
      text: '近7天访问统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        areaStyle: {}
      }
    ]
  };

  // 饼图配置
  const pieChartOptions: EChartsOption = {
    title: {
      text: '文件类型分布'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '文件类型',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '图片' },
          { value: 735, name: '文档' },
          { value: 580, name: '视频' },
          { value: 484, name: '音频' },
          { value: 300, name: '其他' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div className={styles.container}>
      <h1>欢迎使用 React Admin Pro</h1>
      <Title level={2}>欢迎回来, {user.username}</Title>
      
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic title="今日访问" value={112893} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="文件上传" value={93} suffix="个" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="活跃用户" value={2223} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="系统消息" value={12} suffix="条" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={16}>
          <Card title="访问趋势">
            <BaseChart option={lineChartOptions} height={400} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="存储分析">
            <BaseChart option={pieChartOptions} height={400} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 