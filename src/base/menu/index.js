import pdMenu from './menu.vue';
import pdMenuGroup from './menu-group.vue';
import pdMenuItem from './menu-item.vue';
import pdSubmenu from './submenu.vue';

pdMenu.Group = pdMenuGroup;
pdMenu.Item = pdMenuItem;
pdMenu.Sub = pdSubmenu;

export default pdMenu;