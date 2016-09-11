# 直接量和构造函数

直接量模式的优点
>* 更加简洁
>* 更富有表现力
>* 定义对象时不易出错

## 对象直接量

#### 对象直接量语法
1. __Summary__
    * javascript 定义的对象（用户定义的本地对象）任何时候都是可变的
    * 直接量写法是“按需创建对象的理想方式”

2. __Sample__
    
    ```javascript
    var dog = {};
    dog.name = "Beiji";
    doc.getName = function(){
        return dog.name;
    };
    ```
3. __Javascript 中的空对象__

    * Js 中没有真正的空对象,即使是最简单的空对象也包含从 _Object.prototype_ 继承来的属性和方法
    * 我们所说的空对象只是不包含自己的属性，不考虑从基类继承来的属性

4. __对象直接量的语法__

    * 将对象主体包含在一对花括号内（{ and }）。
    * 对象内的属性或方法之间使用逗号分隔。最后一个名值对后也可以有逗号，但在IE下会报错，所以尽量不要在最后一个属性或方法后加逗号。
    * 属性名和值之间使用冒号分隔
    *如果将对象赋值给一个变量，不要忘了在右括号}之后补上分号

5. __通过构造函数创建对象__

    * Sample:
    ```javascript
    var adam = new Person("Adam");
    adam.say();                     //I am Adam
    ```
    * _new_ 关键字创建对象时，函数体内发生的事情：
        * 创建一个空对象，将它的引用赋给 _this_ ,继承函数的原型
        * 通过 _this_ 将属性和方法添加至这个对象
        * 最后返回 _this_ 所指向的新对象(在没有收到返回对象的前提下)

        *Note*： 将重要的成员和方法都放在原型里，避免每次复制，以提高效率

6. __获得对象构造器__

    * 不要使用 *new Object()* , 尽可能使用对象直接量来创建实例对象

## 自定义构造函数

  ```javascript
  var adm = new Person('Adam');
  var Person = function(name){
    ...
  }
  ```

* 构造函数返回值： 默认是 this

## 强制使用 new 模式

_构造函数与普通函数没有差别，漏掉 new 会使 this 指向全局对象，因而污染全局命名空间_ 

* 1.命名约定：
    * 构造函数首字母大写
    * 普通函数首字母小写

* 2.使用 that
    * 不要将所有成员挂到 this 上，将它们挂在 that 上，并返回 that 避免构造函数出错

        ```javascript
                \\方案1
                function Waffle(){
                    var that = {};
                    that.xxx = xxx;
                    return that;
                }

                \\方案2
                function Waffle(){
                    return {
                        that:xxxx;
                    };
                }
        ```

        * 这种模式存在的问题

            * 丢失了原型

* 3.调用自身构造函数 (解决原型丢失问题)
```javascript
    function Waffle(){
        if(!(this instanceof Waffle)){
            return new Waffle();
        }
        this.tastes = 'Yummy';
    }
    Waffle.prototype. wantAnother true;

    var first = new Waffle(),
        second = Waffle();

    console.log(first.tastes); // Yummy
    console.log(second.tastes); // Yummy

    console.log(first.wantAnother); //true
    console.log(second.wantAnother); //true
```

## 数组直接量
* 1. 创建两个具有相同元素数组的两种方法：
        * Array 和直接量模式
* 2. 数组直接量语法：[]
* 3. 数组构造器，Array 的参数不能是小数
* 4. 检查是不是数组：
   * 1) ES5 环境： Array.isArray()
   * 2) 非 ES5 环境：
    
    ```javascript
    if(typeof Array.isArray === "undefined"){
        Array.isArray = function(arg){
            return Object.prototype.toString.call(arg) === "[Object Array]";
        }
    }
    ```

## JSON
* 1. JSON 是一种轻量级的数据交换格式
* 2. JSON 格式：是数组和对象直接量的混合写法
    ```javascript
    {"name":"value","some":[1,2,3]}
    ```
* 3. JSON 和对象直接量语法的区别：
    _合法的 JSON 属性名均用引号包含_

* 4. 使用 JSON:
    * 出于安全考虑，不推荐使用eval()来解析JSON字符串
    * ES5 中使用 JSON.parse() 方法
    * 不支持 ES5 的老旧浏览器使用 JSON.org 提供的 js 文件
    
    ```javascript
    // an input JSON string
    var jstr = '{"mykey": "my value"}';
    // antipattern
    var data = eval('(' + jstr + ')');
    // preferred
    var data = JSON.parse(jstr);
    console.log(data.mykey); // "my value"
    ```
    
    * _JSON.stringify()_ 将对象或数组（任何原始值）转换为 JSON 字符串

## 正则表达式
* 1. 创建方式：
    * 使用new RegExp() 构造函数
    * 使用正则表达式直接量 __（推荐）__
    * 不带 _new_ 调用 RegExp 和带 _new_ 调用 RegExp 完全一样

## 原始值对象和包装对象
除非对原始值对象进行扩充，否则一般不会使用其对应的包装对象

## Error 对象
* 1. Error 对象通常与 _throw_ 配合使用
* 2. Error 对象包含两个属性：_name_ 和 _message_
* 3. _throw_ 可以抛出任何对象
* 4. 通过 _new_ 和省略 _new_的错误构造函数是完全一样的，都返回相同的错误对象 


    



 




