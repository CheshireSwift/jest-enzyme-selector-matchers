const React = require('react');
const { render } = require('enzyme');

describe('the contains matcher', () => {
  const element = (
    <div>
      <p>blah</p>
      <a href="/one">blah</a>
      <a href="/two">blah</a>
    </div>
  );

  it('finds child elements by selector', () => {
    expect(render(element))
      .toContainSelector('p');
  });

  it('finds child elements with more complex selectors', () => {
    expect(render(element))
      .toContainSelector('a[href="/two"]');
  });

  it('does not find elements that are not there', () => {
    expect(render(element))
      .not.toContainSelector('a[href="/three"]');
  });
});

describe('the includes matcher', () => {
  const element = (
    <React.Fragment>
      <p>blah</p>
      <a href="/one">blah</a>
      <a href="/two">blah</a>
    </React.Fragment>
  );

  it('filters for elements by selector', () => {
    expect(render(element))
      .toIncludeSelector('p');
  });

  it('filters for elements with more complex selectors', () => {
    expect(render(element))
      .toIncludeSelector('a[href="/two"]');
  });

  it('does not include elements that are not there', () => {
    expect(render(element))
      .not.toIncludeSelector('a[href="/three"]');
  });
});
