import{e as n}from"./app.11a37516.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h1 id="make-\u5982\u4F55\u5224\u65AD\u67D0\u4E2A\u76EE\u6807\u662F\u5426\u9700\u8981\u66F4\u65B0-\u4EE5\u53CA\u662F\u5426\u9700\u8981\u6267\u884C\u76EE\u6807\u7684recipe" tabindex="-1"><a class="header-anchor" href="#make-\u5982\u4F55\u5224\u65AD\u67D0\u4E2A\u76EE\u6807\u662F\u5426\u9700\u8981\u66F4\u65B0-\u4EE5\u53CA\u662F\u5426\u9700\u8981\u6267\u884C\u76EE\u6807\u7684recipe" aria-hidden="true">#</a> make \u5982\u4F55\u5224\u65AD\u67D0\u4E2A\u76EE\u6807\u662F\u5426\u9700\u8981\u66F4\u65B0\uFF0C\u4EE5\u53CA\u662F\u5426\u9700\u8981\u6267\u884C\u76EE\u6807\u7684recipe</h1><p>2021-02-04 20:45:24</p><p>\u5148\u8BA8\u8BBA\u5E38\u7528\u573A\u666F\uFF0C\u4F2A\u76EE\u6807\uFF0C\u8FD9\u5C31\u80FD\u8986\u76D6\u7EDD\u5927\u591A\u6570\u573A\u666F\u3002 \u7136\u540E\u8BA8\u8BBA\u5404\u79CD\u4F8B\u5916\u60C5\u5F62\u3002</p><h2 id="\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#\u89C4\u5219" aria-hidden="true">#</a> \u89C4\u5219</h2><div class="language-makefile ext-makefile line-numbers-mode"><pre class="language-makefile"><code><span class="token comment"># \u901A\u7528\u8BED\u6CD5</span>
<span class="token symbol">targets</span> <span class="token punctuation">:</span> prerequisites
        recipe
        \u2026
<span class="token comment"># \u6216\u8005\uFF1A</span>
<span class="token symbol">targets</span> <span class="token punctuation">:</span> prerequisites <span class="token punctuation">;</span> recipe
        recipe
        \u2026

<span class="token comment"># \u4E00\u4E2A\u5B9E\u4F8B</span>
<span class="token symbol">foo</span><span class="token punctuation">:</span> bar baz
    cat baz bar &gt; foo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u4E00\u6761\u89C4\u5219\u544A\u8BC9 make \u4E24\u4EF6\u4E8B\uFF1A\u600E\u6837\u7B97\u201C\u8FC7\u671F&quot;\uFF0C\u201C\u8FC7\u671F\u201D\u540E\u600E\u6837\u66F4\u65B0\u3002</p><ul><li>A rule tells make two things: when the targets are out of date, and how to update them when necessary.</li></ul><p>\u5F53\u540D\u4E3A target \u7684\u6587\u4EF6\u4E0D\u5B58\u5728\uFF0C\u6216\u8005\u6BD4\u4EFB\u610F\u4E00\u4E2A\u4F9D\u8D56\u6587\u4EF6\u65E7\u7684\u65F6\u5019\uFF0C\u5C31\u79F0\u6587\u4EF6 target \u8FC7\u671F\u3002 \u8FC7\u671F\u540E\uFF0C\u901A\u8FC7\u6267\u884C \u6267\u884C recipe \u66F4\u65B0 target\u3002</p><p>\u4F8B\u5916\u60C5\u5F62\uFF1A</p><ol><li>\u5982\u679C\u6CA1\u6709\u4EFB\u4F55\u4F9D\u8D56\uFF0C\u600E\u4E48\u7B97\uFF1F &quot;target \u8FC7\u671F&quot; iff &quot;\u4E0D\u5B58\u5728\u540D\u4E3A target \u7684\u6587\u4EF6&quot;</li><li>\u5982\u679Crecipe\u538B\u6839\u4E0D\u4EA7\u751F\u540D\u4E3Atarget\u7684\u6587\u4EF6\u600E\u4E48\u7B97\uFF1F \u90A3\u8FD9\u662F\u4E8B\u5B9E\u4E0A\u7684\u4F2A\u76EE\u6807</li><li>\u5982\u679C\u89C4\u5219 r1 \u7684 target \u7684\u67D0\u4E2A\u4F9D\u8D56\u672C\u8EAB\u662F\u53E6\u4E00\u4E2A\u89C4\u5219\uFF08r2\uFF09\u7684target\uFF0C\u600E\u4E48\u7B97\uFF1F</li><li>\u63A53\uFF0C\u66F4\u8FDB\u4E00\u6B65\u5982\u679C r2 \u672C\u8EAB\u4E5F\u5904\u5728\u7279\u6B8A\u60C5\u5F62 1 \u6216 2\uFF0C\u90A3\u4E48 r1 \u7684 target \u662F\u5426\u8FC7\u671F\uFF0C\u600E\u4E48\u7B97\uFF1F</li><li>\u63A54\uFF0C\u5982\u679C\u89C4\u5219 r0 \u7684\u67D0\u4E2A\u4F9D\u8D56\u662F r1\uFF0C\u8FD9\u79CD\u60C5\u5F62\u4E0B\uFF0Cr0 \u7684target\u662F\u5426\u8FC7\u671F\uFF0C\u600E\u4E48\u5224\u65AD\uFF1F</li></ol><h2 id="\u5E38\u89C4\u573A\u666F-\u6587\u4EF6\u4F9D\u8D56\u4E0E\u66F4\u65B0\u4EE5\u53CA\u591A\u7EA7\u66F4\u65B0" tabindex="-1"><a class="header-anchor" href="#\u5E38\u89C4\u573A\u666F-\u6587\u4EF6\u4F9D\u8D56\u4E0E\u66F4\u65B0\u4EE5\u53CA\u591A\u7EA7\u66F4\u65B0" aria-hidden="true">#</a> \u5E38\u89C4\u573A\u666F\uFF1A\u6587\u4EF6\u4F9D\u8D56\u4E0E\u66F4\u65B0\u4EE5\u53CA\u591A\u7EA7\u66F4\u65B0</h2><div class="language-makefile ext-makefile line-numbers-mode"><pre class="language-makefile"><code>objects <span class="token operator">=</span> main.o kbd.o command.o display.o \\
          insert.o search.o files.o utils.o

<span class="token symbol">edit</span> <span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>objects<span class="token punctuation">)</span>
        cc -o edit <span class="token variable">$</span><span class="token punctuation">(</span>objects<span class="token punctuation">)</span>
<span class="token symbol">main.o</span> <span class="token punctuation">:</span> main.c defs.h
        cc -c main.c
<span class="token symbol">kbd.o</span> <span class="token punctuation">:</span> kbd.c defs.h command.h
        cc -c kbd.c
<span class="token symbol">command.o</span> <span class="token punctuation">:</span> command.c defs.h command.h
        cc -c command.c
<span class="token symbol">display.o</span> <span class="token punctuation">:</span> display.c defs.h buffer.h
        cc -c display.c
<span class="token symbol">insert.o</span> <span class="token punctuation">:</span> insert.c defs.h buffer.h
        cc -c insert.c
<span class="token symbol">search.o</span> <span class="token punctuation">:</span> search.c defs.h buffer.h
        cc -c search.c
<span class="token symbol">files.o</span> <span class="token punctuation">:</span> files.c defs.h buffer.h command.h
        cc -c files.c
<span class="token symbol">utils.o</span> <span class="token punctuation">:</span> utils.c defs.h
        cc -c utils.c
<span class="token symbol">clean</span> <span class="token punctuation">:</span>
        rm edit <span class="token variable">$</span><span class="token punctuation">(</span>objects<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="\u5E38\u89C4\u573A\u666F-\u4F5C\u4E3A\u52A8\u4F5C\u7684\u76EE\u6807\u4E0E\u4F2A\u76EE\u6807" tabindex="-1"><a class="header-anchor" href="#\u5E38\u89C4\u573A\u666F-\u4F5C\u4E3A\u52A8\u4F5C\u7684\u76EE\u6807\u4E0E\u4F2A\u76EE\u6807" aria-hidden="true">#</a> \u5E38\u89C4\u573A\u666F\uFF1A\u4F5C\u4E3A\u52A8\u4F5C\u7684\u76EE\u6807\u4E0E\u4F2A\u76EE\u6807</h2><div class="language-makefile ext-makefile line-numbers-mode"><pre class="language-makefile"><code><span class="token symbol">all</span><span class="token punctuation">:</span> foo bar
<span class="token symbol">rebuild</span><span class="token punctuation">:</span> clean all

<span class="token symbol">foo</span><span class="token punctuation">:</span> foo.c foo.h
    gcc foo.c -o foo
<span class="token symbol">bar</span><span class="token punctuation">:</span> bar.c
    gcc bar.c -o bar

<span class="token symbol">clean</span> <span class="token punctuation">:</span>
        rm edit
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\uFF0Cclean\uFF0Call\uFF0Crebuild \u90FD\u4E0D\u5BF9\u5E94\u4EFB\u4F55\u6587\u4EF6\uFF0C\u5B83\u4EEC\u4EC5\u4EC5\u7528\u6765\u8868\u793A\u8981\u6267\u884C\u7684\u52A8\u4F5C\u3002 \u4E0D\u5BF9\u5E94\u6587\u4EF6\u7684\u76EE\u6807\u53EB\u505A\u4F2A\u76EE\u6807\uFF0C\u8FD9\u91CC\uFF0C\u662F\u4E0D\u662F\u4F2A\u76EE\u6807\uFF0C\u662F\u6211\u4EEC\u7F16\u5199\u89C4\u5219\u7684\u65F6\u5019\u81EA\u5DF1\u5FC3\u91CC\u6709\u6570\uFF0Cmake \u5E76\u4E0D\u80FD\u77E5\u9053\u3002</p><p>\u4E3A\u4E86\u66F4\u660E\u786E\u7684\u8868\u8FBE\u8FD9\u4E00\u610F\u56FE\uFF0C\u4F7F\u7528\u7279\u6B8A\u76EE\u6807 .PHONY \u8BBE\u7F6E\u4F2A\u76EE\u6807\u3002</p><div class="language-makefile ext-makefile line-numbers-mode"><pre class="language-makefile"><code><span class="token symbol">all</span><span class="token punctuation">:</span> foo bar
<span class="token symbol">rebuild</span><span class="token punctuation">:</span> clean all

<span class="token symbol">foo</span><span class="token punctuation">:</span> foo.c foo.h
    gcc foo.c -o foo
<span class="token symbol">bar</span><span class="token punctuation">:</span> bar.c
    gcc bar.c -o bar

<span class="token symbol">clean</span> <span class="token punctuation">:</span>
        rm edit

<span class="token builtin">.PHONY</span><span class="token punctuation">:</span> clean all rebuild
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="\u53E6\u4E00\u573A\u666F-\u4EC5\u5F53\u76EE\u5F55\u4E0D\u5B58\u5728\u65F6\u521B\u5EFA\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u53E6\u4E00\u573A\u666F-\u4EC5\u5F53\u76EE\u5F55\u4E0D\u5B58\u5728\u65F6\u521B\u5EFA\u76EE\u5F55" aria-hidden="true">#</a> \u53E6\u4E00\u573A\u666F\uFF1A\u4EC5\u5F53\u76EE\u5F55\u4E0D\u5B58\u5728\u65F6\u521B\u5EFA\u76EE\u5F55</h2><div class="language-makefile ext-makefile line-numbers-mode"><pre class="language-makefile"><code>OBJDIR <span class="token operator">:=</span> objdir
OBJS <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>addprefix <span class="token variable">$</span><span class="token punctuation">(</span>OBJDIR<span class="token punctuation">)</span>/,foo.o bar.o baz.o<span class="token punctuation">)</span>

<span class="token symbol"><span class="token variable">$</span>(OBJDIR)/%.o</span> <span class="token punctuation">:</span> %.c
        <span class="token variable">$</span><span class="token punctuation">(</span>COMPILE.c<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUTPUT_OPTION<span class="token punctuation">)</span> <span class="token variable">$&lt;</span>

<span class="token symbol">all</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>OBJS<span class="token punctuation">)</span>

<span class="token symbol"><span class="token variable">$</span>(OBJS)</span><span class="token punctuation">:</span> <span class="token operator">|</span> <span class="token variable">$</span><span class="token punctuation">(</span>OBJDIR<span class="token punctuation">)</span>

<span class="token symbol"><span class="token variable">$</span>(OBJDIR)</span><span class="token punctuation">:</span>
        mkdir <span class="token variable">$</span><span class="token punctuation">(</span>OBJDIR<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u76EE\u5F55\u4E0D\u5B58\u5728\u7684\u65F6\u5019\uFF0C\u521B\u5EFA\u76EE\u5F55\u3002 \u76EE\u5F55\u66F4\u65B0\uFF08\u5C31\u662F\u5728\u76EE\u5F55\u91CC\u589E\u5220\u6587\u4EF6\uFF09\u5374\u4E0D\u4F1A\u5F15\u8D77 $(OBJS) \u7684\u66F4\u65B0\u3002</p>`,20);function p(l,c){return e}var r=s(a,[["render",p]]);export{r as default};
