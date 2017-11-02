import React from "react"

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <div>
    <h1>{post.frontmatter.title}</h1>
    <p>{post.frontmatter.url}</p>
    <p>{post.frontmatter.price == "0" ? "Free" : post.frontmatter.price}</p>
    <p>{post.frontmatter.pricePerPeriod == "n/a" ? null : post.frontmatter.pricePerPeriod}</p>
    <p>{post.frontmatter.format}</p>
    {post.frontmatter.subject.map(function(subject){
      return <li>{subject}</li>;
    })}
    </div>

  )
}

export const query = graphql`
query BlogPostQuery($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
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
`
