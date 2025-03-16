<template>
  <div
    class="container"
    style="position: relative; z-index: 10;"
  >
    <div style="position: fixed; z-index: 2000; right: 100px; width: 100px; height: 100px; top: 50px; background: brown">
      遮挡的
    </div>
    <div
      id="screenEl"
      style="border: 1px solid #ccc; box-sizing: border-box; background: #e5e5e5; padding: 10px; "
    >
      全屏内容
      <button @click="toggle">
        切换全屏
      </button>

      <div
        id="screenEl1"
        style="border: 1px solid #ccc; box-sizing: border-box; background: #ffe8e8; padding: 10px; "
      >
        全屏内容
        <button @click="toggle1">
          切换全屏
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fullscreenElement } from '../lib'

const { toggle } = fullscreenElement('#screenEl', {
  // defaultFullscreen: true
  enableAnimation: true
})

const { toggle: toggle1 } = fullscreenElement('#screenEl1', {
  defaultFullscreen: true,
  enableAnimation: true
})

</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%
}
</style>
