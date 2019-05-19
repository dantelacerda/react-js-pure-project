import React, {Component} from 'react';
import {VendasTemplate} from "./templates/order";
import moment from 'moment';
import Cookies from 'universal-cookie';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lista_ponto_venda: [],
            linhaslegenda: [],
            linhas_insercoes: [],
            tituloinsercao: '',
            titulo: [],
            fields: {},
            errors: {},
            indicematerial: [],
            indiceinsercao: [],
            idcompra: '',
            idlegenda: '',
            value: '',
            programa: '',
            exibidora: '',
            disponibilidade: '',
            agencia_nome: '',
            agencia_cnpj: '',
            agencias: [],
            cliente_nome: '',
            cliente_cnpj: '',
            txt_titulo: '',
            txt_cm: '',
            //txt_titulo: '',
            txt_duracao: '',
            txt_grupodechoque: '',
            lst_player: '',
            cb_na_globo: false,
            chk_material: false,
            chk_insercao: false,
            lst_matexibidora: '',
            lst_matnaglobo: '',
            cb_clientedireto: false,
            txt_contatoatendimento: '',
            txt_assistente: '',
            txt_player: '',
            txt_cm2: '',
            txt_titulo2: '',
            txt_duracao2: '',
            txt_grupochoque2: '',
            txt_naglobo2: '',
            cb_na_globo2: '',
            cb_select_legenda: '',
            txt_ponto_venda: '',
            disabled: false,
            disablednaglobo: false,
            clientes: [],
            programas: [],
            exibidoras: [],
            letraslegenda: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            posCaption: 0,
            txt_data: moment(),
            txt_playerfinal: '',
            dataParamPrograma: '',
            cookies: new Cookies(),
            disableButtons: false,
            newOrderPermission: 660205,
            cd_nivel_merc: '',
            showModal: false,
            errorMessage: '',
            CREATED: 201,

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.incluiLegenda = this.incluiLegenda.bind(this);
        this.handleInputSelectInsercaoChange = this.handleInputSelectInsercaoChange.bind(this);
        this.handleInputSelectChangeExibidora = this.handleInputSelectChangeExibidora.bind(this);
        this.AddOrder = this.AddOrder.bind(this);
        this.incluiInsercao = this.incluiInsercao.bind(this);
        this.insereNovaInsercaoLista = this.insereNovaInsercaoLista.bind(this);
        this.handleValidateInsertion = this.handleValidateInsertion.bind(this);
        this.handleValidateListInsertion = this.handleValidateListInsertion.bind(this);
        this.ApproveOrder = this.ApproveOrder.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.limpaIncluiInsercao = this.limpaIncluiInsercao.bind(this);
        this.insereTrocaEmAnalise = this.insereTrocaEmAnalise.bind(this);
        this.cancelOperation = this.cancelOperation.bind(this);
        this.carregaListaPontoVenda = this.carregaListaPontoVenda.bind(this);
        this.backToManageDemand = this.backToManageDemand.bind(this);
        this.hasSameInsertion = this.hasSameInsertion.bind(this);
        this.validarCNPJ = this.validarCNPJ.bind(this);
        this.carregaListaPontoVenda();

    }

    backToManageDemand() {
        window.open('#gestaodemandante', '_parent');
    }

    carregaListaPontoVenda() {

        var nextState = this;
        var listaPontoVenda = [];


            var pontoVenda = {
                value: "ACP",
                name: "ACP"
            }

            listaPontoVenda.push(pontoVenda)



        nextState.setState({
            lista_ponto_venda: listaPontoVenda.sort(nextState.comparePontoVenda)
        })


    }

    incluiInsercao() {

        if(this.handleValidateInsertion() && this.handleValidateListInsertion()) {

            if(!this.hasSameInsertion()) {
                this.insereNovaInsercaoLista();
            }

        } else {

            this.setState({
                showModal: true,
                errorMessage: "Por favor inserir corretamente os dados da inserção",});

        }
    }

    hasSameInsertion() {
        var hasSameInsertion = false;

        let lengthArray = this.state.linhas_insercoes.length;
        if(lengthArray > 0) {
            for (var i = lengthArray - 1; i >= 0; i--) {

                if (this.state.linhas_insercoes[i].legenda2.toUpperCase() === this.state.tituloinsercao.toUpperCase()
                    && this.state.linhas_insercoes[i].programa2.toUpperCase() === this.state.programa.toUpperCase()
                    && this.state.linhas_insercoes[i].exibidora2.toUpperCase() === this.state.exibidora.toUpperCase()
                    && this.state.linhas_insercoes[i].data2 === this.state.txt_data.format('DD/MM/YYYY')
                    && !hasSameInsertion) {

                    hasSameInsertion = true;

                }
            }
        } else {
            return hasSameInsertion;
        }

        return hasSameInsertion;
    }

    insereNovaInsercaoLista() {

        var nextState = this;
        var dataAdd = new Date(nextState.state.txt_data);
        var dataSalvar = dataAdd.getFullYear() + '-' + (parseInt(dataAdd.getMonth()) + 1).toString() + '-' + dataAdd.getDate() + ' ' + '00:00:00';

        var newdata2 = {
            data2: nextState.state.txt_data.format('DD/MM/YYYY'),
            legenda2: nextState.state.tituloinsercao,
            cm2: nextState.state.txt_cm2,
            titulo2: nextState.state.txt_titulo2.toUpperCase(),
            duracao2: nextState.state.txt_duracao2,
            programa2: nextState.state.programa.toUpperCase(),
            exibidora2: nextState.state.exibidora.toUpperCase(),
            disponibilidade2: nextState.state.disponibilidade,
            materialexibidora2: nextState.state.lst_matexibidora,
            grupodechoque2: nextState.state.txt_grupochoque2.toUpperCase(),
            txt_naglobo2: nextState.state.txt_naglobo2,
            cd_nivel_merc :nextState.state.cd_nivel_merc,
            checked: false,
            player: nextState.state.txt_playerfinal,
            status: 'IN_ANALYSIS',
            dataSalvar: dataSalvar,
            usuario_login: nextState.state.cookies.get('loggedUser')
        }


        nextState.state.linhas_insercoes.push(newdata2);
        nextState.setState({
            linhas_insercoes: nextState.state.linhas_insercoes,
        })

    }

    limpaIncluiInsercao() {
        this.state.tituloinsercao = ''
        this.state.txt_cm2 = ''
        this.state.txt_titulo2 = ''
        this.state.txt_duracao2 = ''
        this.state.programa = ''
        this.state.exibidora = ''
        this.state.disponibilidade = ''
        //this.state.lst_matexibidora = ''
        this.state.txt_grupochoque2 = ''
        this.state.txt_playerfinal = ''
        this.state.tituloinsercao = ''
        this.state.txt_data=moment()

    }

    handleInputChangeDate(event) {

        this.setState({
            txt_data: event
        })
    }

    handleValidateInsertion() {
        let errors = {};
        let formIsValid = true;
        errors["errors_insertions"] = "";

        if(!this.state.txt_data) {
            formIsValid = false;
            errors["errors_insertions"] += "Informe a Data \n";
            errors["txt_data"] = "Erro";

        }
        if(!this.state.programa) {
            formIsValid = false;
            errors["errors_insertions"] += "Informe o Programa \n";
            errors["programa"] = "Erro";

        }

        if(!this.state.exibidora) {
            formIsValid = false;
            errors["errors_insertions"] +="Informe a Exibidora \n";
            errors["exibidora"] = "Erro";

        }

        if(!this.state.disponibilidade) {
            formIsValid = false;
            errors["errors_insertions"] += "Informe a Disponibilidade \n";
            errors["disponibilidade"] = "Erro";
        }
        if(!this.state.tituloinsercao) {
            formIsValid = false;
            errors["errors_insertions"] += "Informe a Legenda \n";
            errors["tituloinsercao"] = "Erro";

        }
        if(!this.state.lst_matexibidora) {
            formIsValid = false;
            errors["errors_insertions"] += "Informe se o material esta na exibidora \n";
            errors["lst_matexibidora"] = "Erro";
        }

        this.setState({
            errors: errors});
        return formIsValid;

    }

    handleValidateListInsertion() {
        var valid = true;

        let lengthArray = this.state.linhas_insercoes.length;
        if(lengthArray > 0) {
            for (var i = lengthArray - 1; i >= 0; i--) {

                if (this.state.linhas_insercoes[i].legenda2.toUpperCase() === this.state.tituloinsercao.toUpperCase()
                    && this.state.linhas_insercoes[i].programa2.toUpperCase() === this.state.programa.toUpperCase()
                    && this.state.linhas_insercoes[i].exibidora2.toUpperCase() === this.state.exibidora.toUpperCase()
                    && this.state.linhas_insercoes[i].data2 === this.state.txt_data.format('DD/MM/YYYY')
                    && valid) {

                    valid = false;
                    confirmAlert({
                        customUI: ({onClose}) => {
                            return (
                                <div className='custom-ui'>
                                    <h1>Tem certeza?</h1>
                                    <p>Uma inserção com os mesmos dados ja foi inserida. Deseja continuar?</p>
                                    <button onClick={() => {
                                       onClose()
                                    }}>Não
                                    </button>
                                    <button onClick={() => {
                                        this.insereNovaInsercaoLista()
                                        onClose()


                                    }}>Sim
                                    </button>
                                </div>
                            )
                        }
                    })

                }
            }

        } else {
             return true;
        }

        return true;
    }



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }


    handleClik() {
        this.setState({
            disabled: !this.state.disabled,
            cb_clientedireto: this.state.cb_clientedireto ? false : true,
            agencia_nome: '',
            agencia_cnpj:'',

        })

    }

    incluiLegenda() {

        if (this.handleValidation()) {

            let errors = {};
            var posCaptionNew = this.state.posCaption + 1;
            var nextCaption = this.state.letraslegenda[this.state.posCaption];

            var novalinha = {
                legenda: nextCaption,
                cm: this.state.txt_cm,
                titulo_material: this.state.txt_titulo.toUpperCase(),
                duracao: this.state.txt_duracao,
                material_na_glob: this.state.lst_matnaglobo,
                grupo_choque: this.state.txt_grupodechoque.toUpperCase(),
                player: this.state.lst_player,
                checked: false
            }

            var novotitulo = {
                value: nextCaption+ '|' + this.state.txt_cm + '|' + this.state.txt_titulo.toUpperCase() + '|' + this.state.txt_duracao + '|'
                + this.state.txt_grupodechoque.toUpperCase() + '|' + this.state.lst_player + '|' + this.state.lst_matnaglobo,
                name: nextCaption + '|' + this.state.txt_cm + '|' + this.state.txt_titulo.toUpperCase()
            }

            var nextState = this.state;
            nextState.linhaslegenda.push(novalinha);
            nextState.titulo.push(novotitulo);
            nextState.fields = {};
            this.setState(nextState);

            this.setState({errors: errors});

            this.setState({
                txt_cm: '',
                txt_titulo:'',
                txt_duracao:'',
                lst_matnaglobo:'',
                txt_grupodechoque:'',
                lst_player:'',
                posCaption: posCaptionNew,
                disablednaglobo: true,
            })

        } else {
            this.setState({
                showModal: true,
                errorMessage: "Por favor inserir corretamente os dados da legenda do material",});
        }

    }

    handleChange(field, event) {

        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({fields});

        if (field == "txt_cm") {
            this.setState({txt_cm: event.target.value});
        }
        if (field == "txt_titulo") {
            this.setState({txt_titulo: event.target.value});
        }
        if (field == "txt_duracao") {
            this.setState({txt_duracao: event.target.value});
        }

        if (field == "disponibilidade") {
            this.setState({disponibilidade: event.target.value});
        }

        if (field == "lst_matnaglobo") {
            if (event.target.value=="Sim"){
                this.state.disablednaglobo = true;
                this.state.lst_player = "";
            }else{
                this.state.disablednaglobo = false;
            }
            this.setState({lst_matnaglobo: event.target.value});
        }

        if (field == "txt_grupodechoque") {
            this.setState({txt_grupodechoque: event.target.value});
        }
        if (field == "lst_player") {
            if (this.state.disablednaglobo){
                this.setState({lst_player: null});
            } else {
                this.setState({lst_player: event.target.value});
            }
        }

        if (field == "txt_ponto_venda") {
            this.setState({txt_ponto_venda: event.target.value});
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["txt_cm"]) {
            formIsValid = false;
            errors["txt_cm"] = "Não pode ser vazio";
        }

        for (var i = this.state.linhaslegenda.length - 1; i >= 0; i--) {

            if(formIsValid) {
                if (this.state.txt_cm === this.state.linhaslegenda[i].cm) {
                    formIsValid = false;
                    errors["txt_cm"] = "Uma legenda com esse CM já foi incluída";
                }

                if (this.state.txt_titulo.toUpperCase() === this.state.linhaslegenda[i].titulo_material.toUpperCase()
                && this.state.txt_duracao === this.state.linhaslegenda[i].duracao) {
                    formIsValid = false;
                    errors["txt_titulo"] = "Uma legenda com esse Título já foi incluída";
                }

            }
        }

        if (this.state.txt_duracao && this.state.txt_duracao === "0") {
            formIsValid = false;
            errors["txt_duracao"] = "A duração deve ser maior do que 0";
        }

        if (typeof fields["txt_cm"] !== "undefined") {
            if (!fields["txt_cm"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["txt_cm"] = "Somente Numeros";
            }
        }

        if (!fields["txt_titulo"]) {
            formIsValid = false;
            errors["txt_titulo"] = "Não pode ser vazio";
        }

        if (!fields["txt_duracao"]) {
            formIsValid = false;
            errors["txt_duracao"] = "Não pode ser vazio";
        }

        if (typeof fields["txt_duracao"] !== "undefined") {
            if (!fields["txt_duracao"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["txt_duracao"] = "Somente Numeros";
            }
        }

        if (!fields["txt_grupodechoque"]) {
            formIsValid = false;
            errors["txt_grupodechoque"] = "Não pode ser vazio";
        }

        if (!fields["lst_player"] &&  !this.state.disablednaglobo) {
            formIsValid = false;
            errors["lst_player"] = "Selecionar Player";
        }

        if (!fields["lst_matnaglobo"]) {
            formIsValid = false;
            errors["lst_matnaglobo"] = "Informar Material na Globo";
        }

        this.setState({errors: errors});
        return formIsValid;

    }

    handleInputSelectChangeExibidora(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            lst_matexibidora: value
        });

    }

    deleteCaptions() {

        let atLeastOne = false;
        let lengthArray = this.state.linhaslegenda.length


        for (var i = lengthArray - 1; i >= 0; i--) {

            let check = this.state.linhaslegenda[i].checked

            if(check) {
                atLeastOne = true;

                this.state.linhaslegenda.splice(i, 1);
                this.state.titulo.splice(i, 1);

            }

        }

        this.setState({
            linhaslegenda: this.state.linhaslegenda.sort()
        });

        if(!atLeastOne) {
            this.setState({
                showModal: true,
                errorMessage: "Selecione pelo menos 1 registro para Excluir",});
        }

        this.uncheckAllCheckboxes();

    }

    deleteInsertions() {

        let atLeastOne = false;
        let lengthArray = this.state.linhas_insercoes.length


        for (var i = lengthArray - 1; i >= 0; i--) {

            let check = this.state.linhas_insercoes[i].checked

            if(check) {
                atLeastOne = true;

                this.state.linhas_insercoes.splice(i, 1);

            }

        }

        this.setState({
            linhas_insercoes: this.state.linhas_insercoes.sort()
        });

        if(!atLeastOne) {
            this.setState({
                showModal: true,
                errorMessage: "Selecione pelo menos 1 registro para Excluir",});
        }

        this.uncheckAllCheckboxes();

    }

    uncheckAllCheckboxes() {

        var x = document.getElementsByClassName("form-check-input");


        for(var i=0; i<=x.length; i++) {
            if(x[i]) {
                x[i].checked = false;
            }

        }
    }

    salvaIndiceCheckBoxMaterial(i) {

        let check = this.state.linhaslegenda[i].checked
        this.state.linhaslegenda[i].checked = check ? false : true

    }

    salvaIndiceCheckBoxInsercao(i) {
        let check = this.state.linhas_insercoes[i].checked
        this.state.linhas_insercoes[i].checked = check ? false : true

    }

    handleInputSelectInsercaoChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        const answer_array = value.split('|');

        this.setState({
            tituloinsercao: answer_array[0],
            txt_cm2: answer_array[1],
            txt_titulo2: answer_array[2],
            txt_duracao2: answer_array[3],
            txt_grupochoque2: answer_array[4],
            txt_playerfinal: answer_array[5],
            lst_matexibidora: answer_array[6] === 'Não' ? 'Não' : '',
            txt_naglobo2: answer_array[6],

        });

    }

    handleValidateSaveOrder() {

        let errors = {};
        let formIsValid = true;


        if (!this.state.cliente_nome) {
            formIsValid = false;
            errors["cliente_nome"] = "Não pode ser vazio";

        }
        if (!this.state.cliente_cnpj) {
            formIsValid = false;
            errors["cliente_cnpj"] = "Não pode ser vazio";

        } else {
            if(!this.validarCNPJ(this.state.cliente_cnpj)) {
                formIsValid = false;
                errors["cliente_cnpj"] = "CNPJ inválido informado";
            }
        }

        if (!this.state.txt_ponto_venda) {
            formIsValid = false;
            errors["txt_ponto_venda"] = "Não pode ser vazio";
        }

        if(!this.state.cb_clientedireto) {
            if (!this.state.agencia_nome) {
                formIsValid = false;
                errors["agencia_nome"] = "Não pode ser vazio";
            }
            if (!this.state.agencia_cnpj) {
                formIsValid = false;
                errors["agencia_cnpj"] = "Não pode ser vazio";
            }
        }

        if(!this.state.linhas_insercoes || this.state.linhas_insercoes.length === 0) {
            formIsValid = false;
            errors["errors_insertions"] = "Informe pelo menos uma inserção";
        }

        this.setState({errors: errors});


        return formIsValid;

    }


    AddOrder() {

        if(this.handleValidateSaveOrder()) {
            var json = {
                cnpj_cliente: this.state.cliente_cnpj.replace(/[^\d]+/g,''),
                nome_cliente: this.state.cliente_nome,
                cnpj_agencia: this.state.agencia_cnpj,
                nome_agencia: this.state.agencia_nome,
                contato_atendimento: this.state.contatoatendimento ? this.state.contatoatendimento.toUpperCase() : '',
                assistente: this.state.txt_assistente ? this.state.txt_assistente.toUpperCase() : '',
                player: '',
                cliente_direto: this.state.cb_clientedireto,
                ponto_venda: this.state.txt_ponto_venda,
                status: 'DRAFT',
                tipo:'Nova Compra',
                origem: 'MANUAL',
                items:[],
                usuario_login: this.state.cookies.get('loggedUser')
            }

            alert("OK!");

        } else {
            this.setState({
                showModal: true,
                errorMessage: "Por favor inserir corretamente os dados antes de Salvar Rascunho",});
        }
    }

    insereTrocaEmAnalise() {

        if(this.handleValidateSaveOrder()) {

            this.setState({
                disableButtons: true
            })

            var json = {
                cnpj_cliente: this.state.cliente_cnpj.replace(/[^\d]+/g,''),
                nome_cliente: this.state.cliente_nome,
                cnpj_agencia: this.state.agencia_cnpj,
                nome_agencia: this.state.agencia_nome,
                contato_atendimento: this.state.txt_contatoatendimento ? this.state.txt_contatoatendimento.toUpperCase() : '',
                assistente: this.state.txt_assistente ? this.state.txt_assistente.toUpperCase() : '',
                player: '',
                cliente_direto: this.state.cb_clientedireto,
                ponto_venda: this.state.txt_ponto_venda,
                status: 'IN_ANALYSIS',
                tipo:'Nova Compra',
                origem: 'MANUAL',
                items:[],
                usuario_login: this.state.cookies.get('loggedUser')
            }

            var nextState = this;
            alert("OK!");
        } else {
            this.setState({
                showModal: true,
                errorMessage: "Por favor inserir corretamente os dados antes de enviar para análise",});
        }
    }

    ApproveOrder() {

        if(this.handleValidateSaveOrder()) {

            this.setState({
                disableButtons: true
            })

            var json = {
                cnpj_cliente: this.state.cliente_cnpj.replace(/[^\d]+/g,''),
                nome_cliente: this.state.cliente_nome,
                cnpj_agencia: this.state.agencia_cnpj,
                nome_agencia: this.state.agencia_nome,
                contato_atendimento: this.state.txt_contatoatendimento ? this.state.txt_contatoatendimento.toUpperCase() : '',
                assistente: this.state.txt_assistente ? this.state.txt_assistente.toUpperCase() : '',
                player: '',
                cliente_direto: this.state.cb_clientedireto,
                ponto_venda: this.state.txt_ponto_venda,
                status: 'APPROVED',
                tipo:'Nova Compra',
                origem: 'MANUAL',
                items:[],
                usuario_login: this.state.cookies.get('loggedUser')
            }
            var nextState = this;

            alert("OK!");

        } else {
            this.setState({
                showModal: true,
                errorMessage: "Por favor inserir corretamente os dados antes de Aprovar a Solicitação",});
        }
    }


    cancelOperation() {
        window.open('#gestaodemandante', '_parent');
    }


    validarCNPJ(cnpj) {

        cnpj = cnpj.replace(/[^\d]+/g,'');

        if(cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;

    }

    comparePontoVenda(a,b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    render() {

        return (

            VendasTemplate(this)
        );
    }
}

export default Order;
