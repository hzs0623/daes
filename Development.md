## 开发模式安装依赖
注意查看最外层`package.json` 添加`private`字段，并设置为`true`。
```js
yarn
```

### lerna使用
  #### 添加公共依赖
  例如添加vue包到每个项目中
  ```js
  lerna add vue
  ```

  #### 更新依赖包
  在`@daes/cli`项目将vue包更新
  ```js
   lerna add vue --scope=@daes/cli
  ```

  #### 添加单独依赖
  我们把vue安装到`@daes/cli`项目中
  ```js
   lerna add xxx --scope=@daes/cli
  ```
  注意 `scope` 的值对应的是 `package.json` 中的 `name` 字段


  #### package 发布包
  默认会从`packages`中下的所有项目进行发布。
  ```js
  lerna publish
  ```
   ##### 发布包时发生错误
   报错信息： You must sign up for private packages 
   在每个项目中的`package.json`文件加上下面代码即可解决：
   ```js
    // package.json 增加配置
    "publishConfig": {
      "access": "public"
    }
   ```
  
  #### 卸载包
  将vue从项目`@daes/cli`中移除
  ```js
  npm:
  lerna exec --scope=@daes/cli npm uninstall vue

  yarn:
  lerna exec --scope=@daes/cli yarn remove veu
  ```

   #### 抽离公共依赖
   
  上面 A 和 B两个项目都依赖了Vue，且在各自 package 下的node_modules 里都有副本，这其实很浪费空间，可以使用 --hoist
  ```js
  lerna bootstrap --hoist
  ```
  这会将 `packages` 里重复的依赖提取到最外层的` node_modules `里，同时最外层的 `package.json `也不会更新` dependency` 信息，所以不建议将公用依赖写到最外层的`package.json`里。
  建议是重复写到每个子`package.json `里，然后用` --hoist `提取出来。


 #### 更新公共依赖
 假设要升级 A 和 B 都依赖的 Vue 版本，不必依次到各子package下升级，可以借助 lerna-update-wizard 这个包来做
 ```js
 // 根目录执行
  npm install --save-dev lerna-update-wizard
  ./node_modules/.bin/lernaupdate
 ```

