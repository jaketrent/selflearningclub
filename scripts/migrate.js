const fs = require('fs')

const separateColumns = line => line.split('\t')
const nameColumns = line => ({
  title: line[0],
  url: line[1],
  price: line[2],
  pricePerPeriod: line[3],
  format: line[4],
  subjects: line[5],
  featured: line[6]
})

const seperateParts = line => Object.assign({}, line, {
  diffPrice: '\n- ' + line.price.split(",").map(price => `"${price}"`).join('\n- '),
  diffPricePerPeriod: '\n- ' + line.pricePerPeriod.split(",").map(pricePerPeriod => `"${pricePerPeriod}"`).join('\n- '),
  diffFormat: '\n- ' + line.format.split(",").map(format => `"${format}"`).join('\n- '),
  tags: '\n- ' + line.subjects.split(",").map(subjects => `"${subjects.trim()}"`).join('\n- '),
  picture: '/static/' + line.title.split(' ').join('-').toLowerCase() + '.png'
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
pricePerPeriod: ${line.diffPricePerPeriod}
format: ${line.diffFormat}
subject: ${line.tags}
featured: "${line.featured.trim()}"
picture: "${line.picture.trim()}"
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