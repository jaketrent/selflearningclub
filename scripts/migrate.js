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

const makeTags = line => Object.assign({}, line, {
  tags: '[' + line.subjects.trim().split(",").join(', ') + ']'
})
const nonEmptyColumns = line => line.id !== ''
const deriveColumns = line => Object.assign({}, line, {
  fileName: './src/resources/' + line.title.split(' ').join('-').toLowerCase() + '.md'
})
const derivefrontmatter = line => Object.assign({}, line, {
    fileContents: `---
title: "${line.title}"
url: "${line.url}"
price: "${line.price}"
pricePerPeriod: "${line.pricePerPeriod}"
format: "${line.format}"
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
  .map(makeTags)
  .map(derivefrontmatter)
  .forEach(writeFiles)