<template>
    <li :class="classes" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
        <div :class="[prefixCls + '-submenu-title']" ref="reference" @click="handleClick">
            <slot name="title"></slot>
            <Icon type="ios-arrow-down" :class="[prefixCls + '-submenu-title-icon']"
                  v-if="!loading&&!additional"></Icon>
            <Icon type="load-c" :class="[prefixCls + '-submenu-title-icon animation-rotate']"
                  v-if="loading&&!additional"></Icon>
        </div>
        <collapse-transition v-if="mode === 'vertical'">
            <ul :class="[prefixCls]" v-show="opened">
                <slot></slot>
            </ul>
        </collapse-transition>
        <transition name="slide-up" v-else>
            <Dropdown
                    v-show="opened"
                    placement="bottom"
                    ref="drop"
                    :style="dropStyle">
                <ul :class="[prefixCls + '-drop-list']">
                    <slot></slot>
                </ul>
            </Dropdown>
        </transition>
    </li>
</template>
<script>
    import CollapseTransition from "../pdCommon/base/collapse-transition";
    import {getStyle, findComponentUpward} from "../pdCommon/utils/assist";
    import Emitter from "../pdCommon/mixins/emitter";

    const prefixCls = "ivu-menu";

    export default {
        name: "pdSubmenu",
        mixins: [Emitter],
        components: {CollapseTransition},
        props: {
            name: {
                type: [String, Number],
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            additional: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                prefixCls: prefixCls,
                active: false,
                opened: false,
                dropWidth: parseFloat(getStyle(this.$el, "width")),
                parent: findComponentUpward(this, "pdMenu"),
                ifLoaing: false
            };
        },
        computed: {
            classes() {
                return [
                    `${prefixCls}-submenu`,
                    {
                        [`${prefixCls}-item-active`]: this.active,
                        [`${prefixCls}-opened`]: this.opened,
                        [`${prefixCls}-submenu-disabled`]: this.disabled
                    }
                ];
            },
            mode() {
                return this.$parent.mode;
            },
            accordion() {
                return this.$parent.accordion;
            },
            dropStyle() {
                let style = {};

                if (this.dropWidth) style.minWidth = `${this.dropWidth}px`;
                return style;
            },
            loading() {
                let name = this.$refs.reference ? this.$refs.reference.innerText : "",
                    ifLoaing = false;
                this.$parent.openNames.map(item => {
                    if (item == this.name) {
                        ifLoaing = this.$parent.loading;
                    }
                });
                return ifLoaing;
            }
        },
        methods: {
            handleMouseenter() {
                if (this.disabled) return;
                if (this.mode === "vertical") return;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.$parent.updateOpenKeys(this.name);
                    this.opened = true;
                }, 250);
            },
            handleMouseleave() {
                if (this.disabled) return;
                if (this.mode === "vertical") return;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.$parent.updateOpenKeys(this.name);
                    this.opened = false;
                }, 150);
            },
            handleClick() {
                if (this.disabled) return;
                if (this.mode === "horizontal") return;
                const opened = this.opened;
                if (this.accordion) {
                    this.$parent.$children.forEach(item => {
                        if (item.$options.name === "pdSubmenu") item.opened = false;
                    });
                }
                this.opened = !opened;
                this.$parent.updateOpenKeys(this.name);
            }
        },
        watch: {
            mode(val) {
                if (val === "horizontal") {
                    this.$refs.drop.update();
                }
            },
            opened(val) {
                if (this.mode === "vertical") return;
                if (val) {
                    // set drop a width to fixed when menu has fixed position
                    this.dropWidth = parseFloat(getStyle(this.$el, "width"));
                    this.$refs.drop.update();
                } else {
                    this.$refs.drop.destroy();
                }
            }
        },
        mounted() {
            this.$on("on-menu-item-select", name => {
                if (this.mode === "horizontal") this.opened = false;
                this.dispatch("pdMenu", "on-menu-item-select", name);
                return true;
            });
            this.$on("on-update-active-name", status => {
                this.active = status;
            });
        }
    };
</script>
<style>
    .animation-rotate {
        animation: rotation 0.5s infinite;
    }

    @keyframes rotation {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
