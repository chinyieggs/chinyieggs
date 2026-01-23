import React from 'react'

import './index.scss'

const BeforeLogin: React.FC = () => {
  return (
    <div className="before-login">
      <h3 className="before-login__title">Welcome to your dashboard!</h3>
      <p className="before-login__description">
        This is where site admins will log in to manage your website.
      </p>
    </div>
  )
}

export default BeforeLogin
