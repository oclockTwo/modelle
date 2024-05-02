import { defineStore } from 'pinia'

export const useColorThemeStore = defineStore('ColorTheme', {
  state: () => ({ dark: false }),
})