// // 假设你有一个分类数组，每个分类都是一个字符串
// var categories = ['GoogleHack', '网盘搜索', '视频平台', '文库搜索', '社交平台', '网络空间引擎', '云笔记', '微信小程序', '图纸站点'];//




function do_google_search(type) {
    // googlehack搜索语句
    site = document.getElementById('sercHead').value;
    url1 = 'https://www.google.com/search?q=';
    url2 = url1 + '"' + site + '"';
    if (site.includes(".")) {//根据输入内容判断搜索格式：url则加上'site';单纯字符则加上双引号
        url2 = url1 + 'site:' + site;
    }

    links_GH = []; // 创建空数组
    //1.目录遍历漏洞
    links_GH.push(url2 + '+intitle:index.of'); 
    //2.配置文件泄露
    links_GH.push(url2 + '+ext:xml+|+ext:conf+|+ext:cnf+|+ext:reg+|+ext:inf+|+ext:rdp+|+ext:cfg+|+ext:txt+|+ext:ora+|+ext:ini+|+ext:config+|+ext:yaml+|+ext:json+|+ext:toml');
    //3.数据库文件泄露
    links_GH.push(url2 + '+ext:sql+|+ext:dbf+|+ext:db+|+ext:mdb+|+ext:db3+|+ext:mdb+|+ext:accdb+|+ext:bson+|+ext:sdf+|+ext:sqlite');
    //4.日志文件泄露
    links_GH.push(url2 + '+ext:log+|+ext:err+|+ext:pg_log+|+ext:ldf+|+ext:nsf+|+intext:日志');
    //5.备份和历史文件
    links_GH.push(url2 + '+ext:bkf+|+ext:bkp+|+ext:bak+|+ext:old+|+ext:backup+|+ext:bck+|+ext:save+|+ext:sav+|+ext:copy+|+ext:orig+|+ext:oringin+|+ext:tmp+|+ext:0+|+ext:back');
    //6.登录页面
    links_GH.push(url2 + '+inurl:login+|+inurl:admin+|+inurl:manage+|+inurl:system+|+inurl:super+|+inurl:backend+|+intitle:登陆+|+intitle:后台+|+intitle:管理+|+intitle:认证+|+intitle:登录+|+intitle:平台+|+intitle:系统');
    //7.SQL错误
    links_GH.push(url2 + '+intext:"sql+syntax+near"+|+intext:"syntax+error+has+occurred"+|+intext:"incorrect+syntax+near"+|+intext:"unexpected+end+of+SQL+command"+|+intext:"Warning:+mysql_connect()"+|+intext:"Warning:+mysql_query()"+|+intext:"Warning:+pg_connect()"');
    //8.公开文件信息
    links_GH.push(url2 + '+ext:doc+|+ext:docx+|+ext:odt+|+ext:pdf+|+ext:rtf+|+ext:sxw+|+ext:psw+|+ext:ppt+|+ext:pptx+|+ext:pps+|+ext:csv+|+ext:xlsx+|+ext:xls+|+ext:ods+|+ext:tsv+|+ext:tmp+|+ext:temp+|+ext:tsv+|+ext:xz+|+ext:gz+|+ext:bz2+|+ext:tar+|+ext:7z+|+ext:zip+|+ext:rar');
    //9.phpinfo()
    links_GH.push(url2 + '+ext:php+intitle:phpinfo+"published+by+the+PHP+Group"');
    //10.多关键词检索(源代码、网络架构图、网络拓扑图、邮箱、密码、文件名、通讯录、内部资料、安装说明等)
    links_GH.push(url2 + '+"源代码"+|+"网络架构图"+|+"网络拓扑图"+|+"密码"+|+"通讯录"+|+"身份证"+|+"说明"+|+"配置"+|+"内部"+|+"报告"+|+"备份"+|+"数据库"+|+"巡检"+|+"渗透"+|+"使用"+|+"教程"+|+"培训"+|+"电话"+|+"key"+|+"password"+|+"passwd"');
    //11.云服务器文件和文件夹共享
    links_GH.push(url2 + '+"密钥"+|+"oss"+|+"AccessKey Secret"+|+"access_key"+|+inurl:share.cgi?ssid=+|+inurl:"/fmi/webd"+|+inurl:"accesskid"+|+"NoSuchBucket"+|+"ListBucket"+|+"AccessDenied"+|+"PutBucketPolicy"+|+"GetBucketPolicy"+|+"API"+|+"密钥"+|+"appid"');
    //12.搜索Pastebin.com和其他粘贴站点
    links_GH.push(url1 + 'site:pastebin.com+|+site:paste2.org+|+site:pastehtml.com+|+site:slexy.org+|+site:snipplr.com+|+site:snipt.net+|+site:textsnip.com+|+site:bitpaste.app+|+site:justpaste.it+|+site:heypasteit.com+|+site:hastebin.com+|+site:dpaste.org+|+site:dpaste.com+|+site:codepad.org+|+site:jsitor.com+|+site:codepen.io+|+site:jsfiddle.net+|+site:dotnetfiddle.net+|+site:phpfiddle.org+|+site:ide.geeksforgeeks.org+|+site:repl.it+|+site:ideone.com+|+site:paste.debian.net+|+site:paste.org+|+site:paste.org.ru+|+site:codebeautify.org+|+site:codeshare.io+|+site:trello.com'+'+"'+site+'"');
    //13.搜索Github.com,Gitlab.com,Bitbucket.org,Gitee.com
    links_GH.push(url1 + 'site:github.com+|+site:gitlab.com+|+site:gitee.com|+site:bitbucket.org'+'+"'+site+'"');
    
    var url;
    if (links_GH.length>=type) {
        url = links_GH[type-1];
    }
    //打开新的窗口
    //window.open(links_GH[i], '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
    
    //由于短时间内对于站点进行批量访问会导致被google识别为爬虫行为，所以需要对于代码进行改进，增加随机延迟或者通过api进行搜索，api搜索有次数限制（每天100次，选择淘汰），此处选择模拟人工打开并限制打开的标签页数量。

    // 增加随机延迟(顺延开启窗口，非同步)

    //结束无提示版本------------------->适合无头浏览器
    if (typeof url !== 'undefined') {
        window.open(url, '_blank'); // 直接开启标签页
    } else {
        var currentIndex = 0; // 当前待打开链接的索引
    
        function openNextTab() {
            if (currentIndex >= links_GH.length) {
                return; // 所有链接已打开完毕，结束函数执行
            }
    
            setTimeout(function() {
                console.log('Opening link:', links_GH[currentIndex]);
                window.open(links_GH[currentIndex], '_blank');
                currentIndex++;
    
                openNextTab(); // 递归调用打开下一个标签页
            }, Math.random() * 2000 + 1000); // 添加1-5秒的随机延迟
        }
    
        openNextTab(); // 开始打开标签页
    }


    // 结束有提示版本------------------>适合谷歌浏览器
    // if (typeof url !== 'undefined') {
    //     window.open(url, '_blank'); // 直接开启标签页
    // } else {
    //     var currentIndex = 0; // 当前待打开链接的索引
    //     var lastWindow = null; // 最后一个打开的标签页窗口对象
    
    //     function openNextTab() {
    //         if (currentIndex >= links_GH.length) {
    //             // 所有链接已打开完毕，在最后一个标签页中弹出提示信息并结束函数执行
    //             if (lastWindow) {
    //                 lastWindow.alert('GoogleHack is over');
    //             }
    //             return;
    //         }
    
    //         setTimeout(function() {
    //             console.log('Opening link:', links_GH[currentIndex]);
    //             var newWindow = window.open(links_GH[currentIndex], '_blank');
    //             currentIndex++;
    
    //             if (currentIndex >= links_GH.length) {
    //                 lastWindow = newWindow; // 更新最后一个标签页窗口对象
    //             }
    
    //             openNextTab(); // 递归调用打开下一个标签页
    //         }, Math.random() * 2000 + 1000); // 添加1-3秒的随机延迟
    //     }
    
    //     openNextTab(); // 开始打开标签页
    // }

}

// 待定，做到一半觉得好鸡肋
// function do_baidu_search(type) {
//     // 百度高级检索
//     site = document.getElementById('sercHead').value;

//     var links_SPS = []; // 创建空数组
//     //1.搜索pdf文件
//     links_SPS.push('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baiduadv&wd=%22%E6%81%92%E5%A4%A7%22%20filetype%3Atxt%20%7C%20filetype%3Adoc&oq=' + '"'+ site +'" ' + 'filetype:pdf' + '&rsv_pq=b69139ec002ffbe9&rsv_t=4e0fgmzrRHiiMYKjFpuytU8PzQ1OggVY0i6xCCwJeoUOmiUhHoz0aSmric2BAXI&rqlang=cn&rsv_dl=tb&rsv_enter=0&rsv_btype=t&inputT=3&rsv_sug3=86&rsv_sug2=0&rsv_sug4=736'); 
//     //2.搜索所有包含敏感信息文件
//     links_SPS.push('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baiduadv&wd=%22%E6%81%92%E5%A4%A7%22%20filetype%3Atxt%20%7C%20filetype%3Adoc&oq=' + '"'+ site +'" ' + 'filetype:all' + '&rsv_pq=b69139ec002ffbe9&rsv_t=4e0fgmzrRHiiMYKjFpuytU8PzQ1OggVY0i6xCCwJeoUOmiUhHoz0aSmric2BAXI&rqlang=cn&rsv_dl=tb&rsv_enter=0&rsv_btype=t&inputT=3&rsv_sug3=86&rsv_sug2=0&rsv_sug4=736');
//     //3.搜索word文件
//     links_SPS.push('https://www.douyin.com/search/' + site + '+培训'  + '?aid=54221c1f-bdab-479a-9603-40e84384d091&publish_time=0&sort_type=0&type=general');
//     //4.搜索ppt文件
//     links_SPS.push('https://so.youku.com/search_video/q_' + site + '+培训'  + '?searchfrom=1');
//     //5.搜索pdf文件
//     links_SPS.push('https://so.iqiyi.com/so/q_' + site + '+培训'  + '?source=input&sr=10176064248090194&ssrt=20240319150745015&ssra=9fcc496bbe401d845637fcb182d20e0f');
//     //6.搜索pdf文件
//     links_SPS.push('https://v.qq.com/x/search/?q=' + site + '培训');
//     //7.bilibili
//     links_SPS.push('https://search.bilibili.com/all?keyword=' + site + '+培训'  + '&from_source=webtop_search&spm_id_from=333.788&search_source=5');
//     //8.咪咕视频
//     links_SPS.push('https://www.miguvideo.com/p/search?keywords=' + site + '%20' + '+培训' + '&sid=FQTpbN7zBk0hgCxzOOualYHFdRycxAEg');

    
//     var url;
//     if (links_SPS.length>=type) {
//         url = links_SPS[type-1]
//     }
//     // if (typeof url !== 'undefined') {//判断是否需要进行批量站点访问，如果不需要则开启新窗口
//     //     window.open(url, '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
//     // }else{//如果需要则打开标签页
//     //     for(var i = 0; i<links_SPS.length; i++){
//     //         window.open(links_SPS[i], '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
//     //     }
//     // }
//     if (typeof url !== 'undefined') {
//         window.open(url, '_blank');
//     }else {
//         for (var i = 0; i < links_SPS.length; i++) {
//             console.log('Opening link:', links_SPS[i]);
//             window.open(links_SPS[i], '_blank');
//         }
//     }
// }

function do_InternetDisk_search(type) {
    // 云盘搜索语句
    site = document.getElementById('sercHead').value;

    var links_YPS = []; // 创建空数组
    //1.PanSoso
    links_YPS.push('https://www.pansoso.com/zh/' + site); 
    //2.凌风云
    links_YPS.push('https://www.lingfengyun.com/Search/Search?wd=' + site + '&so_token=c6aca784f33c8cfd869aba1860cda5eb&analyzer=smart');//精准搜索，需登录
    //3.微贴网
    links_YPS.push('https://www.weitiewang.com/www/Search?wd=' + site + '&so_token=3f4b0a57798d7f5dcff332a554b5d007');//精准搜索参数值为100%
    //4.小白盘
    links_YPS.push('https://www.xiaobaipan.com/list-' + site + '.html?from=1');
    //5.fastsoso
    links_YPS.push('https://www.fastsoso.cc/search?k=' + site + '&t=-1&s=2');//完全匹配
    //6.猫狸盘搜
    links_YPS.push('https://www.alipansou.com/search?k=' + site);
    //7.毕方铺
    if (site.includes(".")) {//根据输入内容是否为域名判断使用精确搜索还是模糊搜索
        links_YPS.push('https://www.iizhi.cn/resource/search/' + site + '?searchtype=0&searchway=1');//精确搜索
    }else{
        links_YPS.push('https://www.iizhi.cn/resource/search/' + site + '?searchtype=1&searchway=1');//模糊搜索
    }
    //8.UP云搜
    links_YPS.push('https://www.upyunso.com/search.html?keyword=' + site + '&page=1&s_type=1');//检索标题+内容
    //9.小云搜索
    links_YPS.push('https://www.yunso.net/index/user/s?wd=' + site + '&mode=90001&stype=0');//精确检索标题+内容
    //10.大圣盘
    if (site.includes(".")) {//根据输入内容是否为域名判断使用精确搜索还是模糊搜索
        links_YPS.push('https://www.dashengpan.com/#/main/search?keyword=' + site + '&searchtype=0&restype=1');//精确搜索
    }else{
        links_YPS.push('https://www.dashengpan.com/#/main/search?keyword=' + site + '&restype=1');//模糊搜索
    }
    //11.小马盘
    links_YPS.push('https://www.xiaomapan.com/#/main/search?keyword=' + site + '&searchtype=1&restype=1');
    if (site.includes(".")) {//根据输入内容是否为域名判断使用精确搜索还是模糊搜索
        links_YPS.push('https://www.xiaomapan.com/#/main/search?keyword=' + site + '&searchtype=1&restype=1');//精确搜索
    }else{
        links_YPS.push('https://www.dashengpan.com/#/main/search?keyword=' + site + '&restype=1');//模糊搜索
    }
    
    var url;
    if (links_YPS.length>=type) {
        url = links_YPS[type-1]
    }
    // if (typeof url !== 'undefined') {//判断是否需要进行批量站点访问，如果不需要则开启新窗口
    //     window.open(url, '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
    // }else{//如果需要则打开标签页
    //     for(var i = 0; i<links_YPS.length; i++){
    //         window.open(links_YPS[i], '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
    //     }
    // }
    if (typeof url !== 'undefined') {
        window.open(url, '_blank');
    }else {
        for (var i = 0; i < links_YPS.length; i++) {
            console.log('Opening link:', links_YPS[i]);
            window.open(links_YPS[i], '_blank');
        }
    }
}

function do_VideoPlatform_search(type) {
    // 视频平台搜索语句
    site = document.getElementById('sercHead').value;

    var links_SPS = []; // 创建空数组
    //1.芒果TV
    links_SPS.push('https://so.mgtv.com/so?k=' + site + '+培训'  + '&lastp=ch_home'); 
    //2.西瓜视频
    links_SPS.push('https://www.ixigua.com/search/' + site + '+培训'  + '/?logTag=594535e3690f17a88cdb&tab_name=search&fss=input');
    //3.抖音
    links_SPS.push('https://www.douyin.com/search/' + site + '+培训'  + '?aid=54221c1f-bdab-479a-9603-40e84384d091&publish_time=0&sort_type=0&type=general');
    //4.优酷
    links_SPS.push('https://so.youku.com/search_video/q_' + site + '+培训'  + '?searchfrom=1');
    //5.爱奇艺
    links_SPS.push('https://so.iqiyi.com/so/q_' + site + '+培训'  + '?source=input&sr=10176064248090194&ssrt=20240319150745015&ssra=9fcc496bbe401d845637fcb182d20e0f');
    //6.腾讯视频
    links_SPS.push('https://v.qq.com/x/search/?q=' + site + '培训');
    //7.bilibili
    links_SPS.push('https://search.bilibili.com/all?keyword=' + site + '+培训'  + '&from_source=webtop_search&spm_id_from=333.788&search_source=5');
    //8.咪咕视频
    links_SPS.push('https://www.miguvideo.com/p/search?keywords=' + site + '%20' + '+培训' + '&sid=FQTpbN7zBk0hgCxzOOualYHFdRycxAEg');

    
    var url;
    if (links_SPS.length>=type) {
        url = links_SPS[type-1]
    }
    // if (typeof url !== 'undefined') {//判断是否需要进行批量站点访问，如果不需要则开启新窗口
    //     window.open(url, '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
    // }else{//如果需要则打开标签页
    //     for(var i = 0; i<links_SPS.length; i++){
    //         window.open(links_SPS[i], '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
    //     }
    // }
    if (typeof url !== 'undefined') {
        window.open(url, '_blank');
    }else {
        for (var i = 0; i < links_SPS.length; i++) {
            console.log('Opening link:', links_SPS[i]);
            window.open(links_SPS[i], '_blank');
        }
    }
}

function do_DocumentPlatform_search(type) {
    // 文档平台搜索语句
    site = document.getElementById('sercHead').value;

    var links_WDS = []; // 创建空数组
    //1.原创力文档
    links_WDS.push('https://max.book118.com/search.html?q=' + site); 
    //2.百度文库
    links_WDS.push('https://wenku.baidu.com/search?word=' + site + '&lm=0&od=0&fr=top_home&ie=utf-8&_wkts_=1710835304507');
    //3.道客巴巴
    links_WDS.push('https://www.doc88.com/tag/' + site);
    //4.豆丁网
    links_WDS.push('https://www.doc88.com/tag/' + site);
    //5.人人文库(关键词需要完整，否则无法搜索到目标)
    links_WDS.push('https://www.renrendoc.com/search.html?q=' + site);
    //6.CSDN
    links_WDS.push('https://so.csdn.net/so/search?spm=1000.2115.3001.4498&q=' + site + '&t=&u=');
    //7.蚂蚁文库
    links_WDS.push('https://www.mayiwenku.com/search.html?q=' + site);
    //8.淘豆网
    links_WDS.push('https://www.taodocs.com/s?q=' + site + '&t=%E5%85%A8%E9%83%A8');
    //9.文档之家---失效
    // links_WDS.push('https://www.doczj.com/wendang/?q=' + site + '&s=search');
    //9.点石文库网
    links_WDS.push('https://www.dswenku.com/search.html?q=' + site);
    //10.语雀公开文档
    links_WDS.push('https://www.yuque.com/search?q=%22' + site + '%22&type=content&scope=%2F&tab=public&p=1&sence=modal');//可以通过 "" 指定必须关键词："越秀地产" 培训，多关键词之间使用 + 连接
    //11.装配图网
    links_WDS.push('https://www.zhuangpeitu.com/search.html?q=' + site); //使用 %20 隔离多个关键词   
    //12.新浪爱问文库（搜索接口维护） //https://ishare.iask.com/  
    
    var url;
    if (links_WDS.length>=type) {
        url = links_WDS[type-1]
    }
    // if (typeof url !== 'undefined') {//判断是否需要进行批量站点访问，如果不需要则开启新窗口
    //     window.open(url, '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
    // }else{//如果需要则打开标签页
    //     for(var i = 0; i<links_SPS.length; i++){
    //         window.open(links_SPS[i], '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
    //     }
    // }
    if (typeof url !== 'undefined') {
        window.open(url, '_blank');
    }else {
        for (var i = 0; i < links_WDS.length; i++) {
            console.log('Opening link:', links_WDS[i]);
            window.open(links_WDS[i], '_blank');
        }
    }
}

function do_SocialPlatform_search(type) {
    // 社交平台检索语句
    site = document.getElementById('sercHead').value;

    var links_SJS = []; // 创建空数组
    //1.微信文章检索    
    links_SJS.push('https://weixin.sogou.com/weixin?type=2&query=' + site); 
    //2.微信公众号检索
    links_SJS.push('https://weixin.sogou.com/weixin?query=' + site);
    //3.百度贴吧检索
    links_SJS.push('https://tieba.baidu.com/f/search/res?ie=utf-8&qw=' + site);
    //4.微博搜索
    links_SJS.push('https://s.weibo.com/weibo?q=' + site);
    //5.qq群检索----------------需要通过专门的API进行检索
    //接口检修中，暂时无效，使用参考以及js代码来源：https://suapi.net/doc/23
      
    
    var url;
    if (links_SJS.length>=type) {
        url = links_SJS[type-1]
    }
    // if (typeof url !== 'undefined') {//判断是否需要进行批量站点访问，如果不需要则开启新窗口
    //     window.open(url, '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
    // }else{//如果需要则打开标签页
    //     for(var i = 0; i<links_SPS.length; i++){
    //         window.open(links_SPS[i], '', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=yes,menubar=no,location=no,status=no');
    //     }
    // }
    if (typeof url !== 'undefined') {
        window.open(url, '_blank');
    }else {
        for (var i = 0; i < links_SJS.length; i++) {
            console.log('Opening link:', links_SJS[i]);
            window.open(links_SJS[i], '_blank');
        }
    }
}