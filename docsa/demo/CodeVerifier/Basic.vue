<template>
    <div>
        <CodeVerifier :VCD="2" :Casesensitive="true" />
    </div>
</template>

<script setup lang="ts">
import CodeVerifier from '../../../src/components/CodeVerifier/CodeVerifier.vue'
</script>