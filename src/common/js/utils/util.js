/**
 * 处理提交工单选项被点击后的逻辑
 * @param index 工单选项对应的index
 * @param path 点击工单选项后将要打开的页面的path
 */
export function handleClickOption(index, path) {
  console.log(this.$route);
  let tabIndex = -1;
  this.tabContents.forEach((tab, index) => {
    if (tab.name === this.currentActiveTabName) {
      tabIndex = index;
    }
  });
  this.setTabIndex(`${index}`);
  this.$router.replace({
    path: `${path}`,
    query: {
      index: this.tabIndex[index]
    }
  });
  this.setTabContentRouteAndName({
    tabIndex,
    newRoute: `${path}?index=${this.tabIndex[index]}`,
    newName: `${path}?index=${this.tabIndex[index]}`
  });
  this.setCurrentActiveTabName(`/index/${path}?index=${this.tabIndex[index]}`);
}
