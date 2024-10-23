<template>
  <div
    v-if="props.files.length"
    class="cover-preview__wrapper w-full h-full flex flex-col justify-center items-center"
  >
    <div v-for="(img, idx) in props.files" :key="idx">
      <img
        @click="togglePreviewVisable(idx)"
        class="files_img mb5"
        :src="img"
        :style="img_style"
      />
    </div>

    <div
      v-if="preview__visible"
      ref="imgWrapRef"
      :class="[
        'preview__wrapper',
        preview__wrapper_anime ? 'preview__wrapper--animation' : '',
        'w-full',
        'h-full',
        'flex',
        'justify-center',
        'items-center',
        'p20',
      ]"
      @click="togglePreviewVisable"
      @mousewheel.prevent="rollImg"
    >
      <img
        ref="imageRef"
        class="preview_img max-w-90% max-h-90%"
        :src="props.files[preview__index]"
        @mousedown.prevent="moveImg"
        @click="handlePreviewImgClick"
      />
      <div class="preview__wrapper--modal"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";

const preview__index = ref(0);
const preview__visible = ref(false);
const preview__wrapper_anime = ref(false);

const imgWrapRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);

const props = defineProps({
  files: {
    type: [Array],
    default: () => [],
  },
  width: { type: [String], default: "" },
  height: { type: [String], default: "" },
});

let img_style = computed(() => {
  if (props.width && props.height) {
    return {
      width: props.width,
      height: props.height,
    };
  }
  return {};
});

const togglePreviewVisable = (idx: number) => {
  if (typeof idx === "number") {
    preview__index.value = idx;
  } else {
    preview__index.value = 0;
  }
  preview__visible.value = !preview__visible.value;
  nextTick(() => {
    setTimeout(() => {
      preview__wrapper_anime.value = !preview__wrapper_anime.value;
    }, 0);
  });
};

/** */
const moveImg = (e: any) => {
  let wrapEl = imgWrapRef.value as HTMLElement;
  let imgEl = imageRef.value as HTMLElement;
  if (!imgEl) return;
  let x = e.pageX - imgEl.offsetLeft;
  let y = e.pageY - imgEl.offsetTop;
  // 添加鼠标移动事件
  wrapEl.addEventListener("mousemove", move);
  function move(e) {
    imgEl.style.left = e.pageX - x + "px";
    imgEl.style.top = e.pageY - y + "px";
  }
  // 添加鼠标抬起事件，鼠标抬起，将事件移除
  imgEl.addEventListener("mouseup", () => {
    wrapEl.removeEventListener("mousemove", move);
  });
  // 鼠标离开父级元素，把事件移除
  wrapEl.addEventListener("mouseout", () => {
    wrapEl.removeEventListener("mousemove", move);
  });
};

/** 滚动鼠标改变图片大小 */
const rollImg = (e: any) => {
  if (!imageRef.value) return;
  let transform: string | null = imageRef.value.style.transform ?? null;
  let zoom: number =
    transform.indexOf("scale") != -1
      ? +transform.split("(")[1].split(")")[0]
      : 1;

  zoom += e.wheelDelta / 1200;
  /**
   * 使用 transform: scale(XX); CSS特性
   * 最低缩小 0.1 倍
   * 最大放大 2 倍
   */
  if (zoom > 0.1 && zoom < 2) {
    imageRef.value.style.transform = "scale(" + zoom + ")";
  }
};

/** 阻止冒泡事件--导致预览关闭 */
const handlePreviewImgClick = (e: any) => {
  e.stopPropagation();
};
</script>

<style scoped>
.cover-preview__wrapper {
}
.files_img {
  cursor: pointer;
}
.preview__wrapper {
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  opacity: 0.8;
  transform: translateX(5%);
  transition: all 1s ease;
}
.preview__wrapper--animation {
  opacity: 1;
  transform: translateX(0%);
}
.preview__wrapper--modal {
  background-color: #000000;
  opacity: 0.5;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.preview_img {
  position: absolute;
  cursor: move;
}
</style>
