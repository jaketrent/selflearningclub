import React from 'react'
import Link from 'gatsby-link'

import styles from './index.module.css'

const uniq = arr =>
  arr
    .reduce(
      (acc, item) => (acc.indexOf(item) === -1 ? acc.concat([item]) : acc),
      []
    )
    .sort()

class IndexPage extends React.Component {
  state = {
    activeFormatNames: [],
    activePrices: [],
    activeSubjects: [],
  }
  toggleFormat = (isChecked, formatName) => {
    if (isChecked) {
      this.setState({
        activeFormatNames: uniq(
          this.state.activeFormatNames.concat([formatName])
        ),
      })
    } else {
      this.setState({
        activeFormatNames: this.state.activeFormatNames.filter(
          f => f !== formatName
        ),
      })
    }
  }

  togglePrice = (isChecked, priceRange) => {
    if (isChecked) {
      this.setState({
        activePrices: uniq(this.state.activePrices.concat([priceRange])),
      })
    } else {
      this.setState({
        activePrices: this.state.activePrices.filter(f => f !== priceRange),
      })
    }
  }

  toggleSubjects = (isChecked, subjectName) => {
    if (isChecked) {
      this.setState({
        activeSubjects: uniq(this.state.activeSubjects.concat([subjectName])),
      })
    } else {
      this.setState({
        activeSubjects: this.state.activeSubjects.filter(
          f => f !== subjectName
        ),
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

    const subjects = uniq(
      data.allMarkdownRemark.edges.reduce(
        (acc, { node }) => acc.concat(node.frontmatter.subject),
        []
      )
    ).filter(f => f)

    const nodes = data.allMarkdownRemark.edges
      .filter(
        ({ node }) =>
          this.state.activeFormatNames.length > 0
            ? node.frontmatter.format.some(
                formatName =>
                  this.state.activeFormatNames.indexOf(formatName) > -1
              )
            : true
      )
      .filter(
        ({ node }) =>
          this.state.activePrices.indexOf('free') > -1 &&
          this.state.activePrices.indexOf('paid') > -1
            ? node.frontmatter.price.indexOf('0') > -1 ||
              node.frontmatter.price.some(price => price !== '0')
            : this.state.activePrices.indexOf('free') > -1
              ? node.frontmatter.price.indexOf('0') > -1
              : this.state.activePrices.indexOf('paid') > -1
                ? node.frontmatter.price.some(price => price !== '0')
                : true
      ).filter(({ node }) => 
      this.state.activeSubjects.length > 0
      ? node.frontmatter.subject.some(
         subjectName =>
          this.state.activeSubjects.indexOf(subjectName) > -1
       )
       : true)

    return (
      <div>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div className={styles.cols}>
          <div className={styles.lhCol}>
            <div className={styles.lhColSection}>
              <input
                type="checkbox"
                key="free"
                checked={this.state.activePrices.indexOf('free') > -1}
                onClick={evt => this.togglePrice(evt.target.checked, 'free')}
              />{' '}
              Free
              <input
                type="checkbox"
                key="paid"
                checked={this.state.activePrices.indexOf('paid') > -1}
                onClick={evt => this.togglePrice(evt.target.checked, 'paid')}
              />{' '}
              Paid
            </div>
            <div className={styles.lhColSection}>
              {subjects.map(subjectName => (
                <div>
                  <input
                    key={subjectName}
                    type="checkbox"
                    checked={
                      this.state.activeSubjects.indexOf(subjectName) > -1
                    }
                    onClick={evt =>
                      this.toggleSubjects(evt.target.checked, subjectName)}
                  />
                  {subjectName}
                </div>
              ))}
            </div>

            <div className={styles.lhColSection}>
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
