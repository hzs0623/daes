const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Creator = require('./Creator')
const { getPromptModules } = require('./createTool')

async function create(name, options) {
    const isCurrent = name === '.'
    const cwd = process.cwd() // 当前所在绝对路径
    const targetDir = isCurrent ? path.relative('../', cwd) : name

    // 判断当前目录下是否有创建过
    if (fs.existsSync(targetDir)) {
        if (isCurrent) {
            const { ok } = await inquirer.prompt([
                {
                    name: 'ok',
                    type: 'confirm',
                    message: `在当前目录中生成项目?`
                }
            ])
            if (!ok) return
        } else {
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: `Target directory ${targetDir} already exists. Pick an action:`,
                    choices: [
                        { name: '覆盖', value: 'overwrite' },
                        { name: '取消', value: false }
                    ]
                }
            ])
            if (!action) return
            if (action === 'overwrite') {
                console.log(`\nRemoving ${targetDir}...`)
                await fs.remove(targetDir)
            }
        }
    }
    
    const creator = new Creator(name, targetDir, getPromptModules())
    await creator.create(options)
}


module.exports = create