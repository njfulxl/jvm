"use strict";(self.webpackChunkjvm=self.webpackChunkjvm||[]).push([[477],{6719:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-13ff1e88",path:"/08-load-class-time.html",title:"类加载的时机",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"类的生命周期",slug:"类的生命周期",children:[]},{level:2,title:"类加载过程中“初始化”开始的时机",slug:"类加载过程中-初始化-开始的时机",children:[]},{level:2,title:"被动引用演示 Demo",slug:"被动引用演示-demo",children:[{level:3,title:"Demo1",slug:"demo1",children:[]},{level:3,title:"Demo2",slug:"demo2",children:[]},{level:3,title:"Demo3",slug:"demo3",children:[]}]},{level:2,title:"接口的加载过程",slug:"接口的加载过程",children:[]}],filePathRelative:"08-load-class-time.md",git:{updatedTime:1623891916e3,contributors:[{name:"yanglbme",email:"szuyanglb@outlook.com",commits:9},{name:"yanglbme",email:"yanglbme@users.noreply.github.com",commits:1}]}}},1612:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const p=(0,a(6252).uE)('<h1 id="类加载的时机" tabindex="-1"><a class="header-anchor" href="#类加载的时机" aria-hidden="true">#</a> 类加载的时机</h1><h2 id="类的生命周期" tabindex="-1"><a class="header-anchor" href="#类的生命周期" aria-hidden="true">#</a> 类的生命周期</h2><p>类从被加载到虚拟机内存开始，到卸载出内存为止，它的整个生命周期包括以下 7 个阶段：</p><ul><li>加载</li><li>验证</li><li>准备</li><li>解析</li><li>初始化</li><li>使用</li><li>卸载</li></ul><p>验证、准备、解析 3 个阶段统称为连接。</p><p><img src="https://cdn.jsdelivr.net/gh/doocs/jvm@main/images/loadclass.png" alt="Load Class"></p><p>加载、验证、准备、初始化和卸载这 5 个阶段的顺序是确定的，类的加载过程必须按照这种顺序按部就班地开始（注意是“开始”，而不是“进行”或“完成”），而解析阶段则不一定：它在某些情况下可以在初始化后再开始，这是为了支持 Java 语言的运行时绑定。</p><h2 id="类加载过程中-初始化-开始的时机" tabindex="-1"><a class="header-anchor" href="#类加载过程中-初始化-开始的时机" aria-hidden="true">#</a> 类加载过程中“初始化”开始的时机</h2><p>Java 虚拟机规范没有强制约束类加载过程的第一阶段（即：加载）什么时候开始，但对于“初始化”阶段，有着严格的规定。有且仅有 5 种情况必须立即对类进行“初始化”：</p><ul><li>在遇到 new、putstatic、getstatic、invokestatic 字节码指令时，如果类尚未初始化，则需要先触发其初始化。</li><li>对类进行反射调用时，如果类还没有初始化，则需要先触发其初始化。</li><li>初始化一个类时，如果其父类还没有初始化，则需要先初始化父类。</li><li>虚拟机启动时，用于需要指定一个包含 <code>main()</code> 方法的主类，虚拟机会先初始化这个主类。</li><li>当使用 JDK 1.7 的动态语言支持时，如果一个 java.lang.invoke.MethodHandle 实例最后的解析结果为 REF_getStatic、REF_putStatic、REF_invokeStatic 的方法句柄，并且这个方法句柄所对应的类还没初始化，则需要先触发其初始化。</li></ul><p>这 5 种场景中的行为称为对一个类进行<strong>主动引用</strong>，除此之外，其它所有引用类的方式都不会触发初始化，称为<strong>被动引用</strong>。</p><h2 id="被动引用演示-demo" tabindex="-1"><a class="header-anchor" href="#被动引用演示-demo" aria-hidden="true">#</a> 被动引用演示 Demo</h2><h3 id="demo1" tabindex="-1"><a class="header-anchor" href="#demo1" aria-hidden="true">#</a> Demo1</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * 被动引用 Demo1:\n * 通过子类引用父类的静态字段，不会导致子类初始化。\n *\n * <span class="token keyword">@author</span> ylb\n *\n */</span>\n<span class="token keyword">class</span> <span class="token class-name">SuperClass</span> <span class="token punctuation">{</span>\n    <span class="token keyword">static</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;SuperClass init!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">SubClass</span> <span class="token keyword">extends</span> <span class="token class-name">SuperClass</span> <span class="token punctuation">{</span>\n    <span class="token keyword">static</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;SubClass init!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NotInitialization</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">SubClass</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// SuperClass init!</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>对于静态字段，只有直接定义这个字段的类才会被初始化，因此通过其子类来引用父类中定义的静态字段，只会触发父类的初始化而不会触发子类的初始化。</p><h3 id="demo2" tabindex="-1"><a class="header-anchor" href="#demo2" aria-hidden="true">#</a> Demo2</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * 被动引用 Demo2:\n * 通过数组定义来引用类，不会触发此类的初始化。\n *\n * <span class="token keyword">@author</span> ylb\n *\n */</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NotInitialization</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">SuperClass</span><span class="token punctuation">[</span><span class="token punctuation">]</span> superClasses <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SuperClass</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>这段代码不会触发父类的初始化，但会触发“[L 全类名”这个类的初始化，它由虚拟机自动生成，直接继承自 java.lang.Object，创建动作由字节码指令 newarray 触发。</p><h3 id="demo3" tabindex="-1"><a class="header-anchor" href="#demo3" aria-hidden="true">#</a> Demo3</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * 被动引用 Demo3:\n * 常量在编译阶段会存入调用类的常量池中，本质上并没有直接引用到定义常量的类，因此不会触发定义常量的类的初始化。\n *\n * <span class="token keyword">@author</span> ylb\n *\n */</span>\n<span class="token keyword">class</span> <span class="token class-name">ConstClass</span> <span class="token punctuation">{</span>\n    <span class="token keyword">static</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;ConstClass init!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> HELLO_BINGO <span class="token operator">=</span> <span class="token string">&quot;Hello Bingo&quot;</span><span class="token punctuation">;</span>\n\n<span class="token punctuation">}</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NotInitialization</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">ConstClass</span><span class="token punctuation">.</span>HELLO_BINGO<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>编译通过之后，常量存储到 NotInitialization 类的常量池中，NotInitialization 的 Class 文件中并没有 ConstClass 类的符号引用入口，这两个类在编译成 Class 之后就没有任何联系了。</p><h2 id="接口的加载过程" tabindex="-1"><a class="header-anchor" href="#接口的加载过程" aria-hidden="true">#</a> 接口的加载过程</h2><p>接口加载过程与类加载过程稍有不同。</p><p>当一个类在初始化时，要求其父类全部都已经初始化过了，但是一个接口在初始化时，并不要求其父接口全部都完成了初始化，当真正用到父接口的时候才会初始化。</p>',24),e={},t=(0,a(3744).Z)(e,[["render",function(n,s){return p}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,p]of s)a[n]=p;return a}}}]);