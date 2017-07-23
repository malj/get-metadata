;(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory)
    }
    else if (typeof exports === 'object') {
        module.exports = factory()
    }
    else {
        global.getMetadata = factory()
    }
}(this, function () {
    /**
     * A utility function for querying and normalizing DOM metadata content
     * https://www.w3.org/TR/html5/document-metadata.html#the-meta-element
     */
    return function getMetadata(name, options) {
        var attribute = (options && options.key || 'name') + '="' + name + '"'
        var meta = document.querySelector('meta[' + attribute + ']')
        if (meta) {
            var value = meta.getAttribute('content')
            try {
                return JSON.parse(value)
            }
            catch (error) {
                return value
            }
        }
        else if (options && options.warn) {
            console.warn('Element <meta ' + attribute + '> does not exist')
        }
    }
}));
