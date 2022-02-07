import{e as n}from"./app.11a37516.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="make-\u5B9E\u9A8C" tabindex="-1"><a class="header-anchor" href="#make-\u5B9E\u9A8C" aria-hidden="true">#</a> make \u5B9E\u9A8C</h1><h2 id="_01-\u66F4\u65B0-target-\u7684\u65F6\u673A" tabindex="-1"><a class="header-anchor" href="#_01-\u66F4\u65B0-target-\u7684\u65F6\u673A" aria-hidden="true">#</a> 01. \u66F4\u65B0 target \u7684\u65F6\u673A</h2><h3 id="_01-1-target-\u662F\u4F2A\u76EE\u6807\u6216\u6587\u4EF6-target-\u4E0D\u5B58\u5728-\u65E0\u6761\u4EF6\u6267\u884C-target" tabindex="-1"><a class="header-anchor" href="#_01-1-target-\u662F\u4F2A\u76EE\u6807\u6216\u6587\u4EF6-target-\u4E0D\u5B58\u5728-\u65E0\u6761\u4EF6\u6267\u884C-target" aria-hidden="true">#</a> 01.1 target \u662F\u4F2A\u76EE\u6807\u6216\u6587\u4EF6 target \u4E0D\u5B58\u5728\uFF0C\u65E0\u6761\u4EF6\u6267\u884C target</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>chenx@lcs2 01<span class="token punctuation">]</span>$ <span class="token function">ls</span> -a
<span class="token builtin class-name">.</span>  <span class="token punctuation">..</span>  makefile
<span class="token punctuation">[</span>chenx@lcs2 01<span class="token punctuation">]</span>$ <span class="token function">cat</span> makefile
<span class="token comment"># target \u662F\u4F2A\u76EE\u6807\u6216\u6587\u4EF6 target \u4E0D\u5B58\u5728\uFF0C\u65E0\u6761\u4EF6\u6267\u884C target</span>

t1:
        <span class="token function">touch</span> t1

t2:
        <span class="token function">touch</span> t2

.PHONY: t2 clean

clean:
        <span class="token function">rm</span> -vf t1 t2

<span class="token punctuation">[</span>chenx@lcs2 01<span class="token punctuation">]</span>$ <span class="token function">make</span> t1
<span class="token function">touch</span> t1
<span class="token punctuation">[</span>chenx@lcs2 01<span class="token punctuation">]</span>$ <span class="token function">make</span> t1
make: <span class="token string">&#39;t1&#39;</span> is up to date.
<span class="token punctuation">[</span>chenx@lcs2 01<span class="token punctuation">]</span>$ <span class="token function">make</span> t2
<span class="token function">touch</span> t2
<span class="token punctuation">[</span>chenx@lcs2 01<span class="token punctuation">]</span>$ <span class="token function">make</span> t2
<span class="token function">touch</span> t2
<span class="token punctuation">[</span>chenx@lcs2 01<span class="token punctuation">]</span>$ <span class="token function">ls</span>
makefile  t1  t2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="_01-2-t-\u4F9D\u8D56\u6587\u4EF6-p-\u4E14\u6CA1\u6709\u5339\u914D-p-\u7684\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#_01-2-t-\u4F9D\u8D56\u6587\u4EF6-p-\u4E14\u6CA1\u6709\u5339\u914D-p-\u7684\u89C4\u5219" aria-hidden="true">#</a> 01.2 t \u4F9D\u8D56\u6587\u4EF6 p\uFF0C\u4E14\u6CA1\u6709\u5339\u914D p \u7684\u89C4\u5219</h3><p>\u82E5\u4E0D\u5B58\u5728\u6587\u4EF6p\uFF0C\u5219\u62A5\u9519\uFF1B \u82E5\u5B58\u5728p\uFF0C\u5219\u5F53p\u6BD4t\u65B0\u7684\u65F6\u5019\u6267\u884Ct\uFF0C\u5426\u5219\u4E0D\u6267\u884Ct\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>chenx@lcs2 02<span class="token punctuation">]</span>$ <span class="token function">ls</span> -a
<span class="token builtin class-name">.</span>  <span class="token punctuation">..</span>  makefile
<span class="token punctuation">[</span>chenx@lcs2 02<span class="token punctuation">]</span>$ <span class="token function">cat</span> makefile
<span class="token comment">#\u4F9D\u8D56\u6587\u4EF6 p\uFF0C\u4E14\u6CA1\u6709\u5339\u914D p \u7684\u89C4\u5219</span>
<span class="token comment"># \u82E5\u4E0D\u5B58\u5728\u6587\u4EF6p\uFF0C\u5219\u62A5\u9519\uFF1B</span>
<span class="token comment"># \u82E5\u5B58\u5728p\uFF0C\u5219\u5F53p\u6BD4t\u65B0\u7684\u65F6\u5019\u6267\u884Ct\uFF0C\u5426\u5219\u4E0D\u6267\u884Ct\u3002</span>

t: p
        <span class="token function">touch</span> t
<span class="token punctuation">[</span>chenx@lcs2 02<span class="token punctuation">]</span>$ <span class="token function">make</span> t
make: *** No rule to <span class="token function">make</span> target <span class="token variable"><span class="token variable">\`</span>p&#39;, needed by <span class="token variable">\`</span></span>t<span class="token string">&#39;.  Stop.
[chenx@lcs2 02]$ touch p
[chenx@lcs2 02]$ make t
touch t
[chenx@lcs2 02]$ make t
make: \`t&#39;</span> is up to date.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="_01-3-t-\u4F9D\u8D56-p-\u4E14\u6709\u5339\u914D-p-\u7684\u89C4\u5219-\u4E14-p-\u662F\u4F2A\u76EE\u6807" tabindex="-1"><a class="header-anchor" href="#_01-3-t-\u4F9D\u8D56-p-\u4E14\u6709\u5339\u914D-p-\u7684\u89C4\u5219-\u4E14-p-\u662F\u4F2A\u76EE\u6807" aria-hidden="true">#</a> 01.3 t \u4F9D\u8D56 p\uFF0C\u4E14\u6709\u5339\u914D p \u7684\u89C4\u5219, \u4E14 p \u662F\u4F2A\u76EE\u6807</h3><p>\u65E0\u6761\u4EF6\u6267\u884C p\uFF0C\u63A5\u7740\u6267\u884C t \u65E0\u8BBA\u6587\u4EF6p\u662F\u5426\u5B58\u5728\uFF0C\u65E0\u8BBA\u6587\u4EF6 t \u662F\u5426\u6BD4\u6587\u4EF6 p \u65B0\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>chenx@lcs2 03<span class="token punctuation">]</span>$ <span class="token function">ls</span> -a
<span class="token builtin class-name">.</span>  <span class="token punctuation">..</span>  makefile
<span class="token punctuation">[</span>chenx@lcs2 03<span class="token punctuation">]</span>$ <span class="token function">cat</span> makefile
<span class="token comment"># t \u4F9D\u8D56 p\uFF0C\u4E14\u6709\u5339\u914D p \u7684\u89C4\u5219, \u4E14 p \u662F\u4F2A\u76EE\u6807</span>
<span class="token comment"># \u65E0\u6761\u4EF6\u6267\u884C p\uFF0C\u63A5\u7740\u6267\u884C t</span>

t: p
        <span class="token function">touch</span> t
p:
        @echo execute recipe of p

.PHONY: p clean

clean:
        <span class="token function">rm</span> -vf t p
<span class="token punctuation">[</span>chenx@lcs2 03<span class="token punctuation">]</span>$ <span class="token function">make</span> t
execute recipe of p
<span class="token function">touch</span> t
<span class="token punctuation">[</span>chenx@lcs2 03<span class="token punctuation">]</span>$ <span class="token function">make</span> t
execute recipe of p
<span class="token function">touch</span> t
<span class="token punctuation">[</span>chenx@lcs2 03<span class="token punctuation">]</span>$ <span class="token function">ls</span>
makefile  t
<span class="token punctuation">[</span>chenx@lcs2 03<span class="token punctuation">]</span>$ <span class="token function">touch</span> p
<span class="token punctuation">[</span>chenx@lcs2 03<span class="token punctuation">]</span>$ <span class="token function">make</span> t
execute recipe of p
<span class="token function">touch</span> t
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="_01-4-t-\u4F9D\u8D56-p-\u4E14\u6709\u5339\u914D-p-\u7684\u89C4\u5219-\u4E14-p-\u4E0D\u662F\u4F2A\u76EE\u6807" tabindex="-1"><a class="header-anchor" href="#_01-4-t-\u4F9D\u8D56-p-\u4E14\u6709\u5339\u914D-p-\u7684\u89C4\u5219-\u4E14-p-\u4E0D\u662F\u4F2A\u76EE\u6807" aria-hidden="true">#</a> 01.4 t \u4F9D\u8D56 p\uFF0C\u4E14\u6709\u5339\u914D p \u7684\u89C4\u5219, \u4E14 p \u4E0D\u662F\u4F2A\u76EE\u6807</h3><pre><code>        \u6709\u6587\u4EF6 p        \u6CA1\u6709\u6587\u4EF6 p
</code></pre><p>p \u6267\u884C \u6BD4\u8F83p\u548Ct t \u9700\u8981\u6267\u884C p \u4E0D\u6267\u884C \u6BD4\u8F83p\u548Ct -\uFF08\u6CA1\u6709\u6587\u4EF6p\uFF0Cp\u4E00\u5B9A\u4F1A\u6267\u884C\uFF09</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">ls</span>
makefile
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">ls</span>
makefile
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">cat</span> makefile
<span class="token comment"># t \u4F9D\u8D56 p\uFF0C\u4E14\u6709\u5339\u914D p \u7684\u89C4\u5219, \u4E14 p \u4E0D\u662F\u4F2A\u76EE\u6807</span>
<span class="token comment">#</span>
<span class="token comment">#             \u6709\u6587\u4EF6 p        \u6CA1\u6709\u6587\u4EF6 p</span>
<span class="token comment"># p \u6267\u884C      \u6BD4\u8F83p\u548Ct        t \u9700\u8981\u6267\u884C</span>
<span class="token comment"># p \u4E0D\u6267\u884C    \u6BD4\u8F83p\u548Ct        -\uFF08\u6CA1\u6709\u6587\u4EF6p\uFF0Cp\u4E00\u5B9A\u4F1A\u6267\u884C\uFF09</span>

t: p
        <span class="token function">touch</span> t

p:
        @echo execute recipe of p

clean:
        <span class="token function">rm</span> -vf t p

.PHONY: clean

<span class="token comment"># 1. \u6CA1\u6709\u6587\u4EF6 p -&gt; p \u9700\u8981\u6267\u884C\uFF0Ct \u9700\u8981\u6267\u884C</span>
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">make</span> t
execute recipe of p
<span class="token function">touch</span> t
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">make</span> t
execute recipe of p
<span class="token function">touch</span> t
<span class="token comment"># 2. \u6709\u6587\u4EF6 p -&gt; p \u4E0D\u6267\u884C\uFF0Ct\u662F\u5426\u9700\u8981\u6267\u884C\uFF0C\u6839\u636E p \u548C t \u7684\u65B0\u65E7\u5173\u7CFB\u5224\u65AD</span>
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">touch</span> p
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">touch</span> t <span class="token comment"># t \u6BD4 p \u65B0</span>
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">make</span> t
make: <span class="token variable"><span class="token variable">\`</span>t&#39; is up to date.
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">touch</span> t<span class="token punctuation">;</span> <span class="token function">touch</span> p <span class="token comment"># p \u6BD4 t \u65B0</span>
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">make</span> t
<span class="token function">touch</span> t
<span class="token punctuation">[</span>chenx@lcs2 04<span class="token punctuation">]</span>$ <span class="token function">make</span> t
make: <span class="token variable">\`</span></span>t&#39; is up to date.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u7528 t\uFF0Cp\uFF0Cd \u6784\u9020\u6700\u540E\u4E00\u79CD\u573A\u666F\uFF1A</span>
<span class="token comment"># 3. \u6709\u6587\u4EF6 p\uFF0Cp \u9700\u8981\u6267\u884C -&gt; t\u662F\u5426\u9700\u8981\u6267\u884C\uFF0C\u770B p \u548C t \u7684\u65B0\u65E7\u5173\u7CFB\u3002</span>
t: p
        <span class="token function">touch</span> t
p: d
        @echo execute recipe <span class="token keyword">in</span> p

clean:
        <span class="token function">rm</span> -vf p t

.PHONY: clean
<span class="token punctuation">[</span>chenx@lcs2 05<span class="token punctuation">]</span>$ <span class="token function">touch</span> d
<span class="token punctuation">[</span>chenx@lcs2 05<span class="token punctuation">]</span>$ <span class="token function">touch</span> t
<span class="token punctuation">[</span>chenx@lcs2 05<span class="token punctuation">]</span>$ <span class="token function">touch</span> p
<span class="token punctuation">[</span>chenx@lcs2 05<span class="token punctuation">]</span>$ <span class="token function">touch</span> p <span class="token comment"># \u6709\u6587\u4EF6p\uFF0Cp\u9700\u8981\u6267\u884C\uFF0Cp \u6BD4t\u65B0</span>
<span class="token punctuation">[</span>chenx@lcs2 05<span class="token punctuation">]</span>$ <span class="token function">touch</span> d
<span class="token punctuation">[</span>chenx@lcs2 05<span class="token punctuation">]</span>$ <span class="token function">make</span> t
execute recipe <span class="token keyword">in</span> p
<span class="token function">touch</span> t
<span class="token punctuation">[</span>chenx@lcs2 05<span class="token punctuation">]</span>$ <span class="token comment"># \u6709\u6587\u4EF6 p\uFF0Cp\u9700\u8981\u6267\u884C\uFF0Cp \u4E0D\u6BD4 t \u65B0</span>
<span class="token punctuation">[</span>chenx@lcs2 05<span class="token punctuation">]</span>$ <span class="token function">make</span> t
execute recipe <span class="token keyword">in</span> p
<span class="token punctuation">[</span>chenx@lcs2 05<span class="token punctuation">]</span>$ <span class="token function">make</span> t
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="\u4F2A\u76EE\u6807\u7684\u6267\u884C\u52A8\u673A\u4F20\u9012\u5417" tabindex="-1"><a class="header-anchor" href="#\u4F2A\u76EE\u6807\u7684\u6267\u884C\u52A8\u673A\u4F20\u9012\u5417" aria-hidden="true">#</a> \u4F2A\u76EE\u6807\u7684\u6267\u884C\u52A8\u673A\u4F20\u9012\u5417\uFF1F</h3><p>t \u4F9D\u8D56\u4E8E p\uFF0Cp \u4F9D\u8D56\u4E8E d\u3002 p \u4E0D\u662F\u4F2A\u76EE\u6807\uFF0C\u4E5F\u4E0D\u662F\u4E8B\u5B9E\u4E0A\u7684\u4F2A\u76EE\u6807\uFF0Cd\u662F\u4F2A\u76EE\u6807\u3002 \u5982\u679C\u4F2A\u76EE\u6807\u4F20\u9012\uFF0C\u90A3\u4E48 t \u4E00\u5B9A\u4F1A\u6267\u884C\uFF0C \u5982\u679C\u4F2A\u76EE\u6807\u4E0D\u4F20\u9012\uFF0C\u90A3\u4E48</p><h3 id="\u4E8B\u5B9E\u4E0A\u7684\u4F2A\u76EE\u6807\u4F20\u9012\u5417" tabindex="-1"><a class="header-anchor" href="#\u4E8B\u5B9E\u4E0A\u7684\u4F2A\u76EE\u6807\u4F20\u9012\u5417" aria-hidden="true">#</a> \u4E8B\u5B9E\u4E0A\u7684\u4F2A\u76EE\u6807\u4F20\u9012\u5417\uFF1F</h3><h2 id="_02-remake-\u53D1\u751F\u7684\u65F6\u673A" tabindex="-1"><a class="header-anchor" href="#_02-remake-\u53D1\u751F\u7684\u65F6\u673A" aria-hidden="true">#</a> 02. Remake \u53D1\u751F\u7684\u65F6\u673A</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 1. \u73AF\u5883:</span>
<span class="token comment"># Makefile \u5305\u542B\u4E24\u4E2Amk1\u548Cmk2 \u8FD9\u4E24\u4E2Amakefile</span>
<span class="token comment"># d1 d2 \u7528\u6765\u624B\u52A8\u63A7\u5236 mk1 \u548C mk2 \u7684\u66F4\u65B0</span>
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">ls</span> -a
<span class="token builtin class-name">.</span>  <span class="token punctuation">..</span>  d1  d2  Makefile  mk1  mk2  Readme.md
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">cat</span> Makefile
include mk1 mk2

<span class="token variable"><span class="token variable">$(</span>info INFO: <span class="token assign-left variable">MAKE_RESTARTS</span><span class="token operator">=</span>$<span class="token punctuation">{</span>MAKE_RESTARTS<span class="token punctuation">}</span><span class="token variable">)</span></span>

main:
	@echo hello

mk1: d1
	@echo update mk1
	<span class="token function">touch</span> mk1
mk2: d2
	@echo update mk2, <span class="token keyword">do</span> nothing
<span class="token comment"># 2. touch d1,d2, \u4F7F\u5F97 mk1 mk2 \u53D1\u751F\u66F4\u65B0</span>
<span class="token comment"># \u8FD9\u65F6\u5019, make \u4F1A\u53D1\u751F\u4E00\u6B21 remake, \u7B26\u5408\u9884\u671F</span>
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">touch</span> d1 d2
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">make</span>
INFO: <span class="token assign-left variable">MAKE_RESTARTS</span><span class="token operator">=</span>
update mk2, <span class="token keyword">do</span> not
<span class="token builtin class-name">echo</span> <span class="token assign-left variable">foo</span><span class="token operator">=</span>ok <span class="token operator">&gt;&gt;</span> mk2
update mk1
<span class="token function">touch</span> mk1
INFO: <span class="token assign-left variable">MAKE_RESTARTS</span><span class="token operator">=</span><span class="token number">1</span>
hello
<span class="token comment"># 3. \u7D27\u63A5\u7740\u518D\u6B21 make, \u7531\u4E8E mk1 \u548C mk2 \u90FD\u6CA1\u6709\u66F4\u65B0,</span>
<span class="token comment"># \u6240\u4EE5\u6CA1\u6709\u53D1\u751F remake.</span>
<span class="token comment"># MAKE_RESTARTS \u6269\u5C55\u7ED3\u679C\u662F\u7A7A\u5B57\u7B26\u4E32(empty string)</span>
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">make</span>
INFO: <span class="token assign-left variable">MAKE_RESTARTS</span><span class="token operator">=</span>
hello
<span class="token comment"># 4. \u624B\u52A8 touch d1, \u4F7F\u5F97 mk1 \u89C4\u5219\u5F97\u5230\u6267\u884C.</span>
<span class="token comment"># mk1 \u7684\u89C4\u5219\u53EA\u662F\u66F4\u65B0\u4E86 mk1 \u7684\u65F6\u95F4\u6233,\u5E76\u6CA1\u6709\u5B9E\u9645</span>
<span class="token comment"># \u66F4\u65B0 mk1 \u7684\u6587\u4EF6\u5185\u5BB9, \u4F46\u4ECD\u7136\u53D1\u751F\u4E86 remake</span>
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">touch</span> d1
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">make</span>
INFO: <span class="token assign-left variable">MAKE_RESTARTS</span><span class="token operator">=</span>
update mk1
<span class="token function">touch</span> mk1
INFO: <span class="token assign-left variable">MAKE_RESTARTS</span><span class="token operator">=</span><span class="token number">1</span>
hello
<span class="token comment"># 5. \u624B\u52A8 touch d2, mk2 \u7684\u89C4\u5219\u5F97\u5230\u4E86\u6267\u884C,\u4F46 mk2</span>
<span class="token comment"># \u7684\u5185\u5BB9\u548C\u65F6\u95F4\u6233\u90FD\u6CA1\u6709\u53D1\u751F\u53D8\u5316, \u6CA1\u6709\u53D1\u751Fremake.</span>
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">touch</span> d2
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">make</span>
INFO: <span class="token assign-left variable">MAKE_RESTARTS</span><span class="token operator">=</span>
update mk2, <span class="token keyword">do</span> nothing
hello
<span class="token comment"># 6. \u7D27\u63A5\u7740\u6267\u884C make \u547D\u4EE4, \u4ECD\u7136\u4F1A\u6267\u884C mk2 \u7684\u89C4\u5219</span>
<span class="token comment"># \u56E0\u4E3A d2 \u7684\u65F6\u95F4\u6233\u6BD4 mk2 \u65B0</span>
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">make</span>
INFO: <span class="token assign-left variable">MAKE_RESTARTS</span><span class="token operator">=</span>
update mk2, <span class="token keyword">do</span> nothing
hello
<span class="token comment"># 6. \u624B\u52A8touch mk2,\u4F7F\u5176\u65F6\u95F4\u6233\u6BD4d2\u65B0</span>
<span class="token comment"># \u6B64\u65F6\u4E0D\u4F1A\u66F4\u65B0 mk2, \u4E5F\u6CA1\u6709\u53D1\u751Fremake</span>
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">touch</span> mk2
<span class="token punctuation">[</span>chenx@localhost rem<span class="token punctuation">]</span>$ <span class="token function">make</span>
INFO: <span class="token assign-left variable">MAKE_RESTARTS</span><span class="token operator">=</span>
hello

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br></div></div><p>\u7EFC\u4E0A\u6240\u8FF0, \u662F\u5426\u9700\u8981remake, \u552F\u4E00\u7684\u5224\u5B9A\u6807\u51C6\u662F makefile \u7684\u65F6\u95F4\u6233\u3002 \u9700\u8981reamek,\u5F53\u4E14\u4EC5\u5F53\u67D0\u4E2Amakefile\u7684\u65F6\u95F4\u6233\u53D8\u5F97\u66F4\u65B0\u4E86. \u65E0\u5173\u6587\u4EF6\u5185\u5BB9\u662F\u5426\u5B9E\u9645\u53D8\u5316, \u65E0\u5173\u76F8\u5173\u7684\u89C4\u5219\u662F\u5426\u5B9E\u9645\u66F4\u65B0.</p>`,21);function e(c,t){return p}var u=s(a,[["render",e]]);export{u as default};
