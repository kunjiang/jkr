#jkr

**2013-8-26 02:04:01**

##jkr对象提供四个方法

### isMatch

* 语法：     boolean jkr.isMatch(正则表达式, 字符串);
* 功能：     检查是否匹配，匹配上返回true
* 案例：

```javascript
var isTrue = jkr.isMatch(/^\d+/, '1a');
alert(isTrue);
```

### match  

* 语法：     object jkr.match(正则表达式, 字符串);
* 功能：     将字符串中匹配到的第一个字符串提取出来
    返回对象具有
    * success         属性，表示是否匹配成功
    * index           属性，匹配字符串在原始字符串中的位置
    * value           属性，匹配到的字符串
    * length          属性，匹配到的字符串的长度
    * groups          方法，根据索引获得匹配到的组
    * groups.count    属性，匹配到组的个数
*案例：

```javascript
var m = jkr.match(/^((.:).+\\)((.+)(\..+))$/, "C:\\1\\2\\3\\456.mp3");
alert(m.success);
if(m.success) {
    alert("index = " + m.index + "\r\n"
        + "value = " + m.value + "\r\n"
        + "length = " + m.length + "\r\n"
        + "groups(0) = " + m.groups(0) + "\r\n"
        + "groups(1) = " + m.groups(1) + "      文件路径\r\n"
        + "groups(2) = " + m.groups(2) + "      根目录\r\n"
        + "groups(3) = " + m.groups(3) + "      文件名\r\n"
        + "groups(4) = " + m.groups(4) + "      无后缀文件名\r\n"
        + "groups(5) = " + m.groups(5) + "      后缀名\r\n"
        + "groups.count = " + m.groups.count 
        );
}
```

### matches

* 语法：     Array jkr.matches(正则表达式, 字符串);
* 功能：     将循环匹配字符串，并将匹配到的数据以数组的形式返回，数组的每一个成员具有

    * success         属性，表示是否匹配成功
    * index           属性，匹配字符串在原始字符串中的位置
    * value           属性，匹配到的字符串
    * length          属性，匹配到的字符串的长度
    * groups          方法，根据索引获得匹配到的组
    * groups.count    属性，匹配到组的个数

* 案例：

```javascript
var mc = jkr.matches(/\d+(\d+)/, "1a23bc456");
for(var i in mc) {
    var m = mc[i];
    if(m.success) {
        alert("index = " + m.index + "\r\n"
            + "value = " + m.value + "\r\n"
            + "length = " + m.length + "\r\n"
            + "groups(1) = " + m.groups(1) + "\r\n"
            + "groups.count = " + m.groups.count
            );
    }
}
```

### replace

* 语法：     string jkr.replace(原始字符串, 正则表达式, 新字符串);
* 功能：     该方法对原始字符串使用正则表达式进行处理，并将匹配到的数据用新的字符串代替
* 案例：

```javascript
var str = "2013年8月25日";
var res = jkr.replace(str, /(\d+)年(\d+)月(\d+)日/, "$1-$2-$3");
alert(res);
```



