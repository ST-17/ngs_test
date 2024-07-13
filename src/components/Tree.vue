<template>
  <div>
    <p class="rerender">
      The last re-rendering was at <span>{{ rerenderOn }}</span>
    </p>
    <div class="node-container">
      <tree-node v-for="node in orderedTreeData" :key="node.id" :node="node" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Node } from "../types/node";
import { ref, defineProps, onMounted, PropType, computed } from "vue";
import TreeNode from "./TreeNode.vue";
import { formatTimeString } from "../helpers/formatDate";
import { assignOrderIds } from "../helpers/assignOrderIds";

const props = defineProps({ treeData: { type: Array as PropType<Node[]>, required: true } });

const rerenderOn = ref("");
onMounted(() => {
  const date = new Date();
  rerenderOn.value = formatTimeString(
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
});

const orderedTreeData = computed(() => {
  return assignOrderIds(props.treeData);
});
</script>

<style scoped>
.rerender {
  font-size: 25px;
}
.rerender span {
  font-weight: 500;
}
</style>
