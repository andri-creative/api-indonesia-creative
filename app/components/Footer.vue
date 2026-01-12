<template>
  <footer class="w-full bg-gray-900 border-t border-gray-800 py-6 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-center gap-2">
        <p class="text-gray-400 text-sm sm:text-base text-center">
          Created by
          <span
            class="font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400"
          >
            Andri Creative Developer Indonesia
          </span>
        </p>
        <p class="text-gray-600 text-xs">
          &copy; {{ new Date().getFullYear() }} All Rights Reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer logic if needed
</script>

<style scoped>
/* Optional specific footer styles */
</style>
