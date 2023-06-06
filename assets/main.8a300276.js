import{_ as p,o as i,c,a as s,t as _,n as x,r as m,w as f,v as $,F as b,b as w,d as k,$ as N,e as F,f as j,g as O,h as g,i as M,j as T,k as D,l as C,m as B}from"./jquery.35eba1a5.js";import{f as d,h as R}from"./func.d5faf707.js";import{i as I}from"./i18n.cce29cd3.js";const J={props:["story"],emits:["hidemenu","focusstory","unfoldevent"],data(){return{focused:!1,lang:d.l,server:d.server}},mounted(){d.storyFile==this.story.storyTxt&&(this.focused=!0,this.$emit("unfoldevent"))},methods:{loadStory(n){var t="s="+this.server;t=t+"&f="+n,window.location.search=t}}},V=["id"],P={class:"storycode xst"},H={class:"storyname nt"};function q(n,t,o,a,e,r){return i(),c("div",{class:x({story:!0,storyFocused:e.focused,nt:!0}),id:o.story.storyId,onClick:t[0]||(t[0]=l=>r.loadStory(o.story.storyTxt))},[s("div",P,_(o.story.storyCode)+" "+_(o.story.avgTag),1),s("div",H,_(o.story.storyName),1)],10,V)}var Y=p(J,[["render",q]]);const G={props:["event","eventid"],emits:["hidemenu","focusStory"],data(){return{collapsed:!0}},components:{Storymenu:Y}},K={class:"event"},W={class:"stories"};function Q(n,t,o,a,e,r){const l=m("Storymenu");return i(),c("div",K,[s("div",{class:x({eventname:!0,eventnamehl:!e.collapsed,lt:!0})},_(o.event.name),3),f(s("div",W,[(i(!0),c(b,null,w(o.event.infoUnlockDatas,(u,h)=>(i(),k(l,{story:u,onUnfoldevent:t[0]||(t[0]=y=>{e.collapsed=!1,n.$emit("focusStory")}),key:h},null,8,["story"]))),128))],512),[[$,!e.collapsed]])])}var X=p(G,[["render",Q]]);const Z={data(){return{data:{},chardict:{},eventList:{},lang:d.l,server:d.server,i18n:I,showMenu:!0,showLangSelect:!1}},created(){N.getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/"+this.server+"/gamedata/excel/story_review_table.json").done(n=>{this.data=n,N.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.server+"/chardict.json").done(t=>{this.chardict=t,this.eventList=this.getEventList(this.data,this.chardict)})})},mounted(){d.focus()},methods:{serverSwitch(n){var t="s="+n;window.location.search=t},getEventList(n,t){var o=[],a;for(a in n)if(n[a].entryType=="MAINLINE")o.push(n[a]);else if(n[a].entryType=="ACTIVITY")o.push(n[a]);else if(n[a].entryType=="MINI_ACTIVITY")o.push(n[a]);else if(n[a].entryType=="NONE"){var e=a.split("_")[1],r=a.split("_")[3];n[a].name=t[e].name+" - "+r,o.push(n[a])}return o},focusStory(){d.focus()},home(){window.location.search="?s="+this.server}},components:{Eventmenu:X}},ee={id:"sidebar"},te={id:"currentLang",class:"currentLang lt"},se=s("span",{class:"material-icons",style:{"margin-right":"5px"}},"language",-1),ne={id:"langSelect",class:"langSelect lt"},oe=["onClick"],re=s("span",{class:"material-icons"}," menu_open ",-1),ie={class:"home"};function le(n,t,o,a,e,r){const l=m("Eventmenu");return i(),c("div",ee,[s("div",{class:x({menuButton:!0,"material-icons":!0,menuButtonR:e.showMenu}),onClick:t[0]||(t[0]=u=>{e.showMenu=!e.showMenu})},"chevron_right",2),s("div",{class:x({sidebar:!0,sidebarhidden:!e.showMenu})},[s("div",te,[s("div",{style:{display:"flex","align-items":"center","justify-content":"center"},onClick:t[1]||(t[1]=u=>e.showLangSelect=!e.showLangSelect)},[se,s("span",null,_(e.i18n.server[e.server]),1)]),f(s("div",ne,[(i(!0),c(b,null,w(e.i18n.server,(u,h,y)=>(i(),c("div",{onClick:S=>r.serverSwitch(h),key:y},_(u),9,oe))),128))],512),[[$,e.showLangSelect]])]),s("div",{class:"homepage nt",onClick:t[2]||(t[2]=u=>r.home())},[re,s("span",ie,_(e.i18n.home[e.lang]),1)]),(i(!0),c(b,null,w(e.eventList,(u,h)=>(i(),k(l,{class:"event",id:u.id,event:u,lang:e.lang,onHidemenu:t[3]||(t[3]=y=>e.showMenu=!1),key:h},null,8,["id","event","lang"]))),128))],2)])}var ae=p(Z,[["render",le]]);const ce={data(){return{doctor:d.doctor,i18n:I,lang:d.l,targetLang:d.l,show:this.doctor=="{@nickname}",hidetip:d.hidetip,showDelay:d.showDelay,hideName:d.hideName,langList:d.langList,isOldversion:!0}},methods:{save(){window.localStorage.setItem("doctor",this.doctor),window.localStorage.setItem("showDelay",this.showDelay),window.localStorage.setItem("hideName",this.hideName),window.localStorage.setItem("lang",this.targetLang),window.location.href=window.location.href},clearSetting(){window.localStorage.clear(),window.location.href=window.location.href},hide(){this.hidetip=!0,window.localStorage.setItem("hidetip",!0)},hide2(){this.isOldversion=!1,window.localStorage.setItem("isOldversion",!1)},getJSONFile(){return"https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.lang+"/gamedata/story/"+d.storyFile+".json"},getUserAgent(){return window.navigator.userAgent},getWidth(){return N(window).width()}}},ue={id:"setting"},de={class:"warmtip",style:{"background-color":"rgb(255, 255, 0)",color:"#000",padding:"5px"}},_e=s("span",{style:{float:"left","margin-left":"20px"}},[g("If you like this project, please give me a star "),s("a",{href:"https://github.com/050644zf/ArknightsStoryTextReader",style:{color:"rgb(32, 32, 184)"}},"here"),g("!"),s("br"),g("If you have any issues or feedbacks please summit them "),s("a",{href:"https://github.com/050644zf/ArknightsStoryTextReader/issues",style:{color:"rgb(32, 32, 184)"}},"here"),g(".")],-1),he=s("div",{style:{clear:"both"}},null,-1),me={class:"warmtip",style:{"background-color":"rgb(43 118 61)",padding:"5px"}},ve=s("span",{style:{float:"left","margin-left":"20px"}},[g(" New version of Arknights Story Text Reader has been released! "),s("a",{href:"https://050644zf.github.io/ArknightsStoryTextReader/index2.html"},"Check it out!"),s("br"),g(" \u660E\u65E5\u65B9\u821F\u5267\u60C5\u6587\u672C\u9605\u8BFB\u5668\u5DF2\u53D1\u5E03\u65B0\u7248\u672C\uFF0C"),s("a",{href:"https://050644zf.github.io/ArknightsStoryTextReader/index2.html"},"\u70B9\u6B64\u8BBF\u95EE\u65B0\u7248\uFF01")],-1),pe=s("div",{style:{clear:"both"}},null,-1),ye={class:"settingtitle nt"},ge=s("span",{class:"material-icons clearbutton",style:{float:"right",padding:"4px"}},"delete",-1),fe={class:"settingtitle nt",style:{float:"right","font-weight":"normal"}},be=s("div",{style:{clear:"both"}},null,-1),xe={class:x({settingoptions:!0,nt:!0})},ke=s("span",{class:"material-icons"},"public",-1),we=s("div",{style:{clear:"both"}},null,-1),Se={style:{float:"left"}},$e=s("div",{style:{clear:"both"}},null,-1),Le={style:{float:"left"}},Te=s("div",{style:{clear:"both"}},null,-1),Ce={style:{float:"left"}},Ne=s("div",{style:{clear:"both"}},null,-1),Ie={style:{float:"left","font-weight":"bold"}},Ae=s("span",{class:"material-icons",style:{float:"left"}},"save_alt",-1),ze=s("div",{style:{clear:"both"}},null,-1),Oe=s("span",{class:"xxst",style:{"font-weight":"bold",color:"dimgray"}}," Developer Info/Options (Please attach these info with your issues) ",-1),je={class:"xxst",style:{color:"dimgray"}},Me=g(" Current JsonFile:"),Ue=s("br",null,null,-1),Ee=s("br",null,null,-1),Fe=g(" Browser Info:"),De=s("br",null,null,-1),Be=s("br",null,null,-1),Re=s("br",null,null,-1);function Je(n,t,o,a,e,r){return i(),c("div",ue,[f(s("div",de,[_e,s("span",{class:"material-icons",style:{float:"right"},onClick:t[0]||(t[0]=l=>r.hide())},"clear"),he],512),[[$,!e.hidetip]]),f(s("div",me,[ve,s("span",{class:"material-icons",style:{float:"right"},onClick:t[1]||(t[1]=l=>r.hide2())},"clear"),pe],512),[[$,e.isOldversion]]),s("div",{class:x({setting:!0,settingshow:e.show})},[s("span",{class:x({"material-icons":!0}),onClick:t[2]||(t[2]=l=>e.show=!e.show),id:"settingbutton"}," settings "),s("span",ye,_(e.i18n.setting[e.lang]),1),s("div",{class:"clear",onClick:t[3]||(t[3]=l=>r.clearSetting())},[ge,s("span",fe,_(e.i18n.clear[e.lang]),1)]),be,f(s("div",xe,[ke,f(s("select",{"onUpdate:modelValue":t[4]||(t[4]=l=>e.targetLang=l)},[(i(!0),c(b,null,w(e.langList,l=>(i(),c("option",{key:l},_(l),1))),128))],512),[[F,e.targetLang]]),we,s("span",Se,_(e.i18n.dr[e.lang])+": ",1),f(s("input",{class:"textbox","onUpdate:modelValue":t[5]||(t[5]=l=>e.doctor=l),style:{float:"left"}},null,512),[[j,e.doctor]]),$e,s("span",Le,_(e.i18n.showDelay[e.lang])+": ",1),f(s("input",{class:"checkbox",type:"checkbox","onUpdate:modelValue":t[6]||(t[6]=l=>e.showDelay=l),"true-value":"y","false-value":"n",style:{float:"left"}},null,512),[[O,e.showDelay]]),Te,s("span",Ce,_(e.i18n.hideName[e.lang])+"(beta): ",1),f(s("input",{class:"checkbox",type:"checkbox","onUpdate:modelValue":t[7]||(t[7]=l=>e.hideName=l),"true-value":"y","false-value":"n",style:{float:"left"}},null,512),[[O,e.hideName]]),Ne,s("div",{class:"save",onClick:t[8]||(t[8]=l=>r.save())},[s("span",Ie,_(e.i18n.save[e.lang]),1),Ae,ze]),Oe,s("div",je,[Me,Ue,g(" "+_(r.getJSONFile()),1),Ee,Fe,De,g(" "+_(r.getUserAgent()),1),Be,g(" Browser width: "+_(r.getWidth()),1),Re])],512),[[$,e.show]])],2)])}var Ve=p(ce,[["render",Je]]);const Pe={data(){return{line:this.inputline,hideName:!1}},mounted(){this.hideName=this.isHideName()},props:{inputline:Object,story:Object,lidx:Number},methods:{parseContent(n){return d.parseContent(n)},isHideName(){if(this.lidx=="0"||d.hideName=="n"||!this.line)return!1;var n=this.story[this.lidx-1];return!!(n.prop=="name"&&n.attributes&&this.line.attributes&&(console.log(n),n.attributes.name==this.line.attributes.name))}}},He={class:"textblock"},qe=["innerHTML"];function Ye(n,t,o,a,e,r){return i(),c("div",He,[s("div",{class:x({nameblock:!0,hideName:e.hideName})},_(e.line.attributes.name),3),s("div",{class:"contentblock",innerHTML:r.parseContent(e.line.attributes.content)},null,8,qe)])}var Ge=p(Pe,[["render",Ye]]);const Ke={data(){return{line:this.inputline}},props:{inputline:Object},methods:{parseContent(n){return d.parseContent(n)}}},We=["innerHTML"];function Qe(n,t,o,a,e,r){return i(),c("div",{class:x(e.line.prop),style:M({"text-align":e.line.attributes.alignment}),innerHTML:r.parseContent(e.line.attributes.text)},null,14,We)}var Xe=p(Ke,[["render",Qe]]);const Ze={data(){return{line:this.inputline}},props:{inputline:Object},methods:{parseContent(n){return d.parseContent(n)},jumpTo(n){var t=document.getElementById(n);t.scrollIntoView({behavior:"smooth",block:"center"})},addClass(n,t){var o=document.getElementById(n);o.classList.add(t)},removeClass(n,t){var o=document.getElementById(n);o.classList.remove(t)}}},et=["onClick","onMouseover","onMouseout","innerHTML"];function tt(n,t,o,a,e,r){return i(),c("div",{class:x(e.line.prop)},[(i(!0),c(b,null,w(e.line.attributes.values.split(";"),(l,u)=>(i(),c("div",{key:l,class:"option",onClick:h=>r.jumpTo(e.line.targetLine["option"+l]),onMouseover:h=>r.addClass(e.line.targetLine["option"+l],"PredicateFocused"),onMouseout:h=>r.removeClass(e.line.targetLine["option"+l],"PredicateFocused"),innerHTML:r.parseContent(e.line.attributes.options.split(";")[u])},null,40,et))),128))],2)}var st=p(Ze,[["render",tt]]);const nt={data(){return{line:this.inputline}},props:{inputline:Object}},ot={key:0,class:"optText"};function rt(n,t,o,a,e,r){return i(),c("div",{class:x(e.line.prop)},[e.line.endOfOpt?T("",!0):(i(),c("div",ot,"Options: "+_(e.line.attributes.references.replaceAll(";"," ")),1))],2)}var it=p(nt,[["render",rt]]);const lt={data(){return{line:this.inputline}},props:{inputline:Object}};function at(n,t,o,a,e,r){return i(),c("div",{class:x(e.line.prop),style:M({height:e.line.attributes.time*30+"px"})},null,6)}var ct=p(lt,[["render",at]]);const ut={data(){return{line:this.inputline}},props:{inputline:Object}},dt=["src"];function _t(n,t,o,a,e,r){return i(),c("img",{class:"Image",src:"https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/"+e.line.attributes.image+".png"},null,8,dt)}var ht=p(ut,[["render",_t]]);const mt={data(){return{data:d.storyData,path:d.storyFile,lang:d.l,server:d.server,doctor:d.doctor,i18n:I,showDelay:d.showDelay}},created(){this.path?N.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.server+"/gamedata/story/"+this.path+".json").done(n=>this.data=n).fail(n=>{this.data={eventName:"Error on loading json file: "+this.path+"! If this is a new story, please contact the developer in github issue or discord to update the database."}}):this.data={eventName:"< - "+I.selectStory[this.lang]}},updated(){if(d.urlParams.get("warp")){var n=document.getElementById(d.urlParams.get("warp"));n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),n.style.setProperty("background-color","#f4433633"))}d.focus()},methods:{jumpTo(n){var t=document.getElementById(n);t.scrollIntoView({behavior:"smooth",block:"center"})},changeColor(n,t){var o=document.getElementById(n);setInterval(o.style.setProperty("background-color",t),500)},getURL(n,t,o){return"?s="+n+"&f="+t+"&warp=line"+o},parseContent(n){return d.parseContent(n)}},components:{Nameline:Ge,Subtitle:Xe,Decision:st,Predicate:it,Delay:ct,Showimg:ht}},vt={id:"content"},pt={class:"storydata",id:"storydata"},yt=["id"],gt=["href"],ft=s("div",{style:{clear:"both"}},null,-1);function bt(n,t,o,a,e,r){const l=m("Nameline"),u=m("Subtitle"),h=m("Decision"),y=m("Predicate"),S=m("Delay"),L=m("Showimg");return i(),c("div",vt,[s("div",pt,_(e.data.eventName)+" "+_(e.data.storyCode)+" "+_(e.data.avgTag)+" "+_(e.data.storyName),1),(i(!0),c(b,null,w(e.data.storyList,(v,A)=>(i(),c("div",{key:v.id,class:"line",id:"line"+v.id},[s("a",{href:r.getURL(e.server,e.path,v.id),class:"linkButton material-icons"},"link",8,gt),v.prop=="name"?(i(),k(l,{key:0,inputline:v,lidx:A,story:e.data.storyList},null,8,["inputline","lidx","story"])):T("",!0),v.prop=="Subtitle"?(i(),k(u,{key:1,inputline:v},null,8,["inputline"])):T("",!0),v.prop=="Decision"?(i(),k(h,{key:2,inputline:v},null,8,["inputline"])):T("",!0),v.prop=="Predicate"?(i(),k(y,{key:3,inputline:v},null,8,["inputline"])):T("",!0),v.prop=="Delay"&&e.showDelay=="y"?(i(),k(S,{key:4,inputline:v},null,8,["inputline"])):T("",!0),v.prop=="Image"&&v.attributes.image?(i(),k(L,{key:5,inputline:v},null,8,["inputline"])):T("",!0),ft],8,yt))),128))])}var xt=p(mt,[["render",bt]]);const kt={methods:{scrollToTop(){document.getElementById("storydata").scrollIntoView({behavior:"smooth",block:"center"})}}};function wt(n,t,o,a,e,r){return i(),c("span",{class:"material-icons topButton",onClick:t[0]||(t[0]=l=>r.scrollToTop())},"vertical_align_top")}var St=p(kt,[["render",wt]]);const $t={props:{item:Object,iidx:Number,focus:Boolean},emits:["focusme"]},Lt={key:1,class:"material-icons itemicon lt"},Tt={class:"itemname st"};function Ct(n,t,o,a,e,r){return i(),c("div",{class:x({navitem:!0,itemfocused:o.focus}),onClick:t[0]||(t[0]=l=>{n.$emit("focusme")})},[o.item.icon!="search"?(i(),c("div",{key:0,class:x([o.item.icon,"itemicon","lt"])},null,2)):T("",!0),o.item.icon=="search"?(i(),c("span",Lt,"search")):T("",!0),s("span",Tt,_(o.item.title),1)],2)}var Nt=p($t,[["render",Ct]]);const It={data(){return{navi:{maintheme:{icon:"terminal-maintheme",title:"Maintheme"},intermezzi:{icon:"terminal-intermezzi",title:"Intermezzi"},sidestory:{icon:"terminal-sidestory",title:"Sidestory"},storyset:{icon:"terminal-storyset",title:"Storyset"},or:{icon:"terminal-record",title:"Records"},search:{icon:"search",title:"Search (Beta)"}}}},emits:["focuson"],props:{focus:Number},components:{Navitem:Nt}},At={class:"navibar"};function zt(n,t,o,a,e,r){const l=m("Navitem");return i(),c("div",At,[(i(!0),c(b,null,w(e.navi,(u,h,y)=>(i(),k(l,{key:h,item:u,onFocusme:S=>{o.focus=y,n.$emit("focuson",y)},focus:o.focus==y},null,8,["item","onFocusme","focus"]))),128))])}var Ot=p(It,[["render",zt]]);const jt={data(){return{server:d.server,i18n:I,lang:d.l}},emits:["focusme"],props:{eventData:Object,showStory:Boolean},methods:{exportAll(){let n=this.eventData.infoUnlockDatas,t=this.eventData.name,o=this.eventData.set;window.localStorage.setItem("filename",t+"_"+o);let a=this.server,e=[];n.forEach(r=>{e.push({server:a,path:r.storyTxt,storyCode:r.storyCode,avgTag:r.avgTag,storyName:r.storyName})}),window.localStorage.setItem("exportList",JSON.stringify(e)),window.location.href="export.html"},getAvatar(){return"https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_"+this.eventData.cid+"_"+this.eventData.cin+".png"},loadStory(n){var t="s="+this.server;t=t+"&f="+n,window.location.search=t}}},Mt=["src"],Ut={class:"operatorname"},Et={class:"setnumber"},Ft={class:"orstories"},Dt={class:"exportBar nt"},Bt=s("span",{class:"material-icons"}," file_download ",-1),Rt=["onClick"];function Jt(n,t,o,a,e,r){return i(),c("div",{class:x({oritem:!0,orfocused:o.showStory,lt:!0})},[s("div",{class:"orcard",onClick:t[0]||(t[0]=l=>n.$emit("focusme"))},[s("img",{src:r.getAvatar()},null,8,Mt),s("div",Ut,_(o.eventData.name),1),s("div",Et,"#"+_(o.eventData.set),1)]),f(s("div",Ft,[s("div",Dt,[s("div",{onClick:t[1]||(t[1]=l=>r.exportAll())},[Bt,s("span",null,_(e.i18n.export2excel[e.lang]),1)])]),(i(!0),c(b,null,w(o.eventData.infoUnlockDatas,(l,u)=>(i(),c("div",{class:"orstory",key:u,onClick:h=>r.loadStory(l.storyTxt)},_(u)+". "+_(l.storyName),9,Rt))),128))],512),[[$,o.showStory]])],2)}var Vt=p(jt,[["render",Jt]]);const Pt={data(){return{focus:-1}},props:{eventList:Array},components:{Oritem:Vt},methods:{focuson(n){this.focus==n?this.focus=-1:this.focus=n}}},Ht={class:"record"};function qt(n,t,o,a,e,r){const l=m("Oritem");return i(),c("div",Ht,[(i(!0),c(b,null,w(o.eventList,(u,h)=>(i(),k(l,{key:h,eventData:u,"show-story":e.focus==h,onFocusme:y=>r.focuson(h)},null,8,["eventData","show-story","onFocusme"]))),128))])}var Yt=p(Pt,[["render",qt]]);const Gt={props:["story"],emits:["hidemenu","focusstory","unfoldevent"],data(){return{focused:!1,lang:d.l,server:d.server}},mounted(){d.storyFile==this.story.storyTxt&&(this.focused=!0,this.$emit("unfoldevent"))},methods:{loadStory(n,t){var o="s="+this.server;o=o+"&f="+t,window.location.search=o}}},Kt=["id"],Wt={class:"storycode xst"},Qt={class:"storyname nt"};function Xt(n,t,o,a,e,r){return i(),c("div",{class:x({story:!0,storyFocused:e.focused}),id:o.story.storyId,onClick:t[0]||(t[0]=l=>r.loadStory(e.lang,o.story.storyTxt))},[s("div",Wt,_(o.story.storyCode)+" "+_(o.story.avgTag),1),s("div",Qt,_(o.story.storyName),1)],10,Kt)}var Zt=p(Gt,[["render",Xt]]);const es={props:["event","eventid"],emits:["hidemenu","focusStory"],data(){return{collapsed:!0,i18n:I,lang:d.l,server:d.server}},methods:{exportAll(){let n=this.event.infoUnlockDatas,t=this.event.name,o=this.eventid;window.localStorage.setItem("filename",o+"_"+t);let a=this.server,e=[];n.forEach(r=>{e.push({server:a,path:r.storyTxt,storyCode:r.storyCode,avgTag:r.avgTag,storyName:r.storyName})}),window.localStorage.setItem("exportList",JSON.stringify(e)),window.location.href="export.html"}},components:{Storymenu:Zt}},ts={class:"event"},ss={class:"stories"},ns={class:"exportBar"},os=s("span",{class:"material-icons"}," file_download ",-1);function rs(n,t,o,a,e,r){const l=m("Storymenu");return i(),c("div",ts,[s("div",{class:x({eventname:!0,eventnamehl:!e.collapsed,lt:!0}),onClick:t[0]||(t[0]=u=>e.collapsed=!e.collapsed)},_(o.event.name),3),f(s("div",ss,[s("div",ns,[s("div",{onClick:t[1]||(t[1]=u=>r.exportAll())},[os,s("span",null,_(e.i18n.export2excel[e.lang]),1)])]),(i(!0),c(b,null,w(o.event.infoUnlockDatas,(u,h)=>(i(),k(l,{story:u,onUnfoldevent:t[2]||(t[2]=y=>{e.collapsed=!1,n.$emit("focusStory")}),key:h},null,8,["story"]))),128))],512),[[$,!e.collapsed]])])}var z=p(es,[["render",rs]]);const is={props:{eventList:Object},components:{Eventmenu:z}},ls={class:"maintheme"};function as(n,t,o,a,e,r){const l=m("Eventmenu");return i(),c("div",ls,[(i(!0),c(b,null,w(o.eventList,(u,h)=>(i(),k(l,{key:h,event:u,eventid:u.id},null,8,["event","eventid"]))),128))])}var cs=p(is,[["render",as]]);const us={props:{eventList:Object},components:{Eventmenu:z}},ds={class:"intermezzi"};function _s(n,t,o,a,e,r){const l=m("Eventmenu");return i(),c("div",ds,[(i(!0),c(b,null,w(o.eventList,(u,h)=>(i(),k(l,{key:h,event:u,eventid:u.id},null,8,["event","eventid"]))),128))])}var hs=p(us,[["render",_s]]);const ms={props:{eventList:Object},components:{Eventmenu:z}},vs={class:"sidestory"};function ps(n,t,o,a,e,r){const l=m("Eventmenu");return i(),c("div",vs,[(i(!0),c(b,null,w(o.eventList,(u,h)=>(i(),k(l,{key:h,event:u,eventid:u.id},null,8,["event","eventid"]))),128))])}var ys=p(ms,[["render",ps]]);const gs={props:{eventList:Object},components:{Eventmenu:z}},fs={class:"storyset"};function bs(n,t,o,a,e,r){const l=m("Eventmenu");return i(),c("div",fs,[(i(!0),c(b,null,w(o.eventList,(u,h)=>(i(),k(l,{key:h,event:u,eventid:u.id},null,8,["event","eventid"]))),128))])}var xs=p(gs,[["render",bs]]);const ks={data(){return{searchvalue:"",result:{},server:d.server,resultNumber:0,isIncomplete:!1,isSearching:!1}},props:{eventList:Object},methods:{searchRequest(){this.isSearching=!0,this.result={},this.resultNumber="Searching";var n="https://api.github.com/search/code?q="+this.searchvalue+"+repo:050644zf/ArknightsStoryJson+path:"+this.server+"/gamedata";N.ajaxSetup({headers:{Accept:"application/vnd.github.v3.text-match+json"}}),N.getJSON(n).done(t=>{this.result={};const o=/.+\/gamedata\/story\/(.+)\./;this.resultNumber=t.total_count,this.isIncomplete=t.incomplete_results;var a=[],e=[],r;for(r in t.items)console.log(t.items[r].path.match(o)[1]),e.push(t.items[r].path.match(o)[1]),a.push(t.items[r].text_matches);console.log(a);var l,u,h;for(l in this.eventList){var y=this.eventList[l];for(u in y){var S=y[u],L=[];for(h in S.infoUnlockDatas){var v=e.indexOf(S.infoUnlockDatas[h].storyTxt);v>-1&&(console.log(v),e.splice(v,1),L.push({storyCode:S.infoUnlockDatas[h].storyCode,avgTag:S.infoUnlockDatas[h].avgTag,storyName:S.infoUnlockDatas[h].storyName,storyPath:S.infoUnlockDatas[h].storyTxt,text_matches:a[v]}),a.splice(v,1))}L.length&&(this.result[S.name]=L)}}}),this.isSearching=!1},parseFrag(n,t){if(n){var o;for(o in t)n=n.replaceAll(t[o].text,'<span style="color:yellow">'+t[o].text+"</span>");n=n.replaceAll("\\n","<br/>")}return n},loadStory(n){var t="s="+this.server;t=t+"&f="+n,window.location.search=t}}},ws={class:"search"},Ss=s("br",null,null,-1),$s={style:{display:"flex","align-items":"center","justify-content":"space-between"}},Ls={class:"resulttitle"},Ts={style:{"font-size":"smaller"}},Cs=s("br",null,null,-1),Ns=["onClick"],Is=["innerHTML"],As=s("div",{class:"st",style:{margin:"10%",color:"rgba(255,255,255,0.7)"}},[s("p",{style:{"text-align":"center"}},"The search feature is powered by Github API."),s("p",{style:{"font-weight":"bold"}},"Didn't find the expected result?"),s("p",null,[g("The Github code search only return the result that the target text is exactly surrounded by "),s("span",{style:{"font-weight":"bold"}},"spaces or punctuation"),g(". Try using plural noun or change its tense to get more results. ")])],-1);function zs(n,t,o,a,e,r){return i(),c("div",ws,[s("div",{class:x({searchbar:!0,searching:e.isSearching,nt:!0})},[f(s("input",{"onUpdate:modelValue":t[0]||(t[0]=l=>e.searchvalue=l),onKeyup:t[1]||(t[1]=D(l=>r.searchRequest(),["enter"]))},null,544),[[j,e.searchvalue]]),s("span",{class:"material-icons",onClick:t[2]||(t[2]=l=>r.searchRequest())},"search")],2),s("div",{class:x({searchresult:!0,searching:e.isSearching})},[g(_(e.resultNumber)+" results",1),Ss,(i(!0),c(b,null,w(e.result,(l,u,h)=>(i(),c("div",{key:h,style:{"font-weight":"bold",margin:"5px"}},[g(_(u)+" ",1),(i(!0),c(b,null,w(l,(y,S)=>(i(),c("div",{key:S,style:{"font-weight":"normal","margin-left":"20px"}},[s("div",$s,[s("div",Ls,[s("span",Ts,_(y.storyCode)+" "+_(y.avgTag),1),Cs,s("span",null,_(y.storyName),1)]),s("span",{class:"material-icons loadButton",onClick:L=>r.loadStory(y.storyPath)},"open_in_new",8,Ns)]),(i(!0),c(b,null,w(y.text_matches,(L,v)=>(i(),c("div",{class:"textmatch",key:v,innerHTML:r.parseFrag(L.fragment,L.matches)},null,8,Is))),128))]))),128))]))),128))],2),As])}var Os=p(ks,[["render",zs]]);const js={data(){return{focus:0,i18n:I,lang:d.l,server:d.server,chardict:{},intermezzi:d.intermezzi,eventList:{},data:{},showLangSelect:!1}},created(){N.getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/"+this.server+"/gamedata/excel/story_review_table.json").done(n=>{this.data=n,N.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.server+"/chardict.json").done(t=>{this.chardict=t,this.eventList=this.getEventList(this.data,this.chardict)})})},components:{Navibar:Ot,Maintheme:cs,Intermezzi:hs,Sidestory:ys,Storyset:xs,Or:Yt,Search:Os},methods:{serverSwitch(n){var t="s="+n;window.location.search=t},getEventList(n,t){var o={maintheme:[],intermezzi:[],sidestory:[],storyset:[],or:[]},a;for(a in n)if(n[a].entryType=="MAINLINE")o.maintheme.push(n[a]);else if(n[a].entryType=="ACTIVITY")this.intermezzi.indexOf(a)==-1?o.sidestory.push(n[a]):o.intermezzi.push(n[a]);else if(n[a].entryType=="MINI_ACTIVITY")o.storyset.push(n[a]);else if(n[a].entryType=="NONE"){var e=a.split("_")[1],r=a.split("_")[3];n[a].name=t[e].name,n[a].cid=t[e].id,n[a].cin=e,n[a].set=r,o.or.push(n[a])}return o.intermezzi.sort(function(l,u){return l.startTime-u.startTime}),o.sidestory.sort(function(l,u){return l.startTime-u.startTime}),o.storyset.sort(function(l,u){return l.startTime-u.startTime}),o}}},Ms={class:"menupage"},Us={id:"currentLang lt",class:"currentLang"},Es=s("span",{class:"material-icons lt",style:{"margin-right":"5px"}},"language",-1),Fs={class:"lt"},Ds={id:"langSelect",class:"langSelect lt"},Bs=["onClick"],Rs=s("br",null,null,-1);function Js(n,t,o,a,e,r){const l=m("Navibar"),u=m("Maintheme"),h=m("Intermezzi"),y=m("Sidestory"),S=m("Storyset"),L=m("Or"),v=m("Search");return i(),c("div",Ms,[s("div",Us,[s("div",{style:{display:"flex","align-items":"center","justify-content":"center"},onClick:t[0]||(t[0]=A=>e.showLangSelect=!e.showLangSelect)},[Es,s("span",Fs,_(e.i18n.server[e.server]),1)]),f(s("div",Ds,[(i(!0),c(b,null,w(e.i18n.server,(A,U,E)=>(i(),c("div",{onClick:hn=>r.serverSwitch(U),key:E},_(A),9,Bs))),128))],512),[[$,e.showLangSelect]])]),Rs,C(l,{focus:e.focus,onFocuson:t[1]||(t[1]=A=>e.focus=A)},null,8,["focus"]),f(C(u,{eventList:e.eventList.maintheme},null,8,["eventList"]),[[$,e.focus==0]]),f(C(h,{eventList:e.eventList.intermezzi},null,8,["eventList"]),[[$,e.focus==1]]),f(C(y,{eventList:e.eventList.sidestory},null,8,["eventList"]),[[$,e.focus==2]]),f(C(S,{eventList:e.eventList.storyset},null,8,["eventList"]),[[$,e.focus==3]]),f(C(L,{eventList:e.eventList.or},null,8,["eventList"]),[[$,e.focus==4]]),f(C(v,{eventList:e.eventList},null,8,["eventList"]),[[$,e.focus==5]])])}var Vs=p(js,[["render",Js]]);const Ps={data(){return{storyData:{},storyFile:d.storyFile,lang:d.l,server:d.server,latestUpdate:0}},created(){N.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/log.json").done(n=>{console.log(n),this.latestUpdate=n.latestCommitTime})},components:{Header:R,Menu:ae,Content:xt,Settings:Ve,Topbtn:St,Menupage:Vs},methods:{dateFormatter(n){var t=new Date(n*1e3),o="";return o=t.getUTCFullYear()+"-"+(t.getUTCMonth()+1)+"-"+t.getUTCDate()+" "+t.getUTCHours()+":"+t.getUTCMinutes()+":"+t.getUTCSeconds(),o}}},Hs=s("hr",null,null,-1),qs={class:"footer"},Ys=s("div",{class:"links st"},[s("a",{href:"https://github.com/050644zf/ArknightsStoryTextReader"},"Project Repo / \u9879\u76EE\u4ED3\u5E93"),s("br"),s("br"),s("a",{href:"https://github.com/050644zf/ArknightsStoryTextReader/issues"},"Bug Report & Feedbacks / \u95EE\u9898\u53CD\u9988\u548C\u5EFA\u8BAE"),s("br"),s("br")],-1),Gs={class:"info st"},Ks=s("br",null,null,-1),Ws=s("br",null,null,-1),Qs=g(" Current Status/\u5F53\u524D\u72B6\u6001: "),Xs=s("br",null,null,-1),Zs=s("img",{src:"https://app.travis-ci.com/050644zf/ArknightsStoryTextReader.svg?branch=master"},null,-1),en=s("img",{src:"https://github.com/050644zf/ArknightsStoryTextReader/actions/workflows/ASTRAutoUpdater.yml/badge.svg"},null,-1),tn=s("br",null,null,-1),sn=s("br",null,null,-1),nn=g(" If you like this project, please give me a star "),on=s("a",{href:"https://github.com/050644zf/ArknightsStoryTextReader"},"here",-1),rn=g("!"),ln=s("br",null,null,-1),an=g(" \u5982\u679C\u60A8\u559C\u6B22\u672C\u9879\u76EE\uFF0C\u8BF7\u5728"),cn=s("a",{href:"https://github.com/050644zf/ArknightsStoryTextReader"},"\u8FD9\u91CC",-1),un=g("\u7ED9\u6211\u4E00\u4E2Astar\uFF01 ");function dn(n,t,o,a,e,r){const l=m("Header"),u=m("Menu"),h=m("Settings"),y=m("Menupage"),S=m("Content"),L=m("Topbtn");return i(),c(b,null,[C(l),e.storyFile?(i(),k(u,{key:0})):T("",!0),C(h),e.storyFile?T("",!0):(i(),k(y,{key:1})),e.storyFile?(i(),k(S,{key:2})):T("",!0),C(L),Hs,s("div",qs,[Ys,s("div",Gs,[g(" Last Update/\u6700\u540E\u66F4\u65B0 (UTC): "+_(r.dateFormatter(e.latestUpdate)),1),Ks,Ws,Qs,Xs,Zs,en,tn,sn,nn,on,rn,ln,an,cn,un])])],64)}var _n=p(Ps,[["render",dn]]);B(_n).mount("#ASTR");console.log(d.urlParams.get("f"));
