import React from 'react'
import Link from 'gatsby-link'


class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const featurettes = data.allMarkdownRemark.edges.filter(f => f.node.frontmatter.featured === "y")
    
  return (
  <div>
    <h1>Hi from the home page</h1>
    <p>Welcome to the landing page</p>
    {featurettes.map(({ node }) => (
              <div key={node.fields.slug}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </div>
            ))}
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
        }
      }
    }
  }
}
`

export default IndexPage
