<template>
  <div class="explorer-window">
    <form
      @submit="handleSumbit"
      class="form-group d-flex align-items-center justify-content-between"
    >
      <button @click="goBack" class="btn btn-sm h-100 back-button" type="button">&lt;</button>
      <input v-model="path" type="text" class="form-control file-path" />
      <button class="btn btn-sm h-100" type="submit">Go</button>
    </form>
    <table class="bg-white">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="folder in folder.folders" :key="folder.name" @click="openFolder(folder.path)">
          <td>
            <span class="overflow-text"> <Icon src="img/folder.png" />{{ folder.name }} </span>
          </td>
          <td class="justify-content-center">File Folder</td>
          <td class="justify-content-end">{{ convertBytes(folder.folderInfo.size) }}</td>
        </tr>
        <tr v-for="file in folder.files" :key="file.name" @click="openFile(file)">
          <td>
            <span class="overflow-text">
              <Icon :src="fileIcon(file.fileInfo.fileType)" />{{ file.name }}
            </span>
          </td>
          <td class="justify-content-center">{{ file.fileInfo.fileType }}</td>
          <td class="justify-content-end">{{ convertBytes(file.fileInfo.size) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from '../Icon.vue';
import Folder from '../../utils/Folder';
import fileIcon from '../../utils/fileIcon';
import convertBytes from '../../utils/convertBytes';

export default {
  name: 'FileExplorer',

  components: {
    Icon,
  },

  props: {
    id: String,
  },

  data() {
    return {
      path: '/',
      folder: this.$store.state.rootFolder,
    };
  },

  computed: {
    ...mapState({
      rootFolder: 'rootFolder',
      window(state) {
        return state.windows.find((window) => window.id === this.id);
      },
    }),
    windowContext() {
      return this.useWindow();
    },
  },

  methods: {
    handleSumbit(event) {
      event.preventDefault();

      this.openFolder(this.path);
    },
    updateTitle() {
      const folders = Folder.parsePath(this.path);

      this.$store.commit('editWindow', {
        id: this.window.id,
        header: {
          title: `File Explorer - ${folders.pop() || '/'}`,
          icon: 'img/drive-harddisk.gif',
        },
      });
    },
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
    openFolder(path) {
      const subFolder = this.rootFolder.subFolder(path);

      if (subFolder) {
        this.path = subFolder.path;
        this.folder = subFolder;
        this.updateTitle();
      }
    },
    goBack() {
      const folders = Folder.parsePath(this.path);
      folders.pop();
      this.openFolder(folders.join('/'));
    },
    fileIcon,
    convertBytes,
  },

  created() {
    this.updateTitle();
  },
};
</script>

<style scoped>
.explorer-window {
  min-width: 550px;
  min-height: 300px;
}

form {
  height: 30px;
}

.back-button {
  padding: 5px;
}

input {
  width: 100%;
  height: 27px;
}

table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

tbody {
  height: 100%;
  overflow-y: auto;

  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px inset;
}

tr {
  display: flex;
  border-bottom: 1px solid rgb(223, 223, 223);

  outline: currentcolor none medium;
  color: rgb(10, 10, 10);

  height: max-content;
}

tbody tr {
  padding: 4px;
}

tbody tr:hover {
  cursor: pointer;
  color: white;
  /* background-color: rgba(0, 1, 129, 0.5); */
  background-color: #0090e4;
}

th {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-style: none solid solid none;
  border-width: medium 2px 2px medium;
  border-color: currentcolor rgb(10, 10, 10) rgb(10, 10, 10) currentcolor;
  box-shadow: rgb(223, 223, 223) 1px 1px 0px 1px inset, rgb(132, 133, 132) -1px -1px 0px 1px inset;
  padding: 3px;

  background-color: #c6c6c6;
}

td {
  display: flex;
  overflow: hidden;

  font-size: 0.7rem;

  border-right: 1px solid rgb(223, 223, 223);
}

th:nth-child(1),
td:nth-child(1) {
  flex: 2;
}

th:nth-child(2),
td:nth-child(2) {
  flex: 1;
}

th:nth-child(3),
td:nth-child(3) {
  flex: 1;
}

tbody tr td:last-child {
  border-right: none;
}
</style>
