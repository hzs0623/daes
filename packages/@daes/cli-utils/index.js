exports.chalk = require('chalk')
exports.semver = require('semver')

const utilsName = ['pkg']
utilsName.forEach(f => {
    Object.assign(exports, require(`./lib/${f}`))
})

