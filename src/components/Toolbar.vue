<template>
  <footer class="footer">
    <nav class="navbar navbar-expand-lg navbar-dark justify-content-between">
      <div class="position relative start-button">
        <Menu v-if="displayStartMenu" class="start-menu" path="/">
          <MenuFolder
            src="img/documents.png"
            alt="Document Icon"
            :currentFolder="rootFolder.subFolder('/')"
          >
            Documents
          </MenuFolder>
          <MenuItem @click="openFileExplorer" src="img/drive-harddisk.gif" alt="Drive Icon">
            File Explorer
          </MenuItem>
          <MenuDivider />
          <MenuItem @click="toggleFullScreen" src="img/shutdown.png" alt="Fullscreen Icon">
            Fullscreen
          </MenuItem>
        </Menu>

        <button @click="toggleStartMenu" class="btn btn-sm h-100" type="button">
          <span class="btn-text">Start</span>
        </button>
      </div>
      <ul class="navbar-nav navbar-nav-hover flex-row align-items-center">
        <li class="nav-item" v-for="window in windows" :key="window.id">
          <button
            @click="toggleWindow(window.id)"
            :class="{ 'active-button': window.minimized }"
            class="btn btn-sm h-100"
            type="button"
          >
            <span class="btn-text overflow-text">
              <Icon :src="window.header.icon" />{{ window.header.title }}
            </span>
          </button>
        </li>
      </ul>
      <Clock />
    </nav>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Icon from './Icon.vue';
import Menu from './Menu/Menu.vue';
import MenuItem from './Menu/MenuItem.vue';
import MenuFolder from './Menu/MenuFolder.vue';
import MenuDivider from './Menu/MenuDivider.vue';
import Clock from './Clock.vue';

export default {
  name: 'Toolbar',

  components: {
    Icon,
    Menu,
    MenuItem,
    MenuFolder,
    MenuDivider,
    Clock,
  },

  data() {
    return {
      displayStartMenu: false,
    };
  },

  computed: {
    ...mapState(['rootFolder', 'windows']),
    ...mapGetters(['topWindow']),
  },

  methods: {
    openFileExplorer() {
      this.$store.commit('openWindow', {
        header: {
          title: 'File Explorer',
          icon: 'img/drive-harddisk.gif',
        },
        template: 'FileExplorer',
        expandable: true,
        props: {},
      });
    },
    toggleStartMenu(event) {
      event.stopPropagation();

      this.displayStartMenu = !this.displayStartMenu;
    },
    toggleWindow(windowId) {
      const toggledWindow = this.windows.find((window) => window.id === windowId);

      if (toggledWindow === this.topWindow) {
        this.$store.commit('minimizeWindow', windowId);
      } else if (toggledWindow.minimized) {
        this.$store.commit('minimizeWindow', windowId);
        this.$store.commit('focusWindow', windowId);
      } else {
        this.$store.commit('focusWindow', windowId);
      }
    },
    toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
    emitShutdown() {
      this.$emit('shutdown');
    },
  },

  mounted() {
    document.addEventListener('click', () => {
      if (this.displayStartMenu) {
        this.displayStartMenu = false;
      }
    });
  },
};
</script>

<style>
.footer {
  width: 100%;
  height: 33px;
  max-height: 33px;
}

.navbar {
  width: 100%;
  height: 33px;
  max-height: 33px;

  padding: 2px;

  display: flex;
}

.start-button {
  height: 29px;
  max-height: 29px;

  margin-right: 1px;
}

.navbar-nav {
  max-width: 90%;
  overflow-x: hidden;
  flex: 2;
}

.nav-item {
  height: 29px !important;
  max-height: 29px !important;
  margin-right: 1px !important;
}

.start-menu {
  position: absolute;
  bottom: 100%;
}
</style>
