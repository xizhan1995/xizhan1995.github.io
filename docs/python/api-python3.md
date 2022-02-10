python 3.8.2
# 内置函数(字典序)
## callable(fun)
如果可调用，返回True；如果不可调用，返回false。
注：即使返回True，调用仍可能失败；但返回False，一定不可能调用成功。
注：类是可调用的，调用类将创建新实例；类实例也是可调用的，如果它的类定义了 `__call__`方法。
## enumerate

## filter(function, iterable)
filter(function, iterable) 等价于
1.  (item for item in iterable if function(item)),  当 function 不是 None 时
2.  (item for item in iterable),                    当 function 是None 时

filter 保留的是满足条件的元素，啊哈。
## globals()
返回一个字典，它代表了当前模块的全局符号表。

> Return a dictionary representing the current global symbol table. This is
> always the dictionary of the current module (inside a function or method,
> this is the module where it is defined, not the module from which it is called).
## map(function, iterable, ...)

Return an iterator that applies function to every item of iterable, yielding the results. If additional iterable arguments are passed, function must take that many arguments and is applied to the items from all iterables in parallel. With multiple iterables, the iterator stops when the shortest iterable is exhausted. For cases where the function inputs are already arranged into argument tuples, see itertools.starmap().

`map(function:[v:T]->U, iterable[T]) -> Iterable[U]`
`map(function:[v:T, v2:T2]->U,U2, iterable[T, T2]) -> Iterable[U, U2]`

map/reduce/filter 都是把函数应用到迭代对象上，所以函数是第一个参数。

## max/min()
max(iterable, *[, key, default])
max(arg1, arg2, *args[, key])

key：是一个函数，对每个元素，函数应当返回与之对应的用于比较的 key

获取年龄最大的人：`max(person_lst, key = lambda p: p.age)`
## sorted(iterable, *, key=None, reverse=False)
- 默认升序
- 是稳定排序算法
## property()
```py
class C:
    def __init__(self):
        self._x = None

    def getx(self):
        return self._x

    def setx(self, value):
        self._x = value

    def delx(self):
        del self._x

    x = property(getx, setx, delx, "I'm the 'x' property.")
# 上面的代码完全等价与如下代码：
class C:
    def __init__(self):
        self._x = None

    @property
    def x(self):
        """I'm the 'x' property."""
        return self._x

    @x.setter
    def x(self, value):
        self._x = value

    @x.deleter
    def x(self):
        del self._x

c.x = 3
c.x
```
## classmethod()
## super([type[, object-or-type]])

For example, if `__mro__` of object-or-type is D -> B -> C -> A -> object and the value of type is B, then super() searches C -> A -> object.

> If the second argument is omitted, the super object returned is unbound.
> If the second argument is an object, isinstance(obj, type) must be true.
> If the second argument is a type, issubclass(type2, type) must be true (this is useful for classmethods).

```py
class A:pass

class B(A):
    def __init__(self):
        super().__init__()
        # 等价于 super(B, self).__init__()

```

super()不止可用来查找方法，还可用于属性查找。
> In addition to method lookups, super() also works for attribute lookups. One possible use case for this is calling descriptors in a parent or sibling class.

除了无参形式，super() 可以在方法之外使用。
Q. 两个参数的我知道，但是一个参数的，如果在方法外使用，super() 是如何确定mro顺序的？

> Also note that, aside from the zero argument form, super() is not limited to use inside methods. The two argument form specifies the arguments exactly and makes the appropriate references. The zero argument form only works inside a class definition, as the compiler fills in the necessary details to correctly retrieve the class being defined, as well as accessing the current instance for ordinary methods.
## zip()
## type
```py
class X:
    a = 1

X = type('X', (object,), dict(a=1))
x = X()
```
# 内置类型
## 字典
```py
# 构造器
class dict(**kwarg)
class dict(mapping, **kwarg)
class dict(iterable, **kwarg)
# 其中，iterable 的每个元素必须是二元组/序列

list(d)     返回 d 的 key 构成的列表
len(d)      键值对的个数
d[key]      返回 key 对应的值。不存在 key 则抛出 KeyError。
d[key] = value  Set d[key] to value.
del d[key]  删除键值对。KeyError
key in d
key not in d
iter(d)     iter(d.keys())  返回可迭代对象，迭代d的所有key
clear()     清空字典
copy()      复制字典
get(key, default = None)     此方法绝不抛异常

pop(key, default=None)  删除并返回key对应的值
popitem()   删除并返回键值对 (key, value)，LIFO顺序(自3.7开始）。字典为空时，抛出 KeyError.
            Q. 字典序怎么来的？
reversed(d) 简写：reversed(d.keys())
setdefault(key, default = None)  如果key存在，返回它的值。如果不存在，设置 d[key] = default, 并返回default。
update([other]) 用其它字典的键值对更新当前字典。返回None。

# 视图对象 keys（）, values（）, items（）, 返回的都是视图对象，支持如下操作：
len(dictview)
iter(dictview)
x in dictview
reversed(dictview)
```

注：d[key] 和 `__missing__()`
> If a subclass of dict defines a method `__missing__()` and key is not present, the d[key] operation calls that method with the key key as argument. The d[key] operation then returns or raises whatever is returned or raised by the `__missing__(key)` call. No other operations or methods invoke `__missing__()`. If `__missing__()` is not defined, KeyError is raised. `__missing__()` must be a method; it cannot be an instance variable:

```py
class Counter(dict):
    def __missing__(self, key):
        return 0
c = Counter()
c['red']

c['red'] += 1
c['red']
```
# 内置类型 - str
## str.rsplit(sep=None, maxsplit=-1)

Return a list of the words in the string, using sep as the delimiter string. If maxsplit is given, at most maxsplit splits are done, the rightmost ones. If sep is not specified or None, any whitespace string is a separator. Except for splitting from the right, rsplit() behaves like split() which is described in detail below.
## str.split(sep=None, maxsplit=-1)
- 按给定子串分隔（而不是字串的任意字符分隔）
- maxsplit 省略或为 -1 时，不限分割次数
- 连续出现的 sep 会产生空串；开头和结尾的sep会产生空串；对空串分隔会得到一个空串
- 省略 sep 或设置为 None，行为有不同：连续的空白不产生空串，开头结尾的空白不产生空串；ps：对空串分隔得到空列表。

Return a list of the words in the string, using sep as the delimiter string. If maxsplit is given, at most maxsplit splits are done (thus, the list will have at most maxsplit+1 elements). If maxsplit is not specified or -1, then there is no limit on the number of splits (all possible splits are made).

If sep is given, consecutive delimiters are not grouped together and are deemed to delimit empty strings (for example, '1,,2'.split(',') returns ['1', '', '2']). The sep argument may consist of multiple characters (for example, '1<>2<>3'.split('<>') returns ['1', '2', '3']). Splitting an empty string with a specified separator returns [''].
For example:
```py
>>> '1,2,3'.split(',')
['1', '2', '3']
>>> '1,2,3'.split(',', maxsplit=1)
['1', '2,3']
>>> '1,2,,3,'.split(',')
['1', '2', '', '3', '']
```
If sep is not specified or is None, a different splitting algorithm is applied: runs of consecutive whitespace are regarded as a single separator, and the result will contain no empty strings at the start or end if the string has leading or trailing whitespace. Consequently, splitting an empty string or a string consisting of just whitespace with a None separator returns [].

For example:
```py
>>> '1 2 3'.split()
['1', '2', '3']
>>> '1 2 3'.split(maxsplit=1)
['1', '2 3']
>>> '   1   2   3   '.split()
['1', '2', '3']
```

## str.splitlines([keepends])
- 比 split() 能更好地自动识别换行
- 开头或结尾的换行不会产生空串
```py
>>> ''.split()
[]
>>> ''.split('abc')
['']
>>> '\n'.split()
[]
>>> 'a\n\n\n\n'.splitlines()
['a', '', '', '']
```
Return a list of the lines in the string, breaking at line boundaries. Line breaks are not included in the resulting list unless keepends is given and true.

This method splits on the following line boundaries. In particular, the boundaries are a superset of universal newlines.

Unlike split() when a delimiter string sep is given, this method returns an empty list for the empty string, and a terminal line break does not result in an extra line:

```py
>>> "".splitlines()
[]
>>> "One line\n".splitlines()
['One line']

```

For comparison, split('\n') gives:
```py
>>> ''.split('\n')
['']
>>> 'Two lines\n'.split('\n')
['Two lines', '']
```
## str.index/find(sub[, start[, end]])
find:找到返回开头坐标；找不到，返回 -1
index:找到返回开头坐标；找不到，抛出异常 ValueError

# argparse（命令行参数）
[argparse](https://docs.python.org/3/library/argparse.html)
命令行参数分位置参数（positional argument）和选项参数（optional argument）。
位置参数根据参数在命令行中的位置判定其含义，命令 `cp src dst` 中的 src 和 dst 就是位置参数。
选项参数则使用选项来指示参数的含义，命令 `ls -l dir_name` 中的 `-l` 就是选项参数。

`tar -v -t -f foo.tgz` 中的 -t 和 -f 都是选项参数，其中孤零零的那个 -t 和 -v 都叫开关参数，
因为它们后面不需要跟具体的参数值，它们用是否出现表示启用/关闭对应的功能。

## class argparse.ArgumentParser

此方法用于创建 ArgumentParser 类的实例。所有的方法参数都是关键字参数。一共 12 个。
- prog - The name of the program (default: sys.argv[0])
- usage - The string describing the program usage (default: generated from arguments added to parser)
- description - Text to display before the argument help (default: none)
- epilog - Text to display after the argument help (default: none)
- parents - A list of ArgumentParser objects whose arguments should also be included
- formatter_class - A class for customizing the help output
- prefix_chars - The set of characters that prefix optional arguments (default: ‘-‘)
- fromfile_prefix_chars - The set of characters that prefix files from which additional arguments should be read (default: None)
- argument_default - The global default value for arguments (default: None)
- conflict_handler - The strategy for resolving conflicting optionals (usually unnecessary)
- add_help - Add a -h/--help option to the parser (default: True)
- allow_abbrev - Allows long options to be abbreviated if the abbreviation is unambiguous. (default: True)

Changed in version 3.5: allow_abbrev parameter was added.
Changed in version 3.8: In previous versions, allow_abbrev also disabled grouping of short flags such as -vv to mean -v -v.

1. prog: 程序名字，默认是 sys.argv[0].
   任何时候，在help字符串中，用`%(prog)s`说明符可以用它。
   `parser.add_argument('--foo', help='foo of the %(prog)s program')`
    PS：不不不，默认会截取  sys.argv[0] 中的基本文件名加上扩展名，包括任何路径。
    ```py
        if prog is None:
            prog = _os.path.basename(_sys.argv[0])
    ```
2. usage: 帮助信息的usage那一行，默认从各个参数中提取信息。
   `usage='%(prog)s [options]'`
3. description: 帮助信息中，usage 下面那一片关于程序的功能描述。如果没有，就不输出。
   1. 这个很重要，一般的脚本都要提供这个参数
   2. 默认，输出的时候会自动折行，以便于匹配控制台的宽度。
4. epilog：在参数列表之后给出的描述信息。
5. parent：指定父解析器。有时候，多个解析器会有一些公共的参数，分别设置明显会重复，可以把这些公共参数提取到父解析其中。
   子解析器会搜集父解析器的参数定义合并到自身中。这个参数接受解析器构成的列表。
   ```py
    >>> parent_parser = argparse.ArgumentParser(add_help=False)
    >>> parent_parser.add_argument('--parent', type=int)
    >>> foo_parser = argparse.ArgumentParser(parents=[parent_parser])
   ```
   注：父解析器一般要同时设置add_help=False，否则子解析器中会看到有两个 -h/--help 选项
   注：父解析器一定要在设置完毕之后再传给子解析器。因为父解析器之后发生的变化（新增的参数）并不会自动更新到子解析器中
6.  formatter_class：更精细的帮助信息格式化控制
7.  prefix_chars: 可选参数默认使用 -f/--f 的格式，用 - 做前缀，如果要支持别的前缀字符，比如 +f，/f ，在此参数中指定。
   ```py
    parser = argparse.ArgumentParser(prog='PROG', prefix_chars='-+')
    parser.add_argument('+f')
    parser.add_argument('++bar')
    parser.parse_args('+f X ++bar Y'.split())
   ```
   注：此参数的默认值是 '-'， 如果新指定的前缀中不包含 -, 小心喽。
8.  fromfile_prefix_chars: 从文件中读取选项的引导符号。选项文件每个选项一行，要完整格式，不能省略选项前缀。
9.  argument_default: 解析器全局的参数默认值。argparse.SUPPRESS 是个特殊值，试试看。
10. allow_abbrev: 识别缩写（长选项的前缀匹配），默认开启。
    > The parse_args() method by default allows long options to be abbreviated to a prefix, if the abbreviation is
     unambiguous (the prefix matches a unique option):

## argparse.ArgumentParser.add_argument()
<https://docs.python.org/3/library/argparse.html#argparse.ArgumentParser.add_argument>

`ArgumentParser.add_argument(name or flags...[, action][, nargs][, const][, default][, type][, choices][, required][, help][, metavar][, dest])`

- name or flags - Either a name or a list of option strings, e.g. foo or -f, --foo.
- action - The basic type of action to be taken when this argument is encountered at the command line.
- nargs - The number of command-line arguments that should be consumed.
- const - A constant value required by some action and nargs selections.
- default - The value produced if the argument is absent from the command line.
- type - The type to which the command-line argument should be converted.
- choices - A container of the allowable values for the argument.
- required - Whether or not the command-line option may be omitted (optionals only).
- help - A brief description of what the argument does.
- metavar - A name for the argument in usage messages.
- dest - The name of the attribute to be added to the object returned by parse_args().

不论这些参数如何配合，每个参数总可以归结为 (name, value, dest) 三要素。（暂且这样理解）。
选项参数的name就是选项，value呢，默认是选项后的那一个值，通过nargs可以指定更复杂的数目约束，某些action也会影响value的取定。
（这些action包括：store_const,strore_true, store_false, help, version, append, appen_const, extend）
dest默认从选项推导：如果有长选项，则取第一个长选项（去掉--前缀，替换中间的-为_）。

1. name or flags: 这个很重要……
   > When parse_args() is called, optional arguments will be identified by the `-` prefix,
     and the remaining arguments will be assumed to be positional.

    不能混用可选参数和位置参数

    ```py
    >>> p.add_argument('--help', 'help', '-h', action='help')
    ValueError: invalid option string 'help': must start with a character '-'

    >>> p.add_argument( 'help', '-h', action='help')
    ValueError: invalid option string 'help': must start with a character '-'
    ```
2. action: ArgumentParser 对象将命令行参数与动作相关联，动作可以是任意操作，但大多时候只是向结果对象中添加一个属性。
   它指定如何处理命令行参数。支持的取值如下：
   store, store_const, store_true, store_false, count
   append, append_const, extend
   help, version,

   store_true, store_false, count, version, help 动作使得参数成为一个开关
   append, append_const, extend 使得参数成为一个列表
   store是个默认行为，生成一个属性参数。除非指定nargs

   - 'store':  保存参数值，这是默认行为. PS：可选参数的参数值默认是紧跟在它后面的那个参数，位置参数的参数值就是站在这个位置的参数。
   - 'store_const': 配合 const 参数使用。开关参数，出现此参数就在结果中存入参数并 const 指定的值。
     `parser.add_argument('--foo', action='store_const', const=42)`
   - 'store_true', 'store_false': 可以看成 store_const 的特例，const 为 True，False
   - 'append': 这把参数存储为list，当允许多次指定某一参数时，这个就很好用
        ```py
        >>> parser = argparse.ArgumentParser()
        >>> parser.add_argument('--foo', action='append')
        >>> parser.parse_args('--foo 1 --foo 2'.split())
        Namespace(foo=['1', '2'])
        ```
   - 'append_const'：
   - 'count'：统计开关参数出现的次数. 比如，衡量详细等级
     ```py
        >>> parser = argparse.ArgumentParser()
        >>> parser.add_argument('--verbose', '-v', action='count', default=0)
        >>> parser.parse_args(['-vvv'])
        Namespace(verbose=3)

     ```
     ```py
        parser = argparse.ArgumentParser()

        parser.add_argument('--verbose', '-v', action='count')

        print(parser.parse_args('--verbose'.split()));
        # Namespace(verbose=1)

        print(parser.parse_args('--verbose --verbose'.split()));
        # Namespace(verbose=2)

        print(parser.parse_args('--verbose --verbose -vv'.split()))
        # Namespace(verbose=4)

        print(parser.parse_args(''.split()));
        # Namespace(verbose=None)

        parser = argparse.ArgumentParser()

        parser.add_argument('--verbose', '-v', action='count', default=0)
        print(parser.parse_args(''.split()));
        # Namespace(verbose=0)
     ```
     - 可以指定为Action的任意子类。

   - 'help': 帮助信息
   - 'version'： 版本信息，需要 version 参数配合
   - 'extend'：列表，连续多个参数
   - append 和 extend 的区别: `-f 1 -f 2 -f 3` 这是 append；`-f 1 2 3`这是extend。
   - append, append_const, extend 和 nargs='*' 的区别
    ```py
        r'''append, append_const, extend 和 nargs = '+' 的区别
        '''
        pass
        p = argparse.ArgumentParser()

        p.add_argument('-f', action='append', type=str)
        p.add_argument('-b', action='append', type=str, dest='f')
        p.add_argument('-c', nargs='*')
        p.add_argument('-d', nargs='*', dest='c')


        args = p.parse_args('-f f1 -f f2 -b b1 -b b2 -c c1 c2 -d da db'.split())
        # Namespace(c=['da', 'db'], f=['f1', 'f2', 'b1', 'b2'])
        print(args)
    ```


   Q. 如果传入了不支持的值，即使不报错，
3. nargs:   一个动作对应几个参数。指定nargs之后，一切都不同了。
   - N     `parser.add_argument('--foo', nargs=2)` 'c --foo a b'  Namespace(bar=['c'], foo=['a', 'b']) 注：narg=1 将得到一个长为 1 的list，这不同于不指定此参数的默认行为
   - ?     需要同时指定default。提供参数则使用，省略则使用default的值，对于选项参数，完全省略是使用default，只提供选项，但省略选项值则使用const。

        ```py
        >>> parser = argparse.ArgumentParser()
        >>> parser.add_argument('--foo', nargs='?', const='c', default='d')
        >>> parser.add_argument('bar', nargs='?', default='d')
        >>> parser.parse_args(['XX', '--foo', 'YY'])
        Namespace(bar='XX', foo='YY')
        >>> parser.parse_args(['XX', '--foo'])
        Namespace(bar='XX', foo='c')
        >>> parser.parse_args([])
        Namespace(bar='d', foo='d')
        ```
        Q. 如果没有default会报错吗？没有const会报错吗？
        可用于构建“可以指定0或1个参数值的选项参数。ps：仅凭action，做不到这点。

   - *  零至多个参数。把参数存储为list。ps：显然对多个位置参数同时指定此取值是无意义的。
   - +  同*，但要求至少提供一个参数值，否则报错。
   - argparse.REMAINDER     剩余参数都收集为一个list。
   - 如果不指定这个参数，则参数个数取决于 action。Q.如果同时指定这二者，是否会冲突？

    ```py
    def dm03():
        r'''两个位置参数都指定nargs=+会如何?

        '''
        pass
        p = argparse.ArgumentParser()

        p.add_argument('foo', nargs='+', type=str)
        p.add_argument('bar', nargs='+')
        args = p.parse_args('a b c d e'.split())
        # Namespace(bar=['e'], foo=['a', 'b', 'c', 'd'])
        print(args)
    ```
4. const：
5. default：默认值
   - All optional arguments and some positional arguments may be omitted at the command line。如果省略（当然前提是参数不是必选的），则default生效。
     默认的default为None
   - 设置默认值并不影响参数的必选/非必选特性
   - 设置默认值并不影响参数的类型：用到默认值自然取默认值，有显式值则还是type指定的类型（默认字符串）
   - 如果指定的default值是字符串，则相当于从命令行读取的此参数，按type正常进行类型转换；否则忽略type参数（即不进行任何类型转换）
   - 特殊值：argparse.SUPPRESS，设为此值，则当命令行参数未出现时，这个参数不会添加任何属性。Q。默认不就是这样么？
    ```py
    >>> parser = argparse.ArgumentParser()
    >>> parser.add_argument('--foo', default=argparse.SUPPRESS)
    >>> parser.parse_args([])
    Namespace()
    >>> parser.parse_args(['--foo', '1'])
    Namespace(foo='1')
    ```
6. type：参数的类型约束。默认参数类型为字符串。
        - 特殊值 argparse.FileType，用于根据文件名自动生成文件对象。
            ```py
            >>> parser = argparse.ArgumentParser()
            >>> parser.add_argument('bar', type=argparse.FileType('w'))
            >>> parser.parse_args(['out.txt'])
            Namespace(bar=<_io.TextIOWrapper name='out.txt' encoding='UTF-8'>)
            ```
        - type可以接受任何可调用对象，这种可调用对象会收到一个字符串参数：
            ```py
                >>> def perfect_square(string):
                ...     value = int(string)
                ...     sqrt = math.sqrt(value)
                ...     if sqrt != int(sqrt):
                ...         msg = "%r is not a perfect square" % string
                ...         raise argparse.ArgumentTypeError(msg)
                ...     return value
                ...
                >>> parser = argparse.ArgumentParser(prog='PROG')
                >>> parser.add_argument('foo', type=perfect_square)
                >>> parser.parse_args(['9'])
                Namespace(foo=9)
                >>> parser.parse_args(['7'])
                usage: PROG [-h] foo
                PROG: error: argument foo: '7' is not a perfect square
            ```
        - ps:于是可以做任意的数据校验和类型转换。
        - ps：但如果只实现枚举类型，用choices更简洁。
7. choices：
        ```py
        >>> parser = argparse.ArgumentParser(prog='game.py')
        >>> parser.add_argument('move', choices=['rock', 'paper', 'scissors'])
        >>> parser.parse_args(['rock'])
        Namespace(move='rock')
        >>> parser.parse_args(['fire'])
        usage: game.py [-h] {rock,paper,scissors}
        game.py: error: argument move: invalid choice: 'fire' (choose from 'rock',
        'paper', 'scissors')
        ```
    注：type约束对choice中的值同样有效力。
9. required：指定当前参数是必须的。
   默认，位置参数是必须的，而选项参数(`-f, --foo`)的参数是可选的。但可以显式设置选项参数的必选/可选特性。
   PS：准确来说`-f`中的`-`是 prefix_chars 参数都标志选项参数，而并非只有`-`标志选项参数。
   PS：对位置参数，不可以指定required参数，否则会报错。即使指定 required=True也会报错。（用nargs达到此效果）
   注：把选项参数设置必须的，通常是不良好的形式，因为用户一般预期选项参数是可选地。所以尽量避免把选项参数设为必选类型。
   >  Required options are generally considered bad form because users expect options to be optional, and thus they should be avoided when possible.
10. help：针对当前参数的描述信息，-h --help 把这个字符串作为参数的帮助信息输出
    - 可以使用格式说明符，比如 `help='the bar to %(prog)s (default: %(default)s)'`
    - 用特殊值 argparse.SUPPRESS 表示列出帮助信息的时候不输出此参数。
11. metavar：输出帮助信息的时候，参数期望的输入值需要用某个东西表示，这个就是了。默认 metavar 取 dest 的值，位置参数直接用，
    可选参数则使用 dest 的大写格式。但如果指定了 metavar，都直接用，不会转成大写。
    ```py
    parser = argparse.ArgumentParser()
    parser.add_argument('--foo', metavar='YYY')
    parser.add_argument('bar', metavar='XXX')
    parser.parse_args('X --foo Y'.split())

    parser.print_help()
    ```
12. dest: 指定此参数对应的args的属性名。默认是这样算的
    - 对于位置参数，取 add_argument()的第一个参数
    - 对于可选参数，取第一个长格式参数，若无长格式参数则取第一个（短）格式参数，取到之后去除开头的'--'(或'-')，然后把剩余的-替换为_就得到最终的属性名。
    - 由使用者担保最终的属性名是合法标识符。

- 参数是否是必选：默认行为，required参数，nargs参数。

## ArgumentParser.parse_args(args=None, namespace=None)

args - List of strings to parse. The default is taken from sys.argv.
namespace - An object to take the attributes. The default is a new empty Namespace object.

## 其它工具
### 子命令 .add_subparsers()
一般直接调用此方法，无需传递任何参数，方法返回一个 action 对象，此对象有一个 add_parser() 方法，
每调用一次 add_parser()，就得到一个 ArgumentParser 实例，这就是子命令，正常操作它就行了。
add_parser()参数：命令的名称，以及任何 ArgumentParser 的参数。
```py
# create the top-level parser
parser = argparse.ArgumentParser(prog='PROG')
parser.add_argument('--foo', action='store_true', help='foo help')
subparsers = parser.add_subparsers(help='sub-command help')

# create the parser for the "a" command
parser_a = subparsers.add_parser('a', help='a help')
parser_a.add_argument('bar', type=int, help='bar help')

# create the parser for the "b" command
parser_b = subparsers.add_parser('b', help='b help')
parser_b.add_argument('--baz', choices='XYZ', help='baz help')

# parse some argument lists
parser.parse_args(['a', '12'])

parser.parse_args(['--foo', 'b', '--baz', 'Z'])

```

`parse_args()`方法返回的对象只会包含主解析器和命令行中选中的解析器中定义的参数。
所以 `parser.parse_args(['a', '12'])` 的返回值只包含主解析器和子命令a的参数。

> Note that the object returned by parse_args() will only contain attributes for the main parser and the subparser that was selected by the command line (and not any other subparsers). So in the example above, when the a command is specified, only the foo and bar attributes are present, and when the b command is specified, only the foo and baz attributes are present.

#### 帮助信息
Similarly, when a help message is requested from a subparser, only the help for that particular parser will be printed. The help message will not include parent parser or sibling parser messages. (A help message for each subparser command, however, can be given by supplying the help= argument to add_parser() as above.)

#### 子命令别名
add_parser() 还额外支持 aliases 命令，用于为子命令设置别名。
```py
parser = argparse.ArgumentParser()
subparsers = parser.add_subparsers()
checkout = subparsers.add_parser('checkout', aliases=['co'])
checkout.add_argument('foo')
parser.parse_args(['co', 'bar'])
```
#### 怎么知道选择的哪个命令呢？
一种特别有效的方法是配合 set_defaults() 方法使用。
ps：还记得吗？set_defaults() 用于在解析器级别设置默认值，它比命令行参数的优先级还要高。
```py
# sub-command functions
def foo(args):
    print(args.x * args.y)

def bar(args):
    print('((%s))' % args.z)

# create the top-level parser
parser = argparse.ArgumentParser()
subparsers = parser.add_subparsers()

# create the parser for the "foo" command
parser_foo = subparsers.add_parser('foo')
parser_foo.add_argument('-x', type=int, default=1)
parser_foo.add_argument('y', type=float)
parser_foo.set_defaults(func=foo)

# create the parser for the "bar" command
parser_bar = subparsers.add_parser('bar')
parser_bar.add_argument('z')
parser_bar.set_defaults(func=bar)

# parse the args and call whatever function was selected
args = parser.parse_args('foo 1 -x 2'.split())
args.func(args)


# parse the args and call whatever function was selected
args = parser.parse_args('bar XYZYX'.split())
args.func(args)
```
#### add_subparsers() 方法的参数
```
title - title for the sub-parser group in help output; by default “subcommands” if description is provided, otherwise uses title for positional arguments

description - description for the sub-parser group in help output, by default None

prog - usage information that will be displayed with sub-command help, by default the name of the program and any positional arguments before the subparser argument

parser_class - class which will be used to create sub-parser instances, by default the class of the current parser (e.g. ArgumentParser)

action - the basic type of action to be taken when this argument is encountered at the command line

dest - name of the attribute under which sub-command name will be stored; by default None and no value is stored

required - Whether or not a subcommand must be provided, by default False (added in 3.7)

help - help for sub-parser group in help output, by default None

metavar - string presenting available sub-commands in help; by default it is None and presents sub-commands in form {cmd1, cmd2, ..}

```
# configparser 读取 .ini 配置文件
## 快速开始
非常简单的ini文件示例：
```ini
[DEFAULT]
ServerAliveInterval = 45
Compression = yes
CompressionLevel = 9
ForwardX11 = yes

[bitbucket.org]
User = hg

[topsecret.server.com]
Port = 50022
ForwardX11 = no
```
方括号把配置文件分为若干节（section），每个节内都是键值对。
唯一特别的是DEFAULT小节，它为其它所有节中的同名key设定默认值。

手动创建config，保存至文件：
```py
>>> import configparser
>>> config = configparser.ConfigParser()
>>> config['DEFAULT'] = {'ServerAliveInterval': '45',
...                      'Compression': 'yes',
...                      'CompressionLevel': '9'}
>>> config['bitbucket.org'] = {}
>>> config['bitbucket.org']['User'] = 'hg'
>>> config['topsecret.server.com'] = {}
>>> topsecret = config['topsecret.server.com']
>>> topsecret['Port'] = '50022'     # mutates the parser
>>> topsecret['ForwardX11'] = 'no'  # same here
>>> config['DEFAULT']['ForwardX11'] = 'yes'
>>> with open('example.ini', 'w') as configfile:
...   config.write(configfile)
...
```
ConfigParser 对象代表整个配置文件，它可以近似看作字典，每个键对应的值都是一个
configparser.SectionProxy 对象, 对应当前section下的所有键值对。

从文件加载config
```py
>>> config = configparser.ConfigParser()
>>> config.sections()
[]
>>> config.read('example.ini')
['example.ini']
>>> config.sections()
['bitbucket.org', 'topsecret.server.com']
>>> 'bitbucket.org' in config
True
>>> 'bytebong.com' in config
False
>>> config['bitbucket.org']['User']
'hg'
>>> config['DEFAULT']['Compression']
'yes'
>>> topsecret = config['topsecret.server.com']
>>> topsecret['ForwardX11']
'no'
>>> topsecret['Port']
'50022'
>>> for key in config['bitbucket.org']:
...     print(key)
user
compressionlevel
serveraliveinterval
compression
forwardx11
>>> config['bitbucket.org']['ForwardX11']
'yes'
```
## 数据类型
ConfigParser 不做任何数据类型转换，一律是字符串。
## 默认值
## ini 文件结构
1. 配置文件 section 构成，每个section由头[section]和随后的键值对构成。
2. 头的名字是大小写敏感的，而键值对的则不敏感。
3. 键值对之间以等号或冒号分隔，键值对首尾的空格无所谓，会被忽略（但中间的空格会保留哦）。
    值可以省略（此时作为分隔符的等号或冒号也可以省略）。而且键和小节都可以包含句点。
4. 井号或分号标志单行注释，注释可以独占一行，也可以是行末。
## MappingProxy
ConfigParser 和 SectionProxy 都可以按照 dict 的方式操作。
每个section中，可以用不区分大小写的方式访问它的key。

# dataclass 模块

[](https://www.cnblogs.com/mapu/p/9340818.html)

## 引入dataclass的理念
Python 想简单的定义一种容器，支持通过的对象属性进行访问。在这方面已经有很多尝试了：

- 标准库的 collections.namedtuple
- 标准库的 typing.NamedTuple
- 著名的 attr 库
各种 Snippet，问题和回答等。那么为什么还需要 dataclass 呢？主要的好处有：

- 没有使用 BaseClass 或者 metaclass，不会影响代码的继承关系。被装饰的类依然是一个普通的类
- 使用类的 Fields 类型注解，用原生的方法支持类型检查，
    不侵入代码，不像 attr 这种库对代码有侵入性（要用 attr 的函数将一些东西处理）
- dataclass 并不是要取代这些库，作为标准库的 dataclass 只是提供了一种更加方便使用的途径来定义 Data Class。
    以上这些库有不同的 feature，依然有存在的意义。

# datetime模块

有如下类：datetime,timedelta,tzinfo, date,time,timezone

继承关系：
```
object
    timedelta
    tzinfo
        timezone
    time
    date
        datetime
```
date 的属性：year,month,day
time 的属性：hour,minute,second,microsecond, tzinfo
datetime 的属性：date和time的组合：year,month,day,hour,minute,second,microsecond, tzinfo

datetime和time有时区问题，如果有具体的时区信息，则就是aware的，否则就是naive的。有时区信息才能真正标识时间，但是没有时区
信息的更容易理解。没有时区信息则它对应的具体时刻完全由程序解释，就像C语言中的数值100可以解释为重量也可以解释为里程。
datetime（或time）对象d是aware的，iff 1. d.tzinfo is not None 且 2. d.tzinfo.utcoffset(d) is not None

年月日的取值范围
```
datetime.MINYEAR <= year <= datetime.MAXYEAR （当前是 1和9999）。
1 <= month <= 12
1 <= day <= number of days in the given month and year
```
时分秒、毫秒的取值范围：
```
0 <= hour < 24,
0 <= minute < 60,
0 <= second < 60,
0 <= microsecond < 1000000,
```
## datetime.datetime
### class datetime.datetime(year, month, day, hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)
# io 模块
2020年9月21日
[io](http://docs.localhost/python-3.8.3/library/io.html)

Python 中，I/O分为三类：text I/O, binary I/O, raw I/O.
如果某个对象可以归类于上述三类 I/O 之一，则它就可以被称为 file object。
> The io module provides Python’s main facilities for dealing with various types of I/O. There are three main types of I/O: text I/O, binary I/O and raw I/O. These are generic categories, and various backing stores can be used for each of them. A concrete object belonging to any of these categories is called a file object. Other common terms are stream and file-like object.

所有类型的io流都区分所操作的数据类型，比如，给二进制流的write()方法传入字符串，会抛出 TypeError，
应该传入 bytes 对象。
> All streams are careful about the type of data you give to them. For example giving a str object to the write() method of a binary stream will raise a TypeError. So will giving a bytes object to the write() method of a text stream.

IO可以是只读的、只写的、可读写的。
IO可以是支持随机访问的，也可以是支持顺序处理的。

## Text I/O
文本io针对str进行操作。编码转换、换行符处理都是透明的。

open()函数是创建文本io最简单的途径（指定编码是可选的）：
```py
f = open("myfile.txt", "r", encoding="utf-8")
```
用 StringIO 可以创建内存文本IO：
```py
f = io.StringIO("some initial text data")
```

它对应TextIOBase
## Binary I/O
二进制IO也叫缓冲IO，它操作 bytes 对象或 bytes-like。
二进制IO不进行任何编码转换和换行符处理。
此类IO可用于处理任何非文本数据。当然，也可以配以手工控制处理文本数据。
```py
# open()函数也可以创建二进制io，指定 b 模式
f = open("myfile.jpg", "rb")
# 二进制内存io
f = io.BytesIO(b"some initial binary data: \x00\x01")
```
它对应 BufferedIOBase。
## raw I/O
原生IO也叫做无缓冲IO，一般用作构造二进制IO和文本IO的基础，
很少直接操作原生IO，但无论如何，可以创建原生IO对象：
`f = open("myfile.jpg", "rb", buffering=0)`

它对应 RawIOBase.
## High-level Module Interface

- io.DEFAULT_BUFFER_SIZE：缓冲io的默认缓冲大小

    An int containing the default buffer size used by the module’s buffered I/O classes. open() uses the file’s blksize (as obtained by os.stat()) if possible.

-  io.open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)

    This is an alias for the builtin open() function.

-  io.open_code(path)：Opens the provided file with mode 'rb'.
    用于打开可执行文件
    This function should be used when the intent is to treat the contents as executable code.
- exception io.BlockingIOError

    This is a compatibility alias for the builtin BlockingIOError exception.

- exception io.UnsupportedOperation

    An exception inheriting OSError and ValueError that is raised when an unsupported operation is called on a stream.
### 内存流

StringIO和ByteIO都是可读、可写、可随机访问的。

It is also possible to use a str or bytes-like object as a file for both reading and writing. For strings StringIO can be used like a file opened in text mode. BytesIO can be used like a file opened in binary mode. Both provide full read-write capabilities with random access.


sys: contains the standard IO streams: sys.stdin, sys.stdout, and sys.stderr.
## Class hierarchy
Python 把IO流的实现组织为有继承关系的类。

最顶层的是抽象类 IOBase，它定义了所有流的共有操作。（它不区分读、写操作）。
当实现类(子类）不支持某个具体操作时，可以报告 UnsupportedOperation 异常。

抽象类 RawIoBase 继承 IOBase，它提供流的 bytes 读写操作。
之后是FileIO继承 RawIOBase，它提供文件操作接口。
> The RawIOBase ABC extends IOBase. It deals with the reading and writing of bytes to a stream. FileIO subclasses RawIOBase to provide an interface to files in the machine’s file system.

再往下一层，是BufferedIOBase类，它在 RawIOBase 的基础上提供缓冲操作。
The BufferedIOBase ABC deals with buffering on a raw byte stream (RawIOBase). Its subclasses, BufferedWriter, BufferedReader, and BufferedRWPair buffer streams that are readable, writable, and both readable and writable. BufferedRandom provides a buffered interface to random access streams. Another BufferedIOBase subclass, BytesIO, is a stream of in-memory bytes.

TextIOBase是IOBase的另一个子类。
The TextIOBase ABC, another subclass of IOBase, deals with streams whose bytes represent text, and handles encoding and decoding to and from strings. TextIOWrapper, which extends it, is a buffered text interface to a buffered raw stream (BufferedIOBase). Finally, StringIO is an in-memory stream for text.

Argument names are not part of the specification, and only the arguments of open() are intended to be used as keyword arguments.

接口概览：
The following table summarizes the ABCs provided by the io module:
```
ABC         Inherits        Stub Methods                Mixin Methods and Properties

IOBase                  fileno, seek, and truncate      close, closed, __enter__, __exit__,
                                                        flush, isatty, __iter__, __next__, readable,
                                                        readline, readlines, seekable, tell, writable,
                                                        and writelines

RawIOBase   IOBase      readinto and write              Inherited IOBase methods, read, and readall

BufferedIOBase IOBase   detach, read, read1, and write  Inherited IOBase methods, readinto, and readinto1

TextIOBase  IOBase    detach, read, readline, and write   Inherited IOBase methods, encoding, errors,
                                                                and newlines
```
### I/O Base Classes

读
- readable()

    Return True if the stream can be read from. If False, read() will raise OSError.

- readline(size=-1)

    Read and return one line from the stream. If size is specified, at most size bytes will be read.

    The line terminator is always b'\n' for binary files;
    for text files, the newline argument to open() can be used to select the line
    terminator(s) recognized.

- readlines(hint=-1)：特别指出，for line in file 可以直接逐行遍历文件

    Read and return a list of lines from the stream. hint can be specified to control the number of lines read: no more lines will be read if the total size (in bytes/characters) of all lines so far exceeds hint.

    Note that it’s already possible to iterate on file objects using `for line in file`: ... without calling file.readlines().

写：

- writable()

    Return True if the stream supports writing. If False, write() and truncate() will raise OSError.

- writelines(lines)

    Write a list of lines to the stream. Line separators are not added, so it is usual for each of the lines provided to have a line separator at the end.


- truncate(size=None)：把文件设置为指定的大小。

    Resize the stream to the given size in bytes (or the current position if size is not specified). The current stream position isn’t changed. This resizing can extend or reduce the current file size. In case of extension, the contents of the new file area depend on the platform (on most systems, additional bytes are zero-filled). The new file size is returned.

    Changed in version 3.5: Windows will now zero-fill files when extending.

### class io.RawIOBase
有字节读写方法：read(size_in_bytes=-1), readall(), write(b)

read(size=-1)：读取只当字节数，省略或指定-1，表示全部读取。已经到达文件尾，返回0字节，但对于非阻塞IO，此时返回None

    Read up to size bytes from the object and return them. As a convenience, if size is unspecified or -1, all bytes until EOF are returned. Otherwise, only one system call is ever made. Fewer than size bytes may be returned if the operating system call returns fewer than size bytes.

    If 0 bytes are returned, and size was not 0, this indicates end of file. If the object is in non-blocking mode and no bytes are available, None is returned.

    The default implementation defers to readall() and readinto().

readall()：读取全部内容并返回。

    Read and return all the bytes from the stream until EOF, using multiple calls to the stream if necessary.

readinto(b)

    Read bytes into a pre-allocated, writable bytes-like object b, and return the number of bytes read. For example, b might be a bytearray. If the object is in non-blocking mode and no bytes are available, None is returned.

write(b): 返回实际写入的字节数。

    Write the given bytes-like object, b, to the underlying raw stream, and return the number of bytes written. This can be less than the length of b in bytes, depending on specifics of the underlying raw stream, and especially if it is in non-blocking mode. None is returned if the raw stream is set not to block and no single byte could be readily written to it. The caller may release or mutate b after this method returns, so the implementation should only access b during the method call.
### TextIO
#### io.TextIOBase

- read(size=-1)

    Read and return at most size characters from the stream as a single str. If size is negative or None, reads until EOF.

- readline(size=-1)

    Read until newline or EOF and return a single str. If the stream is already at EOF, an empty string is returned.

    If size is specified, at most size characters will be read.

- write(s)：写入字符串，并返回实际写入的字符数。

    Write the string s to the stream and return the number of characters written.

# logging(日志)
https://docs.python.org/3/library/logging.html#logrecord-attributes

[参考](./note-python3-basic.md)
预定义日志级别常量：logging.DEBUG/INFO/WARNING/ERROR/CRITICAL
其中，WARNING的前身是WARN，但WARN已过时，CRITICAL的前身是FATAL，但FATAL也已过时。
预定义日志级别方法：Logger.debug/info/warning/error/critical() 正好与预定义日志级别一一对应
其中，warning的前身是warn，但warn方法已过时；critical的前身是fatal，（ps：fatal没有过时）

这个模块的函数、类、方法都是使用的 camelCase 命名风格。

日志器根据名字构成单根的树结构。树的根是 '' 或者叫'root'。
日志器的有效级别是它的显式设置的日志级别，如果没有则沿树结构向上查找，直到遇到显式指定级别的日志器。
根日志器默认显式指定级别为 logging.WARNING。
```py
>>> import logging
>>> root = loggign.getLogger()
>>> root = logging.getLogger()
>>> root.level
30
>>> root.getEffectiveLevel()
30
>>> logging.getLevelName(root.level)
'WARNING'
```

默认，根日器志级别为warning，没有filter，没有handler。
如果某个日志事件通过了过滤条件但最后没有找到handler，则使用默认handler和formatter：logging.lastResort，
它级别为WARNING，格式是'%(message)s',输出到 std.err.

basicConfig()的默认行为是：
为root日志器添加一个处理器，其级别是0，格式是 '%(levelname)s:%(logname)s:%(message)s'。

handler默认的级别是NOSET，即任何级别的日志都可以通过。
formatter的默认格式是'%(message)s'

ps: 可能需要看一下 warning 模块。

## logging.Logger
propagate
setLevel(level)
isEnabledFor(level)
getEffectLevel()
addFilter(filter)
removeFilter(filter)
addHandler(handler)
removeHandler(handler)
hasHandlers()

name/level/handlers/filters
## class logging.Formatter(fmt=None, datefmt=None, style='%')
# re模块（正则表达式）
1. 方法 match/search,split,findall,finditer

2.
`m = re.xxx(r'正则表达式', '字符串')`
等价于
```
p = re.compile(r'正则表达式')
m = p.xxx('字符串')
```
3. Match 对象
group(index...), groups()
`__get_item__(index)`

类似字典和列表，支持数值下标和字符串下标。

## match方法，和Match对象
1， 有匹配则返回Match对象，否则返回None

```py
>>> m = re.match(r'(\d+)-(\d+)','12-23')
>>> m.groups()
('12', '23')
>>> m.group()
'12-23'
>>> m.group(1)
'12'
>>> m.group(2)
'23'
>>> m.group(3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: no such group
>>> m[1]
'12'

>>> m.group(1,2,1)
('12', '23', '12')
```
如果某个捕获组匹配了多次，则此捕获组只记录最后一个匹配。

命名捕获组。
```py
>>> m2 = re.match(r'(?P<fname>\w+) (?P<lname>\w+)', "Jack Chen")
>>> m2['fname']
'Jack'
>>> m2.group('lname')
'Chen'
>>> m2.group('fname',1)
('Jack', 'Jack')
```

search vs match：
re模块提供了两个基础的操作 match和search，前者从字符串的开头匹配，而search匹配字符串的任意位置。
```py
>>> re.match('c','abcdef')  # 匹配失败
>>> re.search('c','abcdef')
<re.Match object; span=(2, 3), match='c'>
```
ps: re.match('c', s) --> re.search(r'^c', s);

> Note however that in MULTILINE mode match() only matches at the beginning of the string, whereas using search() with a regular expression beginning with '^' will match at the beginning of each line.
```py
>>>
>>> re.match('X', 'A\nB\nX', re.MULTILINE)  # No match
>>> re.search('^X', 'A\nB\nX', re.MULTILINE)  # Match
<re.Match object; span=(4, 5), match='X'>
```

re.serach 相当于 js中的 RegExp.exec

## split()方法
re.split(ptn, s, maxsplit=0)

1. maxsplit >0，则返回的结果最多有 maxsplit+1项
2. 如果ptn分隔符在开头出现，则结果的第一项是一个空字符串；结尾亦如是。
3. 如果ptn中有捕获组，则一并出现在结果中
4. 两个相邻的ptn会分割出一个空字符串
5. 如果没有匹配的分隔符，则返回原字符串
6. 如果是对空字符串进行分隔，当ptn不匹配空串时返回字符串本身（即空串）构成的list；当ptn匹配空串时，则返回 [''. '']

ps: str.split() 和 此split的区别只有一点：str.split() 即省略分隔符的时候，以r'空白+'做分隔符，且结果列表的开头、结尾不含空字符串。
```py
>>> " hello ".split()
['hello']
>>> re.split(r'\s+', ' hello ')
['', 'hello', '']
>>>
```

python的split和javacript的split略有不同，区别在于分隔符为空串的时候：js会删除结果集中首尾的空字符串，而Python会报错
```py
>>> 'abc'.split('')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: empty separator
```

Python 的 str.split(sep), re.split(ptn, s), Js的String.split(sep)
对于 sep 不是空串，且不是空白时，1. 连续分隔符会产生空串，2. 开头结尾的分隔符会产生空串。

当 sep 是空白或设为None（省略，默认值就是None），Python 改变行为，相当于增加一步：结果集中的过滤掉空字符串。
但js和python的re.split() 都不会。

python 的 splitlines 比 split('换行') ，和split(None)相比，它只在最后过滤掉末尾的一个空白字符串，而不会过滤掉
所有的空白字符串。
```py
>>> '\nab\ncd\n\n\n'.splitlines()
['', 'ab', 'cd', '', '']
# 用split加指定换行分隔，不会过滤掉最末尾的那一个空白字符串。
>>> '\nab\ncd\n\n\n'.split('\n')
['', 'ab', 'cd', '', '', '']
# 但无参 split() 会把换行看作空白串切割
>>> '\nab\ncd\n\n\n'.split()
['ab', 'cd']
# 也就是说，手动指定空白字符，走正常切分的逻辑。只有Python自己的空白切割才会过滤掉空字符串。
>>> 'a   b  '.split(' ')
['a', '', '', 'b', '', '']

```
## findall(),finditer()
在match的基础上，返回所有匹配。

findall返回一个list，没有匹配项，则返回空list，有匹配项则返回所有匹配项，如果pattern中含有捕获组，则代之以返回所有捕获组（按顺序）。
```py
>>> re.findall(r'\d+', '1-2-3')
['1', '2', '3']
>>> re.findall(r'(\d+)', '1-2-3')
['1', '2', '3']
>>> re.findall(r'(\d+)-', '1-2-3')
['1', '2']
>>> re.findall(r'(\d+)\d', '112-223-334')
['11', '22', '33']
>>> re.findall(r'(\d+)\d', 'abcdefg')
[]
```
finditer() 返回迭代器，迭代元素是Matcher对象。找不到匹配项的时候，返回迭代器长度为0.

```py
>>> g1 = re.finditer(r'\d+', '1-2,3')
>>> list(g1)
[<re.Match object; span=(0, 1), match='1'>, <re.Match object; span=(2, 3), match='2'>, <re.Match object; span=(4, 5), match='3'>]
>>> list(g1)
[]
>>> g2 = re.finditer(r'(\d+)', '1-2,3')
>>> list(g2)
[<re.Match object; span=(0, 1), match='1'>, <re.Match object; span=(2, 3), match='2'>, <re.Match object; span=(4, 5), match='3'>]
>>> g3 = re.finditer(r'(\d+)\d', '111-222-333')
>>> list(g3)
[<re.Match object; span=(0, 3), match='111'>, <re.Match object; span=(4, 7), match='222'>, <re.Match object; span=(8, 11), match='333'>]
>>> g4 = re.finditer(r'(\d+)\d', 'abc')
>>> list(g4)
[]
```
## Pattern 对象

### Pattern.subn(repl, string, count=0)

    Identical to the subn() function, using the compiled pattern.

### Pattern.sub(repl, string, count=0)

    Identical to the sub() function, using the compiled pattern.

- re.sub(pattern, repl, string, count=0, flags=0)

> Return the string obtained by replacing the leftmost non-overlapping occurrences of pattern in string by the replacement repl. If the pattern isn’t found, string is returned unchanged. repl can be a string or a function; if it is a string, any backslash escapes in it are processed. That is, \n is converted to a single newline character, \r is converted to a carriage return, and so forth. Unknown escapes of ASCII letters are reserved for future use and treated as errors. Other unknown escapes such as \& are left alone. Backreferences, such as \6, are replaced with the substring matched by group 6 in the pattern.

## Match 对象
m.string
m.re
m.pos, m.endpos
m.lastindex, m.lastgroup    捕获组的最大下标，最后那个捕获组的名字。如果捕获则，则都返回None

m.group(0), group(1), group(0,1,2), group('first_name')
m[k] ==> m.group(k)
m.span([group]) ==> (m.start(group), m.end(group))
而 m.start/end(g=0) 返回的坐标满足：m.group(g) == m.string[m.start(g):m.end(g)]
# socket模块
[socket — Low-level networking interface — Python 3.8.3 documentation](http://docs.localhost/python-3.8.3/library/socket.html)
Q. BSD 套接字接口？
Q. AF_UNIX

此模块提供对 BSD 套接字接口(BSD socket interface)的访问。在 Unix、Windows、MacOS
系统上都可用。

注：某些行为可能随操作系统不同而有差异。
Note：Some behavior may be platform dependent, since calls are made to the operating system socket APIs.

这个 Python 库只是把套接字相关 Unix 系统调用和库接口简单“翻译”成 Python 的面向对象
风格的API：socket()函数返回socket对象，此对象以方法的形式实现了各种套接字系统调用。
参数类型相较于C接口更加“高级”一些：类似Python文件读写的read（）和write（）方法，
接受数据时自动分配缓冲区，发送数据时自动检测缓冲区长度。
> The Python interface is a straightforward transliteration of the Unix system call and library interface for sockets to Python’s object-oriented style: the socket() function returns a socket object whose methods implement the various socket system calls. Parameter types are somewhat higher-level than in the C interface: as with read() and write() operations on Python files, buffer allocation on receive operations is automatic, and buffer length is implicit on send operations.
```
See also

Module socketserver：   Classes that simplify writing network servers.
Module ssl：            A TLS/SSL wrapper for socket objects.
```
## 套接字族
Socket families
取决于系统和内置选项，此模块支持多种套接字族。

特定套接字对象对地址格式的要求取决于创建此套接字对象时选择的地址族。套接字地址格式如下：
> The address format required by a particular socket object is automatically selected based on the address family specified when the socket object was created. Socket addresses are represented as follows:
- AF_UNIX ...
- AF_INET 族要求格式：(host, port)
  其中 host 是一个字符串，对应域名或者ipv4地址，port 是一个整数。

  对于IPv4有两个特殊值，'' 代表 INADDR_ANY，表示用于绑定到所有网卡，'<broadcast>' 代表
  INADDR_BROADCAST. 但IPv6 不支持这一行为。
  > For IPv4 addresses, two special forms are accepted instead of a host address: '' represents INADDR_ANY, which is used to bind to all interfaces, and the string '<broadcast>' represents INADDR_BROADCAST. This behavior is not compatible with IPv6, therefore, you may want to avoid these if you intend to support IPv6 with your Python programs.
- AF_INET6 族格式： (host, port, flowinfo, scopeid)
  ……
- AF_NETLINK sockets are represented as pairs (pid, groups)
- AF_TIPC ……
- AF_CAN ……
- SYSPROTO_CONTROL ……
- AF_BLUETOOTH ……
- AF_ALG ……
- AF_VSOCK 格式 (CID, port)
    允许虚拟机和宿主机通信。
    其中容器ID（CID）和port都是整数。
    Availability: Linux >= 4.8 QEMU >= 2.8 ESX >= 4.0 ESX Workstation >= 6.5.
- AF_PACKET……
- AF_QIPCRTR……

## socket.socket(family=AF_INET, type=SOCK_STREAM, proto=0, fileno=None)
创建Socket时，AF_INET指定使用IPv4协议，如果要用更先进的IPv6，就指定为AF_INET6。SOCK_STREAM指定使用面向流的TCP协议

要创建一个基于TCP连接的Socket，可以这样做：
```py

# 导入socket库:
import socket

# 创建一个socket:
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 建立连接:
s.connect(('www.sina.com.cn', 80))
```
```py
```

## socket.connect(address)
地址格式取决于创建链接时使用的family参数。

## socket.accept()
Accept a connection. The socket must be bound to an address and listening for connections. The return value is a pair (conn, address) where conn is a new socket object usable to send and receive data on the connection, and address is the address bound to the socket on the other end of the connection.
没有说是否超时，但实验会受 settimeout() 的控制。

自 Python 3.5，这个方法会忽略中断信号。
按下Ctrl-C，底层的系统调用会抛出 EINT 错误，然而自 3.5 之后，Python 会自动重新发起
系统调用，省得上层代码添加处理这些中断的冗余代码。
> Changed in version 3.5: If the system call is interrupted and the signal handler does not raise an exception, the method now retries the system call instead of raising an InterruptedError exception (see PEP 475 for the rationale).
但我该怎么中断这个方法呢？
从信号处理器下手。signal 模块。
## socket.bind(address)

## Socket 对象
### socket.getpeername()
Return the remote address to which the socket is connected. This is useful to find out the port number of a remote IPv4/v6 socket, for instance. (The format of the address returned depends on the address family — see above.) On some systems this function is not supported.

对于ipv4，返回远程ip地址和端口构成的二元组：`('47.101.178.248', 80)`。
### socket.getsockname()
返回自己的地址。
```py
>>> s.getsockname()
('192.168.12.54', 5167)
```
###  socket.getblocking(): 判断当前套接字是否处于阻塞模式

Return True if socket is in blocking mode, False if in non-blocking.

This is equivalent to checking socket.gettimeout() == 0.
### socket.gettimeout()

Return the timeout in seconds (float) associated with socket operations, or None if no timeout is set. This reflects the last call to setblocking() or settimeout().

### socket.listen([backlog])

Enable a server to accept connections. If backlog is specified, it must be at least 0 (if it is lower, it is set to 0);
it specifies the number of unaccepted connections that the system will allow before refusing new connections.
If not specified, a default reasonable value is chosen.

Changed in version 3.5: The backlog parameter is now optional.
### socket.recv(bufsize[, flags])
从套接字读取数据。
返回值是一个bytes对象。
一次读取的数据的最大字节数由 bufsize 指定，默认为 0.

Receive data from the socket. The return value is a bytes object representing the data received. The maximum amount of data to be received at once is specified by bufsize. See the Unix manual page recv(2) for the meaning of the optional argument flags; it defaults to zero.

Note：For best match with hardware and network realities, the value of bufsize should be a relatively small power of 2, for example, 4096.
Changed in version 3.5: If the system call is interrupted and the signal handler does not raise an exception, the method now retries the system call instead of raising an InterruptedError exception (see PEP 475 for the rationale).
### socket.send(bytes[, flags])
发送数据，返回实际发送出去的字节数。

Send data to the socket. The socket must be connected to a remote socket. The optional flags argument has the same meaning as for recv() above. Returns the number of bytes sent. Applications are responsible for checking that all data has been sent; if only some of the data was transmitted, the application needs to attempt delivery of the remaining data. For further information on this topic, consult the Socket Programming HOWTO.

Changed in version 3.5: If the system call is interrupted and the signal handler does not raise an exception, the method now retries the system call instead of raising an InterruptedError exception (see PEP 475 for the rationale).
### socket.family/type/proto
```py
>>> s.family
<AddressFamily.AF_INET: 2>
>>> s.type
<SocketKind.SOCK_STREAM: 1>
>>> s.proto
0
```
# struct 模块
https://docs.python.org/3/library/struct.html#format-characters

格式指令,第一个字符代表着字节序,默认为@

@       =   <       >       !
native      大端    小端    网络(大端)

b   h   i/l   q     1,2,4,8字节的整数
B   H   I/L   Q     1,2,3,8字节的无符号整数
# os
https://docs.python.org/3/library/os

封装了操作系统特定的功能.

os.name     'nt', 'posix', 'java'       ps: sys.platform
            依赖操作系统的模块的名字。当前支持三个。
            > The name of the operating system dependent module imported.
os.environ  环境变量,一个mapping

os.chdir(path)  切换当前目录
os.getcwd()     获取当前目录

os.getenv(key, default=None)    比 os.environ[key] 更健壮
os.getlogin()   获取当前登录用户名
os.getpid()     进程id
os.getppid()

os.listdir(path='.')    列出目录, 一个list,如果path是二进制字符串,则每个元素是二进制字符串,其它情况下都是str.

os.mkdir(dir)
os.mkdirs(dir)

os.remove(path_to_file) 删除文件,如果是目录,则抛出 IsADirectoryError
os.rmdir(path)          删除目录, 不存在则抛出 FileNotFoundError, 如果目录非空,则抛出 OSError. 删除目录树使用 shutil.rmtree()

os.scandir(path='.')    返回迭代器, 每个迭代元素是 os.DirEntry
# os.path

## os.path.isdir(path): 返回True，当且仅当指定路径存在且是目录

Return True if path is an existing directory. This follows symbolic links, so
both islink() and isdir() can be true for the same path.

## os.path.normpath(path)：把路径转换为规范的路径名。纯词法操作。
如果中间有符号链接，可能会得出错误结果。

Normalize a pathname by collapsing redundant separators and up-level references
so that A//B, A/B/, A/./B and A/foo/../B all become A/B. This string
manipulation may change the meaning of a path that contains symbolic links.
On Windows, it converts forward slashes to backward slashes. To normalize case,
use normcase().
##  os.path.realpath(path)：返回 path 对应的真实的、规范的路径
真实的，是指会解析符号链接  。
规范是指返回的是规范路径。
Return the canonical path of the specified filename, eliminating any symbolic
links encountered in the path (if they are supported by the operating system).
# secrets
secrets.choice(sequence): Return a randomly-chosen element from a non-empty sequence.

secrets.randbelow(n):   Return a random int in the range [0, n).

secrets.randbits(k)
# sys模块
https://docs.python.org/3/library/sys.html
与python密切相关的功能,函数

sys.argv
sys.base_exec_prefix
sys.base_prefix
sys.byteorder 'big','little'    ps:附实例
sys.builtin_module_names    元组,python内置模块清单
sys.modules     当前已加载模块,dict
sys.path        模块加载路径,list
sys.platform    linux  -- linux, win32 --> windows, cygwin -->windwos/Cygwin, darwin -->MacOS
            用于鉴定系统平台。就是这个。
sys.version

sys.prefix      编译时设定的常量,平台无关模块的安装位置.
sys.exec_prefix 编译时设定的常量,平台特定的模块的安装位置(一般和sys.prefix 相同)

sys.base_prefix 当使用虚拟环境时, sys.prefix 和 sys.exec_prefix 指向虚拟环境的相应目录,而 sys.base* 仍指向原目录
sys.base_exec_prefix
sys.pycache_prefix

PYTHONHOME    python标准库的存放路径. 默认python在 prefix和exec_prefix搜索标准库模块. 当设置这个变量后,则用它替代这两个变量的值.    PYTHONHOME prefix:exec_prefix.
PYTHONPATH  默认模块加载路径是 prefix/lib/pythonversion, 此变量指定的路径被插入模块搜索路径的前面.
python搜索模块的路径在且仅在 sys.path 中,这个变量的最后一项总是 prefix/lib/pythonversion,
第一项总是当前脚本所在的目录(或"",表示搜索当前目录). 中间是 PYTHONPATH指定的目录.
注：仅当当前脚本所在目录无法获取（比如，启动的是交互式python）时，第一项才会是 ""，否则第一项一定是
脚本路径而非空串。

sys.displayhook(value)
sys.excepthook(type, value, frame)

sys.stdin/stdout/stderr 标准输入、输出、错误输出
```py

>>> import sys
# 查看本机字节序
>>> sys.byteorder
'little'
>>> import struct
# 查看无符号short类型 1 的二进制表示,大端序
>>> struct.pack('>H', 1)
b'\x00\x01'
# 查看无符号short类型 1 的二进制表示,大端序
>>> struct.pack('<H', 1)
b'\x01\x00'
# 查看无符号short类型 1 的二进制表示,本机字节序
>>> struct.pack('@H', 1)
b'\x01\x00'
```

sys.platform鉴定系统平台(python 3.8.3的文档)
```py
if sys.platform.startswith('freebsd'):
    # FreeBSD-specific code here...
elif sys.platform.startswith('linux'):
    # Linux-specific code here...
elif sys.platform.startswith('aix'):
    # AIX-specific code here...
```
```
AIX         'aix'

Linux       'linux'

Windows         'win32'

Windows/Cygwin      'cygwin'

macOS       'darwin'
```
但是，msys2下的python，sys.platform 的值是 'msys'
## sys.exit([arg])
退出Python解释器。
这个方法是通过抛出 SystemExit 异常实现的，所以在 try 语句的 finally 代码块中指定的清理
动作可以生效，也可以在外层拦截退出操作。
> Exit from Python. This is implemented by raising the SystemExit exception, so cleanup actions specified by finally clauses of try statements are honored, and it is possible to intercept the exit attempt at an outer level.
可选的 arg 参数可以整数可以是对象。如果是整数，对应退出状态，0 表示正常，非零表示错误，
就和shell中一样。
如果传入的是其它对象，None 和整数0一样表示无错误，其它对象表示有错误，Python会认为错误
码为1，并把传入的对象输出到错误输出。
在程序发生错误时，`sys.exit('error message')`是快速退出方法。
> The optional argument arg can be an integer giving the exit status (defaulting to zero), or another type of object. If it is an integer, zero is considered “successful termination” and any nonzero value is considered “abnormal termination” by shells and the like. Most systems require it to be in the range 0–127, and produce undefined results otherwise. Some systems have a convention for assigning specific meanings to specific exit codes, but these are generally underdeveloped; Unix programs generally use 2 for command line syntax errors and 1 for all other kind of errors. If another type of object is passed, None is equivalent to passing zero, and any other object is printed to stderr and results in an exit code of 1. In particular, sys.exit("some error message") is a quick way to exit a program when an error occurs.

正因为这个方法“只是”抛出一个异常，所以只有在主线程调用这个方法，且异常未被拦截时才能起到
退出的作用。
> Since exit() ultimately “only” raises an exception, it will only exit the process when called from the main thread, and the exception is not intercepted.

注：
> Changed in version 3.6: If an error occurs in the cleanup after the Python interpreter has caught SystemExit (such as an error flushing buffered data in the standard streams), the exit status is changed to 120.


附：

> exception SystemExit

> This exception is raised by the sys.exit() function. It inherits from BaseException instead of Exception so that it is not accidentally caught by code that catches Exception. This allows the exception to properly propagate up and cause the interpreter to exit. When it is not handled, the Python interpreter exits; no stack traceback is printed. The constructor accepts the same optional argument passed to sys.exit(). If the value is an integer, it specifies the system exit status (passed to C’s exit() function); if it is None, the exit status is zero; if it has another type (such as a string), the object’s value is printed and the exit status is one.

> A call to sys.exit() is translated into an exception so that clean-up handlers (finally clauses of try statements) can be executed, and so that a debugger can execute a script without running the risk of losing control. The os._exit() function can be used if it is absolutely positively necessary to exit immediately (for example, in the child process after a call to os.fork()).

code

    The exit status or error message that is passed to the constructor. (Defaults to None.)

Q. sys.exit() 和手动抛出 SystemExit 异常有何区别？

# threading 多线程
[threading](https://docs.python.org/3/library/threading.html)
此模块在底层模块_thread的基础上构建了更高级别的线程接口。自3.7开始，此模块是必选的。

Python的threading模块中，用 threading.Thread 对象代表每个线程。
模块提供全局方法:
```
threading.active_count()        所有线程的数目。等价于 enumerate() 返回的列表的长度。
threading.current_thread()      获取当前线程
threading.enumerate()           返回当前所有线程的 list 对象。包括主线程、守护线程、当前线程创建的dummy线程，不包括未启动的线程和已终止的线程。
threading.main_thread()         获取主线程

threading.get_ident()           获取当前线程的标识符。（这是唯一的）。
```

此模块部分借鉴了Java的线程模型。

- 什么是主线程？Python解释器启动的时候所在的那个线程叫主线程
- 什么是守护线程？线程有一个 .daemon 属性，此属性为 True 的就是守护线程。
  守护线程的特性：当程序中只剩下守护线程的时候，整个程序就会退出
## 线程本地变量
class threading.local
```py
mydata = threading.local()
mydata.x = 1
```
## Thread对象
建立新线程有且仅有两种方法：1. 实例化线程类并提供target参数 2. 继承线程类并重写run()方法.
ps：继承线程类除了构造器和run方法，一律不可覆盖别的方法。

无论哪种方式，启动线程都要调用实例的 start()方法。start()方法会在另一个控制流中调用run方法。

线程名可以重复。
线程标识符不会重复，但线程死亡后可以重用，线程标识符是一个非零的整数。
可以指定线程为守护线程：守护线程的特性是当程序中只剩下守护线程的时候，python解释器会终结整个程序。（被终结的守护线程其占有的资源可能无法正确释放，如果
有清理工作需要做，不要用守护线程，而是用线程消息机制）。默认线程从当前线程中继承dameon属性。
dummy线程。

一个线程可以调用另一个线程的join方法，a 调用 b.join() 则a会暂停执行，直到b线程结束。

```
class threading.Thread(group=None, target=None, name=None, args=(), kwargs={}, *, daemon=None)

start()
run()
join()
is_alive()

name    线程名字，可读写
ident   线程id
daemon  是否为守护线程
```
### daemon

A boolean value indicating whether this thread is a daemon thread (True) or not (False). This must be set before start() is called, otherwise RuntimeError is raised. Its initial value is inherited from the creating thread; the main thread is not a daemon thread and therefore all threads created in the main thread default to daemon = False.

The entire Python program exits when no alive non-daemon threads are left.

## 锁 thread.Lock
python中，它是当前最低层的同步原语。
锁有两个状态“锁定”“未锁定”，新建的时候处于“未锁定”状态，有两个方法 acquire() 和 release().
如果当前状态是未锁定，则acquire()把状态改为锁定，并立即返回；如果当前状态是锁定，则acqiure方法阻塞当前线程，直到另一个线程
调用release方法后，当前线程苏醒，把锁改为锁定状态并返回。

release（）方法只允许在锁定状态的锁上调用，如果对处于未锁定状态的锁调用此方法，将抛出RuntimeError。此方法将锁切换为未锁定状态并立即返回。

如果有多个线程同时阻塞在acquire方法上，则当锁可用时，只有一个线程可以得到锁，哪个线程，未定义。

锁，也支持with语句。

所有这些方法都是原子的。
# signal
[signal — Set handlers for asynchronous events — Python 3.8.3 documentation](http://docs.localhost/python-3.8.3/library/signal.html#signal.signal)

## signal.signal(signalnum, handler)

Set the handler for signal signalnum to the function handler. handler can be a callable Python object taking two arguments (see below), or one of the special values signal.SIG_IGN or signal.SIG_DFL. The previous signal handler will be returned (see the description of getsignal() above). (See the Unix man page signal(2) for further information.)

When threads are enabled, this function can only be called from the main thread; attempting to call it from other threads will cause a ValueError exception to be raised.

The handler is called with two arguments: the signal number and the current stack frame (None or a frame object; for a description of frame objects, see the description in the type hierarchy or see the attribute descriptions in the inspect module).

On Windows, signal() can only be called with SIGABRT, SIGFPE, SIGILL, SIGINT, SIGSEGV, SIGTERM, or SIGBREAK. A ValueError will be raised in any other case. Note that not all systems define the same set of signal names; an AttributeError will be raised if a signal name is not defined as SIG* module level constant.


# sysconfig
https://docs.python.org/3/library/sysconfig.html

提供python的配置信息，例如：python安装位置，当前平台相关的配置变量。
每个python发行版都有

```py
# 把sysconfig模块当脚本调用
# 下面这个命令的行为是：
# 把 get_platform(), get_python_version(), get_path() and get_config_vars() 的返回值输出到stdout
PS C:\Users\chenx> py -m sysconfig
Platform: "win-amd64"
Python version: "3.8"
Current installation scheme: "nt"

Paths:
        data = "D:\programs\python\v3.8"
        include = "D:\programs\python\v3.8\Include"
        platinclude = "D:\programs\python\v3.8\Include"
        platlib = "D:\programs\python\v3.8\Lib\site-packages"
        platstdlib = "D:\programs\python\v3.8\Lib"
        purelib = "D:\programs\python\v3.8\Lib\site-packages"
        scripts = "D:\programs\python\v3.8\Scripts"
        stdlib = "D:\programs\python\v3.8\Lib"

Variables:
        BINDIR = "D:\programs\python\v3.8"
        BINLIBDEST = "D:\programs\python\v3.8\Lib"
        EXE = ".exe"
        EXT_SUFFIX = ".pyd"
        INCLUDEPY = "D:\programs\python\v3.8\Include"
        LIBDEST = "D:\programs\python\v3.8\Lib"
        SO = ".pyd"
        VERSION = "38"
        abiflags = ""
        base = "D:\programs\python\v3.8"
        exec_prefix = "D:\programs\python\v3.8"
        installed_base = "D:\programs\python\v3.8"
        installed_platbase = "D:\programs\python\v3.8"
        platbase = "D:\programs\python\v3.8"
        prefix = "D:\programs\python\v3.8"
        projectbase = "D:\programs\python\v3.8"
        py_version = "3.8.2"
        py_version_nodot = "38"
        py_version_short = "3.8"
        srcdir = "D:\programs\python\v3.8"
        userbase = "C:\Users\chenx\AppData\Roaming\Python"
```
# time
https://docs.python.org/3/library/time.html

time模块以自epoch以来的秒数（浮点数）记录时间。
epoch 的时间点取决于平台，但windows和linux上是 1970-01-01 00:00:00 UTC.
time.gmtime(0) 可以查看当前平台的epoch。

time.time() → float         自epoch以来的秒数（浮点数格式）。
time.time_ns() → int        自epoch以来的纳秒数。v3.7。注：1s=10^9 ns
time.sleep(secs:float)      当前线程休眠指定秒数

此模块是对 C 语言 time.h 的简单封装。
# timeit
[timeit](https://docs.python.org/3/library/timeit.html)

```
class timeit.Timer(stmt='pass', setup='pass', timer=<timer function>, globals=None)
Timer.timeit(number=1000000)
Timer.autorange(callback=None)
Timer.repeat(repeat=5, number=1000000)
Timer.print_exc(file=None)

timeit.timeit(stmt='pass', setup='pass', timer=<default timer>, number=1000000, globals=None)
```

timeit方法是统计时间的，repeat和autoarange是多次重复调用timeit的封装。
Timer构造器中的stmt可以是字符串形式的python语句，也可以是可调用对象。

每次调用timeit，执行setup语句一次，然后把语句stmt执行number次，统计并返回number次stmt语句的总时间（浮点数，秒）。

timeit.timeit 是快捷方法。

timeit()测量时会临时关闭垃圾回收机制，这样的好处是使得测量结果不受垃圾回收的影响，弊端是某些方法的耗时可能大头在垃圾回收，
这时候可以手动打开垃圾回收机制。
`timeit.Timer('for i in range(10): oct(i)', 'gc.enable()').timeit()`
# unittest(单元测试)
<https://docs.python.org/3/library/unittest.html>

unitest框架受JUnit启发而来，它与其它语言中的主流测试框架风格类似。
支持：测试自动化、可复用 setup 和 shutdown 代码、把测试用例组织到不同的集合中、测试用例和测试报告框架的独立性。

unittest框架提供如下概念：
test fixture: 测试环境，即为运行测试用例所需做的准备工作和测试完毕之后的清理工作。比如建立临时目录、创建代理数据库、启动服务器进程。
test case：代表一个独立的测试单元。unittest框架中，测试用例用 TestCase类的实例表示。ps: 测试用例都是这类的实例，这个类的每个实例都
代表一个测试用例。
test suite：把多个测试用例或test suite组合为一个逻辑上相关的集合，就叫test suite.
test runner：执行测试用例并向用户输出执行结果的组件。包括图形用户界面的、命令行界面的、返回退出码以对应不同测试结果的。
## 基础示例
unittest框架为创建、运行测试用例提供了丰富的工具。这里介绍其中的一部分，这些工具足以应对绝大多数需求。

```py
""" 对 str 的三个方法进行测试 """
import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)

if __name__ == '__main__':
    unittest.main()
```
通过继承 unittest.TestCase 创建测试用例，类中每个以test开头的方法都是一个独立的测试（这是约定）。
关键点是使用 assertEqual() 检查期望的输出，用assertTrue/assertFalse检测是否满足条件，用assertRaises()验证所期待抛出的异常。

setUp() 在每个测试方法之前执行，tearDown在每个测试方法之后执行。
最后的语句 `unittest.main()`使得直接执行python脚本即可启动测试。

```
G:\pycode\src\unittest>str_test.py
...
----------------------------------------------------------------------
Ran 3 tests in 0.002s

OK
```

-v参数可得到更详细的输出
```
G:\pycode\src\unittest>str_test.py -v
test_isupper (__main__.TestStringMethods) ... ok
test_split (__main__.TestStringMethods) ... ok
test_upper (__main__.TestStringMethods) ... ok

----------------------------------------------------------------------
Ran 3 tests in 0.002s

OK
```
## 命令行接口
unittest模块提供了命令行接口，可用于执行测试模块、测试类、甚至单个测试方法。
可任意组合模块、类、方法。
```
python -m unittest test_module1 test_module2
python -m unittest test_module.TestClass
python -m unittest test_module.TestClass.test_method
```
如果是模块，还可以指定模块文件路径，unittest会自动转换为对应的模块名。
```sh
python -m unittest tests/test_something.py
# 等价于
python -m unittest tests.test_something
# 去掉.py后缀，并把路径分隔符转为句点。
```
如果包含测试用例的脚本文件不能以模块的方式导入，那就只能直接执行脚本文件了。
ps：当然，脚本文件自己负责启动测试用例，比如`unittest.main()`。

用 -v 参数可输出更详细的信息：`python -m unittest -v test_module`

不提供任何命令行参数，则启动“自动搜索模式”(test discovery)。`python -m unittest`

### 命令行选项
```
python -m unittest -h

python.exe -m unittest [opts] [tests [tests ...]]
optional arguments:
  -b, --buffer         Buffer stdout and stderr during tests
  -c, --catch          Catch Ctrl-C and display results so far
  -f, --failfast       Stop on first fail or error
  -k TESTNAMEPATTERNS  Only run tests which match the given substring
  --locals             Show local variables in tracebacks
```
可以多次指定 -k 选项。唯一的通配符是星号，匹配时，区分大小写。

## 自动检索
Test Discovery，自python 3.2新增。

unittest 提供了简单的测试检索功能，可自行搜索测试用例并执行。
自动检索的有编程接口TestLoader.discover()和命令行接口 `python -m unittest discover`

```
-v, --verbose
Verbose output

-s, --start-directory directory
Directory to start discovery (. default)

-p, --pattern pattern
Pattern to match test files (test*.py default)

-t, --top-level-directory directory
Top level directory of project (defaults to start directory)
```
`python -m unittest` 是 `python -m unittest discover` 的简写。
Q. -p和-t的区别？、
Q. 这句话什么意思？
> If you supply the start directory as a package name rather than a path to a
> directory then discover assumes that whichever location it imports from is the
> location you intended, so you will not get the warning.

这个意思？
> for example myproject.subpackage.test, as the start directory. The package
> name you supply will then be imported and its location on the filesystem will
> be used as the start directory.
## 测试代码的组织结构
unittest用 unittest.TestCase 类表示测试用例。
> The basic building blocks of unit testing are test cases — single scenarios that must be set up and checked for correctness.
创建测试用例，要么继承 TestCase 要么使用 FunctionTestCase 方法。后者是继承 TestCase 的快捷方法而已。

每个 TestCase 实例中的测试代码都必须是自我包含的。

TestCase 提供了一系列 assert* 方法，以实现各种测试检测目的。测试失败，则这些方法会抛出对应的异常，unittest框架会识别这些
异常，并测试用例标记为失败。任何其它异常都被视为错误。

setUp和tearDown分别在每个测试方法的前后执行一次。
同时每个测试方法都是在一个新的实例中执行的。
ps：所以每个测试方法都对应执行一遍 `__init__\setUp\tearDown`

> Such a working environment for the testing code is called a test fixture. A new TestCase instance is created
> as a unique test fixture used to execute each individual test method. Thus setUp(), tearDown(), and `__init__()`
> will be called once per test.

```py
import unittest

class MyTest(unittest.TestCase):

    def __init__(self, *a, **b):
        super().__init__(*a, **b)
        print('__init__')

    def setUp(self):
        print('setup')
    def tearDown(self):
        print('tearDown')

    def test_a(self):
        print('test a')

    def test_b(self):
        print('test b')

```
```
G:\pycode\src\unittest>py -m unittest test_a
__init__
__init__
setup
test a
tearDown
.setup
test b
tearDown
.
----------------------------------------------------------------------
Ran 2 tests in 0.002s

OK

```

建议把测试用例按逻辑组织为不同的测试用例集合，unittest.TestSuite类用于这一目的。
一般，unittest.main()方法会自动组装出 TestSuite 并执行，当然我们也可以手动建立
自定义的test suite，就像下面这样：
```py
def suite():
    suite = unittest.TestSuite()
    suite.addTest(WidgetTestCase('test_default_widget_size'))
    suite.addTest(WidgetTestCase('test_widget_resize'))
    return suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite())
```

可以把模块和模块测试代码放在一个文件里，但分开放置会更好。比如模块 widge.py 的测试代码放在 test_widget.py 中，理由如下：

The test module can be run standalone from the command line.

The test code can more easily be separated from shipped code.

There is less temptation to change test code to fit the code it tests without a good reason.

Test code should be modified much less frequently than the code it tests.

Tested code can be refactored more easily.

Tests for modules written in C must be in separate modules anyway, so why not be consistent?

If the testing strategy changes, there is no need to change the source code.

```py
""" 手动组装自己的 test suite """

import unittest
from test_a import MyTest

def suite():
    suite = unittest.TestSuite()
    suite.addTest(MyTest('test_a'))
    suite.addTest(MyTest('test_b'))
    return suite

if __name__ == "__main__":
    runner = unittest.TextTestRunner()
    runner.run(suite())

"""
__init__
__init__
setup
test a
tearDown
.setup
test b
tearDown
.
----------------------------------------------------------------------
Ran 2 tests in 0.006s

OK
"""
```
## 跳过测试
3.1 引入

被跳过的测试不再执行，无所谓成功失败。
还能把测试标记为“expected failure,” ，意思是这个测试会失败，但此测试不参数失败测试用例的计数。

跳过测试用例有三种方式：1. 使用skip注解 2. 直接调用 TestCase.skipTest()方法 3. 直接抛出SkipTest异常

```py
class MyTestCase(unittest.TestCase):

    @unittest.skip("demonstrating skipping")
    def test_nothing(self):
        self.fail("shouldn't happen")

    @unittest.skipIf(mylib.__version__ < (1, 3),
                     "not supported in this library version")
    def test_format(self):
        # Tests that work for only a certain version of the library.
        pass

    @unittest.skipUnless(sys.platform.startswith("win"), "requires Windows")
    def test_windows_support(self):
        # windows specific testing code
        pass

    def test_maybe_skipped(self):
        if not external_resource_available():
            self.skipTest("external resource not available")
        # test code that depends on the external resource
        pass
```
上述测试用例的执行结果：
···
test_format (__main__.MyTestCase) ... skipped 'not supported in this library version'
test_nothing (__main__.MyTestCase) ... skipped 'demonstrating skipping'
test_maybe_skipped (__main__.MyTestCase) ... skipped 'external resource not available'
test_windows_support (__main__.MyTestCase) ... skipped 'requires Windows'

----------------------------------------------------------------------
Ran 4 tests in 0.005s

OK (skipped=4)
···

测试类的跳过同样如此：
```py
@unittest.skip("showing class skipping")
class MySkippedTestCase(unittest.TestCase):
    def test_not_run(self):
        pass
```

在setUp()中跳过测试用例，比如当需求的某项资源无法获取时，就可以直接跳过测试。

预期会失败的测试
unittest.ExpectFailure 注解。
```py
class ExpectedFailureTestCase(unittest.TestCase):
    @unittest.expectedFailure
    def test_fail(self):
        self.assertEqual(1, 0, "broken")
```

清单：
```
@unittest.skip(reason)
Unconditionally skip the decorated test. reason should describe why the test is being skipped.

@unittest.skipIf(condition, reason)
Skip the decorated test if condition is true.

@unittest.skipUnless(condition, reason)
Skip the decorated test unless condition is true.

@unittest.expectedFailure
Mark the test as an expected failure. If the test fails it will be considered a success. If the test passes, it will be considered a failure.

exception unittest.SkipTest(reason)
This exception is raised to skip a test.
```

被跳过的测试，它们的 setUp和tearDown方法就不再执行了。

> Skipped tests will not have setUp() or tearDown() run around them. Skipped classes will not have setUpClass() or
> tearDownClass() run. Skipped modules will not have setUpModule() or tearDownModule() run.
## 执行测试

运行单元测试
```sh
# 直接传入.py文件名路径也可
python -m unittest tests/test_something.py
# 但这种情况下，仍要求 tests.test_something 是模块。
# This allows you to use the shell filename completion to specify the test module. The file specified must still be importable as a module. The path is converted to a module name by removing the ‘.py’ and converting path separators into ‘.’. If you want to execute a test file that isn’t importable as a module you should execute the file directly instead.

# 可以传入模块名、类/方法的全限定名。
python -m unittest test_module1 test_module2
python -m unittest test_module.TestClass
python -m unittest test_module.TestClass.test_method

# 无论如何，上面两种方式都要求存放单元测试的python文件可以被当作模块导入
# 如果不能导入，则只好直接执行python源文件。此时源文件应该有类似这样一句话：`unittest.main()`
python3 basic_test.py
python3 basic_test.py -v
```
自动搜索当前目录下的测试文件：
```sh
cd project_directory
python -m unittest discover
# 可简写为：
python -m unittest
```
前提是：测试文件必须是包或者模块。


-s, --start-directory directory：从directory开始搜索，默认为当前目录（.）。
-p, --pattern pattern            Pattern to match test files (test*.py default)
下面的目录是等价的：

```sh
python -m unittest discover -s project_directory -p "*_test.py"
python -m unittest discover project_directory "*_test.py"
```

模式匹配：
py -m unittest 有个 -k 选项，用来指定单元测试类/方法的模式。
py -m unittest discover 有个 -p 选项，用来指定单元测试文件的模式。

## 代码组织
### subtest
```py
class NumbersTest(unittest.TestCase):

    def test_even(self):
        """
        Test that numbers between 0 and 5 are all even.
        """
        for i in range(0, 6):
            with self.subTest(i=i):
                self.assertEqual(i % 2, 0)

```
# warning
## 简单的例子
```py
import warnings
def fxn():
    warnings.warn("deprecated", DeprecationWarning)
    print 'this is fxn'
```

运行 python fxn.py

显示 this is fxn 并没有输入警告信息

添加运行参数 -W action

python -W default fxn.py

```
fxn.py:5: DeprecationWarning: deprecated

  warnings.warn("deprecated", DeprecationWarning)

this is fxn
```
还可以添加error\always\ignore\等参数
# misc
字符串和byte转换，编解码默认为utf-8
- bytes.decode(encoding="utf-8", errors="strict")
- str.encode(encoding="utf-8", errors="strict")¶

================================================================

================================================================
# xlrd
xlrd 1.2.0
2020年7月17日

xlrd.open_workbook(): xlrd.book.Book
## xlrd
- `xlrd.open_workbook(filename=None, logfile=<_io.TextIOWrapper name='<stdout>' mode='w' encoding='UTF-8'>, verbosity=0, use_mmap=1, file_contents=None, encoding_override=None, formatting_info=False, on_demand=False, ragged_rows=False)`

Open a spreadsheet file for data extraction.

Parameters:

`filename` – The path to the spreadsheet file to be opened.
`logfile` – An open file to which messages and diagnostics are written.
`verbosity` – Increases the volume of trace material written to the logfile.
`use_mmap` – Whether to use the mmap module is determined heuristically. Use this arg to override the result.

    Current heuristic: mmap is used if it exists.
    file_contents – A string or an mmap.mmap object or some other behave-alike object. If file_contents is supplied, filename will not be used, except (possibly) in messages.
    encoding_override – Used to overcome missing or bad codepage information in older-version files. See Handling of Unicode.
    formatting_info –

    The default is False, which saves memory. In this case, “Blank” cells, which are those with their own formatting information but no data, are treated as empty by ignoring the file’s BLANK and MULBLANK records. This cuts off any bottom or right “margin” of rows of empty or blank cells. Only cell_value() and cell_type() are available.

    When True, formatting information will be read from the spreadsheet file. This provides all cells, including empty and blank cells. Formatting information is available for each cell.

    Note that this will raise a NotImplementedError when used with an xlsx file.
    on_demand – Governs whether sheets are all loaded initially or when demanded by the caller. See Loading worksheets on demand.
    ragged_rows –

    The default of False means all rows are padded out with empty cells so that all rows have the same size as found in ncols.

    True means that there are no empty cells at the ends of rows. This can result in substantial memory savings if rows are of widely varying sizes. See also the row_len() method.

Returns: An instance of the Book class.

## class xlrd.book.Book
https://xlrd.readthedocs.io/en/latest/api.html#xlrd.book.Book

注：不应实例化此类，应当用 open_workbook（）方法取得此类实例。
- nsheets= 0    The number of worksheets present in the workbook file. This information is available even when no sheets have yet been loaded.

- sheet_names()：A list of the names of all the worksheets in the workbook file.

    Returns:	A list of the names of all the worksheets in the workbook file. This information is
    available even when no sheets have yet been loaded.

- sheet_by_index(sheetx)：Sheet

    Parameters:	sheetx – Sheet index in range(nsheets)
    Returns:	A Sheet.

    `bk.sheet_by_index(idx)` 等价于 `bk[idx]`.
    第一个sheet页的索引是 0。

    下标越界会报错：list index out of range

-  sheet_by_name(sheet_name)：-> Sheet

    Parameters:	sheet_name – Name of the sheet required.
    Returns:	A Sheet.

- sheets()
    All sheets not already loaded will be loaded.
    Returns:	A list of all sheets in the book.

- 还可以直接下标访问 `book[2]`, `bk['分户明细']` 数字或文本下标都是可以的
## classxlrd.sheet.Sheet(book, position, name, number)
在访问单元格的函数中，rowx 代表行标，colx 代表列标，都是从 0 开始。
负数下标、切片都支持。


- book：    所属Book对象
- name=''
- visibility= 0

    Visibility of the sheet:

    0 = visible
    1 = hidden (can be unhidden by user – Format -> Sheet -> Unhide)
    2 = “very hidden” (can be unhidden only by VBA macro).

- nrows= 0
    Number of rows in sheet. A row index is in range(thesheet.nrows).

- ncols= 0
    Nominal number of columns in sheet. It is one more than the maximum column index found, ignoring trailing empty
    cells. See also the ragged_rows parameter to open_workbook() and row_len().
- cell(rowx, colx)
    Cell object in the given row and column.
    可使用标访问`sheet[rowx][colx]`

- cell_value(rowx, colx)
    Value of the cell in the given row and column.
- cell_type(rowx, colx)
    Type of the cell in the given row and column.
    Refer to the documentation of the Cell class.


- row_len(rowx)
    Returns the effective number of cells in the given row. For use with open_workbook(ragged_rows=True) which is likely to produce rows with fewer than ncols cells.

    New in version 0.7.2.
- row(rowx):
    Returns a sequence of the Cell objects in the given row.
- get_rows()
    Returns a generator for iterating through each row
- row_slice(rowx, start_colx=0, end_colx=None)
    Returns a slice of the Cell objects in the given row.
- row_values(rowx, start_colx=0, end_colx=None)
    Returns a slice of the values of the cells in the given row.
- row_types(rowx, start_colx=0, end_colx=None)
    Returns a slice of the types of the cells in the given row.

- col(colx): 给定列的 Cell 构成的序列
    Returns a sequence of the Cell objects in the given column.
- col_slice(colx, start_rowx=0, end_rowx=None)
    Returns a slice of the Cell objects in the given column.
- col_values(colx, start_rowx=0, end_rowx=None)
    Returns a slice of the values of the cells in the given column.
- col_types(colx, start_rowx=0, end_rowx=None)
    Returns a slice of the types of the cells in the given column

- merged_cells = []

    List of address ranges of cells which have been merged. These are set up in
    Excel by Format > Cells > Alignment, then ticking the “Merge cells” box.

    Note: The upper limits are exclusive: i.e. [2, 3, 7, 9] only spans two cells.

    Note: Extracted only if open_workbook(..., formatting_info=True)

    ```py
    for crange in thesheet.merged_cells:
        rlo, rhi, clo, chi = crange
        for rowx in xrange(rlo, rhi):
            for colx in xrange(clo, chi):
                # cell (rlo, clo) (the top left one) will carry the data
                # and formatting info; the remainder will be recorded as
                # blank cells, but a renderer will apply the formatting info
                # for the top left cell (e.g. border, pattern) to all cells in
                # the range.
    ```

## classxlrd.sheet.Cell(ctype, value, xf_index=None)

Cell objects have three attributes: `ctype` is an int, `value` (which depends on ctype) and `xf_index`. If formatting_info
is not enabled when the workbook is opened, xf_index will be None.
# requests
[快速上手 — Requests 2.18.1 文档](https://requests.readthedocs.io/zh_CN/latest/user/quickstart.html)
