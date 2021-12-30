# make 如何判断某个目标是否需要更新，以及是否需要执行目标的recipe
2021-02-04 20:45:24

先讨论常用场景，伪目标，这就能覆盖绝大多数场景。
然后讨论各种例外情形。

## 规则
```makefile
# 通用语法
targets : prerequisites
        recipe
        …
# 或者：
targets : prerequisites ; recipe
        recipe
        …

# 一个实例
foo: bar baz
    cat baz bar > foo
```

一条规则告诉 make 两件事：怎样算“过期"，“过期”后怎样更新。
- A rule tells make two things: when the targets are out of date, and how to update them when necessary.

当名为 target 的文件不存在，或者比任意一个依赖文件旧的时候，就称文件 target 过期。
过期后，通过执行 执行 recipe 更新 target。

例外情形：
1. 如果没有任何依赖，怎么算？
    "target 过期" iff "不存在名为 target 的文件"
2. 如果recipe压根不产生名为target的文件怎么算？
    那这是事实上的伪目标
3. 如果规则 r1 的 target 的某个依赖本身是另一个规则（r2）的target，怎么算？
4. 接3，更进一步如果 r2 本身也处在特殊情形 1 或 2，那么 r1 的 target 是否过期，怎么算？
5. 接4，如果规则 r0 的某个依赖是 r1，这种情形下，r0 的target是否过期，怎么判断？

## 常规场景：文件依赖与更新以及多级更新
```makefile
objects = main.o kbd.o command.o display.o \
          insert.o search.o files.o utils.o

edit : $(objects)
        cc -o edit $(objects)
main.o : main.c defs.h
        cc -c main.c
kbd.o : kbd.c defs.h command.h
        cc -c kbd.c
command.o : command.c defs.h command.h
        cc -c command.c
display.o : display.c defs.h buffer.h
        cc -c display.c
insert.o : insert.c defs.h buffer.h
        cc -c insert.c
search.o : search.c defs.h buffer.h
        cc -c search.c
files.o : files.c defs.h buffer.h command.h
        cc -c files.c
utils.o : utils.c defs.h
        cc -c utils.c
clean :
        rm edit $(objects)
```
## 常规场景：作为动作的目标与伪目标
```makefile
all: foo bar
rebuild: clean all

foo: foo.c foo.h
    gcc foo.c -o foo
bar: bar.c
    gcc bar.c -o bar

clean :
        rm edit
```
这个例子中，clean，all，rebuild 都不对应任何文件，它们仅仅用来表示要执行的动作。
不对应文件的目标叫做伪目标，这里，是不是伪目标，是我们编写规则的时候自己心里有数，make
并不能知道。

为了更明确的表达这一意图，使用特殊目标 .PHONY 设置伪目标。
```makefile
all: foo bar
rebuild: clean all

foo: foo.c foo.h
    gcc foo.c -o foo
bar: bar.c
    gcc bar.c -o bar

clean :
        rm edit

.PHONY: clean all rebuild
```

## 另一场景：仅当目录不存在时创建目录
```makefile
OBJDIR := objdir
OBJS := $(addprefix $(OBJDIR)/,foo.o bar.o baz.o)

$(OBJDIR)/%.o : %.c
        $(COMPILE.c) $(OUTPUT_OPTION) $<

all: $(OBJS)

$(OBJS): | $(OBJDIR)

$(OBJDIR):
        mkdir $(OBJDIR)
```
目录不存在的时候，创建目录。
目录更新（就是在目录里增删文件）却不会引起 $(OBJS) 的更新。
