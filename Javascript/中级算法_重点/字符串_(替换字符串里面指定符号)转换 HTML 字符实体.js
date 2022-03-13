/*
转换 HTML 字符实体

convertHTML("Dolce & Gabbana") 应返回 Dolce &amp; Gabbana。

convertHTML("Hamburgers < Pizza < Tacos") 应返回 Hamburgers &lt; Pizza &lt; Tacos。

convertHTML("Sixty > twelve") 应返回 Sixty &gt; twelve。

    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"

* */

function convertHTML(str) {
 const HtmlEmtities = {
   "&": "&amp;",
   "<": "&lt;",
   ">": "&gt;",
   '"': "&quot;",
   "'": "&apos;"
 }
 return str.split('')
   .map(item=>HtmlEmtities[item] || item)
   .join('');
}

console.log(convertHTML("Dolce & Gabbana"));;

