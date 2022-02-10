# python的类、对象、属性访问语法规则

[3.1. Objects, values and types](https://docs.python.org/3/reference/datamodel.html)
[8.7. Class definitions](https://docs.python.org/3/reference/compound_stmts.html#class-definitions)


python 中一切都是对象。每个对象都有一个id，一个type和一个value。
对象一经创建，其id和type都是不变的，可变对象的value是可变的，不变对象的value是不可变的。

id(o) 获取对象的id（一个整数），CPython 中此返回对象的内存地址；o1 is o2 用来判断
两个对象是否是同一个对象。PS: o1 is o2 是不是等价于 id(o1) == id(o2)？
type(o) 返回对象的类型（类型本身也是一个对象），对象的类型决定了对象的取值范围和允许的操作。

## 类定义的语法
```
classdef    ::=  [decorators] "class" classname [inheritance] ":" suite
inheritance ::=  "(" [argument_list] ")"
classname   ::=  identifier
```
```py
class Stu:
    def __init__(self, name):
        self.name = name
    def hello(self):
        print('hello', self.name)

s = Stu('Jack')
s.hello()
```

一个类定义是一条可执行语句。
inheritance给出的是基类列表，如果省略，则使用默认基类object。
```py
class Foo:pass
# 等价于
class Foo(object): pass
```

之后类定义语句在新的帧中执行，这个帧使用新创建的局部名称空间和原来的全局名字空间，执行完毕之后丢弃执行帧，但保留局部名字空间，
然后新建一个类对象，把刚刚保留的局部名字空间作为类对象的属性字典，最后在原局部名字空间中把类名字绑定到这个类对象上。

类的创建过程可以使用metaclass定制。

类也可以使用注解，就和函数注解一样。
```py
@f1(arg)
@f2
class Foo: pass

# 粗略地等价于

class Foo: pass
Foo = f1(arg)(f2(Foo))
```

注：类定义中定义的变量是类属性，类属性由类的所有实例共享。在方法中使用self.name = value语句可以定义实例属性。实例属性和类属性
都可以通过self.name语法访问。实例属性会隐藏同名的类属性。类属性的一个用途是充当实例属性的默认值，但此时要小心，如果类属性是一个
可变对象，可能会产生意料之外的结果。[描述符](https://docs.python.org/3/reference/datamodel.html#descriptors)也可以创建
实例属性。
> Programmer’s note: Variables defined in the class definition are class attributes; they are shared by instances. Instance attributes can be set in a method with self.name = value. Both class and instance attributes are accessible through the notation “self.name”, and an instance attribute hides a class attribute with the same name when accessed in this way. Class attributes can be used as defaults for instance attributes, but using mutable values there can lead to unexpected results. Descriptors can be used to create instance variables with different implementation details.
# 第二章 词法分析
2. Lexical analysis¶
## 2.3. Identifiers and keywords
### 2.3.2. Reserved classes of identifiers¶
Certain classes of identifiers (besides keywords) have special meanings. These classes are identified by the patterns of leading and trailing underscore characters:

`_*`    模块私有变量 `import *`

    Not imported by from module import *. The special identifier _ is used in the interactive interpreter to store the result of the last evaluation; it is stored in the builtins module. When not in interactive mode, _ has no special meaning and is not defined. See section The import statement.

`__*__`     系统定义的名字

    System-defined names, informally known as “dunder” names. These names are defined by the interpreter and its implementation (including the standard library). Current system names are discussed in the Special method names section and elsewhere. More will likely be defined in future versions of Python. Any use of `__*__` names, in any context, that does not follow explicitly documented use, is subject to breakage without warning.

`__*`   类私有名称

    Class-private names. Names in this category, when used within the context of a class definition, are re-written to use a mangled form to help avoid name clashes between “private” attributes of base and derived classes. See section Identifiers (Names).

ps: 私有名称混淆。这是词法作用域的处理，无关语义。
    样式：以两个或更多个下划线开头，且不以两个或更多个下划线结尾，视作私有名称。
    私有名称，在执行代码之前，进行文本混淆。
> Private name mangling: When an identifier that textually occurs in a class definition begins with two or more underscore characters and does not end in two or more underscores, it is considered a private name of that class. Private names are transformed to a longer form before code is generated for them. The transformation inserts the class name, with leading underscores removed and a single underscore inserted, in front of the name. For example, the identifier __spam occurring in a class named Ham will be transformed to _Ham__spam. This transformation is independent of the syntactical context in which the identifier is used. If the transformed name is extremely long (longer than 255 characters), implementation defined truncation may happen. If the class name consists only of underscores, no transformation is done.


# 第三章 数据模型

## 3.1 对象、值、类型
3.1. Objects, values and types¶
[3. Data model — Python 3.8.3 documentation](http://docs.localhost/python-3.8.3/reference/datamodel.html#objects-values-and-types)

Python 把数据抽象为对象（Object），Python的所有数据都可以用对象以及对象之间的关系来
表达。

每个都有id，type，value三个属性。id用于唯一标识一个对象，对象创建之后，其id不再改变。
运算符 `is` 用来测试两个变量指向的对象是否具有相同的id:`o1 is o2`。可以把对象的id理解为
其在内存中物理地址。函数`id()`用来获取对象id的整数表示：`id(o)`。
注：CPython中，id()返回的就是对象的内存地址。

对象的类型（type）决定了对象的值域以及它所支持的操作（或者，运算）。
函数`type(obj)`可获取对象obj的类型（类型对象本身也是对象）。对象的类型，也是不可变的。
注：在某些情形下，可以改变对象的类型，但这一般是非常不好的行为。

对象的值（value）有的可变，有的不可变。值不可变，叫不可变对象，否则叫可变对象。
对象是否可变，取决于其类型。例如：数字、字符串、元组都是不可变对象，列表、字典是可变对象。
注：假设某个不可变容器对象包含指向可变对象的元素，当被包含的可变对象的值改变时，容器
的值也随之改变，但仍认为此容器是不可变对象，因为该容器所包含的对象还是那些对象。
所以呢，不可变性并不严格等价于值不可变，这比较微妙。

没有显式销毁对象的方法，当对象不可达时，就可能被自动回收。实现可以推迟回收，甚至可以省略
回收，这随实现而定。
注：CPython 使用引用计数垃圾回收（并可选地实现循环依赖检测）。这样当对象不可达时，会
立刻被回收，但并不保证一定能回收环状依赖。另外不同实现可能使用不同策略，CPython将来有可能
改变算法。所以不应编写依赖于垃圾回收算法的程序。

需要指出的是，使用实现提供的跟踪或调试功能，会使得那些本应回收的对象继续存活。
用try...except捕获的异常对象也是如此。

某些对象会持有“外部资源”的引用（比如打开的文件、窗口等），当对象被回收时资源会一并释放，
但是垃圾回收并不一定会发生，所以此类对象都提供了显式释放资源操作（一般是close()方法），
强烈建议在程序中手动释放资源。try...finally和with语句都可以方便地达成这一目的。

有些对象包含其他对象引用，这类对象叫做容器，列表、元组、字典、集合都是容器的例子。
这些对象引用也是容器值的一部分，一般情形下，当我们讨论容器的值的时候，指的是被包含对象
的值而不是这些对象id。但当我们提及容器的不可变性时，使用的则是容器中元素的id。
所以当一个不可变容器（如元组）包含了可变对象时，容器的值会随着其内的可变元素的值的改变而
改变。

对象的类型影响了对象的几乎所有方面，甚至在某些程度上影响到了对象的id：
对于不可变对象，如果计算出来了新的值，实现可能返回指向一个已经存在的对象的引用，对于可变
对象，不允许这样做。例如，`a=1, b=1 `a和b可能指向同一个对象，也可能指向具有相同值的不同
对象（取决于实现），而`a=[]; b=[]`则保证a和b各自指向新创建的、互相独立的列表对象。
ps：a=b=[] 则是把a和b指向同一个对象。

## 3.2 标准类型层次

下面的列表是python内置类型清单。扩展模块可以额外提供别的内置类型，未来版本的python可能会
增加新的内置类型（大概率通过标准库的方式增加）。

某些类型的描述中会描述一些特殊的属性，它们是依赖于实现的，而非通用目的，所有它们可能会
在未来的版本删除。

### None
此类型有唯一的值，并有唯一的对象与该值对应，内置标识符`None`可以访问这个对象。
它的真值是 `False`。

>  It is used to signify the absence of a value in many situations, e.g.,
it is returned from functions that don’t explicitly return anything.

### NotImplemented
真值：True
值：NotImplemented

This type has a single value. There is a single object with this value. This object is accessed through the built-in name `NotImplemented`. Numeric methods and rich comparison methods should return this value if they do not implement the operation for the operands provided. (The interpreter will then try the reflected operation, or some other fallback, depending on the operator.) Its truth value is true.

### Ellipsis
真值：True
值:... 或 Ellipsis
> This type has a single value. There is a single object with this value. This object is accessed through the literal ... or the built-in name Ellipsis. Its truth value is true.

### numbers.Number
此类值由数值字面值创建，或由数学运算符和内置数学函数返回。数值对象都是不可变的。
Python区分整数、浮点数、复数。
```py
>>> import numbers
>>> numbers.Number
<class 'numbers.Number'>
>>> numbers.Integeral
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: module 'numbers' has no attribute 'Integeral'
```
#### number.Integeral
有两种类型的整数：
number.Integer(int):    整数，无限精度。
number.Boolean(bool):   布尔值，True，False。是整数的子类型。

布尔值在转换成字符串时分别为"True"和"False"，转换成数值时，True是1，False是0.

```py
>>> int.__bases__
(<class 'object'>,)
>>> bool.__bases__
(<class 'int'>,)
```
#### number.Real(float)
机器平台相关的双精度浮点数。
Python不提供单精度浮点数。Python 不需要提供两种精度的浮点数。
#### number.Complex(complex)

复数分实部和虚部，二者都用float表示（即依赖于平台的双精度浮点数）
```py
>>> z=1j+2
>>> z
(2+1j)
>>> z.real
2.0
>>> z.imag
1.0
```
#### 类型关系
```py
(<class 'int'>,)
>>> type(1+j)
<class 'complex'>
>>> type(1)
<class 'int'>
>>> type(1.2)
<class 'float'>
>>> type(True)
<class 'bool'>

>>> float.__bases__
(<class 'object'>,)
>>> int.__bases__
(<class 'object'>,)
>>> complex.__bases__
(<class 'object'>,)
>>> bool.__bases__
(<class 'int'>,)

>>> numbers.Number.__bases__
(<class 'object'>,)
……
```
numbers模块给用户提供了自定义仿制数值内置类型的接口。
### Sequences
序列：是有序有限元素构成的集合，每个元素有一个非负整数编号。内置函数`len(s)`可以获取
序列s的元素个数。
序列支持下表访问：
序列支持切片：`s[i:j]` 的结果是一个新的序列：`s[k], i<= k <j`。
某些序列支持“扩展的切片”：`s[i:j:k]`,`s[x], i<= x <j, x=n*k, n>=0`

序列首先分为可变序列和不可变序列
#### 不可变序列：str, tuple, bytes
python中的字符串，是Unicode代码点（范围U+0000 - U+10FFFF）的序列。
python没有char类型，可以使用长度为1的字符串类型充当char。
内置函数`ord(ch)`返回字符ch对应的码点值（十进制整数），
而`chr(num)`把码点值num转换为对应的字符。
str.encode() 把 str 转为bytes，bytes.decode() 把 bytes 解码为str。
默认编解码使用“UTF-8”，可以手动指定 `b'abc'.decode('UTF-8')`

1. 字符串字面值、str()类型转换可以得到str实例。
2. 逗号分隔的两个或两个以上的表达式，构成元组。空括号构成空元组，一个元素元组需要加逗号。
```py
>>> 1,2,3
(1, 2, 3)
>>> (1,)
(1,)
>>> ()
()
```
#### 可变序列：list，bytearray
可变序列在创建后可以改变，下标和切片可以作为赋值语句和del语句的目标操作数。
```py
>>> lst = [1,2,3]
>>> lst
[1, 2, 3]
>>> lst[1:3] = [4,5]
>>> lst
[1, 4, 5]
>>> del lst[2]
>>> lst
[1, 4]
```
用构造函数`bytearray()`创建 bytearray，除了是可变对象之外，其接口于bytes相同。

### sets
不可变对象构成的集合，其内的元素有限、无序、不重复。
包括set和frozenset。len()函数用于获取集合内元素的个数。
集合常用于：快速测试成员资格、去除列表中的重复元素、数学集合运算（并交补差、对称差集）。
集合中的值和字典key的值有同样的要求（见下文）。

set是可变的。fromzenset是不可变的。

花括号语法可用于构建非空集合对象。
Non-empty sets (not frozensets) can be created by placing a comma-separated
list of elements within braces, for example: {'jack', 'sjoerd'}.

### mapping
映射，是可以用任意值作为元素索引的容器，a[k]访问a中索引为k的元素，此表达式可用于赋值
语句和del语句的目标。内置函数len（）返回字典中的键值对个数。

当前有且仅有唯一一种内置映射类型：字典。
字典对用作key的值不能是下面的情况之一：
1. 值包含列表或者字典，或
2. 包含可变类型的值且使用值而不是对象的id判断相等性。
注：某对象可作为字典的key，当且仅当此对象是可哈希的。
注：数值类型的比较遵循一般数学规则：1.0和1认为是相等的。
>  The only types of values not acceptable as keys are values containing lists or dictionaries or other mutable types that are compared by value rather than by object identity, the reason being that the efficient implementation of dictionaries requires a key’s hash value to remain constant. Numeric types used for keys obey the normal rules for numeric comparison: if two numbers compare equal (e.g., 1 and 1.0) then they can be used interchangeably to index the same dictionary entry.

字典是可变对象。

自 3.6开始，字典保存元素的插入顺序：也就是，遍历字典元素的顺序和元素插入字典的顺序保持一致。
替换某key对应的值不改变其位置，但先删除再插入某个key，则会使得此key对应的元素处于最末尾。

#### 注：可哈希的
称某个对象是可哈希的，当且仅当此对象创建后其哈希值不再改变，且此对象可以和其它对象作比较。
注：隐含要求对象实现`__hash__()`方法和`__eq__()`方法。
注：两个相等对象的哈希值必须相同。

- Python中绝大多数内置不可变对象都是可哈希的
- 可变容器是不可哈希的
- 不可变容器是可哈希的当且仅当其内的所有元素都是可哈希的
- 用户自定义类型的对象默认是可哈希的：它们之间互不相等，且以id作为哈希值。
> Most of Python’s immutable built-in objects are hashable; mutable containers (such as lists or dictionaries) are not; immutable containers (such as tuples and frozensets) are only hashable if their elements are hashable. Objects which are instances of user-defined classes are hashable by default. They all compare unequal (except with themselves), and their hash value is derived from their id().

可哈希的充要条件：
1. 哈希值不发生改变
2. 互相之间可比较且相等的对象拥有相同哈希值
从可哈希的充要条件可以得出如下特性：
1. 不相等的对象可以返回相同的哈希值，这叫哈希碰撞。
2. 可哈希对象一定是不可变的？

#### 注：不可变的

immutable

An object with a fixed value. Immutable objects include numbers, strings and tuples.
Such an object cannot be altered. A new object has to be created if a different
value has to be stored. They play an important role in places where a constant
hash value is needed, for example as a key in a dictionary.

这里有个矛盾之处：
定义不可变对象为值不发生变化的对象。
又说了元组属于不可变对象，还说了如果元组中包含可变对象的元素，而这个可变对象的值发生了改变
，则元组的值就发生了改变，但值发生了改变不就说明元组是可变对象了吗？

TMD。

### callable types:自定义函数、实例方法、类、实例
可以执行函数调用操作的类型。
#### 用户定义的函数
```py
def hello():
    print('hello')
```
用户定义函数的特殊属性:
```
__doc__     可写        函数的文档字符串或None。
__name__    可写        函数的名字
__qualname__ w          函数的全限定名
__module__   w          函数定义所在的模块名，或None
__defaults__ w          位置参数默认值构成的元组，或None
__code__     w          代表编译后的函数代码的对象
__globals__  只读       函数的全局符号表。
__dict__        w       用于保存函数对象定义的任意属性的名字空间
__closure__  只读       cell构成的元组，或None。每个cell对应函数的一个自由变量。
__annotations__ w       保存了函数注解的字典。
__kwdefaults__  w       有默认值的仅关键字参数，构成的字典。
```
用户自定义函数对象可以用普通的句点成员访问设置/读取任意的属性，这一特性可用于为函数设置
元数据。
#### instance methods
一个实例方法由三部分组成：类、类的实例、可调用对象。
> An instance method object combines a class, a class instance and any callable object (normally a user-defined function).
实例方法有四个特殊属性：
```
__self__        实例对象
__func__        底层可调用对象
__doc__         文档字符串，等价于 __func__.__doc__
__name__        函数名
__module__      函数定义所在的模块名，或None
```
方法支持访问底层函数的任意属性（但不支持设置属性）。
Methods also support accessing (but not setting) the arbitrary function attributes on the underlying function object.

一种创建用户定义方法途径：获取类的属性（比如通过此类的一个实例），且这个属性是一个用户定义函数对象
或者类方法对象（@classmethod）。
User-defined method objects may be created when getting an attribute of a class (perhaps via an instance of that class), if that attribute is a user-defined function object or a class method object.

经由类的实例访问类的用户定义函数属性，得到的新创建的实例方法对象，它的`__self__`指向这个实例，
并称这个方法对象是绑定了的。它的`__func__`指向原函数对象。
When an instance method object is created by retrieving a user-defined function object from a class via one of its instances, its `__self__` attribute is the instance, and the method object is said to be bound. The new method’s `__func__` attribute is the original function object.

通过实例，访问类的类方法属性，得到的是新创建的实例方法，它的`__self__`指向类，它的`__func__`指向类方法之下的函数对象。
When an instance method object is created by retrieving a class method object from a class or instance, its `__self__` attribute is the class itself, and its `__func__` attribute is the function object underlying the class method.

当调用实例方法时，底层的`__func__`函数被实际调用，调用时把`__self__`插入实参列表的最前头。
例如，设类C有一个函数定义f，而x是C的实例，则 `x.f(1)` 被转换为函数调用 `C.f(x, 1)`。

When an instance method object is called, the underlying function (`__func__`) is called, inserting the class instance (`__self__`) in front of the argument list. For instance, when C is a class which contains a definition for a function f(), and x is an instance of C, calling x.f(1) is equivalent to calling C.f(x, 1).

若实例方法衍生自类方法，则`__self__`实际指向类本身，而非类的实例，所以 x.f(1)，C.f(1), 都等价于 f(C,1)
When an instance method object is derived from a class method object, the “class instance” stored in `__self__` will actually be the class itself, so that calling either x.f(1) or C.f(1) is equivalent to calling f(C,1) where f is the underlying function.

普通函数，A.fun 和 `a.fun.__fun__` 是一回事，都指向原来的函数。
```py
def hello(*args):print(args)

class A:
    hello = hello
a=A()
```
`A.hello == hello == a.hello.__func__ != a.hello`

而类方法有些不同，A.fun和a.fun是一回事，而 `A.fun.__func__`才是真正的原来的函数。
```py
class B:
    @classmethod
    def fun(*args):print(args)

>>> B.fun(12)
(<class '__main__.B'>, 12)
>>> b=B()
>>> b.fun(12)
(<class '__main__.B'>, 12)
>>> B.fun.__func__(12)
(12,)
>>>
```

1. 每次从实例读取属性的时候发生一次转换
2. 仅对于用户定义的函数才会发生转换，其它可调用对象（以及所有的不可调用对象）都不发生转换
    Q. 特殊函数是用户定义函数吗？应该是的
3. 用户定义函数，如果是实例属性，也不会发生转换，仅当它作为类属性时转换机制才生效
Note that the transformation from function object to instance method object happens each time the attribute is retrieved from the instance. In some cases, a fruitful optimization is to assign the attribute to a local variable and call that local variable. Also notice that this transformation only happens for user-defined functions; other callable objects (and all non-callable objects) are retrieved without transformation. It is also important to note that user-defined functions which are attributes of a class instance are not converted to bound methods; this only happens when the function is an attribute of the class.
#### Generator functions
使用了yeid语句的函数或方法叫做生成器函数。
> A function or method which uses the yield statement (see section The yield statement) is called a generator function.
调用生成器函数，总是返回一个迭代器对象。
……
#### Coroutine functions
使用 async def 定义的函数或方法就是协程函数。
调用协程函数，总是返回一个协程对象。
协程函数可以使用 await，async with, async for 这三种语句。

A function or method which is defined using async def is called a coroutine function. Such a function, when called, returns a coroutine object. It may contain await expressions, as well as async with and async for statements. See also the Coroutine Objects section.
#### Asynchronous generator functions
使用 async def 定义，且使用了 yield 语句的函数叫异步生成器函数。
A function or method which is defined using async def and which uses the yield statement is called a asynchronous generator function.
……
#### Built-in functions
内置函数，是对应C函数的封装。例如len(),math.sin()。
有如下特殊属性（都是只读的）：
```
__name__    函数的名字
__doc__     文档。或None
__self__    None
__module__  函数定义所在的模块，或None
```
#### Built-in methods
类似内置函数，但是它的 `__self__` 属性指向实例对象，底层C函数会接收到额外的参数（就是那个实例）。
例如，假设 alist.append() 是一个内置方法，则`append.__self__`就指向alist
#### Classes
类都是可调用对象。
一般来讲，类对象都是作为用于新建自身实例工厂，但可以通过重写`__new__()`方法调整这一行为。
调用类时传入的实参会被原样传递给 `__new__()`和（在默认情况下）`__init__()`。
Classes are callable. These objects normally act as factories for new instances of themselves, but variations are possible for class types that override `__new__()`. The arguments of the call are passed to `__new__()` and, in the typical case, to `__init__()` to initialize the new instance.

#### Class Instances
如果某个实例所属的类定义了 `__call__()`方法，则此实例就是可调用的。
### modules
模块是Python组织代码的基本单元。
模块由 import system 创建，import 语句、类似 importlib.import_module() 的函数调用，
都是调用了 import system。

每个模块都有一个名称空间，是个字典，模块对象有特殊属性:`__dict__`。属性访问查找此字典，属性赋值更新此字典。
（模块中定义的函数对象的`__globals__`实际就指向此字典）。
模块内部还有一些内置变量：
```
__name__    w   模块名
__doc__     w   文档字符串或None
__file__     w   定义模块的文件（如果模块是从文件载入的）
__dict__    只读
```
第5章，介绍 import system
### 自定义类
Custom classes

自定义类一般是通过类定义语句创建的。
```py
class C:pass
```
类有一个名字空间，它实现为一个字典对象，对类属性的引用（class attribute reference）
就转换为对该字典对象的查找。
`C.x`变为`C.__dict__['x']`。
ps：二者还是略有不同的，找不到的时候，前者抛出AttributeError，而后者抛出KeyError。
```py
>>> C.y
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: type object 'C' has no attribute 'y'
>>> C.__dict__['y']
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'y'
```
如果类自身的名字空间中找不到指定的属性，会继续查找它的基类。考虑到多继承，使用 C3 MRO 算法。
Q.会到它的元类查找吗？
会。类作为元类的实例，直接访问类的属性，会查找它的元类，就和普通实例会搜索它的类一样。
```py
class M(type): name = 'M'
class C(metaclass=M): gender='F'
>>> C.name
'M'
```
Q. 哦，那基类和元类同时存在，先找哪一个？就像下面这样，当我访问 S.name 的时候，实际访问的是哪个？
```py
class M2(type):name='M2'
class P:name='P'
class S(P,metaclass=M2):age=1
```
先找的是父类
```py
>>> S.name
'P'
>>> s = S()
>>> s.name
'P'
>>>
```
ps: 也只有类会同时有父类和所属类型。普通的实例对象，只有类对象，没有父类对象，所以是沿着所属
类型的继承链查找到。

如果 class attribute reference 的值是一个类方法对象（class method object），它会被
封装为实例方法（`__self__`指向类），然后返回实例方法；
如果  class attribute reference 的值是一个 static method object，
> When it would yield a static method object, it is transformed into the object wrapped by the static method object.
属性描述符，可以定制从类访问属性时的行为。
> See section Implementing Descriptors for another way in which attributes retrieved from a class may differ from those actually contained in its `__dict__`.

对类属性赋值，只更新类自身的名字空间，不会影响它的父类。

类有特殊属性：
```
__name__    类名字
__module__  类定义所在的模块
__dict__    类的名字空间。这是个字典
__doc__     类的文档字符串，或者None
__bases__   类的直接父类，一个元组。
```
### 类的实例
Class instances
类实例是通过调用类创建的。
类实例也有一个名字空间，这个名字空间也实现为一个字典。
实例属性引用，首先在实例的字典空间查找给定属性，如果没有，就去所属类以及它的父类的字典中找（但
不会去元类的字典中找），如果还没有，就尝试可选的`__getattr__`方法。

如果实例属性引用是在类的名字空间中得到的，
若这个属性是一个用户定义的函数对象，则会把它封装为实例方法后返回。
类方法和静态方法也会被转换那么一次。

对实例属性赋值，只会更新实例自身的名字空间，不会影响到它所属的类。

特殊属性：`__class__`指向实例的类。`__dict__`指向属性字典。

ps:特殊函数，也是照封不误。
```py
class C:
    def __str__(self):
        return 'C'

c = C()
>>> c.__str__
<bound method C.__str__ of <__main__.C object at 0x0000020CAE428C08>>
>>> c.__str__.__func__
<function C.__str__ at 0x0000020CAE252EE8>
>>>
```
### IO对象（也叫文件对象）
文件对象代表一个打开的文件。
函数`open()`，方法 os.popen(), os.fdopen(), 套接字对象的 mkefile()，都是创建文件对象的途径。
sys.stdin/stdou/stderr 是预定义的三个文件对象，它们代表控制台输入输出。它们是在文本模式下打开
的，和 io.TextIOBase 接口保持一致。

A file object represents an open file. Various shortcuts are available to create file objects: the open() built-in function, and also os.popen(), os.fdopen(), and the makefile() method of socket objects (and perhaps by other functions or methods provided by extension modules).

The objects sys.stdin, sys.stdout and sys.stderr are initialized to file objects corresponding to the interpreter’s standard input, output and error streams; they are all open in text mode and therefore follow the interface defined by the io.TextIOBase abstract class.
### 内部类型
Internal types
……

## 3.3. 特殊方法
[3.3. Special method name](https://docs.python.org/3/reference/datamodel.html#special-method-names)

特殊方法，是python提供的操作符重载机制。把某个特殊方法设为None，表示不支持此操作符。
PS: 一切类都继承object,当前类找不到的属性会去基类中查找,object实现了如下特殊方法
```py
>>> dir(object)
['__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__']
```
### 3.3.1 基本定制
#### object.__new__(cls[, ...])
创建类cls的实例时调用此方法，cls是类本身，剩余的参数是cls中的参数。
方法应当返回一个实例对象（通常是cls的实例）。
new是静态方法，可以省略指定静态方法的语法（@staticmethod）。

典型是实现是：先调用父类的 `__new__()` 方法：`super().__new__(cls[, ...])`获得新实例，
然后做定制修改，最后返回修改后的实例。
```py
class B:pass

class A(B):
    def __new__(cls,name, grade):
        obj = super().__new__(cls, name);
        obj.grade = grade
```

如果new返回的是cls或其子类的实例，则新实例的`__init__`方法会被调用；
如果返回的不是cls的实例，则不会调用新实例的`__init__`方法。

> If `__new__()` is invoked during object construction and it returns an instance or subclass of cls, then the new
> instance’s `__init__()` method will be invoked like `__init__(self`[, ...]), where self is the new instance and the
> remaining arguments are the same as were passed to the > object constructor.
>
> If `__new__()` does not return an instance of cls, then the new instance’s `__init__()` method will not be invoked.

设计此方法的主要动机是允许不可变类型（tuple、str……）的子类定制实例创建过程；
也常常在自定义元类中重写此方法以定制类创建过程。

ps:因为new是静态方法，所以调用父类的new方法时需要手动传入参数cls。
而 init 是实例方法，所以调用父类的init方法时，不需要手动传入self。
pps: new 是静态方法，但被调用到时候，Python 还是给他传入了一个约定的参数 cls。
#### object.__init__(self[, ...])
在实例创建完成之后，返回给调用者之前，执行此方法。
如果父类也定义了 `__init__()` 方法，则子类的`__init__()`方法（如果有的话）必须显式调用方父类的这个方法:`super().__init__(self[,args...])`，以确保实例中的父类部分得以正确初始化。
init方法的返回值只能是None，否则抛出TypeError。

> Called after the instance has been created (by `__new__()`), but before it is returned to the caller. The arguments are
> those passed to the class constructor expression. If a base class has an `__init__()` method, the derived class’s
> `__init__()` method, if any, must explicitly call it to ensure proper initialization of the base class part of the
> instance; for example: super().`__init__([args...])`.

Q。new和init都像是构造器，二者的区别？
1. new 是创建实例，init是初始化实例
2. new 有返回值，返回的是新实例，init不允许有返回值。
#### object.__del__(self)
对象销毁之前调用此方法。
python程序结束时仍存在的对象，不保证它们的del方法会被调用。

Called when the instance is about to be destroyed. This is also called a finalizer or (improperly) a destructor. If a base class has a __del__() method, the derived class’s __del__() method, if any, must explicitly call it to ensure proper deletion of the base class part of the instance.

It is possible (though not recommended!) for the __del__() method to postpone destruction of the instance by creating a new reference to it. This is called object resurrection. It is implementation-dependent whether __del__() is called a second time when a resurrected object is about to be destroyed; the current CPython implementation only calls it once.

It is not guaranteed that __del__() methods are called for objects that still exist when the interpreter exits.

> del x doesn’t directly call x.__del__() — the former decrements the reference count for x by one, and the latter
> is only called when x’s reference count reaches zero.

#### object.__repr__(self)
由内置函数 repr() 调用，这个方法必须返回一个字符串。如果可能的话，这个字符串应当是一个合法的python表达式，且此表达式
的执行结果恰好可得到和当前对象相同的值，如果不可能，也应当提供尽量详细的描述性信息。
这个方法一般用于调试，所以其返回的信息一定要丰富且无歧义。
另外，如果一个类定义了repr且没有定义str，那么内置函数str会调用对象的repr方法代替str。

Called by the repr() built-in function to compute the “official” string representation of an object. If at all possible, this should look like a valid Python expression that could be used to recreate an object with the same value (given an appropriate environment). If this is not possible, a string of the form <...some useful description...> should be returned. The return value must be a string object. If a class defines __repr__() but not __str__(), then __repr__() is also used when an “informal” string representation of instances of that class is required.

This is typically used for debugging, so it is important that the representation is information-rich and unambiguous.
#### object.__str__(self)
由内置函数 str()、format()、print() 调用，此方法应当返回对象的字符串表示。
此方法的默认实现由object提供，是调用`object.__repr__()`
> The default implementation defined by the built-in type object calls `object.__repr__()`.
####  object.__bytes__(self)
由内置函数 bytes() 调用，以获得对象的字节表示形式。

####  object.__format__(self, format_spec)
由内置函数format()、格式化字符串字面值（f'hello, {name}')、str.format() 方法调用。
要求必须返回str的实例。
自 3.4，`object.__format__(x, '')`中的格式说明符必须是空字符串，否则抛出 TypeError
自 3.7，`object.__format__(x, '')` 等价于 str(x),而不是format(str(self), '').

#### __lt__/__le__/__eq__/__ne__/__gt__/__gt__(self, other)
这些叫做“rich comparison”方法。
`x<y`  调用 `x.__lt__(y)`
`x<=y` 调用 `x.__le__(y)`
`x==y` 调用 `x.__eq__(y)`
`x!=y` 调用 `x.__ne__(y)`
`x>y`  调用 `x.__gt__(y)`
`x>=y` 调用 `x.__ge__(y)`

如果比较成功，应当返回True或False。如果不支持参与比较大某对参数，可以返回NotImplemented。
方法可以返回任意值，此时python会调用 bool(ret) 查看它的真值。

默认，`x.__eq__(y)` 自动实现为 `not x.__eq__(y)`，除非后者返回NotImplemented。
除此之外，别的运算符不存在类似关系。比如，`(x<y or x==y) does not imply x<=y`。


See the paragraph on __hash__() for some important notes on creating hashable objects which support custom comparison operations and are usable as dictionary keys.

`x.__eq__(y)`中，当x和y是不同类型时，
若y是x的子类，则转为`y.__eq__(x)`，
若y不是x的子类，则仍然用`x.__eq__(y)`。

lt和gt互为映像，le和ge互为映像，eq和ne是其自身的映像。
There are no swapped-argument versions of these methods (to be used when the left argument does not support the operation but the right argument does); rather, __lt__() and __gt__() are each other’s reflection, __le__() and __ge__() are each other’s reflection, and __eq__() and __ne__() are their own reflection. If the operands are of different types, and right operand’s type is a direct or indirect subclass of the left operand’s type, the reflected method of the right operand has priority, otherwise the left operand’s method has priority. Virtual subclassing is not considered.

#### object.__hash__(self)
由内置函数hash()调用，也提供给哈希集合(set,frozenset)使用。方法应当返回整数。

hash和eq的制约关系：
1. eq判定相等的对象，其hash码必须相等
2. eq判定不相等的对象，其hash码可以相等，但最好不要这样。
PS：哈希码和这些约定是根据哈希表的结构定制的。

#### object.__bool__(self)
由内置函数bool()调用，把对象转为布尔值。
此方法应当返回True或False。
对象真值：
1. 如果有 bool 则使用它的返回值
2. 否则，如果有 len，则使用len的返回值（0为False，非零为True）
3. 否则，一律为True

### 3.3.2 自定义属性访问
[3.3.2. Customizing attribute access](http://docs.localhost/python-3.8.3/reference/datamodel.html#customizing-attribute-access)

#### 这些方法
通过定义如下方法，可自定义类实例属性访问的语义。
The following methods can be defined to customize the meaning of attribute
access (use of, assignment to, or deletion of x.name) for class instances.

##### `object.__getattr__(self, name)`

当默认属性查找失败（抛出AttributeError）时，调用此方法。
该方法应当返回对应的属性值或者抛出 AttributeError.

注：如果正常的属性查找成功，就不会调用这个方法. 如此一是效率，二是，如果把这个置于
正常查找流程之前，则一旦定义这个方法，就无法再访问实例的其它任何属性了。
注：`__getattr__`和`__setattr__`的不对称是有意这么设计的的。

```py
"""
默认情况下，访问不存在的属性，会抛出 AttributeError

"""
# 动态返回属性
class Student(object):

    def __init__(self):
        self.name = 'Michael'

    def __getattr__(self, attr):
        if attr=='score':
            return 99
>>> s = Student()
>>> s.name
'Michael'
>>> s.score
99

# 对不存在的属性返回None而不是报错
class A:
    def __init__(self, a):
        self.a = a
    def __getattr__(self, name):
        return None
a = A(3)

>>> print(a.a)
3
>>> print(a.b)
None
>>>
```
##### `object.__getattribute__(self, name)`

访问实例属性时，无条件调用这个方法。它应当返回属性值或者抛出AttributeError.
注1：如果同时定义了`__getattr__()`，则`__getattr__`会被调用当且仅当getattribute抛出
Attribute异常，或者getattribute直接调用了getattr
注2：如果此方法要访问任何其它属性，必须调用基类的方法（例如 `object.__getattribute__(self, name)`），否则导致无限递归。
注3：内置函数或语法层面的对特殊方法的（隐式）调用，会越过此方法的拦截。
> This method may still be bypassed when looking up special methods as the result of implicit invocation via language syntax or built-in functions. See Special method lookup.

[Special method lookup](https://docs.python.org/3/reference/datamodel.html#special-lookup)

##### `object.__setattr__(self, name, value)`

Called when an attribute assignment is attempted. This is called instead of the normal mechanism (i.e. store the value in the instance dictionary). name is the attribute name, value is the value to be assigned to it.

If `__setattr__()` wants to assign to an instance attribute, it should call the base class method with the same name, for example, `object.__setattr__(self, name, value)`.
ps:或 `super().__setattr__(name, value)`.

##### object.__delattr__(self, name)
##### object.__dir__(self)
此方法会在对相应对象调用 dir() 时被调用。返回值必须为一个序列。 dir() 会把返回的序列转换为列表并对其排序。

#### 3.3.2.1 模块属性访问
1. `__getattr(prop_name:str)__`和 `__dir__()`
2. 继承 types.ModuleType并用它覆盖模块的`__class__`属性

#### 3.3.2.2 实现描述符
[3.3.2.2. Implementing Descriptors](http://docs.localhost/python-3.8.3/reference/datamodel.html#implementing-descriptors)

描述符必须出现在类或者父类的字典中才是有效的。
注：在下面的叙述中，“属性”是指这样的属性，它的名字是 owner class的`__dict__`中存在的key。
> The following methods only apply when an instance of the class containing the method (a so-called descriptor class) appears in an owner class (the descriptor must be in either the owner’s class dictionary or in the class dictionary for one of its parents). In the examples below, “the attribute” refers to the attribute whose name is the key of the property in the owner class’ `__dict__`.
注：
描述符协议（descriptor protocol）中约定了这些方法：`__get__(), __set__(), and __delete__()`
描述符（descriptor）：即定义了描述符协议中约定部分或全部的方法的对象。

描述符类（descriptor class）定义了描述符协议中约定部分或全部的方法的对象类。
被代理类（owner class）：设置了描述符属性的类。

```py
"""
"""
# 定义描述符类
class Des:
    def __get__(self, instance, owner=None):
        pass
    def __set__(self, instance, value):
        pass

class A:
    x = Des()

a.x = 13
print(a.x)
```
上面的示例代码中，Des是 descriptor class，A是 Des 的 owner class，x 是一个 descriptor。

- `object.__get__(self, instance, owner=None)`
class attribute access 和 instance attribute access 都可以触发此方法调用。

可选的 owner 参数是所有者类而 instance 是被用来访问属性的实例，如果通过 owner 来访问属性则返回 None。
- class attribute access中，instance 是 Nono，owner 是被代理的类
- instance attribute access中，instance 指向实例，owner 指向类。
此方法应当返回计算得到的属性值或是引发 AttributeError 异常。

PEP 252 指明 `__get__()` 为带有一至二个参数的可调用对象。
Python 自身内置的描述器支持此规格定义；
但是，某些第三方工具可能要求必须带两个参数。
Python 自身的 `__getattribute__()` 实现总是会传入两个参数，无论它们是否被要求提供。

- `object.__set__(self, instance, value)`
为实例 instance 的属性赋值 value 时，可以触发此方法的调用。

请注意，添加 `__set__()` 或 `__delete__()` 会将描述器变成“数据描述器”。 更多细节请参阅 发起调用描述器。

- `object.__delete__(self, instance)`
删除 instance 指定的所有者类的实例的属性时会触发此方法的调用。

- `object.__set_name__(self, owner, name)`
在所有者类 owner 创建时被调用。描述器会被赋值给 name。

注解 `__set_name__()` 只在 type 构造器创建类对象的时候被隐式地调用，
因此在某个类被初次创建之后额外添加的描述器，需要显式地调用它并且附带适当的形参:
```py
class A:
   pass
descr = custom_descriptor()
A.attr = descr
descr.__set_name__(A, 'attr')
```
详情参见 创建类对象。
#### 3.3.2.3 触发描述符
[Invoking Descriptors](http://docs.localhost/python-3.8.3/reference/datamodel.html#invoking-descriptors)
描述符协议（descriptor protocol）中约定了这些方法：`__get__(), __set__(), and __delete__()`
描述符（descriptor）：即定义了描述符协议中约定部分或全部的方法的对象。
从被代理类的角度，描述符是一个绑定了自定义行为的属性。

属性访问的默认行为是从一个对象的字典中获取、设置或删除属性。
`a.__dict__['x']` 开始，然后是 `type(a).__dict__['x']`，接下来依次查找 `type(a)` 的上级基类，不包括元类。
> The default behavior for attribute access is to get, set, or delete the attribute from an object’s dictionary. For instance, a.x has a lookup chain starting with `a.__dict__['x']`, then type(a).__dict__['x'], and continuing through the base classes of type(a) excluding metaclasses.

如果查找到结果是一个描述符对象，描述符协议就生效了。
However, if the looked-up value is an object defining one of the descriptor
methods, then Python may override the default behavior and invoke the descriptor
method instead. Where this occurs in the precedence chain depends on which
descriptor methods were defined and how they were called.

描述器发起调用的开始点是一个绑定 a.x。参数的组合方式依 a 而定:

- 直接调用: 最简单但最不常见的调用方式是用户代码直接发起调用一个描述器方法: `x.__get__(a)`。

- 实例绑定: 如果绑定到一个对象实例，a.x 会被转换为调用: `type(a).__dict__['x'].__get__(a, type(a))`。

- 类绑定: 如果绑定到一个类，A.x 会被转换为调用: `A.__dict__['x'].__get__(None, A)`。

- 超绑定: 如果 a 是 super 的一个实例，则绑定 super(B, obj).m() 会在` obj.__class__.__mro__ `中搜索 B 的直接上级基类 A 然后通过以下调用发起调用描述器: `A.__dict__['m'].__get__(obj, obj.__class__)`。

对于实例绑定，发起描述器调用的优先级取决于定义了哪些描述器方法。
一个描述器可以定义 `__get__()`、`__set__()` 和 `__delete__()` 的任意组合。
如果它没有定义 `__get__()`，则访问属性会返回描述器对象自身，除非对象的实例字典中有相应属性值。
如果描述器定义了 `__set__()` 和/或 `__delete__()`，则它是一个数据描述器；如果以上两个都未定义，则它是一个非数据描述器。
通常，数据描述器会同时定义 `__get__()` 和 `__set__()`，而非数据描述器只有 `__get__()` 方法。
定义了 `__set__()` 和 `__get__()` 的数据描述器总是会重载实例字典中的定义。与之相对的，非数据描述器可被实例所重载。
Q：只定义了 `__set__()`或`__delete__()`的数据描述符呢？
Q：只定义了 `__delete__()`和`__get__()`的数据描述符呢？
![picture 2](../../images/32749ee44c957aaa6ef312b9c1b7f991cf5141ea4f4459a673950f6776740791.png)

描述符总结：
1. 读取操作:没有 `__get__()`，是普通属性的逻辑；有`__get__()`，是数据描述符时一律拦截，不是的时候仅当实例字典不存在同名属性时才拦截。
2. 写/删操作:不是数据描述符，是普通属性删除逻辑；是数据描述符，一律拦截。
ps：数据描述符，是指定义了`__delete__(self, ins)`和`__set__(self, ins, value)` 中至少一个的对象。

Python 方法 (包括 staticmethod() 和 classmethod()) 都是作为非数据描述器来实现的。因此实例可以重定义并重载方法。
这允许单个实例获得与相同类的其他实例不一样的行为。

property() 函数则是作为数据描述器来实现的。因此实例不能重载特性属性的行为。

#### 3.3.2.4 `__slots__`
1. 插槽可以限制对象的数据成员
2. 插槽可以显著提升性能
> `__slots__` allow us to explicitly declare data members (like properties) and deny the creation of `__dict__` and `__weakref__` (unless explicitly declared in `__slots__` or available in a parent.)

object.`__slots__`
这个类变量可赋值为字符串、可迭代对象或由实例使用的变量名构成的字符串序列。 `__slots__` 会为已声明的变量保留空间，并阻止自动为每个实例创建 `__dict__` 和 `__weakref__`。
##### 3.3.2.4.1. Notes on using __slots__
```
当继承自一个未定义 __slots__ 的类时，实例的 __dict__ 和 __weakref__ 属性将总是可访问。

没有 __dict__ 变量，实例就不能给未在 __slots__ 定义中列出的新变量赋值。尝试给一个未列出的变量名赋值将引发 AttributeError。新变量需要动态赋值，就要将 '__dict__' 加入到 __slots__ 声明的字符串序列中。

如果未给每个实例设置 __weakref__ 变量，定义了 __slots__ 的类就不支持对其实际的弱引用。如果需要弱引用支持，就要将 '__weakref__' 加入到 __slots__ 声明的字符串序列中。

__slots__ 是通过为每个变量名创建描述器 (实现描述器) 在类层级上实现的。因此，类属性不能被用来为通过 __slots__ 定义的实例变量设置默认值；否则，类属性就会覆盖描述器赋值。

__slots__ 声明的作用不只限于定义它的类。在父类中声明的 __slots__ 在其子类中同样可用。不过，子类将会获得 __dict__ 和 __weakref__ 除非它们也定义了 __slots__ (其中应该仅包含对任何 额外 名称的声明位置)。

如果一个类定义的 slot 在某个基类中也有定义，则由基类 slot 定义的实例变量将不可访问（除非通过直接从基类获取其描述器的方式）。这会使得程序的含义变成未定义。未来可能会添加一个防止此情况的检查。

非空的 __slots__ 不适用于派生自“可变长度”内置类型例如 int、bytes 和 tuple 的派生类。

任何非字符串可迭代对象都可以被赋值给 __slots__。映射也可以被使用；不过，未来可能会分别赋给每个键具有特殊含义的值。

__class__ 赋值仅在两个类具有相同的 __slots__ 时才会起作用。

带有多个父类声明位置的多重继承也是可用的，但仅允许一个父类具有由声明位置创建的属性（其他基类必须具有空的位置布局） —— 违反规则将引发 TypeError。

如果为 __slots__ 使用了一个迭代器，则会为迭代器的每个值创建描述器。 但是 __slots__ 属性将为一个空迭代器。
```

### 3.3.3 定制类的创建过程
当一个类继承其他类时，那个类的 `__init_subclass__` 会被调用。这样就可以编写能够改变子类行为的类。

#### classmethod object.__init_subclass__(cls)
`classmethod object.__init_subclass__(cls)`
当所在类派生子类时此方法就会被调用。cls 将指向新的子类。如果定义为一个普通实例方法，此方法将被隐式地转换为类方法。

传入一个新类的关键字参数会被传给父类的 `__init_subclass__`。为了与其他使用 `__init_subclass__` 的类兼容，应当根据需要去掉部分关键字参数再将其余的传给基类，例如:
```py
class Philosopher:
    def __init_subclass__(cls, /, default_name, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.default_name = default_name

class AustralianPhilosopher(Philosopher, default_name="Bruce"):
    pass
object.__init_subclass__ 的默认实现什么都不做，只在带任意参数调用时引发一个错误。
```
注解 元类提示 metaclass 将被其它类型机制消耗掉，并不会被传给 `__init_subclass__` 的实现。
实际的元类（而非显式的提示）可通过 type(cls) 访问。
这是 3.6 新版功能.

#### 3.3.3.1. 元类
默认情况下，类是使用 type() 来构建的。类体会在一个新的命名空间内执行，类名会被局部绑定到
`type(name, bases, namespace)`的结果。
类创建过程可通过在定义行传入 metaclass 关键字参数，或是通过继承一个包含此参数的现有类来进行定制。在以下示例中，MyClass 和 MySubclass 都是 Meta 的实例:
```py
class Meta(type):
    pass

class MyClass(metaclass=Meta):
    pass

class MySubclass(MyClass):
    pass
```
在类定义内指定的任何其他关键字参数都会在下面所描述的所有元类操作中进行传递。

当一个类定义被执行时，将发生以下步骤:

1. 解析 MRO 条目；
2. 确定适当的元类；
3. 准备类命名空间；`namespace = metaclass.__prepare__(name, bases, **kwargs)` 或空字典
4. 执行类主体；     exec(body, globals(), namespace)
5. 创建类对象。     metaclass(name, bases, namespace, **kwargs)

其中的metaclass会被语言机制消耗，不会传递给kwargs。
ps：metaclass() 实际上分成 `__new__()` 和 `__init__()` 两个函数调用。
注：一般的元类都是type，而 `type.__new__()` 负责调用这些钩子：
    `__set_name__`和`__init_subclass__`

传递给元类的前三个参数助记：我是谁，我从哪里来，我要到哪里去？
#### 3.3.3.2. 解析 MRO 条目？？？

如果在类定义中出现的基类不是 type 的实例，则使用 `__mro_entries__` 方法对其进行搜索，当找到结果时，
它会以原始基类元组做参数进行调用。此方法必须返回类的元组以替代此基类被使用。元组可以为空，在此情况下原始基类将被忽略。
#### 3.3.3.3. 确定适当的元类

- 如果没有基类且没有显式指定元类，则使用 type()；
- 如果给出一个显式元类而且 不是 type() 的实例，则其会被直接用作元类；
- 如果给出一个 type() 的实例作为显式元类，或是定义了基类，则使用最近派生的元类。

最近派生的元类会从显式指定的元类（如果有）以及所有指定的基类的元类（即 type(cls)）中选取。最近派生的元类应为所有这些候选元类的一个子类型。
如果没有一个候选元类符合该条件，则类定义将失败并抛出 TypeError。
#### 3.3.3.4. 准备类命名空间
一旦确定了适当的元类，则将准备好类命名空间。
如果元类没有 `__prepare__` 属性，则类命名空间将初始化为一个空的有序映射。

如果元类具有 `__prepare__` 属性，它会以 `namespace = metaclass.__prepare__(name, bases, **kwds)` 的形式被调用
（其中如果有任何额外的关键字参数，则来自类定义）。
`__prepare__` 方法应该被实现为 classmethod()。
`__prepare__` 所返回的命名空间会被传入 `__new__`，但是当最终的类对象被创建时，该命名空间会被拷贝到一个新的 dict 中。
#### 3.3.3.5. 执行类主体
Executing the class body
类主体会以（类似于） exec(body, globals(), namespace) 的形式被执行。
普通调用与 exec() 的关键区别在于当类定义发生于函数内部时，词法作用域允许类主体（包括任何方法）引用来自当前和外部作用域的名称。

但是，即使当类定义发生于函数内部时，在类内部定义的方法仍然无法看到在类作用域层次上定义的名称。
类变量必须通过实例方法（或类方法）的第一个形参来访问，或者是通过下一节中描述的隐式词法作用域的 `__class__` 引用。
#### 3.3.3.6. 创建类对象
一旦执行类主体完成填充类命名空间，将通过调用 `metaclass(name, bases, namespace, **kwds)` 创建类对象
（此处的附加关键字参数与传入 `__prepare__` 的相同）。

类中的方法可以使用字面值 `__class__`，这是由编译器所创建的隐式闭包引用，
ps: 普通方法、类方法、静态方法都可以使用`__class__`，它就代表当前类

```py
class A:

    def hello(self):
        print(__class__)

A().hello()

"""
G:\pycode\src\language-ref>11_class.py
<class '__main__.A'>
"""

# __class__ 是词法作用域，self.__class__则是当前实例所属的类，可能是子类。
class P:
    def f(self):
        print('__class__:', __class__)
        print('self.__class__:', self.__class__)

class S(P):
    pass

p = P()
s = S()
p.f()
# __class__: <class '__main__.P'>
# self.__class__: <class '__main__.P'>
s.f()
# __class__: <class '__main__.P'>
# self.__class__: <class '__main__.S'>

```
Q. 不对不对，这段话还是有不明白的地方。
> This class object is the one that will be referenced by the zero-argument form of super(). `__class__` is an implicit closure reference created by the compiler if any methods in a class body refer to either `__class__` or super. This allows the zero argument form of super() to correctly identify the class being defined based on lexical scoping, while the class or instance that was used to make the current call is identified based on the first argument passed to the method.

当使用默认的元类 type 或者任何最终会调用 `type.__new__ `的元类时，
在创建类对象之还会有如下额外的自定义步骤:

1. `type.__new__ `将收集类命名空间中所有定义了 `__set_name__`() 方法的描述器；
2. 接下来，所有这些 `__set_name__` 方法将使用所定义的类和特定描述器所赋的名称进行调用；
3. 将在新类根据方法解析顺序所确定的直接父类上调用 `__init_subclass__`() 钩子。

当类对象创建完成后，会把此对象传递给类装饰器（如果有的话），并把返回值代原来的类对象
绑定到刚刚的对象的名字上。

由 `type.__new__` 创建的类，它的`__dict__`属性会被替换为一个只读的字典代理（原本是普通的
字典对象）。

> When a new class is created by `type.__new__`, the object provided as the namespace parameter is copied to a new ordered mapping and the original object is discarded. The new copy is wrapped in a read-only proxy, which becomes the `__dict__` attribute of the class object.
#### 3.3.3.7. Uses for metaclasses

元类的潜在用途是无限的。 已经经过实践检验的元类使用场景包括，日志记录，接口检查，自动委派，
自动属性创建，代理，框架和自动资源锁定/同步。
> The potential uses for metaclasses are boundless. Some ideas that have been explored include enum, logging, interface checking, automatic delegation, automatic property creation, proxies, frameworks, and automatic resource locking/synchronization.

### 3.3.4. Customizing instance and subclass checks
定时实例和子类检查
下述方法可用于覆盖内置函数 isinstance() 和 issubclass() 的默认行为。

`class.__instancecheck__(self, instance)`

    Return true if instance should be considered a (direct or indirect) instance of class. If defined, called to implement isinstance(instance, class).

`class.__subclasscheck__(self, subclass)`

    Return true if subclass should be considered a (direct or indirect) subclass of class. If defined, called to implement issubclass(subclass, class).

这两个方法应当定义在元类的字典中，而不是定义在类上。
Note that these methods are looked up on the type (metaclass) of a class. They cannot be defined as class methods in the actual class. This is consistent with the lookup of special methods that are called on instances, only in this case the instance is itself a class.
### 3.3.5. Emulating generic types？
泛型？
One can implement the generic class syntax as specified by PEP 484 (for example List[int]) by defining a special method:

`classmethod object.__class_getitem__(cls, key)`

    Return an object representing the specialization of a generic class by type arguments found in key.

这个方法是在类对象自身查查找到。
定义在类体中是，它自动成为类方法。
此机制原本是用于静态类型提示的，不推荐用于其他用途。
This method is looked up on the class object itself, and when defined in the class body, this method is implicitly a class method. Note, this mechanism is primarily reserved for use with static type hints, other usage is discouraged.

See also:PEP 560 - Core support for typing module and generic types

### 3.3.6. Emulating callable objects
`object.__call__(self[, args...])`

Called when the instance is “called” as a function; if this method is defined,`x(arg1, arg2, ...)` is a shorthand for `x.__call__(arg1, arg2, ...)`
### 3.3.7. Emulating container types：TODO
[Emulating container types](http://docs.localhost/python-3.8.3/reference/datamodel.html#emulating-container-types)
### 3.3.8. Emulating numeric types：TODO
### 3.3.9. With Statement Context Managers：TODO

### 3.3.10. Special method lookup

> For custom classes, implicit invocations of special methods are only guaranteed to work correctly if defined on an
object’s type, not in the object’s instance dictionary.

特殊方法可以显式调用,这个时候使用正常属性查找过程,而隐式调用则
1. 直接从对象的类上开始查找
2. 绕过类和元类的 `__getattribute__()`机制.

这样做,使得python解释器可以有极大优化空间,而弊端是丢失了一点点灵活性.

```py
>>> class Meta(type):
...     def __getattribute__(*args):
...         print("Metaclass getattribute invoked")
...         return type.__getattribute__(*args)
...
>>> class C(object, metaclass=Meta):
...     def __len__(self):
...         return 10
...     def __getattribute__(*args):
...         print("Class getattribute invoked")
...         return object.__getattribute__(*args)
...
>>> c = C()
>>> c.__len__()                 # 通过实例的显式调用:会被getattribute拦截
Class getattribute invoked
10
>>> type(c).__len__(c)          # Explicit lookup via type: 直接调用元类上的getattribute
Metaclass getattribute invoked
10
>>> len(c)                      # Implicit lookup
10
```

## 3.4. Coroutines：TODO

生成器函数、迭代器
协程函数、协程对象
异步生成器函数

# 第五章 import system
目的：了解import语句，相对导包的语法。

一个模块要调用另一个模块的代码，只消导入被调用的模块即可。
import 语句是实现这一目的最常用的方式，但不是唯一的方式。
比如：`importlib.import_module()` and built-in` __import__()`

import 语句执行两个操作：搜索模块，并把结果绑定在当前作用域中的名字上。
搜索这一步调用了内置函数`__import__()`。

第一次加载模块时，如果找到了，会创建模块对象，执行它，然后返回。如果找不到，会抛出异常
ModuleNotFoundError。

PEP 420 介绍了 PEP 420 -- Implicit Namespace Packages，Python 3.3 开始支持。

## 5.1. importlib
此库提供了丰富的api，供与导报系统交互。
# 第七章 简单语句
## 7.11 import 语句
```
import_stmt     ::=  "import" module ["as" identifier] ("," module ["as" identifier])*
                     | "from" relative_module "import" identifier ["as" identifier]
                     ("," identifier ["as" identifier])*
                     | "from" relative_module "import" "(" identifier ["as" identifier]
                     ("," identifier ["as" identifier])* [","] ")"
                     | "from" module "import" "*"
module          ::=  (identifier ".")* identifier
relative_module ::=  "."* module | "."+
```

`__all__`

相对模块路径:当导入同一顶级package下的其它模块时，可以不必指定被导入模块的绝对路径（全限定名），
相对路径也是可以的。一个句点表示当前层级，两个表示父级，三个表示祖父级，以此类推。
```
package/
    __init__.py
    subpackage1/
        __init__.py
        moduleX.py
        moduleY.py
    subpackage2/
        __init__.py
        moduleZ.py
    moduleA.py
```
In either `subpackage1/moduleX.py` or `subpackage1/__init__.py`, the following are valid relative imports:
```
from .moduleY import spam
from .moduleY import spam as ham
from . import moduleY
from ..subpackage1 import moduleY
from ..subpackage2.moduleZ import eggs
from ..moduleA import foo

```
相对导包，只能使用 from xxx import yyy 的格式。
# 第六章 表达式
## 6.2 原子表达式
6.2. Atoms
### 6.2.9 yield 表达式
```
yield_atom       ::=  "(" yield_expression ")"
yield_expression ::=  "yield" [expression_list | "from" expression]
```
- 定义生成器函数或者异步生成器函数的时候需要用到 yield 表达式
- yield 表达式只能用在函数体中
- 普通函数定义中使用 yield 表达式，则此函数自动成为生成器函数
- async def 函数体中使用 yield 表达式，则此协程函数自动成为异步生成此函数
ps：使用 def 定义的是普通函数，使用 async 定义的是协程函数。
ps：普通函数中出现yield 则成为生成器函数，协程函数中出现yield则成为异步生成器函数

The yield expression is used when defining a generator function or an asynchronous generator function and thus can only be used in the body of a function definition. Using a yield expression in a function’s body causes that function to be a generator, and using it in an async def function’s body causes that coroutine function to be an asynchronous generator. For example:

```py
def gen():  # defines a generator function
    yield 123

async def agen(): # defines an asynchronous generator function
    yield 123

```
这一节介绍生成器函数，下一小节介绍异步生成器函数。
Generator functions are described below, while asynchronous generator functions are described separately in section Asynchronous generator functions.

- 调用生成器函数，得到的返回值是一种叫做生成器的迭代器。
- 此生成器对象控制着迭代器函数的执行
- 生成器实现了一些方法，调用任意一个方法即可触发生成器函数的执行。
- 执行到第一个 yield 语句处挂起，并把 yield 后面的表达式的值返回给调用者
- 再次调用生成器对象的某个方法，生成器函数从上次挂起的地方恢复执行，遇到下一个yield再次暂停
- 如是往复，直到生成器函数的函数末尾，或者return语句，或者因未捕获异常而终止
  - 因到达函数末尾或return语句而终止，则给调用者抛出StopIteration异常，并把返回值放在异常
    对象的.value属性中。到达函数尾，等价于遇到 return None
  - 如果是因异常而终止，则调用者会收到同样的异常？？？是吗？
- TODO：每次从 yield 语句处恢复时，也是有返回值的，也可能抛出异常
When a generator function is called, it returns an iterator known as a generator. That generator then controls the execution of the generator function. The execution starts when one of the generator’s methods is called. At that time, the execution proceeds to the first yield expression, where it is suspended again, returning the value of expression_list to the generator’s caller. By suspended, we mean that all local state is retained, including the current bindings of local variables, the instruction pointer, the internal evaluation stack, and the state of any exception handling. When the execution is resumed by calling one of the generator’s methods, the function can proceed exactly as if the yield expression were just another external call. The value of the yield expression after resuming depends on the method which resumed the execution. If `__next__()` is used (typically via either a for or the next() builtin) then the result is None. Otherwise, if send() is used, then the result will be the value passed in to that method.

这些特性使得生成器函数近似于协程：返回多次、有多个入口、可以挂起。唯一的区别是，生成器
函数挂起之后执行权只能转交给调用者，而协程时可以指定把执行权让与指定的地方的。
All of this makes generator functions quite similar to coroutines; they yield multiple times, they have more than one entry point and their execution can be suspended. The only difference is that a generator function cannot control where the execution should continue after it yields; the control is always transferred to the generator’s caller.

yield表达式可以用在try-catch结构中，如果生成器被挂起之后没有被唤醒就走到了回收阶段（内存回收），
则Python会负责在回收之前调用生成器的close()方法，以保证finally语句得到执行。
Yield expressions are allowed anywhere in a try construct. If the generator is not resumed before it is finalized (by reaching a zero reference count or by being garbage collected), the generator-iterator’s close() method will be called, allowing any pending finally clauses to execute.

`yield from <expr>`格式，会把表达式作为子迭代器使用。透传。

When `yield from <expr>` is used, it treats the supplied expression as a subiterator. All values produced by that subiterator are passed directly to the caller of the current generator’s methods. Any values passed in with send() and any exceptions passed in with throw() are passed to the underlying iterator if it has the appropriate methods. If this is not the case, then send() will raise AttributeError or TypeError, while throw() will just raise the passed in exception immediately.

当子迭代器结束时，其返回值会成为yield from 表达式的值。
Q. 那 send() 传进来的值怎么办？
When the underlying iterator is complete, the value attribute of the raised StopIteration instance becomes the value of the yield expression. It can be either set explicitly when raising StopIteration, or automatically when the subiterator is a generator (by returning a value from the subgenerator).

    Changed in version 3.3: Added `yield from <expr>` to delegate control flow to a subiterator.

The parentheses may be omitted when the yield expression is the sole expression on the right hand side of an assignment statement.
#### 6.2.9.1. 生成器对象的方法
6.2.9.1. Generator-iterator methods¶

这一节介绍生成器对象的方法，这些方法可用来控制生成器函数的执行过程。
如果生成器对象已经处于完成状态，那么调用任何一个方法都会抛出 AttributeError 异常。
ps：一共四个方法:`__next__()`, send(), throw(), close()

- `generator.__next__()`
    - 用于启动生成器函数，或者唤醒生成器函数
    - 由此方法唤醒的，yield 表达式的值为None
    - 生成器函数执行到下一个yield表达式处停止，并把表达式的值返回给调用者。
    - 如果没有下一个yield表达式，则调用者收到 StopIteration 异常
    - 一般不直接调用这个方法。ps：就是把生成器当作纯粹迭代器使用
    Starts the execution of a generator function or resumes it at the last executed yield expression. When a generator function is resumed with a `__next__()` method, the current yield expression always evaluates to None. The execution then continues to the next yield expression, where the generator is suspended again, and the value of the expression_list is returned to `__next__()`’s caller. If the generator exits without yielding another value, a StopIteration exception is raised.

    This method is normally called implicitly, e.g. by a for loop, or by the built-in next() function.

- generator.send(value)
    - 唤醒迭代器函数，并迭代器函数传递一个值，这个值作为yield表达式的返回值。
    - send 方法返回下一个yield后跟着的的表达式的值，如果没有下一个yield，则抛出StopIteration异常。
    - 启动生成器的时候，必须传递 None,因为此时生成器函数内部没有哪个yield表达式可以接受send传入的值。
    - PS：也就是说生成器一定是先吐出来一个值，才能接受值。
    Resumes the execution and “sends” a value into the generator function. The value argument becomes the result of the current yield expression. The send() method returns the next value yielded by the generator, or raises StopIteration if the generator exits without yielding another value. When send() is called to start the generator, it must be called with None as the argument, because there is no yield expression that could receive the value.

- generator.throw(type[, value[, traceback]])
    - 给生成器函数触发一个异常，在挂起生成器函数的那个yield表达式处
    - throw（）的返回值是下一个 yield 处的值，或者，如果生成器函数到此结束，则throw（）会抛出 StopIteration异常。
    - 如果生成函数没有捕获异常，或者抛出了另一个异常，则这个异常会传递给调用者。
    - Q. 如果生成器没有启动，就直接throw给他一个异常，会如何呢？
        Ans：等效于生成器函数没有捕获异常，
    Raises an exception of type type at the point where the generator was paused, and returns the next value yielded by the generator function. If the generator exits without yielding another value, a StopIteration exception is raised. If the generator function does not catch the passed-in exception, or raises a different exception, then that exception propagates to the caller.

- generator.close()
    - 在生成器函数挂起的地方触发一个 GeneratorExit 异常。
    - 如果生成器函数之后平稳结束，或者已经结束，或者抛出GeneratorExit异常（在生成器没有捕获此异常的情况下）
      close()方法正常返回。
    - 如果生成器函数捕获 GeneratorExit 异常，然后还 yield 回去一个值，则 close() 方法抛出 RuntimeError 异常。
    - 如果生成器函数抛出其它类型的异常，则直接把异常传递给调用者。
    - 对于已经执行完毕的生成器函数（无论是正常结束还是因为异常结束），close()方法不产生任何效果。
    Raises a GeneratorExit at the point where the generator function was paused. If the generator function then exits gracefully, is already closed, or raises GeneratorExit (by not catching the exception), close returns to its caller. If the generator yields a value, a RuntimeError is raised. If the generator raises any other exception, it is propagated to the caller. close() does nothing if the generator has already exited due to an exception or normal exit.
- Q. 如果调用 send() 或 next 的时候，生成器函数抛出了异常，会如何？
  Ans:会抛给调用者处理。
#### 6.2.9.3. 异步生成器函数
Asynchronous generator functions

异步生成器函数定义类似协程函数（由async def 定义），但区别在于，异步生成器函数体包含
yield 表达式。

> The presence of a yield expression in a function or method defined using async def further defines the function as an asynchronous generator function.

调用异步生成器函数，得到的是一个异步生成器对象。此对象控制着异步生成器函数的执行过程。
异步生成器对象通常用在async for 语句中（而async for只能出现在协程中）。ps：协程，就是使用 async def 定义的函数。

> When an asynchronous generator function is called, it returns an asynchronous iterator known as an asynchronous generator object. That object then controls the execution of the generator function. An asynchronous generator object is typically used in an async for statement in a coroutine function analogously to how a generator object would be used in a for statement.

- 调用异步生成器对象的任意一个方法，它都返回一个 awaitable 对象，
- 当await 这个对象的时候，该对象开始执行。此时，执行到第一个yield处挂起，并把yield后面的值返回给正在等待的协程
- 和生成器一样，挂起，意味着保留异步生成器函数的所有现场。
- 再一次调用异步生成器对象的某个方法，然后对返回的对象执行 wait 操作，就会恢复异步生成器函数的执行
- yield 表达式的值取决于具体调用了异步生成器对象的哪个方法。
> Calling one of the asynchronous generator’s methods returns an awaitable object, and the execution starts when this object is awaited on. At that time, the execution proceeds to the first yield expression, where it is suspended again, returning the value of expression_list to the awaiting coroutine. As with a generator, suspension means that all local state is retained, including the current bindings of local variables, the instruction pointer, the internal evaluation stack, and the state of any exception handling. When the execution is resumed by awaiting on the next object returned by the asynchronous generator’s methods, the function can proceed exactly as if the yield expression were just another external call. The value of the yield expression after resuming depends on the method which resumed the execution. If `__anext__()` is used then the result is None. Otherwise, if asend() is used, then the result will be the value passed in to that method.

- 异步生成器函数中，yield表达式可以出现在try-catche结构中。
- 但是！！，如果处于挂起状态下就给回收了，那么yield表达式就无法正常执行finally语句，
  此时，应当由负责运行异步生成器的事件循环或者调度器保证aclose()方法被调用到。
  否则finally语句就无法被执行，进而有可能导致资源泄露。

> In an asynchronous generator function, yield expressions are allowed anywhere in a try construct. However, if an asynchronous generator is not resumed before it is finalized (by reaching a zero reference count or by being garbage collected), then a yield expression within a try construct could result in a failure to execute pending finally clauses. In this case, it is the responsibility of the event loop or scheduler running the asynchronous generator to call the asynchronous generator-iterator’s aclose() method and run the resulting coroutine object, thus allowing any pending finally clauses to execute.

> To take care of finalization, an event loop should define a finalizer function which takes an asynchronous generator-iterator and presumably calls aclose() and executes the coroutine. This finalizer may be registered by calling sys.set_asyncgen_hooks(). When first iterated over, an asynchronous generator-iterator will store the registered finalizer to be called upon finalization. For a reference example of a finalizer method see the implementation of asyncio.Loop.shutdown_asyncgens in Lib/asyncio/base_events.py.
- 异步生成器函数内部，yield from 是错误的语法。
The expression `yield from <expr>` is a syntax error when used in an asynchronous generator function.
#### 6.2.9.4. 异步生成器对象的方法
Asynchronous generator-iterator methods

本节介绍异步生成器对象的方法，他们控制着异步生成器函数的执行过程。
ps：还是四个方法，`__anext__`，asend，athrow，aclose

- `coroutine agen.__anext__()`
    - 和生成器函数的 next 类似
    Returns an awaitable which when run starts to execute the asynchronous generator or resumes it at the last executed yield expression. When an asynchronous generator function is resumed with an `__anext__()` method, the current yield expression always evaluates to None in the returned awaitable, which when run will continue to the next yield expression. The value of the expression_list of the yield expression is the value of the StopIteration exception raised by the completing coroutine. If the asynchronous generator exits without yielding another value, the awaitable instead raises a StopAsyncIteration exception, signalling that the asynchronous iteration has completed.

    This method is normally called implicitly by a async for loop.

- coroutine agen.asend(value)
    - 和生成器函数的send方法类似
    Returns an awaitable which when run resumes the execution of the asynchronous generator. As with the send() method for a generator, this “sends” a value into the asynchronous generator function, and the value argument becomes the result of the current yield expression. The awaitable returned by the asend() method will return the next value yielded by the generator as the value of the raised StopIteration, or raises StopAsyncIteration if the asynchronous generator exits without yielding another value. When asend() is called to start the asynchronous generator, it must be called with None as the argument, because there is no yield expression that could receive the value.

- coroutine agen.athrow(type[, value[, traceback]])
    - 和生成器函数的 throw 函数类似
    Returns an awaitable that raises an exception of type type at the point where the asynchronous generator was paused, and returns the next value yielded by the generator function as the value of the raised StopIteration exception. If the asynchronous generator exits without yielding another value, a StopAsyncIteration exception is raised by the awaitable. If the generator function does not catch the passed-in exception, or raises a different exception, then when the awaitable is run that exception propagates to the caller of the awaitable.

- coroutine agen.aclose()
    - 和生成器函数的 close方法类似。
    Returns an awaitable that when run will throw a GeneratorExit into the asynchronous generator function at the point where it was paused. If the asynchronous generator function then exits gracefully, is already closed, or raises GeneratorExit (by not catching the exception), then the returned awaitable will raise a StopIteration exception. Any further awaitables returned by subsequent calls to the asynchronous generator will raise a StopAsyncIteration exception. If the asynchronous generator yields a value, a RuntimeError is raised by the awaitable. If the asynchronous generator raises any other exception, it is propagated to the caller of the awaitable. If the asynchronous generator has already exited due to an exception or normal exit, then further calls to aclose() will return an awaitable that does nothing.
- 都是类似的，只不过异步生成器函数多了一个中间层：一种叫做 awaitable 的对象
## 6.4. Await 表达式

Suspend the execution of coroutine on an awaitable object. Can only be used inside a coroutine function.

`await_expr ::=  "await" primary`

# 第八章 复合语句
[8. Compound statements — Python 3.8.3 documentation](http://docs.localhost/python-3.8.3/reference/compound_stmts.html#the-with-statement)
## 8.3 for 语句
```
for_stmt ::=  "for" target_list "in" expression_list ":" suite
              ["else" ":" suite]
```
当expressiont_list中的项目耗尽时，for循环结束，此时如果有else语句，则执行else中的语句。

break 语句终止for循环，并跳过else语句；continue提前结束本次循环，从下一次循环开始，或如果没有下一次循环则执行else后结束循环。

ps：逻辑上，把for循环展开，else放在最末尾，break是跳过整个循环（包括else），而continue从下一次循环初继续。


1. for 中的target中的变量，在for循环之后仍然可用
2. 但如果迭代器是空的，target中的变量可能压根就没有赋值
> Names in the target list are not deleted when the loop is finished, but if the sequence is empty, they will not have been assigned to at all by the loop. Hint: the built-in function range() returns an iterator of integers suitable to emulate the effect of Pascal’s for i := a to b do; e.g., list(range(3)) returns the list [0, 1, 2].

在for循环遍历容器时，增删容器是不合适的，会出现意料之外的结果。
> There is a subtlety when the sequence is being modified by the loop (this can only occur for mutable sequences, e.g. lists). An internal counter is used to keep track of which item is used next, and this is incremented on each iteration. When this counter has reached the length of the sequence the loop terminates. This means that if the suite deletes the current (or a previous) item from the sequence, the next item will be skipped (since it gets the index of the current item which has already been treated). Likewise, if the suite inserts an item in the sequence before the current item, the current item will be treated again the next time through the loop. This can lead to nasty bugs that can be avoided by making a temporary copy using a slice of the whole sequence, e.g.,
```py
for x in a[:]:
    if x < 0: a.remove(x)
```

## 8.5 with 语句
with 语法：
```
with_stmt ::=  "with" with_item ("," with_item)* ":" suite
with_item ::=  expression ["as" target]
```
with语句的执行步骤：
```py
with expr as t:
    suite

#
v = expr
t = v.__enter__()
suite
```

1. The context expression (the expression given in the with_item) is evaluated to obtain a context manager.
2. The context manager’s `__enter__()` is loaded for later use.
3. The context manager’s `__exit__()` is loaded for later use.
4. The context manager’s `__enter__()` method is invoked.
5. If a target was included in the with statement, the return value from `__enter__()` is assigned to it.
6. The suite is executed.
7. The context manager’s `__exit__()` method is invoked. If an exception caused the suite to be exited, its type, value, and traceback are passed as arguments to `__exit__().` Otherwise, three None arguments are supplied.
    如果suite有异常，则 `__exit__()` 会接收到异常，否则接受到None。
    `__exit__(self, exc_type, exc_val, exc_tb)`
    当 `__exit__()`收到异常时，如果返回True，就可以抑制异常，否则python会在`__exit__()`之后重新抛出异常。

    If the suite was exited due to an exception, and the return value from the `__exit__()` method was false, the exception is reraised. If the return value was true, the exception is suppressed, and execution continues with the statement following the with statement.

    If the suite was exited for any reason other than an exception, the return value from `__exit__()` is ignored, and execution proceeds at the normal location for the kind of exit that was taken.

with 语句保证：只要 `__enter__()`方法正常返回，`__exit__()`方法就一定会被调用，with语句体无论是否抛出了异常。
ps: 如果 enter 抛出了异常，with语句会报错。
>The with statement guarantees that if the `__enter__()` method returns without an error, then `__exit__()` will always be called. Thus, if an error occurs during the assignment to the target list, it will be treated the same as an error occurring within the suite would be. See step 6 below.

```py
with EXPRESSION as TARGET:
    SUITE
```
语义上等效于：
```py
manager = (EXPRESSION)
enter = type(manager).__enter__
exit = type(manager).__exit__
value = enter(manager)
hit_except = False

try:
    TARGET = value
    SUITE
except:
    hit_except = True
    if not exit(manager, *sys.exc_info()):
        raise
finally:
    if not hit_except:
        exit(manager, None, None, None)
```

with 后面可以跟多个项：

```py
with A() as a, B() as b:
    SUITE

# 语义上等价于
with A() as a:
    with B() as b:
        SUITE

```
# tmp

awaitable

    An object that can be used in an await expression. Can be a coroutine or an object with an __await__() method.
    See also PEP 492.

asynchronous iterable

    An object, that can be used in an async for statement. Must return an asynchronous iterator from its __aiter__() method. Introduced by PEP 492.

asynchronous generator iterator

    An object created by a asynchronous generator function.

    This is an asynchronous iterator which when called using the __anext__() method returns an awaitable object which will execute the body of the asynchronous generator function until the next yield expression.

    Each yield temporarily suspends processing, remembering the location execution state (including local variables and pending try-statements). When the asynchronous generator iterator effectively resumes with another awaitable returned by __anext__(), it picks up where it left off. See PEP 492 and PEP 525.

asynchronous generator

    A function which returns an asynchronous generator iterator. It looks like a coroutine function defined with async def except that it contains yield expressions for producing a series of values usable in an async for loop.

    Usually refers to an asynchronous generator function, but may refer to an asynchronous generator iterator in some contexts. In cases where the intended meaning isn’t clear, using the full terms avoids ambiguity.

    An asynchronous generator function may contain await expressions as well as async for, and async with statements.

coroutine

    Coroutines are a more generalized form of subroutines. Subroutines are entered at one point and exited at another point. Coroutines can be entered, exited, and resumed at many different points. They can be implemented with the async def statement.
    See also PEP 492.

coroutine function

    A function which returns a coroutine object. A coroutine function may be defined with the async def statement, and may contain await, async for, and async with keywords.

    These were introduced by PEP 492.
