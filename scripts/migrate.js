console.log('hi anne')
const fs = require('fs')

const separateColumns = line => line.split('\t')
const nameColumns = line => ({
  title: line[0],
  url: line[1],
  price: line[2],
  pricePerPeriod: line[3],
  format: line[4],
  subjects: line[5],
})

const seperateParts = line => Object.assign({}, line, {
  diffPrice: '\n- ' + line.price.split(",").map(price => `"${price}"`).join('\n- '),
  diffFormat: '\n- ' + line.format.split(",").join('\n- '),
  tags: '\n- ' + line.subjects.split(",").join('\n- ')
})
const nonEmptyColumns = line => line.id !== ''
const deriveColumns = line => Object.assign({}, line, {
  fileName: './src/resources/' + line.title.split(' ').join('-').toLowerCase() + '.md'
})
const derivefrontmatter = line => Object.assign({}, line, {
    fileContents: `---
title: "${line.title}"
url: "${line.url}"
price: ${line.diffPrice}
pricePerPeriod: "${line.pricePerPeriod}"
format: ${line.diffFormat}
subject: ${line.tags}
---
`})
const writeFiles = line => fs.writeFileSync(line.fileName, line.fileContents)

// the steps!
const file = fs.readFileSync(__dirname + '/data.tsv', 'utf8')
const lines = file
  .split('\n')
  .map(separateColumns)
  .map(nameColumns)
  .filter(nonEmptyColumns)
  .map(deriveColumns)
  .map(seperateParts)
  .map(derivefrontmatter)
  .forEach(writeFiles)