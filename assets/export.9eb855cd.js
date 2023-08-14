import{_ as g,P as x,M as m,Q as u,O as S,S as t,F as d,J as f,U as h,k as v,a5 as w,a0 as y}from"./jquery.5462d3c8.js";import{f as k,h as z}from"./func.1258f168.js";import{x as _}from"./xlsx.0e715ca4.js";const C={zh_CN:"\u7B80\u4E2D\u670D(CN)",en_US:"Global Server(EN)",ja_JP:"\u65E5\u672C\u30B5\u30FC\u30D0\u30FC(JP)",ko_KR:"\uD55C\uAD6D \uC11C\uBC84(KR)",zh_TW:"\u7E41\u4E2D\u670D(TW)"},N={zh_CN:"\u5F53\u524D\u8BED\u8A00",en_US:"Current Language",ja_JP:"\u73FE\u5728\u306E\u8A00\u8A9E",ko_KR:"\uD604\uC7AC \uC5B8\uC5B4",zh_TW:"\u7576\u524D\u8A9E\u8A00"},L={zh_CN:"\u8BF7\u4ECE\u76EE\u5F55\u4E2D\u9009\u62E9\u6545\u4E8B\u67E5\u770B",en_US:"Select the story you wanna view from the menu",ja_JP:"Select the story you wanna view from the menu",ko_KR:"\uC5F4\uB78C\uD558\uB824\uB294 \uC2A4\uD1A0\uB9AC\uB97C \uBA54\uB274\uC5D0\uC11C \uC120\uD0DD\uD558\uC138\uC694",zh_TW:"\u8ACB\u5F9E\u76EE\u9304\u4E2D\u9078\u64C7\u6545\u4E8B\u67E5\u770B"},P={zh_CN:"\u4E3B\u9898\u66F2",en_US:"Main Theme",ja_JP:"Maintheme",ko_KR:"\uBA54\uC778",zh_TW:"\u4E3B\u9898\u66F2"},R={zh_CN:"\u522B\u4F20",en_US:"Side Story",ja_JP:"Sidestory",ko_KR:"\uC0AC\uC774\uB4DC",zh_TW:"\u522B\u4F20"},T={zh_CN:"\u6545\u4E8B\u96C6",en_US:"Story Collection",ja_JP:"Storyset",ko_KR:"\uBBF8\uB2C8 \uC2A4\uD1A0\uB9AC",zh_TW:"\u6545\u4E8B\u96C6"},b={zh_CN:"\u5E72\u5458\u5BC6\u5F55",en_US:"Operator Records",ja_JP:"Operators' Records",ko_KR:"\uC624\uD37C\uB808\uC774\uD130 \uD30C\uC77C",zh_TW:"\u5E79\u54E1\u5BC6\u9304"},j={zh_CN:"\u8BBE\u7F6E",en_US:"Settings",ja_JP:"Settings",ko_KR:"\uC124\uC815",zh_TW:"\u8BBE\u7F6E"},A={zh_CN:"\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E",en_US:"Reset All Settings",ja_JP:"Reset All Settings",ko_KR:"\uBAA8\uB4E0 \uC124\uC815 \uCD08\uAE30\uD654",zh_TW:"\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E"},E={zh_CN:"\u535A\u58EB\u79F0\u547C",en_US:"Doctor's Name",ja_JP:"\u30C9\u30AF\u30BF\u30FC\u306E\u540D\u524D",ko_KR:"Doctor's Name",zh_TW:"\u535A\u58EB\u7A31\u547C"},J={zh_CN:"\u663E\u793A\u7A7A\u767D\u5206\u5272\u884C",en_US:"Show Blank Seperation Line",ja_JP:"Show Blank Seperation Line",ko_KR:"\uACF5\uBC31 \uAD6C\uBD84\uC120 \uD45C\uC2DC",zh_TW:"\u986F\u793A\u7A7A\u767D\u5206\u5272\u884C"},U={zh_CN:"\u9690\u85CF\u91CD\u590D\u4EBA\u540D",en_US:"Hide Duplicate Names",ja_JP:"Hide Duplicate Names",ko_KR:"\uC911\uBCF5\uB41C \uC774\uB984 \uC228\uAE30\uAE30",zh_TW:"\u96B1\u85CF\u91CD\u8907\u4EBA\u540D"},W={zh_CN:"\u5E94\u7528\u8BBE\u7F6E",en_US:"Apply Setting",ja_JP:"Apply Setting",ko_KR:"\uC124\uC815 \uC801\uC6A9",zh_TW:"\u5E94\u7528\u8BBE\u7F6E"},K={zh_CN:"\u8FD4\u56DE\u76EE\u5F55",en_US:"Return to Menu",ja_JP:"Return to Menu",ko_KR:"\uBA54\uB274\uB85C \uB3CC\uC544\uAC00\uAE30",zh_TW:"\u8FD4\u56DE\u76EE\u9304"},D={zh_CN:"\u5BFC\u51FAExcel",en_US:"Export to Excel",ja_JP:"Export to Excel",ko_KR:"\uC5D1\uC140\uB85C \uB0B4\uBCF4\uB0B4\uAE30",zh_TW:"\u5C0E\u51FAExcel"};var O={server:C,currentLang:N,selectStory:L,main:P,ss:R,mini:T,or:b,setting:j,clear:A,dr:E,showDelay:J,hideName:U,save:W,home:K,export2excel:D};const F={data(){return{exportList:[],filename:"export",exportFile:null,logs:"",i18n:O,lang:k.l}},created(){this.exportList=window.localStorage.getItem("exportList")?JSON.parse(window.localStorage.getItem("exportList")):[],this.filename=window.localStorage.getItem("filename")?window.localStorage.getItem("filename"):"export"},methods:{removeAll(){this.exportList=[],window.localStorage.setItem("exportList",JSON.stringify(this.exportList)),this.filename="export",window.localStorage.setItem("filename",this.filename)},async exportAll(){this.logs="Export Process Start...<br/>",this.logs+="Export List Length: "+this.exportList.length+"<br/>",this.exportFile=_.utils.book_new(),this.exportFile.Props={Title:"Exported Data",Subject:"Exported from Arknights Story Text Reader. https://050644zf.github.io/ArknightsStoryTextReader/"},this.logs+="Workbook Created.<br/>",await new Promise(o=>{this.exportStories().then(o)}).then(()=>{_.writeFile(this.exportFile,this.filename+".xlsx",{type:"file"}),this.logs+="Export Process Finished.<br/>"})},async exportStories(){for(const o of this.exportList)await this.exportStory(o)},async exportStory(o){this.logs+="Exporting Story: "+o.storyCode+" "+o.avgTag+" "+o.storyName+"<br/>";let e=await fetch("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+o.server+"/gamedata/story/"+o.path+".json");e=await e.json();let l=this.reader(e),a=_.utils.aoa_to_sheet(l);return a["!cols"]=[],a["!cols"][0]={hidden:!0,wch:15},a["!cols"][1]={wch:25},a["!cols"][2]={wch:70},await new Promise((s,n)=>{_.utils.book_append_sheet(this.exportFile,a,this.getsheetname(o.path)),s()})},getsheetname(o){const e=o.split("/").length;return o.split("/")[e-1]},reader(o){var e=[];for(var l in o.storyList){var a=o.storyList[l],s=a.id,n=a.prop,i=a.attributes;if(n=="Comment"&&e.push([s,"--Comment--",i.value]),n=="name"&&e.push([s,i.name,i.content]),n=="Dialog"&&e.push([s,"----","----"]),n=="Decision"){e.push([s,"--Decision--","----"]);var r=i.options.split(";"),c=i.values.split(";");for(let p=0;p<Math.min(r.length,c.length);p++)e.push([s,"Option_"+c[p],r[p]]);e.push([s,"--Decision End--","----"])}n=="Predicate"&&(a.endOfOpt?e.push([s,"--Branch--","End of Options"]):e.push([s,"--Branch--",">Options_"+i.references.replaceAll(";","&")])),n=="Subtitle"&&(e.push([""]),e.push([s,"",i.text]),e.push([""])),Object.keys(i).indexOf("image")!=-1&&(n=n.toLowerCase(),e.push([s,"--"+n+"--","https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/"+n+"s/"+i.image+".png"]))}return e},async book_append_sheet(o,e,l){return _.utils.book_append_sheet(o,e,l),await Promise.resolve("done")},home(){history.back()}},components:{Header:z}},M={class:"exportpage"},B=t("span",{class:"material-icons"}," menu_open ",-1),I=t("span",{class:"home nt"},"\u8FD4\u56DE\u4E0A\u4E00\u9875/Return to Last Page",-1),H=[B,I],V=t("div",{class:"nt"},"\u5F53\u524D\u5BFC\u51FA\u5217\u8868/Current Exporting List: ",-1),G={class:"exportList st"},Q={class:"filename lt"},q=t("span",null,"\u5BFC\u51FA\u6587\u4EF6\u540D / Export File Name: ",-1),X=t("span",null,".xlsx",-1),Y=t("span",{class:"material-icons"}," clear_all ",-1),Z=t("span",null,"\u6E05\u7A7A/Clear",-1),$=[Y,Z],ee=t("span",{class:"material-icons"}," file_download ",-1),te=t("span",null,"\u5BFC\u51FA\u6240\u6709/Export All",-1),oe=[ee,te],se=["innerHTML"];function ne(o,e,l,a,s,n){const i=x("Header");return m(),u(d,null,[S(i),t("div",M,[t("button",{class:"homepage lt",onClick:e[0]||(e[0]=r=>n.home())},H),V,t("div",G,[t("table",null,[(m(!0),u(d,null,f(s.exportList,(r,c)=>(m(),u("tr",{key:c,class:"exportItem"},[t("td",null,h(r.server),1),t("td",null,h(r.storyCode)+" "+h(r.avgTag),1),t("td",null,h(r.storyName),1),t("td",null,h(r.path),1)]))),128))])]),t("div",Q,[q,v(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=r=>s.filename=r),placeholder:"\u8BF7\u8F93\u5165\u6587\u4EF6\u540D/Please input file name"},null,512),[[w,s.filename]]),X]),t("div",null,[t("button",{class:"removeAll nt",onClick:e[2]||(e[2]=r=>n.removeAll())},$),t("button",{class:"exportBtn nt",onClick:e[3]||(e[3]=r=>n.exportAll())},oe)]),t("div",{class:"logArea xst",innerHTML:s.logs},null,8,se)])],64)}var re=g(F,[["render",ne]]);y(re).mount("#export");
