python 笔记文章

# 字符串格式化
2020年6月5日
[printf-style String Formatting](https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting)
[formatted string literals](https://docs.python.org/3/reference/lexical_analysis.html#formatted-string-literals)
[str.format interface](https://docs.python.org/3/library/stdtypes.html#str.format)
[template strings](https://docs.python.org/3/library/string.html#template-strings)
[string — Common string operations](https://docs.python.org/3/library/string.html#module-string)


```py
# 1. printf 风格的 % 格式化
name='Jack';
age = 12;
'hello, %s, %d' %(name, age)
# 'hello, Jack, 12'

# 2. f 字符串
f'hello, {name}, {age}'
# 'hello, Jack, 12'

# 3. str.format() 函数
'hello, {name}, {age}'.format(name=name, age=age)
'hello, {}, {}'.format(name, age)
# 'hello, Jack, 12'

# 4. string.Template 对象
import string
tem = string.Template('hello, $name, ${age}')
tem.substitute(name=name, age=age)
# 'hello, Jack, 12'

```

printf和f字符串字面值以及 str.format() 都是格式化语法。而Template的基础功能只有标识符替换，无有格式化能力（但可以
通过子类扩展Template的功能）。

f字符串字面值和str.format的格式化功能更强大，（比如支持日期格式说明符），而printf格式的，则只能格式化数字、字符串，其余实际是转换成字符串的。

time.strftime() 和 datetime.date/time/datetime.strftime()的语法大致相同，但后者的语法更丰富一些。
## 花括号格式化替换语法
`{expr!conversion:spec}`

表达式，可以是任意有效的python表达式，略有一些限制。
conversion，是可选的，如果有`!s`调用 str(), `!r`调用 repr(), `!a`调用 ascii()。
下一步，使用 format() 协议，格式化表达式。用 spec 做参数调用表达式或转换结果的 `__format__()`
方法，如果省略 spec，则使用空字符串做参数。

## 具体到 str.format(*args,**kw)

对于 expr，有些说道：
```py
"First, thou shalt count to {0}"  # References first positional argument
"Bring me a {}"                   # Implicitly references the first positional argument
"From {} to {}"                   # Same as "From {0} to {1}"
"My quest is {name}"              # References keyword argument 'name'
"Weight in tons {0.weight}"       # 'weight' attribute of first positional arg
"Units destroyed: {players[0]}"   # First element of keyword argument 'players'
```
## printf风格的字符串格式化

> Note The formatting operations described here exhibit a variety of quirks that
> lead to a number of common errors (such as failing to display tuples and dictionaries
> correctly). Using the newer formatted string literals, the str.format() interface,
> or template strings may help avoid these errors. Each of these alternatives provides
> their own trade-offs and benefits of simplicity, flexibility, and/or extensibility.
大意是printf风格的字符串格式化是老古董了，有好几种新型格式化语法，他们各有所长。

字符串对象支持唯一一个内置操作符 % 即：表达式`format % values`，其中format是一个字符串。format中的%说明符会替换为values中的
值。这个效果相当于C程序中的printf函数。

如果format只需要一个实参，则 values 可以是单个值，也可以是含有单个值的元组；如果format需要两个及以上的参数，则values必须是
一个含相同数目元素的元组，或者是一个字典对象。


# 应用程序配置文件格式
# 异常处理

```
try_stmt  ::=  try1_stmt | try2_stmt
try1_stmt ::=  "try" ":" suite
               ("except" [expression ["as" identifier]] ":" suite)+
               ["else" ":" suite]
               ["finally" ":" suite]
try2_stmt ::=  "try" ":" suite
               "finally" ":" suite
```

expression 的结果必须是有个异常类或异常类构成的元组。

except xx as name 中定义的标识符 name，其作用域仅限于当前except子句。
```py
except E as N:
    foo
```
was translated to
```py
except E as N:
    try:
        foo
    finally:
        del N
```

可选的else语句。
> The optional else clause is executed if the control flow leaves the try suite, no exception was raised, and no return, continue, or break statement was executed. Exceptions in the else clause are not handled by the preceding except clauses.
# python程序计时
time.time() → float Return the time in seconds since the epoch as a floating point number.

```py
#coding = 'utf-8'
#by tt

""" 方法一 """
import datetime
import time


starttime = datetime.datetime.now()
endtime = datetime.datetime.now()
print('The time cost: ')
print(endtime - starttime)

""" 方法二 """
import time

start = time.time()
end = time.time()
print("Execution Time: ", end - start)

""" 方法三 """
tic1 = time.clock()
time.sleep(5)#(此行可以换成需要计时的模块)
toc1 = time.clock()
shijian1 = toc1-tic1
print(shijian1)

# Python 3.8版本的计时函数已经不time.clock方法了，但依然可以使用，只不过会产生如下警告
""" 方法四 """
tic1 = time.perf_counter()
time.sleep(5)#(此行可以换成需要计时的模块)
toc1 = time.perf_counter()
shijian1 = toc1-tic1
print(shijian1)
```

# python蓝牙
2020年7月2日

模块 pybluez
[github](https://github.com/pybluez/pybluez)
注：pybluez不兼容win10，在win10系统上，要用 pybluez-win10 代替 pybluez。
```sh
pip install pybluez
# win10
pip install pybluez-win10
```

```py
import bluetooth
```
# python启动过程

http://docs.localhost/python-3.8.3/using/cmdline.html

CPython 从命令行和环境变量搜索配置信息。
`python [-bBdEhiIOqsSuvVWx?] [-c command | -m module-name | script | - ] [args]`

```sh
python myscript.py
```

## 接口选项
接口选项是指：-c，-m，-，<script>， 这四个。
python命令行风格和unix shell 相似，但有如下附加功能：
- 如果调用时标准输入连接到tty设备，则进入交互模式：读取命令、执行命令、等待下一个命令。直到EOF（Unix 的Ctrl-D, Windows的 Ctrl-Z Enter)
- 以文件名为参数或者以文件作为标准输入时，它读取整个文件并执行
- 以目录名为参数，它从目录下选择合适的文件执行
- 提供 -c 'python statements' 选项时，执行给定的语句并退出。可以用换行分割多行语句。缩进规定了代码块
- 使用 -m module-name 时，从模块搜索路径中搜索给定名称的模块并执行
在非交互模式下，是先解析整个文件之后执行（不是读一句执行一句）。

`-c command`：当前目录加入sys.path中；sys.argv[0] 是 -c。
`-m module`：在sys.path中搜索指定模块并以`__main__`为名执行当前模块。
    当前目录加入sys.apth中，sys.argv[0] 是 -m。
    模块可以是文件模块。也可以是包（即目录），此时执行 `<pkg>.__main__`
    此选项不可用于内置模块和C扩展模块，因为它们没有对应的python的模块文件。
    -I 在isolate模式下执行模块。独立模块是指：sys.path 不包含当前目录，不包含用户的 site-package目录（即后期安装的模块），所有PYTHON*环境变量都忽略掉。
`- `  从标准输入读取命令。如果标准输入是终端，则隐式包好-i选项（交互模式）。sys.argv[0]设为 -。
`<script>` 执行脚本文件，此文件必须是 A. xx.py 文件，或者B.包含 `__main__.py` 的目录，或C.包含`__main__.py`的zip压缩文件。
    此时，sys.argv[0]设为给定的脚本文件名（或目录名）。
    如果给定的是.py文件名，则把包含此文件的目录放在sys.path的开头。
    如果给定的是目录或zip文件名，则把__main__.py作为__main__模块执行，同时把 <script> 添加到sys.path的开头。
    -I 在此处同样给力。
最后，如果没有指定任何接口选项，则默认使用 -i（进入交互模式），同时 sys.argv[0]设为'',且把当前路径加入 sys.path 的开头。
## 通用选项
-?
-h
--help
```
-?
-h
--help
帮助信息

--version, -V 输出版本信息并退出。

```
## 杂项

    -b  比较 bytes和str时，发出警告。
    -B  导入模块文件时，不生成.pyc文件。环境变量 PYTHONDONTWRITEBYTECODE
    -d  开启调试模式。执行过程输出更多详细信息。取决于编译时的参数配置。PYTHONDEBUG。
    -E  忽略所有PYTHON*环境变量（比如，pythpath，pythonhome）
    -i  当-c 或执行脚本文件之后，进入交互模式。PYTHONSTARTUP 变量指定的文件不会执行。
    -s  Don’t add the user site-packages directory to sys.path.
    -I  孤立模式（隐含触发 -E，-s。也就是只载入内置模块和标准库模块。（忽略PHTHON*变量，忽略用户site-package目录：即不把这些目录添加到sys.path中）。
    -O  初级优化。忽略 assert语句，忽略 `__debug__` 变量为条件的语句。ps：在费-O模式下，`__debug__`变量的值为True。/
    -OO 在-O的基础上，进一步忽略文档字符串。
    -S  不导入site模块。

## 搜索路径、初始化文件
PYTHONHOME的概念。
内置库，标准库，安装的第三方库（系统级别、用户级别），用户追加的搜索路径。

默认，在 prefix/lib/pythonX.Y 和 exec_prefix/lib/pythonX.Y 目录下搜索标准库模块。
PYTHONHOME 则用于强制指定别的目录作为标准库搜索路径。（prefix和exec_prefix同时被设为PYTHONME，会是同一个值，
如果要设置不同的值，把PYTHONHOME的值设为 dir1:dir2 的格式）。

虚拟环境的原理就是在site.py中修改sys.prefix和sys.exec_prefix的值而生效的。（而sys.base_prefix和sys.base_exec_prefix永远指向
真正的prefix和exec_prefix）。

这些是标准库生效的原理。第三方库，则在 site模块中。
## site模块
python解释器初始化时会自动导入此模块（也可以手动导入此模块）。此模块被导入时（手动或自动）会对自动导入第三方模块（叫site-package)，
并对sys.path做些修改。
-S 选项抑制site的自动导入，同时抑制手动导入此模块时自动导入第三方模块的行为。

site首先以 sys.prefix 和 sys.exec_prefix 做头（跳过空字符串），以 1. 空字符串 和 2. lib/site-packages (Windows) 或
 lib/pythonX.Y/site-packages (Unix and Macintosh) 做路径结尾，拼接出来四个路径，放入sys.path中，同时检测这些新加入的路径中
是否含有配置文件。

接着，如果新添加的某个路径下P含有 pyvenv.cfg 文件， site 会把 sys.executable, sys.prefix and sys.exec_prefix 统统设置为 P，并检测此目录下
是否有site-package目录。pyvenv.cfg文件中的include-system-site-packages设置true，则会在系统级别的 prefix 目录下搜索site-package，
否则就不搜索系统级别的site-package。
ps：sys.prefix和sys.exec_prefix 就是系统级别的 prefix 目录。
ps：所以
1. sys.prefix/lib 和 sys.exec_prefix/lib 下是标准库模块，
2. sys.prefix/lib/site-packages 和 sys.exec_prefix/lib/site-packages是系统第三方库安装路径
3. ~/.local/lib/pythonX.Y/site-packages （*Nix）或 %APPDATA%\Python\PythonXY\site-packages（Win）下则是用户级别第三方库安装路经。
   site.USER_BASE PYTHONUSERBASE.
   site.USER_SITE， python -m site --user-site

## venv
`py -m venv va`做了什么？
1. 新建目录 va/
2. 下有 pyvenv.cfg
3. va/Scripts/python.exe 会内置把 sys.prefix 和 sys.exec_prefix 设为 va 的绝对路径。
4. va/Scripts/activate.bat 脚本会删除PYTHONHOME，同时当前目录添加到PYTH的最前方。

这样，启动python就是执行scripts/下的python.exe，而这个python.exe是经过修改的，它的 prefix 内置改为了虚拟环境目录。
于是系统级别的site-package目录就变了。

系统标准库，是怎么加载的？无论如何，python默认把系统标准库的绝对路径放入 sys.path 中。
# python多线程和全局锁
<https://www.cnblogs.com/heiguu/p/10049537.html>
<https://www.liaoxuefeng.com/wiki/1016959663602400/1017629247922688>
<https://www.cnblogs.com/shengguorui/p/11940371.html>
concurrency 并发：时分系统，模拟同时执行。
parallelism 并行：多CPU，真正的同时执行。

Python的线程虽然是真正的线程，但解释器执行代码时，有一个GIL锁：Global Interpreter Lock，任何Python线程执行前，
必须先获得GIL锁，然后，每执行100条字节码，解释器就自动释放GIL锁，让别的线程有机会执行。

互斥锁：个线程要共享数据时，先将其锁定，此时资源的状态为“锁定”，其他线程不能更改；直到该线程释放资源，
将资源的状态变成“非锁定”，其他的线程才能再次锁定该资源。互斥锁保证了每次只有一个线程进入写入操作，从而保证了多线
程情况下数据的正确性。互斥锁体现的就是一个同步的机制.
所以，多线程在Python中只能交替执行，即使100个线程跑在100核CPU上，也只能用到1个核。

最后,GIL是线程锁，针对线程，而不是进程。然而这些规则是Cpython给的，像Jpython就没有这个机制。

尽管受制于 GIL，但是用多个 Python 线程来执行系统调用的时候，这些系统调用可以可以平行的执行。

GIL 并不会保护开发者自己编写的代码。这是因为同一时刻固然只能有一个 Python 线程得到执行，但是，当这个线程正在操作某个数据
结构的时候，其他线程可能会打断它，一旦发生这种现象，就会破坏程序的状态，从而使相关的数据结构无法保持其一致性。为了保证所
有线程能够得到公平地执行，Python 解释器会给每个线程分配大致相等的处理器时间。为了达到这样的分配策略，Python 系统可能当
某个线程正在执行的时候将其暂停，然后使另一个线程继续往下执行。由于我们无法提前获知 Python 系统会在何时暂停这些线程，
所以我们无法控制程序中某些操作是原子操作。

1. CPython 引入了GIL，所以 CPython 不能做到真正的并行
2. GIL 只是为了保护python解释器的状态，并不会保护我们写的程序，所以多线程python程序中仍然需要互斥锁等并发机制
3. GIL 只是限制了CPU使用，但系统调用可以真正并发执行，所以计算密集型python程序，并发并不能提高效率，但如果是io密集型，多线程
   则可以提高效率（因为io是系统调用）
# 类型修饰符
[PEP 484-Type Hints](https://www.python.org/dev/peps/pep-0484/)
[全面理解Python中的类型提示（Type Hints）](https://www.cnblogs.com/jfdwd/p/11208998.html)
自 3.5 引入。
```py
def greeting(name: str) -> str:
    return 'Hello ' + name

print(greeting('Martin'))
print(greeting(1))
```

Python 是动态类型语言，运行时不需要指定变量类型。这一点是不会改变的，但是2015年9月创始人 Guido van Rossum 在 Python 3.5
引入了一个类型系统，允许开发者指定变量类型。它的主要作用是方便开发，供IDE 和各种开发工具使用，对代码运行不产生影响，
运行时会过滤类型信息。
# python 的动态类型

用动态类型的语言来写程序，更符合duck type的思想。写小程序的时候是挺爽的。
用C++和C#什么的，你写个class和interface还得先想一想，多浪费时间呀！

缺点就一个：代码量稍微大一些，看别人的代码时，可以把你恶心到吐血

从工程的角度来看,动态语言一般适合短平快,需求多变但简单清晰的项目.
而大型项目,还是必须要靠java和c#.

请记住，虽然动态类型意味着任何变量都可以成为任何类型，但是所有变量在所有时间中都应只有一种类型。
类型系统仍然是编程的核心组件，想想那些使用isinstance判断变量类型、应用逻辑所浪费的时间吧。

Go语言，算静态语言。Go也有duck type，这个duck type好啊，熊猫学会“嘎嘎叫”后，不需要duck爹，
只要有个duck导师就能名正言顺能过关了。

## 附：静态类型/动态类型；强类型/弱类型
[弱类型、强类型、动态类型、静态类型语言的区别是什么？](https://www.zhihu.com/question/19918532)

Java,C是静态类型语言。
python，javascript，ruby 是动态类型语言。

java是强语言类型 弱类型的语言的东西没有明显的类型,他能随着环境的不同,自动变换类型而强类型则没这样的规定,
不同类型间的操作有严格定义,只有相同类型的变量才能操作,虽然系统也有一定的默认转换,当绝没有弱类型那么随便。

Java 是强类型，而 C 语言是弱类型语言。因为Java不允许可能导致错误的隐式类型转换。
Java 不能把double赋值给int（必须强制类型转换），而C
# python3 操作 excel
openpyxl模块读写excel。<https://www.cnblogs.com/crazymagic/articles/9752287.html>
另一种方式是 xlrd 读取excel，xlwt 编辑 exel。
[xlrd document](https://xlrd.readthedocs.io/en/latest/)

openpyxl is a Python library to read/write Excel 2010 xlsx/xlsm/xltx/xltm files.

xlwt a library for developers to use to generate spreadsheet files compatible with Microsoft Excel versions 95 to 2003.

两者都是对于excel文件的操作插件，两者的主要区别在于写入操作，其中xlwt针对Ecxec2007之前的版本，即.xls文件，
其要求单个sheet不超过65535行，而openpyxl则主要针对Excel2007之后的版本（.xlsx），它对文件大小没有限制。
另外 xlrd/xlwt在读写方面的速度都要优于openpyxl。

自 xlrd 0.8.0 (22 Aug 2012)，支持读取 .xlsx 格式的文件。
自 xlrd 2。0.0 （），仅支持 .xls 格式。要读取 xlsx 格式，需要使用其它库，比如 openpyxl。

`pip install xlrd`

[Python 读写 Excel 文件的库](http://www.python-excel.org/)
## Excel BIFF
[关于Excel二进制文件和Biff格式文件的关系](http://club.excelhome.net/thread-600816-1-1.html)
通常我们把Excel的文件格式叫做BIFF(Binary Interchange File Format).

2003中的.xls本身就是二进制文件，.doc和.ppt都是，只不过对应的biff版本低一些。

2007能选择.xlsb保存为二进制文件，减少容量的同时提高安全性。

Microsoft Office 2007中，微软引入了一种全新的文档格式：Open XML。由于Open XML是一种开放的文档格式（基于两种开放技术：XML、Zip），所以解决了过去Microsoft Office所使用的二进制文档难以交互、难以被第三方应用程序访问的问题。但是自从微软决定将Open XML提交给ISO之后，从业界的反馈来看，很多人仍然非常关心过去的二进制文档格式（.doc, .xls, .ppt），并希望能得到其相关的技术细节文档。经过慎重的考虑，Microsoft决定将Microsoft Office所使用的二进制文档格式公开。任何人和企业，在不违反相关协议的前提下，都可以免费得到其技术规范文件。
# .py 文件的 shebang
这样
```py
#!/usr/bin/python3
```

或者这样
```py
#!/usr/bin/env python3
```
which searches for the Python interpreter in the whole PATH. However, some Unices may not have the env command, so you
may need to hardcode /usr/bin/python3 as the interpreter path.
# 一个python脚本，可以同时在msys2和cmd下执行
和命令一样直接运行，而不需要 python /path/to/file.py 执行

1. windows 下的 py 启动器，会受shebang的影响
<http://docs.localhost/python-3.8.3/using/windows.html#shebang-lines>

windows 下的 py launcher 支持 shebang，只不过把这几个shebang当作虚拟命令：
```
/usr/bin/env python

/usr/bin/python

/usr/local/bin/python

python
```
比如，`#! /usr/bin/python`，py 会把它解释为使用默认python解释器。
`/usr/bin/env python` 则 py 会把它解释为先从PYTH中搜索python，然后搜索 py 注册的python。

dw.py
```py
#!/bin/python
"""
征信二代项目工具脚本

2020-07-17T11+08 chenxizhan new
"""
import os
import subprocess

# 各种目录
# pts = {
#     'base': r'F:\work\04-dw',
#     'local': r'F:\work\04-dw\local',
#     'py': r'F:\work\04-dw\local\scripts\py',
#     'sql': r'F:\work\04-dw\local\scripts\sql-init-orcl'
# }

# for k in pts:
#     print(pts[k])

# for k in pts:
#     os.system(rf'echo cygpath {pts[k]}')

subprocess.run('echo')
```

```bat
>python D:\bin\dw.py
F:\work\04-dw
Traceback (most recent call last):
  File "D:\bin\dw.py", line 26, in <module>
    subprocess.run(['echo', 'hello'])
  File "D:\programs\python\v3.8.3\lib\subprocess.py", line 489, in run
    with Popen(*popenargs, **kwargs) as process:
  File "D:\programs\python\v3.8.3\lib\subprocess.py", line 854, in __init__
    self._execute_child(args, executable, preexec_fn, close_fds,
  File "D:\programs\python\v3.8.3\lib\subprocess.py", line 1307, in _execute_child
    hp, ht, pid, tid = _winapi.CreateProcess(executable, args,
FileNotFoundError: [WinError 2] 系统找不到指定的文件。

>py D:\bin\dw.py
Unable to create process using '/bin/python D:\bin\dw.py'
```

!!?? 问题源自于，我希望一个python脚本可以同时在 msys2 和 cmd 下运行。
# 实例方法、类方法、静态方法
https://www.cnblogs.com/wcwnina/p/8644892.html

实例方法

    定义：第一个参数必须是实例对象，该参数名一般约定为“self”，通过它来传递实例的属性和方法（也可以传类的属性和方法）；

    调用：只能由实例对象调用。

类方法

    定义：使用装饰器@classmethod。第一个参数必须是当前类对象，该参数名一般约定为“cls”，通过它来传递类的属性和方法（不能传实例的属性和方法）；

    调用：类对象或实例对象都可以调用。

    对应java里的static方法。

静态方法

    定义：使用装饰器@staticmethod。参数随意，没有“self”和“cls”参数，但是方法体中不能使用类或实例的任何属性和方法；

    调用：类对象或实例对象都可以调用。

    静态方法主要是用来存放逻辑性的代码，逻辑上属于类，但是和类本身没有关系，也就是说在静态方法中，不会涉及到类中的属性和方法的操作。
    可以理解为，静态方法是个独立的、单纯的函数，它仅仅托管于某个类的名称空间中，便于使用和维护。
    譬如，我想定义一个关于时间操作的类，其中有一个获取当前时间的函数

    如果一个函数既不需要访问类属性也不需要访问实例属性，则可以定义为静态方法。

```py
class ClassTest(object):
    __num = 0
    @classmethod
    def addNum(cls):
        cls.__num += 1
    @classmethod
    def getNum(cls):
        return cls.__num
    # 这里我用到魔术方法__new__，主要是为了在创建实例的时候调用累加方法。
    def __new__(self):
        ClassTest.addNum()
        return super(ClassTest, self).__new__(self)


class Student(ClassTest):
    def __init__(self):
        self.name = ''

a = Student()
b = Student()
print(ClassTest.getNum())
```

```py
import time

class TimeTest(object):
    def __init__(self, hour, minute, second):
        self.hour = hour
        self.minute = minute
        self.second = second

    @staticmethod
    def showTime():
        return time.strftime("%H:%M:%S", time.localtime())


print(TimeTest.showTime())
t = TimeTest(2, 10, 10)
nowTime = t.showTime()
print(nowTime)
```
其实，我们也可以在类外面写一个同样的函数来做这些事，但是这样做就打乱了逻辑关系，也会导致以后代码维护困难。

staticmethod之间互相调用，需要加类名修饰吗?

```py
class A:
    @staticmethod
    def _greeting(msg):
        print('hello, ', msg)

    @staticmethod
    def greeting(msg):
        _greeting(msg)

A.greeting('Jack')
```
```sh
static_method_test.py
Traceback (most recent call last):
  File "G:\pycode\src\static_method_test.py", line 17, in <module>
    A.greeting('Jack')
  File "G:\pycode\src\static_method_test.py", line 14, in greeting
    _greeting(msg)
NameError: name '_greeting' is not defined
```

[Python 中 staticmethod 和 classmethod 原理探究 - 编程进阶之路 - SegmentFault 思否](https://segmentfault.com/a/1190000022735289)

staticmethod 的效果是让 C.f 与 c.f 都返回函数，等价于 `object.__getattribute__(c, "f")` 或 object.`__getattribute__(C, "f")`.

用描述符机制实现静态方法，代码很简单:
```py
class staticmethod(object):
    def __init__(self, f):
        self.f = f

    def __get__(self, obj, objtype=None):
        return self.f
```
[Python 中的 classmethod 和 staticmethod 有什么具体用途？ - 知乎](https://www.zhihu.com/question/20021164)
"介绍了静态方法和类方法的实际使用场景，漂亮"

classmethod与staticmethod

这两个方法的用法是类似的，在上面的例子中大多数情况下，classmethod也可以通过staticmethod代替，在通过类调用时，这两者对于调用者来说是不可区分的。

classmethod与类的metaclass的实例方法是等效的，classmethod优先级高一些。
建议：
- 除非能说出合理的理由，否则能用classmethod的时候就使用classmethod
- 将类的定义改造成另外某种语义的时候使用metaclass，实现类的业务上的多态使用classmethod
- 对类的用户可见的功能使用classmethod，对类的用户不可见的功能可以考虑使用metaclass
- 没疯用classmethod，疯掉之后可以metaclass满天飞
# python 字符串的内部编码
1. python内部使用哪种编码保存字符串
2. 如果是变长编码（如UTF-8），那么下表操作的时间复杂度是多少？O(n)吗？
# python的属性查找

`__dict__, __getattr__(), __getattribute__(), @property, descriptor`

- 任何对象都有一个名字空间字典，它保存了对象的属性，通过`__dict__`可以访问这个字典。
  类也是对象，故而类对象有`__dict__`属性，但类对象的字典有些不同：
  `type.__new__()`创建的类，它的 `__dict__`会被替换为一个只读的映射代理。

1. 语言机制
2. 钩子函数
    `object.__getattribute__(self, name)`,
    `object.__setattr__(self, name, value)`
    `object.__delattr__(self, name)`
    `object.__getattr__(self, name)`
3. 数据描述符
    `__get__(self, ins, owner=None)`
    `__set__(self, ins, value)`
    `__delete__(self, ins)`
    `__set_name__(self, owner, name)`

o.name 和 getattr(o, 'name')，的语言逻辑可以用Python代码描述如下：
```py
try:
    v = o.__getattribute__(name)
except AttributeError:
    if hasattr(o, '__getattr__'):
        return o.__getattr__(name)
    raise
```

    由属性查找触发的 o.__getattribute__() 调用，是魔法函数的隐式调用，
    ps: 内置的属性查找逻辑由 object.__getattribute__(self, name) 实现
        但至少 object.__getattribute__ 的查找需要内置在语言中。（因为找到
        object.__getattribute__ 之前没法调用它）。
    ps：属性描述符的逻辑，也是在 object.__getattribute__(self, name) 中实现的
    ps: 到 __getattr__ 的回退是语言机制，不是 object.__getattribute__(self, name)
# 元类
元类，涉及到类的创建过程

摘抄自知乎的一段话：

Python2创建类的时候，可以添加一个 `__metaclass__` 属性.
在Python3中语法改变了一下.

日常的业务逻辑开发是不太需要使用到元类的，因为元类是用来拦截和修改类的创建的，用到的场景很少。我能想到最典型的场景就是 ORM。

# 描述符

## 实例绑定
描述符，实例绑定的逻辑：
1. 读取操作:没有 `__get__()`，是普通属性的逻辑；有`__get__()`，是数据描述符时一律拦截，不是的时候仅当实例字典不存在同名属性时才拦截。
    ps: 1. 有get 2. 按优先级允许，这才拦截。
2. 写/删操作: 不是数据描述符，是普通属性删除逻辑；是数据描述符，一律拦截。

默认的 `__getattribute__(self, name)`逻辑用Python代码描述如下：
类的字典定义了属性描述符，访问类实例的属性。
```py
def is_data_des(o): return hasattr(o, '__get__') or hasattr(o, '__set__')

def __getattribute__(self, name):
    # 1. 实例和类的字典都没有，报错
    # 2. 仅实例字典里有，直接返回
    # 3. 类的字典里有，实例字典或有或没有
    # 设 vc 是类字典里找到的，vi 是实例字典里找到的, has_vi 标志实例字典是否有name属性
    if not hasattr(vc, '__get__'):
        if has_vi: return vi
        else: raise AttributeError
    else:
        if is_data_des(vc): return vc.__get__(self, name)
        else: return vc

def __setattr__(self, name, value):
    if is_data_des(vc): vc.__set__(self, name, value)
    else: self.__dict__[name] = value

def __delattr__(self, name):
    if is_data_des(vc): vc.__delete__(self, name)
    else: del self.__dict__[name]
```

## 描述符的实现原理

https://www.zhihu.com/question/25391709

Python 2.2引入的新API: descriptor

怎么解决descriptor用于函数和property时，对查找顺序的不同要求呢？Python的解决方法说也简单：
如果一个descriptor只有__get__方法(如FunctionType)，我们就认为它是function-like descriptor，
适用"实例-类-基类"的普通查找顺序；如果它有__set__方法(如Property)，就是data-like descriptor，
适用"类-基类-实例"的特殊查找顺序。但是找到descriptor之前又怎么可能知道它的类型呢？
所以无论如何都得先查找类和基类，再根据是否找到descriptor，和descriptor的类型，来决定是否需要查找实例。

1. 不考虑描述符,属性查找顺序是:实例,类,类的基类(并递归),不找元类,getattr
2. 每个实例都有自己的 `__dict__` 属性,它是实例自己的名字空间; 而只要不是变态, 不会有人把它实现为描述符.
   PS:可以把它做成描述符吗?
3. 有了描述符, 属性查找顺序是: 类和基类,实例, getattr
4. 实例方法, 类方法, 静态方法, 属性, 都是用描述符语法实现的.
   查找属性会调用 `__getattribute__` 方法,但这个方法本身就是一个属性.
   出路是 object 提供的默认实现, 描述符机制是在这个方法中实现的, 而如果重载了这个方法, 就要自己负责描述符机制的处理.
5. 无论何时,getattr都是属性查找失败之后最后的手段. 这是语法机制, 不是 getattribute 控制的.

6. slots 和 dict?

```py
'''描述符之前的属性查找模拟
'''
import types
def instance_getattr(obj, name):
    v = obj.__dict__[name]
    if v is not None: return v
    v,cls class_getattr(obj.__class__, name)
    if isinstance(w, types.FunctionType):
        return BoundMethod(w, obj, cls);
    if w is not None: return w
    raise AttributeError(obj.__class__, name))

def class_getattr(cls, name):
    v = cls.__dict__[name]

    if v is not None: return v,cls
    for c in cls.__bases__:
        v, c2 = class_getattr(c, name);
        if v is not None: return v,c2
    return None, None


'''描述符之后
'''
def instanc_getattr(obj, name):
    v, cls = class_getattr(obj.__class__, name);

    if hasattr(v, '__get__') and hasattr(v,'__set__'):
        return v.__get__(obj, cls)

    w = obj.__dict__[name]
    if w is not None: return w
    if hasattr(v, '__get__'): return v.__get__(obj, name)
    elif v is not None: return v

    raise AttributeError(obj.__class__, name);
# Q. 如果obj本身是个类呢?

'''如此, 实例方法,类方法,静态方法的描述符可实现如下
'''

class InstanceMethod:
    def __init__(self, f):
        self.f = f
    def __get__(self, instance, owner = None):
        ins = instance if instance is not None else owner
        return types.BoundMethod(self.f, ins, owner)

class ClassMethod:
    def __init__(self, f):
        self.f = f
    def __get__(self, instance, owner = None):
        return types.BoundMethod(self.f, owner);
class StaticMethod:
    def __init__(self, f):
        self.f = f
    def __get__(self, instance, owner  = None):
        return self.f

class Property:
    def __init__(self, )

class A:
    @InstanceMethod
    def hello(self):pass
    @ClassMethod
    def cm(cls):pass
    @StaticMethod:
    def sm():pass

```

## 描述符n连问
1. 正常的描述符是这样的：定义一个描述符类D，它实现描述符协议，而在另一个类C中用D的实例做描述符。
    如果D定义了`__get__`属性，但把它设置成字符串，会有效吗？
    ans：你真是人才。会有效，但会报错:
    ```py
    class BadDes:
        __get__ = 'hello'
        __set__ = 'world'
    class C2:
        x = BadDes()

    c2 = C2()
    c2.x = 3    # TypeError: 'str' object is not callable
    ```

    如果随便创建一个实例，然后直接在实例的字典里添加名为`__get__`的函数，会有效吗，添加方法呢？
    没有效果，两种方式都没有效果
    ```py
    # 第二种不正常的
    class BadDes:pass
    d = BadDes()
    def f(*args): print('f called: ', args)
    d.__set__ = f
    class C3(): x = d
    c3 = C3()
    print(c3.__dict__) # {}
    c3.x = 12 # 正常执行
    print(c3.__dict__) # {'x': 12}

    # 第二种不正常的变种: 证明即使是直接在字典里放上绑定后的方法也无效
    import types
    d.__set__ = types.MethodType(f, d)
    print(d.__dict__) # {'__set__': <bound method f of <__main__.BadDes object at 0x000002A001CC2888>>}
    class C3(): x = d
    c3 = C3()
    print(c3.__dict__) # {}
    c3.x = 12 # 正常执行
    print(c3.__dict__) # {'x': 12}
    ```

2. 类的字典定义了属性描述符,类绑定
3. 类的元类字典里有属性描述符，类绑定
4. 描述符一般把值设置到实例上，而不是自己上，为什么？
    1. 描述符是类属性，类的所有实例共享，要是设置到自己身上，就串了
    2. 借助字典，用实例做key，可以解决上一个问题，但会导致引用计数无法清零，内存啊
## 使用场景
[有效的python属性管理: 描述符的使用 - 知乎](https://zhuanlan.zhihu.com/p/24305162)
[深入理解 Python 描述符 - 知乎](https://zhuanlan.zhihu.com/p/196473543)
"举了一个例子，成绩管理系统，逐步引入属性描述符，用作属性取值检验。同时介绍了
如何用描述符机制实现@property,@classmethod,@staticmethod,super()"

对属性有特殊需求的时候，一般会考虑@property和属性描述符。
@property装饰器使用起来方便快捷，
但是@property的缺点就在于他无法被复用，同一套逻辑不能在不同的属性之间重复使用。
### 类型验证

```py
class Float(object):
    def __init__(self, name):
        self.name = name

    def __get__(self):
        private_name = "_{}__{}".format(instance.__class__.__name__, self.name)
        if private_name not in instance.__dict__:
            instance.__dict__[private_name] = self.default

    def __set__(self, instance, value):
        # 检测类型
        if type(value) is not float:
            msg = "{} ({}) is not a float number".format(self.name, value)
            raise ValueError(msg)
        # 将对象的相应属性进行赋值，注意这里我使用了`mangled name`用来进行私有化处理
        private_name = "_{}__{}".format(instance.__class__.__name__, self.name)
        instance.__dict__[private_name] = value

```
```py
class Score:
    def __init__(self, default=0):
        self._score = default

    def __set__(self, instance, value):
        if not isinstance(value, int):
            raise TypeError('Score must be integer')
        if not 0 <= value <= 100:
            raise ValueError('Valid value must be in [0, 100]')

        self._score = value

    def __get__(self, instance, owner):
        return self._score

    def __delete__(self):
        del self._score

class Student:
    math = Score(0)
    chinese = Score(0)
    english = Score(0)

    def __init__(self, name, math, chinese, english):
        self.name = name
        self.math = math
        self.chinese = chinese
        self.english = english


    def __repr__(self):
        return "<Student: {}, math:{}, chinese: {}, english:{}>".format(
                self.name, self.math, self.chinese, self.english
            )

```
前面这个描述符代码有问题，所有实例共享描述符带来的问题。
如果要把 math，chinese，english 这三个变量变成实例之间相互隔离的属性，应该这么写。
```py
class Score:
    def __init__(self, subject):
        self.name = subject

    def __get__(self, instance, owner):
        return instance.__dict__[self.name]

    def __set__(self, instance, value):
        if 0 <= value <= 100:
            instance.__dict__[self.name] = value
        else:
            raise ValueError

class Student:
    math = Score("math")
    chinese = Score("chinese")
    english = Score("english")

    def __init__(self, math, chinese, english):
        self.math = math
        self.chinese = chinese
        self.english = english

    def __repr__(self):
        return "<Student math:{}, chinese:{}, english:{}>".format(self.math, self.chinese, self.english)
```
Q. 分数为什么要给一个默认值呢？`math = Score(0)`
是出于某些原因吗？

之前的错误代码，更像是把描述符当做了存储节点。之后的正确代码，则是把描述符直接当做代理，本身不存储值

### 属性深复制
如果实例属性是字典或者列表这类的变量，python都会返回对象的引用，因此在获取其值以后也是
有可能修改其内部数据的，因此如果真的想要是这个属性不被做任何的修改，可以使用deepcopy直接
返回对象的深复制。
```py
def __get__(self, instance, owner):
    private_name = "_{}__{}".format(instance.__class__.__name__, self.name)
    if private_name not in instance.__dict__:
        instance.__dict__[private_name] = self.default
    if self.deepcopy:
        return copy.deepcopy(instance.__dict__[private_name])
    else:
        return instance.__dict__[private_name]

```
### 惰性访问
很多时候一个类的属性，我们并不需要在这个类初始化的时候就进行初始化，我们可以在第一次使用
这个属性的时候顺便将这个属性初始化，这样既可以减少计算的次数，也在一定程度上减少了内存的需求。
```py
def __get__(self, instance, owner):
    private_name = "_{}__{}".format(instance.__class__.__name__, self.name)
    # 是否实例属性已存在
    if private_name not in instance.__dict__:
        instance.__dict__[private_name] = self.default
    return instance.__dict__[private_name]

```
### 设置只读属性

# type和object(元类)
<https://www.cnblogs.com/busui/p/7283137.html?utm_source=itdadao&utm_medium=referral>
在面向对象的体系中，存在两种关系：1. 父子关系（图中以实线描述）、2. 类型实例关系（图中以虚线描述）。

有两条很有用的规则
1. Dashed Arrow Up Rule：如果X是A的实例，同时A又是B的子类，那么，X也是B的实例。
2. Dashed Arrow Down Rule：如果B是M的实例，同时A是B的子类，那么，A也是M的实例。（注：其实这条规则很少会用到）。

父子关系（ the subclass-superclass relationship）;
类型实例关系（ the type-instance relationship ）。

PS：1. 翻译为：子类实例可以看作父类实例
    2. 翻译为：父类的类也是子类的类

只有继承了type的类能够做为metaclass的参数。
# python 黑魔法
连接多个列表最极客的方式
```py
>>> a = [1,2]
>>> b = [3,4]
>>> c = [5,6]
>>>
>>> sum((a,b,c), [])
[1, 2, 3, 4, 5, 6]
```
- 在初始化一个空字典时，在运行效率上，{} 会比 dict() 快三倍左右。
- 在 Python2 中，数字可以与字符串直接比较。结果是数值永远比字符串小。但在 Python3 中，却不行。TypeError: '<' not supported between instances of 'int' and 'str'
- json.tool 来格式化 JSON：python -m json.tool demo.json
- 快速打印包的搜索路径 `$ python -m site`

[i,j for i in range(10) for j in 'abc']
[j for i in range(5) for j in range(i)]
[(i,j) for i in range(5) for j in range(i)]
# python的启动过程
目的：弄清楚python初始化中，各种模块是如何加载的
# 设置 py 使用的默认python版本
环境变量：
PY_PYTHON=3
PY_PYTHON=3.7
# import 和 模块:TODO
# windwos cmd 下 pipenv 的 shell 没有历史记录
只能补偿一下: 在 pipenv shell 里再开一个cmd就好了。
```sh
pipenv shell
(py-std-ELp5UvXg) F:\work\04-dw\local\scripts\py-std>cmd
Microsoft Windows [版本 10.0.18363.1082]
(c) 2019 Microsoft Corporation。保留所有权利。
```
不，没好
# with 语句和 context manager
1. with语句的用法：
```py
# 做io操作时，为了确保资源被关闭，需要try
try:
    f = open('foo', 'r')
finally:
    f.close()

# 但，用with可以简单搞定
with open('foo', 'r') as f
    print(f.readline())

```

奥妙在于，with语句利用了 context manager 协议（`__enter__()和 __exit__(ex_type, ex_value, trace)`）。
例如，我们可以自己实现一个 context manager:
```py
class A:

    def __init__(self):
        print('init')

    def __enter__(self):
        print('__enter__')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('__exit__')
        return True


with A() as a:
    print('do with')
```

但当 context manager 的逻辑比较简单时，没有必要创建一个类，可以使用Python的注解：
```py
from contextlib import contextmanager

@contextmanager
def managed_resource(*args, **kwds):
    # Code to acquire resource, e.g.:
    resource = acquire_resource(*args, **kwds)
    try:
        yield resource
    finally:
        # Code to release resource, e.g.:
        release_resource(resource)

>>> with managed_resource(timeout=3600) as resource:
...     # Resource is released at the end of this block,
...     # even if code in the block raises an exception
```

@contextlib.contextmanager注解的工作方式如下。
1. 被注解的函数必须是有且仅有一个值的生成器
2. yield 给出的值，会赋值给 with 语句后面的as，如果有的话
3. 如果with语句体的执行抛出了异常，则yield语句会抛出同样的异常。
4. 和`__exit__()`不同的是，如果生成器决定不处理异常，那么必须重新抛出异常（而exit只需要返回False）。
The function being decorated must return a generator-iterator when called. This iterator must yield exactly one value, which will be bound to the targets in the with statement’s as clause, if any.

At the point where the generator yields, the block nested in the with statement is executed. The generator is then resumed after the block is exited. If an unhandled exception occurs in the block, it is reraised inside the generator at the point where the yield occurred. Thus, you can use a try…except…finally statement to trap the error (if any), or ensure that some cleanup takes place. If an exception is trapped merely in order to log it or to perform some action (rather than to suppress it entirely), the generator must reraise that exception. Otherwise the generator context manager will indicate to the with statement that the exception has been handled, and execution will resume with the statement immediately following the with statement.
# argparse模块和命令行参数解析
argparse模块把命令行参数分为位置参数和选项参数两大类。
凡是名字以 self.prefix_chars 中的字符开头的都是选项参数。它默认是`-`，这符合我们的常识。

## 动作
ArgumentParser.add_argument() 的 action 参数

### 默认把参数值存到参数名中，以 str 类型，是单个的值
```py
import argparse

p1 = argparse.ArgumentParser()

p1.add_argument('--foo')
p1.add_argument('key')
print(p1.parse_args('--foo f hello'.split()))
# Namespace(foo='f', key='hello')
```

### 指定 nargs 参数，可以让参数消耗指定个数的值，并以列表的形式返回
```py
p2 = argparse.ArgumentParser()
p2.add_argument()
```
### 指定 nargs，可以让参数消耗指定个数的值，并以列表的形式返回
nargs=N(具体的数值），还可以是 ? * + 之一，表示零个或一个，零个或多个，一个或多个（正则表达式的量词）。
```py
p = argparse.ArgumentParser()
p.add_argument('--foo', nargs="+")
print(p.parse_args('--foo v1 v2 v3 v4'.split()))
print(p.parse_args('--foo v1'.split()))
print(p.parse_args('--foo'.split()))
```
```
Namespace(foo=['v1', 'v2', 'v3', 'v4'])
Namespace(foo=['v1'])
usage: 002_action.py [-h] [--foo FOO [FOO ...]]
002_action.py: error: argument --foo: expected at least one argument
```

注：nargs=1 的结果是一个长度为1的列表，而不指定 nargs，则得到值本身。它们是不一样的。

### 但无法区分的情形不行
```py
p2 = argparse.ArgumentParser()
p2.add_argument('--foo', nargs="+")
p2.add_argument('key', nargs="+")

print(p2.parse_args('--foo hello world ok'.split()))

```
```
usage: 002_action.py [-h] [--foo FOO [FOO ...]] key [key ...]
002_action.py: error: the following arguments are required: key
```

# 名称空间包
## 介绍如下：
在3.3及以后的Python版本中，加入了新的模型：命名空间包。

其特性如下：
1.优先级最低，在已有版本所有的import规则之后；
2.要导入的文件夹中不能有__init__.py文件
3.主要依赖于sys.path中从左到右的搜索顺序

使用方法如下：
```
cd ~/codes/
mkdir -p dir1/sub dir2/sub
echo "print 'mod1 speaking' " > dir1/sub/mod1.py #没有建立__init__.py
echo "print 'mod2 speaking' " > dir2/sub/mod2.py #没有建立__init__.py
export PYTHONPATH=~/codes/dir1/sub:~/codes/dir2/sub
```

在python33中：
```
>>>import sys
>>>import sub
>>>print sys.path

#结果中可以看到dir1/sub和dir2/sub
>>>from sub import mod1
mod1 speaking
>>>import sub.mod2
mod2 speaking
```

总结：

顾名思义，命名空间包类似命名空间，python会搜索sys.path中所有相同的路径名，将它们视为同一个命名空间，但是缺点是导入的模块或包有可能存在冲突

# python 发送HTTP请求
标准库有 http 模块和 urllib 模块。

- urllib.request for opening and reading URLs
- urllib.error containing the exceptions raised by urllib.request
- urllib.parse for parsing URLs
- urllib.robotparser for parsing robots.txt files

- http.client is a low-level HTTP protocol client; for high-level URL opening use urllib.request
- http.server contains basic HTTP server classes based on socketserver
- http.cookies has utilities for implementing state management with cookies
- http.cookiejar provides persistence of cookies

http.client是底层的 HTTP 协议客户端实现，一般不会直接使用这个模块。
urllib.request 提供了更高层一些的抽象。

另外，requests 模块是非常好用的第三方 HTTP 处理库，
# 发布Pyhton模块
[Distributing Python Modules — Python 3.8.3 documentation](http://docs.localhost/python-3.8.3/distributing/index.html)

- Python Packaging Index 是开源 Python 模块仓库
- distutils 是 Python 标准库最早引入的模块编译和分发库。如今基本不再直接使用它。
  但它仍然是现今各种包分发工具的基础。
- setuptools 是 distutils 的替代物，它比distutls多了依赖管理。
- wheels 是这样一个项目，它在 distutils/setuptools 的基础上增加了二进制包分发功能，
  使得用户可以直接下载安装预编译好的模块。

## 开源许可
当今世界，软件自动有版权，其他人要复制、使用、修改、再发布软件，应当获得原作者的显式许可
才行。
开源许可证，

## 安装必要工具
现代化 Python 打包标准，没有提供标准库来实现，因为设计者考虑到要保持不同python版本之间
的一致性。需要手动安装：
`python -m pip install setuptools wheel twine`
更多工具，在 Python Packaging User Guide 中有详细介绍。

## 阅读[Python Packaging User Guide][ppug]
阅读
[Packaging Python Projects — Python Packaging User Guide](https://packaging.python.org/tutorials/packaging-projects/#packaging-python-projects)

我们发布出去的那个，叫做 package。
[ppug]: https://packaging.python.org/

接着阅读
[Packaging namespace packages — Python Packaging User Guide](https://packaging.python.org/guides/packaging-namespace-packages/)
[Documentation — setuptools 50.3.2 documentation](https://setuptools.readthedocs.io/en/latest/)
[Creating and discovering plugins — Python Packaging User Guide](https://packaging.python.org/guides/creating-and-discovering-plugins/)
## 我该如何？
### 给包起个名字？
这话题比较复杂，这里给出几个简单的小技巧:

- check the Python Packaging Index to see if the name is already in use
- check popular hosting sites like GitHub, Bitbucket, etc to see if there is already a project with that name
- check what comes up in a web search for the name you’re considering
- avoid particularly common words, especially ones with multiple meanings, as they can make it difficult for users to find your software when searching for it
# 虚拟环境
虚拟环境相关工具：
pipenv, virtualenv, venv, virtualenvwrapper

pyvenv 是 python 3.3 和 3.4 推荐使用的虚拟环境管理工具，但自 python 3.5 开始推荐 venv
venv 是自 python 3.3 开始内置的虚拟环境管理工具（比较简单的）。
# AssertionError: Multiple .dist-info directories:

venv 创建 python 3.8 虚拟环境，pip 版本默认为 19.2.3，需要升级为最新版
执行 `py -m pip install --upgrade pip`报错：
> AssertionError: Multiple .dist-info directories: G:\venvs\learn-tensorflow\Lib\site-packages\pip-20.1.1.dist-info, G:\venvs\learn-tensorflow\Lib\site-packages\pip-19.2.3.dist-info

删除该特定软件包的相关pip构建目录，然后尝试重新安装。
`pip config list`可以查看构建目录；`global.build='H:\\cache\\pip-build'`
进去，删掉pip下的所有内容即可。
原因是如果这里面有多个 pip版本编译缓存，pip 19.2.3 会把所有这些都算上。这是个bug。

`pip debug`列出相关配置文件信息。
# numpy和pandas

NumPy（Numerical Python）是Python的一种开源的数值计算扩展。
比Python自身的嵌套列表（nested list structure)结构要高效的多。
pandas 是基于NumPy 的一种工具，该工具是为了解决数据分析任务而创建的
numpy.org
www.numpy.org.cn
pandas.pydata.org
www.pypandas.cn
# web 开发框架
[2020年值得去了解的12个Python Web框架_Rocky的技术博客-CSDN博客](https://blog.csdn.net/y002j/article/details/103980642)

- 全功能型框架：
  Django应该是最流行的Python Web框架了，没有之一。而且其包含了创建应用需要的几乎
  全部功能，给人的感觉是这个框架希望框架本身实现各种功能，而不是依靠其他的库来完成。

- 轻量级框架
  目前为止，Flask是最流行的Python轻量级Web框架。这个框架是受到Sinatra Ruby的启发
  而开发出来的。 Flask基于Werkzeug WSGI toolkit以及 Jinja2 模板。

  Flask的目的是要建立一个非常稳定和可靠的Web应用的基础系统，我们可以使用Flack再加
  上各种插件，扩展和其他模块，能够构建功能强大的网站和应用。事实上，如果Django不
  适合的应用类型，使用Flask基本上是Python Web开发的默认选择。

  DJango 的目的是为了让开发者能够 快速 地开发一个网站。

  Django 最初被设计用于具有快速开发需求的新闻类站点，目的是要实现简单快捷的网站开发。
# python: yaml 文件配置日志
2022-01-03
[python之使用yaml文件配置logging日志 - 简书](https://www.jianshu.com/p/63ec4019b3d8)

# FAQ
## Q. 装饰器可以用在变量上吗？
不能
```py
def fun(arg):
    print('call:{}'.format(arg))
    return arg
@fun
def hello():pass
@fun
a=3 # SyntaxError: invalid syntax
```
## Q. 属性描述符可以用在模块中吗？
没有毛用。
```py
class Lazy:
    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, ins, owner=None):
        if self.name in ins.__dict__:
            return ins.__dict__[self.name]


    def __set__(self, ins, value):
        ins.__dict__[self.name] = value

a= Lazy()
a = 3
print(a)
```
## Q. python 启动时的路径
```py
import os
import sys

print(sys.argv)
print(os.getcwd())

```
```bat
F:\current\scripts\py-std>py demo\parse_fcasdb.py
['demo\\parse_fcasdb.py']
F:\current\scripts\py-std

F:\current\scripts\py-std>cd demo

F:\current\scripts\py-std\demo>py parse_fcasdb.py
['parse_fcasdb.py']
F:\current\scripts\py-std\demo

F:\current\scripts\py-std\demo>cd ..

F:\current\scripts\py-std>demo\parse_fcasdb.py
['F:\\current\\scripts\\py-std\\demo\\parse_fcasdb.py']
F:\current\scripts\py-std

F:\current\scripts\py-std>type demo\parse_fcasdb.py | py
['']
F:\current\scripts\py-std

F:\current\scripts\py-std>py < demo\parse_fcasdb.py
['']
F:\current\scripts\py-std

REM 加上这两行
print(__file__)
print(os.path.realpath(__file__))

F:\current\scripts\py-std>py demo\parse_fcasdb.py
['demo\\parse_fcasdb.py']
F:\current\scripts\py-std
demo\parse_fcasdb.py
F:\work\04-dw\local\scripts\py-std\demo\parse_fcasdb.py
```
# Q&A
## 1. new和init的用途的区别？或者说，有init了，还有必要定义new吗？
廖雪峰教程，对于元类，是重载了new，用init可以吗？

首先，new被调用的时机是在实例创建之前，而 init 是在实例创建之后。
其次，我们拦截到new之后，无法创建实例，是需要把实例创建的工作最终委托给Python的语言机制的。
在new中，我们可以修改创建实例所用的参数，而在init中，就办不到。

```py
class ListMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)

class MyList(list, metaclass=ListMetaclass):
    pass

```
```py

```
## 2. 在`__new__`和`__init__`中的super()得到的结果是一样的吗？
1. new 是静态方法，init是实例方法，

## 3. object.__new__() 和 A.__new__()？……
特殊方法`__new__`是类的静态方法（如果定义了的话）。


```py
def A:
    def __new__(cls[, ...]):
        return super().__new__(cls[, ...])
    def __init__(self [, args]):
        super().__init__([args...])
```
## 4. 属性访问：先有鸡还是先有蛋？
1. 在类中，重载`__getattribute__()`方法可以拦截属性访问操作，但`__getattribute__`本身也是
对象的属性，Python 是如何获得对象的 `__getattribute__`方法的？
2.
## 5. `__dict__` 属性中有以`__dict__`为键的元素吗？

对象的属性保存在它的`__dict__`属性中，那么`__dict__`本身在`__dict__`中吗？
类和实例的属性查找是通过对它的名字空间字典（`__dict__`属性）搜索实现的，但取得`__dict__`属性
是怎么实现的？如果也是搜索`__dict__`，那不就无穷递归了吗？

```py
>>> class A:pass
...
>>> A.__dict__
mappingproxy({'__module__': '__main__', '__dict__': <attribute '__dict__' of 'A' objects>, '__weakref__': <attribute '__weakref__' of 'A' objects>, '__doc__': None})
>>> dir(A)
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__']
>>> a = A()
>>> a.__dict__
{}
>>> dir(a)
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__']
>>> a.__dict__['__dict__']
  File "<stdin>", line 1, in <module>
KeyError: '__dict__'
```
## 6. 元类为什么是type的子类呢？
一个原因是：子类的元类，必须得是父类所属元类的子类。
比如，这个代码会报错：
```py
class M2:name='M2'
class P:name='P'
class S(P,metaclass=M2):age=1
```
TypeError: metaclass conflict: the metaclass of a derived class must be a (non-strict) subclass of the metaclasses of all its bases


# TO
`type.__new__`创建的类，它的的`__dict__`属性被替换成了一个只读的dict代理：
下面这段代码中，C是一个类

```py
>>> C.__dict__['y']=32
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'mappingproxy' object does not support item assignment
>>> C.y=32
>>> ^Z
```
# vsocde 自定义模块路径跳转问题
2022-02-28

[彻底解决VScode中采用python import自定义模块显示unresolved import 问题 和 无法跳转到自定义模块函数定义](https://blog.csdn.net/fdd096030079/article/details/107763444)

1. 在项目根目录下创建文件 .vscode/launch.json，如果有就直接使用。
2. 编辑 lanunch.json，添加如下的 configurations.env 和 configuration.envFile 两个字段。
```json
{
    "configurations": [
        {
            "name": "Python: Current File",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "env": {
                "PYTHONPATH":"${workspaceFolder}/src/main/py"
            },
            "envFile":"${workspaceFolder}/.env"
        }
    ]
}
```
3. 在项目根目录下创建 .env 文件，写入一行：`PYTHONPATH=./src/main/py`
4. 这里，./src/main/py 就是自定义模块所在路径，相对路径是相对于模块根目录的。

另外，可能需要安装插件 Python extension for Visual Studio Code
