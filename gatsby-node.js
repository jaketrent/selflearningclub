const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ boundActionCreators, getNode, node }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}
