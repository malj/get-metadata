const assert = require('assert')
const {JSDOM} = require('jsdom')
const getMetadata = require('./get-metadata')

const dom = new JSDOM(`
    <meta name="existing" content="content">
    <meta name="no-content">
    <meta property="property" content="content">
    <meta name="string" content="string">
    <meta name="number" content="1337">
    <meta name="boolean" content="true">
    <meta name="array" content='["let", 3]'>
    <meta name="object" content='{"property": 1337}'>
    <meta name="null" content="null">
`)
global.document = dom.window.document

describe('The function', () => {
    it('should find a metatag with a given name and return its content', () => {
        assert(getMetadata('existing') === 'content')
    })

    it('should find a metatag with an arbitrary attribute name', () => {
        assert(getMetadata('property', {key: 'property'}) === 'content')
    })

    it('should return null if the metatag does not have a "content" attribute', () => {
        assert(getMetadata('no-content') === null)
    })

    it('should return undefined if no metatag is found', () => {
        assert(getMetadata('non-existing') === undefined)
    })
})

describe('The content', () => {
    it('should be parsable as a string', () => {
        assert(getMetadata('string') === 'string')
    })

    it('should be parsable as a number', () => {
        assert(getMetadata('number') === 1337)
    })

    it('should be parsable as a boolean', () => {
        assert(getMetadata('boolean') === true)
    })

    it('should be parsable as a null value', () => {
        assert(getMetadata('null') === null)
    })

    it('should be parsable as an array', () => {
        const array = getMetadata('array')
        assert(Array.isArray(array))
        assert(array[0] === 'let')
        assert(array[1] === 3)
    })

    it('should be parsable as an object', () => {
        const object = getMetadata('object')
        assert(typeof object === 'object')
        assert(object.property === 1337)
    })
})
