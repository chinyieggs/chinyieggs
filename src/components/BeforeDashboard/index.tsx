import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { ChinyiSeedButton } from './ChinyiSeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to Chinyi Eggs Dashboard!</h4>
      </Banner>
      <ChinyiSeedButton />
    </div>
  )
}

export default BeforeDashboard
