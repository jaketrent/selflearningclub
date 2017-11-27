import React from 'react'
import Link from 'gatsby-link'
import style from './module/header.module.css'

export default () => 
  <div className={style.header} >
    <div className={style.headerContainer}>
      <img
        src="./static/logoWhiteOpen.png"
        className={style.logo}
      />
      <h1 className={style.title}>
        <Link
          to="/"
          className={style.link}
        >
          Self-Learning Club
        </Link>
      </h1>
      <img
        src="./static/logoWhiteClose.png"
        className={style.logo}
      />
    </div>
  </div>

