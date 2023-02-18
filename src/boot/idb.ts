import { openDB } from "idb";
import { boot } from "quasar/wrappers";

const openConnection = async () => {
    return await openDB('translations', 1, {

        upgrade(db) {

            db.createObjectStore('history', {
                keyPath: 'id',
                autoIncrement: true,
            });

            db.createObjectStore('keyval');
        },
    });
}

const idb = await openConnection()

export default boot(({ app }) => { });

export { idb }
