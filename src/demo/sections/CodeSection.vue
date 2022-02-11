<template>
    <div>
        <h3>Code blocks</h3>

        <Code :value="text">
            <template #file-name>luckyprize.sh</template>
            <pre>{{ text }}</pre>
        </Code>
    </div>
</template>

<script lang="ts" setup>
import Code from '@/components/Code/Code.vue'

const text = `#!/bin/bash

echo "Enter your lucky number"
read n
case $n in
101)
echo echo "You got 1st prize" ;;
510)
echo "You got 2nd prize" ;;
999)
echo "You got 3rd prize" ;;
*)
echo "Sorry, try for the next time" ;;
esac`
</script>