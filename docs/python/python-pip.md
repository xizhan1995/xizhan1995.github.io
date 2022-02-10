# python pip
## 命令行安装pip

<https://packaging.python.org/guides/installing-using-linux-tools/>
<https://packaging.python.org/tutorials/installing-packages/#requirements-for-installing-packages>
<https://gitbook.cn/gitchat/geekbook/5ae93a10b02ff82d0d1aa7dc/topic/5ae96ee0b02ff82d0d1ad4dd#21>

- 万能的方式
    下载 [get-pip.py](https://bootstrap.pypa.io/get-pip.py) 文件,然后运行
    $ python get-pip.py
    如此,便可安装上 pip, 这还会顺带安装上 setuptools 和 wheel.
- linux, python 2.7
    $ sudo apt-get install python-pip python-dev python-virtualenv
- linux, python 3
    $ sudo apt-get install python3-pip python3-dev python3-virtualenv
- mac OS
    $ sudo easy_install pip
    $ pip install --upgrade  virtualenv

## 一些其它安装实例

<https://blog.csdn.net/yuyezhulan/article/details/42468725>

```bash
# wget "https://pypi.python.org/packages/source/p/pip/pip-1.5.4.tar.gz#md5=834b2904f92d46aaa333267fb1c922bb" --no-check-certificate

# 1.2 pip安装
# tar -xzvf pip-1.5.4.tar.gz
# cd pip-1.5.4
# python setup.py install
```
## 使用示例

https://pip.pypa.io/en/stable/user_guide/
https://virtualenv.pypa.io/en/stable/
https://docs.python.org/3/library/venv.html

## pip 换源

临时使用 pip 清华源
$ pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
## Installing Python Modules
出处  Python » Documentation » Installing Python Modules
https://docs.python.org/3/installing/index.html

As a popular open source development project, Python has an active supporting community of
contributors and users that also make their software available for other Python developers
to use under open source license terms.
作为一个流行的开源开发项目，python有一个由贡献者和用户组成的活跃的支持社区，这也使得其他python开发
人员可以在开源许可条款下使用他们的软件。

This allows Python users to share and collaborate effectively, benefiting from the
solutions others have already created to common (and sometimes even rare!) problems, as
well as potentially contributing their own solutions to the common pool.

这使得python用户能够有效地共享和协作，受益于其他人已经创建的公共解决方案（有时甚至很少！）问题，
以及可能为公共池贡献自己的解决方案。

This guide covers the installation part of the process. For a guide to creating and
sharing your own Python projects, refer to the [distribution guide][1]
本指南涵盖了安装过程的一部分。有关创建和共享自己的Python项目的指南，请参阅发行指南。

Note:
For corporate and other institutional users, be aware that many organisations have their
own policies around using and contributing to open source software. Please take such
policies into account when making use of the distribution and installation tools provided
with Python.
注意
对于公司和其他机构用户，请注意许多组织都有自己的政策来使用和贡献开源软件。在使用随python提供的分发和安装工具时，请考虑这些策略。

[1]: https://docs.python.org/3/distributing/index.html#distributing-index

## ...

python package index

如何解决Python包依赖问题
http://baijiahao.baidu.com/s?id=1601580030242266126&wfr=spider&for=pc
pip freeze > requirements.txt这个命令可能是很多同学用来输出依赖的命令, 但它输出的是当前环境下(笔者默认你使用的是Python的虚拟环境)的所有包, 也就是输出当前你安装的全
通过pipreqs库输出依赖

如这个库的名称所示, 就是为了方便管理依赖而生.

与pip直接导出全部不同, pipreqs只导出指定项目下Python文件import的库
```py
pip install pipreqs
# 切换到项目目录
# # 输出requirements.txt到项目根目录下
pipreqs --use-local./
```

### 版本说明

https://www.python.org/dev/peps/pep-0440/#version-specifiers


    ~=: Compatible release clause
    ==: Version matching clause
    !=: Version exclusion clause
    <=, >=: Inclusive ordered comparison clause
    <, >: Exclusive ordered comparison clause
    ===: Arbitrary equality clause.

The comma (",") is equivalent to a logical and operator: a candidate version must match all given version clauses in order to match the specifier as a whole.
Whitespace between a conditional operator and the following version identifier is optional, as is the whitespace around the commas.

docopt == 0.6.1             # Version Matching. Must be version 0.6.1
keyring >= 4.1.1            # Minimum version 4.1.1
coverage != 3.5             # Version Exclusion. Anything except version 3.5
Mopidy-Dirble ~= 1.1        # Compatible release. Same as >= 1.1, == 1.*

SomeProject
SomeProject == 1.3
SomeProject >=1.2,<.2.0
SomeProject[foo, bar]
SomeProject~=1.4.2

pip install "SomeProject"

To install a specific version:

pip install "SomeProject==1.4"

To install greater than or equal to one version and less than another:

pip install "SomeProject>=1,<2"

To install a version that’s “compatible” with a certain version: [4]

pip install "SomeProject~=1.4.2"

## 升级 pip
使用清华源：
```
python -m pip install -i https://pypi.tuna.tsinghua.edu.cn/simple  pip --upgrade
```
## 配置pip
```bash
# python -m pip config -v list
For variant 'global', will try loading '/etc/xdg/pip/pip.conf'
For variant 'global', will try loading '/etc/pip.conf'
For variant 'user', will try loading '/root/.pip/pip.conf'
For variant 'user', will try loading '/root/.config/pip/pip.conf'
For variant 'site', will try loading '/usr/pip.conf'

```
### 使用 pip config 命令设置镜像
python -m pip config -v set --global global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

### pip 配置文件的格式

The names of the settings are derived from the long command line option, e.g. if you want to use a different package index (--index-url) and set the HTTP timeout (--default-timeout) to 60 seconds your config file would look like this:
```ini
[global]
timeout = 60
index-url = https://download.zope.org/ppix
```
Each subcommand can be configured optionally in its own section so that every global setting with the same name will be overridden; e.g. decreasing the timeout to 10 seconds when running the freeze (pip freeze) command and using 60 seconds for all other commands is possible with:
```ini
[global]
timeout = 60

[freeze]
timeout = 10

```
