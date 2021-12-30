# 学习 makefile

相关笔记
ref1: linux/make命令.md

参考书《跟我一起写 makefile》

## 一些理论语句.

> 特别在 Unix 下的软件编译,你就不能不自己写 makefile 了,会不会写 makefile,从一个侧面说明了
一个人是否具备完成大型工程的能力。
> 因为,makefile 关系到了整个工程的编译规则。一个工程中的源文件不计数,其按类型、
功能、模块分别放在若干个目录中,makefile 定义了一系列的规则来指定,哪些文件需要
先编译,哪些文件需要后编译,哪些文件需要重新编译,甚至于进行更复杂的功能操作,因
为 makefile 就像一个 Shell 脚本一样,其中也可以执行操作系统的命令。

从源代码到可执行程序,分两步: 编译和链接.
编译所得结果叫目标代码文件,windows上以 .obj 为后缀名; linux/unix 上以 .o 为后缀名.

编译时: 1) 要求源代码语法正确 2) 告诉编译器头文件所在的位置
连接时: 不关心源代码,只管目标代码

库的另一种功能解释,

>  链接时,主要是链接函数和全局变量,所以,我们可以使用这些中间目标文件(O 文件或是
OBJ 文件)来链接我们的应用程序。链接器并不管函数所在的源文件,只管函数的中间目标
文件(Object File),在大多数时候,由于源文件太多,编译生成的中间目标文件太多,
而在链接时需要明显地指出中间目标文件名,这对于编译很不方便,所以,我们要给中间目
标文件打个包,在 Windows 下这种包叫“库文件” (Library File),也就是 .lib
文件,在 UNIX 下,是 Archive File,也就是 .a 文件。

> 只要我们的 Makefile 写得够好,所有的这一切,我们只用一个 make 命令就可以完

假定A文件依赖于B文件，编译系统应该保证做到下面两点。

    （1）只有在B文件编译完成后，才开始编译A文件。

    （2）当B文件发生变化时，A文件会被重新编译。

1.如果这个工程没有编译过，那么我们的所有C文件都要编译并被链接。
2.如果这个工程的某几个C文件被修改，那么我们只编译被修改的C文件，并链接目标程序。
3.如果这个工程的头文件被改变了，那么我们需要编译引用了这几个头文件的C文件，并链接目标程序。

## Makefile 里有什么?

Makefile 里主要包含了五个东西:显式规则、隐晦规则、变量定义、文件指示和注释。

文件指示包括了三个部分,一个是在一个 Makefile 中引用另一个 Makefile,就
像 C 语言中的 include 一样;另一个是指根据某些情况指定 Makefile 中的有效部分,就
像 C 语言中的预编译#if 一样;还有就是定义一个多行的命令。

## 引用其它的 Makefile

在 Makefile 使用 include 关键字可以把别的 Makefile 包含进来,这很像 C 语言的
#include,被包含的文件会原模原样的放在当前文件的包含位置。
在 include 前面可以有一些空字符,但是绝不能是[Tab]键开始.
如果有文件没有找到的话,make 会生成一条警告信息,但不会马上出现致命错误。它会继
续载入其它的文件,一旦完成 makefile 的读取,make 会再重试这些没有找到,或是不能
读取的文件,如果还是不行,make 才会出现一条致命信息。

## GNU 的 make 工作时的执行步骤入下

1、读入所有的 Makefile。
2、读入被 include 的其它 Makefile。
3、初始化文件中的变量。
4、推导隐晦规则,并分析所有规则。
5、为所有的目标文件创建依赖关系链。
6、根据依赖关系,决定哪些目标要重新生成。
7、执行生成命令。
1-5 步为第一个阶段,6-7 为第二个阶段。

## 通配符,可以用在哪里

这是在命令中的通配符。

clean:
    rm -f *.o

这是依赖条件中的通配符
print: *.c
    lpr -p $?
    touch print

变量中也可以

objects = *.o
但是并不是说[*.o]会展开,不! objects 的值就是“*.o”。

让通配符在变量中展开,也就是让 objects 的值是所有[.o]的文件名的集合,那么,你可以这样:
objects := $(wildcard *.o)

## 文件搜寻与 VPATH

> 在一些大的工程中,有大量的源文件,我们通常的做法是把这许多的源文件分类,并存放在
不同的目录中。所以,当 make 需要去找寻文件的依赖关系时,你可以在文件前加上路径,
但最好的方法是把一个路径告诉 make,让 make 在自动去找。

> Makefile 文件中的特殊变量“VPATH”就是完成这个功能的,如果没有指明这个变量, make
只会在当前的目录中去找寻依赖文件和目标文件。如果定义了这个变量,那么,make 就会
在当当前目录找不到的情况下,到所指定的目录中去找寻文件了。

VPATH = src:../headers

上面的的定义指定两个目录,“src”和“../headers”,make 会按照这个顺序进行搜索。
目录由“冒号”分隔。(当然,当前目录永远是最高优先搜索的地方)

另一个设置文件搜索路径的方法是使用 make 的“vpath”关键字,vpath比VPATH变量更灵活.
它的使用方法有三种

1、vpath `<pattern>` `<directories>`
为符合模式`<pattern>`的文件指定搜索目录`<directories>`。
2、vpath `<pattern>`
清除符合模式`<pattern>`的文件的搜索目录。
3、vpath

vpath %.h ../headers

该语句表示,要求 make 在“../headers”目录下搜索所有以“.h”结尾的文件。(如果某文件
在当前目录没有找到的话)

连续的 vpath 语句中出现了相同的`<pattern>`,或是被重复了的`<pattern>`,那么,make
会按照 vpath 语句的先后顺序来执行搜索。如:

vpath %.c foo
vpath % blish
vpath %.c bar

其表示“.c”结尾的文件,先在“foo”目录,然后是“blish”,最后是“bar”目录。

vpath %.c foo:bar
vpath % blish

而上面的语句则表示“.c”结尾的文件,先在“foo”目录,然后是“bar”目录,最后才
是“blish”目录。

## 静态模式
```
<targets ...>: <target-pattern>: <prereq-patterns ...>
    <commands>...
```

targets 定义了一系列的目标文件,可以有通配符。是目标的一个集合。
target-parrtern 是指明了 targets 的模式,也就是的目标集模式。
prereq-parrterns 是目标的依赖模式,它对 target-parrtern 形成的模式再进行
一次依赖目标的定义。

```
objects = foo.o bar.o
all: $(objects)
$(objects): %.o: %.c
    $(CC) -c $(CFLAGS) $< -o $@
```

上面的例子中,指明了我们的目标从$object 中获取,“%.o”表明要所有以“.o”结尾的
目标,也就是“foo.o bar.o”,也就是变量$object 集合的模式,而依赖模式“%.c”则
取模式“%.o”的“%”,也就是“foo bar”,并为其加下“.c”的后缀,于是,我们的依
赖目标就是“foo.c bar.c”。而命令中的“$<”和“$@”则是自动化变量,“$<”表示所
有的依赖目标集(也就是“foo.c bar.c”),“$@”表示目标集(也就是“foo.o bar.o”)。
于是,上面的规则展开后等价于下面的规则:
```
foo.o : foo.c
    $(CC) -c $(CFLAGS) foo.c -o foo.o
bar.o : bar.c
    $(CC) -c $(CFLAGS) bar.c -o bar.o
```

## 自动生成依赖性

场景是:大型项目,头文件依赖关系是很复杂的.

> 在 Makefile 中,我们的依赖关系可能会需要包含一系列的头文件,比如,如果我们的
main.c 中有一句“#include "defs.h"”,那么我们的依赖关系应该是:
    main.o : main.c defs.h
但是,如果是一个比较大型的工程,你必需清楚哪些 C 文件包含了哪些头文件,并且,你在
加入或删除头文件时,也需要小心地修改 Makefile,这是一个很没有维护性的工作。为了
避免这种繁重而又容易出错的事情,我们可以使用 C/C++编译的一个功能。大多数的 C/C++
编译器都支持一个“-M”的选项,即自动找寻源文件中包含的头文件,并生成一个依赖关系。
> 如果你使用 GNU 的 C/C++编译器,你得用“-MM”参数,不然,“-M”参数会把一些标准库
的头文件也包含进来。

## 何时更新

执行一条规则A的步骤如下:

1. 检查它的每个条件P:

    - 如果P需要更新,就执行以P为目标的规则B。之后,无论是否生成文件P,都认为P已被更新。
    - 如果找不到规则B,并且文件P已存在,表示P不需要更新。
    - 如果找不到规则B,并且文件P不存在,则报错退出。

2. 在检查完规则A的所有条件后,检查它的目标T,如果属于以下情况之一,就执行它的命令列表:
    - 文件T不存在。
    - 文件T存在,但是某个条件的修改时间比它晚。
    - 某个条件P已被更新(并不一定生成文件P)。
    ps：文件T存在，且它没有任何前置条件P，则T不需要更新。因为按第二条，没有比它新的条件。
换成人话：
目标需要更新当且仅当：
1. 它是伪目标,或
2. 它不是伪目标 且 1）目标文件不存在 或 2）有前置条件 P 且 P 更新了
ps 1. 伪目标一定会更新，而不管有没有对应的文件
ps 2. 如果一个目标依赖于某个伪目标，则它一定会更新；因为它的伪目标条件一定会更新

想做些清理工作，不希望增加太多规则，于是设立”伪目标“的概念，并约定，伪目标的命令总是得到执行。
伪目标作为直接目标时，不会检查是否存在对应的文件（或目录）而会无条件执行指令。

## make 常用的命令行参数

- 通过 -B 选项让所有目标总是重新建立

    make 命令不会编译那些自从上次编译之后就没有更改的文件，但是，如果你想覆盖 make 这种默认的
    行为，你可以使用 -B 选项。

- 使用 -d 选项打印调试信息

    如果你想知道 make 执行时实际做了什么，使用 -d 选项。

- 使用 -C 选项改变目录

    你可以为 make 命令提供不同的目录路径，在寻找 Makefile 之前会切换目录的。

    你想运行的 make 命令的 Makefile 文件保存在 ../make-dir/ 目录下，你可以这样做：

    $ make -C ../make-dir/

- 通过 -f 选项将其它文件看作 Makefile

    $ make -f my_makefile

- Makefile里主要包含了五个东西：显式规则、隐晦规则、变量定义、文件指示和注释。

- 命令的显示和禁止 -n -s

    如果make执行时，带入make参数“-n”或“--just-print”，那么其只是显示命令，但不会执行命令，
    这个功能很有利于我们调试我们的Makefile，看看我们书写的命令是执行起来是什么样子的或是什么顺序的。
    而make参数“-s”或“--slient”则是全面禁止命令的显示。
### 调试相关
-n      dry run
-w      输出“当前目录”
--trace     输出make执行的每条规则
-d      --debug=a
--debug=
    b（asic）
    a（all）
    v(erbose)
    i(mplicit)   仅输出应用规则的过程
    m(akefile)  仅输出 makefile 的搜索过程

## 第一条规则（默认规则）

clean的规则不要放在文件的开头，不然，这就会变成make的默认目标，相信谁也不愿意这样。
不成文的规矩是——“clean从来都是放在文件的最后”。

规则包含两个部分，一个是依赖关系，一个是生成目标的方法。
在Makefile中，规则的顺序是很重要的，因为，Makefile中只应该有一个最终目标，其它的目标都是被这个目标所连带出来的.

每条规则中的命令和操作系统Shell的命令行是一致的。make会一按顺序一条一条的执行命令，每条命令的
开头必须以[Tab]键开头，除非，命令是紧跟在依赖规则后面的分号后的。在命令行之间中的空格或是空行
会被忽略，但是如果该空格或空行是以Tab键开头的，那么make会认为其是一个空命令。

## 隐含规则 & 规则拆分

基础形式:	一个目标一条规则
可以拆分:	一个目标多条规则, make会先合并为基础形式再执行
可以合并:	一个规则多个目标, make会先拆分为基础形式再执行

一条单目标规则，可以按条件拆分；但拆分后的规则至多只能有一个含有命令；
如果发现了有多个命令，则只使用最后一条规则中的命令，并报告错误信息。

隐含规则何时生效？
如果一个目标在Makefile中的所有规则都没有找到命令列表, make 会尝试在内建的
隐含规则(Implicit Rule)数据库中查找适用的规则。

何使不生效？
如果某个目标没有任何配方，且希望make不要在隐含规则中搜索配方，使用空规则(一个分号);
foo: ;
或
foo: a.txt b.txt
    ;
## make 的递归使用
## make 的搜索路径
想要在单独的目录下编译代码，防止生成的文件弄乱了源代码

headers=../lib/headers
CPPFLAGS=-I $(headers)
vpath %.h $(headers)
vpath %.c ../lib

src=myls.c
$(src:.c=): $(src:.c=.o) apue.o apue.h
clean:
        rm -fv *.[od] *.exe

    foo : foo.c -lcurses
            cc $^ -o $@

When a prerequisite’s name has the form ‘-lname’, make handles it specially
by searching for the file libname.so, and, if it is not found, for the file libname.a in the current directory, in directories specified by matching vpath search paths and the VPATH search path, and then in the directories /lib, /usr/lib, and prefix/lib
The default value for .LIBPATTERNS is ‘lib%.so lib%.a’, which provides the default behavior described above.

## 遇到了问题
```
myls: apue.o myls.o
myls.o: apue.h myls.c
apue.o: apue.h apue.c
```
```bash
$ make myls -B
cc    -c -o myls.o myls.c
cc    -c -o apue.o apue.c
cc   myls.o apue.o   -o myls
```
改写成这样：
```
myls: apue.o
```
```bash
$ make myls
cc    -c -o apue.o apue.c
cc     myls.c apue.o   -o myls #  这里为什么直接拿 myls.c 和 apue.o 编译了？
```

