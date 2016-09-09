# 高质量 Js 要点


## 编写可维护的代码

#### 可维护的代码的特点：
* 可读的
* 一致的
* 可预测的
* 看起来像同一个人写的
* 有文档的

## 减少全局对象

1. 全局变量和局部变量
2. 每个 Javascript 运行环境都有一个“全局变量”，不在任何函数体内使用 *this* 就可获得这个全局对象的引用，你所创建的每个全局变量都是这个全局对象的属性
3. 浏览器常常会提供一个全局对象的属性 *window*， 用以指向全局对象

#### 全局对象带来的困扰

*全局变量在 Javascript 代码执行期间或整个 web 页面中始终可见，它们存在于同一命名空间，因此容易出现命名冲突*

减少全局变量的策略：
> * 使用命名空间
> * 使用匿名函数
> * 使用var来声明变量 （减少全局变量的最有效方法）

##### 隐形全局对象：<br/>
*任何不通过 var 声明的对象都会变成全局对象的一个属性*
_*Note：*_ 一种反模式，在下面代码片段中，*a* 是局部变量，*b* 是全局变量<br/>

```Javascript
function foo(){
    var a = b = 0;
    //...
}`
```
如果变量 *b* 已经声明，这种链式赋值写法是 Ok 的，比如:

```Javascript
function foo(){
    var a, b;
    //...
    a = b = 0; //both local
}
```

避免使用全局变量的另一个原因是出于可移植性考虑

#### 忘记 var 时的副作用
隐式全局变量和显式全局变量的区别在于使用 *delete* 删除它们时的表现不一致：<br/>
>* 通过 var 创建的全局变量（在任何函数体外创建的变量）不能被删除
>* 没有用 var 创建的全局变量 (不考虑函数内的情况) 不能被删除<br/>
_隐式全局变量不算是真正的变量，他们是全局对象的属性成员。属性是成员可以通过 Delete 运算符删除的，而变量不可以被删除_

#### 访问全局对象
>* 浏览器中可以 *windows* 属性访问全局对象
>* 在任意层次嵌套的函数作用域内执行

```Javascript
 var global = (function(){
    return this;
    }())
```

*Ntote:* 在ES5 严格模式中上面代码片段不可行

#### 单 var 模式
在函数顶部使用单独 var 语句有如下好处：
>* 在同一位置可以查到函数所需的所有变量
>* 避免当在变量声明之前使用这个变量时产生的逻辑错误
>* 减少潜在全局变量
>* 代码量更少，更易优化<br/>
```Javascript
function() func(){
    var a = 1, 
        b = 2,
        sum = a + b;
    //function body....
}
```
#### 声明提前：分散的 var 带来的问题
_*变量提前：*_JavaScript 中是允许在函数的任意地方写任意多个 var 语句的，其实相当于
在函数体顶部声明变量
变量提前，导致当你在声明之前使用这个变量时，可能会 造成逻辑错误<br/>

``` Javascript
//antipattern
myname = "global"; // global variable
function func() {
alert(myname); // "undefined"
var myname = "local";
alert(myname); // "local"
}
func();
```

上述代码等价片段：

```Javascript
myname = "global"; // global variable
function func() {
var myname; // same as -> var myname = undefined;
myname = "global"; // global variable
function func() {
var myname; // same as -> var myname = undefined;
```

#### for 循环
>* 一般模式：<br/>
```Javascript
for(var i = 0;i < myarray.length;i++){
}
```

存在的问题： 每次遍历都会访问数组的length 属性,降低了代码运行效率，特别是在进行DOM 操作时，因为指向的HTMLCollection是活动对象，所以访问 length 时，总是会去查询 DOM
>* 改进方案1， 缓存住数组长度<br/>

```Javascript
for(var i=0, max = myarray.length; i < max; i++){

}
```
>* 进一步改进，使用单 var 模式

```Javascript
function looper(){
    var i = 0, myarray = [], length = myarray.length;
    for(i = 0; i < max; i++){
        //do something
    }
}
```
此种方式优点：提高代码一致性<br/>
此种方式缺点：不方便重构
>* 更进一步改进：减少一个变量（没有 max），减量循环至0（这样更高效，因为和零比较要比和非零数字或数组长度比较高效得多）<br/>

```Javascript
//方式1
var i,myarray=[];
for(i = myarray.length; i != 0; i--){

}

//方式2
var myarray = [], i = myarray.length;
while(i--){
}
```
#### for-in 循环
* for-in循环并不按顺序执行，因此用 for 循环访问数组， for-in 循环遍历对象
* 过滤原型链上的对象时使用

```Javascript
var hasOwn = Object.prototype.hasOwnProperty`
```

#### 不扩充内置原型
#### Switch 模式
#### 避免使用隐式转换
* 使用 '===' 和 '!==' 避免隐式类型转换
* 避免使用 eval()

#### 使用 parseInt() 进行数字转换
* parseInt 第二个参数为转换基数
* 为避免转换类型不一致，应当总是指定第二个参数
* +"08" //result is 8   Number("08") //result is 8 此两种方式都比parseInt() 快
* 但当你期望将“08 hello”这类字符串转换为数字，则必须使用 parseInt()，其他方法都会返回 NaN
* parseInt()方法的实质是进行解析而不是简单转换

#### 编码风格
确立并遵守编码规范非常重要，这会让你的代码 _风格一致、可预测、可读性更强_ 。团队新成员通过学习编码规范可以很快进入开发状态、并写出团队其
他成员易于理解的代码。
>* 缩进
>* 花括号
>* 左花括号位置
>* 空格

#### 命名规范
可以提升你代码的可预测性和可维护性
>* 构造函数大小写： 首字母大写 => 构造函数; 首字母小写 => 一般函数
>* 单词分隔：“驼峰式命名”  大驼峰 => 构造函数; "小驼峰" => 一般函数； 变量名 => 小驼峰或者全小写单词间用下划线分隔
>* 其他命名规则： 在程序运行周期内不会改变的量使用全大写字母命名，私有变量使用下划线前缀

#### 书写注释
#### 书写 API 文档 (使用工具)
>* JSDoc Toolkit
>* YUIDoc
#### 编写易读的代码
#### 相互评审
>* 同行评审
>* 使用版本管理工具（CVS, SVN 或者 Git）

#### 生产环境中代码压缩
压缩代码能提高查找速度，代码也会运行的更快，
此外还能提高压缩比、加快下载速度（服务器开启Gzip的情况下压缩代码对下载速度不大）

#### JSLint 检查代码
>* 不可达代码
>* 使用变量前要声明
>* 不安全的 UTF 字符
>* 使用 void、with 和 eval
>* 无法准确解析的正则表达式

