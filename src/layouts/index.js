import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.css'

const Header = ({ data }) => (
  <div
    style={{
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        height: '100%',
        width: '100%',
        padding: '1.45rem 1.0875rem',
        display: 'flex',
      }}
    >
      <img src='../static/logoWhiteOpen.png' 
        style={{
          height: '300px',
        }}
      />
      <h1 style={{ fontSize: '4em', margin: 'auto' }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
          }}
        >
          {data.site.siteMetadata.title}
        </Link>
      </h1>
      <img src='../static/logoWhiteClose.png' 
        style={{
          height: '300px',
        }}
      />
    </div>
  </div>
)

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header data={data} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export const query = graphql`
  query MetaQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default TemplateWrapper
