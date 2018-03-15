# jest-enzyme-selector-matchers

Jest matchers for asserting on the existence of elements matching selectors.

## Installation

```
npm install --save-dev jest-enzyme-selector-matchers
```

These matchers assume the existence of Jest and Enzyme (unsurprisingly).

You'll also need to require the module and extend Jest's expectations:

```js
const selectorMatchers = require('jest-enzyme-selector-matchers');

expect.extend(selectorMatchers);
```

## Usage

Given an Enzyme wrapper `element` (anything with a `.find` method) you can make assertions such as:

```js
expect(element).toContainSelector('button'); // basic search
expect(element).toContainSelector('div.myStyling'); // class selectors
expect(element).toContainSelector('CustomComponent'); // search by name, useful for shallow wrappers
expect(element).toContainSelector(CustomComponent); // search by component class
expect(element).toContainSelector('a[href="/target"]'); // attribute selectors
expect(element).toContainSelector(`img[src="${testImageUrl}"]`); // interpolated selectors
expect(element).not.toContainSelector('button'); // negation
```

...and anything else supported by the `.find` method.

The library also provides the matcher `.toIncludeSelector`, which uses `.filter` rather than `.find`. This can be useful if the wrapper you're asserting on contains multiple elements and you want to be able to find them at the top level (e.g. children of a `React.fragment`).

Internally the matchers use `.find`/`.filter` and check that at least one element is found. If no elements are found and the assertion fails, the failure output will take a stab at finding similar elements (by simplifying the selector).

## License

This project is licensed under the Unlicense - see the [LICENSE](LICENSE) file for details
