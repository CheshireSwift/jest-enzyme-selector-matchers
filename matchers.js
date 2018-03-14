const $ = require('cheerio');

function tagFromSelector(selector) {
  return first(selector.match(/^\w*/))
}

function first(array) {
  return array.length ? array[0] : undefined;
}

function prettyPrintNearMatches(searchFunction, selector) {
  return searchFunction(tagFromSelector(selector))
    .toArray()
    .map($.html)
    .join('\\n  ');
}

function toContainSelector(received, selector) {
  const foundElements = received.find(selector);
  const pass = foundElements.length > 0;
  const message = pass
    ? () => this.utils.matcherHint('.not.toContainSelector') + `

Expected not to find "${selector}" in:
  ${this.utils.printReceived(received)}
but found:
  ${foundElements}`
    : () => this.utils.matcherHint('.toContainSelector') + `

Expected to find "${selector}" among:
  ${prettyPrintNearMatches(s => received.find(s), selector)}
but no elements matching that selector were found.`;

  return { actual: received, message, pass };
}

function toIncludeSelector(received, selector) {
  const foundElements = received.filter(selector);
  const pass = foundElements.length > 0;
  const message = pass
    ? () => this.utils.matcherHint('.not.toIncludeSelector') + `

Expected not to find "${selector}" in:
  ${this.utils.printReceived(received)}
but found:
  ${foundElements}`
    : () => this.utils.matcherHint('.toIncludeSelector') + `

Expected to find "${selector}" among:
  ${prettyPrintNearMatches(s => received.filter(s), selector)}
but no elements matching that selector were found.`;

  return { actual: received, message, pass };
}

module.exports = {
  toContainSelector, toIncludeSelector
}
