# Fullscreen Element

## 简介
`fullscreenElement` 是一个用于将指定元素全屏显示的 TypeScript 库。它支持动画效果，并且可以在全屏时创建一个虚拟占位元素，以避免原节点位置塌陷。

![Kapture 2025-03-29 at 00.23.03](https://txt-01.oss-cn-chengdu.aliyuncs.com/typora/lyra/Kapture%202025-03-29%20at%2000.23.03.gif)

## 安装
```shell
npm install fullscreen-element
#OR
npm add fullscreen-element
```

## 使用方法
```html
<div id="screenEl" style="border: 1px solid #ccc">
   <button @click="toggle">
     切换全屏
   </button>
</div>

<script>
   import { fullscreenElement } from 'fullscreen-element'

   const { toggle } = fullscreenElement('#screenEl')
</script>
```

## 参数
```typescript
fullscreenElement<HTMLElement | string, Options>
```
## Options

|  参数 | 默认值              | 可选项/类型                                                                                        | 描述       |
|---|------------------|-----------------------------------------------------------------------------------------------|----------|
| container | `document.body`        | `HTMLElement  |(() => HTMLElement)` |指定全屏时挂载的节点|
| onChange | - | `(isFullscreen: boolean) => void` | 事件回调 |
| defaultFullscreen | `false` | `boolean` | 初始是否全屏 |
| enableAnimation | `true` | boolean | 启用动画 |

## Methods

| 参数            | 类型                              | 描述                 |
| --------------- | --------------------------------- | -------------------- |
| toggle          | `(type?: 'enter' | 'exit')=>void` | 切换全屏状态         |
| getIsFullscreen | `()=>boolena`                     | 获取当前是否全屏状态 |

