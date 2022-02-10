# Python包安装与虚拟环境管理

conda, anaconda
pip, virtualenv
python

## 关于conda和anaconda不可不知的误解和事实——conda必知必会

<https://blog.csdn.net/qsir/article/details/79354734>

- conda是包管理器和环境管理器; anaconda 是python的发行版,
- conda是通用的包管理器,不是专用于Python的,当然,用在Python上是绰绰有余的
- pip是专用于Python的包管理器
- pip和conda比较
    pip可以允许你在任何环境中安装python包，而conda允许你在conda环境中安装任何语言包（包括c语言或者python）。

    wheels只能跟踪python代码的依赖关系，conda可以跟踪很多c代码的依赖关系，
    这为许多用numpy和scipy做科学计算优化的科学家省了不少心。
- conda和anaconda没有必然联系
    可以不安装anaconda,同时安装conda
    $ pip install conda

- 归纳

    pip 和 virtual 专用于Python,可处理包及依赖关系,可创建虚拟Python环境
    conda 则可管理同样可以做这些,但是,涉及数据科学,机器学习这些具有多语言复杂依赖关系时, 只有用conda

## Conda

conda手册 <https://conda.io/docs/>
Conda介绍 <https://blog.csdn.net/koflance/article/details/78582737>

conda 包管理,依赖管理,环境管理,多语言,跨平台(Windows,Mac,Linux)
开始是为Python创建的,但可用于任何语言.
It was created for Python programs, but it can package and distribute software for any language.

conda有python3.x和python2.x系列两个版本，其实都没有关系，因为你在使用conda进行创建环境时，可以指定python的版本。

## conda 常用命令

[conda介绍](https://blog.csdn.net/koflance/article/details/78582737)

- 判断版本

    conda --version

    conda -V

- 如果要更新版本

    conda update conda

## pip 和 conda 配置清华源

<https://blog.csdn.net/xd_wjc/article/details/80588343>

```bash
xizhan@chenxizhan:~/pro/dsf-convert
$     conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
xizhan@chenxizhan:~/pro/dsf-convert
$     conda config --set show_channel_urls yes
xizhan@chenxizhan:~/pro/dsf-convert
```

## pip 命令

Installing Python Modules <https://docs.python.org/2/installing/index.html>
Python Packaging User Guide <https://packaging.python.org/>

### 基础

The standard packaging tools are all designed to be used from the command line.
pip 是Python专用的包管理工具,自 Python 2.7.9
virtualenv 是第三方工具, 用来创建虚拟环境.
Python Packaging Index - 开源python包仓库.

### 基本用法

```bash
# install the latest version of a module and its dependencies from the Python Packaging Index
$ python -m pip install SomePackage

# 指定版本限制
# 有特殊含义的bash字符,>,< 等,需要用双引号括起
$ python -m pip install SomePackage==1.0.4    # specific version
$ python -m pip install "SomePackage>=1.0.4"  # minimum version

# if a suitable module is already installed, attempting to install it again will have no effect. Upgrading existing modules must be requested explicitly:
$ python -m pip install --upgrade SomePackage
```

- install packages just for the current user?
    Passing the --user option to python -m pip install wil
- install scientific Python packages?
    pip 干不了,换其他方式.
- work with multiple versions of Python installed in parallel?
    ```bash
    # linux, Mac OS
    python2   -m pip install SomePackage  # default Python 2
    python2.7 -m pip install SomePackage  # specifically Python 2.7
    python3   -m pip install SomePackage  # default Python 3
    python3.4 -m pip install SomePackage  # specifically Python 3.4

    # (appropriately versioned pip commands may also be available)

    # On Windows, use the py Python launcher in combination with the -m switch:

    py -2   -m pip install SomePackage  # default Python 2
    py -2.7 -m pip install SomePackage  # specifically Python 2.7
    py -3   -m pip install SomePackage  # default Python 3
    py -3.4 -m pip install SomePackage  # specifically Python 3.4
    ```

## virtualenv

[官网文档](https://virtualenv.pypa.io/en/stable/)
[安装](https://virtualenv.pypa.io/en/stable/installation/)
[命令行](https://virtualenv.pypa.io/en/stable/reference/)
# 在项目中如何使用虚拟环境？
[python入门系列：Python使用虚拟环境_项目](https://www.sohu.com/a/294913125_120050566)
