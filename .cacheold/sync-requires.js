// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/jaketrent/Projects/selflearningclub/.cache/dev-404-page.js")),
  "component---src-templates-resource-page-js": preferDefault(require("/Users/jaketrent/Projects/selflearningclub/src/templates/resource-page.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/jaketrent/Projects/selflearningclub/src/pages/index.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/jaketrent/Projects/selflearningclub/src/pages/404.js")),
  "component---src-pages-page-2-js": preferDefault(require("/Users/jaketrent/Projects/selflearningclub/src/pages/page-2.js"))
}

exports.json = {
  "layout-index.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/layout-index.json"),
  "dev-404-page.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/dev-404-page.json"),
  "layout-index.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/layout-index.json"),
  "resources-code-academy.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/resources-code-academy.json"),
  "layout-index.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/layout-index.json"),
  "index.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/index.json"),
  "layout-index.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/layout-index.json"),
  "404.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/404.json"),
  "layout-index.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/layout-index.json"),
  "page-2.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/page-2.json"),
  "layout-index.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/layout-index.json"),
  "404-html.json": require("/Users/jaketrent/Projects/selflearningclub/.cache/json/404-html.json")
}

exports.layouts = {
  "component---src-layouts-index-js": preferDefault(require("/Users/jaketrent/Projects/selflearningclub/.cache/layouts/index.js"))
}