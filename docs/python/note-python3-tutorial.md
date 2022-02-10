[python教程](https://docs.python.org/3/tutorial)
# Ch09 9. Classes
## 9.1. 名称和对象
多个名称（在多个作用域内）可以绑定到同一个对象。这在其他语言中称为别名。
别名在某些方面表现得像指针。例如，传递一个对象很便宜，因为实现只传递一个指针；
如果函数修改了作为参数传递的对象，调用者将看到更改.
## 9.2. Python 作用域和命名空间
namespace （命名空间）是一个从名字到对象的映射。 大部分命名空间当前都由 Python 字典实现，
但一般情况下基本不会去关注它们（除了要面对性能问题时），而且也有可能在将来更改。

存放内置函数的集合（包含 abs() 这样的函数，和内建的异常等）；模块中的全局名称；函数调用中的局部名称都是命名空间的例子。
从某种意义上说，对象的属性集合也是一种命名空间的形式。

本文中约定, 任何跟在一个点号之后的名称都称为 属性(attribute).
By the way, I use the word attribute for any name following a dot.

属性可以是只读或者可写的。如果为后者，那么对属性的赋值是可行的。模块属性是可以写.

在不同时刻创建的命名空间拥有不同的生存期。
- 包含内置名称的命名空间是在 Python 解释器启动时创建的，永远不会被删除。
- 模块的全局命名空间在模块定义被读入时创建；通常，模块命名空间也会持续到解释器退出。
    - 被解释器的顶层调用执行的语句(从一个脚本文件读取或交互式地读取)，是 `__main__` 模块调用的一部分，
      因此它们拥有自己的全局命名空间。（内置名称实际上也存在于一个模块中；这个模块称作 builtins 。）
- 一个函数的本地命名空间在这个函数被调用时创建，并在函数返回或抛出一个不在函数内部处理的错误时被删除。

一个作用域(scope)是一个命名空间可直接访问的 Python 程序的文本区域。这里的“可直接访问”指对名称的非限定引用会尝试在命名空间中查找名称。
作用域被静态确定，但被动态使用。作用域查找遵循 LEGB 规则. 全局作用域, 函数作用域, 类作用域. 其余不会引入新的作用域.

## 9.3. 初探类
引入了一些新语法，三种新对象类型和一些新语义。

### 9.3.1. 类定义语法
最简单的类定义看起来像这样:
```py
class ClassName:
    <statement-1>
    .
    .
    .
    <statement-N>
```
类定义与函数定义 (def 语句) 一样必须被执行才会起作用。
在实践中，类定义内的语句通常都是函数定义，但也允许有其他语句，有时还很有用.
在类内部的函数定义通常具有一种特别形式的参数列表，这是方法调用的约定规范所指明的.

当进入类定义时，将创建一个新的命名空间，并将其用作局部作用域.
当（从结尾处）正常离开类定义时，将创建一个类对象.

### 9.3.2. 类对象: 属性引用和实例化
类对象支持两种操作：属性引用和实例化。
```py
class MyClass:
    """A simple example class"""
    i = 12345

    def f(self):
        return 'hello world'
```

属性引用 使用 Python 中所有属性引用所使用的标准语法: obj.name。类属性也可以被赋值.
```py
>>> MyClass.i
12345
>>> MyClass.f
<function MyClass.f at 0x000002412B6528B0>
>>> MyClass.__doc__
'A simple example class'
>>>
```

类的 实例化 使用函数表示法。 可以把类对象视为是返回该类的一个新实例的不带参数的函数。
`x = MyClass()`

实例化操作（“调用”类对象）会创建一个空对象。
许多类喜欢创建带有特定初始状态的自定义实例。 为此类定义可能包含一个名为 __init__() 的特殊方法，
当一个类定义了 __init__() 方法时，类的实例化操作会自动为新创建的类实例发起调用 __init__()

```py
def __init__(self):
    self.data = []

```

当然，__init__() 方法还可以有额外参数
```py
>>> class Complex:
...     def __init__(self, realpart, imagpart):
...         self.r = realpart
...         self.i = imagpart
...
>>> x = Complex(3.0, -4.5)
>>> x.r, x.i
(3.0, -4.5)
```

### 9.3.3. 实例对象: 属性引用(数据属性和方法)
实例对象理解的唯一操作是属性引用。 有两种有效的属性名称：数据属性和方法。
数据属性 对应于 Smalltalk 中的“实例变量”，以及 C++ 中的“数据成员”。 数据属性不需要声明；像局部变量一样，它们将在第一次被赋值时产生。
```py
x.counter = 1
while x.counter < 10:
    x.counter = x.counter * 2
print(x.counter)
del x.counter
```

另一类实例属性引用称为 方法。 方法是“从属于”对象的函数。
其他对象也可以有方法, 但在以下讨论中，我们使用方法一词将专指类实例对象的方法，除非另外显式地说明。

实例对象的有效方法名称依赖于其所属的类。 根据定义，一个类中所有是函数对象的属性都是定义了其实例的相应方法。

x.f 是有效的方法引用，因为 MyClass.f 是一个函数，而 x.i 不是方法，因为 MyClass.i 不是一个函数。
但是 x.f 与 MyClass.f 并不是一回事 --- x.f 是一个 方法对象，MyClass.f 是函数对象。

### 9.3.4. 方法对象
通常，方法在绑定后立即被调用: `x.f()`
但是，立即调用一个方法并不是必须的: x.f 是一个方法对象，它可以被保存起来以后再调用。
```py
xf = x.f
while True:
    print(xf())
```

你可能已经注意到上面调用 x.f() 时并没有带参数，虽然 f() 的函数定义指定了一个参数。
答案：方法的特殊之处就在于实例对象会作为函数的第一个参数被传入。 在我们的示例中，调用 x.f() 其实就相当于 MyClass.f(x)。

### 9.3.5. 类变量和实例变量
一般来说，实例变量用于每个实例的唯一数据，而类变量用于类的所有实例共享的属性和方法
```py
class Dog:

    kind = 'canine'         # class variable shared by all instances

    def __init__(self, name):
        self.name = name    # instance variable unique to each instance

>>> d = Dog('Fido')
>>> e = Dog('Buddy')
>>> d.kind                  # shared by all dogs
'canine'
>>> e.kind                  # shared by all dogs
'canine'
>>> d.name                  # unique to d
'Fido'
>>> e.name                  # unique to e
'Buddy'
```

## 9.4. 补充说明
如果同样的属性名称同时出现在实例和类中，则属性查找会优先选择实例:
```py
>>> class Warehouse:
        purpose = 'storage'
        region = 'west'

>>> w1 = Warehouse()
>>> print(w1.purpose, w1.region)
storage west
>>> w2 = Warehouse()
>>> w2.region = 'east'
>>> print(w2.purpose, w2.region)
storage east
```

数据属性可以被方法以及一个对象的普通用户（“客户端”）所引用。
换句话说,在 Python 中没有任何东西能强制隐藏数据 --- 它是完全基于约定的。

客户端应当谨慎地使用数据属性 --- 客户端可能通过直接操作数据属性的方式破坏由方法所维护的固定变量。
请注意客户端可以向一个实例对象添加他们自己的数据属性而不会影响方法的可用性，只要保证避免名称冲突 ---
再次提醒，在此使用命名约定可以省去许多令人头痛的麻烦。

在方法内部引用数据属性（或其他方法！）并没有简便方式。 这实际上提升了方法的可读性：当浏览一个方法代码时，
不会存在混淆局部变量和实例变量的机会。

方法的第一个参数常常被命名为 self。 这也不过就是一个约定: self 这一名称在 Python 中绝对没有特殊含义。
但是要注意，不遵循此约定会使得你的代码对其他 Python 程序员来说缺乏可读性


任何一个作为类属性的函数都为该类的实例定义了一个相应方法。 函数定义的文本并非必须包含于类定义之内：将一个函数对象赋值给一个局部变量也是可以的。
```py
def f1(self, x, y):
    return min(x, x+y)

class C:
    f = f1

    def g(self):
        return 'hello world'

    h = g
```
现在 f, g 和 h 都是 C 类的引用函数对象的属性，因而它们就都是 C 的实例的方法 --- 其中 h 完全等同于 g。
但请注意，本示例的做法通常只会令程序的阅读者感到迷惑。

方法可以通过使用 self 参数的方法属性调用其他方法:
```py
class Bag:
    def __init__(self):
        self.data = []

    def add(self, x):
        self.data.append(x)

    def addtwice(self, x):
        self.add(x)
        self.add(x)
```

每个值都是一个对象，因此具有 类 （也称为 类型），并存储为 `object.__class__` 。

方法可以通过与普通函数相同的方式引用全局名称。 与方法相关联的全局作用域就是包含其定义的模块。 （类永远不会被作为全局作用域。）
## 9.5. 继承
如果不支持继承，语言特性就不值得称为“类”。派生类定义的语法如下所示:

```py
class DerivedClassName(BaseClassName):
    <statement-1>
    .
    .
    .
    <statement-N>
```

派生类定义的执行过程与基类相同。 当构造类对象时，基类会被记住。
此信息将被用来解析属性引用：如果请求的属性在类中找不到，搜索将转往基类中进行查找。
如果基类本身也派生自其他某个类，则此规则将被递归地应用。

派生类的实例化没有任何特殊之处: DerivedClassName() 会创建该类的一个新实例。 方法引用将按以下方式解析：搜索相应的类属性，
如有必要将按基类继承链逐步向下查找，如果产生了一个函数对象则方法引用就生效。

派生类可能会重载其基类的方法。

在派生类中的重载方法实际上可能想要扩展而非简单地替换同名的基类方法。
有一种方式可以简单地直接调用基类方法：即调用 BaseClassName.methodname(self, arguments)。 有时这对客户端来说也是有用的。


Python有两个内置函数可被用于继承机制：

使用 isinstance() 来检查一个实例的类型: isinstance(obj, int) 仅会在 obj.__class__ 为 int 或某个派生自 int 的类时为 True。

使用 issubclass() 来检查类的继承关系: issubclass(bool, int) 为 True，因为 bool 是 int 的子类。 但是，issubclass(float, int) 为 False，因为 float 不是 int 的子类。

### 多重继承
Python也支持一种多重继承。 带有多个基类的类定义语句如下所示:
```py
class DerivedClassName(Base1, Base2, Base3):
    <statement-1>
    .
    .
    .
    <statement-N>
```
对于多数应用来说，在最简单的情况下，你可以认为搜索从父类所继承属性的操作是深度优先、从左至右的，当层次结构中存在重叠时
不会在同一个类中搜索两次。

真实情况比这个更复杂一些；方法解析顺序会动态改变以支持对 super() 的协同调用。

### 9.6. 私有变量

那种仅限从一个对象内部访问的“私有”实例变量在 Python 中并不存在。
但是，大多数 Python 代码都遵循这样一个约定：带有一个下划线的名称 (例如 _spam) 应该被当作是 API 的非公有部分 (无论它是函数、方法或是数据成员)。 这应当被视为一个实现细节，可能不经通知即加以改变。

由于存在对于类私有成员的有效使用场景（例如避免名称与子类所定义的名称相冲突），因此存在对此种机制的有限支持，称为 名称改写。
任何形式为 __spam 的标识符（至少带有两个前缀下划线，至多一个后缀下划线）的文本将被替换为 _classname__spam，
其中 classname 为去除了前缀下划线的当前类名称。 这种改写不考虑标识符的句法位置，只要它出现在类定义内部就会进行。

### 9.7. 杂项说明
有时会需要使用类似于 Pascal 的“record”或 C 的“struct”这样的数据类型，将一些命名数据项捆绑在一起。 这种情况适合定义一个空类:
```py
class Employee:
    pass

john = Employee()  # Create an empty employee record
# Fill the fields of the record
john.name = 'John Doe'
john.dept = 'computer lab'
john.salary = 1000
```

