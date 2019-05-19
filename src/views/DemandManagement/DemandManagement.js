import React, {Component} from 'react';
import "react-table/react-table.css";
import {demand_management_template} from "./templates/demand_management";
import Cookies from 'universal-cookie';
import moment from 'moment';

const requestData = (pageSize, page, sorted, filtered, filter) => {
    // return new Promise((resolve, reject) => {
    //     FetchOrders(filter).then(function (r) {
    //         let filteredData = r;
    //
    //         if (filtered.length) {
    //             filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
    //                 return filteredSoFar.filter(row => {
    //                     return (row[nextFilter.id] + "").includes(nextFilter.value);
    //                 });
    //             }, filteredData);
    //         }
    //         const sortedData = _.orderBy(
    //             filteredData,
    //             sorted.map(sort => {
    //                 return row => {
    //                     if (row[sort.id] === null || row[sort.id] === undefined) {
    //                         return -Infinity;
    //                     }
    //                     return typeof row[sort.id] === "string"
    //                         ? row[sort.id].toLowerCase()
    //                         : row[sort.id];
    //                 };
    //             }),
    //             sorted.map(d => (d.desc ? "desc" : "asc"))
    //         );
    //         const res = {
    //             rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
    //             pages: Math.ceil(filteredData.length / pageSize)
    //         };
    //         resolve(res)
    //     })
    // });

};


class DemandManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            data: [],
            dataAtendidos: [],
            dataNaoAtendidos: [],
            dataEmAtendimento: [],
            pages: null,
            loading: true,
            openModalHistoryItem: false,
            openPageOpecAssistente: false,
            openPageAtendidos: false,
            openPageNaoAtendidos: false,
            openPageEmAtendimento: false,
            modalOpen: false,
            title_page: 'Gestão do Demandante',
            total_order_pending: 0,
            total_order_in_analysis:0,
            total_order_approved:0,
            total_order_cancelled: 0,
            total_order_finished: 0,
            urgent_total_order_pending: 0,
            urgent_total_order_in_analysis: 0,
            urgent_total_order_approved:0,
            urgent_total_order_cancelled: 0,
            total_atendidas: 0,
            total_nao_atendidas: 0,
            total_em_analise: 0,
            status_ativo: 'APPROVED,IN_ANALYSIS,CANCELLED,PENDING',
            cookies: new Cookies(),
            disableButtons: false,
            opecAssistentPermission: 660101,
            opecAssistentAccess: false,
            cb_clientedireto: false,
            historyList: [],
            spacing: '',
            clientes: [],
            agencia_nome: '',
            agencias: [],
            cliente_nome: '',
            txt_contatoatendimento: '',
            numero_solicitacao: '',
            txt_assistente: '',
            txt_ponto_venda: '',
            lista_ponto_venda: [],
            origem_demanda: '',
            tipo_demanda: '',
            statusFilterAtendidos: 'APPROVED_SCHEDULE,APPROVED_SAFE_CONDUCT_SCHEDULE',
            statusFilterNaoAtendidos: 'CANCELLED_SYSTEM,REPROVED',
            statusFilterEmAtendimento   : 'APPROVED_OPEC_ASSIS,APPROVED_OPEC_EXIBI,PARTIAL_APPROVED,APPROVED_SAFE_CONDUCT',
            statusFilterOpecAssistente: 'APPROVED,IN_ANALYSIS,CANCELLED,PENDING,FINISHED',
            dataInicio: moment(),
            dataFim: moment().add(5, "days"),
            refreshTime: 300000,
            showModal: false,
            errorMessage: '',
        };


        this.fetchData = this.fetchData.bind(this);
        this.fetchDataAtendidos = this.fetchDataAtendidos.bind(this);
        this.fetchDataNaoAtendidos = this.fetchDataNaoAtendidos.bind(this);
        this.fetchDataEmAtendimento = this.fetchDataEmAtendimento.bind(this);
        this.fetchDataFilterd = this.fetchDataFilterd.bind(this);
        this.fetchDataAtendidosFiltered = this.fetchDataAtendidosFiltered.bind(this);
        this.fetchDataNaoAtendidosFiltered = this.fetchDataNaoAtendidosFiltered.bind(this);
        this.fetchDataEmAtendimentoFiltered = this.fetchDataEmAtendimentoFiltered.bind(this);
        this.fetchDataOPECAssistente = this.fetchDataOPECAssistente.bind(this);
        this.closeAllPages = this.closeAllPages.bind(this);
        this.openVisionOpecAssistente = this.openVisionOpecAssistente.bind(this);
        this.openVisionAtendidos = this.openVisionAtendidos.bind(this);
        this.openVisionNaoAtendidos = this.openVisionNaoAtendidos.bind(this);
        this.openVisionEmAtendimento = this.openVisionEmAtendimento.bind(this);
        this.fetchDataOpecAssistPending = this.fetchDataOpecAssistPending.bind(this);
        this.fetchDataOpecAssistInAnalysis = this.fetchDataOpecAssistInAnalysis.bind(this);
        this.fetchDataOpecAssistCancelled = this.fetchDataOpecAssistCancelled.bind(this);
        this.fetchDataOpecAssistFinished = this.fetchDataOpecAssistFinished.bind(this);
        this.fetchDataOpecAssistApproved = this.fetchDataOpecAssistApproved.bind(this);
        this.clearAndOpenOpecAssis = this.clearAndOpenOpecAssis.bind(this);
        this.clearAndOpenAtendidos = this.clearAndOpenAtendidos.bind(this);
        this.clearAndOpenNaoAtendidos = this.clearAndOpenNaoAtendidos.bind(this);
        this.clearAndOpenEmAtendimento = this.clearAndOpenEmAtendimento.bind(this);
        this.handleOpenModalHistory = this.handleOpenModalHistory.bind(this);
        this.handleInputChangeStartDate = this.handleInputChangeStartDate.bind(this);
        this.handleInputChangeEndDate = this.handleInputChangeEndDate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.pesquisarDados = this.pesquisarDados.bind(this);
        this.handleValidateFilter = this.handleValidateFilter.bind(this);
        this.autoRefresh = this.autoRefresh.bind(this);
        this.refreshRecords = this.refreshRecords.bind(this);
        this.carregaListaPontoVenda = this.carregaListaPontoVenda.bind(this);
        this.clearFields = this.clearFields.bind(this);

        this.autoRefresh = this.autoRefresh(this);
        this.carregaListaPontoVenda();

    }

    handleChange(field, event) {

        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({fields});

        if (field == "txt_ponto_venda") {
            this.setState({txt_ponto_venda: event.target.value});
        }
        if (field == "origem_demanda") {
            this.setState({origem_demanda: event.target.value});
        }
    }

    handleClik() {
        this.setState({
            disabled: !this.state.disabled,
            cb_clientedireto: this.state.cb_clientedireto ? false : true,
            agencia_nome: '',
            agencia_cnpj:'',

        })

    }

    autoRefresh() {

        var nextState = this;
        // if(sessionStorage.getItem('isauthenticated') === 'true') {

            setInterval(function () {
                nextState.refreshRecords();
            }, nextState.state.refreshTime)
        // }
    }

    refreshRecords() {
        console.log('refresh auto');
    }

    clearFields() {

        this.setState({
            cliente_nome: '',
            agencia_nome: '',
            txt_contatoatendimento: '',
            numero_solicitacao: '',
            txt_assistente: '',
            txt_ponto_venda: '',
            origem_demanda: '',
            cb_clientedireto: false,
            tipo_demanda: '',

        })

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
        });

    }

    comparePontoVenda(a,b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    fetchData(state, instance) {

        this.setState({ loading: true });

        requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered,
            'filter'
        ).then(res => {

            this.setState({
                data: res.rows,
                pages: res.pages,
                loading: false
            });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    clearAndOpenAtendidos() {
        this.closeAllPages();
        this.setState({
            openPageAtendidos: true,
            modalOpen: false,
            status_ativo: ''
        })
    }

    clearAndOpenNaoAtendidos() {
        this.closeAllPages();
        this.setState({
            openPageNaoAtendidos: true,
            modalOpen: false,
            status_ativo: ''
        })
    }
    clearAndOpenEmAtendimento() {
        this.closeAllPages();
        this.setState({
            openPageEmAtendimento: true,
            modalOpen: false,
            status_ativo: ''
        })
    }

    clearAndOpenOpecAssis() {
        this.closeAllPages();
        this.setState({
            openPageOpecAssistente: true,
            modalOpen: false,
            status_ativo: '',
        })
    }

    fetchDataOpecAssistPending() {
        this.clearAndOpenOpecAssis();
        this.fetchDataFilterd('PENDING')
        this.setState({
            status_ativo: 'PENDING'
        })
    }
    fetchDataOpecAssistInAnalysis() {
        this.clearAndOpenOpecAssis();
        this.fetchDataFilterd('IN_ANALYSIS')
        this.setState({
            status_ativo: 'IN_ANALYSIS'
        })
    }

    fetchDataOpecAssistCancelled() {
        this.clearAndOpenOpecAssis();
        this.fetchDataFilterd('CANCELLED')
        this.setState({
            status_ativo: 'CANCELLED'
        })
    }

    fetchDataOpecAssistFinished() {
        this.clearAndOpenOpecAssis();
        this.fetchDataFilterd('FINISHED')
        this.setState({
            status_ativo: 'FINISHED'
        })
    }

    fetchDataOpecAssistApproved() {
        this.clearAndOpenOpecAssis();
        this.fetchDataFilterd('APPROVED')
        this.setState({
            status_ativo: 'APPROVED'
        })
    }

    closeAllPages() {
        const current_page = this;
        current_page.setState({
            openPageOpecAssistente: false,
            openPageAtendidos: false,
            openPageNaoAtendidos: false,
            openPageEmAtendimento: false,
            openModalHistory: false,
            openModalHistoryItem: false,
            modalOpen: false,
        })
    }

    openVisionOpecAssistente() {
        this.clearAndOpenOpecAssis();
        this.fetchDataFilterd(this.state.statusFilterOpecAssistente);
        this.setState({
            status_ativo: this.state.statusFilterOpecAssistente
        })
    }

    openVisionAtendidos() {
        this.clearFields();
        this.clearAndOpenAtendidos();
        this.fetchDataAtendidosFiltered(this.state.statusFilterAtendidos)
        this.setState({
            status_ativo: this.state.statusFilterAtendidos
        })
    }

    openVisionNaoAtendidos() {
        this.clearFields();
        this.clearAndOpenNaoAtendidos();
        this.fetchDataNaoAtendidosFiltered(this.state.statusFilterNaoAtendidos)
        this.setState({
            status_ativo: this.state.statusFilterNaoAtendidos
        })
    }
    openVisionEmAtendimento() {
        this.clearFields();
        this.clearAndOpenEmAtendimento();
        this.fetchDataEmAtendimentoFiltered(this.state.statusFilterEmAtendimento)
        this.setState({
            status_ativo: this.state.statusFilterEmAtendimento
        })
    }

    closeModalHistoryItemAction = () => {
        this.setState({ openModalHistoryItem: false, modalOpen: false});
    };

    fetchDataOPECAssistente(state, instance) {

        console.log('fetch');
        // this.setState({ loading: true });

        // requestData(
        //     state.pageSize,
        //     state.page,
        //     state.sorted,
        //     state.filtered,
        //     'filter'
        // ).then(res => {
        //
        //     this.setState({
        //         data: res.rows,
        //         pages: res.pages,
        //         loading: false,
        //
        //     });
        // });
    }

    fetchDataAtendidos(state) {

        console.log('fetch');

    }

    fetchDataNaoAtendidos(state) {

        console.log('fetch');

    }
    fetchDataEmAtendimento(state) {

        console.log('fetch');

    }

    fetchDataFilterd(filtro){

        console.log('fetch');

    }

    fetchDataAtendidosFiltered(filtro){

        console.log('fetch');

    }

    fetchDataNaoAtendidosFiltered(filtro){

        console.log('fetch');

    }
    fetchDataEmAtendimentoFiltered(filtro){

        console.log('fetch');

    }

    handleOpenModalHistory(param) {

        var nextState = this;


            nextState.setState({
                // historyList: historicList,
                openModalHistoryItem: true,
                disableButtons: false,
                errors: '',
                tipo_action: param.tipo,
                cliente_action: param.nome_cliente,
                agencia_action: param.nome_agencia,
                modalOpen: true
            })

    }


    pesquisarDados() {

        if(this.handleValidateFilter()) {
            if (this.state.openPageOpecAssistente) {
                this.openVisionOpecAssistente();
            } else if (this.state.openPageAtendidos) {
                this.openVisionAtendidos();
            } else if (this.state.openPageNaoAtendidos) {
                this.openVisionNaoAtendidos();
            } else if (this.state.openPageEmAtendimento) {
                this.openVisionEmAtendimento();
            }

        }
    }

    handleValidateFilter() {

        var validated = true;

        if(!this.state.dataInicio || !this.state.dataFim) {
            this.setState({
                showModal: true,
                errorMessage: "O Período deve ser informado completo",});
            validated = false
        } else {
            if (this.state.dataInicio > this.state.dataFim) {
                this.setState({
                    showModal: true,
                    errorMessage: "Data de Início superior a Data de Fim",});
                validated = false
            }
        }

        return validated
    }

    handleInputChangeStartDate(event) {
        this.setState({
            dataInicio: event
        })
    }

    handleInputChangeEndDate(event) {
        this.setState({
            dataFim: event
        })
    }

    render() {


        return (
            demand_management_template(this)
        );

    }

}

export default DemandManagement;
