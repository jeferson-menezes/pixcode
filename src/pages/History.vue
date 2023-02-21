<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table
                class="col-12"
                title="Lista de provetos"
                row-key="id"
                :loading="loading"
                :columns="columns"
                :rows="stories"
                :rows-per-page-options="[10, 20, 30, 0]"
            >
                <template v-slot:top>
                    <div class="text-h6">Histórico de Cobranças</div>
                </template>

                <template v-slot:body-cell-valor="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-chip
                            outline
                            square
                            color="blue"
                            text-color="white"
                            :label="toReal(props.row.valor)"
                        />
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn
                            icon="mdi-qrcode"
                            color="info"
                            dense
                            :to="{ name: 'pix', params: { id: props.row.id } }"
                        >
                            <q-tooltip> Visualizar código </q-tooltip>
                        </q-btn>
                        <q-btn
                            icon="mdi-delete-outline"
                            color="negative"
                            dense
                            @click="excluir(props.row)"
                        >
                            <q-tooltip> Deletar </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script lang="ts">
    import { useQuasar } from "quasar";
    import { toRealSymbol } from "src/components/helper";
    import { columns, Pix } from "src/components/models";
    import useHistory from "src/composable/useHistoryComposable";
    import useNotify from "src/composable/useNotifyComposable";
    import { defineComponent, onMounted, ref } from "vue";

    export default defineComponent({
        name: "History",

        setup() {
            const { getAllHistoory, deleteHistory } = useHistory();
            const { notifySuccess, notifyError } = useNotify();

            const loading = ref(false);
            const stories = ref();

            const $q = useQuasar();

            const listar = async () => {
                stories.value = await getAllHistoory();
            };

            const excluir = (pix: Pix) => {
                try {
                    loading.value = true;
                    $q.dialog({
                        title: "Confirme",
                        message: `Você realmente quer excluir a cobrança de valor ${toRealSymbol(
                            pix.valor
                        )}`,
                        cancel: true,
                        persistent: true,
                    }).onOk(async () => {
                        await deleteHistory(pix.id);
                        notifySuccess("Excluido com sucesso!");
                        stories.value = stories.value.filter(
                            (e: Pix) => e.id !== pix.id
                        );
                    });
                } catch (err) {
                    const error = err as string;
                    notifyError(error);
                } finally {
                    loading.value = false;
                }
            };

            onMounted(listar);

            return {
                columns,
                stories,
                loading,
                excluir,
                toReal: toRealSymbol,
            };
        },
    });
</script>