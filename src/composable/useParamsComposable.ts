import { idb } from "src/boot/idb";

export default function useParams() {

    const setParam = async (val: any) => {
        return await idb.put('keyval', JSON.stringify(val), 1);
    }

    const getParam = async (): Promise<string> => {
        return await idb.get('keyval', 1);
    }

    return { setParam, getParam }
}