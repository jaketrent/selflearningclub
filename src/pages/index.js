import React from 'react'
import Link from 'gatsby-link'

import styles from './index.module.css'

const uniq = arr =>
  arr.reduce(
    (acc, item) => (acc.indexOf(item) === -1 ? acc.concat([item]) : acc),
    []
  )

class IndexPage extends React.Component {
  state = { activeFormatNames: [] }
  toggleFormat = (isChecked, formatName) => {
    if (isChecked) {
      this.setState({
        activeFormatNames: uniq(
          this.state.activeFormatNames.concat([formatName])
        )
      })
    } else {
      this.setState({
        activeFormatNames: this.state.activeFormatNames.filter(
          f => f !== formatName
        )
      })
    }
  }
  render() {
    const { data } = this.props
    const formats = uniq(
      data.allMarkdownRemark.edges.reduce(
        (acc, { node }) => acc.concat(node.frontmatter.format),
        []
      )
    ).filter(f => f)
    const nodes = data.allMarkdownRemark.edges.filter(({ node }) =>
      node.frontmatter.format.some(
        formatName => this.state.activeFormatNames.indexOf(formatName) > -1
      )
    )
    return (
      <div>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div className={styles.lhCol}> 
            <input type="checkbox"
            key="free"/> Free
            <input type="checkbox"
            key="paid"/> Paid
        </div>
        <div className={styles.cols}>
          <div className={styles.lhCol}>
            {formats.map(formatName => (
              <div>
                <input
                  key={formatName}
                  type="checkbox"
                  checked={
                    this.state.activeFormatNames.indexOf(formatName) > -1
                  }
                  onClick={evt =>
                    this.toggleFormat(evt.target.checked, formatName)}
                />
                {formatName}
              </div>
            ))}
          </div>
          <div className={styles.rhCol}>
            {nodes.map(({ node }) => (
              <div key={node.fields.slug}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </div>
            ))}
          </div>
        </div>
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    )
  }
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            url
            price
            pricePerPeriod
            format
            subject
          }
        }
      }
    }
  }
`

export default IndexPage
