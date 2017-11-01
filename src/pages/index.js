import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div>
        <Link to={node.fields.slug}>{node.frontmatter.name}</Link>
      </div>
    ))}
  </div>
)

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
            name
            url
            price
            featured
          }
        }
      }
    }
  }
`

export default IndexPage
