<template>123</template>
<script setup lang="ts">
type pageProps = {
  current: number //默认是第一页
  pageSize: number //每页条数应该是10
  total: number //0
}
const props = withDefaults(defineProps<pageProps>(), {
  current: 1,
  pageSize: 10,
  total: 0,
})
</script>
<style></style>
