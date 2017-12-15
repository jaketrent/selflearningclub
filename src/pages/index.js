import Link from 'gatsby-link'
import { withPrefix } from 'gatsby-link'
import React from 'react'
import styles from './index.module.css'
import image from '../../public/static/exercism.png'

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const featurettes = data.allMarkdownRemark.edges.filter(
      f => f.node.frontmatter.featured === 'y'
    )
    return (
      <div className={styles.wrapper}>
        <div className={styles.featureContainer}>
          {featurettes.map(({ node }) => (
            <Link to={node.fields.slug} className={styles.featureLink}>
              <div key={node.fields.slug} className={styles.feature}>
                <img className={styles.image} src={node.frontmatter.picture} />
              </div>
              <p className={styles.title}> {node.frontmatter.title} </p>
            </Link>
          ))}
        </div>
        <Link to="/search-page">Go to the search</Link>
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
            featured
            picture
          }
        }
      }
    }
  }
`

export default IndexPage
