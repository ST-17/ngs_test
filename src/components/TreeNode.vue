<template>
  <div
    class="tree-node"
    @click="toggle"
    :class="{ 'has-children': hasChildren, 'open-node': node.isOpen, 'even-bg': node.order_id % 2 === 0, 'odd-bg': node.order_id % 2 !== 0 }"
  >
    <div class="tree-item">
      <span
        :class="{
          'arrow-right': !node.isOpen,
          'arrow-down': node.isOpen,
          minus: !hasChildren,
        }"
      ></span>
      {{ node.title }}
    </div>
  </div>
  <div v-if="node.isOpen" class="tree-children">
    <tree-node v-for="child in node.children" :key="child.id" :node="child" />
  </div>
</template>

<script setup lang="ts">
import { Node } from "../types/node";
import { defineProps, computed, PropType } from "vue";

const props = defineProps({
  node: {
    type: Object as PropType<Node>,
    required: true,
  },
});

const toggle = function () {
  if (props.node.children?.length) props.node.isOpen = !props.node.isOpen;
};

const hasChildren = computed(() => props.node.children?.length !== 0);
</script>

<style scoped>
.tree-node {
  padding: 5px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #9c9c9c;
}

.tree-item {
  display: flex;
  align-items: center;
}

.open-node {
  font-weight: 700;
}

.has-children {
  cursor: pointer;
}

.tree-node span {
  margin-right: 5px;
  display: inline-block;
  width: 10px;
}

.arrow-right::before {
  content: "▶";
}

.arrow-down::before {
  content: "▼";
}

.minus::before {
  content: "";
}

.tree-children {
  padding-left: 20px;
}

.even-bg {
  background-color: #ababab;
}

.odd-bg {
  background-color: #6e6e6e;
}
</style>
