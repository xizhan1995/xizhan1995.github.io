# 2019年8月9日

## 笔记链接
- [note-make-手册](note-make-手册.md)
----
[GNU make](https://www.gnu.org/software/make/manual/make.html)
[Make 命令教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/02/make.html)

- implicit target
- phony target      [4.6 Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)
- empty target      4.8 Empty Target Files to Record Events https://www.gnu.org/software/make/manual/make.html#Empty-Targets
- stardard target   https://www.gnu.org/software/make/manual/make.html#Standard-Targets
- 标准变量          [10.3 Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables)
- 续行

- pattern rules (see Defining and Redefining Pattern Rules).
- explicit rule
- implicit rule
- double-colon rule
- static-pattern rule

make工具的各种语法特性显然是从实践中总结出来的。
- 普通目标：把源文件编译成程序
- 伪目标：执行指定动作，比如 clean
- % 通配符、自动变量：大批重复规则：%.c -> %.o 的编译规则是完全类似的。Q. % 叫什么？包含 % 的规则叫什么？
- 内置规则：C 语言编程规则 %.c -> %.o 太常用了，内置
- 变量：重复、公用的文本
- 利用 gcc 自动计算头文件依赖
- ……

读一读 https://www.cnblogs.com/lotgu/p/5936465.html
## 简要介绍

Make是最常用的构建工具，诞生于1977年，主要用于C语言的项目。
也可以用于其它地方。

## hello world & 目标 & makefile文件路径
使用 make 工具分为两步：
1. 编写 makefile
2. 调用 make 命令

在新目录下创建名为 Makefile 的文件，写入如下内容
```Makefile
# File: Makefile
hello:
    echo hello, world
```
注：echo hello, world 的前面必须是一个 tab，不能是空格。

执行命令 `make hello`。输出结果如下
```bash
$ make hello
echo hello, world
hello, world
```

- make 命令默认使用 `Makefile` 作为数据库文件名，可以用 -f 指定自定义的 makefile 文件。
- make 命令默认取 Makefile 的第一个 target（不算以句点开头的目标）作为目标。

所以在这个例子中，如下命令是完全等价的
```bash
# 完整格式是指定 makefile 和目标
make -f Makefile hello
# 而 Makefile 是默认文件名，可以省略
make hello
# 另一方面，hello 是第一个 target，也可以省略
make -f Makefile
# 当然可以同时省略
make
```

## hello world 2 & make 更新目标的逻辑
实际上，make 最初是为了编译 C 语言项目而构建的。

下面的例子 用 make 编译 hello world 程序。
```c
// File: hello.c
#include<stdio.h>
int main(){
    printf("hello, world\n");
    return 0;
}
```
```Makefile
hello: hello.c
    gcc hello.c -o hello
```
注: gcc hello.c -o hello 的前面必须是一个 tab，不能是空格。

```bash
make hello
./hello
```
输出结果：
```bash
$ make hello
gcc hello.c -o hello

$ ls
hello  hello.c  Makefile

$ ./hello
hello, world
```

Make 工具应对的预期工作流程/工作情景是这样的：

- 每次编辑完 hello.c 之后，再次执行 make 即可重新编译文件
- 如果执行完 make 后，没有编辑 hello.c 直接执行 make，make 不会重复编译，
  因为 make 会检查到上次编译后源文件并没有变化，所以 make 认为不需要重新编译。
- make 命令通过比较源文件和目标文件的修改时间判断是否需要构建目标。
  ps：时间戳可以伪造，不是百分之百可靠，但是效率快。
- make 命令提供 -B 选项，无条件重新构建。
  > -B, --always-make           Unconditionally make all targets.

### 附：快速创建 hello.c 和 Makefile
```bash
cat > hello.c <<EOF
#include<stdio.h>
int main(){
    printf("hello, world\n");
    return 0;
}
EOF

cat <<EOF | sed -E 's/^\s{4}/\t/' > Makefile

hello: hello.c
    gcc hello.c -o hello
EOF
```
## makefile 语法

makefile 包含五种语法元素：

- explicit rules
- implicit rules
- variable definitions
- directives
- comments

说规则和变量。

注：这里列出的只是常用的规则，每条规则介绍一部分，完整的规则列表和每条规则的完整逻辑，参考gnu手册笔记。
### 规则  待续...

makefile 的基本组成元素是 rule（规则），rule 说明何时以及如何更新target。

规则的构成形式如下：

```make
target … : prerequisites …
        recipe
        …
        …
```

一个 rule 由 targte、prerequisite、recipe 三部分构成，target 是必须的，prerequisite 和 recipe 可以省略其一，但不许同时省略。

- target 分为两种，普通 target 对应生成的文件，phony target（伪目标）指定要执行的动作的名称。
- 规则 recipe每一行都得以 tab 字符开头。也可以改为其它字符开头，设置 .RECIPEPREFIX 变量即可。
- 回显  @ -s --silent .SILIENT
- SHELL
### 折行  待续...
Makefile 中，换行符标志语句的结束。不限制行的长度。

行末的反斜杠可以续行。
续行本身和续行前后相邻的空白字符会被替换为单个空格。
多个连续的续行会替换为一个空格，而不是多个空格。

```makefile
foo=a \
  \
  b
# 等价于
foo=a b
```

recipe 中的折行处理方式不同。

### 包含其它文件
- include 指令用于包含其他makeilfe文件。
- make 处理到include指令的时候会暂停处理当前makefile，转而读取include指定的makefile，待处理完成后，从include指令处继续处理当前
  makefile。
- 包含文件缺失且无法构建时，make 命令会报错退出；用 -include 代替 include，make 就会忽略这错误。
### misc
每个 target 只可以有一个 recipe，如果找到了多个，要么报错，要么后面的覆盖前面的。

## 总结：make 启动过程（简化）
2021-12-22

- 载入内置数据库
- 载入 MAKEFILES 变量指定的 makefile: 设置了环境变量才会载入，这里有找不到的文件不算错误
- -f 和默认文件
  - 如果指定了 -f，就不考虑默认文件；如果未指定 -f 会尝试默认文件
  - 默认文件可以类比 -include 指令

- remake，直到达到稳定

深挖下去有更多细节。暂时了解到这些就够了。
## 术语

- `Double-colon rules` are explicit rules written with ‘::’ instead of ‘:’ after the target names.
- goal：The `goals` are the targets that make should strive ultimately to update.
- makefile：The information that tells make how to recompile a system comes from reading a data base called the `makefile`
  ch03
- normal rules: ??
- phony target:
  - Targets that do not refer to files but are just actions are called `phony targets`.
  - A phony target is one that is not really the name of a file; rather it is just a name for a recipe to be executed when you make an explicit request.
- phsical line:  We will refer to “physical lines” as a single line ending with a newline (regardless of whether it is escaped) and a “logical line” being a complete statement including all escaped newlines up to the first non-escaped newline.

- implicit rule:
- static pattern rules: Static pattern rules are rules which specify multiple targets and construct the prerequisite names for each target based on the target name.
- variable/macro: A `variable` is a name defined in a makefile to represent a string of text, called the variable’s value.
            In some other versions of make, variables are called macros.
## 最佳实践

### 实际中的 clean 规则示例
```makefile
.PHONY: clean
clean:
        -rm edit $(objects)
```
两个要点：
1. .PHONY
2. -rm 而不是 rm。
ps：rm -f 可以代替 -rm。
## list：列出所有target
2021-12-22

https://www.itranslater.com/qa/details/2128087309269599232

GNU Make 没有内置此项功能。可以通过添加如下规则实现此目的
```makefile
.PHONY: list
list:
        @$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs

list:
        @LANG=en_US.UTF-8 $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs
```
这条规则实际调用 make -p 命令获取所有目标。

注：重要说明：粘贴此内容时，请确保最后一行缩进1个实际的tab char。 （空格不起作用）。
