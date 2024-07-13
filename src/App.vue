<template>
  <div id="tree-app">
    <div class="rerenderBtn">
      <button @click="reRender">Re-render</button>
    </div>
    <div class="main">
      <tree :treeData="tree" :key="renderKey" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { buildTree } from "./helpers/transformData";
import Tree from "./components/Tree.vue";
import { Node } from "../types/node";

const tree = ref<Node[]>();
const renderKey = ref(1);

const fetchTreeData = async () => {
  try {
    const response = await axios.get(
      "https://64b4c8450efb99d862694609.mockapi.io/tree/items"
    );
    tree.value = buildTree(response.data);
    localStorage.setItem("tree", JSON.stringify(tree.value));
  } catch (error) {
    console.error(error);
  }
};

const loadTreeFromLocalStorage = () => {
  const storedTree = localStorage.getItem("tree");
  if (storedTree) {
    tree.value = JSON.parse(storedTree);
  } else {
    fetchTreeData();
  }
};

const reRender = () => {
  renderKey.value++;
};

onMounted(loadTreeFromLocalStorage);

watch(
  tree,
  (newTree) => {
    if (newTree) {
      localStorage.setItem("tree", JSON.stringify(newTree));
    }
  },
  { deep: true }
);
</script>

<style>
html {
  height: 100vh;
}
body {
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  font-weight: 300;
  line-height: 1em;
  background: #d0d0d0;
}
#tree-app {
  width: 500px;
  margin: 0 auto;
  margin-top: 100px;
}
.main {
  padding: 10px;
  border-radius: 10px;
}
.rerenderBtn button {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 2rem;
  color: #ffffff;
  background: hsl(338, 81%, 41%);
  border: none;
  font-family: Courier New, monospace;
  font-weight: bold;
  font-size: 1.4em;
  letter-spacing: 0.03ch;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
}
.rerenderBtn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
