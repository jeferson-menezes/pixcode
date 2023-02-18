import { openDB } from "idb";
import { boot } from "quasar/wrappers";

const idb = await openDB('translations', 1, {

    upgrade(db) {

        db.createObjectStore('history', {
            keyPath: 'id',
            autoIncrement: true,
        });

        db.createObjectStore('keyval');
    },

});

export default boot(({ app }) => { });

export { idb }
