import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { withI18n } from '@lingui/react'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff'
  }
}
@withI18n()
@connect(({ user }) => ({ user }))
class User extends PureComponent {
  render() {
    console.log(this.props)
    const { user } = this.props
    const { list } = user
    return (
      <div>
        <Row gutter={24}>
          <Col lg={18} md={24}>
            {list.map(item => {
              return (
                <Card
                  key={item.username}
                  bordered={false}
                  bodyStyle={{
                    padding: '24px 36px 24px 0'
                  }}
                >
                  <img height="256" src={item.avatar} alt={item.username} />
                  {item.username}
                </Card>
              )
            })}
          </Col>
        </Row>
      </div>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default User
