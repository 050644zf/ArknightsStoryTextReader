# Arknights Story Text Reader

The python scripts for this repository have been move to [ASTR-Script](https://github.com/050644zf/ASTR-Script)

<p align="center">
    <img src="reader/src/assets/favicon.png" width="75px"/>&nbsp;
    <img src="reader/src/assets/ASTReader.png" height="75px"/>
</p>

<p align="center">
    <a href="https://050644zf.github.io/ArknightsStoryTextReader/index2.html#/zh_CN/menu">CN</a> |
    <a href="https://050644zf.github.io/ArknightsStoryTextReader/index2.html#/ja_JP/menu">JP</a> |
    <a href="https://050644zf.github.io/ArknightsStoryTextReader/index2.html#/ko_KR/menu">KR</a> |
    <a href="https://050644zf.github.io/ArknightsStoryTextReader/index2.html#/en_US/menu">EN</a> |
    <a href="https://050644zf.github.io/ArknightsStoryTextReader/index2.html#/zh_TW/menu">TW</a> 
</p>

<p align="center">
    <img src="https://img.shields.io/github/stars/050644zf/ArknightsStoryTextReader"/>&nbsp;
    <img src="https://visitor-badge.glitch.me/badge?page_id=050644zf.ASTR"/>&nbsp;
    <img src="https://github.com/050644zf/ArknightsStoryTextReader/actions/workflows/build.yml/badge.svg"/>&nbsp;
    <img src="https://github.com/050644zf/ArknightsStoryTextReader/actions/workflows/ASTRAutoUpdater.yml/badge.svg"/>
</p>

[Arknights Story Text Reader](https://050644zf.github.io/ArknightsStoryTextReader/index2.html) is a website that help you view stories text in mobile game Arknights with following features:

- Browsing Stories in all Arknights Servers (CN/JP/KR/EN/TW), and easily switch to different server in events, stories or anywhere else at upper right corner(if corresponding event exist).
- Providing settings for configuring interface language and doctor's name in story
- Pretty formatted story text, selecting option will navigate to corresponding line (in most stories)
- More interesting features in misc

## Thanks to the Generous Support from Sponsors!

> Thymewarp
> Bo Yi-bo
> wangxu

## Development Info

### File Structure

`/.github`: Github Action Related Script

`/ASTR`: Assets like Icons and fonts.

`/reader`: Main Code Folder

`/reader/src/ASTR`: Legacy Version of ASTR (Deprecated)

`/reader/src/ASTRv2`: Current Version of ASTR (In active development)

### Related Repositories

[ASTR-Script](https://github.com/050644zf/ASTR-Script) : Python script to generate data, including convert raw txt into json, counting words/characters, summarize story introdution and so on.

[Kengxxiao/ArknightsGameData](https://github.com/Kengxxiao/ArknightsGameData) : Providing raw data, trigger of the Github Actions.

[ArknightsStoryJson](https://github.com/050644zf/ArknightsStoryJson) : Storing the result generated from [ASTR-Script](https://github.com/050644zf/ASTR-Script).

[Aceship/Arknight-Images](https://github.com/Aceship/Arknight-Images) : Providing images.

### Building ASTR

```bash
cd reader
npm install
npm run build
```

### Hosting ASTR Locally for Development

```bash
cd reader
npm install
npm run dev
```

### ASTRv2  Explained

1. Entrance Script: `reader\src\main2.js`
2. Load server data in `reader\src\ASTRv2\server.vue` into session storage, including `story_review_table.json` (events and stories index), `chardict.json` (character id -> character name), `storyinfo.json` (story path -> story info), `chapter_table.json` (maintheme index) and `wordcount.json` (words/chars countings of stories).
3. Render corresponding components base on route. Fetch more data (like story json) if necessary.
