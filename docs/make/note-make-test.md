# make 实验

## 01. 更新 target 的时机
### 01.1 target 是伪目标或文件 target 不存在，无条件执行 target
```bash
[chenx@lcs2 01]$ ls -a
.  ..  makefile
[chenx@lcs2 01]$ cat makefile
# target 是伪目标或文件 target 不存在，无条件执行 target

t1:
        touch t1

t2:
        touch t2

.PHONY: t2 clean

clean:
        rm -vf t1 t2

[chenx@lcs2 01]$ make t1
touch t1
[chenx@lcs2 01]$ make t1
make: 't1' is up to date.
[chenx@lcs2 01]$ make t2
touch t2
[chenx@lcs2 01]$ make t2
touch t2
[chenx@lcs2 01]$ ls
makefile  t1  t2
```
### 01.2 t 依赖文件 p，且没有匹配 p 的规则
若不存在文件p，则报错；
若存在p，则当p比t新的时候执行t，否则不执行t。
```bash
[chenx@lcs2 02]$ ls -a
.  ..  makefile
[chenx@lcs2 02]$ cat makefile
#依赖文件 p，且没有匹配 p 的规则
# 若不存在文件p，则报错；
# 若存在p，则当p比t新的时候执行t，否则不执行t。

t: p
        touch t
[chenx@lcs2 02]$ make t
make: *** No rule to make target `p', needed by `t'.  Stop.
[chenx@lcs2 02]$ touch p
[chenx@lcs2 02]$ make t
touch t
[chenx@lcs2 02]$ make t
make: `t' is up to date.
```
### 01.3 t 依赖 p，且有匹配 p 的规则, 且 p 是伪目标
无条件执行 p，接着执行 t
无论文件p是否存在，无论文件 t 是否比文件 p 新。
```bash
[chenx@lcs2 03]$ ls -a
.  ..  makefile
[chenx@lcs2 03]$ cat makefile
# t 依赖 p，且有匹配 p 的规则, 且 p 是伪目标
# 无条件执行 p，接着执行 t

t: p
        touch t
p:
        @echo execute recipe of p

.PHONY: p clean

clean:
        rm -vf t p
[chenx@lcs2 03]$ make t
execute recipe of p
touch t
[chenx@lcs2 03]$ make t
execute recipe of p
touch t
[chenx@lcs2 03]$ ls
makefile  t
[chenx@lcs2 03]$ touch p
[chenx@lcs2 03]$ make t
execute recipe of p
touch t
```

### 01.4 t 依赖 p，且有匹配 p 的规则, 且 p 不是伪目标

            有文件 p        没有文件 p
p 执行      比较p和t        t 需要执行
p 不执行    比较p和t        -（没有文件p，p一定会执行）

```bash
[chenx@lcs2 04]$ ls
makefile
[chenx@lcs2 04]$ ls
makefile
[chenx@lcs2 04]$ cat makefile
# t 依赖 p，且有匹配 p 的规则, 且 p 不是伪目标
#
#             有文件 p        没有文件 p
# p 执行      比较p和t        t 需要执行
# p 不执行    比较p和t        -（没有文件p，p一定会执行）

t: p
        touch t

p:
        @echo execute recipe of p

clean:
        rm -vf t p

.PHONY: clean

# 1. 没有文件 p -> p 需要执行，t 需要执行
[chenx@lcs2 04]$ make t
execute recipe of p
touch t
[chenx@lcs2 04]$ make t
execute recipe of p
touch t
# 2. 有文件 p -> p 不执行，t是否需要执行，根据 p 和 t 的新旧关系判断
[chenx@lcs2 04]$ touch p
[chenx@lcs2 04]$ touch t # t 比 p 新
[chenx@lcs2 04]$ make t
make: `t' is up to date.
[chenx@lcs2 04]$ touch t; touch p # p 比 t 新
[chenx@lcs2 04]$ make t
touch t
[chenx@lcs2 04]$ make t
make: `t' is up to date.
```
```bash
# 用 t，p，d 构造最后一种场景：
# 3. 有文件 p，p 需要执行 -> t是否需要执行，看 p 和 t 的新旧关系。
t: p
        touch t
p: d
        @echo execute recipe in p

clean:
        rm -vf p t

.PHONY: clean
[chenx@lcs2 05]$ touch d
[chenx@lcs2 05]$ touch t
[chenx@lcs2 05]$ touch p
[chenx@lcs2 05]$ touch p # 有文件p，p需要执行，p 比t新
[chenx@lcs2 05]$ touch d
[chenx@lcs2 05]$ make t
execute recipe in p
touch t
[chenx@lcs2 05]$ # 有文件 p，p需要执行，p 不比 t 新
[chenx@lcs2 05]$ make t
execute recipe in p
[chenx@lcs2 05]$ make t
```
### 伪目标的执行动机传递吗？
t 依赖于 p，p 依赖于 d。
p 不是伪目标，也不是事实上的伪目标，d是伪目标。
如果伪目标传递，那么 t 一定会执行，
如果伪目标不传递，那么
### 事实上的伪目标传递吗？

## 02. Remake 发生的时机
```bash
# 1. 环境:
# Makefile 包含两个mk1和mk2 这两个makefile
# d1 d2 用来手动控制 mk1 和 mk2 的更新
[chenx@localhost rem]$ ls -a
.  ..  d1  d2  Makefile  mk1  mk2  Readme.md
[chenx@localhost rem]$ cat Makefile
include mk1 mk2

$(info INFO: MAKE_RESTARTS=${MAKE_RESTARTS})

main:
	@echo hello

mk1: d1
	@echo update mk1
	touch mk1
mk2: d2
	@echo update mk2, do nothing
# 2. touch d1,d2, 使得 mk1 mk2 发生更新
# 这时候, make 会发生一次 remake, 符合预期
[chenx@localhost rem]$ touch d1 d2
[chenx@localhost rem]$ make
INFO: MAKE_RESTARTS=
update mk2, do not
echo foo=ok >> mk2
update mk1
touch mk1
INFO: MAKE_RESTARTS=1
hello
# 3. 紧接着再次 make, 由于 mk1 和 mk2 都没有更新,
# 所以没有发生 remake.
# MAKE_RESTARTS 扩展结果是空字符串(empty string)
[chenx@localhost rem]$ make
INFO: MAKE_RESTARTS=
hello
# 4. 手动 touch d1, 使得 mk1 规则得到执行.
# mk1 的规则只是更新了 mk1 的时间戳,并没有实际
# 更新 mk1 的文件内容, 但仍然发生了 remake
[chenx@localhost rem]$ touch d1
[chenx@localhost rem]$ make
INFO: MAKE_RESTARTS=
update mk1
touch mk1
INFO: MAKE_RESTARTS=1
hello
# 5. 手动 touch d2, mk2 的规则得到了执行,但 mk2
# 的内容和时间戳都没有发生变化, 没有发生remake.
[chenx@localhost rem]$ touch d2
[chenx@localhost rem]$ make
INFO: MAKE_RESTARTS=
update mk2, do nothing
hello
# 6. 紧接着执行 make 命令, 仍然会执行 mk2 的规则
# 因为 d2 的时间戳比 mk2 新
[chenx@localhost rem]$ make
INFO: MAKE_RESTARTS=
update mk2, do nothing
hello
# 6. 手动touch mk2,使其时间戳比d2新
# 此时不会更新 mk2, 也没有发生remake
[chenx@localhost rem]$ touch mk2
[chenx@localhost rem]$ make
INFO: MAKE_RESTARTS=
hello

```
综上所述, 是否需要remake, 唯一的判定标准是 makefile 的时间戳。
需要reamek,当且仅当某个makefile的时间戳变得更新了.
无关文件内容是否实际变化, 无关相关的规则是否实际更新.
