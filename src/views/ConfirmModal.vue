<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-sm relative shadow-lg">
      <h2 class="text-lg font-semibold mb-4">{{ mensaje }}</h2>
      <div class="flex justify-end gap-3">
        <button @click="$emit('cancelar')" class="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
        <button @click="$emit('confirmar')" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  mensaje: string
}>()

defineEmits(['confirmar', 'cancelar'])
</script>
