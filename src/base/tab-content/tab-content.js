export default {
  props: {
    route: {
      name: String
    },
    // todo 有什么作用
    index: {
      name: String
    },
    queryIndex: {
      name: String
    }
  },
  render(createElement) {
    // 获取目标位置或当前路由匹配的组件数组
    let components = this.$router.getMatchedComponents(this.route);

    if (!components.length) {
      return createElement();
    }

    return createElement(components[1], {
      props: {
        theIndex: this.index
      }
    });
  }

};
