<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">Gerar nova cobrança</p>
            </div>

            <q-form
                class="col-md-6 col-sm-10 col-xs-11 q-gutter-y-md"
                ref="formRef"
                @submit.prevent="submit"
            >
                <MoneyField label="Valor" v-model="form.valor" />
                <q-input
                    shadow-text="descrição do motivo da cobrança"
                    label="Descrição (até 19 letras)"
                    v-model="form.descricao"
                    :rules="rules.descricao"
                    lazy-rules
                ></q-input>

                <q-btn
                    label="Gerar"
                    :loading="loading"
                    color="primary"
                    class="full-width"
                    type="submit"
                    outline
                    rounded
                ></q-btn>
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
    import { Gerador } from "src/components/gerador";
    import { Param } from "src/components/models";
    import { padStart } from "src/components/helper";
    import MoneyField from "src/components/MoneyField.vue";
    import useHistory from "src/composable/useHistoryComposable";
    import useParams from "src/composable/useParamsComposable";
    import useNotify from "src/composable/useNotifyComposable";
    import { defineComponent, onMounted, ref } from "vue";
    import { useQuasar } from "quasar";
    import { useRouter } from "vue-router";
    import { maxLength, } from "src/components/rules";

    export default defineComponent({
        name: "New",

        components: { MoneyField },

        setup() {
            let param: Param;
            let payload: string;
            let base64: string;
            const loading = ref(false);
            const form = ref({
                valor: 0,
                descricao: "",
            });

            const rules = {
                descricao: [maxLength("Tamalho máximo é 19 letras", 19)],
            };

            const { addHistory, putHistory } = useHistory();
            const { getParam } = useParams();
            const { notifyInfo, notifyError } = useNotify();
            const router = useRouter();
            const $q = useQuasar();

            const submit = async () => {
                try {
                    const { valor, descricao } = form.value;

                    const id = await addHistory({
                        valor,
                        descricao,
                        base64,
                        payload,
                    });

                    const gerador = new Gerador(
                        param,
                        padStart(6, id, "0"),
                        valor,
                        descricao
                    );

                    payload = gerador.qrCodePix.payload();
                    base64 = await gerador.qrCodePix.base64();

                    await putHistory({
                        valor,
                        descricao,
                        payload,
                        base64,
                        id,
                    });

                    notifyInfo("Cobrança criada com sucesso!");

                    router.push({ name: "pix", params: { id: id.toString() } });
                } catch (err) {
                    notifyError("Houve um erro ao gerar cobrança pix");
                }
            };

            onMounted(async () => {
                const payload = await getParam();
                if (payload) {
                    param = JSON.parse(payload);
                } else {
                    $q.dialog({
                        title: "Atenção",
                        message: "É preciso cadastrar a chave pix antes!",
                    });
                }
            });

            return { form, loading, submit, rules };
        },
    });
</script>