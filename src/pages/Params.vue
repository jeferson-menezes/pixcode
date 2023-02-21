<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">Atualizar chave pix</p>
            </div>

            <q-form
                class="col-md-6 col-sm-10 col-xs-11 q-gutter-y-md"
                ref="formRef"
                @submit.prevent="submit"
            >
                <q-select
                    map-options
                    emit-value
                    v-model="form.tipo"
                    :options="tipos"
                    lazy-rules
                    :rules="rules.tipo"
                    label="Tipo de Chave"
                    :option-label="(opt) => TipoText[opt]"
                >
                </q-select>

                <q-input
                    shadow-text="nome do titular da conta"
                    label="Nome (até 25 letras)"
                    v-model="form.nome"
                    lazy-rules
                    :rules="rules.nome"
                ></q-input>

                <q-input
                    type="text"
                    shadow-text="chave pix"
                    label="Chave"
                    v-model="form.chave"
                    lazy-rules
                    :rules="rules.chave"
                    :mask="mask"
                    unmasked-value
                ></q-input>

                <q-input
                    shadow-text="cidade onde é efetuada a transação"
                    label="Cidade (até 15 letras)"
                    v-model="form.cidade"
                    lazy-rules
                    :rules="rules.cidade"
                ></q-input>

                <q-btn
                    label="Atualizar"
                    :loading="loading"
                    color="primary"
                    class="full-width"
                    type="submit"
                    outline
                    rounded
                ></q-btn>

                <q-btn
                    label="Cancelar"
                    class="full-width"
                    color="primary"
                    type="button"
                    rounded
                    flat
                    :to="{ name: 'new' }"
                />
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
    import { Tipo, TipoMask, TipoText } from "src/components/models";
    import { maxLength, required } from "src/components/rules";
    import useNotify from "src/composable/useNotifyComposable";
    import { computed, defineComponent, onMounted, ref } from "vue";
    import useParams from "../composable/useParamsComposable";

    export default defineComponent({
        name: "Params",

        setup() {
            const form = ref({
                tipo: "",
                chave: "",
                nome: "",
                cidade: "",
            });

            const rules = {
                tipo: [required("O tipo é obrigatório")],
                chave: [required("A chave é obrigatória")],
                nome: [
                    required("O nome é obrigatório"),
                    maxLength("Tamanho máximo é 25 letras", 25),
                ],
                cidade: [
                    required("A cidade é obrigatória"),
                    maxLength("Tamanho máximo é 15 letras", 15),
                ],
            };

            const loading = ref(false);

            const { notifyInfo, notifyError } = useNotify();
            const { setParam, getParam } = useParams();

            const mask = computed<string>(() =>
                form.value.tipo ? TipoMask[form.value.tipo] : ""
            );

            const submit = async () => {
                try {
                    loading.value = true;
                    await setParam(form.value);
                    notifyInfo("Atualizado com sucesso!");
                } catch (error) {
                    notifyError("Houve um erro para salvar os parâmetros!");
                } finally {
                    loading.value = false;
                }
            };

            onMounted(async () => {
                const param = await getParam();

                if (!param) return;

                const { tipo, chave, nome, cidade } = JSON.parse(param);

                form.value.chave = chave;
                form.value.nome = nome;
                form.value.cidade = cidade;

                setTimeout(() => (form.value.tipo = tipo), 500);
            });

            return {
                mask,
                form,
                rules,
                submit,
                loading,
                TipoText,
                tipos: Object.keys(Tipo),
            };
        },
    });
</script>