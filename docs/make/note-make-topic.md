# Make专题学习

## 夸一夸 Makefile

> Linux 环境下的程序员如果不会使用GNU make来构建和管理自己的工程，应该不能算是一个合格的专业程序员。
Makefile 文件描述了整个工程的编译、连接等规则。其中包括：工程中的哪些源文件需要编译以及如何编译、
需要创建哪些库文件以及如何创建这些库文件、如何最后产生我们想要的可执行文件。

makefile带来的好处就是——“自动化编译”，一旦写好，只需要一个make命令，整个工程完全自动编译，极大的提高了软件开发的效率。

2021-12-20，分析数据平作业配置中配置的任务都涉及到哪些业务系统，一些简单的单行命令，借助 Makefile，
比写到 shell 脚本中更便捷。

## Makefile的文件名
如果不指定, GNUmakefile、makefile、Makefile。
建议用 Makefile，因为首字母大写会出现在目录靠前的位置。
建议不要使用 GNUmakefile, 除非是专门写给 GNU make 命令的, 它只对 gnumake 有效.
如果make没有找到默认规则文件, 则你必须指定具体的目标, 此时 Make 尝试仅使用隐含规则去匹配并构造目标.

使用 -f filename，--file=filename 可以手动指定任意名称的文件名作为规则文件.
可以多次使用 -f 选项指定多个文件,这些文件的内容会按顺序拼接到一起.
指定 -f 之后, make 就不再搜索默认名称的 Makefile.
如果 -f 指定的文件不存在, 则报错退出.

## 规则的分类
- 显式规则
    - 普通规则
    - double colon rule
    - static pattern rule
- 隐式规则
    - builtin rule
    - pattern rule
    - match anything rule
        - terminal
        - non-terminal

对于 pattern rule，用户定义的，会覆盖内置的，当target和 prerequisite 完全相同时，发生覆盖（替换）。
Q. 非 match anything rule，可以使用双冒号吗？可以

## 隐式规则
隐式规则分为内置隐式规则和自定义隐式规则。
自定义隐式规则，通过 pattern rule 语法实现。

make 会为每个未指定recipe的target以及未指定recipe的双冒号规则搜索隐式条件。
仅作为依赖出现的文件会被视作一条无任何内容的规则的target，所以makek也会为这类文件搜索
隐式规则。
ps：合起来就是，make会为每个无 recipe的target（包括仅作为依赖出现的文件）搜索隐式规则。

在进行规则匹配的时候，模板规则和隐式规则的匹配算法是一样的。

链式搜索隐式规则时，不考虑以 non-terminal match anythig rule。

隐式规则的匹配算法
- 基础：% 匹配任意非空字符串
- 多个都匹配时，谁的依赖实际存在或可以生成，谁获胜，否则
- 多个都匹配时，依赖实际存在或显式描述过的，这样的规则优先于其依赖必须通过链式隐式规则而生成的，那样的规则
- 还不能分出，则谁的匹配更精确就用那个，还不行，则谁的位置靠前，谁胜出。

## 包含其他makefile
包含其他makefile 的唯一方式是 include 指令。
当遇到 include 指令时，make 会暂停当前 makefile 的解析，转而读取 include 后面的文件，
解析完成后再继续解析当前 makefile。
```
include filenames
```
include 后面可以跟空气，不报错，直接忽略。
include 后面指定的文件可以不存在，但当所有找得到的makefile读取之后
如果不能制作出缺失的makefile，就报错终止。
可以使用shell通配符指定文件名。
Q. 被包含的文件本身包含空格，当如何处理呢？
用反斜杠对空格转义：`include file\ name`。
ps：双引号没有用`include "file name"`，make 会认为是两个文件：file和name。

要让make忽略找不到的文件，使用
```
-include filenames
```
include 前头加一个连字符作前缀。

内置变量 MAKEFILE_LIST 存储 make 解析到当前行时已经读取的所有 makefile 的名字。
`$(info $(MAKEFILE_LIST))`
## REMAKE和自动生成头文件依赖
手工维护C语言头文件依赖容易出错。
所以 GNU make 增设 remake 特性，用以支持自动分析处理头文件依赖。

remake 是什么呢？

何时发生 remake.
读取完所有 makefile 并构建依赖图完毕后，立即尝试以每个
makefile 为 goal，看是否有匹配的规则，且需要更新，当至少
有一个 makefile 发生了更新，则以干净的状态重启make。
ps: 这里的"发生了更新" 是使用时间戳判断的.
> To this end, after reading in all makefiles make will consider each as a goal target and attempt to update it. If a makefile has a rule which says how to update it (found either in that very makefile or in another one) or if an implicit rule applies to it (see Using Implicit Rules), it will be updated if necessary. After all makefiles have been checked, if any have actually been changed, make starts with a clean slate and reads all the makefiles over again. (It will also attempt to update each of them over again, but normally this will not change them again, since they are already up to date.) Each restart will cause the special variable MAKE_RESTARTS to be updated (see Special Variables).

## 语法元素
- exclicit rules
  - static pattern rules
  - ! double colon rules
- implicit rules:
  - builtin rules
  - pattern rules
- variables defines: 变量，变量引用，函数
- directives： include, if, define
- comments

## 目标何时需要更新?
2021-02-05

> The criterion for being out of date is specified in terms of the prerequisites, which consist of file names separated by spaces.
> A target is out of date if it does not exist or if it is older than any of the prerequisites (by comparison of last-modification times).


1. 说某个target（目标）需要 check（检查），当且仅当
    - 1.1 它是伪目标或者该目标不存在，或者
    - 1.2 该目标比它的某个依赖（prerequisite）（这个依赖没有匹配的规则）旧，或者
    - 1.3 该目标的某个依赖（这个依赖有匹配的规则）需要检查
    某个目标是否需要检查，给定 make goal 之后，通过静态分析就能得出。

2. 目标 t 需要执行当且仅当
    - t 是伪目标或者 t 不存在，或
    - t 存在某个执行过的依赖 p，满足：
        - p 是伪目标或 p 不存在，或
        - 存在文 p 件，且该文件比 make 启动时的文件 t 的时间戳新

    补充：目标是否执行，不受间接的伪目标依赖影响。

无论目标 t 是否真正执行，经过这些检查之后，目标 t 都变作已检查（checked）状态。
如果 t 确实执行了，t 同时是“已执行”状态。

推论：如果某个 target 不存在任何依赖（target 不是伪目标），则该目标需要执行当且仅当该目标不存在
推论：伪目标无条件执行，直接依赖于伪目标的目标无条件执行；

注：伪目标是指用 .PHONY 修饰的目标`.PHONY: p`。否则就不是伪目标。
注：“目标不存在”是指不存在与目标同名称的文件

### 实验：更新的传递性

A. 构造普通目标依赖链，g->t->p->d，设置规则和场景，使得 make g 时，p 执行，t 不执行；
- p < d, p 执行后 p<=t，则 t 不执行
- A1.p 执行后，t > g 新。 预期：g 执行: 实际 g 不执行
- A2.p 执行后 t <= g，预期：g 不执行
- A1和A2对照，说明我的总结是对的。

B. 完全仿照A，但把 p 设置为伪目标，预期
- B1  预期 g 执行:实际 g 未执行
- B2  预期 g 执行

C. 构造普通目标依赖链，g->t->p->d，设置规则和场景，使得 make g 时，p 执行，t 执行；
- p < d, p 执行后 p > t, 则 t 执行，t 不执行任何实际动作
- C1. P执行后，t <= g 预期：g 不执行
- C2. P执行后，t > g 预期：g 执行

#### A1，实际上 g 没有执行，所以总结不对。
```bash
[chenx@lcs2 9]$ cat A1
g: t
        @echo =======
        @echo g
t: p
        @echo =======
        @echo t
p: d
        @echo =======
        @echo p
        touch p -r t
        # 使得 t 比 g 新，这样 g 会执行
        touch g
        touch t

[chenx@lcs2 9]$ asy-touch p d t g # p < d < t < g
[chenx@lcs2 9]$ make -f A1 g # p 执行: p 不比 t 新 -> t 不执行; t 比 g 新，g 执行
=======
p
touch p -r t
# 使得 t 比 g 新，这样 g 会执行
touch g
touch t
[chenx@lcs2 9]$ make g
make: Nothing to be done for `g'.
[chenx@lcs2 9]$ make -f A1 g # 再次执行，只有 g 执行
=======
g
```
#### C1:符合预期
```bash
$ cat C1
g: t
        @echo =======
        @echo g
t: p
        @echo =======
        @echo t
p: d
        @echo =======
        @echo p
        touch p # p 比 t0 新, t 会执行
        touch t -r g # t <= g0, g 不会执行

[chenx@lcs2 9]$ asy-touch
A1   C1   d    g    mk2  p    t
[chenx@lcs2 9]$ asy-touch p d t g # p < d < t < g
[chenx@lcs2 9]$ make -f C1 g # p 执行，t 执行，g不执行
=======
p
touch p # p 比 t0 新, t 会执行
touch t -r g # t <= g0, g 不会执行
=======
t
[chenx@lcs2 9]$ # 符合预期
```
#### C2
```bash
[chenx@lcs2 9]$ cat C2
g: t
        @echo =======
        @echo g
t: p
        @echo =======
        @echo t
p: d
        @echo =======
        @echo p
        touch p # p 比 t0 新, t 会执行
        touch t # t > g0, g 会执行

[chenx@lcs2 9]$ asy-touch p d t g # p < d < t < g
[chenx@lcs2 9]$ make -f C2 g # 预期 p 执行，t 执行，g 执行
=======
p
touch p # p 比 t0 新, t 会执行
touch t # t > g0, g 会执行
=======
t
=======
g
[chenx@lcs2 9]$ # 符合预期
```
#### B1

```bash
[chenx@lcs2 9]$ cat B1
g: t
        @echo =======
        @echo g
t: p
        @echo =======
        @echo t
p: d
        @echo =======
        @echo p
        # 使得 p <=t0, 如此 t 不会执行，g 就不会执行
        # 但因为 p 是伪目标，
        touch p -r t
PHONY: p

[chenx@lcs2 9]$ make -f B1 g # 预期 p 执行，t，g 也执行
make: 'g' is up to date.
[chenx@lcs2 9]$ vi B1
=======
p
# 使得 p <=t0, 如此 t 不会执行，g 就不会执行
# 但因为 p 是伪目标，
touch p -r t
=======
t
[chenx@lcs2 9]$ cat B1
g: t
        @echo =======
        @echo g
t: p
        @echo =======
        @echo t
p: d
        @echo =======
        @echo p
        # 使得 p <=t0, 如此 t 不会执行，g 就不会执行
        # 但因为 p 是伪目标，
        touch p -r t
.PHONY: p

[chenx@lcs2 9]$ make -f B1 g # 预期 p 执行，t，g 也执行
=======
p
# 使得 p <=t0, 如此 t 不会执行，g 就不会执行
# 但因为 p 是伪目标，
touch p -r t
=======
t
# 但只有 t 执行，g 不执行，说明伪目标只对直接被依赖项有效
```
#### B2
### FORCE
```makefile
.RECIPEPREFIX:=>
foo: FORCE
> @echo $@

FORCE:
```

## 递归变量和简单变量
2021-02-06 15:35

### 递归变量和简单变量
```makefile
# 递归变量
foo = bar
foo2=$(foo)
# 简单变量
foo := bar
```
递归变量，用等号或者define定义，定义的时候，如果含有其它变量的引用，会在使用的时候递归展开。
简单变量，用 `:=` 或者 `::=` 定义，定义的时候，如果含有其它变量的引用，会立即展开，它的值在定义的时候就完全确定了。

```makefile
# 递归变量
foo = $(bar)
bar = $(ugh)
ugh = Huh?

all:;echo $(foo)
```

make all 输出 'Huh?'


```makefile
# 简单变量
x := foo
y := $(x) bar
x := later

# 等价于

y := foo bar
x := later
```

### 给变量赋值

1. 调用make时在命令行赋值
2. 在makefile中用赋值语句赋值（=, :=, ?=, +=, define）
3. 环境变量

1,2,3 优先级依次降低。
```makefile
# 给变量赋值的三种方式
# 1. 调用make时在命令行赋值
# 2. 在makefile中用赋值语句赋值（=, :=, ?=, +=, define）
# 3. 环境变量

foo:=val_of_foo
bar:=val_of_bar

all:
        echo $(foo)
        echo $(bar)
        echo from env: $(baz)
```

```bash
[chenx@lcs2 2]$ # 不设置环境变量，直接执行
[chenx@lcs2 2]$ make -n
echo val_of_foo
echo val_of_bar
echo from env:
[chenx@lcs2 2]$ # 可以看到 foo和bard都是在makefile中设置的值，bar没有值
[chenx@lcs2 2]$ # 设置环境变量 foo 和  baz
[chenx@lcs2 2]$ foo=foo baz=baz make -n
echo val_of_foo
echo val_of_bar
echo from env: baz
[chenx@lcs2 2]$ # 可以看到，环境变量foo无效（所以环境变量的优先级低于makefile中的变量定义），baz 变量的值就是环境变量的值
[chenx@lcs2 2]$ # make 命令行设置foo的值
[chenx@lcs2 2]$ make foo=foo -n
echo foo
echo val_of_bar
echo from env:
# make 命令行的设置生效了，覆盖了makefile中的定义
```
### 给变量追加值和条件赋值

```makefile
foo:=foo1
foo+=foo2
# 此时，foo 的值时 foo1 foo2
# 且+= 定义的变量是递归还是简单变量，要看变量原来是什么，现在还是什么。

bar?=barv

# bar未定义，则bar的值是barv，
bob=123
bob?=321
# bob 的值 123
```
### 变量未定义和变量值为空值

要清空一个变量，一般给它赋一个空值就足够了。
要彻底取消变量的定义，使用 undefine 指令。
赋空值的变量和未定义的变量，大多数请情况下看不出区别(展开的结果都是空字符串)，
但在 origin 和 flavor 这两个函数中，未定义的变量的展开结果是 undefined。
```
foo := foo
bar = bar

undefine foo
undefine bar

$(info $(origin foo))
$(info $(flavor bar))
```

flavor 显示变量的情况：

- ‘undefined’: if variable was never defined.
- ‘recursive’: if variable is a recursively expanded variable.
- ‘simple’: if variable is a simply expanded variable.

origin 区分的更多一些：undefined，default，file，environment，override，automic，comman line，environent override

## 速查：函数

- $(info msg)
- $(warn msg)
- $(error msg)

## 速查：条件指令 if
```
ifeq($(v1), $(v2))

else ifeq(c0, $(v4))

else

endif
```
## 速查：调试用的选项

### ‘-p’ ‘--print-data-base’

- make -p   输出最终的数据库（规则和变量），然后照常执行
- make -pq  输出最终的数据库（规则和变量），但不执行
- make -p -f /dev/null 只输出内置数据库

make 输出的数据库信息带有行号，方便调试。

> Print the data base (rules and variable values) that results from reading the makefiles; then execute as usual or as otherwise specified. This also prints the version information given by the ‘-v’ switch (see below). To print the data base without trying to remake any files, use ‘make -qp’. To print the data base of predefined rules and variables, use ‘make -p -f /dev/null’. The data base output contains file name and line number information for recipe and variable definitions, so it can be a useful debugging tool in complex environments.

## 总结：make 启动过程  待续
- 载入内置数据库
- 载入 MAKEFILES 变量指定的 makefile: 设置了环境变量才会载入，这里有找不到的文件不算错误
  * Q. 参与 remake 吗？大概是参与的
  * Q. 最初启动时，没有的时候会尝试make吗？
- -f 和默认文件
  - 如果指定了 -f，就不考虑默认文件；如果未指定 -f 会尝试默认文件
    * Q. -f A -f B, 当 A 存在而 B 不存在，会用 A 中的规则构建A吗？
    * Q. -f 指定相对路径，会搜索那些默认路径吗？-I 指定的路径呢？
  - 默认文件可以类比 -include 指令

- remake，直到达到稳定

深挖下去有更多细节。暂时了解到这些就够了
## 实验：makefile 中的工作目录
1. make 变量 CURDIR 指向当前目录
2. 除了 MAKEFILES 变量之外，第一个 makefile 所在的目录作是工作目录
## -f 和 -C
-f 不会改变工作目录，-C 则会。
```makefile
SHELL=bash
$(info make: current dir is $(CURDIR))
hello:

> @echo current dir is $$(pwd)
RECIPEPREFIX := >
```

```bash
$ make -f sub/Makefile
make: current dir is /home/xizhan/test
current dir is /home/xizhan/test

$ make -C sub -f Makefile
make: Entering directory '/home/xizhan/test/sub'
make: current dir is /home/xizhan/test/sub
current dir is /home/xizhan/test/sub
make: Leaving directory '/home/xizhan/test/sub'
```
## Q&A

- terminal 规则
- restart： 是内容变化才算，还是说只要时间戳有更新就算？
- 未定义的变量，empty 的变量，只含空格的变量的区别?
- 如何查看 make 实际执行了哪些规则？

- make -f file 可以指定自定义名称的 makefile，可以通过环境变量指定吗？

- 如何用四个空格做 recipe 的前缀？
- 内置规则、隐式规则的区别是什么？

- make 和 ssh ？

- Q. 规则 `FORCE:`和`FORCE: ;` 的区别是什么？或者说，没有 recipe 和有一个空的 recipe，有什么区别？

- make 变量和环境变量是如何转换、传递的？一些特殊变量
  - SHELL
  - MAKEFLAGS
  - MAKELEVEL
### Q. 在规则的命令中使用的变量，变量定义的位置必须在规则之前吗？
Ans: 不是的。
```bash
cat > Makefile <<\EOF
.RECIPEPREFIX = >
main:
> echo hello:$(foo):

foo = world
EOF

make
```

确实没有
```bash
$ make
echo hello:world:
hello:world:
```
### Q. make 使用时间戳判断目标是否需要重新构建，这样不可靠吧？
2021-12-21
这是为了兼顾性能。

可靠的方式也有，比如计算并记录文件的md5或sha512校验和，但是计算代价高出了太多太多。
而比较时间戳则很快很快，同时绝大多数情况下，使用时间戳足够了。
另外，还提供了 -B 选项，可以无条件重新构建。

所以用时间戳比较，很很合理。
### Q. make 和 ssh  待解决
docker-compose logs 命令查看容器日志会卡住，Ctrl-C 无法终止。

```makefile
# 这样，看到的日志有彩色高亮，但是Ctrl-C 无法终止
web.test.log:
	@echo 查看 web 模块的日志
	-@ssh -t work@cdh6 " cd $(deploy_dir_test); \
		docker-compose logs -f --tail 10 web; \
		"
# 下面三种写法，Ctrl-C 可以终止 make，但日志没有彩色高亮
web.test.log:
	@echo 查看 web 模块的日志
	-@ssh -nt work@cdh6 " cd $(deploy_dir_test); \
		docker-compose logs -f --tail 10 web; \
		"
web.test.log:
	@echo 查看 web 模块的日志
	-@ssh -n work@cdh6 " cd $(deploy_dir_test); \
		docker-compose logs -f --tail 10 web; \
		"
web.test.log:
	@echo 查看 web 模块的日志
	-@ssh -n work@cdh6 " cd $(deploy_dir_test); \
		docker-compose logs -f --tail 10 web; \
		"
```
make 收到 Ctrl-C （SIGINT）信号后会传递给正在执行的子shell，同时 make 自己也收到这个信号，
make 会等待子shell执行完毕，然后做清理工作、再退出。

### Q. (0001)手动指定的 MAKEFLAGS 变量中的选项是作为附加项还是覆盖其值呢？
参见 3.7.3

首先要看 MAKEFLAGS 变量的值是怎么来的，根据手册，应当是从命令行中提取的，并屏蔽了 CfOW 四个选项。
可以验证一下：

```makefile
$(info :MAKEFLAGS=$(MAKEFLAGS):)

main:
        @echo :MAKEFLAGS=$$MAKEFLAGS:
```
有点意思哈，在MAKEFLAGS 中，
- 有些选项带会带 -，有些不带
- 有些会进入 make 变量 MAKEFLAGS 中，有些会进入recipe 子进程的环境变量 MAKEFLAGS 中
- 变量定义，只会进入子进程的 MAKEFLAGS 环境变量中
```bash
$ make
:MAKEFLAGS=:
:MAKEFLAGS=:
$ make -k
:MAKEFLAGS=k:
:MAKEFLAGS=k:
$ make -j
:MAKEFLAGS=:
:MAKEFLAGS= -j:
$ make -k -j
:MAKEFLAGS=k:
:MAKEFLAGS=k -j:
$ make -j -k
:MAKEFLAGS=k:
:MAKEFLAGS=k -j:
$ make -j -k -n
:MAKEFLAGS=kn:
echo :MAKEFLAGS=$MAKEFLAGS:
```

make 的命令行参数，从环境变量 MAKEFLAGS 和 命令行选项合并而来；然后据此生成make变量
MAKEFLAGS 和传递给recipe子进程的 MAKEFLAGS 环境变量。
```bash
$ MAKEFLAGS="-k" make
:MAKEFLAGS=k:
:MAKEFLAGS=k:
$ make -s
:MAKEFLAGS=s:
:MAKEFLAGS=s:
$ make -j
:MAKEFLAGS=:
:MAKEFLAGS= -j:
$ MAKEFLAGS="-k -j" make
:MAKEFLAGS=k:
:MAKEFLAGS=k -j:
$ make -k -s -j
:MAKEFLAGS=ks:
:MAKEFLAGS=ks -j:
$ MAKEFLAGS="-k FOO=bar" make
:MAKEFLAGS=k:
:MAKEFLAGS=k -- FOO=bar:
$ MAKEFLAGS="-k FOO=bar" make -j
:MAKEFLAGS=k:
:MAKEFLAGS=k -j -- FOO=bar:
```

换一个 Makefile
```makefile
MAKEFLAGS=-k

$(info :MAKEFLAGS=$(MAKEFLAGS):)

main:
        @echo :MAKEFLAGS=$$MAKEFLAGS:
```
如下表明，在makefile中设置变量MAKEFLAGS，类似于环境变量的 MAKEFLAGS，会与命令行选项
合并。但当前 make 的MAKEFLAGS 不会反过来再受影响了。
```bash
$ make
:MAKEFLAGS=-k:
:MAKEFLAGS=k:
$ make -j
:MAKEFLAGS=-k:
:MAKEFLAGS=k -j:
$ make -s -k
:MAKEFLAGS=-k:
:MAKEFLAGS=ks:
```

总结，就是
1. MAKEFLAGS 环境变量或者make中的MAKEFLAGS变量指定的选项，会附加到当前make的命令行选项列表中。
  PS：同样，在 MAKEFLAGS 中指定的 CfOW 选项会被忽略
  PS：如果设置了make变量MAKEFLAGS，当前make就不会根据最终命令行选项反过来更新当前的MAKEFLAGS变了；如果没有设置，就会反过来更新一波。
2. 当make会把最终的命令行选项列表，中有意义的选项传递给执行 recipe 的子进程
