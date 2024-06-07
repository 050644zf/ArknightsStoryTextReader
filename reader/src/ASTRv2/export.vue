<template>
  <n-layout-content>
    <n-space vertical class="exportpage">
      <n-breadcrumb class="breadcrumb">
        <n-breadcrumb-item
          @click="$router.push('/' + $route.params.server + '/menu')"
        >
          <n-icon><MenuIcon /></n-icon>
          {{ i18n.menu[currentLang] }}
        </n-breadcrumb-item>
        <n-breadcrumb-item>{{
          i18n.export2excel[currentLang]
        }}</n-breadcrumb-item>
      </n-breadcrumb>
      <n-data-table
        :columns="cols"
        :data="exportList"
        size="small"
        max-height="300"
        min-height="300"
        virtual-scroll
        striped
        style="width: 90%"
      >
      </n-data-table>
      <n-space item-style="display: flex;" align="center">
        <n-text>导出文件名 / Export File Name: </n-text>
        <n-input v-model:value="filename" autosize size="large">
          <template #suffix> .xlsx </template>
        </n-input>
      </n-space>
      <n-space item-style="display: flex;" align="center" justify="end">
        <n-button @click="removeAll" type="error">
          <n-icon size="24"><ClearIcon /></n-icon>&nbsp; 清空 / Clear
        </n-button>
        <n-button @click="exportAll" type="primary" :loading="processing">
          <template #icon>
            <n-icon><ExportIcon /></n-icon>
          </template>
          导出 / Export
        </n-button>
      </n-space>

      <n-progress
        type="line"
        :status="processing ? 'warning' : 'success'"
        :percentage="percentage"
        :indicator-placement="'inside'"
        :processing="processing"
      />

      <n-log :log="logs" trim class="logarea" />

      <!-- <div class="exportpage">
                <button class="homepage lt" @click="home()">
                    <span class="material-icons">
                    menu_open
                    </span>
                    <span class="home nt">返回上一页/Return to Last Page</span>
                </button>
            <div class="nt">当前导出列表/Current Exporting List: </div>
            <div class="exportList st">
                <table>
                    <tr v-for="(item, iidx) in exportList" :key="iidx" class="exportItem">
                        <td>{{item.server}}</td>
                        <td>{{item.storyCode}} {{item.avgTag}}</td>
                        <td>{{item.storyName}}</td>
                        <td>{{item.path}}</td>
                    </tr>
                </table>
            </div>

            <div class="filename lt">
                <span>导出文件名 / Export File Name: </span>
                <input type="text" v-model="filename" placeholder="请输入文件名/Please input file name"/>
                <span>.xlsx</span>
            </div>
            <div>
                <button class="removeAll nt" @click="removeAll()">
                    <span class="material-icons">
                        clear_all
                    </span>
                    <span>清空/Clear</span>
                </button>
                <button class="exportBtn nt" @click="exportAll()">
                    <span class="material-icons">
                        file_download
                    </span>
                    <span>导出所有/Export All</span>
                </button>
            </div>

            <div class="logArea xst" v-html="logs"></div>
        </div> -->
    </n-space>
  </n-layout-content>
</template>

<script>
import xlsx from "xlsx";
import i18n from "./i18n.json";
import func from "./func";
import {
  MenuOpenFilled,
  ClearAllOutlined,
  FileDownloadOutlined,
} from "@vicons/material";

export default {
  data() {
    return {
      exportList: [],
      filename: "export",
      exportFile: null,
      logs: "=====导出日志/Export Logs=====\n",
      i18n: i18n,
      cols: [
        { title: "Server", key: "server", width: 100 },
        { title: "Story Code", key: "storyCode", width: 100 },
        { title: "Avg Tag", key: "avgTag" },
        { title: "Story Name", key: "storyName" },
        { title: "Path", key: "path", ellipsis: { tooltip: true } },
      ],
      currentLang: func.l,
      percentage: 0,
      processing: false,
    };
  },
  created() {
    this.exportList = window.localStorage.getItem("exportList")
      ? JSON.parse(window.localStorage.getItem("exportList"))
      : [];
    this.filename = window.localStorage.getItem("filename")
      ? window.localStorage.getItem("filename")
      : "export";
  },
  methods: {
    removeAll() {
      this.exportList = [];
      window.localStorage.setItem(
        "exportList",
        JSON.stringify(this.exportList)
      );
      this.filename = "export";
      window.localStorage.setItem("filename", this.filename);
    },
    async exportAll() {
      this.processing = true;
      this.percentage = 0;
      this.logs = "Export Process Start...\n";
      this.logs += "Export List Length: " + this.exportList.length + "\n";
      this.exportFile = xlsx.utils.book_new();
      this.exportFile.Props = {
        Title: "Exported Data",
        Subject:
          "Exported from Arknights Story Text Reader. https://050644zf.github.io/ArknightsStoryTextReader/",
      };
      this.logs += "Workbook Created.\n";
      //this.exportStories().then(xlsx.writeFile(this.exportFile, 'export.xlsx',{type: 'file'}));
      //this.logs += 'Export Finished.<br/>';
      /*{
                this.logs += 'Exporting Story: '+story.storyCode + ' ' + story.avgTag + ' ' + story.storyName + '<br/>';
                var storyData = null;
                $.getJSON('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+story.server+'/gamedata/story/'+story.path+'.json').done(s => {
                    storyData = s;
                    var storyList = this.reader(storyData);
                    var sheet = xlsx.utils.aoa_to_sheet(storyList);
                    await this.book_append_sheet(this.exportFile, sheet, story.path.split('/')[2]);
                    if(story == this.exportList.length - 1){
                        xlsx.writeFile(this.exportFile, 'export.xlsx',{type: 'file'});
                        this.logs += 'Export Process Finished.<br/>';
                        }
                    });

            }*/
      await new Promise((resolve) => {
        this.exportStories().then(resolve);
      }).then(() => {
        xlsx.writeFile(this.exportFile, this.filename + ".xlsx", {
          type: "file",
        });
        this.processing = false;
        this.percentage = 100;
        this.logs += "Export Process Finished.\n";
      });
    },
    async exportStories() {
      for (const story of this.exportList) {
        await this.exportStory(story);
        this.percentage = Math.ceil(
          (this.exportList.indexOf(story) / this.exportList.length) * 100
        );
      }
    },
    async exportStory(story) {
      this.logs +=
        "Exporting Story: " +
        story.storyCode +
        " " +
        story.avgTag +
        " " +
        story.storyName +
        "\n";
      let storyData = await fetch(
        "https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/" +
          story.server +
          "/gamedata/story/" +
          story.path +
          ".json"
      );
      storyData = await storyData.json();
      let storyList = this.reader(storyData);
      let sheet = xlsx.utils.aoa_to_sheet(storyList);
      sheet["!cols"] = [];
      sheet["!cols"][0] = { hidden: true, wch: 15 };
      sheet["!cols"][1] = { wch: 25 };
      sheet["!cols"][2] = { wch: 70 };
      return await new Promise((resolve, reject) => {
        xlsx.utils.book_append_sheet(
          this.exportFile,
          sheet,
          this.getsheetname(story.path)
        );
        resolve();
      });
    },
    getsheetname(path) {
      const len = path.split("/").length;
      return path.split("/")[len - 1];
    },
    reader(storyJson) {
      var storyList = [];
      for (var lidx in storyJson["storyList"]) {
        var line = storyJson["storyList"][lidx];
        var index = line.id;
        var prop = line.prop.toLowerCase();
        var attrs = line.attributes;

        if (prop == "Comment") {
          storyList.push([index, "--Comment--", attrs.value]);
        }
        if (prop == "name") {
          storyList.push([index, attrs.name, attrs.content]);
        }
        if (prop == "multiline") {
          storyList.push([index, attrs.name, attrs.content]);
        }
        if (prop == "dialog") {
          storyList.push([index, "----", "----"]);
        }
        if (prop == "decision") {
          storyList.push([index, "--Decision--", "----"]);
          var options = attrs.options.split(";");
          var values = attrs.values.split(";");
          for (let i = 0; i < Math.min(options.length, values.length); i++) {
            storyList.push([index, "Option_" + values[i], options[i]]);
          }
          storyList.push([index, "--Decision End--", "----"]);
        }
        if (prop == "predicate") {
          if (line.endOfOpt) {
            storyList.push([index, "--Branch--", "End of Options"]);
          } else {
            storyList.push([
              index,
              "--Branch--",
              ">Options_" + attrs.references.replaceAll(";", "&"),
            ]);
          }
        }
        if (prop == "subtitle") {
          storyList.push([""]);
          storyList.push([index, "", attrs.text]);
          storyList.push([""]);
        }
        if (prop == "sticker") {
          storyList.push([""]);
          storyList.push([index, "", attrs.text]);
        }
        if (prop == "stickerclear") {
          storyList.push([""]);
        }
        if (Object.keys(attrs).indexOf("image") != -1) {
          prop = prop.toLowerCase();
          if (prop == "backgroundtween") {
            prop == "background";
          } else if (prop == "showitem") {
            prop == "item";
          }
          storyList.push([
            index,
            "--" + prop + "--",
            "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/" +
              prop +
              "s/" +
              attrs.image +
              ".png",
          ]);
        }
      }
      return storyList;
    },
    async book_append_sheet(wb, ws, sheet_name) {
      xlsx.utils.book_append_sheet(wb, ws, sheet_name);
      return await Promise.resolve("done");
    },
    home() {
      history.back();
    },
  },
  components: {
    MenuIcon: MenuOpenFilled,
    ClearIcon: ClearAllOutlined,
    ExportIcon: FileDownloadOutlined,
  },
};
</script>

<style>
.exportpage {
  margin: 3% 15%;
}
.logarea {
  background-color: rgb(36, 36, 39);
  border-radius: 5px;
  min-height: 100px;
}
</style>
