import React from 'react';

import {InserirNovaEntrega} from "../service/EntregaService";



export function InsertEntrega(entrega) {

    return  InserirNovaEntrega(entrega).then((result) => {
        return result;
    })
}



