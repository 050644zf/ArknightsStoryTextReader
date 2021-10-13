import $ from 'jquery'

var urlParams = new URLSearchParams(window.location.search);
var l = urlParams.get('l');
var doctor = window.localStorage.getItem('doctor');
var hidetip = window.localStorage.getItem('hidetip');
var showDelay = window.localStorage.getItem('showDelay');
var hideName = window.localStorage.getItem('hideName');
var storyFile = urlParams.get('f');
var storyData = {eventName: "Loading..."};

if(!l){l = 'zh_CN'}
if(!doctor){doctor = "{@nickname}"}
if(!hidetip){hidetip = false};
if(!showDelay){showDelay = 'y'};
if(!hideName){hideName = 'n'};



export default {
    urlParams: urlParams,
    l: l,
    doctor: doctor,
    hidetip: hidetip,
    showDelay: showDelay,
    hideName: hideName,
    storyFile: storyFile,
    storyData: storyData,
    parseContent(content){
        if(content){
            const color_re = /<color=([\w#]+)>(.+?)<\/color>/gm;
            const color_sub = `<span style="color:$1">$2</span>`;
            content = content.replaceAll('{@nickname}',this.doctor);
            content = content.replaceAll('\\n','<br/>')
            content = content.replace(color_re,color_sub);
        }
        return content;
    },
    focus(){
        var foc = document.getElementsByClassName('storyFocused')[0];
        if(foc){
            foc.scrollIntoView({behavior: "smooth", block: "center"});
        }
        console.log('focused!')
    }
}