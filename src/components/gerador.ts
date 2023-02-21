import { QrCodePix } from "qrcode-pix";
import { Param } from "./models";

export class Gerador {

    qrCodePix

    constructor(param: Param, id: string, valor: number, descricao: string) {

        this.qrCodePix = QrCodePix({
            version: '01',
            key: param.chave,
            name: param.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
            city: param.cidade.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
            transactionId: id, //max 25 characters
            message: descricao ? descricao.normalize('NFD').replace(/[\u0300-\u036f]/g, "") : id,
            cep: '99999999',
            value: +valor,
        })
    }

}