'use strict'
// 原始斐波那契函数
var fabonacci = function (n) {
  return n < 2 ? n : fabonacci(n - 1) + fabonacci(n - 2)
}

// 带记忆功能的斐波那契函数
var fabonacci2 = function (n) {
  var memo = [0, 1]
  fib = function (n) {
    var result = memo[n]
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2)
      memo[n] = result
    }
    return result
  }
  return fib
}()

// 改进后的带记忆功能的斐波那契函数
var memorizer = function (memo, fundamental) {
  var shell = function (n) {
    result = memo[n]
    if (typeof result !== 'number') {
      result = fundamental(shell, n)
      memo[n] = result
    }
    return result
  }
  return shell
}
var fabonacci3 = memorizer([0, 1], function (shell, n) {
  return shell(n - 1) + shell(n - 2)
})
// 阶乘
var factorial = memorizer([1, 1], function (shell, n) {
  return n * shell(n - 1)
})
