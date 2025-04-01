<template>
  <!--  <div-->
  <!--    ref="setContent"-->
  <!--    style="width: 500px; height: 500px; border: 1px solid #ccc; position:relative;"-->
  <!--  />-->
  <div
    class="container"
    style="position: relative; z-index: 10;"
  >
    <div style="position: fixed; z-index: 2000; right: 60px; width: 100px; height: 100px; top: 50px; background: #e0f5ff; border: 1px solid #ccc">
      遮挡的
    </div>

    <div
      id="screenEl"
      style="border: 1px solid #e1e1e1; box-sizing: border-box; margin-top: 10px; background: #f5f5f5; padding: 10px; position: relative ; left: 30%; width: 200px"
    >
      全屏内容
      <button @click="toggle()">
        切换全屏
      </button>

      <div
        id="screenEl1"
        style="border: 1px solid #ccc; box-sizing: border-box; background: #ffe8e8; padding: 10px; margin-top: 10px; "
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
  // enableAnimation: false
})

setTimeout(() => {
  toggle('exit')
  console.log('退出全屏')
  setTimeout(() => {
    console.log('全屏')
    toggle('enter')
  }, 3000)
}, 3000)

const { toggle: toggle1 } = fullscreenElement('#screenEl1', {
  // defaultFullscreen: true,
  // enableAnimation: true
  // container () {
  //   return unref(setContent)
  // }
})

</script>

<style>
body {
  font-size: 12px;
}
</style>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%
}

</style>
