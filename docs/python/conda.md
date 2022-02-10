# conda

<https://conda.io/docs/user-guide/install/index.html>

## 卸载
1. 删除整个anaconda目录: `rm -rf ~/anaconda3`
2. 清理 PATH 中的 conda 路径: 删除语句，或者注释语句 `export PATH=path/anaconda3/bin:$PATH`
    删除根目录下.bashrc文件中的anaconda行，和/etc/bash_profile等文件中的anaconda行
3. 删除 conda 配置文件(如果有的话), ~/.condarc
## opencv
需要使用CV2模块时, 使用 pip 安装 opencv-python

$  pip install opencv-python

不要用conda安装

$ conda install opencv # 不要这么安装.

这个命令能运行成功,但是安装后仍然不能导入cv2,这是conda的bug.

## 环境操作

<https://conda.io/docs/user-guide/tasks/manage-environments.html#cloning-an-environment>

### 创建新环境

```bash
$ conda create --help
# 默认, conda 在 conda 目录下的 envs/ 子目录下保存各个环境
# 创建一个名为 myenv 的新环境, -n 是 --name 的短格式.
$ conda -n myenv
# 此命令, 在 envs/ 下创建新环境
# 默认, 新环境中的python版本与当前python版本相同.

# 使用指定python版本创建新环境
$ conda create -n myenv python=3.4

# 在环境中安装指定的包
$ conda create -n myenv scipy
# or
$ conda create -n myenv
$ conda install scipy
# 安装特定版本的包
$ conda create -n myenv scipy=0.15.0
# or
$ conda create -n myenv
$ conda install scipy=0.15.0

# 创建环境时,指定python版本,并安装特定版本的包.
$ conda create -n myenv python=3.4 scipy=0.15.0 astroid babel

```
TIP: Install all the programs that you want in this environment at the same time. Installing 1 program at a time can lead to dependency conflicts.
### 从 environment.yml 文件创建环境

$ conda env create -f environment.yml

注: 创建 evironment.yml 的一种方式 `$ conda env export > environment.yml`
这条命令会 "Export your active environment to a new file:"

> You may want to share your environment with someone else—for example, so they can re-create a test that you have done. To allow them to quickly reproduce your environment, with all of its packages and versions, give them a copy of your environment.yml file.

### 删除环境: conda remove -n myenv --all

$ conda remove --name myenv --all
注: -n 是  --name 的短格式

--all                 Remove all packages, i.e., the entire environment.

注: conda remove 的用途是 "Remove a list of packages from a specified conda environment"
注: conda unstall  是 conda remove 的 alias.

### clone

    conda create --name myclone --clone myenv

- 查看环境

    $ conda info --envs
    或
    $ conda env list

- conda 删除环境
```bash
$ conda env remove --name <myenv>
$ conda remove --name <myenv> --all
```

conda remove <pkg>
conda list -v cv
\# conda list[opt] [regex]
