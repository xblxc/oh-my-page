## Oh-My-Page

一个chrome插件

* 通过配置，可以在打开指定网站时，注入相应js代码并执行；小小的功能，可能很有用，可能很鸡肋，就看你了~ O.o

### Install

1. 进入 chrome://extensions/；
2. 勾选上开发者模式；
3. 加载已解压的扩展程序；（指定本程序目录）

### Example

url: 

```
https://github.com
```
  
code: 

``` js
!function(){
  var form = document.querySelector('.js-site-search-form');
  var scope = document.querySelector('.header-search-scope');
  var toggleList = [
    ['/search', 'github'],
    [form.getAttribute('action'), scope.innerText]
  ];
  var count = 0;
  scope.onclick = function(e){
    count = count % 2;
    form.setAttribute('action', toggleList[count][0]);
    scope.innerText = toggleList[count][1];
    ++count;
    e.preventDefault();
  };
}();  
```
  
该demo的功能就是：切换github搜索输入框的搜索范围；
