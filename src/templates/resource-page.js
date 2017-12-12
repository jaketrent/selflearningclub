import React from 'react'
import styles from './resource-page.module.css'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <div>
      <h1 className={styles.title}>
        <a href={post.frontmatter.url}>{post.frontmatter.title}</a>
      </h1>
      <div className={styles.formatContainer}>
        {post.frontmatter.format.map(function(format) {
          return <p>{format}</p>
        })}
      </div>
      <div className={styles.priceContainer}>
        {post.frontmatter.price.map(function(price) {
          return <p>{price}</p>
        })}
      </div>
      <div>
        {post.frontmatter.pricePerPeriod.map(function(pricePerPeriod) {
          return /*post.frontmatter.pricePerPeriod.indexOf("n/a") > -1
          ? <p>free</p>
          : */
          ;<p>{pricePerPeriod}</p>
        })}
      </div>
      <div className={styles.subjectContainer}>
        {post.frontmatter.subject.map(function(subject) {
          return <p className={styles.subject}>{subject}</p>
        })}
      </div>
      <a target="_blank" className={styles.button} href={post.frontmatter.url}>
        Go Learn &#10132;
      </a>
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
