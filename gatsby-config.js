module.exports = {
  siteMetadata: {
    title: `Self-learning Club`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`
  ]
}
