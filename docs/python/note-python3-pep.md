# PEP 8 Python代码风格指南
[PEP 8 -- Style Guide for Python Code | Python.org](https://www.python.org/dev/peps/pep-0008/)
G:\learn\python-basic\src\server-01

Status:	Active
Type:	Process
Created:	05-Jul-2001
Post-History:	05-Jul-2001, 01-Aug-2013
## 总结

- 用四个空格做缩进。不要用制表符
- 代码行限制在 79 个字符以内，文档注释一行限制在72个字符以内。ps：中文，字符宽度一般是英文的两倍。
- 在二元操作符的前面断行
- 函数和类定义前面要有两个空行与其它结构分开
- 类中方法要用一个空行分开
- 方法/函数中，可以用空行划分逻辑代码段
- Python3源文件编码一律使用UTF-8，文件开头不加编码声明
- 标准库中不要使用非默认编码
- 模块导入，一条语句只导入一个模块
- 导入语句应当位于文件顶部（仅在模块注释和文档字符串之后，在模块全局符号和常量之前）
- 但首尾都是双下划线的名称定义（`__all__`, `__author__`, `__version__`等），要放在导入语句之前，文档字符串之后
- 对于单个引号的字符串，单引号和双引号完全一样，但要保持一直
- 对于三引号字符串，都是使用双引号括起，从而和文档字符串保持一致（PEP 257）。

- 函数调用语句，函数名和开括号之间不要加空格
- if/while/for 和其后的圆括号（如果有）留一个空格`while (True):`。ps：语法上是不需要圆括号的。
- 二元运算符两侧各留一个空格`a = 1 + 2`
- 函数调用中，关键字实参，等号两侧不要空格 `fun(a=12, b=13)`

- 改写代码的时候一定要同时更新注释，因为和代码不对应的注释比没有注释更糟糕
- 公有函数、方法、类、模块要加文档注释
- 非公有的不用写文档注释，但同样要注释描述它们的功能。（用块注释）

- 不要用小写的l，大写的O，大写的I做单字符标识符名，因为在某些字体中这些字符无法和数字0、1区分开。
- 模块名，要短，要全用小写，必要时可以使用下划线。包名，也是如此，而且尽量别用下划线
- 类名通常使用 CapWords 风格
- 函数名、全局变量名、方法名、局部变量、方法形参名都使用小写单词加下划线的风格
- 常量：全大写，单词之间用下划线分隔。ps：Python中没有常量语法，这种风格更多是一种提示
- 类中，不希望外部代码访问的属性和方法，用单个下划线开头。ps：这也是一种提示，
- 类中，不希望被子类和外部访问的属性和方法，使用双下划线开头（但不要同时用双下划线结尾）
  ps：Python会对这种标识符做名称改写，具体的规则是透明的

- 对诸如 None 之类的单例对象的比较应当使用 is 和 is not，而不要用等于
- 不要把lambda赋值给变量，因为lambda的本意是直接用在表达式中。

## 简介
这个PEP介绍Python编码规范。
这个规范是不断发展变换的，因为Python本身也在变化。

具体到项目上，可能有项目特定的编码规范，如果和这里的规范冲突，则对于那个项目的代码以
项目规范为准。
## A Foolish Consistency is the Hobgoblin of Little Minds
Guido（Python的作者）观察到，代码被阅读的次数要远高于它被编写的次数，这指导我们制定
规范要注重代码可读性以及各个层面的Python代码的一致性。

本规范到一条原则是一致性。遵循本规范的一致性是重要的，保持项目代码的一致性是更重要的，
保持同一模块化或函数内代码风格的一致性是最重要的。

但也要知道何时可以放弃一致性，因为有些时候本指南中的风格是无法施行。当遇到疑惑时请尽力
做出判断，可以参考其它类似案例代码，不要直接无脑询问。

特别是，不要迂腐的为了遵循本指南的风格建议而破坏项目代码风格的后向一致性。

列出常见的几个无需遵顼本指南的情况：
- 当按照本指南做会使代码难于阅读的时候
- 当遵循本指南，会破坏其与前后代码风格的一致性的时候
- 当所讨论的代码早于指南的引入，并且没有其他理由修改该代码的时候
- 当代码需要与不支持样式指南推荐的功能的旧版本Python保持兼容时
## Code Lay-out

### Indentation
使用四个空格做缩进。
代码续行，应该视情况与上一行的某些部分竖直对齐，或者多缩进一个层级以示区分。
- 如果第一行有开圆括号、方括号、花括号，续行应当与此符号竖直对齐
- 但如果这种分隔符后面没有实参，可以使用悬挂缩进，但要多缩进一个层次，以示区分
> Continuation lines should align wrapped elements either vertically using Python's implicit line joining inside parentheses, brackets and braces, or using a hanging indent [7]. When using a hanging indent the following should be considered; there should be no arguments on the first line and further indentation should be used to clearly distinguish itself as a continuation line:

```py
# Correct:

# Aligned with opening delimiter.
foo = long_function_name(var_one, var_two,
                         var_three, var_four)

# 悬挂缩进，
# Add 4 spaces (an extra level of indentation) to distinguish arguments from the rest.
def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)

# Hanging indents should add a level.
foo = long_function_name(
    var_one, var_two,
    var_three, var_four)
```
```py
# Wrong:

# Arguments on first line forbidden when not using vertical alignment.
foo = long_function_name(var_one, var_two,
    var_three, var_four)

# Further indentation required as indentation is not distinguishable.
def long_function_name(
    var_one, var_two, var_three,
    var_four):
    print(var_one)

```

续行缩进单位不必须是四个空格。
The 4-space rule is optional for continuation lines.

Optional:
```py
# Hanging indents *may* be indented to other than 4 spaces.
foo = long_function_name(
  var_one, var_two,
  var_three, var_four)
```
if语句的条件，如果很长也是需要换行的。值得一说的是`if (`刚好是四个字符，和if语句体缩进
量恰好相等，如果条件语句的续行和圆括号的下一个字符对齐（按前面的规则），就不好从视觉上
和if语句体中的语句做区分。本指南没有对这种情况的应对方法做出强制规定，只是给出了几种可能
（但不是唯一）的方案:
When the conditional part of an if-statement is long enough to require that it be written across multiple lines, it's worth noting that the combination of a two character keyword (i.e. if), plus a single space, plus an opening parenthesis creates a natural 4-space indent for the subsequent lines of the multiline conditional. This can produce a visual conflict with the indented suite of code nested inside the if-statement, which would also naturally be indented to 4 spaces. This PEP takes no explicit position on how (or whether) to further visually distinguish such conditional lines from the nested suite inside the if-statement. Acceptable options in this situation include, but are not limited to:
```py
# No extra indentation.
# 不管他
if (this_is_one_thing and
    that_is_another_thing):
    do_something()

# Add a comment, which will provide some distinction in editors
# supporting syntax highlighting.
# 加一行注释，把它隔开
if (this_is_one_thing and
    that_is_another_thing):
    # Since both conditions are true, we can frobnicate.
    do_something()

# Add some extra indentation on the conditional continuation line.
# 多加一行缩进
if (this_is_one_thing
        and that_is_another_thing):
    do_something()
```
(Also see the discussion of whether to break before or after binary operators below.)

闭合括号的位置，有两种处理方式：
- 独占一行，缩进对齐
The closing brace/bracket/parenthesis on multiline constructs may either line up under the first non-whitespace character of the last line of list, as in:
```py
my_list = [
    1, 2, 3,
    4, 5, 6,
    ]
result = some_function_that_takes_arguments(
    'a', 'b', 'c',
    'd', 'e', 'f',
    )
```
or it may be lined up under the first character of the line that starts the multiline construct, as in:
- 独占一行，首字符对齐
```py
my_list = [
    1, 2, 3,
    4, 5, 6,
]
result = some_function_that_takes_arguments(
    'a', 'b', 'c',
    'd', 'e', 'f',
)
```

### 制表符还是空格？
用空格左缩进。
唯一可以用制表符做缩进的情况是：和旧代码风格保持一致。
Python3中，混用空格和制表符左缩进是非法的。

Python 2 code indented with a mixture of tabs and spaces should be converted to using spaces exclusively.

When invoking the Python 2 command line interpreter with the -t option, it issues warnings about code that illegally mixes tabs and spaces. When using -tt these warnings become errors. These options are highly recommended!
### 行的最大长度
代码行限制在 79个字符以内。
对于结构限制较少的长文本块（docstring或comments），行长度应限制为72个字符。

括号、方括号、花括号的隐式续行方式优先于反斜杠续行。

但确实存在只能使用反斜杠续行的情形，比如with语句就无法使用圆括号，assert 语句也是如此。
```py
with open('/path/to/some/file/you/want/to/read') as file_1, \
     open('/path/to/some/file/being/written', 'w') as file_2:
    file_2.write(file_1.read())
```

### 在二元操作符的前面还是后面断行？
Should a Line Break Before or After a Binary Operator?

在二元操作符之后换行的风格一度很流行，但这确实不利于阅读。
```py
# Wrong:
# operators sit far away from their operands
income = (gross_wages +
          taxable_interest +
          (dividends - qualified_dividends) -
          ira_deduction -
          student_loan_interest)
```
数学上，是在二元操作符之前换行的（Knuth风格）：
```py
# Correct:
# easy to match operators with operands
income = (gross_wages
          + taxable_interest
          + (dividends - qualified_dividends)
          - ira_deduction
          - student_loan_interest)
```
Python中，这两个方式都是可以的，只要代码自身保持一致即可。
对于新代码，建议使用 Knuth 风格。

### 空白行
Blank lines
- 顶层函数和类定义要环绕两个空白行
- 类中的方法定义环绕一个空白行
- 可以在必要的时候多加一个空行划分逻辑相关的函数
  连续多个单行函数定义/类定义之间可以不加空行
- 函数内部可以多加空行，划分逻辑上相关代码段
- Python 允许 Ctrl-L （Form feed）作为空白字符……
Surround top-level function and class definitions with two blank lines.

Method definitions inside a class are surrounded by a single blank line.

Extra blank lines may be used (sparingly) to separate groups of related functions. Blank lines may be omitted between a bunch of related one-liners (e.g. a set of dummy implementations).

Use blank lines in functions, sparingly, to indicate logical sections.

Python accepts the control-L (i.e. ^L) form feed character as whitespace; Many tools treat these characters as page separators, so you may use them to separate pages of related sections of your file. Note, some editors and web-based code viewers may not recognize control-L as a form feed and will show another glyph in its place.

### 源文件编码
Source File Encoding
- Python发行版中的核心部分应当只使用 UTF-8（对于Python3）或 ASCII（对于 Python2）
- Python 3中，UTF-8 编码的源文件不要添加编码声明；Python2中，ASCII文件不要使用编码声明
- 标准库中一律不得使用非默认编码，有默认编码无法表示的字符，使用转义序列。
  除非出于测试目的，或者是注释和文档字符串中的作者名字包含了非默认字符集编码，才可以使用
  非默认编码。

- 对于Python3
    - 标准库的标识符必须只包含ASCII，应当只使用英文单词
    - 字符串常量和注释中应当只包含ASCII字符，唯二的例外是
        a) 用于测试非ASCII字符特性的测试用例
        b) 包含非ASCII字符的作者名。此时，还必须提供一份对应的ASCII表示下的作者名

- 受众广泛的大型开源项目，也建议采用此策略。
### 模块导入
- 导入语句应当每行一个：
    ```py
    # Correct:
    import os
    import sys

    # Wrong:
    import sys, os
    ```
    但如下也是可以的：
    ```py
    # Correct:
    from subprocess import Popen, PIPE
    ```
- 导入语句应当位于文件顶部（仅在模块注释和文档字符串之后，在模块全局符号和常量之前）
  导入语句应当按如下顺序分组，并不同分组之间要有空白行
  - 标准库模块
  - 依赖的第三方库模块
  - 同一项目内的本地模块
- 应当优先使用绝对导入，因为它们更易于阅读也更健壮。尤其不应当使用隐式相对导入
    ```py
    import mypkg.sibling
    from mypkg import sibling
    from mypkg.sibling import example
    ```
    但显式的相对导入也是可以接受的，尤其是在复杂的包结构中，这时候使用绝对导入会很冗余。
    ```py
    from . import sibling
    from .sibling import example
    ```
    标准库应当避免复杂的包结构，并总是使用绝对导入方式。

    应当拒绝使用隐式的相对导入，且在Python3中，这种导入方式已被移除。
- 对于包含类定义的模块，可以如下这么导入：
    ps：就是直接导入类名
    ```py
    from myclass import MyClass
    from foo.bar.yourclass import YourClass
    ```
    但如果会引发名称冲突，就导入全名好了
    ps：就是导入模块名，然后使用 myclass.MyClass 的方式引用导入的类
    ```py
    import myclass
    import foo.bar.yourclass
    ```
- 应当避免使用通配符导入，但有一个例外用例

> Wildcard imports (`from <module> import *`) should be avoided, as they make it unclear which names are present in the namespace, confusing both readers and many automated tools. There is one defensible use case for a wildcard import, which is to republish an internal interface as part of a public API (for example, overwriting a pure Python implementation of an interface with the definitions from an optional accelerator module and exactly which definitions will be overwritten isn't known in advance).

这种用例下，需要遵循下面描述的这条规则
When republishing names this way, the guidelines below regarding public and internal interfaces still apply.

### Module Level Dunder Names
dunders 是指开头结尾都是双下划线的标识符（`如__all__`, `__author__`, `__version__`, 等等）
deuders 应当放置在模块字符串之后，但是在导入语句之前。
但是在 `from __future__ import xxxx` 语句之后。
```py
"""This is the example module.

This module does stuff.
"""

from __future__ import barry_as_FLUFL

__all__ = ['a', 'b', 'c']
__version__ = '0.1'
__author__ = 'Cardinal Biggles'

import os
import sys
```

## String Quotes
对于单个引号的字符串，单引号和双引号完全一样，本指南不做任何喜好选择。
你只需要选择一种风格，然后保持住就好。当字符串本身包含单引号或双引号的时候，换另一种引号
括起字符串，以避免反斜杠，以便保持可读性。
> In Python, single-quoted strings and double-quoted strings are the same. This PEP does not make a recommendation for this. Pick a rule and stick to it. When a string contains single or double quote characters, however, use the other one to avoid backslashes in the string. It improves readability.

对于三引号字符串，都是使用双引号括起，从而和文档字符串保持一致（PEP 257）。
> For triple-quoted strings, always use double quote characters to be consistent with the docstring convention in PEP 257.

## 表达式和语句中的空白

### Pet Peeves
下述情境中，避免多余的空白：
- 紧跟在开括号之后（圆括号、方括号、花括号：
    ```py
    # Correct:
    spam(ham[1], {eggs: 2})

    # Wrong:
    spam( ham[ 1 ], { eggs: 2 } )
    ```
- 末尾的逗号和闭括号之间
    ```py
    # Correct:
    foo = (0,)

    # Wrong:
    bar = (0, )
    ```
- 逗号、分号、冒号的前面
    ```py
    # Correct:
    if x == 4: print x, y; x, y = y, x

    # Wrong:
    if x == 4 : print x , y ; x , y = y , x
    ```
- 但是，在切片中，冒号的作用更像是一个二元运算符，此时前后的空白字符数量应当相等
    ````py
    # Correct:
    ham[1:9], ham[1:9:3], ham[:9:3], ham[1::3], ham[1:9:]
    ham[lower:upper], ham[lower:upper:], ham[lower::step]
    ham[lower+offset : upper+offset]
    ham[: upper_fn(x) : step_fn(x)], ham[:: step_fn(x)]
    ham[lower + offset : upper + offset]

    # Wrong:
    ham[lower + offset:upper + offset]
    ham[1: 9], ham[1 :9], ham[1:9 :3]
    ham[lower : : upper]
    ham[ : upper]
    ````
- 函数调用中，参数列表的开括号之前：
    ```py
    # Correct:
    spam(1)

    # Wrong:
    spam (1)
    ```
- 下标或切片的开括号（方括号）之前：
    ```py
    # Correct:
    dct['key'] = lst[index]

    # Wrong:
    dct ['key'] = lst [index]

    ```
- 为了对齐，在赋值运算符前面多加空格，也是不好的
    ps：貌似java和c代码见过这种操作？？
    ```py
    # Correct:
    x = 1
    y = 2
    long_variable = 3

    # Wrong:
    x             = 1
    y             = 2
    long_variable = 3
    ```

### Other Recommendations
- 行尾不要有空白字符，因为看不到，有时候会坏事（比如行尾反斜杠后有没有空白字符其语法含义是不一样的）
- 这些二元运算符两侧总是各留一个空格
    - 赋值 (=),
    - 扩展赋值 (+=, -= etc.),
    - 比较运算符 (==, <, >, !=, <>, <=, >=, in, not in, is, is not),
    - 布尔运算 (and, or, not).
- 如果表达式中有多个不同优先级的运算符，在低优先级的运算符两边添加空格。但是运算符周围的
  空格不能超过一个，同时两侧的空格数目要保持一致。
    ```py
    # Correct:
    i = i + 1
    submitted += 1
    x = x*2 - 1
    hypot2 = x*x + y*y
    c = (a+b) * (a-b)

    # Wrong:
    i=i+1
    submitted +=1
    x = x * 2 - 1
    hypot2 = x * x + y * y
    c = (a + b) * (a - b)

    ```
- 函数注解中的冒号，遵循一般的空格规则，函数注解中如果有`->`，两边各加一个空格
    ```py
    # Correct:
    def munge(input: AnyStr): ...
    def munge() -> PosInt: ...

    # Wrong:
    def munge(input:AnyStr): ...
    def munge()->PosInt: ...
    ```
- 关键字参数赋值，指定函数参数默认值（且没有注解），这两种情况下，赋值运算符两侧不要加空格
    Q. 为什么？
    ```py
    # Correct:
    def complex(real, imag=0.0):
        return magic(r=real, i=imag)

    # Wrong:
    def complex(real, imag = 0.0):
        return magic(r = real, i = imag)
    ```
    当然如果有了函数注解，要加上空格
    ```py
    # Correct:
    def munge(sep: AnyStr = None): ...
    def munge(input: AnyStr, sep: AnyStr = None, limit=1000): ...

    # Wrong:
    def munge(input: AnyStr=None): ...
    def munge(input: AnyStr, limit = 1000): ...
    ```
- 不建议一行写下多条语句：
    ```py
    # Correct:
    if foo == 'blah':
        do_blah_thing()
    do_one()
    do_two()
    do_three()
    ```
    Rather not:
    ```py
    # Wrong:
    if foo == 'blah': do_blah_thing()
    do_one(); do_two(); do_three()
    ```
    Q. 但是，if只有一条语句体的时候，这样写不是节省空间吗？？
- if/while/for 语句，如果语句体短小，是可以放在一行的，尽管不太好。如果语句体有多条语句，
  一定不要写成一行。

    可以，但尽量不要这么写：
    ```py
    # Wrong:
    if foo == 'blah': do_blah_thing()
    for x in lst: total += x
    while t < 10: t = delay()
    ```
    绝对不要这么写：
    ```py
    # Wrong:
    if foo == 'blah': do_blah_thing()
    else: do_non_blah_thing()

    try: something()
    finally: cleanup()

    do_one(); do_two(); do_three(long, argument,
                                list, like, this)

    if foo == 'blah': one(); two(); three()
    ```


## 何时使用尾部逗号
When to Use Trailing Commas

末尾的逗号一般可以省略，除非是语法强制要求--构造单元素元组，但这个时候，为了清晰起见，
要求使用圆括号。

```py
# Correct:
FILES = ('setup.cfg',)

# Wrong:
FILES = 'setup.cfg',
```
当有一系列值、参数或者导入项，而且它们可能会随时间而增加的时候，可以每个占一行，后面跟
逗号，闭括号独占一行，这对版本控制系统有帮助。
但是如果把这些值都写在一行中，末尾那个多余的逗号就没有意义了。
> When trailing commas are redundant, they are often helpful when a version control system is used, when a list of values, arguments or imported items is expected to be extended over time. The pattern is to put each value (etc.) on a line by itself, always adding a trailing comma, and add the close parenthesis/bracket/brace on the next line. However it does not make sense to have a trailing comma on the same line as the closing delimiter (except in the above case of singleton tuples):

```py
# Correct:
FILES = [
    'setup.cfg',
    'tox.ini',
    ]
initialize(FILES,
           error=True,
           )

# Wrong:
FILES = ['setup.cfg', 'tox.ini',]
initialize(FILES, error=True,)
```

## Comments
和代码不一致的注释比没有注释更糟糕。所以一定要在更新代码的时候同时更新注释，保持一致。

注释应该是完成的句子，首字母大写，但如果首字母是标识符，就不要大写。

块注释，通常由多个完整的句子构成，每句话要用句号结束。

块注释，每句话的结束句号后要跟着两个空格，除非它是最后一句话的结束句号。

确保你的注释是清晰的，并且你所用语言的其他人很容易理解。

非英语国家的编码者注意了，除非你120%确信你的代码不会被你使用的语言之外的人阅读，否则都要
使用英语注释。
PS: 这不是为难我吗@@
> Python coders from non-English speaking countries: please write your comments in English, unless you are 120% sure that the code will never be read by people who don't speak your language.

### Block Comments
块注释通常应用于排在其后面的某些（或所有）代码，并且和那些代码具备同样的所尽量。
块注释中的每一行都以一个井号后跟一个空格开头。
块注释的段落之间用独占一行的井号分隔。ps：而不是用空行。
### Inline Comments
单行注释要少用。
单行注释是和它要注释的语句在同一行的注释。并且和语句之间至少间隔两个空格，它以一个井号后跟一个空格
构成。

不要重复注释显而易见的内容：
```py
x = x + 1                 # Increment x
```

偶尔，如下这种注释才是有用的：
```py
x = x + 1                 # Compensate for border

```
PS：独占一行的单行注释呢？
### Documentation Strings
文档注释的完整指南在 PEP 257 中。
- 共有的模块、类、方法需要文档注释，非公有的则不必须有文档注释，但同样应该注释描述方法的
  功能。文档注释要放在 def 行的后面。
- PEP 257 描述了良格式的文档注释，其中最重要的是，多行文档注释的结束三引号要独占一行。
```py
"""Return a foobang

Optional plotz says to frobnicate the bizbaz first.
"""
```
- 单行文档注释，它的结束三引号要保持在同一行
`"""Return an ex-parrot."""`


## 标识符风格
Python库的标识符风格有些混乱，所以不要强求完全与此保持一致。
新模块和包应当遵循这里的指南，但旧有的模块保持原来的风格就好。

### Overriding Principle
共有API，其标识符的命名应当能够反映其用途而不是实现。
> Names that are visible to the user as public parts of the API should follow conventions that reflect usage rather than implementation.

### Descriptive: Naming Styles
有许多不同的命名风格，它有助于识别所使用的命名样式，独立于它们的用途。

通常会区分下述命名风格：
- b (single lowercase letter)：单个小写字母
- B (single uppercase letter): 单个大写字母
- lowercase：小写单词
- lower_case_with_underscores：下划线分隔的小写单词
- UPPERCASE：大写单词
- UPPER_CASE_WITH_UNDERSCORES：下划线分隔的大写
- 驼峰式：CapitalizedWords (or CapWords, or CamelCase). This is also sometimes known as StudlyCaps.
  注：如果其中含有缩略语，大写每个缩略语的字母更好一些。
  HTTPServerError 比 HttpServerError 要好。
- 混合格式：mixedCase(differs from CapitalizedWords by initial lowercase character!)
- Capitalized_Words_With_Underscores (ugly!)：下划线分隔的首字母大写风格。（真丑！）
  PS：PL/SQL Developer 就会把带有下划线的标识符搞成这种风格

还有一种风格：给一组相关的标识符使用公共前缀，这在Python中不常用。也确实有，比如函数
`os.stat()`返回一个元组，元组的各项的名字通常类似于 st_mode, st_size, st_mtime。
用于强调逻辑上的关联关系。但Python不需要这么做，因为属性、方法已经有对象名做前缀，函数
则已经有了模块名做前缀。
> (This is done to emphasize the correspondence with the fields of the POSIX system call struct, which helps programmers familiar with that.)


> The X11 library uses a leading X for all its public functions. In Python, this style is generally deemed unnecessary because attribute and method names are prefixed with an object, and function names are prefixed with a module name.

另外，还有如下使用下划线开头/结尾的形式（可以和任何大小写风格搭配）：
- 单个下划线开头：弱弱地表名“仅供内部使用”。例如 `from M import * `语句不会导入单个下划线开头的标识符
  Q. 会导入双下划线开头的吗？也不会

- _single_leading_underscore: weak "internal use" indicator. E.g. from M import * does not import objects whose names start with an underscore.

- single_trailing_underscore_: used by convention to avoid conflicts with Python keyword, e.g.
- 单个下划线结尾：用于避免关键字冲突

    tkinter.Toplevel(master, class_='ClassName')

- __double_leading_underscore: when naming a class attribute, invokes name mangling (inside class FooBar, __boo becomes _FooBar__boo; see below).
  双下划线开头的类属性，是类的私有变量，Python解释器会对名字做改写。
- `__double_leading_and_trailing_underscore__`: "magic" objects or attributes that live in user-controlled namespaces. E.g. `__init__`, `__import__` or `__file__`. Never invent such names; only use them as documented.
  开头结尾都有双下划线的，是“魔术”方法。不要自己定以新的魔术方法，只使用文档说明中有的。

### Prescriptive: Naming Conventions
#### Names to Avoid
不要用小写的l，大写的O，大写的I做单字符标识符名，因为在某些字体中这些字符无法和数字0、1区分开。
ps：就是多字符的标识符可以用喽？
#### ASCII Compatibility
标准库的标识符必须保持ASCII兼容，PEP 3131 中的 policy 节。

#### 包名和模块名
模块名，要短，要全用小写，必要时可以使用下划线。
包名也是如此，但不鼓励用下划线（可以用的）。

When an extension module written in C or C++ has an accompanying Python module that provides a higher level (e.g. more object oriented) interface, the C/C++ module has a leading underscore (e.g. _socket).
#### 类名
类名通常使用 CapWords 风格。

如果这个接口原本是用作可调用对象的，并且已经写在了文档中，那么这个类可以使用函数名风格。
The naming convention for functions may be used instead in cases where the interface is documented and used primarily as a callable.

内置标识符，使用单独的风格：一般是单个单词，也有两个单词放在一起的，CapWords 风格只用
在内置异常和内置常量中。

> Note that there is a separate convention for builtin names: most builtin names are single words (or two words run together), with the CapWords convention used only for exception names and builtin constants.


#### 类型变量的名字
Type Variable Names
Names of type variables introduced in PEP 484 should normally use CapWords preferring short names: T, AnyStr, Num. It is recommended to add suffixes _co or _contra to the variables used to declare covariant or contravariant behavior correspondingly:
```py
from typing import TypeVar

VT_co = TypeVar('VT_co', covariant=True)
KT_contra = TypeVar('KT_contra', contravariant=True)
```
#### Exception Names
和类名一样，但如果异常是错误，则加 Error 后缀。
Because exceptions should be classes, the class naming convention applies here. However, you should use the suffix "Error" on your exception names (if the exception actually is an error).
#### 全局变量名
Global Variable Names
(Let's hope that these variables are meant for use inside one module only.) The conventions are about the same as those for functions.
假设这全局变量只在本模块内使用
1. 和函数名一样的风格
2. 如果这个模块的设计目的是用 `from M import *` 导入，应该用 `__all__` 机制避免导出全局变量，或者使用旧的单下开头划线风格避免导出。

Modules that are designed for use via `from M import *` should use the `__all__` mechanism to prevent exporting globals, or use the older convention of prefixing such globals with an underscore (which you might want to do to indicate these globals are "module non-public").
#### 函数和变量名
Function and Variable Names
函数和变量应该使用下划线分隔的小写单词风格。

#### 函数和方法参数
Function and Method Arguments
- 实例方法第一个参数要用 self，类方法的第一个参数要用 cls。
- 参数如果和关键字冲突，建议添加一个下划线后缀。

#### 方法名和实例变量名
Method Names and Instance Variables
使用函数名一样的风格：小写单词+下划线。

仅在非公开方法名和实例变量名中使用单下划线开头。

要使变量成为“私有”的（外部和子类都不能直接访问），使用双下划线开头。
这会触发 Python's name mangling rules.
这个规则是这样的：如果类 Foo 有个属性 `__a`，在外部，会变成  `Foo._FOO__a`
#### 常量
Constants
全大写，下划线。
#### Designing for Inheritance
对每个方法和实例变量都要决定是应该否设为共有的。如果不确定，就先设成非公有的。把私有改成
共有很容易，反过来则很麻烦。
> Always decide whether a class's methods and instance variables (collectively: "attributes") should be public or non-public. If in doubt, choose non-public; it's easier to make it public later than to make a public attribute non-public.

原来Java 里的 public 和 protect 还有这种解读思路。
> Public attributes are those that you expect unrelated clients of your class to use, with your commitment to avoid backwards incompatible changes. Non-public attributes are those that are not intended to be used by third parties; you make no guarantees that non-public attributes won't change or even be removed.

> We don't use the term "private" here, since no attribute is really private in Python (without a generally unnecessary amount of work).

> Another category of attributes are those that are part of the "subclass API" (often called "protected" in other languages). Some classes are designed to be inherited from, either to extend or modify aspects of the class's behavior. When designing such a class, take care to make explicit decisions about which attributes are public, which are part of the subclass API, and which are truly only to be used by your base class.

### Public and Internal Interfaces

Any backwards compatibility guarantees apply only to public interfaces. Accordingly, it is important that users be able to clearly distinguish between public and internal interfaces.

Documented interfaces are considered public, unless the documentation explicitly declares them to be provisional or internal interfaces exempt from the usual backwards compatibility guarantees. All undocumented interfaces should be assumed to be internal.

To better support introspection, modules should explicitly declare the names in their public API using the `__all__` attribute. Setting `__all__` to an empty list indicates that the module has no public API.

Even with `__all__` set appropriately, internal interfaces (packages, modules, classes, functions, attributes or other names) should still be prefixed with a single leading underscore.

An interface is also considered internal if any containing namespace (package, module or class) is considered internal.

没能理解下面这一段的含义？
Imported names should always be considered an implementation detail. Other modules must not rely on indirect access to such imported names unless they are an explicitly documented part of the containing module's API, such as os.path or a package's `__init__` module that exposes functionality from submodules.

## Programming Recommendations……

- 对诸如 None 之类的单例的比较应当使用 is 和 is not，而不要用等于。Q.为什么?
- 不要把lambda赋值给变量，如果需要，使用 def 代替。
```py
# Correct:
def f(x): return 2*x

# Wrong:
f = lambda x: 2*x
```
第一种形式在输出错误堆栈的时候是函数名 f，而后者会输出为 `<lambda>`.
lambda的本意是可以直接用在表达式中，避免 def 语句，你把他赋值给标识符，完全误用了。
> The first form means that the name of the resulting function object is specifically 'f' instead of the generic '<lambda>'. This is more useful for tracebacks and string representations in general. The use of the assignment statement eliminates the sole benefit a lambda expression can offer over an explicit def statement (i.e. that it can be embedded inside a larger expression)

- 自定义异常类，要从 Exception 继承，而不是 BaseException。直接继承 BaseException 的异常
  一般用于那些不应当被捕获的异常。
- 捕获异常，尽量指明具体的异常类，不要用空的 except
    ```py
    try:
        import platform_specific_module
    except ImportError:
        platform_specific_module = None
    ```
    - `except:`会把 SystemExit 和 KeyboardInterrupt 一起捕获，搞得程序不好退出
    Q. SystemExit 是？
    - 如果确实需要捕获所有应当被视为程序错误的异常，使用 `except Exception:` 就够了
    - `except:`等价于 `except BaseException:`

    > A bare except: clause will catch SystemExit and KeyboardInterrupt exceptions, making it harder to interrupt a program with Control-C, and can disguise other problems. If you want to catch all exceptions that signal program errors, use except Exception: (bare except is equivalent to except BaseException:).

### Function Annotations
### Variable Annotations

# PEP 255 - 简单生成器
Simple Generators
Requires:	234
Created:	18-May-2001
Python-Version:	2.2

## Abstract(概述)
本提案介绍 Python 生成器的概念和与之对应的新语法-- yield 语句。
> This PEP introduces the concept of generators to Python, as well as a new statement used in conjunction with them, the yield statement.

## Motivation(动机)
有这样一个问题：当一个生产者函数生成一些列值的时候，如果需要在这些值之间维护状态变化，
会很麻烦。然而大多数编程语言并未对此问题提供美观、高效的解决方案，仅仅是给生产者函数
添加一个回调函数的参数，每产生一个值旧调用一次回调函数。
Q. 意思我能明白，但回调函数是什么情况？
> When a producer function has a hard enough job that it requires maintaining state between values produced, most programming languages offer no pleasant and efficient solution beyond adding a callback function to the producer's argument list, to be called with each value produced.

例如，标准库函 taokenize.py 就是用的这个方法……。tokenize() 函数需要一个 tokeneater
回调，每当找到一个词法单元（token）的时候就回调 tokeneater，这样 tokenize 函数写起来
就很自然，但调用 tokenize 的人就常常陷入需要记住 tokeneater 上次被调用时接受的此法单元
的困境。taanany.py
这种方式相当复杂，容易出错，不易理解，不幸的是却很常见。
> For example, tokenize.py in the standard library takes this approach: the caller must pass a tokeneater function to tokenize(), called whenever tokenize() finds the next token. This allows tokenize to be coded in a natural way, but programs calling tokenize are typically convoluted by the need to remember between callbacks which token(s) were seen last. The tokeneater function in tabnanny.py is a good example of that, maintaining a state machine in global variables, to remember across callbacks what it has already seen and what it hopes to see next. This was difficult to get working correctly, and is still difficult for people to understand. Unfortunately, that's typical of this approach.

如果全部解析完毕再整体返回可以使调用者正序编写起来自然一些，但这不现实，因为程序可能特别大，
大到内存装不下，而且需要考察某一部分片段的时候也解析整个程序，无疑是浪费。
> An alternative would have been for tokenize to produce an entire parse of the Python program at once, in a large list. Then tokenize clients could be written in a natural way, using local variables and local control flow (such as loops and nested if statements) to keep track of their state. But this isn't practical: programs can be very large, so no a priori bound can be placed on the memory needed to materialize the whole parse; and some tokenize clients only want to see whether something specific appears early in the program (e.g., a future statement, or, as is done in IDLE, just the first indented statement), and then parsing the whole program first is a severe waste of time.

返回迭代器而不是返回列表，可以解决内存问题。不过实现迭代器的人仍需要设法记住多次next()
调用之间的状态信息。也可以选择某种可以产生树结构作为结果的算法，只是遍历它的时候需要手工
移除递归并记住遍历状态。
> Another alternative would be to make tokenize an iterator [1], delivering the next token whenever its .next() method is invoked. This is pleasant for the caller in the same way a large list of results would be, but without the memory and "what if I want to get out early?" drawbacks. However, this shifts the burden on tokenize to remember its state between .next() invocations, and the reader need only glance at tokenize.tokenize_loop() to realize what a horrid chore that would be. Or picture a recursive algorithm for producing the nodes of a general tree structure: to cast that into an iterator framework requires removing the recursion manually and maintaining the state of the traversal by hand.

第四种方式是使用多线程实现的生产者消费者模型，这种模式下双方的代码都很自然。
Demo/threads/Generator.py 就是个很好的例子。然而这比不使用多线程的解决方案慢很多，
更遑论还有不支持多线程的平台。
> A fourth option is to run the producer and consumer in separate threads. This allows both to maintain their states in natural ways, and so is pleasant for both. Indeed, Demo/threads/Generator.py in the Python source distribution provides a usable synchronized-communication class for doing that in a general way. This doesn't work on platforms without threads, though, and is very slow on platforms that do (compared to what is achievable without threads).

终极解决方案是无栈结构的Python实现变种，这种实现支持轻量级的协程，写出来的代码和多线程
一样漂亮但效率高了太多。然而这种实现是另一种思维模式，从而不适合Jython实现同样的语义。
本提案不争论这个，而是引入生成器的概念，生成器实现了无栈的功能子集，能够很好的契合CPython
实现，并提供充分的解决问题的能力。
> A final option is to use the Stackless [2] [3] variant implementation of Python instead, which supports lightweight coroutines. This has much the same programmatic benefits as the thread option, but is much more efficient. However, Stackless is a controversial rethinking of the Python core, and it may not be possible for Jython to implement the same semantics. This PEP isn't the place to debate that, so suffice it to say here that generators provide a useful subset of Stackless functionality in a way that fits easily into the current CPython implementation, and is believed to be relatively straightforward for other Python implementations.

这段话是说，本提案与其他同类方案稍有差别，但中心思想是相同的：可以返回多个值，并记住自己
的执行状态。
> That exhausts the current alternatives. Some other high-level languages provide pleasant solutions, notably iterators in Sather [4], which were inspired by iterators in CLU; and generators in Icon [5], a novel language where every expression is a generator. There are differences among these, but the basic idea is the same: provide a kind of function that can return an intermediate result ("the next value") to its caller, but maintaining the function's local state so that the function can be resumed again right where it left off. A very simple example:
```py
def fib():
    a, b = 0, 1
    while 1:
       yield b
       a, b = b, a+b
```
从编程的角度，和多线程一样方便，但本质上只有一个线程，效率高。
When fib() is first invoked, it sets a to 0 and b to 1, then yields b back to its caller. The caller sees 1. When fib is resumed, from its point of view the yield statement is really the same as, say, a print statement: fib continues after the yield with all local state intact. a and b then become 1 and 1, and fib loops back to the yield, yielding 1 to its invoker. And so on. From fib's point of view it's just delivering a sequence of results, as if via callback. But from its caller's point of view, the fib invocation is an iterable object that can be resumed at will. As in the thread approach, this allows both sides to be coded in the most natural ways; but unlike the thread approach, this can be done efficiently and on all platforms. Indeed, resuming a generator should be no more expensive than a function call.

这种模式可以作为多种生产者消费者问题的解决方案。
The same kind of approach applies to many producer/consumer functions. For example, tokenize.py could yield the next token instead of invoking a callback function with it as argument, and tokenize clients could iterate over the tokens in a natural way: a Python generator is a kind of Python iterator [1], but of an especially powerful kind.

## Specification: Yield（yield语句）
如你所见，引入了新语法：
```
yield_stmt:    "yield" expression_list

```
因为是新特性，所以要加上下面这句话开启语法支持，等到了新版的 Python 中，yield 会成为
新关键字，就不需要加这句话了。
`from __future__ import generators`

yield 语句只能在函数内部使用。含有 yield 语句的函数叫做生成器函数（generator function
）。生成器函数和普通函数对象完全一样，只不过在它的代码对象的 co_flags 成员上设置了
CO_GENERATOR标志位。

生成函数被调用的时候，形参绑定过程和普通函数一致，但不会立即开始执行函数中的代码，而是返回
一个生成器-迭代器对象（geneartor-iterator object），该对象遵循迭代器协议，特别地，是
可以用在for循环中的。注意，在上下文信息充分的前提下，可以用生成器（generator）指代生成器
函数，也可以指代者生成器-迭代器对象。

每次调用生成器-迭代器的.next()方法，生成器函数的函数体就被执行，直到遇到yield语句或者
return语句，或者到达函数尾。

如果遇到yield语句，函数状态被冻结，并将 expression_list 的值返回给 .next() 方法的
调用者。注意，这里冻结的含义是，函数的所有本地状态都被保留下来，包括本地变量绑定，指令
指针，栈，总之保留了充足的信息，使得当下一次调用 .next() 方法的时候，函数可以从挂起
的地方继续执行，效果相当于执行 yield 语句就和调用了一个函数一样。
> If a yield statement is encountered, the state of the function is frozen, and the value of expression_list is returned to .next()'s caller. By "frozen" we mean that all local state is retained, including the current bindings of local variables, the instruction pointer, and the internal evaluation stack: enough information is saved so that the next time .next() is invoked, the function can proceed exactly as if the yield statement were just another external call.

限制：yield语句不能用在try/finally结构的 try 代码块中。理由是无法保证生成器一定会被
唤醒，进而就无法确保finally语句一定可以被执行。

限制：正在执行的生成器不能再被唤醒。
```py
>>> def g():
...     i = me.next()
...     yield i
>>> me = g()
>>> me.next()
Traceback (most recent call last):
 ...
 File "<string>", line 2, in g
ValueError: generator already executing
```
ps: 这里的 me.next() 如今应该是 `me.__next__()` 或者 next(me)。
这个提案诞生的时候还是 Python2 都还很年轻，如今都是Python3的时代了，迭代协议的 .next()
早就变成 `.__next__()`了。
PS：现在（2020年11月26日） yield 不是语句，而是表达式
PS：现在生成器函数中的 yield 可以放在try-catch-finally结构中的try代码块中，因为有了新
的机制确保生成器被销毁前一定得到执行。（PEP？来着）
## Specification: Return（return语句）
生成器函数可以包含return语句。
```
return
```
注意，生成器函数中的return语句后面不得放置任何表达式，
当生成器函数执行到return语句的时候，处理过程和普通函数一样，执行必要的finally代码块（如
果有），然后抛出 StopIteration 异常。另外，如果执行到了函数末尾，即使没有遇到显式的
return语句，也会抛出 StopIteration 异常。
PS：现在（2020年11月26日）生成器函数中 return 后面可以跟表达式了


Note that return means "I'm done, and have nothing interesting to return", for both generator functions and non-generator functions.

注意，生成器函数中的return语句并不总是等价于抛出 StopIteration 异常，这要受到try/catch
结构的影响。例如：
```py
>>> def f1():
...     try:
...         return
...     except:
...        yield 1
>>> print list(f1())
[]
```
因为return语句就是简单的退出（就如普通函数中一样），但下面这个，
```py
>>> def f2():
...     try:
...         raise StopIteration
...     except:
...         yield 42
>>> print list(f2())
[42]
```
因为 except 代码块捕捉到了异常。

## Specification: Generators and Exception Propagation（生成器和异常的传播）
未经捕获的异常会像通常那样传递给生成器-迭代器的调用者，后续在尝试唤醒生成器函数会得到
StopIteration异常，也就是说未捕获异常会终止生成器的正常生命周期。
> If an unhandled exception-- including, but not limited to, StopIteration --is raised by, or passes through, a generator function, then the exception is passed on to the caller in the usual way, and subsequent attempts to resume the generator function raise StopIteration. In other words, an unhandled exception terminates a generator's useful life.

Example (not idiomatic but to illustrate the point):
```py
>>> def f():
...     return 1/0
>>> def g():
...     yield f()  # the zero division exception propagates
...     yield 42   # and we'll never get here
>>> k = g()
>>> k.next()
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
  File "<stdin>", line 2, in g
  File "<stdin>", line 2, in f
ZeroDivisionError: integer division or modulo by zero
>>> k.next()  # and the generator cannot be resumed
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
StopIteration
>>>
```

## Specification: Try/Except/Finally
As noted earlier, yield is not allowed in the try clause of a try/finally construct. A consequence is that generators should allocate critical resources with great care. There is no restriction on yield otherwise appearing in finally clauses, except clauses, or in the try clause of a try/except construct.
Q. 很神奇，如果 try/except/finally 中的except代码块有yield，同样不能保证finally被执行吧？为什么就允许except中出现yield呢？

## Example

## Q & A

### Why not a new keyword instead of reusing def?
See BDFL Pronouncements section below.
### Why a new keyword for yield? Why not a builtin function instead?
? 学艺不精，看不懂。

Control flow is much better expressed via keyword in Python, and yield is a control construct. It's also believed that efficient implementation in Jython requires that the compiler be able to determine potential suspension points at compile-time, and a new keyword makes that easy. The CPython reference implementation also exploits it heavily, to detect which functions are generator-functions (although a new keyword in place of def would solve that for CPython -- but people asking the "why a new keyword?" question don't want any new keyword).

### Then why not some other special syntax without a new keyword?
……
### Why allow return at all? Why not force termination to be spelled raise StopIteration?
异常是底层原理，并不是普通场景下用的，是给高级用户用的。

The mechanics of StopIteration are low-level details, much like the mechanics of IndexError in Python 2.1: the implementation needs to do something well-defined under the covers, and Python exposes these mechanisms for advanced users. That's not an argument for forcing everyone to work at that level, though. return means "I'm done" in any kind of function, and that's easy to explain and to use. Note that return isn't always equivalent to raise StopIteration in try/except construct, either (see the "Specification: Return" section).
### Then why not allow an expression on return too?
将来可能会加上。
PS：确实加上了。
Perhaps we will someday. In Icon, return expr means both "I'm done", and "but I have one final useful value to return too, and this is it". At the start, and in the absence of compelling uses for return expr, it's simply cleaner to use yield exclusively for delivering values.
# PEP 342 -- 基于增强型生成器实现的协程
Coroutines via Enhanced Generators

Title:	Coroutines via Enhanced Generators
Author:	Guido van Rossum, Phillip J. Eby
Status:	Final
Type:	Standards Track
Created:	10-May-2005
Python-Version:	2.5

## 简介
本提案对生成器做了一些扩展，使其可以用作简单协程。

本提案其实是对 PEP 288 和 PEP 325 的合并。

PEP 288, Generators Attributes and Exceptions
PEP 325, Resource-Release Support for Generators.
## 动机
有很多算法天然适合用协程解决，包括：模拟、游戏、异步I/O，以及其它基于事件驱动或者协作
多任务的编程模型。Python的生成器函数很贴近协程的概念，但还不完全是，因为生成器可以挂起
并返回值，但没有办法在恢复执行的时候从外界传进来值甚至是异常。生成器也不可以在try/finally
结构中的try代码块内挂起，这使得异常终止的协程的清理工作很难做。


而且生成器还无法做到在调用其它函数的时候让出控制权，除非这些函数本身也是生成器，然后还得
由外部生成器？？？。这使甚至相对简单的用例（例如异步通信）的实现也变得复杂，因为调用任何
函数要么需要生成器阻塞（即无法屈服控制），要么必须在每个需要的函数调用周围添加许多样板
循环代码。

> Also, generators cannot yield control while other functions are executing, unless those functions are themselves expressed as generators, and the outer generator is written to yield in response to values yielded by the inner generator. This complicates the implementation of even relatively simple use cases like asynchronous communications, because calling any functions either requires the generator to block (i.e. be unable to yield control), or else a lot of boilerplate looping code must be added around every needed function call.

但如果能把值和异常传递到生成器函数挂起的地方，那就只需要一个简单的协程调度器或者蹦床函数
（trampoline function），就能实现协程之间的互相调用，还不需要阻塞--这是异步应用的巨大
福音。这些应用可以用协程做非阻塞IO，通过把控制权让给io调度器，直到数据发送完毕或者数据
读取完毕。与此同时，执行IO操作的代码可以写成这样：
`data = (yield nonblocking_read(my_socket, nbytes))`
> However, if it were possible to pass values or exceptions into a generator at the point where it was suspended, a simple co-routine scheduler or trampoline function would let coroutines call each other without blocking -- a tremendous boon for asynchronous applications. Such applications could then write co-routines to do non-blocking socket I/O by yielding control to an I/O scheduler until data has been sent or becomes available. Meanwhile, code that performs the I/O would simply do something like this:
`data = (yield nonblocking_read(my_socket, nbytes))`
PS：这里的奥妙莫非在于，生成器函数 gouter 返回的是另一个生成器 ginner，而外部调度器
收到 gouter 产出的值 ginner 后发现是个生成器，就手动解析 ginner 的值，然后再反传递给
gouter。而在 gouter 看来就好像直接从 ginner 中获得了值。

只要引入很少的特性，就可以支持异步操作，还不需要把整个应用程序写成一串回调函数，也
不需要编写成耗费资源的多线程形式。
ps：总至就是代价少，易于推广，好处多多。
> In other words, with a few relatively minor enhancements to the language and to the implementation of the generator-iterator type, Python will be able to support performing asynchronous operations without needing to write the entire application as a series of callbacks, and without requiring the use of resource-intensive threads for programs that need hundreds or even thousands of co-operatively multitasking pseudothreads. Thus, these enhancements will give standard Python many of the benefits of the Stackless Python fork, without requiring any significant modification to the CPython core or its APIs. In addition, these enhancements should be readily implementable by any Python implementation (such as Jython) that already supports generators.

## 规范概要
By adding a few simple methods to the generator-iterator type, and with two minor syntax adjustments, Python developers will be able to use generator functions to implement co-routines and other forms of co-operative multitasking. These methods and adjustments are:

- 重定义 yield 为表达式，而不是语句了。常规 next() 调用唤起的生成器，yield 表达式值为None。
- 生成器对象新增 send() 方法，此方法把唤起生成器函数，并把方法实参设置给 yield 表达式
  的值，此方法返回下一个 yield 表达式生成的值，或者，如果生成器没有生成新值而直接退出，则
  方法抛出 StopIteration 异常。
- 生成器对象新增 throw() 方法，此方法唤起生成器，把方法参数指定的异常在 yield 表达式处
  抛出，然后返回生成器生成的下一个值，或者抛出 StopIteration 异常（如果生成器退出），
  或者，如果生成器没有捕获传入的异常或者抛出了新异常，则这异常传播给外部调用者。
- 生成器对象新增 close() 方法，此方法唤醒生成器并在生成器挂起的地方抛出 GeneratorExit
  异常。
  接着，
    - 如果生成器抛出 StopIteration（通过正常结束或者由于已经关闭而导致）或者
    GeneratorExie（通过不捕获这个异常），close() 方法正常返回。
    - 如果生成器返回了一个值，close() 就抛出 RuntimerError 异常。
    - 如果生成器抛出其它异常，异常会传递给close()方法的调用者。
  但是如果生成器已经因为异常或正常退出而结束，则close()方法不做任何动作。

- 增加机制，确保生成器被回收之前一定调用 close() 方法
- 进而允许 try/finally 结构中 try 代码块中允许使用 yield

> Add a close() method for generator-iterators, which raises GeneratorExit at the point where the generator was paused. If the generator then raises StopIteration (by exiting normally, or due to already being closed) or GeneratorExit (by not catching the exception), close() returns to its caller. If the generator yields a value, a RuntimeError is raised. If the generator raises any other exception, it is propagated to the caller. close() does nothing if the generator has already exited due to an exception or normal exit.
Add support to ensure that close() is called when a generator iterator is garbage-collected.
Allow yield to be used in try/finally blocks, since garbage collection or an explicit close() call would now allow the finally clause to execute.

A prototype patch implementing all of these changes against the current Python CVS HEAD is available as SourceForge patch

## 规范：
Specification: Sending Values into Generators

### New generator method: send(value)
A new method for generator-iterators is proposed, called send(). It takes exactly one argument, which is the value that should be sent in to the generator. Calling send(None) is exactly equivalent to calling a generator's next() method. Calling send() with any other value is the same, except that the value produced by the generator's current yield expression will be different.

- 初次调用，需要用 next() 或者 send(None) 启动
Because generator-iterators begin execution at the top of the generator's function body, there is no yield expression to receive a value when the generator has just been created. Therefore, calling send() with a non-None argument is prohibited when the generator iterator has just started, and a TypeError is raised if this occurs (presumably due to a logic error of some kind). Thus, before you can communicate with a coroutine you must first call next() or send(None) to advance its execution to the first yield expression.
- 返回，结束，异常传递
As with the next() method, the send() method returns the next value yielded by the generator-iterator, or raises StopIteration if the generator exits normally, or has already exited. If the generator raises an uncaught exception, it is propagated to send()'s caller.

### New syntax: Yield Expressions
The yield-statement will be allowed to be used on the right-hand side of an assignment; in that case it is referred to as yield-expression. The value of this yield-expression is None unless send() was called with a non-None argument; see below.

- 关于 yield 的优先级，基本总是需要用括号，唯一的例外是：顶级表达式的等号的右边。
下面是合法的，
```py
x = yield 42
x = yield
x = 12 + (yield 42)
x = 12 + (yield)
foo(yield 42)
foo(yield)
```
这些则是错误的。
```py
x = 12 + yield 42
x = 12 + yield
foo(yield 42, 12)
foo(yield, 12)
```
are all illegal. (Some of the edge cases are motivated by the current legality of yield 12, 42.)

注意，不带表达式的 yield 语句或 yield 表达式也是合法的，它生成一个 None 值，然后可以从
外界接受值。
> Note that a yield-statement or yield-expression without an expression is now legal. This makes sense: when the information flow in the next() call is reversed, it should be possible to yield without passing an explicit value (yield is of course equivalent to yield None).

- send(value) 可以给yield 传入值
- 如果yield 表达式是 yield 语句，那么yield表达式的返回值被忽略，就类似于调用一个函数
  然后丢弃函数的返回值。
> When send(value) is called, the yield-expression that it resumes will return the passed-in value. When next() is called, the resumed yield-expression will return None. If the yield-expression is a yield-statement, this returned value is ignored, similar to ignoring the value returned by a function call used as a statement.

continue……
In effect, a yield-expression is like an inverted function call; the argument to yield is in fact returned (yielded) from the currently executing function, and the return value of yield is the argument passed in via send().

Note: the syntactic extensions to yield make its use very similar to that in Ruby. This is intentional. Do note that in Python the block passes a value to the generator using send(EXPR) rather than return EXPR, and the underlying mechanism whereby control is passed between the generator and the block is completely different. Blocks in Python are not compiled into thunks; rather, yield suspends execution of the generator's frame. Some edge cases work differently; in Python, you cannot save the block for later use, and you cannot test whether there is a block or not. (XXX - this stuff about blocks seems out of place now, perhaps Guido can edit to clarify.)

## Specification: Exceptions and Cleanup

### New syntax: yield allowed inside try-finally
### New generator method: throw(type, value=None, traceback=None)
### New standard exception: GeneratorExit
### New generator method: close()
### New generator method: __del__()

## Optional Extensions

### The Extended continue Statement



# PEP 405:虚拟环境
[PEP 405 -- Python Virtual Environments | Python.org](https://www.python.org/dev/peps/pep-0405/)
## 简述
虚拟环境有自己的二进制 python，可以有不同版本。
虚拟环境共享原Python安装的标准库。
虚拟环境有自己的 site-package 目录。
虚拟环境可以共享系统级别的 site-package 目录，也可以与之脱离。
## 动机
虚拟环境用于依赖管理和环境隔离。
能在无需管理员权限的前提下安装包。PS：这个不用虚拟环境也能做到吧。
顺带还能测试项目对各版本python的兼容性。

现存虚拟环境工具的缺陷在于：Python 自身没有对虚拟环境提供必要的支持。
rvirtualenv 不会复制 python 二进制程序，所以它无法提供可靠的系统site-package目录隔离。
Virtualenv则选择复制python二进制程序，但同时也必须复制大量 site 模块，以及在虚拟环境中
创建许多到标准库文件的符号链接。
复制二进制 Python 是必须的，因为 Python 在确定 sys.prefix 的时候回解析符号链接。
Virtualenv must copy the binary in order to provide isolation, as Python dereferences a symlinked executable before searching for sys.prefix.

Python 目前提供的唯一对虚拟环境隔离的支持是 PYTHONME，但它要求在每个虚拟环境中复制或符号链接完整
的标准库。复制整个标准库不够轻量级，而创建符号链接，不同平台的支持程度不同。

如果Python自身集成对虚拟环境的支持，可以降低维护成本、提升可靠性。
## 规范
当Python启动时，它会首先确定它的 prefix 路径（存在 sys.prefix 中），这个路径用于定位标准库所在目录，site 模块
也使用它定位 site-package 目录。当前python确定此路径的方式是：(假设没有设置PYTHONHOME)
从 python 二进制程序所在路径向上层查找标志文件 os.py 所在目录，以此作为 sys.prefix,如果
找不到，就回退到硬编码在 Python 程序内部的路径。

本PEP提出一种方案：在上述步骤之前插入一个步骤，让Python二进制程序先尝试在二进制程序所在
目录以及各上级目录搜索 pyvenv.cfg 文件，并且不要解析符号链接。如果找到了这个文件，它里面
是一行行 key=value 的内容，如果有一个行 home =xxx, 则表示当前python二进制程序位于虚拟
环境中，且home指定的就是用于创建虚拟环境的python所在的真实目录。

> This PEP proposes to add a new first step to this search. If a pyvenv.cfg file is found either adjacent to the Python executable or one directory above it (if the executable is a symlink, it is not dereferenced), this file is scanned for lines of the form key = value. If a home key is found, this signifies that the Python binary belongs to a virtual environment, and the value of the home key is the directory containing the Python executable used to create this virtual environment.

之后，按继续正常的 prefix 搜索流程，并把 home 的值作为 python 二进制的有效路径，这样
搜索到的是真正的Python安装路径放。sys.base_prefix 保存这个值，sys.prefix 中保存
pyvenv.cfg 所在的目录。

> In this case, prefix-finding continues as normal using the value of the home key as the effective Python binary location, which finds the prefix of the base installation. sys.base_prefix is set to this value, while sys.prefix is set to the directory containing pyvenv.cfg.

对 sys.exec_prefix 也做同样的处理。
> Also, sys.base_exec_prefix is added, and handled similarly with regard to sys.exec_prefix. (sys.exec_prefix is the equivalent of sys.prefix, but for platform-specific files; by default it has the same value as sys.prefix.)

标准库的模块 site 和 sysconfig 要做一些修改：从 sys.base_prefix / sys.base_exec_prefix中
搜索标准库和头文件，而 site-package 目录(用sysconfig的术语，是"purelib"和"platlib")
则仍然根据 sys.prefix 和 sys.exec_prefix 搜索。

> The site and sysconfig standard-library modules are modified such that the standard library and header files are found relative to sys.base_prefix / sys.base_exec_prefix, while site-package directories ("purelib" and "platlib", in sysconfig terms) are still found relative to sys.prefix / sys.exec_prefix.

如此一来，虚拟环境就可以真正做到轻量级。
> Thus, a Python virtual environment in its simplest form would consist of nothing more than a copy or symlink of the Python binary accompanied by a pyvenv.cfg file and a site-packages directory.

### 与系统 site-package 目录的隔离
默认，虚拟环境是和系统级别的 site-package 目录完全隔离的。

但如果 pyvenv.cfg 中设置 include-system-site-packages=true（不分大小写），site 模块
就会把系统级的 site-package 目录添加到 sys.path 中，顺序在虚拟环境的 site-package 目录之后。
如此，系统级安装的模块在虚拟环境中仍然可用，只不过虚拟环境中的同名模块有更高的优先级。

对于虚拟环境，把 PEPE 370 规定的用户级 site-package 与系统级 site-package 同等对待。

> PEP 370 user-level site-packages are considered part of the system site-packages for venv purposes: they are not available from an isolated venv, but are available from an include-system-site-packages = true venv.

ps：site-package 这一名词可能和模块 site 有关系。

Q. PEP 405 哪个版本开始支持？
Ans：PEP 开头就有。PEP 405，自 Python 3.3 开始支持。
### 创建虚拟环境
Creating virtual environments
本PEP同样建议在标准库中增设 venv 模块，用于创建虚拟环境。
`python3 -m venv /path/to/new/virtual/environment`

这么命令做了如下事情：
1. 创建目录 /path/to/new/virtual/environment
2. 并在此目录下创建 pyvenv.cfg 文件
3. 该文件中包含一行以 home 为 key 的行，它指向运行这个命令的Python所在的真正目录。
4. 并在此目录下创建子目录 bin/(windows上是Scripts/)，然后在这个子目录下创建pyhton程序
    的副本或符号链接，标准库的 packaging 模块中的 pysetup3 脚本，也这么做。
5. 并在此目录下创建子目录`lib/pythonX.Y/site-packages`，该子目录最初是空的。
    注：windows 下则是`Lib\site-packages`

> Running this command creates the target directory (creating any parent directories that don't exist already) and places a pyvenv.cfg file in it with a home key pointing to the Python installation the command was run from. It also creates a bin/ (or Scripts on Windows) subdirectory containing a copy (or symlink) of the python3 executable, and the pysetup3 script from the packaging standard library module (to facilitate easy installation of packages from PyPI into the new venv). And it creates an (initially empty) lib/pythonX.Y/site-packages (or Lib\site-packages on Windows) subdirectory.

如果指定目录已经存在，则报错。除非同时指定 --clear 选项，这时，会先删除目标路径，然后正常处理。

pyvenv.cfg 文件同样包含一行`include-system-site-packages`，默认为false，指定`--system-site-packages`
时，他就是 true。

可以同时指定多个路径，这个时候 venv 会创建多个虚拟（相同配置的）环境。

为了让pysetup和其他Python包管理器能够像在普通Python安装中一样将包安装到虚拟环境中，
并避免在 sysconfig 中对虚拟环境特殊处理（除了用 sys.base_prefix 代替 sys.prefix，
这个是必须的），虚拟环境的内部布局模拟了Python安装自身的布局。

> In order to allow pysetup and other Python package managers to install packages into the virtual environment the same way they would install into a normal Python installation, and avoid special-casing virtual environments in sysconfig beyond using sys.base_prefix in place of sys.prefix where appropriate, the internal virtual environment layout mimics the layout of the Python installation itself on each platform. So a typical virtual environment layout on a POSIX system would be:

因此，POSIX系统上典型的虚拟环境布局是：
```
pyvenv.cfg
bin/python3
bin/python
bin/pysetup3
include/
lib/python3.3/site-packages/
```
而在 Windows 平台上：
```
pyvenv.cfg
Scripts/python.exe
Scripts/python3.dll
Scripts/pysetup3.exe
Scripts/pysetup3-script.py
        ... other DLLs and pyds...
Include/
Lib/site-packages/
```
如此，虚拟环境安装的第三方包，其中的模块文件会放在 site-package 下，其中可执行文件
会放在 bin/或Scripts/目录下。
> Third-party packages installed into the virtual environment will have their Python modules placed in the site-packages directory, and their executables placed in bin/ or Scripts.

注：windows平台上正常安装python，python.exe 文件不在 Scripts/ 子目录下，而创建的虚拟环境
则把 python.exe 放在了 Scripts/ 子目录下，这样做的好处是，用户激活虚拟环境的时候只需要
向PATH中添加一个目录就够了。

注：windows 下，虚拟环境还有必要把标准库的 dll 文件和 pyd 文件复制一份（或创建符号链接）。
> On Windows, it is necessary to also copy or symlink DLLs and pyd files from compiled stdlib modules into the env, because if the venv is created from a non-system-wide Python installation, Windows won't be able to find the Python installation's copies of those files when Python is run from the venv.
### Sysconfig install schemes and user-site
这种方式无需sysconfig模块对虚拟环境做出特殊对待。这是好的。
This approach explicitly chooses not to introduce a new sysconfig install scheme for venvs. Rather, by modifying sys.prefix we ensure that existing install schemes which base locations on sys.prefix will simply work in a venv. Installation to other install schemes (for instance, the user-site schemes) whose paths are not relative to sys.prefix, will not be affected by a venv at all.

It may be feasible to create an alternative implementation of Python virtual environments based on a virtual-specific sysconfig scheme, but it would be less robust, as it would require more code to be aware of whether it is operating within a virtual environment or not.

### Copies versus symlinks
本PEP设计的方案，在虚拟环境中使用符号链接或者复制是等价的。
但应当优先使用符号链接，如果是复制，当升级python的时候，新虚拟环境内的副本不会手动更新，
这导致不一致性，使得虚拟环境失效。

但问题是，并不是所有平台都对符号链接有良好的支持。
不同版本的Windows的支持情况就不同，而且序号管理员权限。

本PEP建议，在除Windows和OS x 之外的所有平台上使用符号链接。在windows平台上，如果当前
版本的windows支持符号链接，同时用户有足够的权限，可以指定 --symlink 选项，告知venv
使用符号链接。

在windows，如果没有指定 --symlink，就意味着底层python安装升级后，虚拟环境中的python
和dll也要更新，否则虚拟环境可能无法使用。而venv模块提供了`--upgrade`选项，用于更新
虚拟环境的dll文件。

> On Windows, if --symlink is not used, this means that if the underlying Python installation is upgraded, the Python binary and DLLs in the venv should be updated, or there could be issues of mismatch with the upgraded standard library. The pyvenv script accepts a --upgrade option for easily performing this upgrade on an existing venv.

### Include files
头文件的处理有些困难，目前没有十全十美的方法。
使用标准库的头文件没有问题。
有问题的是，当第三方模块需要安装头文件的时候，路径不好弄。

pip 的解决方案是，在虚拟环境中时，把头文件安装在一个非标准的目录下
`${venv}/include/site/pythonX.X/`
.

...
### API
venv还提供了编程接口。
……
## 后向兼容性
### Splitting the meanings of sys.prefix
当前sys.prefix属性有两重含义：它是存放标准库目录的地方，它是存放第三方模块的地方。
而虚拟环境想要做到：隔离第三方模块，但仍然共享Python的标准库（而不是复制一份到虚拟环境）。
提成的应对之策是：添加一个变量 sys.base_prefix，它用来指定标准库路径。
这样做到问题是，某些老旧的库，可能直接使用 sys.prefix 作为第三方模块的搜索路径，这样我们
的虚拟环境就不灵光了。（但如果这些库使用 site 和 sysconfig 模块查询第三方模块的安装
路径，是不会有任何问题得）。

Any virtual environment tool along these lines (which attempts to isolate site-packages, while still making use of the base Python's standard library with no need for it to be symlinked into the virtual environment) is proposing a split between two different meanings (among others) that are currently both wrapped up in sys.prefix: the answers to the questions "Where is the standard library?" and "Where is the site-packages location where third-party modules should be installed?"

This split could be handled by introducing a new sys attribute for either the former prefix or the latter prefix. Either option potentially introduces some backwards-incompatibility with software written to assume the other meaning for sys.prefix. (Such software should preferably be using the APIs in the site and sysconfig modules to answer these questions rather than using sys.prefix directly, in which case there is no backwards-compatibility issue, but in practice sys.prefix is sometimes used.)
# PEP 370 -- Per user site-packages directory
[PEP 370 -- Per user site-packages directory | Python.org](https://www.python.org/dev/peps/pep-0370/)
自Python 2.6 和python3.0 开始支持。

## Abstract
This PEP proposes a new a per user site-packages directory to allow users the local installation of Python packages in their home directory.

## 动机
在此之前，用户要安装某些模块，要么请求系统管理员，要么借助虚拟环境。很麻烦。
Current Python versions don't have a unified way to install packages into the home directory of a user (except for Mac Framework builds). Users are either forced to ask the system administrator to install or update a package for them or to use one of the many workarounds like Virtual Python [1], Working Env [2] or Virtual Env [3].

本PEP不是要实现一个隔离环境（和虚拟环境重复了），它仅仅是为了解决每个用户各自安装模块的需求。
It's not the goal of the PEP to replace the tools or to implement isolated installations of Python. It only implements the most common use case of an additional site-packages directory for each user.

仅通过 PYTHONPATH 变量是无法达成这一目的，因为此变量仅仅是在 sys.path 中插入一个目录条目，
但并不会解析目录下的 pth 文件。一个功能完整的 site-package 目录还有许多其它功能的。

> The feature can't be implemented using the environment variable PYTHONPATH. The env var just inserts a new directory to the beginning of sys.path but it doesn't parse the pth files in the directory. A full blown site-packages path is required for several applications and Python eggs.
## 规范
- site directory (site-packages)
    sys.path中的一个目录，但与普通目录不同的是，这种目录下的 pth 文件也会被处理。
    A directory in sys.path. In contrast to ordinary directories the pth files
    in the directory are processed, too

- user site directory
    每个用户自己的 site 目录。这个目录还是与python版本挂钩的，路径中包含了版本号（仅主次两级版本号）。
    A site directory inside the users' home directory. A user site directory is specific to a Python version. The path contains the version number (major and minor only).

    Unix (including Mac OS X)：`~/.local/lib/python2.6/site-packages`
    Windows: `%APPDATA%/Python/Python26/site-packages`

- user data directory
    通常是site目录的父级目录。打算用这个目录保存特定于不同版本python的数据，例如
    配置文件、图片、翻译。
    Usually the parent directory of the user site directory. It's meant for Python version specific data like config files, docs, images and translations.

    Unix (including Mac): `~/.local/lib/python2.6`
    Windows:    `%APPDATA%/Python/Python26`
- user base directory

    It's located inside the user's home directory. The user site and use config directory are inside the base directory. On some systems the directory may be shared with 3rd party apps.

    Unix (including Mac)：`~/.local`
    Windows：`%APPDATA%/Python`

- user script directory

    A directory for binaries and scripts. [10] It's shared across Python versions and the destination directory for scripts.

    Unix (including Mac):   `~/.local/bin`
    Windows:    `%APPDATA%/Python/Scripts`

### Windows Notes

### Unix Notes
### Mac OS X Notes
## 实现
用户 site 路径在系统路径之前，但在 PYTHONPATH 变量之后。
> The user site directory is added before the system site directories but after Python's search paths and PYTHONPATH.

可以关闭用户site路径特性，如下方式都行：
1. 指定 -s 选项
2. 设置 PYTHONNOUSERSITE
3. 直接编辑 site.py，设置 site.ENABLE_USER_SITE=False
> The user site directory can be suppressed with a new option -s or the environment variable PYTHONNOUSERSITE. The feature can be disabled globally by setting site.ENABLE_USER_SITE to the value False. It must be set by editing site.py. It can't be altered in sitecustomize.py or later.

`PYTHONUSERBASE` 变量可以指定自定义的路径。
> The path to the user base directory can be overwritten with the environment variable PYTHONUSERBASE. The default location is used when PYTHONUSERBASE is not set or empty.

巴拉巴拉……
distutils.command.install (setup.py install) gets a new argument --user to install packages in the user site directory. The required directories are created on demand.

distutils.command.build_ext (setup.py build_ext) gets a new argument --user which adds the include/ and lib/ directories in the user base directory to the search paths for header files and libraries. It also adds the lib/ directory to rpath.

The site module gets two arguments --user-base and --user-site to print the path to the user base or user site directory to the standard output. The feature is intended for scripting, e.g. ./configure --prefix $(python2.5 -m site --user-base)

distutils.sysconfig will get methods to access the private variables of site. (not yet implemented)

The Windows updater needs to be updated, too. It should create a menu item which opens the user site directory in a new explorer windows.
# PEP 484 -- Type Hints
[PEP 484 -- Type Hints | Python.org](https://www.python.org/dev/peps/pep-0484/)
自 Python 3.5
```py
def greeting(name: str) -> str:
    return 'Hello ' + name
```
## 概述
PEP 3107 引入了函数注解（Function Annotations）语法，但并未定义注解的语法含义。如今
已有众多第三方用于静态类型分析的用途。

本PEP定义了函数注解的标准含义并提供相关模块。
同时指出，本PEP并未禁止把函数注解用作其它用途。

如下所示，这是一个简单的注解示例，它给函数的形参和返回值指定了注解。
```py
def greeting(name: str) -> str:
    return 'Hello ' + name
```
虽然这些注解信息在运行时可用，但Python保证不在运行时做任何类型检查工作。
反而，此提案假设存在某个离线的类型检测工具，由用户自愿执行。
其实这种类型检查是一种极其强力的代码检查工具。

此提案在相当程度上借鉴了 mypy，例如，类型“integer构成的序列”可以表示为`Sequence[int]`，
方括号意味着无需引入新的语法。这个例子中的 Sequence 是内置模块 typing 提供的自定义类型。
为了支持方括号，它的元类重载了`__getitem__()`方法。
The proposal is strongly inspired by mypy [mypy]. For example, the type "sequence of integers" can be written as Sequence[int]. The square brackets mean that no new syntax needs to be added to the language. The example here uses a custom type Sequence, imported from a pure-Python module typing. The Sequence[int] notation works at runtime by implementing `__getitem__()` in the metaclass (but its significance is primarily to an offline type checker).

类型系统支持联合、泛型、以及一个特殊的类型 Any（它表示可接受任意类型）。
The type system supports unions, generic types, and a special type named Any which is consistent with (i.e. assignable to and from) all types. This latter feature is taken from the idea of gradual typing. Gradual typing and the full type system are explained in PEP 483.

Other approaches from which we have borrowed or to which ours can be compared and contrasted are described in PEP 482.

## 动机和目标
Rationale and Goals

本提案致力于为函数注解指定类型注解的标准语法。
可用于静态类型检测以及IDE的代码补全。

### Non-goals

着重指出，Python会继续保持其动态类型的特性，决计不会把运行强制类型检查添加到语言特性之中。

It should also be emphasized that **Python will remain a dynamically typed language, and the authors have no desire to ever make type hints mandatory, even by convention.**

## The meaning of annotations
如果函数没有注解，就当把它视作允许任何类型，类型检测工具应当忽略这样的函数。
带有修饰符 @typing.no_type_check 的函数应当等同视作无注解函数。

建议（但非强制）受检测的函数为所有形参和返回值指定注解，缺省使用Any类型注解，唯一的例外
是类的实例方法和类方法的第一个参数，缺省情况下，前者的类型注解是所在的类，后者则是所在类
的元类。

现有注解语法无法表达类方法第一个参数的类型。

For example, in class A the first argument of an instance method has the implicit type A.
In a class method, the precise type of the first argument cannot be represented using the available type notation.

`__init__()`方法应当设定返回值注解` -> None`

类型检测工具应当尝试推导出尽可能多的相关类型信息，以进行更加完善的类型检测。
……

## Type Definition Syntax
类型提示语法，在最基础的形式，用类型对象填充函数注解插槽即可。
```py
def greeting(name: str) -> str:
    return 'Hello ' + name
```
This states that the expected type of the name argument is str. Analogically,
the expected return type is str.

Expressions whose type is a subtype of a specific argument type are also accepted
for that argument.

### 可接收的类型提示
Acceptable type hints

1.
2. 注解是大多数情形下类型提示的最佳选择，但不是绝对的。
3. 注解必须是合法的Python表达式，且不得抛出异常，但也不是绝对的。
4. 注解应当保持简单，例如，类型检测工具基本无法理解动态计算的类型，
5. 除此之外，下述特殊构造是可用的：
    - None, Any, Union, Tuple, Callable,
    - all ABCs and stand-ins for concrete classes exported from typing (e.g. Sequence and Dict),
    - type variables,
    - type aliases.
6. 下文提到的所有特性用到的名字，都在 typing 模块中提供。
### Using None
在类型提示语法中，None 被视作 type(None)。
> When used in a type hint, the expression None is considered equivalent to type(None).

### Type aliases
类型别名，就是一条简单的变量赋值语句：
```py
Url = str

def retry(url: Url, retry_count: int) -> None: ...
```
我们推荐给类型别名使用驼峰命名方式。

类型别名可用于简化复杂的类型提示，凡是可用在类型提示中表达式都可以作为类型别名：
```py
from typing import TypeVar, Iterable, Tuple

T = TypeVar('T', int, float, complex)
Vector = Iterable[Tuple[T, T]]

def inproduct(v: Vector[T]) -> T:
    return sum(x*y for x, y in v)
def dilate(v: Vector[T], scale: T) -> Vector[T]:
    return ((x * scale, y * scale) for x, y in v)
vec = []  # type: Vector[float]
```
它等价于：
```py
from typing import TypeVar, Iterable, Tuple

T = TypeVar('T', int, float, complex)

def inproduct(v: Iterable[Tuple[T, T]]) -> T:
    return sum(x*y for x, y in v)
def dilate(v: Iterable[Tuple[T, T]], scale: T) -> Iterable[Tuple[T, T]]:
    return ((x * scale, y * scale) for x, y in v)
vec = []  # type: Iterable[Tuple[float, float]]
```

### Callable
如果方法要求参数是个具备指定签名格式的回调函数，可以使用
 `Callable[[Arg1Type, Arg2Type], ReturnType]`
语法指定，例如：
```py
from typing import Callable

def feeder(get_next_item: Callable[[], str]) -> None:
    # Body

def async_query(on_success: Callable[[int], None],
                on_error: Callable[[int, Exception], None]) -> None:
    # Body
```

### Generics
由于没有通用的方法推断容器中元素类型信息，所以扩展了抽象类，利用方括号下标记录容器中
元素的类型信息。
```py
from typing import Mapping, Set

def notify_by_email(employees: Set[Employee], overrides: Mapping[str, str]) -> None: ...
```

谈到泛型，就不得不提到参数化类型，用 TypeVar 定义。
下面这个类型说明的含义是：返回值和传入的容器中的元素的类型相同。
```py
from typing import Sequence, TypeVar

T = TypeVar('T')      # Declare type variable

def first(l: Sequence[T]) -> T:   # Generic function
    return l[0]
```

TypeVar() 表达式必须直接赋值给一个变量（不要用作更大的表达式的一部分）；
它的参数必须是一个字符串，和被赋值给的那个变量一样的字符串。
类型变量不可重新定义。
> A TypeVar() expression must always directly be assigned to a variable (it should not be used as part of a larger expression). The argument to TypeVar() must be a string equal to the variable name to which it is assigned. Type variables must not be redefined.

可以限定参数化类型中类型参数的可取值。默认允许任何可能的类型。
如下，限制类型参数只允许是 str 或 bytes 之一。
> TypeVar supports constraining parametric types to a fixed set of possible types (note: those types cannot be parameterized by type variables). For example, we can define a type variable that ranges over just str and bytes. By default, a type variable ranges over all possible types. Example of constraining a type variable:
```py
from typing import TypeVar, Text

AnyStr = TypeVar('AnyStr', Text, bytes)

def concat(x: AnyStr, y: AnyStr) -> AnyStr:
    return x + y
```
这里，函数 concat 可接受两个str参数或两个bytes参数，但不可以混合。
> The function concat can be called with either two str arguments or two bytes arguments, but not with a mix of str and bytes arguments.

? 这句不懂
> There should be at least two constraints, if any; specifying a single constraint is disallowed.

关于子类型？？
> Subtypes of types constrained by a type variable should be treated as their respective explicitly listed base types in the context of the type variable. Consider this example:

```py
class MyStr(str): ...

x = concat(MyStr('apple'), MyStr('pie'))
```
The call is valid but the type variable AnyStr will be set to str and not MyStr. In effect, the inferred type of the return value assigned to x will also be str.

因为Any表示任意值，所以它做泛型参数时，可以省略：`List[Any]` 等价于 `List`
> Additionally, Any is a valid value for every type variable. Consider the following:
```py
def count_truthy(elements: List[Any]) -> int:
    return sum(1 for elem in elements if elem)
```
> This is equivalent to omitting the generic notation and just saying elements: List.

### User-defined generic types
上一节介绍了泛型参数的使用。
这一节进一步介绍定义泛型类：

You can include a Generic base class to define a user-defined class as generic. Example:
```py
from typing import TypeVar, Generic
from logging import Logger

T = TypeVar('T')

class LoggedVar(Generic[T]):
    def __init__(self, value: T, name: str, logger: Logger) -> None:
        self.name = name
        self.logger = logger
        self.value = value

    def set(self, new: T) -> None:
        self.log('Set ' + repr(self.value))
        self.value = new

    def get(self) -> T:
        self.log('Get ' + repr(self.value))
        return self.value

    def log(self, message: str) -> None:
        self.logger.info('{}: {}'.format(self.name, message))

```
使用泛型类的时候可以指定具体的类型实参：
```py
from typing import Iterable

def zero_all_vars(vars: Iterable[LoggedVar[int]]) -> None:
    for var in vars:
        var.set(0)
```
类型实参，借助类元类。
> The Generic base class uses a metaclass that defines `__getitem__` so that LoggedVar[t] is valid as a type:

……
### Scoping rules for type variables
类型变量的名称解析规则和普通变量一致，但有几种特殊情况。

ps:泛型仍然是静态类型检查的手段，运行时并不会进行类型检查。

### Instantiating generic classes and type erasure

### Arbitrary generic types as base classes

### Abstract generic types

### Type variables with an upper bound
### Covariance and contravariance

### The numeric tower

### Forward references

When a type hint contains names that have not been defined yet, that definition may be expressed as a string literal, to be resolved later.

A situation where this occurs commonly is the definition of a container class, where the class being defined occurs in the signature of some of the methods. For example, the following code (the start of a simple binary tree implementation) does not work:

```py
class Tree:
    def __init__(self, left: Tree, right: Tree):
        self.left = left
        self.right = right
```
To address this, we write:
```py
class Tree:
    def __init__(self, left: 'Tree', right: 'Tree'):
        self.left = left
        self.right = right
```

... 还有更详细的规则

### Union types
用 typing.Union 可以指定某个参数接受几种不同的类型，而不是单一类型。
```py
from typing import Union

def handle_employees(e: Union[Employee, Sequence[Employee]]) -> None:
    if isinstance(e, Employee):
        e = [e]
    ...
```

Union的一个常见用途是 None。默认，对任何类型来说，None 值都是非法的，除非显式指定
允许 None：`Union[Employee, None]`
One common case of union types are optional types. By default, None is an invalid value for any type, unless a default value of None has been provided in the function definition. Examples:
```py
def handle_employee(e: Union[Employee, None]) -> None: ...
```
因为很常见，所以为 `Union[T1, None]` 定制了一个简写 `Optional[T1]`:
As a shorthand for Union[T1, None] you can write `Optional[T1]`;
for example, the above is equivalent to:
```py
from typing import Optional

def handle_employee(e: Optional[Employee]) -> None: ...
```
以前，当参数默认值为 None 时，就隐含推定 `Union[T1, None]`；
如今不这么干了，更建议显式指定 `Optional[T1]`
A past version of this PEP allowed type checkers to assume an optional type
when the default value is None, as in this code:
```py
def handle_employee(e: Employee = None): ...
```
This would have been treated as equivalent to:
```py
def handle_employee(e: Optional[Employee] = None) -> None: ...
```
This is no longer the recommended behavior. Type checkers should move towards requiring the optional type to be made explicit.

### Unions 中的单例类型
Support for singleton types in unions
……
### The Any type
Any 是特殊的类型，它表示允许任何类型（或者说是一种允许任何值、且有任何方法的类型）。
Any 和 object 是完全不同的两个东西。如果指定 object，类型检测器会拒绝其上的几乎
任何方法调用，并且，把它赋值给一个更具体的类型也是错误。而如果指定为 Any，则它允许
任何类型，且允许任何操作，也允许赋值给任何类型的变量。

A special kind of type is Any. Every type is consistent with Any. It can be considered a type that has all values and all methods. Note that Any and builtin type object are completely different.

When the type of a value is object, the type checker will reject almost all operations on it, and assigning it to a variable (or using it as a return value) of a more specialized type is a type error. On the other hand, when a value has type Any, the type checker will allow all operations on it, and a value of type Any can be assigned to a variable (or used as a return value) of a more constrained type.

如果不指定函数形参的类型，则假设它是Any类型，如果省略泛型的类型参数，则假设它的参数是 Any。

A function parameter without an annotation is assumed to be annotated with Any. If a generic type is used without specifying type parameters, they are assumed to be Any:
```py
from typing import Mapping

def use_map(m: Mapping) -> None:  # Same as Mapping[Any, Any]
    ...
```

此规则同样适用于 typing.Tuple。
This rule also applies to Tuple, in annotation context it is equivalent to Tuple[Any, ...] and, in turn, to tuple. As well, a bare Callable in an annotation is equivalent to Callable[..., Any] and, in turn, to collections.abc.Callable:
```py
from typing import Tuple, List, Callable

def check_args(args: Tuple) -> bool:
    ...

check_args(())           # OK
check_args((42, 'abc'))  # Also OK
check_args(3.14)         # Flagged as error by a type checker

# A list of arbitrary callables is accepted by this function
def apply_callbacks(cbs: List[Callable]) -> None:
    ...
```

### The NoReturn type
如果一个函数一定不会正常退出（比如无条件抛出异常的函数）可以用 NoReturn 标注其返回类型。
The typing module provides a special type NoReturn to annotate functions that never return normally. For example, a function that unconditionally raises an exception:
```py
from typing import NoReturn

def stop() -> NoReturn:
    raise RuntimeError('no way')
```
借助NoReturn，代码检查器可以分辨出永不可达的`死`代码。
The NoReturn annotation is used for functions such as sys.exit. Static type checkers will ensure that functions annotated as returning NoReturn truly never return, either implicitly or explicitly:
```py
import sys
from typing import NoReturn

  def f(x: int) -> NoReturn:  # Error, f(0) implicitly returns None
      if x != 0:
          sys.exit(1)
```

NoReturn 只允许用来标注函数的返回类型。
### The type of class objects

用`typing.Type[C]`标注参数为类 C 或其子类的类对象。
假设有如下继承关系；
```py
class User: ...  # Abstract base for User classes
class BasicUser(User): ...
class ProUser(User): ...
class TeamUser(User): ...
```

```py
def new_user(user_class):
    user = user_class()
    # (Here we could write the user object to a database)
    return user
```
不用 typding.Type，我们最多用type标注一下：
```py
def new_user(user_class: type) -> User:
    ...
```
但，使用 typing.Type 并结合类型变量、上界，我们可以指定更精确的类型说明：
However using Type[] and a type variable with an upper bound we can do much better:
```
U = TypeVar('U', bound=User)
def new_user(user_class: Type[U]) -> U:
    ...
```
然后，类型检测器可以更精确得推定函数返回值的类型。
```py
joe = new_user(BasicUser)  # Inferred type is BasicUser
```

还有一些内容，……
### Annotating instance and class methods


### Version and platform checking
### Runtime or type checking?
`typing.TYPE_CHECKING`为True当且仅当在类型检查时。
可以用它来处理一些仅仅在类型检测时需要执行的代码。
Sometimes there's code that must be seen by a type checker (or other static analysis tools) but should not be executed. For such situations the typing module defines a constant, TYPE_CHECKING, that is considered True during type checking (or other static analysis) but False at runtime. Example:
```py
import typing

if typing.TYPE_CHECKING:
    import expensive_mod

def a_func(arg: 'expensive_mod.SomeClass') -> None:
    a_var = arg  # type: expensive_mod.SomeClass
    ...
```
### Arbitrary argument lists and default argument values
可变形参也可以标注类型。
Arbitrary argument lists can as well be type annotated, so that the definition:
```py
def foo(*args: str, **kwds: int): ...
```
is acceptable and it means that, e.g., all of the following represent function calls with valid types of arguments:
```py
foo('a', 'b', 'c')
foo(x=1, y=2)
foo('', z=0)
```
In the body of function foo, the type of variable args is deduced as `Tuple[str, ...]` and the type of variable kwds is `Dict[str, int]`.

在桩函数中，可以指定函数应当有一个默认值，但并不指定实际的默认值。
In stubs it may be useful to declare an argument as having a default without specifying the actual default value. For example:
```py
def foo(x: AnyStr, y: AnyStr = ...) -> AnyStr: ...
```
What should the default value look like? Any of the options "", b"" or None fails to satisfy the type constraint.

In such cases the default value may be specified as a literal ellipsis, i.e. the above example is literally what you would write.
### Positional-only arguments
### Annotating generator functions and coroutines

### Compatibility with other uses of function annotations
### Type comments
### Casts
### NewType helper function
### Stub Files

    Function/method overloading
    Storing and distributing stub files
    The Typeshed Repo

### Exceptions
### typing 模块
使用 typing 模块辅助实现类型检测。
```
To open the usage of static type checking to Python 3.5 as well as older versions, a uniform namespace is required. For this purpose, a new module in the standard library is introduced called typing.

It defines the fundamental building blocks for constructing types (e.g. Any), types representing generic variants of builtin collections (e.g. List), types representing generic collection ABCs (e.g. Sequence), and a small collection of convenience definitions.

Note that special type constructs, such as Any, Union, and type variables defined using TypeVar are only supported in the type annotation context, and Generic may only be used as a base class. All of these (except for unparameterized generics) will raise TypeError if appear in isinstance or issubclass.

Fundamental building blocks:

    Any, used as def get(key: str) -> Any: ...
    Union, used as Union[Type1, Type2, Type3]
    Callable, used as Callable[[Arg1Type, Arg2Type], ReturnType]
    Tuple, used by listing the element types, for example Tuple[int, int, str]. The empty tuple can be typed as Tuple[()]. Arbitrary-length homogeneous tuples can be expressed using one type and ellipsis, for example Tuple[int, ...]. (The ... here are part of the syntax, a literal ellipsis.)
    TypeVar, used as X = TypeVar('X', Type1, Type2, Type3) or simply Y = TypeVar('Y') (see above for more details)
    Generic, used to create user-defined generic classes
    Type, used to annotate class objects

Generic variants of builtin collections:

    Dict, used as Dict[key_type, value_type]
    DefaultDict, used as DefaultDict[key_type, value_type], a generic variant of collections.defaultdict
    List, used as List[element_type]
    Set, used as Set[element_type]. See remark for AbstractSet below.
    FrozenSet, used as FrozenSet[element_type]

Note: Dict, DefaultDict, List, Set and FrozenSet are mainly useful for annotating return values. For arguments, prefer the abstract collection types defined below, e.g. Mapping, Sequence or AbstractSet.

Generic variants of container ABCs (and a few non-containers):

    Awaitable
    AsyncIterable
    AsyncIterator
    ByteString
    Callable (see above, listed here for completeness)
    Collection
    Container
    ContextManager
    Coroutine
    Generator, used as Generator[yield_type, send_type, return_type]. This represents the return value of generator functions. It is a subtype of Iterable and it has additional type variables for the type accepted by the send() method (it is contravariant in this variable -- a generator that accepts sending it Employee instance is valid in a context where a generator is required that accepts sending it Manager instances) and the return type of the generator.
    Hashable (not generic, but present for completeness)
    ItemsView
    Iterable
    Iterator
    KeysView
    Mapping
    MappingView
    MutableMapping
    MutableSequence
    MutableSet
    Sequence
    Set, renamed to AbstractSet. This name change was required because Set in the typing module means set() with generics.
    Sized (not generic, but present for completeness)
    ValuesView

A few one-off types are defined that test for single special methods (similar to Hashable or Sized):

    Reversible, to test for __reversed__
    SupportsAbs, to test for __abs__
    SupportsComplex, to test for __complex__
    SupportsFloat, to test for __float__
    SupportsInt, to test for __int__
    SupportsRound, to test for __round__
    SupportsBytes, to test for __bytes__

Convenience definitions:

    Optional, defined by Optional[t] == Union[t, None]
    Text, a simple alias for str in Python 3, for unicode in Python 2
    AnyStr, defined as TypeVar('AnyStr', Text, bytes)
    NamedTuple, used as NamedTuple(type_name, [(field_name, field_type), ...]) and equivalent to collections.namedtuple(type_name, [field_name, ...]). This is useful to declare the types of the fields of a named tuple type.
    NewType, used to create unique types with little runtime overhead UserId = NewType('UserId', int)
    cast(), described earlier
    @no_type_check, a decorator to disable type checking per class or function (see below)
    @no_type_check_decorator, a decorator to create your own decorators with the same meaning as @no_type_check (see below)
    @type_check_only, a decorator only available during type checking for use in stub files (see above); marks a class or function as unavailable during runtime
    @overload, described earlier
    get_type_hints(), a utility function to retrieve the type hints from a function or method. Given a function or method object, it returns a dict with the same format as __annotations__, but evaluating forward references (which are given as string literals) as expressions in the context of the original function or method definition.
    TYPE_CHECKING, False at runtime but True to type checkers

I/O related types:

    IO (generic over AnyStr)
    BinaryIO (a simple subtype of IO[bytes])
    TextIO (a simple subtype of IO[str])

Types related to regular expressions and the re module:

    Match and Pattern, types of re.match() and re.compile() results (generic over AnyStr)

```
## ……
# PEP 492 -- Coroutines with async and await syntax
[PEP 492 -- Coroutines with async and await syntax | Python.org](https://www.python.org/dev/peps/pep-0492/)
自Python 3.5。
## Abstract
为了解决大量并发的问题，为了让异步代码尽可能接近同步代码风格。

本 PEP 假设异步任务由事件循环负责调度和协调，就类似 asyncio 标准模块中的事件循环。
本PEP不与具体的事件循环实现绑定，本PEP定义的协程，使用 yield 向调度者发信号，表名协程
将等到某事件（如IO）的完成。
> This PEP assumes that the asynchronous tasks are scheduled and coordinated by an Event Loop similar to that of stdlib module asyncio.events.AbstractEventLoop. While the PEP is not tied to any specific Event Loop implementation, it is relevant only to the kind of coroutine that uses yield as a signal to the scheduler, indicating that the coroutine will be waiting until an event (such as IO) is completed.

## 动机和目标

Rationale and Goals

在本PEP之前，Python使用生成器实现协程，这种方式有缺点：
- 协程和生成器共用同一个语法，具有迷惑性
- 函数定义是否为协程完全取决于是否有yield关键字，这不够明显
- 只能通过yield实现异步调用，这有很大限制，无法结合到 for、with 语句中

本提案使得协程成为 Python 的原生语法特性，并与生成器清晰区分开来。
这消除了协程和生成器之间的二义性，并使得在不依赖特定库的前提下定义协程成为可能。
这也使得语法检测和IDE的静态代码分析与代码重构更有效。

原生协程语法，使得定义异步语义的上下文管理器和异步迭代器成为可能。
Native coroutines and the associated new syntax features make it possible to define context manager and iteration protocols in asynchronous terms. As shown later in this proposal, the new async with statement lets Python programs perform asynchronous calls when entering and exiting a runtime context, and the new async for statement makes it possible to perform asynchronous calls in iterators.

## 规范
Specification
本提案引入了新的语法和语义，以增强Python对协程的支持。

本规范需要前置知识：Python协程的实现（PEP 342和PEP380）。
本提案中的语法受到PEP 3156的启发（PEP 3156 现在被本提案取代了）。
This specification presumes knowledge of the implementation of coroutines in Python (PEP 342 and PEP 380). Motivation for the syntax changes proposed here comes from the asyncio framework (PEP 3156) and the "Cofunctions" proposal (PEP 3152, now rejected in favor of this specification).
> ps：
> 生成器有协程的影子--可以多次返回。
> 而 PEP 342 对生成器做了些增强：
> - 改 yield 为表达式，而不是语句
> - 增加 send(), close(), throw()方法。
> PEP 380 引入了 `yield from <expr>` 语法。
### 新的协程声明语法
New Coroutine Declaration Syntax
下面的代码声明了一个原生协程：
```py
async def read_data(db):
    pass
```
协程的特征:
- `async def`函数都是协程，即使函数体中不含有`await`语句，也是协程
- 协程函数中不允许使用`yield`表达式或者`yield from`表达式，如果有，就是语法错误。
  Q. async def 中明明可以使用 yield 表达式的？
  Ans: PEP 525, 定义了异步生成器，可以在 async def 中使用 yield 表达式了。
- 内部两个标志
    - CO_COROUTINE 标志原生协程
    - CO_ITERABLE_COROUTINE 用于使基于生成器的协程于原生协程兼容（由types.coroutine()函数设置此标志）
- 调用常规生成器函数，返回生成器对象；与之类似，调用协程函数返回一个协程对象
- `StopIteration`异常，不会传递到协程之外，而是使用`RuntimeError`替换之。
  要使常规生成器具备此特性，需要导入一个特性（参见PEP 479）
- 对原生协程进行垃圾回收时，如果此协程从未 awaite 过，则会抛出 RuntimeWarning 异常。
  参考 Debugging 特性。
参见 Coroutine objects 小节（后面的）。

### types.coroutine()
types 新增了函数`coroutine(fn)`，用来提供基于生成器的协程和原生协程之间的互操作性。
```py
@types.coroutine
def process_data(db):
    data = yield from read_data(db)
    ...
```
该函数作用于生成器函数的代码对象的 CO_ITERABLE_COROUTINE 标志，使其返回协程对象。
如果fn不是生成器函数，？；如果fn返回生成器，则它（指返回的生成器）被封装到awaitable代理中。

注：`types.coroutine()`不会设置 CO_COROUTINE 标志，如此才可以区分原生协程对象和基于生成器的协程。
### await 表达式
Await Expression

下面的代码中，await 表达式用于获取协程的执行结果：
```py
async def read_data(db):
    data = await db.fetch('SELECT ...')
    ...
```
和 `yield from` 类似，await 挂起协程 read_data，等待 db.fetch 完成并返回结果数据。
TODO: `ret = yield from` 的返回值机制？
await 使用 yield from 的实现（？），但多了一步参数校验：await 只接受 awaitable 对象。
如下之一：
- 原生协程返回的协程对象
- types.coroutine()函数修饰的生成器函数返回的（基于生成器的）协程对象
- 实现了 `__await__` 方法的对象，该方法应当返回迭代器
- 任何最后一个节点是 yield 的 yield from 调用链。
- 使用CPython C API 定义的，具有 tp_as_async.am_await 函数的对象，此函数应当返回迭代器。(类似`__await__`方法)

- Any yield from chain of calls ends with a yield. This is a fundamental mechanism of how Futures are implemented. Since, internally, coroutines are a special kind of generators, every await is suspended by a yield somewhere down the chain of await calls (please refer to PEP 3156 for a detailed explanation).

    To enable this behavior for coroutines, a new magic method called `__await__` is added. In asyncio, for instance, to enable Future objects in await statements, the only change is to add `__await__ = __iter__` line to asyncio.Future class.

    Objects with `__await__` method are called Future-like objects in the rest of this PEP.

    It is a TypeError if `__await__` returns anything but an iterator.

- Objects defined with CPython C API with a tp_as_async.am_await function, returning an iterator (similar to `__await__` method).

await 表达式只能用在在`async def`函数中，否则是语法错误。
await 表达式的参数只能是 `awaitable` 对象，否则是语法错误。
#### 操作符优先级变动
Updated operator precedence table

await 定义如下：
```
power ::=  await ["**" u_expr]
await ::=  ["await"] primary
```
where "primary" represents the most tightly bound operations of the language. Its syntax is:
```
primary ::=  atom | attributeref | subscription | slicing | call
```

See Python Documentation [12] and Grammar Updates section of this proposal for details.

和 yield、yield from 相比，await 运算符在大多数情况下不需要圆括号强制设置优先级了。
> The key await difference from yield and yield from operators is that await expressions do not require parentheses around them most of the times.

#### await 表达式的例子
Examples of "await" expressions
```
Expression 	                    Will be parsed as
if await fut: pass 	            if (await fut): pass
if await fut + 1: pass 	        if (await fut) + 1: pass
pair = await fut, 'spam' 	    pair = (await fut), 'spam'
with await fut, open(): pass 	with (await fut), open(): pass
await foo()['spam'].baz()() 	await ( foo()['spam'].baz()() )
return await coro() 	        return ( await coro() )
res = await coro() ** 2 	    res = (await coro()) ** 2
func(a1=await coro(), a2=0) 	func(a1=(await coro()), a2=0)
await foo() + await bar() 	    (await foo()) + (await bar())
-await foo() 	                -(await foo())
```
### async with 语句
Asynchronous Context Managers and "async with"
所谓异步上下文管理器，就是其 enter 和 exit 方法可以挂起的上线问管理器。
> An asynchronous context manager is a context manager that is able to suspend execution in its enter and exit methods.

异步上下文管理器使用`__aenter__`和`__aexit__`作为协议方法，这两个方法必须返回awaitable对象。
例：
```py
class AsyncContextManager:
    async def __aenter__(self):
        await log('entering context')

    async def __aexit__(self, exc_type, exc, tb):
        await log('exiting context')

```
#### 新语法
语法：
```py
async with EXPR as VAR:
    BLOCK
```
它语义上等价于：
```py
mgr = (EXPR)
aexit = type(mgr).__aexit__
aenter = type(mgr).__aenter__

VAR = await aenter(mgr)
try:
    BLOCK
except:
    if not await aexit(mgr, *sys.exc_info()):
        raise
else:
    await aexit(mgr, None, None, None)
```
就和普通with语句一样，可以一条 async with 语句中指定多个异步上下文管理器。

async with 和异步上下文管理器配套，不匹配常规管理器。
> It is an error to pass a regular context manager without `__aenter__` and `__aexit__` methods to async with. It is a SyntaxError to use async with outside of an async def function.
#### 例子

使用异步上下文管理器，更容易实现在协程中的数据库事务管理：
```py
async def commit(session, data):
    ...

    async with session.transaction():
        ...
        await session.update(data)
        ...
```
需要锁的代码也更简洁一些：
```py
async with lock:
    ...
```
instead of:
```py
with (yield from lock):
    ...
```
### 异步迭代器和asycn for语句
Asynchronous Iterators and "async for"
异步可迭代对象能在它的iter方法中调用异步代码，异步迭代器能在它的next方法中调用异步代码。
为了支持异步迭代，需要满足如下条件：
- 对象必须实现 `__aiter__`方法，该方法应当返回异步迭代器对象
- 异步迭代器对象必须实现`__anext__`方法，该方法应当返回 awaitable 对象
- 结束迭代，`__anext__`方法应当抛出 StopAsyncIteration 异常

一个例子：
```py
class AsyncIterable:
    def __aiter__(self):
        return self

    async def __anext__(self):
        data = await self.fetch_data()
        if data:
            return data
        else:
            raise StopAsyncIteration

    async def fetch_data(self):
        ...
```
ps：另一个例子
```py
async def fun():
    yield 1
    yield 2
    return 3
```

#### 新语法
New Syntax
asycn for 语句：
```py
async for TARGET in ITER:
    BLOCK
else:
    BLOCK2
```
其语义如下：
```py
iter = (ITER)
iter = type(iter).__aiter__(iter)
running = True
while running:
    try:
        TARGET = await type(iter).__anext__(iter)
    except StopAsyncIteration:
        running = False
    else:
        BLOCK
else:
    BLOCK2
```

It is a TypeError to pass a regular iterable without `__aiter__` method to async for.
It is a SyntaxError to use async for outside of an async def function.

As for with regular for statement, async for has an optional else clause.

#### 例1
先跳过：
With asynchronous iteration protocol it is possible to asynchronously buffer data during iteration:
```py
async for data in cursor:
    ...
```
Where cursor is an asynchronous iterator that prefetches N rows of data from a database after every N iterations.

The following code illustrates new asynchronous iteration protocol:
```py
class Cursor:
    def __init__(self):
        self.buffer = collections.deque()

    async def _prefetch(self):
        ...

    def __aiter__(self):
        return self

    async def __anext__(self):
        if not self.buffer:
            self.buffer = await self._prefetch()
            if not self.buffer:
                raise StopAsyncIteration
        return self.buffer.popleft()
```
then the Cursor class can be used as follows:
```py
async for row in Cursor():
    print(row)
```
which would be equivalent to the following code:
```py
i = Cursor().__aiter__()
while True:
    try:
        row = await i.__anext__()
    except StopAsyncIteration:
        break
    else:
        print(row)
```

#### Example 2

Example 2

The following is a utility class that transforms a regular iterable to an asynchronous one. While this is not a very useful thing to do, the code illustrates the relationship between regular and asynchronous iterators.
```py
class AsyncIteratorWrapper:
    def __init__(self, obj):
        self._it = iter(obj)

    def __aiter__(self):
        return self

    async def __anext__(self):
        try:
            value = next(self._it)
        except StopIteration:
            raise StopAsyncIteration
        return value

async for letter in AsyncIteratorWrapper("abc"):
    print(letter)
```
#### 为什么引入 StopIteration？
Why StopAsyncIteration?
从内部原理上讲，协程仍是基于生成器的，所以在 PEP 479 之前，下面两段代码是等价的：
```py
def g1():
    yield from fut
    return 'spam'
```
和
```py
def g2():
    yield from fut
    raise StopIteration('spam')
```
但自引入 PEP 479之后，下面的代码会把 StopIteration 异常封装为 RuntimeError。
```py
async def a1():
    await fut
    raise StopIteration('spam')
```
那么又该如何告知外界迭代终止呢？为此引入了新的内置异常 StopAsyncItreation。

Moreover, with semantics from PEP 479, all StopIteration exceptions raised in coroutines are wrapped in RuntimeError.

### 协程对象
Coroutine objects

#### 与生成器的区别
Differences from generators
本节内容只针对原生协程对象（即使用 async def 定义的对象）。
> This section applies only to native coroutines with CO_COROUTINE flag, i.e. defined with the new async def syntax.
> The behavior of existing *generator-based coroutines* in asyncio remains unchanged.

为了更明确区分协程和生成器这两个概念，我们付出了巨大努力。
- 原生协程对象不再有`__iter__`和`__next__`方法，从而原生协程对象不能用作 tuple()、list()、 iter() 等方法遍历，
  不能用在 for...in 循环中。
  试图调用协程的 `__iter__`和`__next__` 方法将导致 TypeError
- 普通生成器对象不可对原生协程使用 yield from 语句，否则会导致 TypeError
- 基于生成器的协程（必须使用 @asyncio.coroutine 注解修饰）可以对原生协程使用 yield from
- inspect.isgenerator() 对原生协程对象返回 False
  inspect.isgeneratorfunction() 对原生协程函数返回 False

#### 协程对象的方法
Coroutine object methods
内部实现上，协程是基于生成器的，它们共享相同的实现。同生成器，协程也有 throw(),send()
close() 方法。StopIteration 和 GeneratorExit 在协程中的角色仍然不变（但协程默认开启
PEP 479）。
See PEP 342, PEP 380, and Python Documentation [11] for details.

不理解这句话的目的？
> throw(), send() methods for coroutines are used to push values and raise errors into Future-like objects.
### Debugging Features
新手使用协程常见的错误是遗漏 yield from
```py
@asyncio.coroutine
def useful():
    asyncio.sleep(1) # this will do nothing without 'yield from'
```
为了调试此类错误，@coroutine 提供一种机制，它会把协程封装到一个特殊对象上，如果协程没有
执行就被释放，这个对象就会输出一个警告日志，日志包含函数定义所在的精确位置、函数释放时
的完整堆栈等等。封装对象还提供了`__repr__`函数。
> For debugging this kind of mistakes there is a special debug mode in asyncio, in which @coroutine decorator wraps all functions with a special object with a destructor logging a warning. Whenever a wrapped generator gets garbage collected, a detailed logging message is generated with information about where exactly the decorator function was defined, stack trace of where it was collected, etc. Wrapper object also provides a convenient `__repr__` function with detailed information about the generator.

下一个问题是如何控制此特性的开启关闭？因为调试应当保证在生产环境下不做任何操作，所以
@coroutine 装饰器使用环境变量 PYTHONASYNCIODEBUG 做控制阀。另外还有一个调试相关的变量
EventLoop.set_debug，这个变量不影响刚刚叙述的这个特性。

按照本提案，协程将是和协程不同的概念，且是原生语法特性。除了对于从未执行的协程会发出警告
外，本提案在sys模块新增了两个方法：set_coroutine_wrapper和get_coroutine_wrapper。
它们使得 asyncio 和其它框架具备更好的调试能力。

### 新库函数
New Standard Library Functions

- types.coroutine(gen). See types.coroutine() section for details.
- inspect.iscoroutine(obj) returns True if obj is a native coroutine object.
- inspect.iscoroutinefunction(obj) returns True if obj is a native coroutine function.
- inspect.isawaitable(obj) returns True if obj is an awaitable.
- inspect.getcoroutinestate(coro) returns the current state of a native coroutine object (mirrors inspect.getfgeneratorstate(gen)).
- inspect.getcoroutinelocals(coro) returns the mapping of a native coroutine object's local variables to their values (mirrors inspect.getgeneratorlocals(gen)).
- sys.set_coroutine_wrapper(wrapper) allows to intercept creation of native coroutine objects. wrapper must be either a callable that accepts one argument (a coroutine object), or None. None resets the wrapper. If called twice, the new wrapper replaces the previous one. The function is thread-specific. See Debugging Features for more details.
- sys.get_coroutine_wrapper() returns the current wrapper object. Returns None if no wrapper was set. The function is thread-specific. See Debugging Features for more details.

### 新抽象基类
New Abstract Base Classes
In order to allow better integration with existing frameworks (such as Tornado, see [13]) and compilers (such as Cython, see [16]), two new Abstract Base Classes (ABC) are added:

- collections.abc.Awaitable ABC for Future-like classes, that implement `__await__` method.

- collections.abc.Coroutine ABC for coroutine objects, that implement send(value), throw(type, exc, tb), close() and `__await__`() methods.

    Note that generator-based coroutines with CO_ITERABLE_COROUTINE flag do not implement `__await__` method, and therefore are not instances of collections.abc.Coroutine and collections.abc.Awaitable ABCs:
    ```py
    @types.coroutine
    def gencoro():
        yield

    assert not isinstance(gencoro(), collections.abc.Coroutine)

    # however:
    assert inspect.isawaitable(gencoro())
    ```
To allow easy testing if objects support asynchronous iteration, two more ABCs are added:

- collections.abc.AsyncIterable -- tests for `__aiter__` method.
- collections.abc.AsyncIterator -- tests for `__aiter__` and `__anext__` methods.
## ...
# PEP 526 -- Syntax for Variable Annotations
[PEP 526 -- Syntax for Variable Annotations | Python.org](https://www.python.org/dev/peps/pep-0526/)
Python 3.6

把 PEP 484 介绍的函数类型提示语法扩展到变量上。
……
# PEP 3107 -- Function Annotations
[PEP 3107 -- Function Annotations | Python.org](https://www.python.org/dev/peps/pep-3107/)
## 概述
本PEP介绍了给Python函数添加任意元数据注解的语法。

## 动机
有为函数添加元数据的需求，但没有一致的标准，产生了乱象。
本PEP就是为了解决这一问题。

Because Python's 2.x series lacks a standard way of annotating a function's parameters and return values, a variety of tools and libraries have appeared to fill this gap. Some utilise the decorators introduced in "PEP 318", while others parse a function's docstring, looking for annotations there.

This PEP aims to provide a single, standard way of specifying this information, reducing the confusion caused by the wide variation in mechanism and syntax that has existed until this point.

## 函数注解的基础构造块
Fundamentals of Function Annotations

在讨论具体细节之前，先阐明函数注解是什么、不是什么。
- 函数注解，无论是形参注解还是返回值注解，都是完全可选的
- 函数注解仅仅是一个手段，用于在编译时把任意python表达式关联到函数的各个部分
    > - Function annotations, both for parameters and return values, are completely optional.
    > -Function annotations are nothing more than a way of associating arbitrary Python expressions with various parts of a function at compile-time.

    Python自身并未为注解赋予任何特殊职能，而仅仅是打个辅助，提供了一种读取函数注解的方式。
    > By itself, Python does not attach any particular meaning or significance to annotations. Left to its own, Python simply makes these expressions available as described in Accessing Function Annotations below.

    为函数注解赋予含义的唯一途径是：第三方库对注解做出解释的时候。第三方库可以对注解做任何事情。
    例如，某个库可能利用基于字符串的注解帮助生成更友好的帮助信息，另一个库可能利用注解对函数和
    方法做静态类型检查。但无论何种情形，注解本身不具备任何含义，含义仅仅来自于第三方库而已。
    The only way that annotations take on meaning is when they are interpreted by third-party libraries. These annotation consumers can do anything they want with a function's annotations. For example, one library might use string-based annotations to provide improved help messages, like so:
    ```py
    def compile(source: "something compilable",
                filename: "where the compilable thing comes from",
                mode: "is this a single statement or a suite?"):
        ...
    ```
    Another library might be used to provide typechecking for Python functions and methods. This library could use annotations to indicate the function's expected input and return types, possibly something like:
    ```py
    def haul(item: Haulable, *vargs: PackAnimal) -> Distance:
        ...
    ```
    However, neither the strings in the first example nor the type information in the second example have any meaning on their own; meaning comes from third-party libraries alone

- 承接上文，本 PEP 不会对注解含义做出任何规定，即使是内置注解。
> -Following from point 2, this PEP makes no attempt to introduce any kind of standard semantics, even for the built-in types. This work will be left to third-party libraries.

## 语法

### Parameters
形参注解，是跟在形参之后的可选表达式。
```py
def foo(a: expression, b: expression = 5):
    ...
```
用伪语法表示，此时的形参定义类似`[: expression] [= expression]`。这表示：
1. 注解在默认值之前，且注解和默认值都是可选的
2. 冒号用于标识注解，就好像等号标识默认值
3. 所有注解表达式都在执行函数定义时求值，就和默认值求值的时机一样
> In pseudo-grammar, parameters now look like identifier `[: expression] [= expression]`. That is, annotations always precede a parameter's default value and both annotations and default values are optional. Just like how equal signs are used to indicate a default value, colons are used to mark annotations. All annotation expressions are evaluated when the function definition is executed, just like default values.

额外参数，它们的注解语法别无二致。
Annotations for excess parameters (i.e., *args and **kwargs) are indicated similarly:
```py
def foo(*args: expression, **kwargs: expression):
    ...
```

嵌套参数的注解，同样紧跟在要注解的参数名之后，而非闭括号的后面。可以只给嵌套参数的一部分添加注解。
> Annotations for nested parameters always follow the name of the parameter, not
the last parenthesis. Annotating all parameters of a nested parameter is not required:
```py
def foo((x1, y1: expression),
        (x2: expression, y2: expression)=(None, None)):
    ...
```
### Return Values
函数返回值的注解是这么加上的：
```py
def sum() -> expression:
    ...
```
也就是，形参列表后面可以跟着`->`以及一个Python表达式了。
正如形参注解一样，返回值注解中的表达式也是在执行函数定义的时候求值的。

That is, the parameter list can now be followed by a literal -> and a Python expression. Like the annotations for parameters, this expression will be evaluated when the function definition is executed.

函数定义语法如今变成了这样：
The grammar for function definitions [11] is now:
```py
decorator: '@' dotted_name [ '(' [arglist] ')' ] NEWLINE
decorators: decorator+
funcdef: [decorators] 'def' NAME parameters ['->' test] ':' suite
parameters: '(' [typedargslist] ')'
typedargslist: ((tfpdef ['=' test] ',')*
                ('*' [tname] (',' tname ['=' test])* [',' '**' tname]
                 | '**' tname)
                | tfpdef ['=' test] (',' tfpdef ['=' test])* [','])
tname: NAME [':' test]
tfpdef: tname | '(' tfplist ')'
tfplist: tfpdef (',' tfpdef)* [',']

```
### Lambda
lambda 表达式不支持注解语法。
虽然可以修改语法使其支持，但我决定不这么，我有充分的理由。
lambda's syntax does not support annotations. The syntax of lambda could be changed to support annotations, by requiring parentheses around the parameter list. However it was decided [12] not to make this change because:

    It would be an incompatible change.
    Lambdas are neutered anyway.
    The lambda can always be changed to a function.

## Accessing Function Annotations
函数一经编译，就可以通过函数的`__annotations__`属性访问函数的注解，这个属性是可变的字典对象。
如果没有注解，就是个空字典。
特别指出，返回值注解使用了`return`作为key。

```py
def fun(pa:'hello, annotation for pa', pb:'world')->'ret anno':
    pass

print(fun.__annotations__)
# {'pa': 'hello, annotation for pa', 'pb': 'world', 'return': 'ret anno'}

def fun2(pa, pb):pass
print(fun2.__annot
```
## Use Cases
注解的用途：

In the course of discussing annotations, a number of use-cases have been raised. Some of these are presented here, grouped by what kind of information they convey. Also included are examples of existing products and packages that could make use of annotations.

    Providing typing information
        Type checking ([3], [4])
        Let IDEs show what types a function expects and returns ([17])
        Function overloading / generic functions ([22])
        Foreign-language bridges ([18], [19])
        Adaptation ([21], [20])
        Predicate logic functions
        Database query mapping
        RPC parameter marshaling ([23])
    Other information
        Documentation for parameters and return values ([24])


## Standard Library

### pydoc and inspect

## Relation to Other PEPs

### Function Signature Objects



