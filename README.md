# GoogleHackingTool_modified
GoogleHackingTool魔改版，增加了更多信息接口，适合hvv前期半自动敏感信息排查

#**注意项**

**1.**由于使用了window.open方法开启多个窗口，默认情况下除第一个以外的新窗口都会被浏览器拦截，需要对于浏览器进行配置或者使用无头浏览器：

Chrome配置方法如下：

进入设置页面：

　　设置-内容设置-弹出式窗口
![image](https://github.com/heygetit/GoogleHackingTool_modified/assets/32674342/6358d9b1-4adb-408c-ace2-265f5ed96dc9)
**2.**某些站点token需要手动更新，暂时未进行自动化更新token（已经填写在googlehack.js的注释中）
