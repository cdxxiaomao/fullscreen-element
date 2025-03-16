/**
 * 使元素全屏
 * @param element 可以是Element节点或#开头的字符串
 * @param options 配置项，包含container属性，用于指定全屏时挂载的节点，onChange事件回调，以及defaultFullscreen用于指定初始是否全屏
 */
export function fullscreenElement (element: HTMLElement | string, options: { container?: HTMLElement, onChange?: (isFullscreen: boolean) => void, defaultFullscreen?: boolean, enableAnimation?: boolean } = {}) {
  // 合并默认值
  const mergedOptions = {
    container: document.body,
    onChange: () => {},
    defaultFullscreen: false,
    enableAnimation: true,
    ...options
  }

  let targetElement: HTMLElement
  let isFullscreen = mergedOptions.defaultFullscreen || false
  let originalParent: HTMLElement | null = null
  let originalStyles: Partial<CSSStyleDeclaration> = {} // 新增：用于保存原有样式
  let initialRect: DOMRect // 新增：用于保存元素初始位置和尺寸

  const container = mergedOptions.container || document.body

  // 进入全屏
  const enterFullscreen = () => {
    if (typeof element === 'string' && element.startsWith('#')) {
      targetElement = document.getElementById(element.substring(1))
    } else {
      targetElement = element as HTMLElement
    }

    if (!targetElement) {
      console.error('Element not found')
      return () => {}
    }

    // 保存原有样式
    originalStyles = {
      position: targetElement.style.position,
      top: targetElement.style.top,
      left: targetElement.style.left,
      width: targetElement.style.width,
      height: targetElement.style.height,
      zIndex: targetElement.style.zIndex
    }

    // 获取元素当前在屏幕中的位置和尺寸
    const rect = targetElement.getBoundingClientRect()
    initialRect = rect // 保存初始位置和尺寸
    originalParent = targetElement.parentNode as HTMLElement
    container.appendChild(targetElement)

    if (mergedOptions.enableAnimation) {
      targetElement.style.transition = 'all 300ms ease'
      // 先设置元素当前的位置和尺寸
      targetElement.style.position = 'fixed'
      targetElement.style.top = `${rect.top}px`
      targetElement.style.left = `${rect.left}px`
      targetElement.style.width = `${rect.width}px`
      targetElement.style.height = `${rect.height}px`
      targetElement.style.zIndex = '1000'

      // 使用requestAnimationFrame确保样式更新
      requestAnimationFrame(() => {
        // 再放大至全屏
        targetElement.style.top = '0'
        targetElement.style.left = '0'
        targetElement.style.width = '100%'
        targetElement.style.height = '100%'
      })
    } else {
      targetElement.style.position = 'fixed'
      targetElement.style.top = '0'
      targetElement.style.left = '0'
      targetElement.style.width = '100%'
      targetElement.style.height = '100%'
      targetElement.style.zIndex = '1000'
    }
    isFullscreen = true
    mergedOptions.onChange?.(true)
  }

  // 新增：还原原有样式的公共方法
  const restoreOriginalStyles = () => {
    targetElement.style.position = originalStyles.position || ''
    targetElement.style.top = originalStyles.top || ''
    targetElement.style.left = originalStyles.left || ''
    targetElement.style.width = originalStyles.width || ''
    targetElement.style.height = originalStyles.height || ''
    targetElement.style.zIndex = originalStyles.zIndex || ''
  }

  // 退出全屏
  const exitFullscreen = () => {
    if (mergedOptions.enableAnimation) {
      targetElement.style.transition = 'all 300ms ease'
      // 使用requestAnimationFrame确保样式更新
      requestAnimationFrame(() => {
        // 先恢复到初始位置和尺寸
        targetElement.style.top = `${initialRect.top}px`
        targetElement.style.left = `${initialRect.left}px`
        targetElement.style.width = `${initialRect.width}px`
        targetElement.style.height = `${initialRect.height}px`

        // 等待动画结束后再还原原有样式和节点位置
        setTimeout(() => {
          if (originalParent) {
            originalParent.appendChild(targetElement)
          }
          restoreOriginalStyles() // 调用公共方法还原样式
        }, 300)
      })
    } else {
      if (originalParent) {
        originalParent.appendChild(targetElement)
      }
      restoreOriginalStyles() // 调用公共方法还原样式
    }
    isFullscreen = false
    mergedOptions.onChange?.(false)
  }

  // 根据defaultFullscreen配置决定是否初始全屏
  if (!mergedOptions.defaultFullscreen) {
    mergedOptions.onChange?.(false)
  } else {
    setTimeout(() => {
      enterFullscreen()
    })
  }

  function toggle () {
    if (isFullscreen) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  // 返回包含切换全屏方法的对象
  return {
    toggle
  }
}
