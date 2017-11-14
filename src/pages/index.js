import React from 'react'
import Link from 'gatsby-link'



const IndexPage = () => (
  <div>
    <h1>Hi from the home page</h1>
    <p>Welcome to the landing page</p>
    <Link to="/search-page">Go  to the search</Link>
  </div>
)

export default IndexPage
