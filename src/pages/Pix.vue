<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ toReal(pix?.valor) }}
                </p>
            </div>

            <div class="col-12 text-center">
                <p class="text-subtitle1">
                    {{ pix?.descricao }}
                </p>
            </div>
        </div>

        <div class="row justify-center">
            <div class="col-12 col-md-4 text-center">
                <q-img :src="pix?.base64"></q-img>
            </div>
        </div>

        <div class="row justify-center">
            <div class="col-12 col-md-4 text-center">
                <p class="text-subtitle1 ellipsis">
                    {{ pix?.payload }}
                </p>
            </div>
        </div>

        <div class="row justify-center">
            <q-btn
                icon="content_copy"
                label="Copiar código pix"
                color="primary"
                class="full-width"
                outline
                rounded
                @click="copyPayload"
            ></q-btn>

            <q-btn
                label="Voltar"
                class="full-width q-mt-md"
                color="primary"
                type="button"
                rounded
                flat
                :to="{ name: 'history' }"
            />
        </div>
    </q-page>
</template>

<script lang="ts">
    import { copyToClipboard } from "quasar";
    import { toRealSymbol } from "src/components/helper";
    import { Pix } from "src/components/models";
    import useHistory from "src/composable/useHistoryComposable";
    import useNotify from "src/composable/useNotifyComposable";
    import { computed, defineComponent, onMounted, ref } from "vue";
    import { useRoute } from "vue-router";

    export default defineComponent({
        name: "Pix",
        setup() {
            const { getHistory } = useHistory();
            const { notifySuccess, notifyError } = useNotify();

            const pix = ref<Pix>();
            const route = useRoute();

            const historyId = computed(() => route.params.id);

            const copyPayload = () => {
                copyToClipboard(pix.value?.payload as string)
                    .then(() =>
                        notifySuccess(
                            "Código pix copia e cola, copiado com sucesso!"
                        )
                    )
                    .catch(() => notifyError("Houve um erro a copiar código pix!"));
            };

            onMounted(async () => (pix.value = await getHistory(historyId.value)));
            return { pix, copyPayload, toReal: toRealSymbol };
        },
    });
</script>
