# Python Packaging User Guide
[Python Packaging User Guide — Python Packaging User Guide](https://packaging.python.org/)

## Overview

这一章, 理清了pip,virtualenv, conda, docker 之间的脉络, 说明了各自的适用范围, 讲述了它们的兴衰更替.

在写代码之前,就考虑号项目将来的运行环境, 虽然奇怪, 但可以避免未来的许多麻烦.

### 思考如下问题

项目给谁用? 用在开发环境中,还是直接是一个最终的应用(application)
在什么设备上运行? 服务器,桌面机,手机,单片机?
PyPI, setup.py, and wheel

### Python的打包工具和库
Packaging Python libraries and tools

the tools Python’s ecosystem provides for distributing Python code to developers.
PyPI, setup.py, and wheel files. 都是常用的工具/手段

- Python 模块

    单个python文件, 是共享简单脚本和代码段的绝佳方式.
    要求这文件 1). 只依赖python标准库 2).共享者之间的Python版本要兼容.
    这中方式不适用于如下情况: 项目由多个文件构成的; 项目依赖了额外的库的; 项目要求某个特定版本的Python的;

- Python源代码发布

    用Python原生的打包工具创建 source distribution package(简称sdist)
    比直接分发python文件更进一步;
    要求:项目由纯粹的Python代码构成; 项目不依赖任何非Python包;
    这种发布一般是 .tar.gz 或 .tgz 格式的

    如果项目中用到了非Python代码,或者依赖了非Python包,那么这种方式就不行了.

- 二进制发布(Python binary distributions)

    Python的一个强大之处在于,可以非常容易的集成其它语言写出的库,如C,C++,Rust,Fortran.
    但是,并不是所有的开发者都合适的工具和能力编译这些其它语言的库.
    所以,Python创建了 wheel, 这种格式的发布版, 把所依赖的库都预编译好了.
    注: wheel, 是 egg 格式的替代者. 目前,pip支持 wheel.

    建议,在发布 wheel 的同时, 把 sdist 版本一同发布. 如果用户找不到适合他们的系统的 wheel, 仍然可以
    从 sdist 发布手动编译.

### Packaging Python applications

Python的原生打包工具,其目标是在开发者之间共享代码(称之为库)
Python’s native packaging is mostly built for distributing reusable code, called libraries, between developers.

Libraries are building blocks, not complete applications.

1. PEX         -- libraries included    -- Depending on a pre-installed Python
2. anaconda    -- python echosystem     -- Depending on a separate software distribution ecosystem
3. freezers    -- python included       --  Bringing your own Python executable
4. images      -- system libraries include
5. containers  -- sandbox images        -- Bringing your own userspace
6. vritual machine -- kernel included   -- Bringing your own kernel
7. hardware    -- plug and play

#### Depending on a pre-installed Python

#### Depending on a separate software distribution ecosystem

    Anaconda is built around Python and is increasingly common in academic, analytical, and other data-oriented environments,

#### your own Python executable

There are many techniques and technologies which turn your Python program into one of these formats, most of which involve embedding the Python interpreter and any other dependencies into a single executable file.

This approach, called freezing, offers wide compatiblity and seamless user experience, though often requires multiple technologies, and a good amount of effort.

A selection of Python freezers:

    pyInstaller - Cross-platform <http://www.pyinstaller.org/>
    cx_Freeze - Cross-platform
    constructor - For command-line installers
    py2exe - Windows only
    py2app - Mac only
    bbFreeze - Windows, Linux, Python 2 only
    osnap - Windows and Mac
    pynsist - Windows only

Most of the above imply single-user deployments. For multi-component server applications, see Chef Omnibus.
附: 用 pyinstaller 打包发布 exe 文件的教程
    <https://jingyan.baidu.com/article/a378c960b47034b3282830bb.html>

#### Bringing your own userspace -- 类似 docker

称之为:operating-system-level virtualization, or containerization.

package whole OS filesystems, not just Python or Python packages.

AppImage
Docker
Flatpak
Snapcraft

摘自wiki: Operating-system-level virtualization, also known as containerization, refers to an operating system feature in which the kernel allows the existence of multiple isolated user-space instances. Such instances, called containers,[1] partitions, virtualization engines (VEs) or jails (FreeBSD jail or chroot jail), may look like real computers from the point of view of programs running in them.

#### Bringing your own kernel    -- 虚拟机

#### Bringing your own hardware

This way, your software’s user would require only electricity.

#### Think about

- Operating system packages
    许多操作系统自带包管理软件. 如果你对该OS的包管理软件特别熟悉,可以用它们代替Python的包管理软件.
- virtualenv
    这曾是 Python 开发者不可或缺的工具. 但现在正在淡出视野,因为它们被打包到了更高层的工具中.

    For production deployments, do not rely on running pip install from the Internet into a virtualenv, as one might do in a development environment. The overview above is full of much better solutions.

## Tutorials  -- 使熟悉 Python packagin 的概念

### Installing Packages: pip install <package>

此包非彼包

It’s important to note that the term “package” in this context is being used as a synonym for a distribution (i.e. a bundle of software to be installed), not to refer to the kind of package that you import in your Python source code (i.e. a container of modules).

#### 前置条件 -- 最新版的 python 和 pip

- Ensure you can run Python from the command line
    $ python --version
    Python 2.7.11 :: Continuum Analytics, Inc.
    $ python -V
    Python 2.7.11 :: Continuum Analytics, Inc.

    You should get some output like Python 3.6.3. If you do not have Python, please install the latest 3.x version

    注: 如果不是在虚拟环境中, 用 python3 代替 pytho, 用 pip3 代替 pip

    注: 如果遇到权限不足的错误,不要使用sudo,而应该切换到虚拟环境中.
- Ensure you can run pip from the command line
    $ pip --version
    pip 10.0.1 from /home/xizhan/.local/lib/python2.7/site-packages/pip (python 2.7)
    $ pip -V
    pip 10.0.1 from /home/xizhan/.local/lib/python2.7/site-packages/pip (python 2.7)

    如果上面的命令失败, 首先尝试从 python 标准库启动 pip
    $ python -m ensurepip --default-pip
    若是不行,就下载 [get-pip.py](https://bootstrap.pypa.io/get-pip.py) 文件,然后运行
    $ python get-pip.py
    如此,便可安装上 pip, 这还会顺带安装上 setuptools 和 wheel.

    注: 从源码安装的python都会自带安装pip; 但 linux 系统上,用包管理器(apt,yum)安装的 python,可能需要手动安装pip.
    注: 如果是 linux 系统,可以不必下载 get-pip.py, 直接用系统包管理器(apt, yum)安装 pip 也是可以的, 例如
        sudo apt install python-pip                 # Python 2
        sudo apt install python3-venv python3-pip   # Python 3
- Ensure pip, setuptools, and wheel are up to date

While pip alone is sufficient to install from pre-built binary archives, up to date copies of the setuptools and wheel projects are useful to ensure you can also install from source archives:

$ python -m pip install --upgrade pip setuptools wheel

- Optionally, create a virtual environment

here’s the basic venv [3] command to use on a typical Linux system:

$ python3 -m venv tutorial_env
$ source tutorial_env/bin/activate

This will create a new virtual environment in the tutorial_env subdirectory, and configure the current shell to use it as the default python environment.

#### Creating Virtual Environments

每个Python虚拟环境中安装的包都与其它虚拟环境相互独立.

Python “Virtual Environments” allow Python packages to be installed in an isolated location for a particular application, rather than being installed globally.

都往全局库目录放,不同版本会混乱的.
而且, 也有可能, 你没有在中央仓库写入包的权限.

创建的虚拟的环境的工具有两个: Py3.3 的 venv 和 Py2.7 的 virtualenv

venv is available by default in Python 3.3 and later, and installs pip and setuptools into created virtual environments in Python 3.4 and later.
virtualenv needs to be installed separately, but supports Python 2.7+ and Python 3.3+, and pip, setuptools and wheel are always installed into created virtual environments by default (regardless of Python version).

Windows 和 Linux 的 source 命令之差别
In both of the above cases, Windows users should _not_ use the source command, but should rather run the activate script directly from the command shell. The use of source under Unix shells ensures that the virtual environment’s variables are set within the current shell, and not in a subprocess (which then disappears, having no useful effect).

直接操作虚拟环境很乏味,所以有个更高级一点的工具:  Pipenv -- that automatically manages a separate virtual environment for each project and application that you work on.

#### Use pip for Installing

pip is the recommended installer.

#### Installing from PyPI

The most common usage of pip is to install from the Python Package Index using a requirement specifier.
[完整语法](https://www.python.org/dev/peps/pep-0440#version-specifiers)

实例:
To install the latest version of “SomeProject”:

$ pip install 'SomeProject'

To install a specific version:

$ pip install 'SomeProject==1.4'

To install greater than or equal to one version and less than another:

$ pip install 'SomeProject>=1,<2'

To install a version that’s “compatible” with a certain version: [4]

$ pip install 'SomeProject~=1.4.2'

In this case, this means to install any version “==1.4.*” version that’s also “>=1.4.2”.

#### Source Distributions vs Wheels

pip 同时支持源码与wheel
二者同时可用时,pip 优先选择 wheel
wheel 不可用时, pip 使用 源码发行版,并自动编译它,
pip 会缓存编译结果,以备后用

pip can install from either Source Distributions (sdist) or Wheels, but if both are present on PyPI, pip will prefer a compatible wheel.

If pip does not find a wheel to install, it will locally build a wheel and cache it for future installs, instead of rebuilding the source distribution in the future.

- Upgrading packages: pip install --upgrade SomeProject

    Upgrade an already installed SomeProject to the latest from PyPI.

- Installing to the User Site: $ pip install --user SomeProject

    使用  --user 标志, 则安装在用户范围内,而不是系统全局安装

    但,在虚拟环境中, --user 标志无任何效果.

    Note that the --user flag has no effect when inside a virtual environment - all installation commands will affect the virtual environment.

- Requirements files

    $ pip freeze > requirements.txt
    $ pip install -r requirements.txt

-  Installing from other Indexes

    Install from an alternate index

    $ pip install --index-url http://my.package.repo/simple/ SomeProject

    注: -i 是 --index-url 的短格式

    Search an additional index during install, in addition to PyPI

    $ pip install --extra-index-url http://my.package.repo/simple SomeProject

    注: --extra-index-url 没有短格式

- Installing from a local src tree: pip install <path>

    Installing from local src in Development Mode, i.e. in such a way that the project appears to be installed, but yet is still editable from the src tree.

    $ pip install -e <path>

    注: -e, --editable <path/url> Install a project in editable mode (i.e. setuptools "develop mode")
    from a local project path or a VCS url

    You can also install normally from src

    $ pip install <path>


- Installing from local archives

    Install a particular source archive file.

    $ pip install ./downloads/SomeProject-1.0.4.tar.gz

    Install from a local directory containing archives (and don’t check PyPI)

    $ pip install --no-index --find-links=file:///local/dir/ SomeProject
    $ pip install --no-index --find-links=/local/dir/ SomeProject
    $ pip install --no-index --find-links=relative/dir/ SomeProject

- Installing from other sources

    To install from other data sources (for example Amazon S3 storage) you can create a helper application that presents the data in a PEP 503 compliant index format, and use the --extra-index-url flag to direct pip to use that index.

    ./s3helper --port=7777
    $ pip install --extra-index-url http://localhost:7777 SomeProject

### Managing Application Dependencies: pipenv

使用 pip 很方便,但还可以更方便.

#### Installing Pipenv: pip install --user pipenv

Use pip to install Pipenv:

pip install --user pipenv

pip 对于个人使用是足够的, 而 pipenv 则更适合多人协作时使用;
pipenv 大致相当于 Node.js 的 npm, Ruby 的 bundler

#### Installing packages for your project

Pipenv manages dependencies on a per-project basis. To install packages, change into your project’s directory (or just an empty directory for this tutorial) and run:

$ cd myproject
$ pipenv install requests

...
### Packaging Project
创建演示项目example_pkg，并把它发布到 pypi 上。

目录结构, 先搭个框架
```
packaging_tutorial
└── example_pkg
    └── __init__.py
```

然后补上打包需要的其它文件：

You will now create a handful of files to package up this project and prepare it for distribution. Create the new files listed below and place them in the project’s root directory - you will add content to them in the following steps.
```
packaging_tutorial
├── LICENSE
├── README.md
├── example_pkg
│   └── __init__.py
├── setup.py
└── tests
```

#### tests/ 存放测试文件，对于我们这个演示项目，让他空着就行。
#### setup.py
是写给 setuptools 用的构建脚本。
把这段代码放到setup.py 里面，
```py
import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="example-pkg-YOUR-USERNAME-HERE", # Replace with your own username
    version="0.0.1",
    author="Example Author",
    author_email="author@example.com",
    description="A small example package",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/pypa/sampleproject",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
```
把用户名替换成自己的名字，防止与别的按此教程操作的人产生冲突。
#### Readme
```md
# Example Package

This is a simple example package. You can use
[Github-flavored Markdown](https://guides.github.com/features/mastering-markdown/)
to write your content.


```
#### Liscense
#### 构建
```sh
python3 -m pip install --user --upgrade setuptools wheel
python3 setup.py sdist bdist_wheel
```

最终会生成这样一个目录
```
dist/
  example_pkg_YOUR_USERNAME_HERE-0.0.1-py3-none-any.whl
  example_pkg_YOUR_USERNAME_HERE-0.0.1.tar.gz
```

.gz 文件是源码发布，.whl 是预编译版本。
现代的 pip 版本优先选择预编译版本，当无合使的预编译版时会回退至源码包。

The tar.gz file is a Source Archive whereas the .whl file is a Built Distribution. Newer pip versions preferentially install built distributions, but will fall back to source archives if needed.

You should always upload a source archive and provide built archives for the platforms your project is compatible with. In this case, our example package is compatible with Python on any platform so only one built distribution is needed.
#### 上传安装包
1. 在 testpypi 上创建账号 https://test.pypi.org/account/register/
1. 安装上传工具 twine `python3 -m pip install --user --upgrade twine`
2. 上传到  testpypi 上 `python3 -m twine upload --repository testpypi dist/*`
上传开始，会提示输入账号和密码
#### 测试：安装你刚才上传的包
```sh
python3 -m pip install --index-url https://test.pypi.org/simple/ \
    --no-deps example-pkg-YOUR-USERNAME-HERE

python3 -m example_pkg
```

#### package 和 package
1. 打包发布的包（package）是在 setup.py 中设置的 name 属性，也是 pip install <package> 中的名字
2. import <package> 中的 package 则是python模块，安装这个 package 后，实际包含的模块名。
3. Q. 那我想可能会发布多个package，想让他们有共同的父级模块名，应该如何实现？

### Packaging namespace packages
Native namespace packages

Python 3.3 added implicit namespace packages from PEP 420. All that is required to create a native namespace package is that you just omit `__init__.py` from the namespace package directory. An example file structure:
```py
setup.py
mynamespace/
    # No __init__.py here.
    subpackage_a/
        # Sub-packages have __init__.py.
        __init__.py
        module.py


```

Because mynamespace doesn’t contain an `__init__.py`, setuptools.find_packages() won’t find the sub-package. You must use setuptools.find_namespace_packages() instead or explicitly list all packages in your setup.py. For example:
```py
from setuptools import setup, find_namespace_packages

setup(
    name='mynamespace-subpackage-a',
    ...
    packages=find_namespace_packages(include=['mynamespace.*'])
)
```
