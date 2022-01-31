`/:server/menu` 主目录页
  `:server` 服务器类型 目前可取值 `zh_CN|en_US|ja_JP|ko_KR|zh_TW`
  `/` 会重定向至 `/zh_CN/menu`
  `:server/menu/:eventtype` 指向不同活动类型
    `:eventtype` 有 `maintheme|intermezzi|sidestory|or` 四种取值

`/:server/content/:f` 内容页
  `:f` 内容的相对URL