###Installation

`npm install -g meteor-maker`

###Usage

####New Project

`cd` into a new project folder

`meteor-maker project <name>`

This will scaffold your new project. See [here](https://github.com/timsvoice/meteor-maker/wiki/2.-New-Project) for folder structure details.

####New API

`meteor-maker g:api <name>`

Will create a new api directory at `imports/api/<name>` with `html`, `js`, and `sass` files.

####New Method

`meteor-maker g:method <name>`

Will add a new method to the end of the `methods.js` file of API you select in the prompts.

####New UI Element

`meteor-maker g:ui <type>`

Will generate `.html`, `.js`, `.scss` files for a new UI element, where type is one of: component, layout, page.

####Dependencies

[commander](https://www.npmjs.com/package/commander)

[recursive-readdir](https://www.npmjs.com/package/recursive-readdir)

[ncp](https://www.npmjs.com/package/ncp)

[handlebars](https://www.npmjs.com/package/handlebars)
