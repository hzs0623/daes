exports.chalk = require('chalk')
exports.semver = require('semver')
exports.execa = require('execa')

const utilsName = ['pkg', 'env']
utilsName.forEach(f => {
    Object.assign(exports, require(`./lib/${f}`))
})

