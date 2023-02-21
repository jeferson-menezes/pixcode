<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">Minha chave pix</p>
            </div>
        </div>

        <div class="row justify-center">
            <div class="col-12 text-center text-h3 text-weight-bold">
                PAGUE COM
            </div>

            <div class="col-12 text-center q-pa-md">
                <q-img src="src/assets/logo_pix.png" />
            </div>
            <div class="col-10 text-center q-pa-xs q-my-md">
                <q-img :src="base64"></q-img>
            </div>

            <div class="col-12">
                <q-list>
                    <q-item>
                        <q-item-section>
                            <q-item-label class="text-h6"
                                >Tipo de Chave:</q-item-label
                            >
                            <q-item-label class="text-subtitle1">
                                {{ TipoText[param?.tipo] }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label class="text-h6"
                                >Chave Pix:</q-item-label
                            >
                            <q-item-label class="text-subtitle1">
                                {{ param?.chave }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label class="text-h6">Nome:</q-item-label>
                            <q-item-label class="text-subtitle1">{{
                                param?.nome
                            }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
    import { Gerador } from "src/components/gerador";
    import { Param, TipoText } from "src/components/models";
    import useParams from "src/composable/useParamsComposable";
    import { defineComponent, onMounted, ref } from "vue";

    export default defineComponent({
        name: "Chave",

        setup() {
            const param = ref<Param>();
            const base64 = ref<string>();

            const { getParam } = useParams();

            onMounted(async () => {
                const payload = await getParam();
                if (payload) {
                    param.value = JSON.parse(payload);

                    const gerador = new Gerador(
                        param.value as Param,
                        "000000",
                        0.0,
                        ""
                    );
                    base64.value = await gerador.qrCodePix.base64();
                }
            });

            return { param, base64, TipoText };
        },
    });
</script>