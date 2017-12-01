import React from 'react'
import Link from 'gatsby-link'
import styles from './search.module.css'

const Hamburger = _ => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0" y1="1" x2="12" y2="1" strokeWidth="1" stroke="white" />
    <line x1="0" y1="5" x2="34" y2="5" strokeWidth="1" stroke="white" />
    <line x1="0" y1="9" x2="34" y2="9" strokeWidth="1" stroke="white" />
  </svg>
)

const uniq = arr =>
  arr
    .reduce(
      (acc, item) => (acc.indexOf(item) === -1 ? acc.concat([item]) : acc),
      []
    )
    .sort()

const drawerClasses =
  console.log() && true ? styles.sideMenu + ' ' + styles.open : styles.sideMenu

class SearchPage extends React.Component {
  state = {
    activeFormatNames: [],
    activePrices: [],
    activeSubjects: [],
    searchValue: '',
    openDrawer: true,
  }

  toggleDrawer = event => {
    this.setState({
      openDrawer: !this.state.openDrawer,
    })
    console.log('hi')
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

  handleChange = event => {
    this.setState({ searchValue: event.target.value.toLowerCase() })
  }

  render() {
    const { data } = this.props
    const formats = uniq(
      data.allMarkdownRemark.edges.reduce(
        (acc, { node }) => acc.concat(node.frontmatter.format),
        []
      )
    ).filter(f => f)

    const countedSubjects = data.allMarkdownRemark.edges
      .reduce((acc, { node }) => acc.concat(node.frontmatter.subject), [])
      .reduce((allSubjects, subjectName) => {
        if (subjectName in allSubjects) {
          allSubjects[subjectName]++
        } else {
          allSubjects[subjectName] = 1
        }
        return allSubjects
      }, {})

    const topTenSubjects = Object.entries(countedSubjects)
      .sort(function(a, b) {
        return b[1] - a[1]
      })
      .splice(0, 10)
      .reduce((a, b) => a.concat(b), [])
      .filter(sub => typeof sub == 'string')

    const subjects =
      this.state.searchValue !== ''
        ? uniq(
            data.allMarkdownRemark.edges.reduce(
              (acc, { node }) => acc.concat(node.frontmatter.subject),
              []
            )
          )
            .filter(
              f =>
                f.indexOf(this.state.searchValue) > -1 ||
                this.state.activeSubjects.indexOf(f) > -1
            )
            .splice(0, 10)
        : uniq(topTenSubjects.concat(this.state.activeSubjects))

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
      )
      .filter(
        ({ node }) =>
          this.state.activeSubjects.length > 0
            ? node.frontmatter.subject.some(
                subjectName =>
                  this.state.activeSubjects.indexOf(subjectName) > -1
              )
            : true
      )

    return (
      <div>
        <div className={styles.cols}>
          <div className={this.state.openDrawer === true ? styles.sideMenu + ' ' + styles.open : styles.sideMenu}>
            <div className={styles.lhColSection}>
              <h3 className={styles.sectionHeading}>
                <p className={styles.priceTitle}>Price</p>
                <div className={styles.hamburger} onClick={evt => this.toggleDrawer(evt.target)}>
                  <Hamburger />
                </div>
              </h3>
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
              <h3 className={styles.sectionHeading}>Format</h3>
              {formats.map(formatName => (
                <div>
                  <input
                    key={formatName}
                    type="checkbox"
                    checked={
                      this.state.activeFormatNames.indexOf(formatName) > -1
                    }
                    onClick={evt =>
                      this.toggleFormat(evt.target.checked, formatName)
                    }
                  />
                  {formatName}
                </div>
              ))}
            </div>

            <div className={styles.lhColSection}>
              <h3 className={styles.sectionHeading}>Subject</h3>
              <input
                type="search"
                key="input"
                placeholder="Search..."
                onChange={this.handleChange}
                value={this.state.searchValue}
              />
              {subjects.map(subjectName => (
                <div>
                  <input
                    key={subjectName}
                    type="checkbox"
                    checked={
                      this.state.activeSubjects.indexOf(subjectName) > -1
                    }
                    onClick={evt =>
                      this.toggleSubjects(evt.target.checked, subjectName)
                    }
                  />
                  {subjectName}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.hamburger} onClick={evt => this.toggleDrawer(evt.target)}><Hamburger /></div>
          <div className={styles.rhCol}>
            {nodes.map(({ node }) => (
              <div key={node.fields.slug}>
                <Link to={node.fields.slug} className={styles.link}>
                  {node.frontmatter.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query FilterQuery {
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

export default SearchPage
