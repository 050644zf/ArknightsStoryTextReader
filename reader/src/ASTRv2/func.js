const langList = ["zh_CN", "en_US", "ko_KR", "ja_JP", "zh_TW"];
const serverList = ["zh_CN", "en_US", "ko_KR", "ja_JP", "zh_TW"];
const bgModes = ["full", "stripe", "off"];
const professions = [
  "PIONEER",
  "CASTER",
  "WARRIOR",
  "MEDIC",
  "TANK",
  "SUPPORT",
  "SNIPER",
  "SPECIAL",
];
const professions_aceship = [
  "VANGUARD",
  "CASTER",
  "GUARD",
  "MEDIC",
  "DEFENDER",
  "SUPPORTER",
  "SNIPER",
  "SPECIALIST",
];

const rarity_colors = [
  "#000000",
  "#9F9F9F",
  "#DCE537",
  "#00B2F6",
  "#DBB1DB",
  "#FFAE00",
  "#FF6600",
];

const server_epoch = {
  zh_CN: 2019,
  en_US: 2020,
  ko_KR: 2020,
  ja_JP: 2020,
}

var urlParams = new URLSearchParams(window.location.search);
var server = urlParams.get("s");
var l = window.localStorage.getItem("lang");
var alt = window.localStorage.getItem("alt");
var doctor = window.localStorage.getItem("doctor");
var hidetip = window.localStorage.getItem("hidetip");
var showDelay = window.localStorage.getItem("showDelay");
var hideName = window.localStorage.getItem("hideName");
var wversion = window.localStorage.getItem("wversion");
// var showbg = window.localStorage.getItem('showbg');
var bgMode = window.localStorage.getItem("bgMode");
var inited = window.localStorage.getItem("inited");
var mirror = window.localStorage.getItem("mirror");
var fontsize = window.localStorage.getItem("fontsize");
var margin = window.localStorage.getItem("margin");
var imageRepo = window.localStorage.getItem("imageRepo");
var storyFile = urlParams.get("f");
var storyData = { eventName: "Loading..." };
var isOldversion = false;
const currentwversion = 13;

if (!server) {
  server = "zh_CN";
}
if (!alt) {
  alt = 'none';
}
if (!l || l == "none" || l == "Default") {
  l = navigator.language.replace("-", "_");
}
if (l == "ja") {
  l = "ja_JP";
}
if (langList.indexOf(l) == -1) {
  l = "en_US";
}
console.log("Current Language: " + l);
if (!doctor) {
  doctor = "{@nickname}";
}
if (!hidetip) {
  hidetip = false;
}
if (!showDelay) {
  showDelay = "y";
}
if (!hideName) {
  hideName = "n";
}
if (!bgMode) {
  bgMode = "stripe";
}
if (!imageRepo) {
  imageRepo = "fexli";
}
if (!inited) {
  inited = false;
}
if (!mirror) {
  mirror = "origin";
}
if (!margin) {
  margin = 4;
}
if (!fontsize) {
  fontsize = 14;
}
if (!wversion || wversion < currentwversion) {
  wversion = currentwversion;
  window.localStorage.setItem("wversion", wversion);
  isOldversion = true;
}

export default {
  urlParams: urlParams,
  professions: professions,
  professions_aceship: professions_aceship,
  rarity_colors: rarity_colors,
  l: l,
  alt: alt,
  langList: langList,
  serverList: serverList,
  server: server,
  server_epoch: server_epoch[server],
  doctor: doctor,
  hidetip: hidetip,
  showDelay: showDelay,
  bgMode: bgMode,
  bgModes: bgModes,
  imageRepo: imageRepo,
  hideName: hideName,
  inited: inited,
  mirror: mirror,
  margin: margin,
  fontsize: fontsize,
  storyFile: storyFile,
  storyData: storyData,
  intermezzi: [
    "act9d0",
    "act18d0",
    "act18d3",
    "act17side",
    "act25side",
    "act33side",
    "act37side"
  ],
  collab: [
    "act17d0",
    "act13mini",
    "act32side"
  ],
  wversion: wversion,
  isOldversion: isOldversion,
  parseContent(content) {
    if (content) {
      const color_re = /<color=([\w#]+)>(.+?)<\/color>/gm;
      const color_sub = `<span style="color:$1">$2</span>`;
      const nbsp_sub_before = /(\s+)(<\/?\w+>)/gm;
      const nbsp_sub_after = /(<\/?\w+>)(\s+)/gm;
      content = content.replaceAll("{@nickname}", this.doctor);
      content = content.replaceAll("{@nbs}", "&nbsp;");
      content = content.replace(/(?:\r\n|\r|\n|\\n|\\r)/g, "<br>");
      content = content.replace(color_re, color_sub);
      // content = content.replace("#000000","white");
      content = content.replace(nbsp_sub_before, "&nbsp;$2");
      content = content.replace(nbsp_sub_after, "$1&nbsp;");
    }
    return content;
  },
  focus() {
    var foc = document.getElementsByClassName("storyFocused")[0];
    if (foc) {
      foc.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    console.log("focused!");
  },
};
