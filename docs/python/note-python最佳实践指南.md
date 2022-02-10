归纳、总结，记录梗概，不要照抄，除非特别棒的论述。

# python 入门 -- 正确设置Python环境
## setuptools 和 pip
setuptools 和 pip 是两个最重要的第三方Python包。

## Pipenv & 虚拟环境
pip, pipenv, virtualenv, venv

Pipenv 是 Python 项目的依赖管理器。
相比于pip，它是一种更高级的工具，可简化依赖关系管理的常见使用情况
`$ pip install --user pipenv`

virtualenv 是一个创建隔绝的Python环境的工具。它可以独立使用，代替Pipenv。
`$ pip install virtualenv`

“冷冻住（freeze）”环境包当前的状态 `pip freeze > requirements.txt`
然后在另一个地方安装相同的包 `pip install -r requirements.txt`
这能帮助确保安装、部署和开发者之间的一致性。

记住在源码版本控制中排除掉虚拟环境文件夹.

virtualenvwrapper 提供了一系列命令使得和虚拟环境工作变得愉快许多。它把您所有的虚拟环境都放在一个地方。
`pip install virtualenvwrapper`

venv 是自 python 3.3 开始内置的虚拟环境管理工具（比较简单的）。

ps：pyvenv 是 python 3.3 和 3.4 推荐使用的虚拟环境管理工具，但自 python 3.5 开始推荐 venv。

pipenv的原理，它把我的包装到哪里去了？
哦，大概是这里：`C:\Users\chenx\.virtualenvs\myproject-_wjxYCOE`
# Python 开发环境
[Python最佳实践指南！ — The Hitchhiker's Guide to Python](https://pythonguidecn.readthedocs.io/zh/latest/index.html#id2)

这部分指南关注 Python 开发环境，以及用于编写 Python 代码的可用且最实用的工具。

## 文本编辑器
Vim是一个使用键盘快捷键而不是菜单或图标来编辑的文本编辑器。
您应该时常检查代码的 语法错误和是否符合PEP8。幸运的是， pycodestyle 和 Pyflakes 将会帮您做这些。

Emacs：Emacs是另一个强大的文本编辑器。它是完全可编程的（Lisp），但要正确的工作要花些功夫。

TextMate
    TextMate 将苹果操作系统技术带入了文本编辑器的世界。 通过桥接Unix和GUI，
    TextMate将两者中最好的部分带给了脚本专家和新手用户。

Sublime Text

    Sublime Text 是一款高级的，用来编写代码、标记和 文章的文本编辑器。您将会爱上漂亮的
    用户界面、非凡的特性和惊人的表现。

## IDE
### Eclipse
安装 PyDev 插件

Eclipse -> Help -> Install New SoftWare -> Add ，在弹出的框添加python仓库地址
http://pydev.org/updates

重启eclipse，在windows->preferences出现PyDev配置项，表示PyDev插件安装成功。

- 配置PyDev插件
windows->preferences->PyDev->Interpreter - Python，New一个Python解释器，填上解释器名字和路径，路径选相应的python.exe。

- 在eclipse中设置python文件的默认编码
Window -> Preferences -> Content Types -> Text -> Python File
在 default encoding 中填写 UTF-8，点击 update，保存即可。

## 解释器
### 虚拟环境：隔离项目包依赖的强大方式
虚拟环境提供了**隔离项目包依赖的强大方式**。这意味着您无须再系统范围内安装Python工程特定的包，
因此就能避免潜在的版本冲突。

### pyenv
pyenv 是一个允许多个Python解释器版本同时安装 于一台机器的工具。
pyenv不是管理虚拟环境的工具，但是有一个叫做 pyenv-virtualenv 的插件可以自动化不同环境的创建
## 其他工具
IDLE 是一个集成的开发环境，它是Python标准发行的一部分。 它完全由Python编写，并使用Tkinter GUI工具集。

尽管IDLE不适用于作为成熟的Python开发工具， 但它对尝试小的Python代码和对Python不同特性的实验非常有帮助。

IPython，Bpython，PPython
## Pipenv & 虚拟环境
参见第一章 “python 入门”的同名章节
## 更低层次: virtualenv
参见第一章 “python 入门”的同名章节
## Pip和Virtualenv的更多配置
使用虚拟环境是个保持开发环境干净和分隔不同项目要求的好做法.

当工作在多个不同的项目上时，会很难记住去激活哪个相关的虚拟环境来回到特定的项目。
其结果就是，会非常容易在全局范围内安装包，时间越久，就会导致混乱的全局包列表。

为了确保您当您使用 pip install 时是将包安装在激活的虚拟环境中
考虑在 ~/.bashrc 文件中加上以下一行：`export PIP_REQUIRE_VIRTUALENV=true`
效果是：pip会拒绝在虚拟环境之外安装包。如果在虚拟环境外使用 `pip install`,
pip将会提示需要一个激活的虚拟环境来安装包。
也可以通过编辑 pip.conf 或 pip.ini`来做相同的配置。

您也可以通过编辑 pip.conf 或 pip.ini 来做相同的配置。
Unix: `$HOME/.pip/pip.conf`
Windows: `%HOME%\pip\pip.ini`
如果还没有，新建一个就好。 在 `[global]`下添加一行设置：
```ini
[global]
require-virtualenv = true
```

当确实需要全局范围内安装包的时候，设置

```sh
gpip() {
    PIP_REQUIRE_VIRTUALENV="" pip "$@"
}
```
## 存下包以供将来使用

当您工作在大量不同的项目上时，这些项目之间肯定有一些重叠的库。 比如说，您可能在多个不同的项目上使用了 requests 。

每当您开始一个新项目（并有一个新的虚拟环境）重新下载相同的包/库是没有必要的。
自从6.0版本开始，pip提供默认缓存机制 而无需任何配置。
当使用更老的版本时，你可以用下面的方式来配置pip，以使它尝试重用已安装的包。
`export PIP_DOWNLOAD_CACHE=$HOME/.pip/cache`
另一个进行相同配置的方法是通过 pip.conf 或 pip.ini 文件来做，
```ini
[global]
; windows 设置这一行
download-cache = %HOME%\pip\cache
; linux 设置这一行
download-cache = $HOME/.pip/cache
```
可以把路径换成自己喜欢的路径。这里提供的路径是比较有代表性的。
# 写出优雅的Python代码
这部分指南关注编写Python代码的最佳实践。

## 结构化您的工程
在实践层面， “结构化”意味着通过编写简洁的代码，并且正如文件系统中文件和目录的组织一样，
代码应该使逻辑和依赖清晰。

本章节中，我们更深入地去观察Python的模块和导入系统，因为它们是加强您 的项目结构化的关键因素，
接着我们会从不同层面去讨论**如何去构建可扩展且测试 可靠的的代码**。
### 仓库的结构
在一个健康的开发周期中，代码风格，API设计和自动化是非常关键的。
同样的，对于工程的架构,仓库的结构也是关键的一部分。

#### 仓库样例
https://github.com/kennethreitz/samplemod

假设我们做了一个模块，它叫 sample，对应的仓库布局：
```
README.rst
LICENSE
setup.py
requirements.txt
sample/__init__.py
sample/core.py
sample/helpers.py
docs/conf.py
docs/index.rst
tests/test_basic.py
tests/test_advanced.py
```

- 源代码
- liscense
- setup.py
- ./requirements.txt
- ./docs
- ./tests

    最开始，一组测试例子只是放在一个文件当中: `./test_sample.py`
    当测试例子逐步增加时，您会把它放到一个目录里面，像下面这样:
    ```
    tests/test_basic.py
    tests/test_advanced.py
    ```

- ./Makefile        常规的管理任务，其它脚本也在这里：比如 manage.py 或者 fabfile.py
- ./tests
    tests/context.py
    ```py
    import os
    import sys
    sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

    import sample
    ```
    `from .context import sample`

manage.py是每个Django项目中自动生成的一个用于管理项目的脚本文件，需要通过python命令执行。


### 结构是一把钥匙
python的模块和导包语法很简单，没有很多限制。因而容易掌握，同样因为限制很少，容易
做出来不良的项目结构。
- 多且混乱的循环依赖
- 隐含耦合：
- 过度使用全局变量
- 面条式代码
- 混沌的代码……

### 模块
Python模块是最主要的抽象层之一，并且很可能是最自然的一个。

并介绍了模块命名的建议规则, 以及一些模块相关的最佳实践。

使用 `from modu import *` 的代码较难阅读而且依赖独立性不足。用具体的 `from modu import func`
```py
# bad
[...]
from modu import *
[...]
x = sqrt(4)  # sqrt是模块modu的一部分么？或是内建函数么？上文定义了么？

# ok
from modu import sqrt
[...]
x = sqrt(4)  # 如果在import语句与这条语句之间，sqrt没有被重复定义，它也许是模块modu的一部分。

# good
import modu
[...]
x = modu.sqrt(4)  # sqrt显然是属于模块modu的。
```

在代码风格章节中提到，可读性是Python最主要的特性之一。可读性意味着避免无用且重复的文本
和混乱的结构，因而需要花费一些努力以实现一定程度的简洁。但不能过份简洁而导致简短晦涩。

### 包
Python提供非常简单的包管理系统，即简单地将模块管理机制扩展到一个目录上(目录扩 展为包)。
任意包含 `__init__.py` 文件的目录都被认为是一个Python包。

如果包内的模块和子包没有代码共享的需求，使用空白的 `__init__.py` 文件是正常 甚至好的做法。

### 面向对象编程
Python有时被描述为面向对象编程的语言，这多少是个需要澄清的误导。
在Python中 一切都是对象，并且能按对象的方式处理。
然而，与Java不同的是，Python并没有将面向对象编程作为最主要的编程范式。

在一些情况下，需要避免不必要的面向对象。当我们想要将状态与功能结合起来，使用标准类定义
是有效的。但正如函数式编程所讨论的那个问题，函数式的“变量”状态与类的 状态并不相同。

把有隐式上下文和副作用的函数与仅包含逻辑的函数(纯函数)谨慎地区分开来，会带来 以下好处：

    纯函数的结果是确定的：给定一个输入，输出总是固定相同。
    当需要重构或优化时，纯函数更易于更改或替换。
    纯函数更容易做单元测试：很少需要复杂的上下文配置和之后的数据清除工作。
    纯函数更容易操作、修饰和分发。

总之，对于某些架构而言，纯函数比类和对象在构建模块时更有效率，因为他们没有任何 上下文和副作用。
但显然在很多情况下，面向对象编程是有用甚至必要的。例如图形桌面 应用或游戏的开发过程中，操作的元素(窗口、按钮、角色、车辆)在计算机内存里拥有相 对较长的生命周期。

### 装饰器
这个机制对于分离概念和避免外部不相关逻辑“污染”主要逻辑很有用处。
记忆化 <https://en.wikipedia.org/wiki/Memoization#Overview> 或缓存就是一个很好的使用装饰器的例子：您需要在table中储存一个耗时函数的结果，并且下次能直接使用该结果，而不是再计算一次。这显然不属于函数的逻辑部分。

### 上下文管理器
上下文管理器是一个Python对象，为操作提供了额外的上下文信息。
这里展示了使用上下文管理器的为人熟知的示例，打开文件：
```py
with open('file.txt') as f:
    contents = f.read()
```
实现这个功能有两种简单的方法：使用类或使用生成器。

生成器方式使用了Python自带的 contextlib.

由于这两种方法都是一样的，所以我们应该遵循Python之禅来决定何时使用哪种。
如果封装的逻辑量很大，则类的方法可能会更好。 而对于处理简单操作的情况，函数方法可能会更好。

### 动态类型
Python 的动态类型常被认为是它的缺点，的确这个特性会导致复杂度提升和难以调试的代码。
使用简短的函数或方法能降低对不相关对象使用同一个名称的风险。
```py
items = 'a b c d'  # 首先指向字符串...
items = items.split(' ')  # ...变为列表
items = set(items)  # ...再变为集合
```
在某些代码的做法中，例如函数编程，推荐的是从不重复对同一个变量命名赋值。
Java 内的实现方式是使用 'final' 关键字。Python并没有 'final' 关键字而且这与它的哲学 相悖。

### 可变和不可变类型
Python提供两种内置或用户定义的类型。可变类型和不可变类型。

字符串是不可变类型，并由此引发一些列效率相关的考虑。
这意味着当需要组合一个 字符串时，将每一部分放到一个可变列表里，使用字符串时再组合 ('join') 起来的做法更高效。
而且使用列表推导的构造方式比在循环中调用 append() 来构造列表更好也更快。
```py
# 差

# 创建将0到19连接起来的字符串 (例 "012..1819")
nums = ""
for n in range(20):
    nums += str(n)   # 慢且低效
print nums

# 好

# 创建将0到19连接起来的字符串 (例 "012..1819")
nums = []
for n in range(20):
    nums.append(str(n))
print "".join(nums)  # 更高效

# 更好

# 创建将0到19连接起来的字符串 (例 "012..1819")
nums = [str(n) for n in range(20)]
print "".join(nums)

# 最好Best

# 创建将0到19连接起来的字符串 (例 "012..1819")
nums = map(str, range(20))
print "".join(nums)

```

最后关于字符串的说明的一点是，使用 join() 并不总是最好的选择。
比如当用预先 确定数量的字符串创建一个新的字符串时，使用加法操作符确实更快，但在上文提到的情况 下或添加到已存在字符串的情况下，使用 join() 是更好的选择。
```py
foo = 'foo'
bar = 'bar'

foobar = foo + bar  # 好的做法
foo += 'ooo'  # 不好的做法, 应该这么做:
foo = ''.join([foo, 'ooo'])

```
除了 str.join() 和 +，您也可以使用 % 格式运算符来连接确定数量的字符串，
但 PEP 3101 建议使用 str.format() 替代 % 操作符。
```py
foo = 'foo'
bar = 'bar'

foobar = '%s%s' % (foo, bar) # 可行
foobar = '{0}{1}'.format(foo, bar) # 更好
foobar = '{foo}{bar}'.format(foo=foo, bar=bar) # 最好
```
### 提供依赖关系

## 代码风格
如果您问Python程序员最喜欢Python的什么，他们总会说是**Python的高可读性**。
事实上，高度的可读性是Python语言的设计核心。这基于这样的事实：**代码的 阅读比编写更加频繁**。
### 一般概念
#### 明确的代码
在存在各种黑魔法的Python中，我们提倡最明确和直接的编码方式。
糟糕
```py
def make_complex(*args):
    x, y = args
    return dict(**locals())
```
优雅
```py
def make_complex(x, y):
    return {'x': x, 'y': y}

```

#### 函数参数
Python 形参有四种，他们各自的适用情形：

位置参数 是强制的，且没有默认值。它们是最简单的参数形式，而且能被用在一些这样的函数参数中：
**它们是函数意义的完整部分，其顺序是自然的。**比如说：对 函数的使用者而言，
记住 `send(message, recipient)` 或 `point(x, y)` 需要 两个参数以及它们的参数顺序并不困难。

关键字参数 是非强制的，且有默认值。它们经常被用在传递给函数的可选参数中。
当一个函数有超过两个或三个位置参数时，函数签名会变得难以记忆，使用带有默认参数 的关键字参数将会带来帮助。
比如，一个更完整的 send 函数可以被定义为 `send(message, to, cc=None, bcc=None)`。

任意参数列表 是第三种给函数传参的方式。如果函数的目的通过带有数目可扩展的 位置参数的
签名能够更好的表达，该函数可以被定义成 `*args` 的结构。

任意关键字参数字典 是最后一种给函数传参的方式。如果函数要求一系列待定的 命名参数，
我们可以使用 `**kwargs`的结构。

和 任意参数列表 中所需注意的一样，相似的原因是：这些强大的技术是用在被证明确实
需要用到它们的时候，它们不应该被用在能用更简单和更明确的结构，来足够表达函数意图的情况中。

#### Python 拥有非常丰富的钩子（hook）和工具，允许您施展几乎任何形式的技巧
尽管如此，所有的这些选择都有许多缺点。使用更加直接的方式来达成目标通常是更好的方法。
我们认为Python开发者应该知道这些近乎无限的可能性，因为它为我们灌输了没有不可能 完成的任务的信心。
然而，知道如何，尤其是何时 **不能** 使用它们是非常重要的。
#### 我们都是负责任的用户
Python允许很多技巧，其中一些具有潜在的危险。Python中没有 “private” 关键字。
这种哲学 是在说：“我们都是负责任的用户”，它和高度防御性的语言（如Java，拥有很多机制来
预防错误的使用）有着非常大的不同。

私有属性的主要约定和实现细节是在所有的“内部”变量前加一个下划线。
#### 返回值
1. Python 函数可以一次性返回多个值，但只在确有必要的时候这样做。
2. 当一个函数在其正常过程中有多个主要出口点时，它会变得难以调试和返回其 结果，所以保持单个出口点可能会更好。
而且多个出口点 很有可能意味着这里需要重构。

### 习语（Idiom）
### Python之禅
Python之禅

又名 PEP 20, Python设计的指导原则。
```
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!

Python之禅 by Tim Peters

优美胜于丑陋（Python以编写优美的代码为目标）
明了胜于晦涩（优美的代码应当是明了的，命名规范，风格相似）
简洁胜于复杂（优美的代码应当是简洁的，不要有复杂的内部实现）
复杂胜于凌乱（如果复杂不可避免，那代码间也不能有难懂的关系，要保持接口简洁）
扁平胜于嵌套（优美的代码应当是扁平的，不能有太多的嵌套）
间隔胜于紧凑（优美的代码有适当的间隔，不要奢望一行代码解决问题）
可读性很重要（优美的代码是可读的）
即便假借特例的实用性之名，也不可违背这些规则（这些规则至高无上）
不要包容所有错误，除非您确定需要这样做（精准地捕获异常，不写 except:pass 风格的代码）
当存在多种可能，不要尝试去猜测
而是尽量找一种，最好是唯一一种明显的解决方案（如果不确定，就用穷举法）
虽然这并不容易，因为您不是 Python 之父（这里的 Dutch 是指 Guido ）
做也许好过不做，但不假思索就动手还不如不做（动手之前要细思量）
如果您无法向人描述您的方案，那肯定不是一个好方案；反之亦然（方案测评标准）
命名空间是一种绝妙的理念，我们应当多加利用（倡导与号召）

```
### PEP 8
PEP 8 是Python事实上的代码风格指南

命令行程序 pycodestyle（以前叫做``pep8``），可以检查代码一致性。
在您的终端上运行以下命令来安装它：`$ pip install pycodestyle`

然后，对一个文件或者一系列的文件运行它，来获得任何违规行为的报告。

`$ pycodestyle optparse.py`

程序 autopep8 能自动将代码格式化 成 PEP 8 风格。用以下指令安装此程序：

`$ pip install autopep8`

用以下指令格式化一个文件：`$ autopep8 --in-place optparse.py`

不包含 `--in-place` 标志将会使得程序直接将更改的代码输出到控制台，以供审查。

### 约定
#### 访问字典元素
不要使用 dict.has_key() 方法。取而代之，使用 x in d 语法，或者 将一个默认参数传递给 dict.get()。
Python 3 中移除了字典的 has_key() 方法,如果你有代码使用了 has_key(),要么就改用 Python 2,要么就建议使用 in 操作。
糟糕:
```py
d = {'hello': 'world'}
if d.has_key('hello'):
    print d['hello']    # 打印 'world'
else:
    print 'default_value'
```
优雅:
```py
d = {'hello': 'world'}

print d.get('hello', 'default_value') # 打印 'world'
print d.get('thingy', 'default_value') # 打印 'default_value'
# Or:
if 'hello' in d:
    print d['hello']
```
#### 维护列表的捷径



## 阅读好的代码
## 文档
### 项目文档
### 项目发布
### 代码文档建议
### 其他工具
## 测试您的代码
### 基本
### 工具
## 日志（Logging）
### ... 或者打印?
### 库中的日志
### 应用程序中的日志
## 常见陷阱
### 可变默认参数
### 延迟绑定闭包
### 字节码（.pyc）文件无处不在！
## 选择一个许可



