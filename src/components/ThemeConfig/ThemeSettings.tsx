import React from 'react'
import { Card, Form, Switch, Select, ColorPicker, InputNumber, Divider, Row, Col } from 'antd'
import type { Color } from 'antd/es/color-picker'
import { useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/hooks/useLocale'

export function ThemeSettings() {
  const { token, components, toggleTheme } = useTheme()
  const { messages } = useLocale()

  const handleColorChange = (color: Color, key: string) => {
    toggleTheme({
      token: {
        ...token,
        [key]: color.toRgbString()
      }
    })
  }

  const handleNumberChange = (value: number | null, key: string) => {
    if (value !== null) {
      toggleTheme({
        token: {
          ...token,
          [key]: value
        }
      })
    }
  }

  return (
    <Card title={messages.theme.title}>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Divider orientation="left">{messages.theme.colors}</Divider>
            <Form.Item label={messages.theme.primaryColor}>
              <ColorPicker
                value={token.colorPrimary}
                onChange={(color) => handleColorChange(color, 'colorPrimary')}
                showText
              />
            </Form.Item>
            <Form.Item label={messages.theme.successColor}>
              <ColorPicker
                value={token.colorSuccess}
                onChange={(color) => handleColorChange(color, 'colorSuccess')}
                showText
              />
            </Form.Item>
            <Form.Item label={messages.theme.warningColor}>
              <ColorPicker
                value={token.colorWarning}
                onChange={(color) => handleColorChange(color, 'colorWarning')}
                showText
              />
            </Form.Item>
            <Form.Item label={messages.theme.errorColor}>
              <ColorPicker
                value={token.colorError}
                onChange={(color) => handleColorChange(color, 'colorError')}
                showText
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Divider orientation="left">{messages.theme.components}</Divider>
            <Form.Item label={messages.theme.fontSize}>
              <InputNumber
                value={token.fontSize}
                onChange={(value) => handleNumberChange(value, 'fontSize')}
                min={12}
                max={18}
                addonAfter="px"
              />
            </Form.Item>

            <Form.Item label={messages.theme.borderRadius}>
              <InputNumber
                value={token.borderRadius}
                onChange={(value) => handleNumberChange(value, 'borderRadius')}
                min={0}
                max={16}
                addonAfter="px"
              />
            </Form.Item>

            <Form.Item label={messages.theme.tableDensity}>
              <Select
                value={components?.Table?.size || 'middle'}
                onChange={(value) => 
                  toggleTheme({
                    components: {
                      ...components,
                      Table: {
                        ...components?.Table,
                        controlHeight: value === 'small' ? 24 : value === 'large' ? 40 : 32
                      }
                    }
                  })
                }
                options={[
                  { label: messages.theme.compact, value: 'small' },
                  { label: messages.theme.default, value: 'middle' },
                  { label: messages.theme.relaxed, value: 'large' }
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">{messages.theme.layout}</Divider>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label={messages.theme.compactMode}>
              <Switch
                checked={token.sizeUnit === 4}
                onChange={(checked) => 
                  toggleTheme({
                    token: { ...token, sizeUnit: checked ? 4 : 8 }
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
} 