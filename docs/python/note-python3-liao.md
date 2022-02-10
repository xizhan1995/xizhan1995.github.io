# Python学习笔记
[廖雪峰python教程](https://www.liaoxuefeng.com/wiki/1016959663602400)

## 废话

在写代码之前，请千万不要用“复制”-“粘贴”把代码从页面粘贴到你自己的电脑上。写程序也讲究一个感觉，你需要一个字母一个字母地把代码
自己敲进去，在敲代码的过程中，初学者经常会敲错代码：拼写不对，大小写不对，混用中英文标点，混用空格和Tab键，所以，你需要仔细地
检查、对照，才能以最快的速度掌握如何写程序。

## 1. 第一个程序
```py
print('hello, world')
```
用print()在括号中加上字符串，就可以向屏幕上输出指定的文字。
print()函数也可以接受多个字符串，用逗号“,”隔开，就可以连成一串输出,
print()会依次打印每个字符串，遇到逗号“,”会输出一个空格。

```py
name = input()
print('hello', name)
```

Python提供了一个input()，可以让用户输入字符串，并存放到一个变量里。

### note1：print 函数的用法

[api](https://docs.python.org/3/library/functions.html#print)
`print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)`

把对象输出到文本流中，各个对象之间用sep分隔，末尾用end结束。（默认是空格分隔，换行结束）。
对象用str()转换为字符串。
分隔符和结束符必须指定为字符串，或者是None，指定为None意味着使用默认值。
如果没有对象，则只输出end。

file 参数必须是有 write(string) 方法的对象，如果省略或者指定为None，则使用sys.stdout.
print 无法以二进制格式输出内容，如果有此类需要使用 file.write() 方法。

缓冲设置取决于file参数自身，但如果指定flush为True，则会强制刷新。

注：文本流相关内容，参考io章节的知识。

### note2: input函数
<https://docs.python.org/3/library/functions.html#input>
`input([prompt])`

读取一行输入，以字符串类型返回。
如果有prompt参数，则以此作为提示语（不会自动添加换行）。
如果达到文件尾部，抛出 EOFError。

## 2. python基础

一行是一条语句。
井号（#）之后的是注释，单行注释。不支持多行注释和块注释。
变量直接赋值使用，没有变量声明语句。
语句块用缩进表示，没有花括号。
if/for 后面的语句没有圆括号，用冒号结尾(和 shell 很像)

True，False，and，not，or:都是大小写敏感的

字符串：单引号、双引号形式，等价的；三引号，可跨越多行。

函数定义没有提升效果，需要先声明后使用。

class中的函数定义则无所谓声明顺序。

Python程序是大小写敏感的，如果写错了大小写，程序会报错。

### 数据类型：整数、浮点数、字符串、布尔值
逻辑运算符：and，not，or
四则运算：加减乘除，地板除（//）
关系比较：
### 字符串和编码
python3 开始，字符串内部使用unicode字符集存储。

对于单个字符的编码，Python提供了ord()函数获取字符的整数表示，chr()函数把编码转换为对应的字符：
```py
>>> ord('A')
65
>>> ord('中')
20013
>>> chr(66)
'B'
>>> chr(25991)
'文'
```
如果知道字符的整数编码，还可以用十六进制这么写str：`'\u4e2d\u6587'`这种写法和`'中文'` 完全等价。

Python对bytes类型的数据用带b前缀的单引号或双引号表示：`x = b'ABC'`.
要注意区分'ABC'和b'ABC'，前者是str，后者虽然内容显示得和前者一样，但bytes的每个字符都只占用一个字节。

以Unicode表示的str通过encode()方法可以编码为指定的bytes：`'中文'.encode('utf-8')`
纯英文的str可以用ASCII编码为bytes，内容是一样的，含有中文的str可以用UTF-8编码为bytes。含有中文的str无法用ASCII编码，因为中文编码的范围超过了ASCII编码的范围，Python会报错。
在bytes中，无法显示为ASCII字符的字节，用`\x##`显示.

> Only ASCII characters are permitted in bytes literals (regardless of the declared source code encoding). Any binary values over 127 must be entered into bytes literals using the appropriate escape sequence.

翻过来，如果我们从网络或磁盘上读取了字节流，那么读到的数据就是bytes。要把bytes变为str，就需要用decode()方法：
```py
>>> b'ABC'.decode('ascii')
'ABC'
>>> b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
'中文'
```
如果bytes中包含无法解码的字节，decode()方法会报错：

len()函数计算的是str的字符数。

字符串格式化：
```py
# % 方式和C的语法一致
>>> 'Hello, %s' % 'world'
'Hello, world'
>>> 'Hi, %s, you have $%d.' % ('Michael', 1000000)
'Hi, Michael, you have $1000000.'
```
如果你不太确定应该用什么，%s永远起作用，它会把任何数据类型转换为字符串：
另一种格式化字符串的方法是使用字符串的format()方法，它会用传入的参数依次替换字符串内的占位符{0}、{1}……，不过这种方式写起来比%要麻烦得多：
```py
>>> 'Hello, {0}, 成绩提升了 {1:.1f}%'.format('小明', 17.125)
'Hello, 小明, 成绩提升了 17.1%'
```
注：ord和chr互逆。只处理一个字符的字符串。
注：python中没有字符类型。字符，一律用长度为1的str表示。

### 使用 list和tuple
两者都是有序容器，list 是可变对象，tuple 是不可变对象。
下标语法访问元素.
len(x) 获取元素数目。

list 是可变对象，故而比tuple多支持如下操作：
1. 下标赋值 list[0] = 12
2. l.append(x)

#### note1: 序列类型(list,tuple,range)
<https://docs.python.org/3/library/stdtypes.html#sequence-types-list-tuple-range>
list,tuple,range 是三种基本的序列类型。二进制和文本串也是序列类型，但在别的章节介绍。

序列公有操作：
x in s
x not in s
s + t
s*n 或 n * s
s[i]
s[i:j] s[i:j:step]     切片，前开后闭
len(s), min(s), max(s)
s.count(x),
s.index(x,i?,j?)        在s中查找x第一次出现的索引，从i开始，结束于j之前。

注：字符串的in和not in 还能当作子串测试 `'hello' in 'hello,world' --> True`
注：range不支持+ * 操作。

可变序列还支持：
del s[i:j?:step?]
s[i:j?:k?] = x
s.append(x)
s.extend(t)
s += t  --> s.extend(t)
s *= n  --> n次 s.extend(s)
s.copy()
s.pop(i=-1) 移除并返回位置i的元素。默认为-1，表示移除最后一个元素
s.insert(i, x)  --> s[i:i]=x
s.remove(x)     移除第一个x
s.reverse()

获取list：
1. 字面值[]
2. list生成式 [x for x in iterable]
3. list构造器 list(), list(iterable)

获得tuple：
1. 字面值：(), (1,), (1,2,3)，或者直接 1,2,3
2. 构造器: tuple(), tuple(iterable)

字面值中，逗号才是主要的，而不是圆括号（除非 1. 空元素 2. 避免歧义的时候）
Note that it is actually the comma which makes a tuple, not the parentheses. The parentheses are optional, except in the empty tuple case, or when they are needed to avoid syntactic ambiguity.

文本类型的序列：str

printf风格的格式化：
```py
'hello, my name is %s, age is %d' % name, age
'hello, my name is %(name)s, age is %(age)s' %{'name':name, 'age':age}
```
注：比C有了一些扩展，比如，右侧%后可以是mapping类型（字典等）。


二进制类型的序列：byte，bytearray，memoryview
bytearray是byte的可变版本对应物。

### 条件判断：if-elif-else
### 循环：`for x in seq`
```py
for i in range(10):
    print(i)
```
```
for_stmt ::=  "for" target_list "in" expression_list ":" suite
              ["else" ":" suite]
```
循环执行for语句体，最后执行一遍else语句（如果有的话），然后结束for循环。
brek语句直接结束循环，连 else 也不会执行。
continue 结束本轮循环。
### 使用 dict和set

set 和 dict 的唯一区别在于：set 没有对应的 value。别的原理是一样的。

字典字面值
```py
>>> d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
>>> d['Michael']
95
```
内部使用哈希表存储，查找速度极快。

字典的key必须是可哈希的（不仅限于字符串）。

当访问不存在的key时，，d[k], del d[k], d.pop(k) 都会报告异常。

d[k] = value, d.get(k)  都不会报告异常。

## 3. 函数

可见，借助抽象，我们才能不关心底层的具体计算过程，而直接在更高的层次上思考问题。
写计算机程序也是一样，**函数就是最基本的一种代码抽象的方式**。

调用函数
函数也是一种值，可以赋值给变量。

一个例子，函数定义：
```py
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x
# 加上类型检测
def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    if x >= 0:
        return x
    else:
        return -x
```
原来返回值是一个tuple！但是，在语法上，返回一个tuple可以省略括号，而多个变量可以同时接收一个tuple，按位置赋给对应的值，所以，Python的函数返回多值其实就是返回一个tuple，但写起来更方便。

函数参数
- 定义时：位置参数、关键字参数、位置或关键字参数、星号、双星号；默认值
- 调用时：位置、关键字、星号、双星号

对于任意函数，都可以通过类似func(*args, **kw)的形式调用它，无论它的参数是如何定义的。

虽然可以组合多达5种参数，但不要同时使用太多的组合，否则函数接口的可理解性很差。

递归：
递归函数的优点是定义简单，逻辑清晰。理论上，所有的递归函数都可以写成循环的方式，但循环的逻辑不如递归清晰。
使用递归函数需要注意防止栈溢出。由于栈的大小不是无限的，所以，递归调用的次数过多，会导致栈溢出。
解决递归调用栈溢出的方法是通过尾递归优化，事实上尾递归和循环的效果是一样的，所以，把循环看成是一种特殊的尾递归函数也是可以的。

尾递归优化：

尾递归是指，在函数返回的时候，调用自身本身，并且，return语句不能包含表达式。这样，编译器或者解释器就可以把尾递归做优化，使递归本身无论调用多少次，都只占用一个栈帧，不会出现栈溢出的情况。
尾递归调用时，如果做了优化，栈不会增长，因此，无论多少次调用也不会导致栈溢出。
遗憾的是，大多数编程语言没有针对尾递归做优化，Python解释器也没有做优化，所以，即使把上面的fact(n)函数改成尾递归方式，也会导致栈溢出。

上面的fact(n)函数由于return n * fact(n - 1)引入了乘法表达式，所以就不是尾递归了。要改成尾递归方式，需要多一点代码，主要是要把每一步的乘积传入到递归函数中：
```py
def fact(n):
    if n==1:
        return 1
    return n * fact(n - 1)
```
下面这个就是尾递归
```py
def fact(n):
    return fact_iter(n, 1)

def fact_iter(num, product):
    if num == 1:
        return product
    return fact_iter(num - 1, num * product)
```
## 4. 高级特性
掌握了Python的数据类型、语句和函数，基本上就可以编写出很多有用的程序了。

比如构造一个1, 3, 5, 7, ..., 99的列表，可以通过循环实现：
```pyL = []
n = 1
while n <= 99:
    L.append(n)
    n = n + 2
```
取list的前一半的元素，也可以通过循环实现。

但是在Python中，代码不是越多越好，而是越少越好。代码不是越复杂越好，而是越简单越好。

基于这一思想，我们来介绍Python中非常有用的高级特性，1行代码能实现的功能，决不写5行代码。请始终牢记，代码越少，开发效率越高。

### 4.1 切片
取一个list或tuple的部分元素是非常常见的操作.
对这种经常取指定索引范围的操作，用循环十分繁琐，因此，Python提供了切片（Slice）操作符，能大大简化这种操作。
在很多编程语言中，针对字符串提供了很多各种截取函数（例如，substring），其实目的就是对字符串切片。Python没有针对字符串的截取函数，
只需要切片一个操作就可以完成，非常简单。

```py
# 切片操作十分有用。我们先创建一个0-99的数列：

>>> L = list(range(100))
>>> L
[0, 1, 2, 3, ..., 99]
# 可以通过切片轻松取出某一段数列。比如前10个数：

>>> L[:10]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 后10个数：
>>> L[-10:]
[90, 91, 92, 93, 94, 95, 96, 97, 98, 99]

# 前11-20个数：
>>> L[10:20]
[10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

# 前10个数，每两个取一个：
>>> L[:10:2]
[0, 2, 4, 6, 8]

# 所有数，每5个取一个：
>>> L[::5]
[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]

# 甚至什么都不写，只写[:]就可以原样复制一个list：
>>> L[:]
[0, 1, 2, 3, ..., 99]

# tuple也是一种list，唯一区别是tuple不可变。因此，tuple也可以用切片操作，只是操作的结果仍是tuple：
>>> (0, 1, 2, 3, 4, 5)[:3]
(0, 1, 2)

# 字符串'xxx'也可以看成是一种list，每个元素就是一个字符。因此，字符串也可以用切片操作，只是操作结果仍是字符串：
>>> 'ABCDEFG'[:3]
'ABC'
>>> 'ABCDEFG'[::2]
'ACEG'
```
### 4.2 迭代
如果给定一个list或tuple，我们可以通过for循环来遍历这个list或tuple，这种遍历我们称为迭代（Iteration）。
在Python中，迭代是通过for ... in来完成的.

```py
# 序列迭代
L=list(range(10))
for item in L:
    print(item)
# 映射迭代
d = {
    'name':'jack',
    'age':18
}
# 默认情况下，dict迭代的是key
for key in d:
    pritn(key,d[key])

# 迭代字典的value
for v in d.values():
    print(v)
# 同时迭代key和value
for k,v in d.items():
    print(k,v)

for item in d.items():
    k,v = item
    print(k,v)

# 要对list实现类似Java那样的下标循环怎么办
# Python内置的enumerate函数可以把一个list变成索引-元素对
for i,e in enumerate(L):
    print(i,e)

```

Python的for循环抽象程度要高于C的for循环，因为Python的for循环不仅可以用在list或tuple上，还可以作用在其他可迭代对象上。
我们使用for循环时，只要作用于一个可迭代对象，for循环就可以正常运行，而我们不太关心该对象究竟是list还是其他数据类型。
通过collections模块的Iterable类型判断一个对象是不是可迭代对象：
```py
>>> from collections import Iterable
>>> isinstance('abc', Iterable) # str是否可迭代
True
>>> isinstance([1,2,3], Iterable) # list是否可迭代
True
>>> isinstance(123, Iterable) # 整数是否可迭代
False
```
### 4.3 列表生成式
列表生成式即List Comprehensions,是Python内置的非常简单却强大的可以用来创建list的生成式（生成式是一种表达式）。

要生成list [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]可以用list(range(1, 11))
但如果要生成[1x1, 2x2, 3x3, ..., 10x10]怎么做？方法一是循环，但是太繁琐，而列表生成式则可以用一行语句代替循环生成上面的list：
`[x * x for x in range(1, 11)]`
for循环后面还可以加上if判断，这样我们就可以筛选出仅偶数的平方: `[x * x for x in range(1, 11) if x % 2 == 0]`
还可以使用两层循环，可以生成全排列：`[m + n for m in 'ABC' for n in 'XYZ']`
三层和三层以上的循环就很少用到了。

### 4.4 生成器
通过列表生成式，我们可以直接创建一个列表。但是，受到内存限制，列表容量肯定是有限的。而且，创建一个包含100万个元素的列表，
不仅占用很大的存储空间，如果我们仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。

所以，如果列表元素可以按照某种算法推算出来，那我们是否可以在循环的过程中不断推算出后续的元素呢？这样就不必创建完整的list，
从而节省大量的空间。在Python中，这种一边循环一边计算的机制，称为生成器：generator。

要创建一个generator，有很多种方法。第一种方法很简单，只要把一个列表生成式的[]改成()，就创建了一个generator：
```py
>>> L = [x * x for x in range(10)]
>>> L
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
>>> g = (x * x for x in range(10))
>>> g
<generator object <genexpr> at 0x1022ef630>
```

我们可以直接打印出list的每一个元素，但我们怎么打印出generator的每一个元素呢？

如果要一个一个打印出来，可以通过next()函数获得generator的下一个返回值：
```py
>>> next(g)
0
>>> next(g)
1
#...
>>> next(g)
81
>>> next(g)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration

```

**generator保存的是算法**，每次调用next(g)，就计算出g的下一个元素的值，直到计算到最后一个元素，没有更多的元素时，抛出StopIteration的错误。
当然，上面这种不断调用next(g)实在是太变态了，正确的方法是使用for循环，因为generator也是可迭代对象.


定义generator的另一种方法。如果一个函数定义中包含yield关键字，那么这个函数就不再是一个普通函数，而是一个generator：
```py
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'
```


最难理解的就是generator和函数的执行流程不一样。函数是顺序执行，遇到return语句或者最后一行函数语句就返回。
而变成generator的函数，在每次调用next()的时候执行，遇到yield语句返回，再次执行时从上次返回的yield语句处继续执行，直到执行到
函数末尾或遇到return语句后结束（抛出StopIteration）。

用for循环调用generator时，发现拿不到generator的return语句的返回值。如果想要拿到返回值，必须捕获StopIteration错误，返回值包含在StopIteration的value中。


### 4.5 迭代器

可以使用isinstance()判断一个对象是否是Iterable对象：
```py
>>> from collections.abc import Iterable
>>> isinstance([], Iterable)
True
>>> isinstance({}, Iterable)
```
PS:只要实现了可迭代协议（即定义了`__iter__`方法）就返回True。
PPS: 鸭子类型、isinstance、`__subclasshook__()`


可以被next()函数调用并不断返回下一个值的对象称为迭代器：Iterator. 使用isinstance()判断一个对象是否是Iterator对象：
PS：实际的迭代器只需要实现next方法，但python中做了扩展，迭代器必须同时实现iter方法，故而python的中迭代器一定同时也是可迭代对象。

```py
>>> from collections.abc import Iterator
>>> isinstance((x for x in range(10)), Iterator)
True
>>> isinstance([], Iterator)
False
```
生成器都是Iterator对象，但list、dict、str虽然是Iterable，却不是Iterator。

把list、dict、str等Iterable变成Iterator可以使用iter()函数：
```py
>>> isinstance(iter([]), Iterator)
True
>>> isinstance(iter('abc'), Iterator)
True
```

为什么list、dict、str等数据类型不是Iterator？
因为Python的Iterator对象表示的是一个数据流。
## 5. 函数式编程

函数式编程（请注意多了一个“式”字）——Functional Programming，虽然也可以归结到面向过程的程序设计，但其思想更接近数学计算。

计算机（Computer）、计算（Compute）、抽象程度
汇编语言是最贴近计算机的语言。
而计算则指数学意义上的计算，越是抽象的计算，离计算机硬件越远。
对应到编程语言，就是越低级的语言，越贴近计算机，抽象程度低，执行效率高，比如C语言；越高级的语言，越贴近计算，抽象程度高，
执行效率低，比如Lisp语言。

函数式编程就是一种抽象程度很高的编程范式，纯粹的函数式编程语言编写的函数没有变量，因此，任意一个函数，只要输入是确定的，
输出就是确定的，这种纯函数我们称之为没有副作用。而允许使用变量的程序设计语言，由于函数内部的变量状态不确定，同样的输入，
可能得到不同的输出，因此，这种函数是有副作用的。

函数式编程的一个特点就是，允许把函数本身作为参数传入另一个函数，还允许返回一个函数！

Python对函数式编程提供部分支持。由于Python允许使用变量，因此，Python不是纯函数式编程语言
### 5.1 高阶函数
变量可以指向函数；
函数名也是变量。
```py
def double(x):
    return x+x;
double = 2 # 这是可以的
```

既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。
#### map/reduce
```py
L = []
for n in [1, 2, 3, 4, 5, 6, 7, 8, 9]:
    L.append(f(n))
print(L)
# 等价于
>>> list(map(str, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
['1', '2', '3', '4', '5', '6', '7', '8', '9']
```

所以，map()作为高阶函数，事实上它把运算规则抽象了。

```py
# reduce 对序列求和
>>> from functools import reduce
>>> def add(x, y):
...     return x + y
...
>>> reduce(add, [1, 3, 5, 7, 9])
25

>>> from functools import reduce
>>> def fn(x, y):
...     return x * 10 + y
...
>>> reduce(fn, [1, 3, 5, 7, 9])
13579
```

注：functools.reduce()

```py
def reduce(function, iterable, initializer=None):
    it = iter(iterable)
    if initializer is None:
        value = next(it)
    else:
        value = initializer
    for element in it:
        value = function(value, element)
    return value

```
注：functools.accumulate()
<https://docs.python.org/3/library/itertools.html#itertools.accumulate>
这个函数，可以看作加强版的reduce，它会保留中间计算结果。
此函数大致等价于如下：
```py
def accumulate(iterable, func=operator.add, *, initial=None):
    'Return running totals'
    # accumulate([1,2,3,4,5]) --> 1 3 6 10 15
    # accumulate([1,2,3,4,5], initial=100) --> 100 101 103 106 110 115
    # accumulate([1,2,3,4,5], operator.mul) --> 1 2 6 24 120
    it = iter(iterable)
    total = initial
    if initial is None:
        try:
            total = next(it)
        except StopIteration:
            return
    yield total
    for element in it:
        total = func(total, element)
        yield total
```
#### filter
filter()也接收一个函数和一个序列，返回新序列，其中只包含函数判定为true的元素。

```py
# 只保留奇数
L = list(range(10));
is_odd = lambda x:x%2==1;
L2 = filter(is_odd, L);
print(list(L2))

# 去除列表中的空字符串和空白字符串
L = ['A', '', 'B', None, 'C', '  ']
not_empty = lambda s: s and s.strip()
L2 = list(filter(not_empty, L))
print(L2)
```

#### 排序

```py
>>> sorted([36, 5, -12, 9, -21])
[-21, -12, 5, 9, 36]
```
此外，sorted()函数也是一个高阶函数，它还可以接收一个key函数来实现自定义的排序，例如按绝对值大小排序：
```py
>>> sorted([36, 5, -12, 9, -21], key=abs)
[5, 9, -12, -21, 36]
```
### 5.2 返回函数
闭包
### 5.3 匿名函数
在Python中，对匿名函数提供了有限支持：lambda表达式。
```py
>>> list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```
匿名函数`lambda x: x * x`实际上就是：
```py
def f(x):
    return x * x
```
Python对匿名函数的支持有限，只有一些简单的情况下可以使用匿名函数。

### 5.4 装饰器

假设我们要增强now()函数的功能，比如，在函数调用前后自动打印日志，但又不希望修改now()函数的定义，
这种在代码运行期间动态增加功能的方式，称之为“装饰器”（Decorator）。

- 本质上，decorator就是一个返回函数的高阶函数。
```py
def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper

@log
def now():
    print('2015-3-25')

>>> now()
call now():
2015-3-25
```
- 本质上，装饰器仅仅是一个语法糖。
@log
def foo(): pass
等价于 `foo = log(foo)`

而
@log(args)
def foo(): pass
则等价于 `foo = log(args)(foo)`

- 如果decorator本身需要传入参数，那就需要编写一个返回decorator的高阶函数。
比如，要自定义log的文本：
```py
def log(text):
    def decorator(func):
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator

@log('execute')
def now():
    print('2015-3-25')
>>> now()
execute now():
2015-3-25
```

- 还差最后一步。经过decorator装饰之后的函数，它们的__name__已经从原来的'now'变成了'wrapper'：

所以，需要把原始函数的__name__等属性复制到wrapper()函数中，否则，有些依赖函数签名的代码执行就会出错。
不需要编写`wrapper.__name__ = func.__name__`这样的代码，Python内置的functools.wraps就是干这个事的，所以，一个完整的decorator的写法如下：

```py
import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper


import functools

def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator
```

ps: 使用 functools.wraps()  而不是手动编写属性赋值，一是更简便，二则是函数的内置属性可能会变，而这个标准库一定会自动跟着变，
维护起来更省心。


在面向对象（OOP）的设计模式中，decorator被称为装饰模式。OOP的装饰模式需要通过继承和组合来实现，而Python除了能支持OOP的decorator外，
直接从语法层次支持decorator。Python的decorator可以用函数实现，也可以用类实现。

decorator可以增强函数的功能，定义起来虽然有点复杂，但使用起来非常灵活和方便。

请编写一个decorator，能在函数调用的前后打印出'begin call'和'end call'的日志。

再思考一下能否写出一个@log的decorator，使它既支持：

    @log
    def f():
        pass

又支持：

    @log('execute')
    def f():
        pass
### 偏函数
Python的functools模块提供了很多有用的功能，其中一个就是偏函数（Partial function）。
要注意，这里的偏函数和数学意义上的偏函数不一样。

通过设定参数的默认值，可以降低函数调用的难度。而偏函数也可以做到这一点。

functools.partial就是帮助我们创建一个偏函数的
```py
>>> import functools
>>> int2 = functools.partial(int, base=2)
>>> int2('1000000')
64
>>> int2('1010101')
85
```
注意到上面的新的int2函数，仅仅是把base参数重新设定默认值为2，但也可以在函数调用时传入其他值：
```py
>>> int2('1000000', base=10)
1000000
```


**创建偏函数时，实际上可以接收函数对象、`*args和**kw`这3个参数**，当传入：

`int2 = functools.partial(int, base=2)`实际上固定了int()函数的关键字参数base，也就是：

`int2('10010')` 相当于：
```py
kw = { 'base': 2 }
int('10010', **kw)
```
当传入：`max2 = functools.partial(max, 10)`实际上会把10作为*args的一部分自动加到左边，也就是：

`max2(5, 6, 7)` 相当于：
```py
args = (10, 5, 6, 7)
max(*args)
```
## 6. 模块
模块、包

正常的函数和变量名是公开的（public），可以被直接引用，比如：abc，x123，PI等；

类似`__xxx__`这样的变量是特殊变量，可以被直接引用，但是有特殊用途，比如上面的`__author__，__name__`就是特殊变量，
模块定义的文档注释也可以用特殊变量`__doc__`访问，我们自己的变量一般不要用这种变量名；

类似`_xxx和__xxx`这样的函数或变量就是非公开的（private），不应该被直接引用，比如`_abc，__abc`等；
所谓私有变量是指以

之所以我们说，private函数和变量“不应该”被直接引用，而不是“不能”被直接引用，是因为Python并没有一种方法可以完全限制访问private函数或变量

`_*`    Not imported by from module import *
`__*__` System-defined names, informally known as “dunder” names. These names are defined by the interpreter and its
        implementation (including the standard library).
`__*`   Class-private names. Names in this category, when used within the context of a class definition, are re-written to
        use a mangled form to help avoid name clashes between “private” attributes of base and derived classes.
         See section Identifiers (Names).

> Private name mangling: When an identifier that textually occurs in a class definition begins with two or more underscore characters and does not end in two or more underscores, it is considered a private name of that class. Private names are transformed to a longer form before code is generated for them. The transformation inserts the class name, with leading underscores removed and a single underscore inserted, in front of the name. For example, the identifier __spam occurring in a class named Ham will be transformed to _Ham__spam. This transformation is independent of the syntactical context in which the identifier is used. If the transformed name is extremely long (longer than 255 characters), implementation defined truncation may happen. If the class name consists only of underscores, no transformation is done.

### 6.2 安装第三方模块
1. pip
2. pypi.python.org 第三方模块

一般来说，第三方库都会在Python官方的pypi.python.org网站注册，要安装一个第三方库，必须先知道该库的名称，可以在官网或者pypi上搜索，
比如Pillow的名称叫Pillow，因此，安装Pillow的命令就是：

pip install Pillow

3. 虚拟环境
4. anaconda、科学计算、python

## 7. 面向对象编程

面向过程的程序设计把计算机程序视为一系列的命令集合，即一组函数的顺序执行。为了简化程序设计，面向过程把函数继续切分为子函数，
即把大块函数通过切割成小块函数来降低系统的复杂度。

而**面向对象的程序设计把计算机程序视为一组对象的集合，而每个对象都可以接收其他对象发过来的消息，并处理这些消息，计算机程序的执行就是一系列消息在各个对象之间传递。**
给对象发消息实际上就是调用对象对应的关联函数，我们称之为对象的方法（Method）。
假设我们要处理学生的成绩表.

```py
class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        print('%s: %s' % (self.name, self.score))

bart = Student('Bart Simpson', 59)
lisa = Student('Lisa Simpson', 87)
bart.print_score()
lisa.print_score()
```

面向对象的抽象程度又比函数要高，因为一个Class既包含数据，又包含操作数据的方法。

**数据封装、继承和多态是面向对象的三大特点**，我们后面会详细讲解。
### 7.1 类和实例
```py
class Student(object):
    pass
```
class后面紧接着是类名，即Student，类名通常是大写开头的单词，紧接着是(object)，表示该类是从哪个类继承下来的.
通常，如果没有合适的继承类，就使用object类，这是所有类最终都会继承的类。

**可以自由地给一个实例变量绑定属性**，比如，给实例bart绑定一个name属性：

```py
>>> bart.name = 'Bart Simpson'
>>> bart.name
'Bart Simpson'
```

`__init__()`方法是是特殊方法，它是构造器方法。

和普通的函数相比，在类中定义的函数只有一点不同，就是第一个参数永远是实例变量self，并且调用时不用传递该参数。

```py
class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        print('%s: %s' % (self.name, self.score))
```
上面的 print_score() 方法是和类关联的，称为**类方法**。

### 7.2 访问限制
1. 不希望外部直接访问类的实例属性，可以把属性名定义为以两个（或更多）下划线开头（且不以下划线结尾）
2. 同时可以根据需要提供对应的get/set
3. 注：提供get/set的好处是可以进行数据检查
```py
class Student(object):

    def __init__(self, name, score):
        self.__name = name
        self.__score = score

    def print_score(self):
        print('%s: %s' % (self.__name, self.__score))
    def get_name(self):
        return self.__name

    def get_score(self):
        return self.__score

    # def set_score(self, score):
    #     self.__score = score

    def set_score(self, score):
        if 0 <= score <= 100:
            self.__score = score
        else:
            raise ValueError('bad score')
```

有些时候会看到以一个下划线开头的实例变量名，比如`_name`，这样的实例变量外部是可以访问的，但是，按照约定俗成的规定，
当你看到这样的变量时，意思就是，“虽然我可以被访问，但是，请把我视为私有变量，不要随意访问”。

不能直接访问`__name`是因为Python解释器对外把`__name`变量改成了`_Student__name`，所以，仍然可以通过`_Student__name`来访问`__name`变量：
```py
>>> bart._Student__name
'Bart Simpson'
```
ps:但是，类内部的访问，还是使用 `__name` 变量名。

但是强烈建议你不要这么干，因为不同版本的Python解释器可能会把__name改成不同的变量名。

总的来说就是，Python本身没有任何机制阻止你干坏事，一切全靠自觉。

### 7.3 继承和多态

```py
class Animal(object):
    def run(self):
        print('Animal is running...')
```

继承有什么好处？最大的好处是子类获得了父类的全部功能。由于Animial实现了run()方法，
因此，Dog和Cat作为它的子类，什么事也没干，就自动拥有了run()方法
```py
class Dog(Animal):
    pass

class Cat(Animal):
    pass

dog = Dog()
dog.run()

cat = Cat()
cat.run()
```

扩展和重写
```py
class Dog(Animal):

    def run(self):
        print('Dog is running...')

    def eat(self):
        print('Eating meat...')

class Cat(Animal):

    def run(self):
        print('Cat is running...')
```
当子类和父类都存在相同的run()方法时，我们说，子类的run()覆盖了父类的run()，在代码运行的时候，总是会调用子类的run()。
这样，我们就获得了继承的另一个好处：多态。


```py
# 类型判断
>>> isinstance(a, list)
True
>>> isinstance(b, Animal)
True
>>> isinstance(c, Dog)
True
```


多态的好处就是，当我们需要传入Dog、Cat、Tortoise……时，我们只需要接收Animal类型就可以了，因为Dog、Cat、Tortoise……都是Animal类型，
然后，按照Animal类型进行操作即可。由于Animal类型有run()方法，因此，传入的任意类型，只要是Animal类或者子类，就
会自动调用实际类型的run()方法，这就是多态的意思。

静态语言 vs 动态语言

对于静态语言（例如Java）来说，如果需要传入Animal类型，则传入的对象必须是Animal类型或者它的子类，否则，将无法调用run()方法。

对于Python这样的动态语言来说，则不一定需要传入Animal类型。我们只需要保证传入的对象有一个run()方法就可以了：
```py
class Timer(object):
    def run(self):
        print('Start...')
```
这就是动态语言的“鸭子类型”，它并不要求严格的继承体系，一个对象只要“看起来像鸭子，走起路来像鸭子”，那它就可以被看做是鸭子。
### 7.4 获取对象信息
#### 判断对象类型：type函数
```py
# 基本类型
>>> type(123)
<class 'int'>
>>> type('str')
<class 'str'>
>>> type(None)
<type(None) 'NoneType'>
# 类或者函数
>>> type(abs)
<class 'builtin_function_or_method'>
>>> type(a)
<class '__main__.Animal'>

# type() 返回对应的Class类型
>>> type(123)==type(456)
True
>>> type(123)==int
True
>>> type('abc')==type('123')
True
>>> type('abc')==str
True
>>> type('abc')==type(123)
False

# 判断是否是函数：借助 types 模块定义的常量
# PS: 用 inspect.isfunction() 也可以
>>> import types
>>> def fn():
...     pass
...
>>> type(fn)==types.FunctionType
True
>>> type(abs)==types.BuiltinFunctionType
True
>>> type(lambda x: x)==types.LambdaType
True
>>> type((x for x in range(10)))==types.GeneratorType
True
```

#### 使用isinstance（）函数
对于class的继承关系来说，使用type()就很不方便。我们要判断class的类型，可以使用isinstance()函数

如果继承关系是：`object -> Animal -> Dog -> Husky`
```py
>>> a = Animal()
>>> d = Dog()
>>> h = Husky()
# 因为h变量指向的就是Husky对象
>>> isinstance(h, Husky)
True
# h虽然自身是Husky类型，但由于Husky是从Dog继承下来的，所以，h也还是Dog类型。换句话说，
# isinstance()判断的是一个对象是否是该类型本身，或者位于该类型的父继承链上。
>>> isinstance(h, Dog)
True
# 但是，d不是Husky类型：
>>> isinstance(d, Husky)
False
```

```py
# 能用type()判断的基本类型也可以用isinstance()判断：

>>> isinstance('a', str)
True
>>> isinstance(123, int)
True
>>> isinstance(b'a', bytes)
True
# 还可以判断一个变量是否是某些类型中的一种
>>> isinstance([1, 2, 3], (list, tuple))
True
>>> isinstance((1, 2, 3), (list, tuple))
True
```
#### 获取对象的所有属性：dir()
dir()函数，它返回一个包含字符串的list

类似`__xxx_`_的属性和方法在Python中都是有特殊用途的，比如`__len__`方法返回长度。在Python中，如果你调用len()函数试图获取一个对象的长度，实际上，在len()函数内部，它自动去调用该对象的`__len__`()方法，所以，下面的代码是等价的：
```py
>>> len('ABC')
3
>>> 'ABC'.__len__()
3

# 我们自己写的类，如果也想用len(myObj)的话，就自己写一个__len__()方法：

>>> class MyDog(object):
...     def __len__(self):
...         return 100
...
>>> dog = MyDog()
>>> len(dog)
100
```

仅把属性和方法列出来是不够的，配合**getattr()、setattr()以及hasattr()**，我们可以直接操作一个对象的状态：
```py
>>> class MyObject(object):
...     def __init__(self):
...         self.x = 9
...     def power(self):
...         return self.x * self.x
...
>>> obj = MyObject()
# 紧接着，可以测试该对象的属性：

>>> hasattr(obj, 'x') # 有属性'x'吗？
True
>>> obj.x
9
>>> hasattr(obj, 'y') # 有属性'y'吗？
False
>>> setattr(obj, 'y', 19) # 设置一个属性'y'
>>> hasattr(obj, 'y') # 有属性'y'吗？
True
>>> getattr(obj, 'y') # 获取属性'y'
19
>>> obj.y # 获取属性'y'
19
# 如果试图获取不存在的属性，会抛出AttributeError的错误：

>>> getattr(obj, 'z') # 获取属性'z'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'MyObject' object has no attribute 'z'
# 可以传入一个default参数，如果属性不存在，就返回默认值：

>>> getattr(obj, 'z', 404) # 获取属性'z'，如果不存在，返回默认值404
404
# 也可以获得对象的方法：

>>> hasattr(obj, 'power') # 有属性'power'吗？
True
>>> getattr(obj, 'power') # 获取属性'power'
<bound method MyObject.power of <__main__.MyObject object at 0x10077a6a0>>
>>> fn = getattr(obj, 'power') # 获取属性'power'并赋值到变量fn
>>> fn # fn指向obj.power
<bound method MyObject.power of <__main__.MyObject object at 0x10077a6a0>>
>>> fn() # 调用fn()与调用obj.power()是一样的
81
```


通过内置的一系列函数，我们可以对任意一个Python对象进行剖析，拿到其内部的数据。要注意的是，只有在不知道对象信息的时候，我们才会去获取对象信息。如果可以直接写：

`sum = obj.x + obj.y` 就不要写：`sum = getattr(obj, 'x') + getattr(obj, 'y')`
一个正确的用法的例子如下：
```py
# 假设我们希望从文件流fp中读取图像，我们首先要判断该fp对象是否存在read方法，
# 如果存在，则该对象是一个流，如果不存在，则无法读取。hasattr()就派上了用场。

def readImage(fp):
    if hasattr(fp, 'read'):
        return readData(fp)
    return None
```
请注意，在Python这类动态语言中，根据鸭子类型，有read()方法，不代表该fp对象就是一个文件流，
它也可能是网络流，也可能是内存中的一个字节流，但只要read()方法返回的是有效的图像数据，就不影响读取图像的功能。

#### 注：属性

- getattr(object, name[, default])
    - 获取对象属性；如果有这个属性则返回，如果没有，则返回default，如果也没有default，则抛出 AttributeError
    - PS：假设对象 o 没有 name 属性，getattr(o, 'name')会抛出异常，而getattr(o, 'anme', None) 则返回None。
    - PPS：js中传入undefined和省略参数是等价的，而python中传入None则更类似于js中传入null。python中根部不能省略必选参数。
    - Q。是怎么做到的？位置参数、区分省略和显式赋值为None；唯一想到的是可变参数（星号参数）
Return the value of the named attribute of object. name must be a string. If the string is the name of one of the object’s attributes, the result is the value of that attribute. For example, getattr(x, 'foobar') is equivalent to x.foobar. If the named attribute does not exist, default is returned if provided, otherwise AttributeError is raised.
- setattr(object, name, value)
    - 设置对象属性；和 object.name = value 等价
This is the counterpart of getattr(). The arguments are an object, a string and an arbitrary value. The string may name an existing attribute or a new attribute. The function assigns the value to the attribute, provided the object allows it. For example, setattr(x, 'foobar', 123) is equivalent to x.foobar = 123.
- hasattr(object, name) --> bool
The arguments are an object and a string. The result is True if the string is the name of one of the object’s attributes, False if not. (This is implemented by calling getattr(object, name) and seeing whether it raises an AttributeError or not.)
- delattr(object, name)
This is a relative of setattr(). The arguments are an object and a string. The string must be the name of one of the object’s attributes. The function deletes the named attribute, provided the object allows it. For example, delattr(x, 'foobar') is equivalent to del x.foobar.

### 7.5 实例属性和类属性

给实例绑定属性的方法是通过实例变量，或者通过self变量。

但是，如果Student类本身需要绑定一个属性呢？可以直接在class中定义属性，这种属性是类属性，归Student类所有：
```py
class Student(object):
    name = 'Student'
```

这个类属性虽然归类所有，但类的所有实例都可以访问到，且相同名称的实例属性将屏蔽掉类属性。
```py
>>> class Student(object):
...     name = 'Student'
...
>>> s = Student() # 创建实例s
>>> print(s.name) # 打印name属性，因为实例并没有name属性，所以会继续查找class的name属性
Student
>>> print(Student.name) # 打印类的name属性
Student
>>> s.name = 'Michael' # 给实例绑定name属性
>>> print(s.name) # 由于实例属性优先级比类属性高，因此，它会屏蔽掉类的name属性
Michael
>>> print(Student.name) # 但是类属性并未消失，用Student.name仍然可以访问
Student
>>> del s.name # 如果删除实例的name属性
>>> print(s.name) # 再次调用s.name，由于实例的name属性没有找到，类的name属性就显示出来了
Student
```
#### 属性访问
1. 句点是属性访问，是成员访问，方括号则是下标，是字典映射；
2. 自定义类默认可以任意增添属性（直接通过句点访问+赋值），而内置类（序列、字典、object）都不行
3. 无论自定义还是内置的类，访问不存在属性都会抛异常（AttributeError）
4. 可以定制自定义类属性访问行为：`__getattr__(), __setattr__()`
5. python中没有基本类型，一切都是对象。但是方法、函数，类、类实例这四种是四类不同的对象，python从语法层面区分这四种对象。

## 8. 面向对象高级编程
### 使用 `__slots__`
```py
class Student(object):
    pass

# 尝试给实例绑定一个属性：

>>> s = Student()
>>> s.name = 'Michael' # 动态给实例绑定一个属性
>>> print(s.name)
Michael

# 还可以尝试给实例绑定一个方法：

>>> def set_age(self, age): # 定义一个函数作为实例方法
...     self.age = age
...
>>> from types import MethodType
>>> s.set_age = MethodType(set_age, s) # 给实例绑定一个方法
>>> s.set_age(25) # 调用实例方法
>>> s.age # 测试结果
25

# 但是，给一个实例绑定的方法，对另一个实例是不起作用的：
>>> s2 = Student() # 创建新的实例
>>> s2.set_age(25) # 尝试调用方法
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Student' object has no attribute 'set_age'

# 为了给所有实例都绑定方法，可以给class绑定方法：
>>> def set_score(self, score):
...     self.score = score
...
>>> Student.set_score = set_score

# 给class绑定方法后，所有实例均可调用：

>>> s.set_score(100)
>>> s.score
100
>>> s2.set_score(99)
>>> s2.score
99
```

通常情况下，上面的set_score方法可以直接定义在class中，但动态绑定允许我们在程序运行的过程中动态给class加上功能，这在静态语言中很难实现。

自定义类对象和自定义类的实例对象默认可以随人增加新属性。

但是，如果我们想要限制实例的属性怎么办？比如，只允许对Student实例添加name和age属性。

为了达到限制的目的，Python允许在定义class的时候，定义一个特殊的__slots__变量，来限制该class实例能添加的属性：

```py
class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称
```
然后，我们试试：
```py
>>> s = Student() # 创建新的实例
>>> s.name = 'Michael' # 绑定属性'name'
>>> s.age = 25 # 绑定属性'age'
>>> s.score = 99 # 绑定属性'score'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Student' object has no attribute 'score'
```
由于'score'没有被放到`__slots__`中，所以不能绑定score属性，试图绑定score将得到AttributeError的错误。

使用`__slots__`要注意，`__slots__`定义的属性仅对当前类实例起作用，对继承的子类是不起作用的：
```py
>>> class GraduateStudent(Student):
...     pass
...
>>> g = GraduateStudent()
>>> g.score = 9999
```
除非在子类中也定义`__slots__`，这样，子类实例允许定义的属性就是自身的`__slots__`加上父类的`__slots__`。

### 使用 @property

```py
class Student(object):

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value
```

把一个getter方法变成属性，只需要加上@property就可以了，此时，@property本身又创建了另一个装饰器@score.setter，负责把一个setter方法变成属性赋值.
还可以定义只读属性，只定义getter方法，不定义setter方法就是一个只读属性.
```py
class Student(object):

    @property
    def birth(self):
        return self._birth

    @birth.setter
    def birth(self, value):
        self._birth = value

    @property
    def age(self):
        return 2015 - self._birth
```

### 多重继承

在设计类的继承关系时，通常，主线都是单一继承下来的，例如，Ostrich继承自Bird。但是，如果需要“混入”额外的功能，
通过多重继承就可以实现，比如，让Ostrich除了继承自Bird外，再同时继承Runnable。这种设计通常称之为MixIn。

为了更好地看出继承关系，我们把Runnable和Flyable改为RunnableMixIn和FlyableMixIn。类似的，你还可以定义出肉食动物
CarnivorousMixIn和植食动物HerbivoresMixIn，让某个动物同时拥有好几个MixIn：
```py
class Dog(Mammal, RunnableMixIn, CarnivorousMixIn):
    pass
```
### 定制类（操作符重载）

看到类似`__slots__`这种形如`__xxx__`的变量或者函数名就要注意，这些在Python中是有特殊用途的。
`__slots__`我们已经知道怎么用了，`__len__()`方法我们也知道是为了能让class作用于len()函数.

slots/len/getitem/getattr/

`__str__()` 转字符串

> 这是因为直接显示变量调用的不是`__str__()`，而是`__repr__()`，两者的区别是`__str__()`返回用户看到的字符串，
    而`__repr__()`返回程序开发者看到的字符串，也就是说，`__repr__()`是为调试服务的。

repr 有个偷懒的写法
```py
class Student(object):
    def __init__(self, name):
        self.name = name
    def __str__(self):
        return 'Student object (name=%s)' % self.name
    __repr__ = __str__
```

`__iter__/__next__` 前者返回迭代对象，迭代对象的`__next__()`不断返回下一个元素。
`__getitem/getitem/delitem__()` 下标操作符（包括字符串、整数、切片）
`__getattr/setattr/delattr__()` 句点属性访问操作符。


```py
# 要让class只响应特定的几个属性，我们就要按照约定，抛出AttributeError的错误：
class Student(object):

    def __getattr__(self, attr):
        if attr=='age':
            return lambda: 25
        raise AttributeError('\'Student\' object has no attribute \'%s\'' % attr)
# 可以把一个类的所有属性和方法调用全部动态化处理

'''可以针对完全动态的情况作调用。

举个例子：

现在很多网站都搞REST API，比如新浪微博、豆瓣啥的，调用API的URL类似：

http://api.server/user/friends
http://api.server/user/timeline/list
如果要写SDK，给每个URL对应的API都写一个方法，那得累死，而且，API一旦改动，SDK也要改。

利用完全动态的__getattr__，我们可以写出一个链式调用：
'''
class Chain(object):


    def __init__(self, path=''):
        self._path = path

    def __getattr__(self, path):
        return Chain('%s/%s' % (self._path, path))

    def __str__(self):
        return self._path

    __repr__ = __str__
>>> Chain().status.user.timeline.list
'/status/user/timeline/list'
```
class Chain(object):
    def __init__(self, path=''):
            self._path=path
    def __str__(self): return self._path
    __repr__ = __str__
    def __getattr__(self, path):
            return Chain('%s/%s' % (self._path, path))

c = Chain()

### 使用枚举

```py
from enum import Enum
Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'
    , 'Aug', 'Sep', 'Oct', 'Nov'))

for name, member in Month.__members__.items():
    print(name, '=>', member, ',', member.value)

Jan => Month.Jan , 1
Feb => Month.Feb , 2
Mar => Month.Mar , 3
Apr => Month.Apr , 4
May => Month.May , 5
Jun => Month.Jun , 6
Jul => Month.Jul , 7
Aug => Month.Aug , 8
Sep => Month.Sep , 9
Oct => Month.Oct , 10
Nov => Month.Nov , 11

```
Month 是一个枚举类，同时有12个成员，每个成员都是此枚举类的一个实例。
这每个枚举实例有一个整数编号，存在 .value 属性中。
每个枚举实例还有一个 .name 属性。

```py
# 访问枚举成员：句点、字符串下标、整数+构造函数。（即可以通过name也可以通过value）
>>> Month(1)
<Month.Jan: 1>
>>> Month.Jan
<Month.Jan: 1>
>>> Month['Jan']
<Month.Jan: 1>
>>> Month[1]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "D:\programs\python\v3.8\lib\enum.py", line 344, in __getitem__
    return cls._member_map_[name]
KeyError: 1
>>> Month('Jan')
ValueError: 'Jan' is not a valid Month
```


如果需要更精确地控制枚举类型，可以从Enum派生出自定义类：
```py
from enum import Enum, unique
# @unique装饰器可以帮助我们检查保证没有重复值。

@unique
class Weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6
```

### 元类

type(o) 可以获取对象o的类型。
type() 还可以创建新的类型。（class 语句实际上只是语法糖）。
> 通过type()函数创建的类和直接写class是完全一样的，因为Python解释器遇到class定义时，仅仅是扫描一下class定义的语法，
    然后调用type()函数创建出class。

```py
class Foo:
    def hello(self):
        print('hello')

# 等价于
def fn(self):
    print('hello')
Foo = type('Foo', (object,), dict(hello=fn));

```

先有类，然后得到类的实例；
先有元类，然后得到类（即类可以看作是元类的实例）。
PS：一切都是对象，一切对象都是某个类的实例。类也是对象，它们是一个叫做 type 的类的实例（同时type也是对象，作为对象时，它是type（即他自己）的实例）。
ps：类是对象的模板，元类是类的模板。好绕。这比js更强大。
ps：先有模板，后有实例。
ps: 一切对象是起源是 type。先有type，然后以type为模板创建了object，它是一切其它类的默认父类。
    type以及type的后代都是元模板，元模板的实例都是模板；
    不是type及type的后代，都不能作为元模板；不是元模板的实例，都不能作为模板。
    模板的就是通常所说的类。

先看一个简单的例子，这个metaclass可以给我们自定义的MyList增加一个add方法：

```py
# metaclass是类的模板，所以必须从`type`类型派生：
class ListMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)

# 当我们传入关键字参数metaclass时，魔术就生效了，它指示Python解释器在创建MyList时，
# 要通过ListMetaclass.__new__()来创建，在此，我们可以修改类的定义
class MyList(list, metaclass=ListMetaclass):
    pass

# 测试一下MyList是否可以调用add()方法：

>>> L = MyList()
>>> L.add(1)
>> L
[1]

# 而普通的list没有add()方法：
>>> L2 = list()
>>> L2.add(1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'list' object has no attribute 'add'
```

直接在MyList定义中写上add()方法不是更简单吗？正常情况下，确实应该直接写，通过metaclass修改纯属变态。

但是，总会遇到需要通过metaclass修改类定义的。ORM就是一个典型的例子。ORM全称“Object Relational Mapping”。


#### 让我们来尝试编写一个ORM框架。
使用者如果使用这个ORM框架，想定义一个User类来操作对应的数据库表User，我们期待他写出这样的代码：
```py
class User(Model):
    # 定义类的属性到列的映射：
    id = IntegerField('id')
    name = StringField('username')
    email = StringField('email')
    password = StringField('password')

# 创建一个实例：
u = User(id=12345, name='Michael', email='test@orm.org', password='my-pwd')
# 保存到数据库：
u.save()
```

其中，父类Model和属性类型StringField、IntegerField是由ORM框架提供的，剩下的魔术方法比如save()全部由metaclass自动完成。

```py
# 首先来定义Field类，它负责保存数据库表的字段名和字段类型：

class Field(object):

    def __init__(self, name, column_type):
        self.name = name
        self.column_type = column_type

    def __str__(self):
        return '<%s:%s>' % (self.__class__.__name__, self.name)

# 在Field的基础上，进一步定义各种类型的Field，比如StringField，IntegerField等等：

class StringField(Field):

    def __init__(self, name):
        super(StringField, self).__init__(name, 'varchar(100)')

class IntegerField(Field):

    def __init__(self, name):
        super(IntegerField, self).__init__(name, 'bigint')
```
PS：super（）的用法。

下一步，就是编写最复杂的ModelMetaclass了,以及基类Model.

```py
class ModelMetaclass(type):
    def __new__(cls, name, bases, attrs):
        if name=='Model':
            return type.__new__(cls, name, bases, attrs)
        print('Found model: %s' % name)
        mappings = dict()
        for k, v in attrs.items():
            if isinstance(v, Field):
                print('Found mapping: %s ==> %s' % (k, v))
                mappings[k] = v
        for k in mappings.keys():
            attrs.pop(k)
        attrs['__mappings__'] = mappings # 保存属性和列的映射关系
        attrs['__table__'] = name # 假设表名和类名一致
        return type.__new__(cls, name, bases, attrs)


class Model(dict, metaclass=ModelMetaclass):

    def __init__(self, **kw):
        super(Model, self).__init__(**kw)

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Model' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value

    def save(self):
        fields = []
        params = []
        args = []
        for k, v in self.__mappings__.items():
            fields.append(v.name)
            params.append('?')
            args.append(getattr(self, k, None))
        sql = 'insert into %s (%s) values (%s)' % (self.__table__, ','.join(fields), ','.join(params))
        print('SQL: %s' % sql)
        print('ARGS: %s' % str(args))
```

当用户定义一个class User(Model)时，Python解释器首先在当前类User的定义中查找metaclass，如果没有找到，
就继续在父类Model中查找metaclass，找到了，就使用Model中定义的metaclass的ModelMetaclass来创建User类，
也就是说，metaclass可以隐式地继承到子类，但子类自己却感觉不到。

## 9. 错误,调试和测试
### 错误处理

```py
def f(a):
    try:
        print('try')
        r = 10/a
        print(f'result:{r}')
    except ZeroDivisionError as e:
        print('except:', e)
    finally:
        print('finally...')
    print('End')

>>> f(1)
try
result:10.0
finally...
End
>>> f(0)
try
except: division by zero
finally...
End
```
对比一下:
```javascript
try{
    // ...
}catch(e){
    console.log(e)
}
```

```
try_stmt  ::=  try1_stmt | try2_stmt
try1_stmt ::=  "try" ":" suite
               ("except" [expression ["as" identifier]] ":" suite)+
               ["else" ":" suite]
               ["finally" ":" suite]
try2_stmt ::=  "try" ":" suite
               "finally" ":" suite
```
as 后的变量,仅在那个except子句作用域中有效.
```
raise_stmt ::=  "raise" [expression ["from" expression]]
```
- 如果没有表达式,则抛出当前作用域的活跃异常; 如果没有活跃异常,则抛出 RuntimeError
- 否则,表达式的值必须是 BaseException 的实例或子类;如果是子类,则以无参方式新建实例抛出, 如果是实例,则直接抛出
- 如果有from,后面的那个,同表达式求值结果,得到另一个异常实例,并放入前者的 __cause__属性.

### 调试
print语句,断言,日志,调试器

凡是用print()来辅助查看的地方，都可以用断言（assert）来替代：
如果断言失败，assert语句本身就会抛出AssertionError
```py

def foo(s):
    n = int(s)
    assert n != 0, 'n is zero!'
    return 10 / n

def main():
    foo('0')

```
启动Python解释器时可以用-O参数来关闭assert：
关闭后，你可以把所有的assert语句当成pass来看。

### 单元测试

单元测试是用来对一个模块、一个函数或者一个类来进行正确性检验的测试工作。

单元测试通过后有什么意义呢？如果我们对abs()函数代码做了修改，只需要再跑一遍单元测试，如果通过，
说明我们的修改不会对abs()函数原有的行为造成影响，如果测试不通过，说明我们的修改与原有行为不一致，要么修改代码，要么修改测试。

这种以测试为驱动的开发模式最大的好处就是确保一个程序模块的行为符合我们设计的测试用例。
在将来修改的时候，可以极大程度地保证该模块行为仍然是正确的。

编写单元测试时，我们需要编写一个测试类，从unittest.TestCase继承。
以test开头的方法就是测试方法，不以test开头的方法不被认为是测试方法。
对每一类测试都需要编写一个test_xxx()方法。
unittest.TestCase提供了很多内置的条件判断，我们只需要调用这些方法就可以断言输出是否是我们所期望的。
最常用的断言就是assertEqual()：`self.assertEqual(abs(-1), 1) # 断言函数返回的结果与1相等`
另一种重要的断言就是期待抛出指定类型的Error，比如通过d['empty']访问不存在的key时，断言会抛出KeyError：
```py
with self.assertRaises(KeyError):
    value = d['empty']
```

运行单元测试
一旦编写好单元测试，我们就可以运行单元测试。最简单的运行方式是在mydict_test.py的最后加上两行代码：
````py
if __name__=='__main__':
    unittest.main()
````
这样就可以把mydict_test.py当做正常的python脚本运行：`$ python mydict_test.py`
另一种方法是在命令行通过参数-m unittest直接运行单元测试：

```sh
$ python -m unittest mydict_test
.....
----------------------------------------------------------------------
Ran 5 tests in 0.000s

OK
```
这是推荐的做法，因为这样可以一次批量运行很多单元测试.


setUp与tearDown
可以在单元测试中编写两个特殊的setUp()和tearDown()方法。这两个方法会分别在每调用一个测试方法的前后分别被执行。


单元测试可以有效地测试某个程序模块的行为，是未来重构代码的信心保证。

单元测试的测试用例要覆盖常用的输入组合、边界条件和异常。

单元测试代码要非常简单，如果测试代码太复杂，那么测试代码本身就可能有bug。

单元测试通过了并不意味着程序就没有bug了，但是不通过程序肯定有bug。

## 12. 正则表达式

match()方法判断是否匹配，如果匹配成功，返回一个Match对象，否则返回None。常见的判断方法就是：
```py
test = '用户输入的字符串'
if re.match(r'正则表达式', test):
    print('ok')
else:
    print('failed')
```
切分字符串
```py
>>> re.split(r'[\s\,]+', 'a,b, c  d')
['a', 'b', 'c', 'd']
```

子串搜索
```py
>>> m = re.match(r'^(\d{3})-(\d{3,8})$', '010-12345')
>>> m
<_sre.SRE_Match object; span=(0, 9), match='010-12345'>
>>> m.group(0)
'010-12345'
>>> m.group(1)
'010'
>>> m.group(2)
'12345'
```

## 13. 常用内建模块

### datetime

```py
# 获取当前日期和时间
>>> from datetime import datetime
>>> now = datetime.now() # 获取当前datetime
>>> print(now)
2015-05-18 16:28:07.198690
>>> print(type(now))
<class 'datetime.datetime'>
# 获取指定日期和时间
# ps：python的datetime的年月日时分秒就是实际的年月日时分秒，没有偏差。pps：C、Javacript的日期时间，年和月都有偏差，比如，用 0~11 代表1~12月
>>> from datetime import datetime
>>> dt = datetime(2015, 4, 19, 12, 20) # 用指定日期时间创建datetime
>>> print(dt)
2015-04-19 12:20:00

# 转换为时间戳(timestamp)
>>> import datetime
>>> dt = datetime.datetime(2020, 2,2)
>>> dt.timestamp()
1580572800.0
# ps:是自epoch（1970-01-01 00:00:00Z以来的秒数，是一个浮点数。

# 时间戳出转换为秒数
>>> d = datetime.datetime.fromtimestamp(1580572800.0)   # 默认转换为本地时间
>>> d
datetime.datetime(2020, 2, 2, 0, 0) # 注意解析得到的datetime是没有时区信息的。
>>> datetime.datetime.utcfromtimestamp(1580572800.0)    # 转换为utc时区的时间
datetime.datetime(2020, 2, 1, 16, 0)

##############################

# 格式化与解析
>>> datetime.datetime.strptime('2020-06-01T00:00:00', "%Y-%m-%dT%H:%M:%S")
datetime.datetime(2020, 6, 1, 0, 0)
>>> d.strftime('%Y-%m-%d %H:%M:%S')
'2020-06-06 23:49:30'
```
#### datetime加减
日期相减得到datetime.timedelta对象。
```py
>>> import datetime
>>> d1 = datetime.datetime(2020,2,3)
>>> d2 = datetime.datetime(2020,2,4)
>>> d2 - d1
datetime.timedelta(days=1)

>>> d1 + datetime.timedelta(hours=2)
datetime.datetime(2020, 2, 3, 2, 0)
```
#### 时区
除非显式指定时区，否则没有时区，此时日期的具体解释由程序自身决定。

```py
# 设置时区
>>> from datetime import datetime,timedelta,timezone
>>> tz_8 = timezone(timedelta(hours=8))
>>> n = datetime.now()
>>> dt = n.replace(tzinfo=tz_8)
>>> dt
datetime.datetime(2020, 6, 7, 0, 14, 33, 970830, tzinfo=datetime.timezone(datetime.timedelta(seconds=28800)))

# 承上，将时间北京时间转换为东京时间。ps：要点在于，给有时区的时间设置另一个时区。
>>> tz_tokyo = timezone(timedelta(hours=9))
>>> tokyo_dt = dt.astimezone(tz_tokyo)
>>> tokyo_dt
datetime.datetime(2020, 6, 7, 1, 14, 33, 970830, tzinfo=datetime.timezone(datetime.timedelta(seconds=32400)))
```

datetime和date都有：
```py
weekday() # -- 1~7
fromisoformat(str)
isoformat()
```
### struct
准确地讲，Python没有专门处理字节的数据类型。但由于b'str'可以表示字节，所以，字节数组＝二进制str。

在C语言中，我们可以很方便地用struct、union来处理字节，以及字节和int，float的转换。

Python提供了一个struct模块来解决bytes和其他二进制数据类型的转换。

struct的pack函数把任意数据类型变成bytes：
```py
>>> import struct
>>> struct.pack('>I', 10240099)
b'\x00\x9c@c'
```
pack的第一个参数是处理指令，'>I'的意思是：

`>表示字节顺序是big-endian，也就是网络序，I表示4字节无符号整数。`

后面的参数个数要和处理指令一致。

unpack把bytes变成相应的数据类型：
```py
>>> struct.unpack('>IH', b'\xf0\xf0\xf0\xf0\x80\x80')
(4042322160, 32896)
```
根据>IH的说明，后面的bytes依次变为I：4字节无符号整数和H：2字节无符号整数。

## 网络编程

### TCP编程

```py

import socket

def client_demo():
    # 创建一个基于IPv4和TCP协议的Socket
    # AF_INET指定使用IPv4协议
    # SOCK_STREAM指定使用面向流的TCP协议
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(('localhost', 80))
    s.send(b'GET / HTTP/1.1\r\nHOST: localhost\r\nConnection: close\r\n\r\n');

    # 接受数据
    buffer = []
    while True:
        # 每次最多接受 1024 字节
        print('.')
        d = s.recv(1024);
        if d:
            buffer.append(d);
        else: break
    data = b''.join(buffer)
    # 关闭socket。一次完整的网络通信就结束了
    s.close()

    # 接收到的数据包括HTTP头和网页本身
    # 把HTTP头和网页分离一下，把HTTP头打印出来，网页内容保存到文件
    header, html = data.split(b'\n\n', 1);
    print(header.decode('utf-8'));
    with open('sina.html', 'wb') as f:
        f.write(html);
```
```py
# 服务端
def server_demo():
    import time, threading
    r'''
    一个简单的服务器程序，它接收客户端连接，把客户端发过来的字符串加上Hello再发回去
    '''
    # 创建一个基于IPv4和TCP协议的Socket
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM);
    # 要绑定监听的地址和端口
    s.bind(('127.0.0.1', 8081));
    # 传入的参数指定等待连接的最大数量
    s.listen(5);
    print('Waiting for connection...')

    def tcplink(s, addr):
        print('accept connection from ', addr);
        s.send('Welcome'.encode());
        buf = []
        while True:
            data = s.recv(1024);
            if not data or data.decode() == 'exit': break
            buf.append(data);

        s.send('Hello,'.encode() + b''.join(buf));
        s.close();
        print(f'connection from {addr} closed.');

    while True:
        sock, addr = s.accept();
        t = threading.Thread(target = tcplink, args=(sock, addr))
        t.start()

server_demo();
```
需要专门的客户端测试服务端程序。
```py
import socket

s = socket.socket();
s.connect(('127.0.0.1',8081))
print(s.recv(1024).decode());

for d in ['Tom', 'Jack', 'Tim']:
    s.send(d.encode())
s.send('exit'.encode());
print(s.recv(1024).decode())
```

new -> connect(addr) -> send(dt), recv(sz)

new -> bind() -> listen() -> accept(), recv(sz), send(dt)

new -> connect(addr) -> send(dt), recv(sz)
### UDP 编程

```py
import socket
# socket.SOCK_DGRAM 指定udp协议
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM);
# 绑定网卡和端口
s.bind(('127.0.0.1', 1248))
# UDP编程，无需监听，直接接受任意客户端的数据即可
while True:
    # recvfrom 返回数据和客户端地址
    data, addr = s.recvfrom(1024);
    print('Receive data from %s: %s' %(addr, data.decode()))
    s.sendto(f'Hello, '.encode() + data, addr)

```

```py
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM);

s.sendto(b'Tom',('127.0.0.1', 1248));
print(s.recv(100).decode())
```

new -> bind -> receivefrom(bufsz), sendto(data, addr)

new -> sendto(data, addr), recv(bufsz)


## 19. 访问数据库
https://www.python.org/dev/peps/pep-0249/
PEP 249 -- Python Database API Specification v2.0
https://www.liaoxuefeng.com/wiki/1016959663602400/1017801397501728

为了便于程序保存和读取数据，而且，能直接通过条件快速查询到指定的数据，就出现了数据库（Database）这种专门用于集中存储和查询的软件。
数据库软件诞生的历史非常久远，早在1950年数据库就诞生了。经历了网状数据库，层次数据库，
**我们现在广泛使用的关系数据库**是20世纪70年代基于关系模型的基础上诞生的。


sqlite，嵌入式数据库，适合桌面和移动应用。
MySQL，大家都在用，一般错不了.

作为Python开发工程师，选择哪个免费数据库呢？当然是MySQL。因为MySQL普及率最高，出了错，可以很容易找到解决方法。
而且，围绕MySQL有一大堆监控和运维的工具，安装和使用很方便。

先要搞清楚几个概念：

- 表是数据库中存放关系数据的集合，一个数据库里面通常都包含多个表，比如学生的表，班级的表，学校的表，等等。表和表之间通过外键关联。
- 要操作关系数据库，首先需要连接到数据库，一个数据库连接称为Connection；
- 连接到数据库后，需要打开游标，称之为Cursor，通过Cursor执行SQL语句，然后，获得执行结果。

Python定义了一套操作数据库的API接口，任何数据库要连接到Python，只需要提供符合Python标准的数据库驱动即可。
这个API接口叫[PEP 249 -- Python Database API Specification v2.0](https://www.python.org/dev/peps/pep-0249/)

### 使用SQLLite
SQLite是一种嵌入式数据库，它的数据库就是一个文件。SQLite本身是C写的，体积很小. Python就内置了SQLite3.

```py
# 导入SQLite驱动:
>>> import sqlite3
# 连接到SQLite数据库
# 数据库文件是test.db
# 如果文件不存在，会自动在当前目录创建:
>>> conn = sqlite3.connect('test.db')
# 创建一个Cursor:
>>> cursor = conn.cursor()
# 执行一条SQL语句，创建user表:
>>> cursor.execute('create table user (id varchar(20) primary key, name varchar(20))')
<sqlite3.Cursor object at 0x10f8aa260>
# 继续执行一条SQL语句，插入一条记录:
>>> cursor.execute('insert into user (id, name) values (\'1\', \'Michael\')')
<sqlite3.Cursor object at 0x10f8aa260>
# 通过rowcount获得插入的行数:
>>> cursor.rowcount
1
# 关闭Cursor:
>>> cursor.close()
# 提交事务:
>>> conn.commit()
# 关闭Connection:
>>> conn.close()
```

我们再试试查询记录：
```py
>>> conn = sqlite3.connect('test.db')
>>> cursor = conn.cursor()
# 执行查询语句:
>>> cursor.execute('select * from user where id=?', ('1',))
<sqlite3.Cursor object at 0x10f8aa340>
# 获得查询结果集:
>>> values = cursor.fetchall()
>>> values
[('1', 'Michael')]
>>> cursor.close()
>>> conn.close()
```

### 使用MySQL

安装 mysql-connector/python
```sh
$ pip install mysql-connector-python
```

```py
# 导入MySQL驱动:
>>> import mysql.connector
# 注意把password设为你的root口令:
>>> conn = mysql.connector.connect(user='root', password='password', database='test')
>>> cursor = conn.cursor()
# 创建user表:
>>> cursor.execute('create table user (id varchar(20) primary key, name varchar(20))')
# 插入一行记录，注意MySQL的占位符是%s:
>>> cursor.execute('insert into user (id, name) values (%s, %s)', ['1', 'Michael'])
>>> cursor.rowcount
1
# 提交事务:
>>> conn.commit()
>>> cursor.close()
# 运行查询:
>>> cursor = conn.cursor()
>>> cursor.execute('select * from user where id = %s', ('1',))
>>> values = cursor.fetchall()
>>> values
[('1', 'Michael')]
# 关闭Cursor和Connection:
>>> cursor.close()
True
>>> conn.close()

```

### 使用SQLAlchemy
数据库表是一个二维表,Python的DB-API返回的数据结构类似下面这样, 一个list表示多行，list的每一个元素是tuple，表示一行记录
```py
[
    ('1', 'Michael'),
    ('2', 'Bob'),
    ('3', 'Adam')
]
```
但是用tuple表示一行很难看出表的结构。如果把一个tuple用class实例来表示，就可以更容易地看出表的结构来.
这就是传说中的ORM技术：Object-Relational Mapping，把关系数据库的表结构映射到对象上。
但是由谁来做这个转换呢？所以ORM框架应运而生。
在Python中，最有名的ORM框架是SQLAlchemy。
### MySQL驱动和Python DB API 规范


# Python数据库连接规范(DB API)
[Python Database API Specification v2.0 (PEP 249)](http://www.python.org/dev/peps/pep-0249/)
## 总结笔记
1. conect(parameters) 方法建立数据库连接，返回 Connection 对象代表建立的连接。
2. Connection 对象的方法
    close()     手动关闭连接。（默认，对象销毁时自动关闭连接）
    commit()    提交事务。
    rollback()  回滚事务。
    cursor()    返回 Cursor 对象。ps：如果对应的数据库没有cursor的概念，则连接驱动需要模拟实现这个东西。

    注：关闭连接之后，调用 commit(), rollback(), cursor() 会抛出 mysql.connector.OptionError

3. Cursor 对象
    .description        含七项属性对象构成的列表，每个对象对应结果集的一个列，属性 name,type_code,dispaly_size, internal_size,precision,scale, null_ok
                        只有前两项是必须的，剩余5个是可选的
                此属性会是None，如果 a. 还没有调用过 execute*()方法；或 b. 上一条sql没有返回结果（比如update语句）
    .rowcount   上一次调用execute*()方法执行的sql，它产生的数据集的行数（DQL如select）或它影响的行数（DML如update，delete，insert）。

    callproc(procname [,parameters])
    close()
    execute(operation[,parameters])     预备并执行数据库操作（查询语句或命令)
    executemany(operation,seq_of_parameters)

    fetchone()  获取下一行数据（一个序列（sequence）），或者返回None，如果没有下一行.
    fetchmany(size=cursor.arraysize)    返回结果集中的下一批数据（a list of tuple），没有更多数据的时候返回空list。
    fetchall()
                这三个方法都抛出Error，如果之前没有结果集。
                > An Error (or subclass) exception is raised if the previous call to .execute*() did not produce any
                result set or no call was issued yet.

    .arraysize  可读写，默认为1. 指定 fetchmany默认一次拉取的数据的行数，默认为1.

    .nextset()  （可选）返回下一个数据集。
    .setinputsizes(sizes)，.setoutputsize(size [, column]) 在execute*()之前调用。指定输入参数/输出结果的数据格式，可以提高性能。
    .setoutputsize(size [, column])
4. 类型对象

    Date(year, month, day)
    Time(hour, minute, second)
    Timestamp(year, month, day, hour, minute, second)
    Binary(string)
    STRING type
    BINARY type
    NUMBER type
    DATETIME type
    ROWID type
    SQL NULL values are represented by the Python None singleton on input and output.


A Cursor Object's description attribute returns information about each of the result columns of a query. The type_code must compare equal to one of Type Objects defined below. Type Objects may be equal to more than one type code (e.g. DATETIME could be equal to the type codes for date, time and timestamp columns; see the Implementation Hints below for details).

## 简介
为了促进数据库访问模块之间的一致性，制定本API。

关于更多python数据库访问接口与模块的信息参见[Database Topic Guide.](http://www.python.org/topics/database/)
此为python数据库规范2.0版本。定义了一系列必选和可选接口。

## 模块接口
### 构造器（必选）

Access to the database is made available through connection objects.
The module must provide the following constructor for these:

- connect( parameters... )
用于创建数据库连接的构造函数，返回 Connection 对象实例。参数取决于具体数据库。

Constructor for creating a connection to the database.

Returns a Connection Object. It takes a number of parameters which are database dependent. [1]
### 全局（必选）
- apilevel：String constant stating the supported DB API level.
  Currently only the strings "1.0" and "2.0" are allowed. If not given, a DB-API 1.0 level interface should be assumed.
  字符串常量，表明当前实现的是哪个版本的API。如果省略，默认视为1.0
- threadsafety 线程安全级别。整数。0~3，数值越大，共享程度越大。

    0	Threads may not share the module.
    1	Threads may share the module, but not connections.
    2	Threads may share the module and connections.
    3	Threads may share the module, connections and cursors.

- paramstyle  占位符参数的格式。字符串。

    qmark	    Question mark style, e.g. ...WHERE name=?
    numeric 	Numeric, positional style, e.g. ...WHERE name=:1
    named	    Named style, e.g. ...WHERE name=:name
    format	    ANSI C printf format codes, e.g. ...WHERE name=%s
    pyformat	Python extended format codes, e.g. ...WHERE name=%(name)s

  注：实现应优先使用 numeric, named 或 pyformat
### 异常
所有错误信息都封装成下述异常类或其子类实例。
重点关注 Warning，InterfaceError，DatabaseError
```
StandardError
|__Warning
|__Error
   |__InterfaceError
   |__DatabaseError
      |__DataError
      |__OperationalError
      |__IntegrityError
      |__InternalError
      |__ProgrammingError
      |__NotSupportedError
```

- Warning

Exception raised for important warnings like data truncations while inserting, etc.
It must be a subclass of the Python StandardError (defined in the module exceptions).

- Error
  Exception that is the base class of all other error exceptions. You can use this to catch all errors with one single
  except statement. Warnings are not considered errors and thus should not use this class as base. It must be a
  subclass of the Python StandardError (defined in the module exceptions).

- InterfaceError: 接口本身相关的错误，与数据库无关。
  Exception raised for errors that are related to the database interface rather than the database itself. It must
  be a subclass of Error.

- DatabaseError：和数据库相关的错误。

  Exception raised for errors that are related to the database. It must be a subclass of Error.

### Connection对象

连接对象负责如下方法：

- close()   关闭连接对象。自此此连接不再可用。后续调用此连接对象的方法或继续使用此连接对象上的cursor对象，都会收到Error（或
  其子类）的异常。关闭连接对象时，如果有未提交之事务，则先自动回滚未提交事务，再关闭对象。
  `__del__()`方法调用时会自动关闭连接。
- commit()  提交当前未提交之事务。如果数据库支持自动提交，则必须关闭自动提交参数（？？）。不支持事务的数据库需将此方法实现为
  空函数。
- rollback()    回滚事务。
- cursor()  返回一个Cursor对象。如果数据库没有cursor的概念，则实现负责模拟Cursor对象之行为。

### Cursor 对象
属性：

- description   只读属性，七元组构成的列表或是None。描述结果集的每一列的属性。如果之前没有操作调用execute*方法或者前一个操作
  不返回结果集，则此属性为None。七个属性只有name和type_code是必须的，其余在无明显意义的前提下可以为None。
  name，type_code，display_size，internal_size，precision，scale，null_ok

- rowcount  只读属性，整数。前一个操作返回或影响到的结果集的行数。或-1如果之前没有操作或无法确定之前操作结果集的行数。
    ```py
    >>> c.rowcount
    -1
    >>> c.execute('select 1 from dual')
    >>> c.rowcount
    -1
    >>> c.fetchall()
    [(1,)]
    >>> c.rowcount
    1
    >>> c.rowcount
    1
    >>> c.execute('select 1 from dual limit 1')
    >>> c.rowcount
    -1
    >>> c.fetchmany()
    [(1,)]
    >>> c.rowcount
    1
    ```
- arraysize     控制 fetchmany() 一次性返回的结果集行数，默认为1. 实现也可以把它用在 executemany() 中。

方法：

- callproc(procname[, param])
  可选方法（因为有的数据库不支持存储过程）。
  调用名为 procname 的存储过程，param提供参数序列，需要和存储过程参数一一对应。
  方法返回输入序列的副本，对于input参数，保持不变，对于output/inout参数，其值为修改后的参数值。
  如果存储过程有结果集，则实现必须通过 fetch*()系列方法返回。

  > The procedure may also provide a result set as output. This must then be made available through the standard
  .fetch*() methods.

- close()   关闭游标。此后用游标操作数据库会得到 Error 异常。
- execute(operation[, parameters]) 预编译并执行数据库操作（查询或命令）。
  paramters 必须是序列或者映射，其元素与 operation 中的占位符参数一一对应。占位符的格式按 paramstyle 的来。

  cursor对象会缓存 operation 的引用，如果之后传入同样的 operation，光标对象会重用此操作，以提升效率。在仅仅参数不同的批量
  操作中，这大大提升效率。

  调用 execute 之前使用 setinputsizes() 设置好参数的类型和大小，可以最大程度地优化效率。

  没有定义方法返回值。

- .executemany( operation, seq_of_parameters )
  批量执行，seq_of_parameters中是参数序列。实现可以内部多次调用execute也可以拼装参数，封装为一个整体调用。

  如果批量操作会导致返回多个结果集，实现可以抛出异常或做出其他处理。

  返回值未定义。

- fetchone()    返回结果集的下一行数据，没有更多数据则返回None。压根没有数据则抛出异常。
  > An Error (or subclass) exception is raised if the previous call to .execute*() did not produce any result set or
  no call was issued yet.

- .fetchmany([size=cursor.arraysize]) 返回下一批数据行，或者是空列表。最多包含 size 行数据。
  > An Error (or subclass) exception is raised if the previous call to .execute*() did not produce any result set or
  no call was issued yet.

- .fetchall()   返回剩余所有行。

- nextset()     忽略当前结果集，转到下一个结果集的开头。可选方法，因为有的数据库不支持多结果集。
- .setinputsizes(sizes) 可优化效率

  > This can be used before a call to .execute*() to predefine memory areas for the operation's parameters.

  https://www.python.org/dev/peps/pep-0249/#setinputsizes

- .setoutputsize(size [, column])

  https://www.python.org/dev/peps/pep-0249/#setoutputsize

### 类型对象和构造器

许多数据库要求sql中不同类型的的输入参数具有特定的格式，比如MySQL的日期类型必须是符合特定格式的字符串。
这在python中导致一些问题，因为execute*()方法的参数都是无类型的。
为克服此问题，实现必须提供如下类型的对象用于保存特定sql输入类型，当cursor方法检测到这些类型的参数时可以做出正确的转换。

Cursor对象的description属性，每个列属性的type_code必须等于某个类型对象。一个类型对象可以同时与多个type_code相等（比如DATETIME
对象可以同时与date、time、timestamp相等）。
```
Date(year, month, day)
Time(hour, minute, second)
Timestamp(year, month, day, hour, minute, second)
Date/Time/TimestampFromTicks(ticks)
Binary(string): This function constructs an object capable of holding a binary (long) string value.
STRING type:    This type object is used to describe columns in a database that are string-based (e.g. CHAR).
BINARY type:    This type object is used to describe (long) binary columns in a database (e.g. LONG, RAW, BLOBs).
NUMBER type:    This type object is used to describe numeric columns in a database.
DATETIME type： This type object is used to describe date/time columns in a database.
ROWID type：    This type object is used to describe the "Row ID" column in a database.
SQL NULL values are represented by the Python None singleton on input and output.
```

### 可选接口
有不少，比如迭代器协议 `Cursor.__iter__()`
# MySQL 的Python连接库

https://dev.mysql.com/doc/connector-python/en/
连接MySQL 服务 5.6,5.7,9.0 服务, 强推 MySQL Connector/Python 8.0 版本.
[示例数据库-Employees DB on GitHub](https://github.com/datacharmer/test_db)

[7.1 Connector/Python Connection Arguments](https://dev.mysql.com/doc/connector-python/en/connector-python-connectargs.html)

## 1. 简介
MySQL Connector/Python 8.0 是Python程序连接MySQL服务器的驱动程序，它兼容规范：[Python Database API Specification v2.0 (PEP 249)]
(http://www.python.org/dev/peps/pep-0249/)
特性：
1. 支持 MySQL 8.0 及之下的各版本
2. 支持在 Python 和 MySQL 的数据类型之间转换。比如默认自动在 MySQL的 DATETIME和python的datetime之间转换，可配置关闭此行为以做优化
3. 支持SSL加密；自包含，即不需要依赖任何标准库之外的Python模块；支持标准SQl语法以及所有的MySQL扩展。

## 2. 指导原则

1. 不要把连接数据库所需要的参数硬编码到代码中。python有使用config.py保存配置信息的习惯。
2. 考虑存库空间和磁盘IO优化非常有必要
3. 任何接受输入的程序都必须处理非预期输入。包括无意输入的非法值和恶意输入的sql注入数据。
4. sql查询的结果可能非常大，所以要用合适的方法获取数据：fetchone()取出一行结果，预先知道查询结果只有一行时使用它；fetchall()一次性
    获取所有结果，当预先知道结果集是有限大小的时候可以使用它；当不知道结果集的大小时，fetchmany()是通用的方法。
5. Python 提供了 pickle、cpickle之类的模块，实现简单的数据持久化功能；所以需要用到MySQL做持久化存储的数据，一般会有这些特征：
    - 数据量特别大，内存放不下
    - 数据结构特复杂，
    - 更新频繁，甚至有并发访问的需求
6. 遵循 MySQL 最佳实践对应用程序的性能亦有极大好处，当数据规模剧增之后无需重写或重构应用程序。
7. 掌握好 SQL 语法，可以避免重复构造轮子--许多功能可以用sql实现
8. sql一般好多行，还经常包含单引号，所以在python中，用 triple-quoting 字符常量书写sql会很合适

## 3. 版本对应一览表

https://dev.mysql.com/doc/connector-python/en/connector-python-versions.html

Table 3.1 Connector/Python Version Reference

|Connector/Python Version | 	MySQL Server Versions |	Python Versions       | Connector Status
|-|-|-|-|
|8.0                      | 8.0, 5.7, 5.6, 5.5      | 3.9, 3.8, 3.7, 3.6, (2.7 and 3.5 before 8.0.24) |General Availability
|2.2 (continues as 8.0) 	| 5.7, 5.6, 5.5 	        | 3.5, 3.4, 2.7 	    |Developer Milestone, No releases
|2.1 	                    | 5.7, 5.6, 5.5 	        | 3.5, 3.4, 2.7, 2.6 	| General Availability
|2.0 	                    | 5.7, 5.6, 5.5 	        | 3.5, 3.4, 2.7, 2.6 	| GA, final release on 2016-10-26
|1.2 	                    | 5.7, 5.6, 5.5 (5.1, 5.0, 4.1) | 3.4, 3.3, 3.2, 3.1, 2.7, 2.6 |GA, final release on 2014-08-22
## 4. 安装
下载源码，下载安装包，各种方式。还可以用 pip 安装。
```cmd
pip install mysql-connector-python
```

## 5. 实例代码
### 5.1 连接数据库

```py
import mysql.connector

cnx = mysql.connector.connect(user='scott', password='password',
                              host='127.0.0.1',
                              database='employees')
cnx.close()
```

也可以直接使用 connection.MySQLConnection 类建立连接。
```py
from mysql.connector import (connection)

cnx = connection.MySQLConnection(user='scott', password='password',
                                 host='127.0.0.1',
                                 database='employees')
cnx.close()
```
这两种发方式完全等价，但建议使用  connect() 方法建立连接。
连接参数在第七章有详细说明。


字典+双星号格式传入连接参数。
```py
import mysql.connector

config = {
  'user': 'scott',
  'password': 'password',
  'host': '127.0.0.1',
  'database': 'employees',
  'raise_on_warnings': True
}

cnx = mysql.connector.connect(**config)

cnx.close()
```
错误处理: errors.Error类
```py
import mysql.connector
from mysql.connector import errorcode

try:
  cnx = mysql.connector.connect(user='scott',
                                database='employ')
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
else:
  cnx.close()
```

C扩展：有两种实现，纯Python实现和C扩展实现。use_pure参数控制优先使用的实现。
自MySQL8，此参数默认为False，表示优先使用C扩展，当C扩展不可用时，使用纯python实现。

```py
import mysql.connector

cnx = mysql.connector.connect(user='scott', password='password',
                              host='127.0.0.1',
                              database='employees',
                              use_pure=False)
cnx.close()
```
### 5.2 新建表
[示例数据库-Employees DB on GitHub](https://github.com/datacharmer/test_db)
所有的DDL语句（create, alter, drop等）都是通过叫做游标（cursor）的句柄结构实现的。
表是一种生命周期相当长的对象。
```py
import mysql.connector
from mysql.connector import errorcode

DB_NAME = 'employees'

TABLES = {}
TABLES['employees'] = (
    "CREATE TABLE `employees` ("
    "  `emp_no` int(11) NOT NULL AUTO_INCREMENT,"
    "  `birth_date` date NOT NULL,"
    "  `first_name` varchar(14) NOT NULL,"
    "  `last_name` varchar(16) NOT NULL,"
    "  `gender` enum('M','F') NOT NULL,"
    "  `hire_date` date NOT NULL,"
    "  PRIMARY KEY (`emp_no`)"
    ") ENGINE=InnoDB")

TABLES['departments'] = (
    "CREATE TABLE `departments` ("
    "  `dept_no` char(4) NOT NULL,"
    "  `dept_name` varchar(40) NOT NULL,"
    "  PRIMARY KEY (`dept_no`), UNIQUE KEY `dept_name` (`dept_name`)"
    ") ENGINE=InnoDB")

cnx = mysql.connector.connect(user='scott')
cursor = cnx.cursor()

def create_database(cursor):
    try:
        cursor.execute(
            "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
    except mysql.connector.Error as err:
        print("Failed creating database: {}".format(err))
        exit(1)

try:
    cursor.execute("USE {}".format(DB_NAME))
except mysql.connector.Error as err:
    print("Database {} does not exists.".format(DB_NAME))
    if err.errno == errorcode.ER_BAD_DB_ERROR:
        create_database(cursor)
        print("Database {} created successfully.".format(DB_NAME))
        cnx.database = DB_NAME
    else:
        print(err)
        exit(1)

for table_name in TABLES:
    table_description = TABLES[table_name]
    try:
        print("Creating table {}: ".format(table_name), end='')
        cursor.execute(table_description)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
            print("already exists.")
        else:
            print(err.msg)
    else:
        print("OK")

cursor.close()
cnx.close()
```
### 5.3 插入数据
插入、更新数据也是使用游标。
当使用支持事务的存储引擎（如InnoDB），必须在insert/update之后手动提交事务。

场景是：插入一条新员工，明天开始工作，薪水50000.
第二条插入语句依赖于第一条插入语句的主键（primary key）。
**cursor.last_rowid**
```py
from __future__ import print_function
from datetime import date, datetime, timedelta
import mysql.connector

cnx = mysql.connector.connect(user='scott', database='employees')
cursor = cnx.cursor()

tomorrow = datetime.now().date() + timedelta(days=1)

add_employee = ("INSERT INTO employees "
               "(first_name, last_name, hire_date, gender, birth_date) "
               "VALUES (%s, %s, %s, %s, %s)")
add_salary = ("INSERT INTO salaries "
              "(emp_no, salary, from_date, to_date) "
              "VALUES (%(emp_no)s, %(salary)s, %(from_date)s, %(to_date)s)")

data_employee = ('Geert', 'Vanderkelen', tomorrow, 'M', date(1977, 6, 14))

# Insert new employee
cursor.execute(add_employee, data_employee)
emp_no = cursor.lastrowid

# Insert salary information
data_salary = {
  'emp_no': emp_no,
  'salary': 50000,
  'from_date': tomorrow,
  'to_date': date(9999, 1, 1),
}
cursor.execute(add_salary, data_salary)

# Make sure data is committed to the database
cnx.commit()

cursor.close()
cnx.close()
```


### 5.4 查询

**for ... in cursor**

```py
import datetime
import mysql.connector

cnx = mysql.connector.connect(user='scott', database='employees')
cursor = cnx.cursor()

query = ("SELECT first_name, last_name, hire_date FROM employees "
         "WHERE hire_date BETWEEN %s AND %s")

hire_start = datetime.date(1999, 1, 1)
hire_end = datetime.date(1999, 12, 31)

cursor.execute(query, (hire_start, hire_end))

for (first_name, last_name, hire_date) in cursor:
  print("{}, {} was hired on {:%d %b %Y}".format(
    last_name, first_name, hire_date))

cursor.close()
cnx.close()
```

默认，cursor（）方法返回 MySQLCursor 对象。

执行查询之后，服务器准备好了结果集，结果集可包含零行、一行或是一百万行数据，根据数据量的不同，可以在多种处理方式中选择合适的，
示例中使用cursor对象作为迭代器。
## 6. 教程
教程介绍如何使用  MySQL Connector/Python 构建python应用程序和python脚本。
### 6.1 教程：使用缓冲游标为员工增加薪水
场景：准备为2000年入职且仍在公司工作的员工提升15%的薪水，明日生效。
使用缓冲游标迭代选中的员工记录。（A buffered cursor fetches and buffers the rows of a result set after executing a query）
缓冲游标本身可以作为迭代器，所以就不需要新建变量保存查询结果了。

```py
from __future__ import print_function

from decimal import Decimal
from datetime import datetime, date, timedelta

import mysql.connector

# Connect with the MySQL Server
cnx = mysql.connector.connect(user='scott', database='employees')

# Get two buffered cursors
curA = cnx.cursor(buffered=True)
curB = cnx.cursor(buffered=True)

# Query to get employees who joined in a period defined by two dates
query = (
  "SELECT s.emp_no, salary, from_date, to_date FROM employees AS e "
  "LEFT JOIN salaries AS s USING (emp_no) "
  "WHERE to_date = DATE('9999-01-01')"
  "AND e.hire_date BETWEEN DATE(%s) AND DATE(%s)")

# UPDATE and INSERT statements for the old and new salary
update_old_salary = (
  "UPDATE salaries SET to_date = %s "
  "WHERE emp_no = %s AND from_date = %s")
insert_new_salary = (
  "INSERT INTO salaries (emp_no, from_date, to_date, salary) "
  "VALUES (%s, %s, %s, %s)")

# Select the employees getting a raise
curA.execute(query, (date(2000, 1, 1), date(2000, 12, 31)))

# Iterate through the result of curA
for (emp_no, salary, from_date, to_date) in curA:

  # Update the old and insert the new salary
  new_salary = int(round(salary * Decimal('1.15')))
  curB.execute(update_old_salary, (tomorrow, emp_no, from_date))
  curB.execute(insert_new_salary,
               (emp_no, tomorrow, date(9999, 1, 1,), new_salary))

  # Commit the changes
  cnx.commit()

cnx.close()
```
注：这只是示例程序，完成此任务还有别的简单方法。

## 7 建立连接
Connector/Python Connection Establishment
7.1 Connector/Python Connection Arguments
[7.1 Connector/Python Connection Arguments](https://dev.mysql.com/doc/connector-python/en/connector-python-connectargs.html)

### 结果集处理
此驱动程序默认既不缓存也不从服务器预加载结果集，执行完查询之后需要程序自己拉取数据并处理。这样做是为了避免遇到大数据集时耗费内存。
如果预知结果集很小，可以把buffered 设为True，这样执行完查询之后，游标会立即加载所有数据集。这个特性可以单独设置在游标上，也可以设置
在连接对象上。

默认情况下，游标执行完查询之后，不会读取结果集，直到程序拉取结果。如果要自动拉取、忽略结果集，把 consume_results 设为True。
这样一来，查询之后所有结果都被读取。遇到大结果集会比较慢，此时关闭连接然后重新打开效率更高。

buffered	    False	Whether cursor objects fetch the results immediately after executing queries.
consume_results	False	Whether to automatically read result sets.

```py
import mysql.connector

cnx = mysql.connector.connect(host='lcs2', port='3306', user = 'test', password='12345678', database='employees');
cnx2 = mysql.connector.connect(host='lcs2', port='3306', user = 'test', password='12345678', database='employees',
    consume_results=True);
c = cnx.cursor()
c2 = cnx2.cursor()
c3 = cnx.cursor(buffered=True)
sql = 'select * from employees limit 100'

c3.execute(sql)
c.execute(sql)
c2.execute(sql)
```
```sh
G:\pycode\src>py -im test
>>> c3.rowcount
100
>>> c2.rowcount
-1
>>> c3
<mysql.connector.cursor.MySQLCursorBuffered object at 0x000002552DCA02E0>
```

```py
import mysql.connector

cnx = mysql.connector.connect(host='lcs2', port='3306', user = 'test', password='12345678', database='employees');
cnx2 = mysql.connector.connect(host='lcs2', port='3306', user = 'test', password='12345678', database='employees',
    consume_results=True);
c = cnx.cursor()
c2 = cnx2.cursor()
c3 = cnx.cursor(buffered=True)
sql = 'select * from employees limit 100'


c.execute(sql)
c2.execute(sql)
c3.execute(sql)
```
```sh
G:\pycode\src>py -im test
Traceback (most recent call last):
  File "D:\programs\python\v3.8\lib\runpy.py", line 193, in _run_module_as_main
    return _run_code(code, main_globals, None,
  File "D:\programs\python\v3.8\lib\runpy.py", line 86, in _run_code
    exec(code, run_globals)
  File "G:\pycode\src\test.py", line 13, in <module>
    c3.execute(sql)
  File "D:\programs\python\v3.8\lib\site-packages\mysql\connector\cursor.py", line 539, in execute
    self._connection.handle_unread_result()
  File "D:\programs\python\v3.8\lib\site-packages\mysql\connector\connection.py", line 1177, in handle_unread_result
    raise errors.InternalError("Unread result found")
mysql.connector.errors.InternalError: Unread result found
```
connector/python 8 的线程安全级别是1，也就是可共享模块，但不可以共享连接。同一个连接对象至多只能有一个未消耗的结果集（对服务端来说）。
如果有未拉取的数据，则关闭游标或使用游标执行新的查询（任何sql语句）都会导致报错（InternalError: Unread result found）。
对于select语句，必须把服务器端的所有数据拉取完之后才能确定rowcount的值。
设置buffered为True，则查询语句之后游标自动立即从服务器端拉取所有结果，从而可以安全关闭游标、执行新的查询，并且rowcount立即可知的。代价是
大结果集占用内存。

设置 consume_results 为True，可以安全关闭游标、安全执行新查询，但rowcount并没有确定，同时可以正常拉取数据。
所以猜测这是服务器端的特性？但是为什么说遇到大结果集会慢呢？
## 9. 其它
### 9.1 连接池

模块提供简单的来连接池支持。特性如下
- mysql.connector.pooling 模块提供连接池支持
- 连接池打开若干连接，并保证线程安全性。
- 连接池的大小在创建时指定，并创建后不可更改。
- 创建连接池的时候可以给连接池命名，如果省略，则自动生成一个名字。
- 可以从连接池对象或者连接池中的连接对象获取连接池的名字
- 可以创建多个连接池。用途之一比如：不同的连接池对应不同的数据库。
- 当从连接池请求连接对象时，直接返回下一个可用连接，没有使用调度算法。如果没有可用连接，抛出 PoolError。
- 可以重新配置整个连接池的连接参数，自重配置之后的新获取的连接对象参数会生效。单独配置每个
ps：很明显，连接池不是python db api的一部分，它是mysql的扩展。

可以显式或隐式地创建连接池,只要指定至少一个连接池相关地参数即可（pool_name, pool_size, pool_reset_session)：
```py
dbconfig = {
  "database": "test",
  "user":     "joe"
}

cnx = mysql.connector.connect(pool_name = "mypool",
                              pool_size = 3,
                              **dbconfig)
```
pool_size默认是5，最大为pooling.CNX_POOL_MAXSIZE，此值默认32.
之后，使用相同连接池名字调用connect方法，都是从既有连接池中取出连接，同时任何其他参数都被忽略。

```py
# 承上，这三个后续调用都是等价的。
cnx = mysql.connector.connect(pool_name = "mypool", pool_size = 3)
cnx = mysql.connector.connect(pool_name = "mypool", **dbconfig)
cnx = mysql.connector.connect(pool_name = "mypool")
```
指定连接池相关参数获得的是PooledMySQLConnection实例（称为池化连接对象），它和普通的连接对象（MySQLConnection ）基本相同，
区别是：
1. 释放池化连接对象也是调用close()方法，和普通连接一样，但池化连接的close不是真正的关闭连接，而是把它归还到连接池，留待后用。
2. 池化连接对象不能直接用config方法修改配置，只能通过连接池对象本身做修改。
3. 池化连接对象多出来一个 .pool_name 属性


显式创建连接池（直接创建MySQLConnectionPool实例）：
```py
dbconfig = {
  "database": "test",
  "user":     "joe"
}

cnxpool = mysql.connector.pooling.MySQLConnectionPool(pool_name = "mypool",
                                                      pool_size = 3,
                                                      **dbconfig)

# 获取连接
cnx1 = cnxpool.get_connection()
cnx2 = cnxpool.get_connection()

# 显式创建连接池之后，就可以调用连接池对象的 set_config 重新配置连接参数
dbconfig = {
  "database": "performance_schema",
  "user":     "admin",
  "password": "password"
}

cnxpool.set_config(**dbconfig)
```
> Connections requested from the pool after the configuration change use the new parameters. Connections obtained
> before the change remain unaffected, but when they are closed (returned to the pool) are reopened with the new
> parameters before being returned by the pool for subsequent connection requests.

## 10. API

mysql.connector.errors.InternalError: Unread result found

Cursor 的 statement 返回上一次执行的sql，可以拿来调试。

```py
>>> c
<mysql.connector.cursor.MySQLCursor object at 0x0000021C25A5E340>
>>> c.execute('select * from student where id=%s',(12,))
>>> c.fetchall()
[]
>>> c.statement
'select * from student where id=12'
```

当multi为True时，execute方法返回迭代器。（明显，这是MySQL的扩展）
```
cursor.execute(operation, params=None, multi=False)
iterator = cursor.execute(operation, params=None, multi=True)
```
> If multi is set to True, execute() is able to execute multiple statements specified in the operation string.

cursor.executemany(operation, seq_of_params)

调用存储过程使用 callproc(name,param=())
如果用cursor.execute 执行 “call xxx"语句，需要同时打开multi=True。
无论用哪个，调用存储过程，如果有结果集产生，只能用 cursor.stored_result获取。fetch**返回None。
### 10.1 mysql.connector Module
包结构

```
mysql.connector
  errorcode
  errors
  connection
  constants
  conversion
  cursor
  dbapi
  locales
    eng
      client_error
  protocol
  utils
```
> Currently, only the most useful modules, classes, and methods for end users are documented.

#### 10.1.1 mysql.connector.connect() Method
#### 10.1.2 mysql.connector.apilevel Property

threadsafety:Integer constant stating the level of thread safety the interface supports. Possible values are:

```
threadsafety	Meaning
0	Threads may not share the module.
1	Threads may share the module, but not connections.
2	Threads may share the module and connections.
3	Threads may share the module, connections and cursors.
```

给定module，connection，cursor，数值0，1，2，3分别代表可以共享的数目。
1 只能共享 module 一个；2 表示能共享的有 module，connection 两个；
3 则是 module、connection、cursor。

#### 10.1.3 mysql.connector.paramstyle Property
#### 10.1.4 mysql.connector.threadsafety Property
#### 10.1.5 mysql.connector.__version__ Property
#### 10.1.6 mysql.connector.__version_info__ Property
### 10.2 connection.MySQLConnection 类
除了python db api 定义的 close(), rollbak(), commit(), cursor() 之外，mysql的实现还提供更多属性/方法。

charset/collation/connection_id/database/server_host/server_port/sql_mode/time_zone/user
### 10.3 pooling.MySQLConnectionPool Class
### 10.4 pooling.PooledMySQLConnection Class
### 10.5 cursor.MySQLCursor 类
- 连接对象的cursor方法用于获取游标对象。不同的参数可得到不同的游标类实例。
- 构造器：游标也是有构造器的，可以用构造器创建游标，但最好只用连接器的cursor方法。
```py

import mysql.connector

cnx = mysql.connector.connect(database='world')
cursor = cnx.cursor()

# MySQLCursorBuffered
cursor = cnx.cursor(buffered=True)

# MySQLCursorRaw
cursor = cnx.cursor(raw=True)

# MySQLCursorBufferedRaw
cursor = cnx.cursor(raw=True, buffered=True)

# MySQLCursorDict
cursor = cnx.cursor(dictionary=True)

# MySQLCursorBufferedDict
cursor = cnx.cursor(dictionary=True, buffered=True)

# MySQLCursorNamedTuple
cursor = cnx.cursor(named_tuple=True)

# MySQLCursorBufferedNamedTuple
cursor = cnx.cursor(named_tuple=True, buffered=True)

# MySQLCursorPrepared
cursor = cnx.cursor(prepared=True)

```
#### callproc()
`result_args = cursor.callproc(proc_name, args=())`

参数的获取与返回。
自动拉取结果集并保存在  MySQLCursorBuffered 实例中，用 stored_results() 可获取此实例。
ps：这一点和 python db api 不一致。python db api要求是在fetch*（）方法中返回结果集。
    且 python db api 规范中有可选的 next_set 方法，应对多结果集，而 MySQL的实现则直接用 stored_results（）方法。

```sql
CREATE PROCEDURE multiply(IN pFac1 INT, IN pFac2 INT, OUT pProd INT)
BEGIN
  SET pProd := pFac1 * pFac2;
END;
```
```py
>>> args = (5, 6, 0) # 0 is to hold value of the OUT parameter pProd
>>> cursor.callproc('multiply', args)
('5', '6', 30L)
```
#### 10.5.4 execute() 方法

```py
cursor.execute(operation, params=None, multi=False)
iterator = cursor.execute(operation, params=None, multi=True)
```
如果multi为True，则返回一个迭代器。这是多结果集的又一个处理方法。
```py
operation = 'SELECT 1; INSERT INTO t1 VALUES (); SELECT 2'
for result in cursor.execute(operation, multi=True):
  if result.with_rows:
    print("Rows produced by statement '{}':".format(
      result.statement))
    print(result.fetchall())
  else:
    print("Number of rows affected by statement '{}': {}".format(
      result.statement, result.rowcount))

```
#### 10.5.8 MySQLCursor.fetchone()
`row = cursor.fetchone()`

从结果集读取下一行数据，如果没有，则返回None。

fetchmany（）和fetchall()方法使用了fetchone(), 把cursor对象当作迭代对象时，也调用fetchone。

下面这两种方式是等价的：
```py
# Using a while loop
cursor.execute("SELECT * FROM employees")
row = cursor.fetchone()
while row is not None:
  print(row)
  row = cursor.fetchone()

# Using the cursor as iterator
cursor.execute("SELECT * FROM employees")
for row in cursor:
  print(row)
```
#### 10.5.5 MySQLCursor.executemany() 方法
```py
cursor.executemany(operation, seq_of_params)
```
> With the executemany() method, it is not possible to specify multiple statements to execute in the operation argument.
> Doing so raises an InternalError exception. Consider using execute() with multi=True instead.
#### 10.5.10 MySQLCursor.stored_results()
`iterator = cursor.stored_results()`

This method returns a list iterator object that can be used to process result sets produced by a stored procedure
executed using the callproc() method. The result sets remain available until you use the cursor to execute another
operation or call another stored procedure.
```py
>>> cursor.callproc('myproc')
()
>>> for result in cursor.stored_results():
...     print result.fetchall()
...
[(1,)]
[(2,)]
```
#### 10.5.16 with_rows属性

```py
import mysql.connector

cnx = mysql.connector.connect(user='scott', database='test')
cursor = cnx.cursor()
operation = 'SELECT 1; UPDATE t1 SET c1 = 2; SELECT 2'
for result in cursor.execute(operation, multi=True):
  if result.with_rows:
    result.fetchall()
  else:
    print("Number of affected rows: {}".format(result.rowcount))
```

> The with_rows property is useful when it is necessary to determine whether a statement produces a result set and you
need to fetch rows.

这个属性是 MySQL 实现的扩展属性。
这个属性的作用是判定最近一次执行的语句是否产生了结果集。
即使select语句的查询结果为空集，with_rows 也返回True（因为空集也是结果集）。
```py
>>> cursor.with_rows
False
>>> cursor.execute('select 1 from dual limit 0')
>>> cursor.with_rows
True
>>> cursor.fetchone()
>>> c = cnx.cursor(buffered=True)
>>> c.execute('select 1 from dual limit 0')
>>> c.with_rows
True
```
ps: callproc() 和 sotred_results() 是配对的。调用callproc()，无论是否有结果集，with_rows都是False，fetch*都拉不出数据。

```sql
delimiter $$
create procedure employees.test2()
begin
    select *
    from employees
    limit 2;
    select * from employees limit 2 offset 2;
end $$
call test();

```
```py
import mysql.connector
import mysql.connector as a
import mysql.connector.pooling as p

cnx = mysql.connector.connect(host='lcs2', port='3306', user = 'test', password='12345678', database='employees');

c = cnx.cursor()
c.callproc('test2');
```
```sh
G:\pycode\src>py -im test
>>> c.fetchall()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "D:\programs\python\v3.8\lib\site-packages\mysql\connector\cursor.py", line 895, in fetchall
    raise errors.InterfaceError("No result set to fetch from.")
mysql.connector.errors.InterfaceError: No result set to fetch from.
>>> it = c.stored_results()
>>> it.next()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'list_iterator' object has no attribute 'next'
>>> next(it).fetchall()
[(10001, datetime.date(1953, 9, 2), 'Georgi', 'Facello', 'M', datetime.date(1986, 6, 26)), (10002, datetime.date(1964, 6, 2), 'Bezalel', 'Simmel', 'F', datetime.date(1985, 11, 21))]
>>> next(it).fetchall()
[(10003, datetime.date(1959, 12, 3), 'Parto', 'Bamford', 'M', datetime.date(1986, 8, 28)), (10004, datetime.date(1954, 5, 1), 'Chirstian', 'Koblick', 'M', datetime.date(1986, 12, 1))]
>>>
```

Q. 可以用 execute 调用存储过程吗？
Q. mysql的execute多了multi参数，怎么用？

### 10.6 游标子类
Subclasses cursor.MySQLCursor
#### 10.6.1 cursor.MySQLCursorBuffered 类
MySQLCursorBuffered 是 MySQLCursor的子类。当执行完sql语句之后，MySQLCursorBuffered 从服务器拉取所有结果并缓存在客户端。

对于无缓冲游标，执行完一条sql之后，必须确保结果集中的所有行都已读取，才能执行另一条sql，否则回报错 InternalError.
> For queries executed using a buffered cursor, row-fetching methods such as fetchone() return rows from the set of buffered rows.
For nonbuffered cursors, rows are not fetched from the server until a row-fetching method is called. In this case, you
must be sure to fetch all rows of the result set before executing any other statements on the same connection, or an
InternalError (Unread result found) exception will be raised.

MySQLCursorBuffered can be useful in situations where multiple queries, with small result sets, need to be combined or computed with each other.

To create a buffered cursor, use the buffered argument when calling a connection's cursor() method. Alternatively, to make all cursors created from the connection buffered by default, use the buffered connection argument.

```py
import mysql.connector

cnx = mysql.connector.connect()

# Only this particular cursor will buffer results
cursor = cnx.cursor(buffered=True)

# All cursors created from cnx2 will be buffered by default
cnx2 = mysql.connector.connect(buffered=True)
```
#### 10.6.2 cursor.MySQLCursorRaw Class
A MySQLCursorRaw cursor skips the conversion from MySQL data types to Python types when fetching rows. A raw cursor is usually used to get better performance or when you want to do the conversion yourself.

```py
import mysql.connector

cnx = mysql.connector.connect()

# Only this particular cursor will be raw
cursor = cnx.cursor(raw=True)

# All cursors created from cnx2 will be raw by default
cnx2 = mysql.connector.connect(raw=True)

```
#### 10.6.3 cursor.MySQLCursorBufferedRaw Class

#### 10.6.4 cursor.MySQLCursorDict Class
#### 10.6.5 cursor.MySQLCursorBufferedDict Class
#### 10.6.6 cursor.MySQLCursorNamedTuple Class
#### 10.6.7 cursor.MySQLCursorBufferedNamedTuple Class
#### 10.6.8 cursor.MySQLCursorPrepared Class
### 10.7 constants.ClientFlag Class
### 10.8 constants.FieldType Class
### 10.9 constants.SQLMode Class
### 10.10 constants.CharacterSet Class
### 10.11 constants.RefreshOption Class
### 10.12 Errors and Exceptions
## Q.
### Q1. connect() 方法的 buffered 和 consume_result 的区别？

# Python 连接 Oracle 数据库
<https://cx-oracle.readthedocs.io/en/latest/api_manual/module.html#cx_Oracle.connect>
