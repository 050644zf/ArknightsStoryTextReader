const IMAGES_SRC_REPOS = {
  Aceship: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main",
  fexli: "https://raw.githubusercontent.com/fexli/ArknightsResource/main",
};

export default {
  IMAGES_SRC_REPOS: IMAGES_SRC_REPOS,
  getAvgUrl(repo, imgtype, image) {
    if (repo == "Aceship") {
      return `${IMAGES_SRC_REPOS[repo]}/avg/${imgtype}/${image}.png`;
    } else if (repo == "fexli") {
      if (imgtype == "backgrounds") {
        return `${IMAGES_SRC_REPOS[repo]}/avgs/bg/${image}.png`;
      } else {
        return `${IMAGES_SRC_REPOS[repo]}/avgs/${image}.png`;
      }
    }
  },
  getEquipUrl(repo, uniEquipId) {
    if (repo == "Aceship") {
      return `${IMAGES_SRC_REPOS[repo]}/equip/icon/${uniEquipId}.png`;
    } else if (repo == "fexli") {
      return `${IMAGES_SRC_REPOS[repo]}/equip/${uniEquipId}.png`;
    }
  },
  getAvatarUrl(repo, charId) {
    if (repo == "Aceship") {
      return `${IMAGES_SRC_REPOS[repo]}/avatars/${charId}.png`;
    } else if (repo == "fexli") {
      return `${IMAGES_SRC_REPOS[repo]}/avatar/ASSISTANT/${charId}.png`;
    }
  },
};
