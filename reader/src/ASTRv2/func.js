const langList = ['zh_CN','en_US','ko_KR','ja_JP','zh_TW'];
const bgModes = ['full','stripe','off']
var urlParams = new URLSearchParams(window.location.search);
var server = urlParams.get('s');
var l = window.localStorage.getItem('lang');
var doctor = window.localStorage.getItem('doctor');
var hidetip = window.localStorage.getItem('hidetip');
var showDelay = window.localStorage.getItem('showDelay');
var hideName = window.localStorage.getItem('hideName');
var wversion = window.localStorage.getItem('wversion');
// var showbg = window.localStorage.getItem('showbg');
var bgMode = window.localStorage.getItem('bgMode');
var inited = window.localStorage.getItem('inited');
var mirror = window.localStorage.getItem('mirror');
var fontsize = window.localStorage.getItem('fontsize');
var margin = window.localStorage.getItem('margin');
var storyFile = urlParams.get('f');
var storyData = {eventName: "Loading..."};
var isOldversion = false;
const currentwversion = 13;

if(!server){server = 'zh_CN'};
if(!l || l == 'none' || l == 'Default'){l = navigator.language.replace('-','_')};
if(l=='ja'){l = 'ja_JP'};
if(langList.indexOf(l) == -1){l = 'en_US'};
console.log('Current Language: '+l);
if(!doctor){doctor = "{@nickname}"};
if(!hidetip){hidetip = false};
if(!showDelay){showDelay = 'y'};
if(!hideName){hideName = 'n'};
if(!bgMode){bgMode = 'stripe'};
if(!inited){inited = false};
if(!mirror){mirror = 'origin'};
if(!margin){margin = 4}
if(!fontsize){fontsize = 14};
if(!wversion||wversion<currentwversion){wversion = currentwversion; window.localStorage.setItem('wversion',wversion);isOldversion = true};


export default {
    urlParams: urlParams,
    l: l,
    langList:langList,
    server: server,
    doctor: doctor,
    hidetip: hidetip,
    showDelay: showDelay,
    bgMode: bgMode,
    bgModes: bgModes,
    hideName: hideName,
    inited: inited,
    mirror: mirror,
    margin: margin,
    fontsize: fontsize,
    storyFile: storyFile,
    storyData: storyData,
    intermezzi: ['act9d0', 'act18d0', 'act18d3','act17side','act25side'],
    wversion: wversion,
    isOldversion: isOldversion,
    parseContent(content){
        if(content){
            const color_re = /<color=([\w#]+)>(.+?)<\/color>/gm;
            const color_sub = `<span style="color:$1">$2</span>`;
            const nbsp_sub_before = /(\s+)(<\/?\w+>)/gm;
            const nbsp_sub_after = /(<\/?\w+>)(\s+)/gm;
            content = content.replaceAll('{@nickname}',this.doctor);
            content = content.replace(/(?:\r\n|\r|\n|\\n|\\r)/g, '<br>');
            content = content.replace(color_re,color_sub);
            content = content.replace("#000000","white");
            content = content.replace(nbsp_sub_before,'&nbsp;$2');
            content = content.replace(nbsp_sub_after,'$1&nbsp;');
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