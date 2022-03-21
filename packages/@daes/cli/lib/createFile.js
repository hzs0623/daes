const fs = require('fs-extra')
const path = require('path')


// fs.writeFileSync('文件路径'，'要写入的内容'，['编码']，'回调函数')
function createFile(baseDir, fileName, content) {
  const filePath = path.join(baseDir, fileName)
  fs.ensureDirSync(path.dirname(filePath))
  return fs.writeFileSync(filePath, `${content}\n`)
}

module.exports.createFile = createFile
