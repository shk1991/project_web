
### 如何使用    
1. 执行 `(c)npm install`      
1. 开发 `npm run server`  
1. 打包 `npm run build`

### 文档

项目ui开发引入的是semantic-ui框架  example:http://www.semantic-ui.cn

js/components/ 此目录为公共插件项

js/modules/     此目录为自定义公共js方法

js/modules/views/   此目录为页面级模块 （index.vue 为主体框架页面）

dropdown-select 模糊查询时，点击无匹配项时不能触发input blur，可引入pulic中的processDropdownSelect方法兼容处理
processDropdownSelect();

### git地址