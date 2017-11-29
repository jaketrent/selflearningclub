import closeLogo from '../../public/static/logoWhiteClose.png'
import Link from 'gatsby-link'
import openLogo from '../../public/static/logoWhiteOpen.png'
import React from 'react'
import style from './module/header.module.css'

export default () => (
  <div className={style.header}>
    <div className={style.headerContainer}>
      <img src={openLogo} className={style.logo} />
      <h1 className={style.title}>
        <Link to="/" className={style.link}>
          Self-Learning Club
        </Link>
      </h1>
      <img src={closeLogo} className={style.logo} />
    </div>
  </div>
)
