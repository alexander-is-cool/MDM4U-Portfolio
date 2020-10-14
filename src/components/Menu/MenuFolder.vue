<template>
  <li @mouseover="openFolder" @mouseleave="closeFolder" class="position-relative">
    <div class="folder-icon">
      <img :width="width" :height="height" :src="src" :alt="alt" />
      <span>
        <slot></slot>
      </span>
    </div>
    <div v-if="displayFolder" class="folder-menu">
      <Menu>
        <MenuFolder
          v-for="folder in currentFolder.folders"
          :key="folder.id"
          :currentFolder="currentFolder.subFolder(folder.name)"
        >
          {{ folder.name }}
        </MenuFolder>
        <MenuItem
          v-for="file in currentFolder.files"
          :key="file.id"
          @click="openFile(file)"
          :src="fileIcon(file.fileInfo.fileType)"
        >
          {{ file.name }}
        </MenuItem>
      </Menu>
    </div>
  </li>
</template>

<script>
import Menu from './Menu.vue';
import MenuItem from './MenuItem.vue';
import Folder from '../../utils/Folder';
import fileIcon from '../../utils/fileIcon';

export default {
  name: 'MenuFolder',

  components: {
    Menu,
    MenuItem,
    MenuFolder: import('./MenuFolder'),
  },

  props: {
    src: {
      type: String,
      default: 'img/folder.png',
    },
    alt: {
      type: String,
      default: 'Folder Icon',
    },
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
    currentFolder: {
      type: Folder,
    },
  },

  data() {
    return {
      displayFolder: false,
    };
  },

  methods: {
    openFile(file) {
      this.$store.commit('openWindow', {
        header: {
          title: file.name,
          icon: fileIcon(file.fileInfo.fileType),
        },
        template: 'FileWindow',
        expandable: true,
        props: {
          src: file.path,
        },
      });
    },
    openFolder() {
      this.displayFolder = true;
      this.$emit('openFolder');
    },
    closeFolder() {
      this.displayFolder = false;
    },
    fileIcon,
  },
};
</script>

<style scoped>
.folder-icon {
  display: flex;

  width: 100%;

  padding-top: 5px;
  padding-bottom: 5px;

  font-size: 0.55rem;
}

.folder-icon:hover {
  background-color: #0090e4;
  color: white;
  cursor: pointer;
}

.folder-icon > span {
  width: max-content;
  user-select: none;
  padding: 0px 10px;
}

.folder-icon > span:after {
  content: '▸';
  color: black;

  font-size: 0.6rem;

  position: absolute;
  right: 0px;
  bottom: 25%;
}

.folder-menu {
  position: absolute;
  left: 100%;
  bottom: 0px;
}
</style>
