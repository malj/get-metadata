# get-metadata

A utility function for querying and normalizing DOM metadata content. Useful for passing initial JSON values to frontend apps, without multiple server requests.

## Installation
```
npm install get-metadata
```

## Usage

```html
<meta name="my-custom-json" content='{"foo": "bar", "baz": [1337, true, null]}'>
<meta name="twitter:creator" content="@lukamaljic">
<meta property="og:url" content="https://github.com/malj/get-metadata">
<meta name="no-content">
```
```javascript
var getMetadata = require('get-metadata')

getMetadata('my-custom-json')  // => {foo: 'bar', baz: [1337, true, null]}
getMetadata('twitter:creator')  // => '@lukamaljic'
getMetadata('og:url', {key: 'property'})  // => 'https://github.com/malj/get-metadata'
getMetadata('no-content')  // => null
getMetadata('non-existing')  // => undefined
```

## API
### getMetadata(name, [options])

Query the DOM for a meta element with the attribute "name" value equal to the `name` param and return its "content" attribute value. Options:

- key (default: `'name'`): Queries a meta tag by this attribute key
- warn (default: `false`): Displays a warning in the console if no meta element is found

## Resouces

- [W3C spec](https://www.w3.org/TR/html5/document-metadata.html#the-meta-element)
