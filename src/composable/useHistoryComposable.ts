import { idb } from "src/boot/idb";

export default function useHistory() {

    const addHistory = async (val: any) => {
        return idb.add('history', val)
    }

    const putHistory = async (val: any) => {
        return idb.put('history', val)
    }

    const getHistory = async (key: any) => {
        return idb.get('history', +key)
    }

    const deleteHistory = async (key: any) => {
        return idb.delete('history', +key)
    }

    const getAllHistoory = async () => {
        return idb.getAll('history')
    }

    return { addHistory, putHistory, getHistory, getAllHistoory, deleteHistory }
}