import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff'
  }
}

@connect(({ app, dashboard, loading }) => ({
  avatar: app.user.avatar,
  username: app.user.username,
  dashboard,
  loading
}))
class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col lg={18} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0'
              }}
            >
              card
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.blue
                  }}
                />
              </Col>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.peach
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              contents
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              contents
            </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0'
              }}
            >
              Contents
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle}>
              contents
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle} />
          </Col>
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}
            >
              contents
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

Dashboard.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  dashboard: PropTypes.object,
  loading: PropTypes.object
}

export default Dashboard
