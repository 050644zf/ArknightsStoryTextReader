import $ from 'jquery'

var urlParams = new URLSearchParams(window.location.search);
var l = urlParams.get('l');
var doctor = window.localStorage.getItem('doctor');
var hidetip = window.localStorage.getItem('hidetip');
var showDelay = window.localStorage.getItem('showdelay');
var storyFile = urlParams.get('f');
var storyData = {eventName: "Loading..."};

if(!l){l = 'zh_CN'}
if(!doctor){doctor = "{@nickname}"}
if(!hidetip){hidetip = false};
if(!showDelay){showDelay = true};



export default {
    color_re: /<color=([\w#]+)>(.+?)<\/color>/gm,
    color_sub: `<span style="color:$1">$2</span>`,
    urlParams: urlParams,
    l: l,
    doctor: doctor,
    hidetip: hidetip,
    showDelay: showDelay,
    storyFile: storyFile,
    storyData: storyData,
    parseContent(content){
        if(content){
            content = content.replaceAll('{@nickname}',this.doctor);
            content = content.replaceAll('\\n','<br/>')
            content = content.replace(color_re,color_sub);
        }
        return content;
    }
}