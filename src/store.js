import Vue from 'vue';
import Vuex from 'vuex';
import shortid from 'shortid';
import Folder from './utils/Folder';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rootFolder: new Folder({}),
    windows: [],
  },
  mutations: {
    setRootFolder(state, folder) {
      state.rootFolder = folder;
    },
    openWindow(state, payload) {
      state.windows = state.windows.concat({
        id: shortid.generate(),
        minimized: false,
        zIndex: state.windows.length + 1,
        ...payload,
      });
    },
    closeWindow(state, windowId) {
      state.windows = state.windows.filter((window) => window.id !== windowId);
    },
    focusWindow(state, windowId) {
      const focusedWindow = state.windows.find((window) => window.id === windowId);

      state.windows = state.windows.map((window) => {
        if (window.id === windowId) {
          return { ...window, zIndex: state.windows.length };
        }
        if (window.zIndex > focusedWindow.zIndex) {
          return { ...window, zIndex: window.zIndex - 1 };
        }

        return window;
      });
    },
    minimizeWindow(state, windowId) {
      state.windows = state.windows.map((window) => {
        if (window.id === windowId) {
          return { ...window, minimized: !window.minimized };
        }

        return window;
      });
    },
    editWindow(state, payload) {
      state.windows = state.windows.map((window) => {
        if (window.id === payload.id) {
          return { ...window, ...payload };
        }

        return window;
      });
    },
  },
  getters: {
    topWindow: (state) => {
      const temp = state.windows.reduce((topWindow, window) => {
        if ((topWindow.zIndex < window.zIndex && !window.minimized) || topWindow.minimized) {
          return window;
        }
        return topWindow;
      }, state.windows[0]);

      return temp;
    },
    activeWindows: (state) => state.windows.filter((window) => !window.minimized),
  },
});
