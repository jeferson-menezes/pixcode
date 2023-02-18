<template>
    <q-input
        @blur="$emit('inputValue')"
        label="Valor"
        v-model="money"
        prefix="R$"
        mask="#,##"
        fill-mask="0"
        lazy-rules
        reverse-fill-mask
    ></q-input>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { toDolar, toReal } from "./helper";

    export default defineComponent({
        name: "MoneyField",
        props: {
            modelValue: {
                type: Number,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
        },
        setup(props, { emit }) {
            const money = computed({
                get: () => toReal(props.modelValue),
                set: (value) => emit("update:modelValue", toDolar(value)),
            });
            return { money };
        },
    });
</script>