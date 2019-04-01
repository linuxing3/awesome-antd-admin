import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'

@withI18n()
class Index extends PureComponent {
  render() {
    const { i18n } = this.props
    return <div>Page Post</div>
  }
}

export default Index
