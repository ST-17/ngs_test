<template>
  <div>
    <p class="rerender">The last re-rendering was at <span>{{ rerenderOn }}</span></p>
    <tree-node v-for="node in treeData" :key="node.id" :node="node" />
  </div>
</template>

<script setup lang="ts">
import { Node } from "../types/node";
import { ref, defineProps, onMounted, PropType } from "vue";
import TreeNode from "./TreeNode.vue";
import { formatTimeString } from "../helpers/formatDate";

defineProps({ treeData: { type: Array as PropType<Node[]>, required: true } });

const rerenderOn = ref("");
onMounted(() => {
  const date = new Date();
  rerenderOn.value = formatTimeString(
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
});
</script>

<style scoped>
.rerender{
  font-size: 25px;
}
.rerender span{
  font-weight: 500;
}
</style>