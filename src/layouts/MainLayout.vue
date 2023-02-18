<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                />

                <q-toolbar-title> Pix Code </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";
    import EssentialLink from "components/EssentialLink.vue";

    const linksList = [
        {
            title: "Novo",
            caption: "Criar nova cobrança",
            icon: "mdi-cash-plus",
            routerName: "new",
        },
           {
            title: "Histórico",
            caption: "Histórico de cobranças",
            icon: "mdi-history",
            routerName: "history",
        },
           {
            title: "Parâmetros",
            caption: "Configuração de parâmetros",
            icon: "mdi-cog",
            routerName: "params",
        },
    ];

    export default defineComponent({
        name: "MainLayout",

        components: {
            EssentialLink,
        },

        setup() {
            const leftDrawerOpen = ref(false);

            return {
                essentialLinks: linksList,
                leftDrawerOpen,
                toggleLeftDrawer() {
                    leftDrawerOpen.value = !leftDrawerOpen.value;
                },
            };
        },
    });
</script>
