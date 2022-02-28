# python3 学习笔记
2020年4月25日 chenxizhan new

[python官网](https://www.python.org/)

# 语法
## 基础语法
### 作用域规则
名字解析（4.2.2. Resolution of name）

程序文本中出现的每个名字，其解析自有一套规则。
Python 的 LEGB 规则
```
Local(L): 定义内部函数/类的命名空间
Enclosed(E)；内部闭包函数的名字空间
Global(G): 定义在最上层级的命名空间
Builtin(B): Python内置模块的保留字
```

一个代码块中的名字会从最近的作用域开始查找。（对一个代码块可见的所有作用域的集合称为该代码块的环境）。
如果找不到该名字，则会抛出NameError，并且如果当前是函数作用域且名字是局部变量且是在定义之前引用此变量，则抛出
UnboundLocalError，这个异常时NameError的子类。

PS: 什么是代码块？

```py
nonlocal a
nonlocal a,b,c
global a
global a,b,c
```

变量定义
[4.2. Naming and binding](https://docs.python.org/3/reference/executionmodel.html#naming-and-binding)

名字代表对象，名字是由名字绑定操作引入的。
> Names refer to objects. Names are introduced by name binding operations.

如下程序构造会绑定名字：
PS: 所谓绑定，就是“变量定义”。
- 函数形参、import语句、类定义和函数定义语句
- 一个目标标识符出现在赋值语句的左边、for语句的头、with和except语句中as后面时，也是名字绑定
- `from ... import *`语句把被导入包中所有名字（除了以下划线开头的）绑定到当前模块。注：此语句仅允许在模块级别使用

- 赋值语句可以出现的位置要么是类和函数定义中，要么是模块级别（模块级是顶级代码块）。出现在模块级别的名字绑定就是全局变量，
  出现在代码块中的变量就是局部变量（除非是用nonlocal或global语句），如果代码块中有某个变量未定义而直接使用，它就是这个
  代码块的自由变量。注：所以模块级别的变量，既是局部变量又是全局变量。

### 源文件的编码
python 默认源文件编码是UTF-8的，字符串常量、标识符、注释可以使用任意合法的UTF-8字符。
PS：作为惯例，标准库在标识符中使用ASCII字符，这是任何可移植的代码都应遵循的。

源文件可以使用别的编码方案，只需要在文件的第一行添加字符集说明
```py
# -*- coding: encoding -*-
```
唯一的例外是，如果文件还有Unix Sheban 行，则字符集放在第二行
```py
#!/usr/bin/env python3
# -*- coding: cp1252 -*-
```

根据 PEP-0263，Python 源码的默认编码是 UTF-8，如果源文件不是默认编码，可以在文件的第一行或第二行指定编码。
常见的指定方式：
```py
# 这是直白的 python 方式
#coding=<encoding name>

# 这是流行的编辑器方式（可以同时被python解释器以及流行编辑器识别）
#!/usr/bin/python
# -*- coding: <encoding name> -*-

#!/usr/bin/python
# vim: set fileencoding=<encoding name> :
```
实际上，只要符合正则表达式 `^[ \t\f]*#.*?coding[:=][ \t]*([-_.a-zA-Z0-9]+)` ，就都是有效的。

### if语句：
```py
>>> x = int(input("Please enter an integer: "))
Please enter an integer: 42
>>> if x < 0:
...     x = 0
...     print('Negative changed to zero')
... elif x == 0:
...     print('Zero')
... elif x == 1:
...     print('Single')
... else:
...     print('More')
...
More
```

### for 语句：
```py
>>> # Measure some strings:
... words = ['cat', 'window', 'defenestrate']
>>> for w in words:
...     print(w, len(w))
...
cat 3
window 6
defenestrate 12
```

```
for_stmt ::=  "for" target_list "in" expression_list ":" suite
              ["else" ":" suite]

```
当expressiont_list中的项目耗尽时，for循环结束，此时如果有else语句，则执行else中的语句。

break 语句终止for循环，并跳过else语句；continue提前结束本次循环，从下一次循环开始，或如果没有下一次循环则执行else后结束循环。

ps：逻辑上，把for循环展开，else放在最末尾，break是跳过整个循环（包括else），而continue从下一次循环初继续。

ps: Bash的if和for
```sh
for name [ [ in [ word ... ] ] ; ] do list ; done
if list; then list; [ elif list; then list; ] ... [ else list; ] fi
```

### 函数定义
```py
>>> def fib(n):    # write Fibonacci series up to n
...     """Print a Fibonacci series up to n."""
...     a, b = 0, 1
...     while a < n:
...         print(a, end=' ')
...         a, b = b, a+b
...     print()
...
>>> # Now call the function we just defined:
... fib(2000)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597
```

### 生成式
[Generator Expressions](https://docs.python.org/3/tutorial/classes.html#generator-expressions)
[List Comprehensions](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions)

生成器表达式：`sum(i*i for i in range(10))`
列表生成器：`[x**2 for x in range(10)]`

## 字面值
内置字面值：True，Flase, None, `__debug__`

### 字符串字面值
## 数据类型（标准库视角）
[参考手册-内置数据类型](https://docs.python.org/3/library/stdtypes.html)
标准数据类型：语言规范中定义的，通过内置数据类型表示。
- 原则上有这些内置数据类型：数值、序列、映射、类、实例、异常。内置数据类型是指内建在解析其中的类型。
    > The principal built-in types are numerics, sequences, mappings, classes, instances and exceptions.
- 有些集合类是可变的，这些集合的add/substract等增删改元素的方法是就地修改的，而且这些方法都返回None，不会返回集合本身。（也就是说能链式调用了）。
- 有些操作是所有对象都支持的：相等性测试、真值测试、转为字符串。
> Some collection classes are mutable. The methods that add, subtract, or rearrange their members in place, and don’t
> return a specific item, never return the collection instance itself but None.
>
> Some operations are supported by several object types; in particular, practically all objects can be compared for
> equality, tested for truth value, and converted to a string (with the repr() function or the slightly different str()
> function). The latter function is implicitly used when an object is written by the print() function.

### 真值测试

任何对象都可以进行真值测试，一个对象的真值是true，除非 1. 此对象的类有一个`__bool__`方法，它返回了false，或 2. 此对象有一个 `__len__`方法并返回了 0.
这里给出内置对象中真值为False的值：
1. 常量: None, False
2. 数值中的各种零：0，0.0，0j，Decimal(0), Fractio(0, 1)
3. 空集合：'', (), [], {}, set(), range(0)

运算符和内置函数中，凡是返回 Boolean 结果的，用 True 或 1 表示真，用Flase和0表示假。
重要的例外是and和or运算符，它们直接返回其中一个操作数（而不进行类型转换）。

PS：JS中，只有六个值的真值测试为fasle，其余均为true（包括空集合，也为true）。这六个false值是：false，0，NaN, '', null, undefined,
PS：JS中，&& 和 || 的运算结果也是其中一个操作数，不会进行类型转换。
PS：not 运算符的结果是布尔类型。

### 布尔运算符：and、or、not
1. 布尔运算符and和or 有短路效应
2. not 的优先级要低于非布尔运算符，比如 not a == b 等价于 not (a == b)。
   PS：JS，Java，C中，not的优先级都非常高，为了不引起误会，python中，加上括号吧。
   PS：a == not b 是语法错误。为什么？不为什么，比较一下 a == (not b) 可以正常求值

### 比较
1. 有八个关系运算符，它们具备相同的优先级：< <= > >= == != is   is not
   PS：又是Python别具一格的设定，Java，C，JS中关系运算符是有不同优先级的
2. 比较运算符可以链式使用，比如 x < y < z 等价于 x < y  and y < z, 不同的是前者中 y 只求值一次，相同的是如果 x < y 为 false，
   那么 z 都不会求值。
   PS：别具一格的设定，Java，C，JS中，比较运算符链式调用可不是这个语义。
3. 不同类型的对象，除了数值类型之间，永不相等。所有对象都支持 == 运算符，但对一些对象来说，等价于 is（比如类对象）。
   对象可能支持也可能不支持 > >= < <= 运算符
4. 同一类型的不同对象一般不相等，除非它重载了 `__eq__` 运算符
5. 同类型的不同对象实例或不同类型的对象实例之间，没有大小顺序，除非它们定义了这些方法:`__lt__, __le__, __gt__, __ge__, __eq__, __ne__`.
   注：实际只需定义 `__lt__, __eq__`就足够了
6. is 和 is not 运算符不可被重载，即使它们可施加于任何类型的对象之间，而且保证不会抛出异常
7. in 和 not in 运算符具备相同的优先级，它们适用于这样的对象：1. 是 iterable的，或 2. 实现了 `__contains__` 方法。

### 数值类型：int，float，complex
有三种不同数值类型：整数、浮点数和复数。布尔类型是整数类型的子类型。整数类型是无限精度的，浮点类型一般用C语言的double类型表示，
特定机器上浮点类型的内部表示和精度信息可以从 sys.float_info 中获取。复数由实部和虚部两部分构成，这两部分各自用一个浮点数表示，
复数 z 的实部和虚部分别用 z.real 和 z.imag 得到。标准库定义了附加的数值类型 fraction.Fraction 和 decimal.Decimal 类型，用来
表示高精度浮点数。

数值类型实例有三种来源：数字字面值、返回数值的函数、返回数值的运算符。 无修饰的数字字面值是整数（包括2，8，10，16进制），有
小数点或e的数字字面值是浮点数，有后缀j或J的是虚数（即没有实部的复数），虚实都有的则是复数。

不同数值类型执行数学运算的时候，窄向宽看齐（整数-》浮点数-》复数）；不同类型的数值进行比较的时候则等效于按数值精确比较。

内置函数 int(),foat(),complex() 用于构造对应类型的数值实例。

运算符：+ - * / % 最常规的，各种语言都有。注意，两个整数相除/的结果是浮点数（无论是否可以整除）
// 在 / 的结果上向下取整。
abs(x), int(x), float(x), complex(real, imag): 类型强转
x ** y, pow(x,y) : x 的 y 次幂。

并且实数类型（int，float）支持：math.ceil(x), math.floor(x), math.trunc(x), round(x, n=0)
PS: trunc(x) 是取浮点数x的整数部分。 round(x, n=0),四舍五入。

PS：两个整数取余运算（%）的结果是int；有一个是浮点数，则结果是浮点数：1.5%1 == 0.5
PS: 不同于数学，而同于大多数语言，Phthon定义 0 **0 和 pow(0, 0) 的结果为 1.

整数类型还支持位运算符：& | ^ ~ << >>
Q. 整数，是无限精度的，怎么确定位运算中的二进制位数？

整数类型支持如下函数：
int.bit_length()    返回表示此整数所需的最小二进制位数，不算前导的0和符号位。
                    特别的，0.bit_length() 返回 0
int.to_bytes(length, byteorder, *, signed=False)
    把当前整数转为长度 length 个字节的二进制表示。byteorder 取'big'和'little'之一，big表示最高有效位字节在数组开头，little则把
    最高有效位字节放在结尾。sys.byteorder 可获取本机的字节序。如果 length 个字节容不下当前整数，则抛出 OverflowError;
    如果当前是负数，且signed设为了false，则抛出OverflowError。

    ```py
    (1024).to_bytes(2, byteorder='big')
    b'\x04\x00'
    (1024).to_bytes(10, byteorder='big')
    b'\x00\x00\x00\x00\x00\x00\x00\x00\x04\x00'
    (-1024).to_bytes(10, byteorder='big', signed=True)
    b'\xff\xff\xff\xff\xff\xff\xff\xff\xfc\x00'
    x = 1000
    x.to_bytes((x.bit_length() + 7) // 8, byteorder='little')
    b'\xe8\x03'
    ```
class method: int.from_bytes(bytes, byteorder, *, signed=False)
    bytes必须是 bytes-like object 或这生成 byte 序列的可迭代对象。
int.as_integer_ratio()
PS: 所以喽，Python中的classmethod就相当于 Java 中的静态方法。

float 支持如下方法：
    as_integer_ratio(), is_integer(), hex(), from_hex(s),

数值类型的哈希值：
1. 如果 x == y, 则必须满足 hash(x) == hash(y), （参考 `__hash__`方法).
2. 要搞清楚还比较复杂，略过去。

### Iterator 类型
1. Python 支持容器迭代的概念
2. 容器迭代是基于两个方法实现的，这两个方法允许用户为自定义对象提供迭代支持
3. 序列（sequeces）类型都支持迭代

迭代协议：可迭代协议（`__iter__`方法+约定）+迭代器协议（`__next__, __iter__`)
如果一个对象是可迭代的则它必须部署 `__iter__` 方法，此方法返回针对当前对象的迭代器对象。
一个对象是迭代器对象，当且仅当它：
   1. 同时定义了`__iter__和 __next__`方法，
   2. 其中 `__iter__`方法必须返回迭代器对象自身。（PS：这是为了使得可迭代对象和迭代器对象都能直接用在in和for语句中）
   3. 而`__next__`方法每次调用都返回容器中的下一个值，当到达容器末尾是，抛出StopIteration异常以终止迭代
      迭代器对象的`__next__`方法抛出 StopIteration 后，随后的调用都必须也抛出此异常。

    PS：于是 Python中的迭代器对象一定是可迭代对象。PPS：而JS中则不然，迭代器对象可以不是可迭代对象。

生成器是实现迭代协议的快捷语法。把`__iter__`方法实现为一个生成器。

### Sequence 类型：list，tuple，range
### text sequence：str
[库](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str)
[语法规范](https://docs.python.org/3/reference/lexical_analysis.html#strings)

字符串字面值
```
stringliteral   ::=  [stringprefix](shortstring | longstring)
stringprefix    ::=  "r" | "u" | "R" | "U" | "f" | "F"
                     | "fr" | "Fr" | "fR" | "FR" | "rf" | "rF" | "Rf" | "RF"
shortstring     ::=  "'" shortstringitem* "'" | '"' shortstringitem* '"'
longstring      ::=  "'''" longstringitem* "'''" | '"""' longstringitem* '"""'
shortstringitem ::=  shortstringchar | stringescapeseq
longstringitem  ::=  longstringchar | stringescapeseq
shortstringchar ::=  <any source character except "\" or newline or the quote>
longstringchar  ::=  <any source character except "\">
stringescapeseq ::=  "\" <any source character>
```
byte 字面值
```
bytesliteral   ::=  bytesprefix(shortbytes | longbytes)
bytesprefix    ::=  "b" | "B" | "br" | "Br" | "bR" | "BR" | "rb" | "rB" | "Rb" | "RB"
shortbytes     ::=  "'" shortbytesitem* "'" | '"' shortbytesitem* '"'
longbytes      ::=  "'''" longbytesitem* "'''" | '"""' longbytesitem* '"""'
shortbytesitem ::=  shortbyteschar | bytesescapeseq
longbytesitem  ::=  longbyteschar | bytesescapeseq
shortbyteschar ::=  <any ASCII character except "\" or newline or the quote>
longbyteschar  ::=  <any ASCII character except "\">
bytesescapeseq ::=  "\" <any ASCII character>
```

- 字符串字面值就是单引号或双引号括起的字符序列；三引号括起的字面值允许跨行
- 字符串字面值可以有前缀 r,u,f 不分大小写；r和f可以组合，不分顺序。
- 前缀和引号之间不可以有空白（这一点无法从语法形式化定义中表达）
- 字符串字面值中的 source character 取决于源文件的编码声明（如果没有指定，则默认是UTF-8）。
- str字面值可以省略前缀；byte字面值的必须有前缀b，可选前缀r，不区分大小写
- 反斜杠用来转义特殊值字符（如换行、引号、反斜杠自身）
- str字面值和byte字面值中，前缀r表示此为raw字面值：里面的所有字符都被视为普通字符
- str字面值中的前缀f用于构成“格式化字符串字面值”语法（3.6新增）。f可以和r同时使用，但不可以和b，u同时使用。

### binary sequence：byte，bytearray，memoryview

### Set 类型：set，frozenset
### mapping 类型：dict
1. mapping类型把hashable对象映射到任意类型的对象
   PS：hashable 对象是指：1. 不可变对象 2. 实现了`__hash__和 __eq__`方法, 且保证相等对象的哈希值也相等
   字典的键几乎可以是任意类型（因为不可哈希的对象毕竟是少的），虽然浮点数是可哈西的，但由于其不精确性，用浮点数做键是不明智的。
2. mapping类型是可变类型，目前仅有 dict 这一种内置映射类型。
3. 可以用花括号语法或dict构造函数创建字典对象。
   ```py
   {'jack': 4098, 'sjoerd': 4127}
   {4098: 'jack', 4127: 'sjoerd'}
    class dict(**kwarg)
    class dict(mapping, **kwarg)
    class dict(iterable, **kwarg)
   ```
   对于 iterable 参数，迭代到的每个元素必须是恰好含有两个值的可迭代对象。

   访问字典对象的属性，用方括号语法或方法调用形式。方括号语法对于不存在的key会抛出异常 KeyError。
   字典对象的子类可以定义 `__missing__` 方法，当用方括号语法访问不存在的键时，会调用此方法，并返回或抛出该方法的返回值或异常。
   如果用方括号语法访问了不存在的键且没有定义此方法，则抛出 KeyError 异常。

注：hashable 规律：
- 内置不可变对象一般都是可哈希的。
- 可变容器是不可哈西德
- 不可变容器，只有其元素都是可哈希的时候，才是可哈希的
- 用户自定义类型的对象是可哈希的，它们之间互不相等（哈希值根据id得来）
> Most of Python’s immutable built-in objects are hashable; mutable containers (such as lists or dictionaries) are not;
>  immutable containers (such as tuples and frozensets) are only hashable if their elements are hashable. Objects which
> are instances of user-defined classes are hashable by default. They all compare unequal (except with themselves), and
> their hash value is derived from their id().
### Context Manger
### 其它内置类型：Module，Class，Class Instance，Function，Type, Null, (省略几个）

#### Module类型
module类型唯一的特殊操作是属性访问（attribute access）：m.name 访问模块m的符号表中定义的name符号。模块属性可以被重新赋值。
`__dict__`是所有模块都有的特殊属性，它保存着模块的符号表，修改这个字典的属性会对应修改模块的符号表，但直接对此属性赋值是不行的，
建议不要直接修改这个字典。

内置模块显示类似为`<module 'sys' (built-in)>`, 从外部导入的模块显示类似为`<module 'os' from '/usr/local/lib/pythonX.Y/os.pyc'>`.
#### 函数
函数是通过函数定义定义的。函数上唯一的操作是调用。函数分为用户定义函数和内置函数，它们的操作相同。

#### 方法
(标准库文档-方法)[https://docs.python.org/3/library/stdtypes.html#methods]
[语言规范-标准类型-实例方法](https://docs.python.org/3/reference/datamodel.html#types)
方法是通过属性记号（attribute notation）调用的函数，方法分为两类：内置方法和类实例方法（class instance method）。
而实例方法都是由函数或类方法衍生出的绑定对象。

通过实例访问方法（所谓方法是指定义在类名字空间里的函数）会得到一个绑定类的方法（也叫实例方法）对象。实例方法有两个特殊的只读
属性`__func__`和`__self__`，前者是实现此方法的函数，后者是此方法关联的实例，m(args...) 等价于 `m.__func__(m.__self__, args)`.
PS: 所以把python中的实例方法赋值给别的对象，不会改变方法的this指向；而js则不同，js访问实例方法（其实js无所谓实例方法和普通函数）
并不会得到绑定的方法，它的this随时可变。

> If you access a method (a function defined in a class namespace) through an instance, you get a special object: a
> bound method (also called instance method) object. When called, it will add the self argument to the argument list.
> Bound methods have two special read-only attributes: `m.__self__` is the object on which the method operates, and
> `m.__func__` is the function implementing the method. Calling `m(arg-1, arg-2, ..., arg-n)` is completely equivalent to
> calling `m.__func__(m.__self__, arg-1, arg-2, ..., arg-n)`.

Q.方法和函数的任意属性是怎么回事？ANS. 就是它绑定的底层函数的自带的那些特殊属性呀`__dict__,__module__`等等。
> Like function objects, bound method objects support getting arbitrary attributes. However, since method attributes
> are actually stored on the underlying function object (meth.__func__), setting method attributes on bound methods is
> disallowed. Attempting to set an attribute on a method results in an AttributeError being raised. In order to set a
> method attribute, you need to explicitly set it on the underlying function object

*******
python中区分函数对象和方法对象：函数是function定义的，方法是函数绑定了this和class之后得到的新对象。
方法是一个三元素 （类对象，类的实例对象，函数对象）。
> An instance method object combines a class, a class instance and any callable object (normally a user-defined function).
可以通过属性获得方法的实例和函数，却不能直接获得它的类。
PS：函数是一类；而方法、实例方法、绑定了的方法这三个单词在本小节当做同义词。
PPS: 和实例方法相对的是类方法，类方法相当于Java里的静态方法。

1. 用户定义方法是访问类属性的时候自动创建的，这里要区分两种属性类型：这个属性是用户定义函数或者是类方法。
2. 当通过类实例访问的类属性是用户定义函数时，得到的实例方法对象，`__self__`指向这个实例，而`__func__`指向原来的用户定义函数
3. 当通过类或类实例访问的类属性是类方法时，得到的实例方法对象，`__self__`指向类本身，而`__func__`指向类方法
4. 调用实例方法时，会转化为对底层`__func__`对象的调用: 把`__self__`插入到实参列表的最前面。
   设类C的实例x，调用 x.f(arg) 等价于 C.f(x, arg).
5. 当时实例方法对象 m 衍生自类方法时，`m.__self__` 实际指向类本身，所以此时 x.f(arg)、C.f(arg) 都等价于 f(C, arg).
PS：类方法衍生出的方法对象也叫“实例方法”，并没有特殊的名字，尽管它们对应于Java的静态方法。
PS：类方法是定义类的时候有的分类，和函数/方法的分类不相干。类方法是将来会绑定到类上，非类方法将来会绑定到类的实例上，但二者
    衍生出的方法对象都叫“实例方法”。这一点和Java中的“实例方法、类方法（也叫静态方法）”的含义不同。
PS：Q. 类方法是方法对象还是函数对象？
ANS：类方法仍然是方法对象。所谓的类，它自身也是对象，它也是某个类的实例，所有的类对象都是xxx的实例。
6. 注意，每次从实例对象访问属性的时候都会重新生成一个绑定的方法对象。某些情况下，一种相当有效的优化是用一个局部变量把实例方法
   缓存起来。而且这种转换仅针对用户定义函数属性才会发生，其它可调用对象类型的属性（以及所有不可调用对象属性）是直接获取，不会
   转换的。同样要指出的是，直接定义在实例上的用户定义函数，访问的时候也不会生成绑定对象，绑定对象生成仅发生在当函数是类属性的
   时候。
    ```py
    a = x.f
    b = x.f
    a == b # False
    ```

> User-defined method objects may be created when getting an attribute of a class (perhaps via an instance of that
> class), if that attribute is a user-defined function object or a class method object.

> When an instance method object is created by retrieving a user-defined function object from a class via one of its
> instances, its `__self__` attribute is the instance, and the method object is said to be bound. The new method’s
>  `__func__` attribute is the original function object.

> When an instance method object is created by retrieving a class method object from a class or instance, its
>  `__self__` attribute is the class itself, and its `__func__` attribute is the function object underlying the class method.

> When an instance method object is called, the underlying function (`__func__`) is called, inserting the class instance
> (`__self__`) in front of the argument list. For instance, when C is a class which contains a definition for a function
> f(), and x is an instance of C, calling x.f(1) is equivalent to calling C.f(x, 1).

> When an instance method object is derived from a class method object, the “class instance” stored in `__self__` will
> actually be the class itself, so that calling either x.f(1) or C.f(1) is equivalent to calling f(C,1) where f is the
> underlying function.

> Note that the transformation from function object to instance method object happens each time the attribute is
> retrieved from the instance. In some cases, a fruitful optimization is to assign the attribute to a local variable
> and call that local variable. Also notice that this transformation only happens for user-defined functions; other
> callable objects (and all non-callable objects) are retrieved without transformation. It is also important to note
> that user-defined functions which are attributes of a class instance are not converted to bound methods; this only
> happens when the function is an attribute of the class.

## 标准类型（语言规范视角）
[语言规范](https://docs.python.org/3/reference/datamodel.html#types)
从语言规范的角度看各种类型。

### 可调用类型
- 即用户定义函数
- 实例方法
- 生成器
- 协程
- 异步生成器
- 内置函数
- 内置方法
- 类：类都是可调用的，调用类会得到类实例。调用类实际是对类对象上 `__new__`和 `__init__` 方法的调用，前者新建实例，
  后者初始化实例。用户可以覆写这两和方法定制类初始化行为。
- 类实例：如果实例所属的类上定义了`__call__`方法，类实例就是可调用的。
### 模块
模块是python代码的基本组织单员。模块是由包导入系统（import system）生成的。包导入系统可通过 1. import 语句 2. 内置函数
`__import__()` 3. 函数调用，如 importlib.import_module() 调用。

每个模块对象有一个名字空间（namesapce），或者叫符号表（symbol table），这个名字空间实现为一个字典，用模块的`__dict__`属性可以
访问到这个字典，模块内定义的函数用`__globals__`名字可以访问到这个字典。模块属性引（Attribute references）用会翻译为
对该字典的查找，如 `m.x ` 等价于 `m.__dict__["x"]`，模块对象不会包含模块自身的初始化代码对象（因为这些代码初始化的时候执行
一遍就再也用不到了）。
Q. 为什么模块内部的`__dict__`属性没有用呢？
对模块名字空间的修改会反应到模块字典上，`m.x = 1`等价于 `m.__dict__["x"] = 1`.

模块的预定义属性：
- `__name__`: 模块名
- `__doc__`: 模块文档. 无文档则为 None
- `__annotations__`: 一个字典, 内容是执行模块体时的变量注解.可选属性.
- `__file__`: 模块对象所在文件的路径. 某些类型的模块(如内置模块)可以没有此属性.
- `__dict__`: 模块的符号表(也叫名字空间), 只读.
> Predefined (writable) attributes: `__name__` is the module’s name; `__doc__` is the module’s documentation string,
> or None if unavailable; `__annotations__` (optional) is a dictionary containing variable annotations collected
> during module body execution; `__file__` is the pathname of the file from which the module was loaded, if it was
> loaded from a file. The `__file__` attribute may be missing for certain types of modules, such as C modules that
>  are statically linked into the interpreter; for extension modules loaded dynamically from a shared library, it is
> the pathname of the shared library file.

> Special read-only attribute: `__dict__` is the module’s namespace as a dictionary object.

- 注:一旦模块退出当前作用域,其字典对象会被清空, 无论是是否有指向此字典的引用,所以...
> CPython implementation detail: Because of the way CPython clears module dictionaries, the module dictionary will be
> cleared when the module falls out of scope even if the dictionary still has live references. To avoid this, copy the
> dictionary or keep the module around while using its dictionary directly.

### 自定义类(Custom classes)
自定义类类型通常由类定义语句创建. 每个类有一个名字空间(或叫符号表), 用字典实现. 类属性引用( Class attribute references)
会被翻译为对此字典的查找过程(注:有一些可自定义此过程的钩子方法), 当找不到属性时, 继续向基类搜索. 在基类搜索时使用C3算法.
PS: python支持多继承,C3算法可以很好的解决多继承中的冲突问题.

> Custom class types are typically created by class definitions (see section Class definitions). A class has a namespace
> implemented by a dictionary object. Class attribute references are translated to lookups in this dictionary, e.g., C.x
> is translated to `C.__dict__["x"]` (although there are a number of hooks which allow for other means of locating
> attributes). When the attribute name is not found there, the attribute search continues in the base classes. This
> search of the base classes uses the C3 method resolution order which behaves correctly even in the presence of ‘diamond’
> inheritance structures where there are multiple inheritance paths leading back to a common ancestor.

当属性引用所得结果是个类方法对象时,它会被转换为实例方法m,m的this指向类本身(而不是类实例);
当属性引用所得结果是静态方法时,它会被转换为一个由此静态方法包装过的对象.??? Q. 类方法和静态方法,哪个对应于Java的静态方法.
> When a class attribute reference (for class C, say) would yield a class method object, it is transformed into an
instance method object whose `__self__` attribute is C. When it would yield a static method object, it is transformed
into the object wrapped by the static method object. See section Implementing Descriptors for another
way in which attributes retrieved from a class may differ from those actually contained in its `__dict__`.


类属性赋值会对应更新其名称空间字典.
> Class attribute assignments update the class’s dictionary, never the dictionary of a base class.

类对象可以调用,这回生成类实例.
> A class object can be called (see above) to yield a class instance (see below).

特殊属性: name,moduel, dict, bases, doc, annotations
> Special attributes: `__name__` is the class name; `__module__` is the module name in which the class was defined;
`__dict__` is the dictionary containing the class’s namespace; `__bases__` is a tuple containing the base classes,
in the order of their occurrence in the base class list; `__doc__` is the class’s documentation string, or None if
undefined; `__annotations__` (optional) is a dictionary containing variable annotations collected during class body
execution.

### 类实例(Class instances)
把类对象当方法, 调用它就会得到类实例, 每个类实例会有一个用字典对象实现的名字空间, 对该实例的属性访问会首先在此字典对象
上搜索. 如果在实例上没有搜索到属性, 而实例所属类上有这个属性,就会到类对象上继续搜索过程, 如果在类上搜到了这个属性, 并发现
它是用户定义函数, 就会把他转化为实例方法对象返回, 并,类方法和静态方法也会被转换(PS:当然转化的方式不一样).
如果在类上也搜不到, 同时类上有 `__getattr__()` 方法,就会调用这个方法继续搜索过程.

A class instance is created by calling a class object (see above). A class instance has a namespace implemented as a
dictionary which is the first place in which attribute references are searched. When an attribute is not found there,
and the instance’s class has an attribute by that name, the search continues with the class attributes. If a class
attribute is found that is a user-defined function object, it is transformed into an instance method object whose
`__self__` attribute is the instance. Static method and class method objects are also transformed; see above under
“Classes”. See section Implementing Descriptors for another way in which attributes of a class retrieved via its
instances may differ from the objects actually stored in the class’s `__dict__`. If no class attribute is found, and the
object’s class has a `__getattr__`() method, that is called to satisfy the lookup.

属性赋值和删除对应于实例字典的更新, 绝对不会更新类字典. 如果类上有 `__setattr__`和 `__delattr__`(),则对应的操作会变成调用
这些方法,而不会直接更新字典.
类实例可以通过实现特殊方法来模拟数值, 序列, 映射.
特殊属性: `__class__` 指向实例的类.

Attribute assignments and deletions update the instance’s dictionary, never a class’s dictionary. If the class has a
`__setattr__`() or `__delattr__`() method, this is called instead of updating the instance dictionary directly.

Class instances can pretend to be numbers, sequences, or mappings if they have methods with certain special names. See
section Special method names.

Special attributes: `__dict__` is the attribute dictionary; `__class__` is the instance’s class.

## 条件表达式

x if C else y，这个是个表达式，执行流程是 if c then x else y
逻辑运算符是单词形式：and，or，not。
ps：java，c，js都是标点符号 && || !
ps: SQL 是单词
ps: shell 中，没有“逻辑运算符”，只有 && || 这样的管道连接和 !。test 命令用 -a, -o, !. [[ 命令用  && || !


比较运算符：> >= < <= == !=         is [not]    [not] in

## 函数
[python tutorial](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)
[python language reference: function definition](https://docs.python.org/3/reference/compound_stmts.html#function-definitions)


1. 函数体的第一条语句可以是字符串常量，此时这个字符串常量将是函数的文档字符串（docstring）。
2. 函数都有返回值，如果没有return语句，则返回 None。return 至多返回一个值；省略return后的返回值，或省略return语句都是返回None。

3. 函数定义的时候，形参有说道: 位置参数/位置或关键字参数/关键字参数；默认值；可变参数（星号）/字典参数（双星号）
4. 函数调用时，实参也有说道：位置实参、关键字实参，`*lst`, `**map`

5. 位置参数和关键字参数的使用建议：根据需要来；但API中一般只使用位置参数。

> - Use positional-only if you want the name of the parameters to not be available to the user. This is useful when
> parameter names have no real meaning, if you want to enforce the order of the arguments when the function is called
> or if you need to take some positional parameters and arbitrary keywords.

> - Use keyword-only when names have meaning and the function definition is more understandable by being explicit with
> names or you want to prevent users relying on the position of the argument being passed.

> - For an API, use positional-only to prevent breaking API changes if the parameter’s name is modified in the future.

### 形参定义

1. 函数定义是一条可执行语句，这条语句的执行会在当前本地符号表中把函数对象绑定在name上（函数对象是此函数体可执行代码的包装器），函数对象
   包含一个指向当前全局符号表的引用，当调用函数时，此符号表作为函数的全局符号表使用。
   Q. 在局部作用域内定义的函数，不是一个该指向外层的局部作用域吗？？？
2. 函数定义语句的执行不会导致函数体代码的执行，函数体代码只有到函数被调用的时候才执行。
3. 函数可以有修饰符，修饰符在函数定义时执行。修饰符表达式的值必须是可调用的，它将接受函数体作为唯一的参数，它的返回值将代替函数体绑定
   在函数名上。多个修饰符将嵌套调用。PS：这里没说修饰符返回值必须是函数，所以，返回非函数不会导致语法错误或运行时错误，但调用会导致报错。
4. 形参可以指定默认值，指定默认值的形参在调用时可以省略对应的实参。如果一个形参设置了默认值，则它后面的形参，一直到星号（*）都必须提供默认值。
   这是语义上的约束，形式化语法定义中无法表达出这一约束。
   Q。这个`*`是特指` / *` 中的星号，还是指随便哪种星号都行？ Ans:是指`“*” or “*identifier”`
   形参默认值在执行函数定义语句的时候从左到右依次求值。
   > Default parameter values are evaluated from left to right when the function definition is executed.
5. 函数调用的详细语义有专门章节（）介绍。
   `*`或`*identifier`之后的一律是 keyword-only parameter，调用的时候只能用关键字实参传递。
   星号参数在函数内部封装为元组；`**identifier`在函数内部封装为字典，这两种参数默认为`()`和 {}；这两种形参都不可以指定默认值。
   > If the form “`*identifier`” is present, it is initialized to a tuple receiving any excess positional parameters,
   > defaulting to the empty tuple. If the form “`**identifier`” is present, it is initialized to a new ordered mapping
   > receiving any excess keyword arguments, defaulting to a new empty mapping of the same type. Parameters after
   > `“*” or “*identifier”` are keyword-only parameters and may only be passed used keyword arguments.

6. 形参和函数返回值也可以有修饰符。

### 函数调用和实参

1. python中的可调用涵盖更广（比js）：
    > user-defined functions, built-in functions, methods of built-in objects, class objects, methods of class instances,
    > and all objects having a `__call__()` method are callable)
2. 函数实参列表末尾可以有一个多余的逗号，无所谓
3. 实参表达式会在函数调用之前全部求值完成（1. 没有规定求值顺序；2. 比如日志，如果实参求值耗费算力，就要注意性能）
4. 实参的传入逻辑
    1. 实参分为位置参数和关键字参数；
    2. 星号实参会解压为附加的位置参数，字典实参会拆包为附加的关键字参数
    3. 根据函数形参列表，创建一个形参插槽序列。根据实参列表，创建一个位置实参序列。把位置实参按位置对应放入形参插槽，把关键字实参
       按名字对应放入形参插槽，如果发现这个形参插槽已经有值了，则抛出TypeError。如果有剩余插槽，用此插槽对应的形参默认值填充，
       如果没有默认值，抛出TypeError；如果有剩余位置实参，则作为星号实参放入形式为 `*name` 的实参中，如果没有此形式的实参，则
       抛出Type Error；如果有剩余的关键字实参，则作为字典实参打包给形如`**name`的形参，如果没有这个形式的形参，则抛出TypeError。
5. 自python3.5，函数调用时，可以传入任意数量的星号实参和字典实参，位置实参可以放在星号实参之后，关键字实参可以放在字典实之后；星号实参
   也可以放在字典实参之后，关键字实参可以放在星号实参之后，但是位置实参不能放在关键字实参之前，无论中间是否隔着星号实参。
   调用的时候会按位置实参、展开后的星号实参、关键字实参、展开后的字典实参重排实参顺序。
   PS:但是形参中数量、顺序和位置限制仍然存在。
   > Changed in version 3.5: Function calls accept any number of * and ** unpackings, positional arguments may follow
   > iterable unpackings (*), and keyword arguments may follow dictionary unpackings (**).

   ```py
   # f02(x=3,*(2,3), 1 );
    # f02(x=3, 1,*(2,3) );
    f02(*(2,3), 1 );

   ```

6. 如果函数定义限制了形参类型（位置、关键字、位置或关键字），则还需要遵循这些限制。

> A consequence of this is that although the *expression syntax may appear after explicit keyword arguments, it is processed before the keyword arguments (and any **expression arguments – see below). So:
> It is unusual for both keyword arguments and the *expression syntax to be used in the same call, so in practice this confusion does not arise.
>
### 修饰符
1. 修饰符就是纯粹的语法糖。
2. 用在类定义和函数定义上。类定义：用来修饰静态和实例方法。函数定义中……
3. 语法糖就长这样：
    ```py
    def f(...):
        ...
    f = staticmethod(f)

    @staticmethod
    def f(...):
        ...
    ```
4. 函数foo的注解可以`__annotations__`属性上获取，这是个字典对象
5. 函数注解还包括形参注解和返回值注解
   ```py
    >>> def f(ham: str, eggs: str = 'eggs') -> str:
    ...     print("Annotations:", f.__annotations__)
    ...     print("Arguments:", ham, eggs)
    ...     return ham + ' and ' + eggs
    ...
    >>> f('spam')
    Annotations: {'ham': <class 'str'>, 'return': <class 'str'>, 'eggs': <class 'str'>}
    Arguments: spam eggs
    'spam and eggs'
   ```
### 函数返回值
[The return statement](https://docs.python.org/3/reference/simple_stmts.html#the-return-statement)

- return 可以返回多个值
- 用多个变量接受
    ```py
    def mult_ret():
        return 1, 'hello', ['x', 'y']

    n, s, lst = mult_ret()

    print(n, s, lst)
    ```
- 返回多个值实际是返回的元组。接受多个值实际是赋值语句语法中多变量赋值；两个结合到一起就成了返回多个值。

****

- 形式化定义：`return_stmt ::=  "return" [expression_list]`
- return 语句只能用在函数中，不能用在类定义中。？？
- > return may only occur syntactically nested in a function definition, not within a nested class definition.
- 如果省略return后的 expression_list，则等价于 return None
- return 语句使得 expression_list 成为 当前函数调用的返回值
- 如果return出现在try语句块中，则finally语句会在真正离开函数之前执行。（先对expression_list求值，然后执行finally，最后退出函数)
- 对于生成器函数，return语句标志着生成序列的结束（抛出StopIteration），且return后的值会作为StopIteration.value属性。
- 异步生成器中，return语句标志着生成器的结束（抛出StopAsyncIteration），且这里的return语句后不得有值，否则是语法错误。

- expression_list：基本格式是：逗号分隔的多个表达式。
  ```
    expression_list    ::=  expression ("," expression)* [","]
    starred_list       ::=  starred_item ("," starred_item)* [","]
    starred_expression ::=  expression | (starred_item ",")* [starred_item]
    starred_item       ::=  assignment_expression | "*" or_expr
  ```
  - Except when part of a list or set display, an expression list containing at least one comma yields a tuple.
    The length of the tuple is the number of expressions in the list. The expressions are evaluated from left to right.
  - An asterisk * denotes iterable unpacking. Its operand must be an iterable. The iterable is expanded into a sequence
    of items, which are included in the new tuple, list, or set, at the site of the unpacking
  - The trailing comma is required only to create a single tuple (a.k.a. a singleton); it is optional in all other cases.
  - 所以 return 后可以跟多个表达式（返回多个值），返回多个值的return语句实质是返回了一个元组。
- 赋值表达式：`assignment_expression ::=  [identifier ":="] expression`
- 赋值语句
    ```
    assignment_stmt ::=  (target_list "=")+ (starred_expression | yield_expression)
    target_list     ::=  target ("," target)* [","]
    target          ::=  identifier
                        | "(" [target_list] ")"
                        | "[" [target_list] "]"
                        | attributeref
                        | subscription
                        | slicing
                        | "*" target
    ```
    可以看出，赋值语句也可以很复杂。

### sample
#### 特殊形参

默认，函数调用时，实参可以是位置实参也可以是关键字实参。`/`和`*`是特殊符号，用来标记形参类型。

    def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
        -----------    ----------     ----------
            |             |                  |
            |        Positional or keyword   |
            |                                - Keyword only
            -- Positional only

- 如果两个特殊符号都没有，调用的时候可以用位置实参或关键字实参
- 如果有 /，则它前面的参数只能以位置实参的格式传入；它后面的可以是位置也可以是关键字实参
- 如果*，则*后面的只能是关键字实参

```py
>>> def standard_arg(arg):
...     print(arg)
...
>>> def pos_only_arg(arg, /):
...     print(arg)
...
>>> def kwd_only_arg(*, arg):
...     print(arg)
...
>>> def combined_example(pos_only, /, standard, *, kwd_only):
...     print(pos_only, standard, kwd_only)
```

#### 参数默认值：默认值在函数定义时求值（相比JS则是在调用时惰性求值）（所以仅求值一次）。

```py
def dft():
    print('default value')

print('1')
def fun(i = dft()):
    print('i is ', i)

print(2)
fun()

# 1
# default value
# 2
# i is  None
```

#### 修饰符
修饰符的返回值可以不是函数……
```py
def deco(fun):
    fun()
    return "hello"

@deco
def fun2():
    print('fun, hello')

if __name__ == "__main__":
    pass
    print(fun2)
    fun2()
```

#### 关键字实参

```py
def parrot(voltage, state='a stiff', action='voom', type='Norwegian Blue'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.")
    print("-- Lovely plumage, the", type)
    print("-- It's", state, "!")

parrot(1000)                                          # 1 positional argument
parrot(voltage=1000)                                  # 1 keyword argument
parrot(voltage=1000000, action='VOOOOOM')             # 2 keyword arguments
parrot(action='VOOOOOM', voltage=1000000)             # 2 keyword arguments
parrot('a million', 'bereft of life', 'jump')         # 3 positional arguments
parrot('a thousand', state='pushing up the daisies')  # 1 positional, 1 keyword

# 下面这些都是非法调用
parrot()                     # required argument missing
parrot(voltage=5.0, 'dead')  # non-keyword argument after a keyword argument
parrot(110, voltage=220)     # duplicate value for the same argument
parrot(actor='John Cleese')  # unknown keyword argument
```

函数调用时，关键字实参之间的先后位置无所谓，但关键字实参必须位于位置实参之后（如果有的话）。

#### 文档字符串
https://docs.python.org/3/tutorial/controlflow.html#documentation-strings

一般，文档字符串的第一行是概要：首字母大写，句点结尾，占一行。
如果还有详细文档，则第二行是空白行，之后各行详细文档。

python解析器不会截断文档每行前面的空白，如果需要，处理文档的工具需要自己去除空白。
一般的规律是：除去第一行之外的首个非空白行，它前面的缩进决定了整个文档字符串的缩进。

```py
>>> def my_function():
...     """Do nothing, but document it.
...
...     No, really, it doesn't do anything.
...     """
...     pass
...
>>> print(my_function.__doc__)
Do nothing, but document it.

    No, really, it doesn't do anything.
```
```py
r"""OS routines for NT or Posix depending on what system we're on.

This exports:
  - all functions from posix or nt, e.g. unlink, stat, etc.
  - os.path is either posixpath or ntpath
  - os.name is either 'posix' or 'nt'
  - os.curdir is a string representing the current directory (always '.')
  - os.pardir is a string representing the parent directory (always '..')
  - os.sep is the (or a most common) pathname separator ('/' or '\\')
  - os.extsep is the extension separator (always '.')
  - os.altsep is the alternate pathname separator (None or '/')
  - os.pathsep is the component separator used in $PATH etc
  - os.linesep is the line separator in text files ('\r' or '\n' or '\r\n')
  - os.defpath is the default search path for executables
  - os.devnull is the file path of the null device ('/dev/null', etc.)

Programs that import and use 'os' stand a better chance of being
portable between different platforms.  Of course, they must then
only use functions that are defined by all platforms (e.g., unlink
and opendir), and leave all pathname manipulation to os.path
(e.g., split and join).
"""
```
## 模块
[python教程-模块](https://docs.python.org/3/tutorial/modules.html)
[python库](https://docs.python.org/3/library/)
[python语言规范-import system](https://docs.python.org/3/reference/import.html)
[python语言规范-数据模型-module](https://docs.python.org/3/reference/datamodel.html#the-standard-type-hierarchy)

[廖雪峰python教程-模块](https://www.liaoxuefeng.com/wiki/1016959663602400/1017454145014176)

- 模块是一个包含Python定义和语句的文件。文件名是模块名加上 .py 后缀。
> A module is a file containing Python definitions and statements.
> The file name is the module name with the suffix .py appended.
- 在模块内，全局变量`__name__`保存了当前模块的名字。

- 模块可以包含可执行语句以及函数定义[1]，这些语句的目的是对模块进行初始化。模块中的代码只在模块第一次
  被导入时执行一遍（当然把模块文件当成脚本执行也会使语句被执行）。
- 每个模块都有一个自己的私有符号表，这个符号表将作为本模块内定义的函数的全局符号表，所以模块作者不必
  担心自己的全局变量会同用户的全局变量冲突。
- 一个模块可以导入其它模块：使用 import 语句。被导入模块直接作为导入模块的名字。
  - 变体：直接导入模块内的符号到当前模块的符号表：`from foo import bar, baz`
  - 变体：导入模块的所有符号到当前模块的符号表：`from foo import *`
  - `import fooxxx as foo`
  - `from foo import bar as baz, bar2 as baz2`
- 重载模块：`import importlib; importlib.reload(modulename)`
  - 出于效率考量，在一个解释器会话中，每个模块只导入一次，如果修改了模块，要么重启解释器，要么使用 importlib.reload(module-name)
    刷新模块。
- 执行模块: `python foo.py arguments`
    - 以脚本方式直接执行模块时，模块的`__name__`属性被设为`__main__`
    ```py
    if __name__ == "__main__":
    import sys
    fib(int(sys.argv[1]))
    ```
- 模块搜索路径：内置模块、sys.path
  - 当导入模块 foo 时，python解释器会先在内置模块中搜索名为 foo 的模块，如果找不到，则会在一系列目录中搜索名为 foo.py 的文件。
    这一系列的目录定义在 sys.path 中，它依次由三部分组成：
    - 当前目录
    - PYTHONPATH
    - 标准模块目录（安装时确定的）
    PS：可以看到当前目录在系统标准搜索路径之前，所以如果自定义模块和标准模块重名，则会导致标准模块无法导入。
    PPS：内置模块不会被覆盖。
    PS：sys.path 变量是可写的，这意味着程序可以动态修改模块搜索路径

- 预编译python文件：能加快导入模块的速度；不能加快执行速度
- 标准模块：python 随安装包预置了一些模块，这些叫做标准模块，有些标准模块更是内置在解释器中（叫内置模块）。
- `dir()`函数：以列表的形式返回模块内的名字。`dir()` 列出模块内的所有名字（变量、函数……），`dir(foo)`列出模块foo的所有名字/
  PS:dir()是内置函数
  PS：dir() 列出的名字中不包含内置名字，要得到内置名字，使用`import builtins; dir(builtins)`

注1：实际上函数定义也是一种可执行的语句：执行模块级别的函数定义语句会将函数名放入当前模块的全局符号表中。

### 包
- 当系统更加复杂的时候，引入包可以更好的组织代码。
  比如，多人合作开发一个功能的时候，如果功能由多个模块组成，为了防止变量冲突，可以划分子模块，包含子模块的模块就叫包。
- 要使python把包含.py文件的目录当作模块，需要且仅需要在目录下放一个 `__init__.py` 的文件（哪怕是个空文件）。
    > The `__init__.py` files are required to make Python treat directories containing the file as packages.
    PS：当然，还有个大前提：这个目录要位于 sys.path 列出的某个目录下。
    注：这是为了防止搜索路径中的某个目录无意中覆盖某个模块。
- 导包语句：

```py
# 全限定名导入
import sound.effects.echo
# 使用的时候也得用全限定名
sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)

# from 语法，可以直接导入给定的名字
from sound.effects import echo
echo.echofilter(input, output, delay=0.7, atten=4)

# 还可以直接导入需要的函数
from sound.effects.echo import echofilter
echofilter(input, output, delay=0.7, atten=4)

```
注：`from package import item` 这个语法中，item可以是包 pacakge 的子模块、子包、或者是包中定义的名字。
python解释器首先测试package有没有定义名为item的名字，如果没有，就假设item是模块名，然后去搜索它，如果搜索不到，就报错。

- `from sound.effects import *` 语句
  - 使用import * 的时候，实际导入的名字，由包的 `__init__.py`文件中定义的`__all__ = ["echo", "surround", "reverse"]` 指定。
  - 如果没有定义 `__init__.py`，只导入执行 `__init__.py` 之后所得到的名字；而不会自动导入子模块，更不会递归搜索、导入所有子模块中的名字。
  - PS：具体来说
    - `__init__.py`定义的名字
    - `__init__.py`显式载入的子模块（如果有）中定义的名字
  - PS：`__all__`变量仅对import * 起作用，不限制 from package import foo 的导入。

相对包导入
```
from . import echo
from .. import formats
from ..filters import equalizer
```
- 同一个包下的多个子模块/子包之间可以使用相对导入语法，这种语法中使用前导的句点表示当前包和父级包
- 相对模块导入的解析依赖于当前模块的名字。
- 而直接执行的模块，其名字永远为 `__main__`，所以这种脚本导入模块必须使用绝对路径的包导入语法。
> Note that relative imports are based on the name of the current module. Since the name of the main module is
>  always `__main__`, modules intended for use as the main module of a Python application must always use absolute imports.

由多个目录构成的包与`__path__`变量

- 这个变量指定了当前包搜索子模块/子包的路径，包的`__init__.py`文件可以设置/修改这个属性。
- 根据定义，如果模块定义了此变量，则它就是一个package。非package的模块不应当定义此变量
  Q。要是在一个普通模块文件中定义了这个变量会如何？

Non-package modules should not have a `__path__` attribute.
By definition, if a module has a `__path__` attribute, it is a package.
A package’s `__path__` attribute is used during imports of its subpackages.
A package’s `__init__.py` file may set or alter the package’s `__path__` attribute, and this was typically the way
namespace packages were implemented prior to PEP 420.
With the adoption of PEP 420, namespace packages no longer need to supply `__init__.py `files containing only `__path__`
manipulation code; the import machinery automatically sets `__path__` correctly for the namespace package.
`__path__` must be an iterable of strings, but it may be empty if `__path__` has no further significance.

## 类(基础)

## with
当成一种协议。
python 语言规范：<https://docs.python.org/3/reference/compound_stmts.html#the-with-statement>

## try-catch

## 装饰器
<https://www.liaoxuefeng.com/wiki/1016959663602400/1017451662295584>

## 索引、切片、调用、属性引用
模块有一个 `__dict__` 属性，m.x 等价于 `m.__dict__[x]`
类对象也是如此；类实例也是如此。

索引
Subscription, slicing, call, attribute reference
```
primary ::=  atom | attributeref | subscription | slicing | call
```

属性访问
- 如果访问的属性不存在，会抛出 AttributeError
- 可以重写 `__getattr__()` 方法定制属性访问的行为
- Q。还能有对象不支持属性访问？
An attribute reference is a primary followed by a period and a name:
` attributeref ::=  primary "." identifier `
The primary must evaluate to an object of a type that supports attribute references, which most objects do.
This object is then asked to produce the attribute whose name is the identifier.
This production can be customized by overriding the `__getattr__()` method. If this attribute is not available, the
exception AttributeError is raised. Otherwise, the type and value of the object produced is determined by the object.
Multiple evaluations of the same attribute reference may yield different objects.

下标    `subscription ::=  primary "[" expression_list "]"`
- 下表用于从序列或映射中选择一个元素
- 下标访问对应于方法`__getitem__()`
- 内置类型中，有两类支持下标的对象：映射和序列。映射的下标必须是某个key，序列的下标必须是整数。
  注：内置序列都支持负数下标。
- 注：字符串的元素是字符，但字符并不是一种独立的数据类型，字符只是长度为1的字符串罢了。
- PS：并没有说明下标访问不存在的元素会如何，但是内置类型dict和sequence的文档对此做了说明
  dict引用不存在的下标会抛出 KeyError；但给它赋值不会报告异常。
  长度为n的序列，允许的下标 i 的范围是 `-n <= i<= n-1`
> A subscription selects an item of a sequence (string, tuple or list) or mapping (dictionary) object:
> The primary must evaluate to an object that supports subscription (lists or dictionaries for example).
> User-defined objects can support subscription by defining a `__getitem__()` method.
> For built-in objects, there are two types of objects that support subscription:
> If the primary is a mapping, the expression list must evaluate to an object whose value is one of the keys of the mapping, and the subscription selects the value in the mapping that corresponds to that key. (The expression list is a tuple except if it has exactly one item.)

If the primary is a sequence, the expression list must evaluate to an integer or a slice (as discussed in the following section).

The formal syntax makes no special provision for negative indices in sequences; however, built-in sequences all provide a `__getitem__() `method that interprets negative indices by adding the length of the sequence to the index (so that x[-1] selects the last item of x). The resulting value must be a nonnegative integer less than the number of items in the sequence, and the subscription selects the item whose index is that value (counting from zero). Since the support for negative indices and slicing occurs in the object’s `__getitem__() `method, subclasses overriding this method will need to explicitly add that support.

A string’s items are characters. A character is not a separate data type but a string of exactly one character.

切片
- 切片用于选择序列对象中某范围内的元素
- 任何合法的下标都可以当切片语法，为了避免歧义，规定如果同时符合下标和切片语法，则优先解释为下标。
- 切片的流程：逻辑上，先用切片列表生成对应的key序列，然后用每个key作为下标依次获取元素。
- PS：切片其实很复杂呀。比如可以用逗号。
```
slicing      ::=  primary "[" slice_list "]"
slice_list   ::=  slice_item ("," slice_item)* [","]
slice_item   ::=  expression | proper_slice
proper_slice ::=  [lower_bound] ":" [upper_bound] [ ":" [stride] ]
lower_bound  ::=  expression
upper_bound  ::=  expression
stride       ::=  expression
```

range(stop)
range(start, stop, step)

当 step 为正数时，start, start+step, start+2*step,... 直到最后一个满足 `start+n*step < stop`的元素; 如果 start >= stop，则得到空序列；
当 step 为正数时，start, start+step, start+2*step,... 直到最后一个满足 `start+n*step > stop`的元素；如果 start <= stop, 则得到空序列。

切片 L[i:j] 取下标为 range(i, j) 的元素；
    省略i或设为None则取0，省略j或设为None则取len(L);
    当i,j大于len(L)时，先调整为len(L); 当i为负数时，调整为 `i+k*len(L)`, j 亦如是。
    ps: -0 不会调整为 len(L)
    ps：L[i]的负数调整范围仅限于len(L),如果调整后仍然超出 [0, len(L) -1],则报错。
    当 i>=j 时切片结果为空；

序列的切片 l[i:j:k] 依次选取下标为 range(i,j,k) 的元素；
当k为正数，i，j省略或超出的调整同L[i:j]
当k为负数时，省略i则设为 len(L)-1,省略j则设为？
关键是 L[1::-1] 所选下标为[1,0],没有任何不省略j的方式能做到这个，卧槽；也就是逆序的时候要取到下标为0的元素，就只能省略j，这时候 range(i,-1,k).
也就是，切片不会根据k的符号自动交换i，j。
# 协议
## 迭代协议
## buffer protocol
Built-in objects that support the buffer protocol include bytes and bytearray.
<https://docs.python.org/3/c-api/buffer.html#bufferobjects>

python 不能创建预分配空间的数据结构？
# 日志
<https://docs.python.org/3/howto/logging.html#logging-basic-tutorial>

[Python官网日志教程](https://docs.python.org/3/howto/logging.html)

基本的类：Logger,Handler, Filter, Formatter
还有：LogRecord，LoggerAdapter
是线程安全的。

logging level：

涉及到的模块：
logging: getLogger(name), Logger, Handler,Formatter, Filter, LogRecord
logging.config:
logging.handlers:

## 基础教程

### overview
日志是记录软件运行时发生的事件的一种手段。为了表明某些事件发生了，软件开发者在他们的
代码中加入日志调用语句。一个事件会带有一个描述性的信息，此信息可以包含可变数据（意思是不同时刻发生
此事件，这些数据可能不同）。开发者还会给事件指定一个重要等级，用我们的术语叫级别或严重性。

logging, event, variable data, level(severity).

### 何时记录日志

logging 为简单日志需求提供了一些快捷方法：debug(),info(),warning(), error(), critical().
不同场景有不同的日志需求，下面这个表格举了一些例子：

- 命令行脚本或程序的普通终端输出：用 print
- 记录程序正常运行中发生的事件（如状态监控或故障排查）：logging.info()或 logging.debug()
  debug() 用于输出非常详细的数据以便诊断错误。
- 针对特定运行时事件，发出警告：warnings.warn() 或 logging.warning()
  前者用在库代码中，且此类警告可以也应当通过修改客户端程序消除的；后者则无关客户端程序的
  使用方式（这个警告不是修改客户端代码就能避免的）。

- 根据某个运行时事件，报告错误：抛异常
- 不抛出异常的情况下消化处理某个错误（比如长时期运行的服务进程中的错误处理程序）：
  logging.error(), exception(), critical() 这些，根据错误的类型和应用的领域选用。


1. Display console output for ordinary usage of a command line script or program

   print()

2. Report events that occur during normal operation of a program (e.g. for status
   monitoring or fault investigation)

   logging.info() (or logging.debug() for very detailed output for diagnostic purposes)

3. Issue a warning regarding a particular runtime event

    warnings.warn() in library code if the issue is avoidable and the client application should be modified to eliminate the warning

    logging.warning() if there is nothing the client application can do about the situation, but the event should still be noted
4. Report an error regarding a particular runtime event

    Raise an exception

5. Report suppression of an error without raising an exception (e.g. error handler
   in a long-running server process)

    logging.error(), logging.exception() or logging.critical() as appropriate for
    the specific error and application domain

这些日志方法是根据对应着标准日志级别定义的，标准日志级别如下：DEBUG,INFO,WARNING,ERROR,CRITICAL.
- DEBUG: 详细信息，典型应用场景是为错误诊断提供线索。
- INFO：一种确认信息，表明程序正在如期运行
- WARNING：一种指示性信息，表明发生了某些意外事件或者是表明快要出问题了（比如硬盘空间不足）。
  此时软件仍然可以正常运行
- ERROR：遇到了更严重的问题，软件的某些功能无法正常使用
- CRITICAL：特别严重的问题，程序已经无法继续运行了

默认的过滤级别是 WARNING，只有 WARNING 以及更严重的日志信息才会被记录。有不同的方式处理
被记录的日志：典型的处理方式是输出到控制台，另一个方式是输出到硬盘文件中。

### 简单的示例
```py
import logging
logging.warning('Watch out!')  # will print a message to the console
logging.info('I told you so')  # will not print anything
```

保存为脚本文件并执行，会看到一句输出：`WARNING:root:Watch out!`.
info消息没有输出，因为默认日志级别是warning。日志开头是级别，末尾是我们提供的信息（
这个就是日志事件的描述），root 那个东西，稍后解释。

输出日志，可以使用 % 格式说明符，logging.info('hello, %s', 'world'). ps: 只支持%格式说明符
### 把日志输出到文件中

把日志输出到文件中也是非常常见的需求。新开一个脚本文件。

```py
import logging
logging.basicConfig(filename='example.log',level=logging.DEBUG)
logging.debug('This message should go to the log file')
logging.info('So should this')
logging.warning('And this, too')
```
```
DEBUG:root:This message should go to the log file
INFO:root:So should this
WARNING:root:And this, too
```

对 basicConfig 的调用要放在任何 debug/info/warning/error/critical 方法调用之前才有效，而且只有第一次对此方法的
调用才有效，其后的调用不会执行任何操作。原因是：这个方法本就是设计为一次性的简单工具函数。

`logging.basicConfig(filename='example.log', filemode='w', level=logging.DEBUG)`
这里，指定文件模式为w，日志输出是覆盖模式，原有日志会被清空。

> Does basic configuration for the logging system by creating a StreamHandler with
> a default Formatter and adding it to the root logger. The functions debug(),
> info(), warning(), error() and critical() will call basicConfig() automatically
> if no handlers are defined for the root logger.

> This function does nothing if the root logger already has handlers configured, unless the keyword argument force is set to True.

```py
root = logging.getLogger()
root.info('info message')
root.error('error message')
# error message

```

### 从不同模块输出日志
```py
# myapp.py
import logging
import mylib

def main():
    logging.basicConfig(filename='myapp.log', level=logging.INFO)
    logging.info('Started')
    mylib.do_something()
    logging.info('Finished')

if __name__ == '__main__':
    main()
# mylib.py
import logging

def do_something():
    logging.info('Doing something')
```

```
INFO:root:Started
INFO:root:Doing something
INFO:root:Finished
```

可以把这个模式扩展到更多模块构成的程序。
需要指出，在这个模式中，无法得知某条日志消息是哪个模块输出。
要在日志中记录这些信息，需要更精细的设置，参考第二部分《进阶》。

### 输出变量数据

在日志信息中加入变量：
```py
import logging
logging.warning('%s before you %s', 'Look', 'leap!')

```
将会输出：`WARNING:root:Look before you leap!`

第一个参数用格式字符串，实际的数据放在后面的参数中传入。这种格式化方式是老旧的 % 风格，
这种语法是为了向后兼容，如今已有了更合适的格式化API. 详细参考：

<https://docs.python.org/3/howto/logging-cookbook.html#formatting-styles>
### 修改日志格式

```py
import logging
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.DEBUG)
logging.debug('This message should appear on the console')
logging.info('So should this')
logging.warning('And this, too')

# DEBUG:This message should appear on the console
# INFO:So should this
# WARNING:And this, too
```
和默认格式相比，字符串root不见了。格式字符串可以使用的字段，参考<https://docs.python.org/3/library/logging.html#logrecord-attributes>

简单起见，一般只需要日志级别，日志信息，有时再加一个时间戳。

日志格式通过format设置，format的语法由 style='%' 决定，%，{, $.

### 在日志中包含时间信息

在日志中包含时间信息
```py
import logging
logging.basicConfig(format='%(asctime)s:%(message)s')

logging.warning('is when this event was logged')

```
输出的消息：`2010-12-12 11:41:42,612 is when this event was logged.`，时间戳的格式 ISO86001 或 RFC3339 格式的。
要自定义日期格式，使用datefmt参数`logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')`
日期时间格式说明符的语法同 time.strftime().
### 下一步

## 日志进阶教程
### overview

日志库使用了模块化设计，将功能划分到若干组件中：logger，handler，filter，formatter。
- logger：客户端直接使用的日志接口
- handler：将不同的日志派发到不同的目的地
- filter：对日志进行精细的过滤
- formatter：按指定的格式输出日志信息
- 在logger、handle、filter、formatter这些组件之间传递的日志信息被封装在 LogRecord 实例中。

日志的发送是通过调用 Logger 实例的方法实现的。每个logger实例都有一个名字，这些名字从概念上构成了一个树状结构，用点作为分隔符，
比如名为 foo 的 logger 是 foo.bar 的父亲，也是 foo.html 的父亲。logger 的名字可以随便设置，应该能指示出这个logger记录的日志
信息面向应用程序的哪个部分。一个好的实践是：使用模块级别的日志:用模块名作为日志名，就像这样：`logger = logging.getLogger(__name__)`.

> Logger names can be anything you want, and indicate the area of an application in which a logged message originates.
> A good convention to use when naming loggers is to use a module-level logger, in each module which uses logging, named as follows:

这样，从loggeer的名字就可以看出模块的层级结构。

位于logger树根节点的叫 root logger，其实debug，info，warning，error，critical这些方法就是直接调用的root logger的对应方法，在日志输出
中，root logger 的名字显示为 'root'.

日志消息可以发往不同的目的地，python库预置了一些目的接口：文件、GET/POST请求、电子邮件、队列、操作系统的日志系统、通用socket。
如果这些不够，还可以自己开发。

默认没有设置任何目的地。当然可以通过baseConfig设置目的地。如果没有，debug，info这些方法会将stderr作为目的地，并使用默认格式输出日志，
baseConfig使用的默认格式是:`severity:logger name:message`.

格式说明符的详细语法参考 [Formatter](https://docs.python.org/3/library/logging.html#formatter-objects) 文档。

### 日志流程
这有个配图<https://docs.python.org/3/howto/logging.html#logging-flow>

入口是 logger.info 之类的方法调用，
当前 logger 的级别，logger 上 filter 的级别，都通过则 1. 发送给注册的 handler；2. logger 的 propagation 为true时，还要向父logger（如果有）冒泡，把当前logger设为父logger，并直接进入 1，2.
对于1，先后经过 handler 的日志级别，handler上filter的日志级别双重过滤，最终给formatter，格式化，然后输出到目的地。

默认的 propagation 为 True。

### loggers
logger 对象封装了三个任务：向客户程序提供日志接口、根据日志级别决定是否丢弃日志、把日志发送给匹配的handler。

logger对象的方法可以分为两类：配置、发送消息。

配置类：setLevel(), add/removeHandler/Filter()。当然，不需要为每个新建的logger对象调用全部这些方法。

消息类：
- debug, info, warning, error, critical
- exception:类似于error，只不过还会输出调用栈。这个方法应当只在异常处理函数中调用
- log，可以提供更精细的日志级别，这是自定义日志级别的时候用到的方法。

getLogger() 方法接受logger名字，返回此名字的日志实例，如果没有则返回根logger。使用同一名字多次调用此方法得到的是同一个logger实例。
传入'root', '.' 得到的都不是root logger，唯有 getLogger(None) 或 getLogger() 或者 getLogger('') 可以获得root logger，尽管root logger 的名字是root。

logger 的有效级别：如果没有为logger显式指定日志级别，则它取父logger的有效级别作为自己的有效日志级别，root logger 总是有一个日志级别，
root logger 默认级别是 logging.WARNING。
说一个logger自己有级别，iff，该日志器的level不是 NOSET(0).

因为存在日志传播机制，所以大可不必为每个logger都设置handler——只要为顶层的logger设置好handler，并根据需要创建子logger就行了。
当然，还可以关闭logger的日志传播行为。

### handlers

logger实例可以关联任意数目的handler（包括0个）。举个例：某个应用程序可能要这样，所有的日志都记录到日志文件，同时输出error以及
更高级别的消息到控制台，最后还要把critical级别的日志发送到某个邮箱。这个场景需要三个handler实现。

python预置了少量的handler。除非是开发自定义handler，否则用到的方法只有这几个：setLevel, setFormatter(), add/removeFilter().
这里，以StreamHandler和FileHandler为例。应用程序决计不应该直接实例化Handler类，因为它只是个基类。

如果没有设置，handler的默认日志级别是NOTSET，这是最低的日志级别（0），表示任何日志都输出。
### formatters
Formatter 类可以直接实例化，虽然你可能需要创建个子类实现一些扩展特性。
`logging.Formatter.__init__(fmt=None, datefmt=None, style='%')`
构造函数，如果fmt为None，则日志格式是原生日志消息。
如果datefmt为None，则默认格式是"%Y-%m-%d %H:%M:%S",
style参数可取这三个值之一：%, ‘{‘ or ‘$。默认为'%',表示使用` %(<dictionary key>)s`这种格式的字符串替换语法。
如果为`{`，表示使用 str.format() 的语法，美元符号则是 string.Template.substitute(). 风格的语法。

### configuring logging
应用程序配置日志通常有三种风格：
1. 直接用python代码，创建handler、formatter，设置级别
2. 把配置信息写在配置文件中，然后使用 fileConfig（）函数读入。
3. 把配置信息放在字典中，然后使用 dictCofnig（）函数读取

- 显然，直接用python代码硬配置是最差劲的
- fileConfig的相关语法
  - <https://docs.python.org/3/library/logging.config.html#logging-config-fileformat>
  - 是基于 configparse 模块的
  - 配置文件必须包含：[loggers] [handlers] [formatters] 三个小节，root日志必须指定handler和level，[logger_roo]
  - 比dictConfig（）方法老旧，不支持 Filter 配置。
#### 代码手动配置：
```py
import logging

# create logger
logger = logging.getLogger('simple_example')
logger.setLevel(logging.DEBUG)

# create console handler and set level to debug
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# add formatter to ch
ch.setFormatter(formatter)

# add ch to logger
logger.addHandler(ch)

# 'application' code
logger.debug('debug message')
logger.info('info message')
logger.warning('warn message')
logger.error('error message')
logger.critical('critical message')

```
#### 配置文件配置
```py
import logging
import logging.config

logging.config.fileConfig('logging.conf')

# create logger
logger = logging.getLogger('simpleExample')

# 'application' code
logger.debug('debug message')
logger.info('info message')
logger.warning('warn message')
logger.error('error message')
logger.critical('critical message')

```
配置文件如下
```ini
[loggers]
keys=root,simpleExample

[handlers]
keys=consoleHandler

[formatters]
keys=simpleFormatter

[logger_root]
level=DEBUG
handlers=consoleHandler

[logger_simpleExample]
level=DEBUG
handlers=consoleHandler
qualname=simpleExample
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=DEBUG
formatter=simpleFormatter
args=(sys.stdout,)

[formatter_simpleFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=
```
#### 字典配置
自 Python 3.2 之后提供了基于字典的日志配置。此配置方式也不是直接用的，搭配上yaml文件解析
模块，很方便。

### 不指定配置时的缺省行为
自 3.2 之后，其行为如下：
- 级别为 WARNING，没有格式化，目标为std.err

> The event is output using a ‘handler of last resort’, stored in logging.lastResort. This internal handler is not associated with any logger, and acts like a StreamHandler which writes the event description message to the current value of sys.stderr (therefore respecting any redirections which may be in effect). No formatting is done on the message - just the bare event description message is printed. The handler’s level is set to WARNING, so all events at this and greater severities will be output.

默认日志级别为WARNING，不格式化，输出到标准错误，所以用getLogger取得的日志器就是如此。

```py
Python 3.8.2 (tags/v3.8.2:7b3ab59, Feb 25 2020, 23:03:10) [MSC v.1916 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import logging
>>> log = logging.getLogger('test')
>>> log.info('msg 1')
>>> log.warning('msg 2')
msg 2
# log 的有效级别是 root 的级别（warning）
# root 没有handler，使用 logging.lastResort 作为缺省handler。
>>> logging.warning('msg3')
WARNING:root:msg3
>>> log.warning('msg4')
WARNING:test:msg4

# ps：任何日志器，没有handler且传播设为Flase，都会用 logging.lastResort 作为缺省handler
>>> log.propagate = False
>>> log.warning('a')
a

```

```py
# 不加配置，root 的默认级别为 WARNING，没有关联的 handler
# getLogger 获取的其它日志器默认级别为0，即不拦截任何消息
# lastResort 的级别是WARNING
>>> import logging
>>> r = logging.getLogger()
>>> r.level
30
>>> logging.getLevelName
<function getLevelName at 0x000001FA8E7688B0>
>>> logging.getLevelName(30)
'WARNING'
>>> logging.lastResort
<_StderrHandler <stderr> (WARNING)>
>>> logging.lastResort.level
30
>>> log = logging.getLogger('log')
>>> log.level
0

```
### 给库指定日志配置
从此处继续：https://docs.python.org/3/howto/logging.html#configuring-logging-for-a-library

## 整理

预定义日志级别常量：logging.DEBUG/INFO/WARNING/ERROR/CRITICAL
其中，WARNING的前身是WARN，但WARN已过时，CRITICAL的前身是FATAL，但FATAL也已过时。
预定义日志级别方法：Logger.debug/info/warning/error/critical() 正好与预定义日志级别一一对应
其中，warning的前身是warn，但warn方法已过时；critical的前身是fatal，（ps：fatal没有过时）

日志器根据名字构成单根的树结构。树的根是 '' 或者叫'root'。
日志器的有效级别是它的显式设置的日志级别，如果没有则沿树结构向上查找，直到遇到显式指定级别的日志器。根日志器的生来显式指定级别为 logging.WARNING。

默认，根日器志级别为warning，没有filter，没有handler。
如果某个日志事件通过了过滤条件但最后没有找到handler，则使用默认handler和formatter：logging.lastResort，
它级别为WARNING，格式是'%(message)s',输出到 std.err.

basicConfig()的默认行为是：为root日志器添加一个处理器，其级别是0，格式是 '%(levelname)s:%(logname)s:%(message)s'。如果 root 已经有了handler，则此方法不执行任何操作，除非指定参数 force=True。
logging.info/warning... 第一次调用时会自动调用一次basicConfig(),不带任何参数
指定 basicConfig（）的level参数，则会同时设置root的级别为level（默认root为warning）。

handler默认的级别是NOSET，即任何级别的日志都可以通过。
formatter的默认格式是'%(message)s'

```
Level           Numeric value
CRITICAL        50
ERROR           40
WARNING         30
INFO            20
DEBUG           10
NOTSET          0
```

# 单元测试
- unitest：用python编写程序时时使用的单元测试框架，仿 JUnit 风格。
- test模块：是给python内部使用的
-
# 执行shell/cmd命令
- os.system()
- os.popen()
- subprocess 模块是如今建议的api，代替上述两个

os.popen()
https://docs.python.org/3/library/os.html#os.popen
This is implemented using subprocess.Popen; see that class’s documentation for more powerful ways to manage and communicate with subprocesses.

2. subprocess.run 调用 cmd 的 echo,cat, ls内置命令会报错, `[WinError 2] 系统找不到指定的文件。`
    但是linux不会报错。
    另外，windows用 os.system() 或 os.popen() 则没问题。

    ans: subprocess 有个 shell 参数，指定 shell = True 即可。（默认为False）。

shell 参数：
> If shell is True, the specified command will be executed through the shell.

args is required for all calls and should be a string, or a sequence of program arguments. Providing a sequence of
arguments is generally preferred, as it allows the module to take care of any required escaping and quoting of arguments
 (e.g. to permit spaces in file names). If passing a single string, either shell must be True (see below) or else the
string must simply name the program to be executed without specifying any arguments.

## subprocess模块
[python3 api文档，subprocess模块](https://docs.python.org/3/library/subprocess.html)

### overview
此模块允许用户新建进程，通过管道连接到新进程的输入输出和标准错误输出，并且获得进程结束时的返回值。
此模块意图替代这些老旧模块和函数： os.system, os.spawn*

使用此模块的推荐方式是调用 subprocess.run() 方法，除非是此方法不能达到目的，再去直接使用底层的 Popen 类。
这个方法是 3.5 之后添加的。

其中os.system和subprocess对于本身是异步的命令会直接返回

### run 方法
`subprocess.run(args, *, stdin=None, input=None, stdout=None, stderr=None, capture_output=False, shell=False, cwd=None, timeout=None, check=False, encoding=None, errors=None, text=None, env=None, universal_newlines=None)`

> Run the command described by args. Wait for command to complete, then return a CompletedProcess instance.
执行 args 参数描述的命令，等待命令完成，然后返回 CompletedProcess 实例。

这里只列出了常用的参数，完整的参数列表，完整的参数和 Popen 构造函数非常类似。
不同的是这几个参数：timeout, input, check, capture_output。

- capture_output
> If `capture_output` is true, stdout and stderr will be captured.
  ps: 所谓  stdout and stderr will be captured，是指run（）方法返回的 subprocess.CompletedProcess对象，可以从它的 stdout
        和 stderr 属性读取到所执行的命令的标准输出/标准错误输出。
  ps：无论是否捕获，所执行的命令输出的内容都会在控制台上输出。
> The stdout and stderr arguments may not be supplied at the same time as capture_output. If you wish to capture and
> combine both streams into one, use stdout=PIPE and stderr=STDOUT instead of capture_output.

- timeout 指定超时的秒数，如果子进程超时，则杀死进程，并在杀死后抛出 TimeoutExpired 异常。
  Q. 不指定，会无限等待？
- input 用来给新进程传递输入数据。此参数和stdin不可同时使用。对此参数的类型有些要求。
  > The input argument is passed to Popen.communicate() and thus to the subprocess’s stdin. If used it must be a byte
  > sequence, or a string if encoding or errors is specified or text is true.
- check：如果设为True，则进程失败后会抛出异常。CalledProcessError
  > If check is true, and the process exits with a non-zero exit code, a CalledProcessError exception will be raised.
  > Attributes of that exception hold the arguments, the exit code, and stdout and stderr if they were captured.
- > If `encoding` or `errors` are specified, or `text` is true, file objects for stdin, stdout and stderr are opened in
  text mode using the specified encoding and errors or the io.TextIOWrapper default. The universal_newlines argument
  is equivalent to text and is provided for backwards compatibility. By default, file objects are opened in binary mode.

```py
subprocess.run(["ls", "-l"])  # doesn't capture output
subprocess.run("exit 1", shell=True, check=True)
subprocess.run(["ls", "-l", "/dev/null"], capture_output=True)
```

注：这个方法不支持with协议。
```py
    with subprocess.run(['start', 'notepad'], shell=True, timeout=1) as p:
        print(p.args)

```
```
Traceback (most recent call last):
  File "D:\bin\work.py", line 28, in <module>
    main()
  File "D:\bin\work.py", line 25, in main
    exec_cmd()
  File "D:\bin\work.py", line 16, in exec_cmd
    with subprocess.run(['start', 'notepad'], shell=True, timeout=1) as p:
AttributeError: __enter__
```
### class subprocess.CompletedProcess

- returncode: 子进程的退出码，一般0表示正常结束，非零表示运行失败。
  > Exit status of the child process. Typically, an exit status of 0 indicates that it ran successfully.
  > A negative value -N indicates that the child was terminated by signal N (POSIX only).
- args:
- stdout, stderr
- check_returncode(): 如果子进程退出码非零，抛出异常。
  > If returncode is non-zero, raise a CalledProcessError.

### class subprocess.Popen 的构造器
todo: 这个需要认真看看。
https://docs.python.org/3/library/subprocess.html#popen-constructor
### 实例

#### 第一个
```py
# dm08.py
import subprocess
ps = subprocess.run(['_test.cmd', 'abc', 'a b c', ''])
print(ps.args)

ps = subprocess.run(['_test.cmd', '"abc"', '""', '"a b c"'])
print(ps.args)

```
```cmd
@REM _test.cmd
echo %* > foo.txt
```

在cmd下执行 dm08.py
```bat
F:\>dm08

F:\>echo abc "a b c" ""  1>foo.txt
['_test.cmd', 'abc', 'a b c', '']

F:\>echo \"abc\" \"\" "\"a b c\""  1>foo.txt
['_test.cmd', '"abc"', '""', '"a b c"']
```
有空格的会自动加上双引号，空字符串会自动变成双引号，连续的字符没有双引号。
但是对参数中本身包含双引号的就不大对了，因为cmd的转义引导符是`^`而不是`\`。
这些足够用了。

还可以看出，执行的cmd脚本中命令会直接回显到当前控制台，命令的输出也会回显在控制台上，但命令本身没有回显出来。
也就是：命令不会回显，但命令产生的输出会原样回显出来。

#### 第二个

ps = subprocess.run(['start', '', prog], shell=True, timeout=3)
print(ps.args)

看到 args是：['_test.cmd', '', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe']

而实际start命令收到的参数是：`"" "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"`
相当于在bat中执行 `start "" "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"`
也就是说，已经对引号、空格做了处理。

# OOP和类

在python中，
1. Python中一切是某种值（value）, 一切值都是对象（object）。或者说，python中所有东西都是对象。
2. 一切对象都是某个类的实例，类本身也是对象。

函数是函数对象（function object）。
函数是值，它可以赋给变量，只不过是一种可以执行的值，保存函数值的对象叫函数对象（function object）。
类是值，保存类这种值的对象叫类对象（class object），类对象是名为 type 的类的实例，（type本身也是类对象，它是type类的实例）。
保存整数、布尔值、浮点数、字符串这些非常基础的值也是对象。这是Python不同于Java这些经典OO语言的地方。

## 实例关系和继承关系
Python的OOP机制中有两种关系：实例关系和继承关系。
所有的类，作为对象，它们都是type的实例，包括type本身。
例如，`class A:pass`，则A是type的实例，并称A的元类是type。
`A.__class__ == type`
所有的类都有父类，object 是顶端的父类，object 本身没有父类。

```py
>>> type.__class__
<class 'type'>
>>> type.__base__
<class 'object'>
>>> object.__class__
<class 'type'>
>>> object.__base__
>>>
```
## 一切皆对象
函数定义是对象，类定义也是对象，对象的创建都可以通过构造函数实现。


```py
# 类定义其实是语法糖
class Hello(object):
    def hello(self, name='world'):
        print('Hello, %s.' % name)
# 它会被解释器转换为
def fn(self, name='world'): # 先定义函数
    print('Hello, %s.' % name)
Hello = type('Hello', (object,), dict(hello=fn)) # 创建Hello class

```

## 属性访问
类、实例、属性访问、基类
Q. 类定义语句可以出现哪些些东西？
### 先讨论数据属性（除了方法之外的属性）
1. 类对象有一个特殊的属性`__dict__`，它是个字典，它保存着这个类对象所拥有的属性
2. 类定义语句就定义了一个类对象
3. 可以在类创建之后给类对象添加属性

设对象 o 是类 C 的一个实例。
o.x 会依次在对象 o，C，C的基类，C的基类的基类上查找属性x，如果找不到，会调用 C.__getattr(o,'x')（如果有这个方法）。
如果还找不到，就抛异常。


## 方法调用
[python语言规范-数据模型-特殊方法](https://docs.python.org/3/reference/datamodel.html#special-method-names)
- 类定义语句会创建一个类对象
- 任何一个类实例都是某个类对象的实例
- 实例方法是一个三元组：(类对象、类实例、可调用类型)


自定义类通常是使用类定义语句定义的。
类对象有一个字典，用来存放它所拥有的属性，属性访问实际被转化为对该字典的查找（` C.x is translated to C.__dict__["x"]`），
当然，也有一些钩子方法可以自定义类的属性访问行为。

如果当前类没有找到属性，会自动搜索它的父类。

如果类属性查找到的属性是一个类方法对象，则会封装成实例方法对象后返回，此实例方法的关联的实例就是当前对象。

类属性赋值操作会更新类对象自身的名称空间字典，但绝不会更新父类。

类实例有一个字典，用来存放它的属性。

对类实例的属性访问，会先搜索类实例本身的属性，找不到就会去它所属的类上去找，如果类也找不到，就调用类的`__getattr__()`为此实例查找属性（如果有的话）。
对类实例的属性赋值，会更新此类实例的名字空间字典，但绝不会修改它所属的类的名字空间字典。
> If a class attribute is found that is a user-defined function object, it is transformed into an
>  instance method object whose `__self__` attribute is the instance.
> Static method and class method objects are also transformed

Q. 静态方法和类方法不是一个东西吗？
Q. 静态方法和类方法转化得到的实例方法，它的self指向类还是实例
Q. 有静态方法和类方法，那么有静态字段和类字段吗？


Q1. 属性（包括方法）的访问和查找规则，`__dict__`属性？
Q2. 静态动态属性（包括方法）的定义和查找规则，或者说类方法、静态方法、类对象、类实例这些术语的区别？
Q3. python从语言层面区分访问方法属性和非方法属性，前者每次都会返回新的方法对象，具体的规则是？

类的特殊属性：
`__name/moduel/bases/doc__`
PS: `__bases__` 中有个s，是复数形式。

类实例的特殊属性：
`__dict__`它的名字空间字典
`__class__`  它所属的类

### 方法
不同于经典OO，Python中区分用户定义函数和实例方法。

用户定义函数：def语句定义的方法
内置函数：
实例方法：三元组(类对象、类实例、可调用类型)；实例方法分为用户自定义实例方法和内置实例方法。
类对象：调用类对象即得到此类的一个实例
类实例：如果类实例所属的类定义了`__call__()`方法，则类实例就是可调用的

用户自定义实例方法是在访问类属性（通过类对象或者通过类的实例对象）的时候自动创建的，当然这个类属性得是用户自定义函数或者是类方法。
注意：每次用句点方式获取实例得方法时都会生成一个新的实例方法对象。

PS：每个实例属于唯一的一个类，所以实例方法的定义可以归结为二元组 (方法，实例)
### 特殊方法与操作符重载
# 协程
[6.2.9. Yield expressions](http://docs.localhost/python-3.8.3/reference/expressions.html#yield-expressions)
[Generator 函数的语法 - ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/generator#Generator-与协程)
[Generator 函数的异步应用 - ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/generator-async)
[async 函数 - ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/async)
阅读完相关资料后好好梳理一遍协程
1. 协程的源起：并发，c10k，多进程，多线程，协程
2. Python协程发展脉络：生成器，基于生成器的协程+asyncio，原生协程。按PEP来
3. 编写一个示例web服务
    功能：返回客户端信息（ip，主机名等）
    使用压测手段实际测试
    分别使用协程和多线程实现两个版本，实际对比效率差异
    Q. 如何压测?
    Q. 如何限制进程使用的资源上限？（CPU，内存，网速）

怎么定义协程？
怎么驱动携程？
一个数据库操作需要耗时 10 秒，用5个不同参数调用，如果借助协程并行处理？

协程不是Python独有的概念，go，JavaScript等语言中都有协程的概念。
协程不是近来才有的概念，计算机发展早期就有协程的概念，只是近来才火起来了。

为什么协程火了？因为高并发问题（c10M）。

协程本身并不能实现并发，并发执行最终还是要落到多线程/多进程上。
协程确实提升了线程的利用效率并降低了编程复杂度。

## Python协程

“yield 表达式”章节给出了五个相关的PEP。从生成器到协程。
PEP 255 - Simple Generators: `yield, return ,try-catch-finally`
    The proposal for adding generators and the yield statement to Python.
    - 有yield的函数就是生成器函数，可以多次返回
    - yield 还是语句，还不是表达式
    - 生成器函数中的return语句后面还不能跟任何值；try/finally中的try代码块里还不能用yield

PEP 342 - Coroutines via Enhanced Generators: `send(),close(),throw(), asyncio`
    The proposal to enhance the API and syntax of generators, making them usable as simple coroutines.
    - 改 yield 为表达式，而不是语句
    - 定义 send(), close(), throw() 三个方法
    - 新增机制，确保垃圾回收之前一定调用 close() 方法
    - 允许在try/finally中的try代码块里使用 yield

PEP 380 - Syntax for Delegating to a Subgenerator: `yield from`
    The proposal to introduce the yield_from syntax, making delegation to subgenerators easy.
PEP 525 - Asynchronous Generators:
    The proposal that expanded on PEP 492 by adding generator capabilities to coroutine functions.

PEP 492 -- Coroutines with async and await syntax
    引入新概念：原生协程
    引入新语法：async def, async with, async for,
    新元素：异步迭代协议
    新库函数：

另外，PEP 3156 介绍的语法被PEP 429替代，但仍有参考价值。（比如，内部原理）。
PEP 479？

Python 中协程仍是基于生成器的。
## 来自 ES6 Generator
Generator 函数是 ES6 对协程的实现，但属于不完全实现。
Generator 函数被称为“半协程”（semi-coroutine），意思是只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

### 应用
（1）异步操作的同步化表达

Generator 函数的暂停执行的效果，意味着可以把异步操作写在yield表达式里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield表达式下面，反正要等到调用next方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

不使用协程，则异步操作必须使用回调的形式。
回调最大的缺点是处理逻辑被分散了。
ps：而异步回调的背后是事件循环。
#### （1）异步操作的同步化表达
```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()

```
上面代码中，第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用next方法，则会显示Loading界面（showLoadingScreen），并且异步加载数据（loadUIDataAsynchronously）。等到数据加载完成，再一次使用next方法，则会隐藏Loading界面。可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰。

#### （2）控制流管理

如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。
```js
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});
```
采用 Promise 改写上面的代码。
```js
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();
```
上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。Generator 函数可以进一步改善代码运行流程。
```js
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
```
然后，使用一个函数，按次序自动执行所有步骤。
```js
scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
```
注意，上面这种做法，只适合同步操作，即所有的task都必须是同步的，不能有异步操作。
因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。
如果要控制异步的操作流程，详见后面的《异步操作》一章。

Q. 如果都是同步操作，这么做不行吗？为什么要改用那种方式？
```js
value2 = step1(value)
value3 = step2(value2)
value4 = step3(value3)
value5 = step4(value4)
```
Ans: 当然行。这么做是为了不阻塞事件循环。
假设每个step耗时10秒，你写了个js，下面这种写法，要42秒才能加载完毕。
```js
console.log('页面加载开始');

value2 = step1(value)
value3 = step2(value2)
value4 = step3(value3)
value5 = step4(value4)

// ... 其它初始化步骤，假设这些步骤耗时不超过2秒。
console.log('页面加载完毕');
```
而下面这种写法只需要不到3秒。
其中 scheduler()是js引擎提供的调度库函数。
```js
console.log('页面加载开始');

scheduler(longRunningTask(value));

// ... 其它初始化步骤，假设这些步骤耗时不超过2秒
console.log('页面加载完毕');

function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
```
无论如何执行这 stepx 需要耗时40秒是省不了的，奥妙在于js主线程是单线程，但事件循环
的背后还有多个工作线程，通过调度器，就把这个耗时操作放到了工作线程里，避免了主线程阻塞。

Q. 如果是耗时的同步任务，完全可以这么写嘛
```js
console.log('页面加载开始');
scheduler(longRunningTask(value));
// ... 其它初始化步骤，假设这些步骤耗时不超过2秒。
console.log('页面加载完毕');

function longRunningTask(){
    return function(){
        value2 = step1(value)
        value3 = step2(value2)
        value4 = step3(value3)
        value5 = step4(value4)
    }
}

// 这个scheduler可以简单些，比如
function scheduler(task){
    task()
}
```
Ans：确实。
Q. 那为什么协程有什么用呢？
## 来自 Generator 函数的异步应用

异步的定义：
所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。

ES6 诞生以前，异步编程的方法，大概有下面四种。

- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象

- Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。
### 回调
````js
// 1. 回调函数
fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
  if (err) throw err;
  console.log(data);
});
````
### Promise
回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。假定读取A文件之后，再读取B文件，代码如下。
```js
fs.readFile(fileA, 'utf-8', function (err, data) {
  fs.readFile(fileB, 'utf-8', function (err, data) {
    // ...
  });
});
```
不难想象，如果依次读取两个以上的文件，就会出现多重嵌套。
代码不是纵向发展，而是横向发展，很快就会乱成一团，无法管理。
因为多个异步操作形成了强耦合，只要有一个操作需要修改，它的上层回调函数和下层回调函数，可能都要跟着修改。
这种情况就称为"回调函数地狱"（callback hell）。

Promise 对象就是为了解决这个问题而提出的。
```js
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});

```
可以看到，Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。

Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚。

### 协程
举例来说，读取文件的协程写法如下。
```js
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
```
上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。

协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。
### 协程的 Generator 函数实现
整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。Generator 函数的执行方法如下。
```js
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }

```
Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，上例是执行到x + 2为止。
Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

### 把异步任务封装在 generator 中
下面看看如何使用 Generator 函数，执行一个真实的异步任务。
```js
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
```

上面代码中，Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。就像前面说过的，这段代码非常像同步操作，除了加上了yield命令。

执行这段代码的方法如下。
```js
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```
上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用next方法（第二行），执行异步任务的第一阶段。由于Fetch模块返回的是一个 Promise 对象，因此要用then方法调用下一个next方法。

可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。
ps:这里的不方便是真的，但是对于Promise的不方便却是因为底层使用了Promise接口导致的，
    真正的困难在于执行者如何知晓协程中第一阶段异步任务的完成
### 执行封装为 generator 的异步任务
#### 1. 手动next()
要求每个子任务都是同步的
#### 2. 回调函数+Thunk 函数
要求每个子任务都是 Thunk 函数
[Generator 函数的异步应用 - ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/generator-async#Thunk-函数)
#### 3. Promise 对象
Thunk 函数并不是 Generator 函数自动执行的唯一方案。因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象也可以做到这一点。

## 生成器
getPeriod
generator 具备协程的特性。
生成器内部有：yield, return, raise, try-catch
调用生成器的：.
## awatiable
We say that an object is an awaitable object if it can be used in an await expression.

awaitable

    An object that can be used in an await expression. Can be a coroutine or an object with an __await__() method. See also PEP 492.


# misc

## 休眠
time.sleep(secs)    使当前线程休眠指定的描述，secs可以是浮点数。

## 字符串格式化

1. python格式化共有两大风格，一是C语言的 % 风格，一个是花括号占位符风格 '{}'.   ps：JavaScript中，字符串模板占位符`${expr}`

## super
<https://www.runoob.com/python/python-func-super.html>

super(type[, object-or-type])
Python3.x 和 Python2.x 的一个区别是: Python 3 可以使用直接使用 super().xxx 代替 super(Class, self).xxx.
```py
class C(B):
    def method(self, arg):
        super().method(arg)    # This does the same thing as:
                               # super(C, self).method(arg)

```

如果省略第二个参数，则super（）返回的对象是unbound。
如果第二个参数是实例，则必须满足 isinstance(obj, type);
如果第二个参数是类型，则必须满足 issubclass(type2, type)；（比如classmethod的时候用到这种形式）。

super有两个典型用法
1. 在单继承的子类中使用 super().xxx 访问父类的属性/方法。此用法最接近于通常的OOP中的super
2. 在多继承中协作

