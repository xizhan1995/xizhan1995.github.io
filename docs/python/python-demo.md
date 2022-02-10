# python 实际案例
## 读取 Excel
2022-02-07
### 使用 openpyxl 读取单元格的值，如果单元格是公式，读取到的也是公式，而不是公式的计算结果。

::: details python 代码片段

```python
def f01(inputs: Sequence[Str], output: Str) -> None:
    """
    提取单日数据，合并到一个文件中
    """
    for input in inputs:
        # 打开Excel文件
        wb = openpyxl.load_workbook(input)
        # 取第一个sheet页
        sh = wb["Sheet1"]
        # 载入这一页的数据，并附加到 data.rows 上面
        rows = load_sheet(sh)

    print(rows)

def load_sheet(sh) -> List[Row]:
    """ 读取一张sheet页内的数据
    TODO: 金额，默认的数据类型精度够吗？
    """

    rows=[]
    for r in sh.iter_rows(min_row=4, max_row=15, max_col=11, values_only = True):
        row = Row(*r)
        rows.append(row)

    return rows
```
:::
::: details 命令行
```bash
$ python3 f01.py src.txt test.xlsx
:::
::: details 输出结果
```
<
  item_name=电票其他
  count_day=184
  count_month=1443
  count_year=95241
  count_last_year=93311
  count_year_growth==(D14-E14)/E14
  amount_day=0.9521458229
  amount_month=5.770168254499997
  amount_year=2527.8368459124013
  amount_last_year=6688.756932915593
  amount_year_growth==(I14-J14)/J14
>
```
:::
如果我们希望读取到公式计算出来的结果，可以使用load_workbook()中的data_only属性。
另外，read_only用于打开一个大空间的xlsx文件。
- read_only (bool) – optimised for reading, content cannot be edited
- data_only (bool) – controls whether cells with formulae have either the formula (default) or the value stored the last time Excel read the sheet

把打开 Excel 文件的代码更改为如下：杰克
```python
# 打开Excel文件
wb = openpyxl.load_workbook(input, read_only=True, data_only=True)
```
## 常见Excel库对比
2022-02-09
- xlwt xlrd：xlrd读取，xlwt写入，支持 97/2000/XP/2003 xls文件；
- pandas   ：数据处理是 pandas 的立身之本，Excel 作为 pandas 输入/输出数据的容器。新建文档需要依赖其他库
- openpyxl ：功能较强：一款比较综合的工具。支持读写Excel 2010文档，不支持更早版本。是理Excel复杂问题的首选库函数

## openpyxl 库
2022-02-08

[openpyxl 3.0.9 documentation](https://openpyxl.readthedocs.io/en/stable/)
[Python利用openpyxl来操作Excel（一） - 知乎](https://zhuanlan.zhihu.com/p/51292549)

- workbook： 工作簿，一个excel文件包含多个sheet。
- worksheet：工作表，一个workbook有多个，表名识别，如“sheet1”,“sheet2”等。
- cell： 单元格，存储数据对象
