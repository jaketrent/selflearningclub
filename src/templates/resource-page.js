import React from 'react'
import styles from './resource-page.module.css'

export default ({ data }) => {
  const post = data.markdownRemark
  const short = post.frontmatter
  const formatList = short.format
    .map(format => format[0].toUpperCase() + format.substr(1))
    .join(', ')
  const priceList =
    short.price.length > 1 && short.price.includes('0')
      ? 'Freemium'
      : short.price.length > 1
        ? 'Price Varies'
        : short.price.includes('0') ? 'Free' : short.price

  const pricePerPeriodList = priceList === 'Freemium' || priceList === 'Free' || priceList === 'Price Varies' ?
        "n/a" : short.pricePerPeriod
  const hasPicture = short.featured === 'y' ? true : false
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>
        <a href={post.frontmatter.url}>{post.frontmatter.title}</a>
      </h1>
      {hasPicture ? <img src={short.picture} className={styles.picture}/> : ""}
      <p className={styles.formatContainer}>{formatList}</p>
      <p className={styles.price}>{priceList}</p>
      {pricePerPeriodList != "n/a" ?  <p className={styles.pricePerPeriodContainer}>{pricePerPeriodList}</p>
        : ""}
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
        featured
        picture
      }
    }
  }
`
