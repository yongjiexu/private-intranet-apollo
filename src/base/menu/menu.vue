<template>
  <ul :class="classes" :style="styles">
    <slot></slot>
  </ul>
</template>
<script>
  import {oneOf, findComponentsDownward} from "../pdCommon/utils/assist";
  import Emitter from "../pdCommon/mixins/emitter";

  const prefixCls = "ivu-menu";

  export default {
    name: "pdMenu",
    mixins: [Emitter],
    props: {
      mode: {
        validator(value) {
          return oneOf(value, ["horizontal", "vertical"]);
        },
        default: "vertical"
      },
      theme: {
        validator(value) {
          return oneOf(value, ["light", "dark", "primary"]);
        },
        default: "light"
      },
      activeName: {
        type: [String, Number]
      },
      openNames: {
        type: Array,
        default() {
          return [];
        }
      },
      loading: {
        type: Boolean,
        default() {
          return false;
        }
      },
      accordion: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: "240px"
      }
    },
    data() {
      return {
        currentActiveName: this.activeName
      };
    },
    computed: {
      classes() {
        let theme = this.theme;
        if (this.mode === "vertical" && this.theme === "primary") theme = "light";
        return [
          `${prefixCls}`,
          `${prefixCls}-${theme}`,
          {
            [`${prefixCls}-${this.mode}`]: this.mode
          }
        ];
      },
      styles() {
        let style = {};
        if (this.mode === "vertical") {
          style.width = this.width;
        }
        return style;
      }
    },
    methods: {
      updateActiveName() {
        if (this.currentActiveName === undefined) {
          this.currentActiveName = -1;
        }
        this.broadcast("pdSubmenu", "on-update-active-name", false);
        this.broadcast(
          "pdMenuItem",
          "on-update-active-name",
          this.currentActiveName
        );
      },
      updateOpenKeys(name) {
        const index = this.openNames.indexOf(name);
        if (index > -1) {
          this.openNames.splice(index, 1);
        } else {
          this.openNames.push(name);
          if (this.accordion) {
            this.openNames.splice(0, this.openNames.length);
            this.openNames.push(name);
          }
        }
      },
      updateOpened() {
        const items = findComponentsDownward(this, "pdSubmenu");
        if (items.length) {
          items.forEach(item => {
            if (this.openNames.indexOf(item.name) > -1) {
              item.opened = true;
            } else if (this.accordion) {
              item.opened = false;
            }
          });
        }
      }
    },
    mounted() {
      this.updateActiveName();
      this.updateOpened();
      this.$on("on-menu-item-select", name => {
        this.currentActiveName = name;
        this.$emit("on-select", name);
        this.updateActiveName();
      });
      this.$on("on-open-change", names => {
        this.updateOpened();
      });
    },
    watch: {
      openNames() {
        this.$emit("on-open-change", this.openNames);
      },
      activeName(val) {
        this.currentActiveName = val;
      },
      currentActiveName() {
        this.updateActiveName();
      }
    }
  };
</script>
