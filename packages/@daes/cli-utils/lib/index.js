exports.chalk = require('chalk')
exports.execa = require('execa')
exports.semver = require('semver')

const utilsName = [
    'logger',
    'pkg',
    'env',
    'executeCommand'
]
utilsName.forEach(f => {
    // Object.assign(exports, require(`./lib/${f}`))
})

