import {
    Button,
    Card,
    CardBody,
    Col,
    FormGroup,
    Input,
    Row,
    Table,
    Label,
} from 'reactstrap';

import ReactTable from "react-table";
import React from 'react';
import Popup from "reactjs-popup";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import moment from 'moment';
import ReactAutocomplete from 'react-autocomplete'
import {GetClientes} from "../../../service/ClientService";
import {GetAgencia} from "../../../service/AgencyService";
import {CnpjMask} from "../../../utils/cnpj";
import {NumeroSolicitacaoMask} from "../../../utils/numeroSolicitacao";
import Modal from "react-animated-modal";

export var demand_management_template = (page_state)=>{
    const { data, dataAtendidos, dataNaoAtendidos, pages, loading,
        opecAssistentAccess, programingAccess, dataEmAtendimento  } = page_state.state;


    function calculaHora(tempoRestante, horaPrograma, quantidadeDias, linha) {

        if(quantidadeDias < 0) {

            return "00:00:00";

        } else {

            if(tempoRestante) {
                var tempoRestanteSplit = tempoRestante.split(":");
                var horaFinal = parseInt(tempoRestanteSplit[0]);
                var horasAdicionais = parseInt(quantidadeDias) * 24;
                horaFinal = horaFinal+horasAdicionais;

                return leftPad(horaFinal, 2, 0)+":"+tempoRestanteSplit[1]+":"+tempoRestanteSplit[2];
            } else {
                return "00:00:00";
            }


        }
    }

    function calculaPrioridadePorClass(tempoRestante, horaPrograma, quantidadeDias, linha) {

        if (quantidadeDias < 0) {
            return "urgent";

        } else {
            if (tempoRestante) {
                var tempoRestanteSplit = tempoRestante.split(":");
                var horaFinal = parseInt(tempoRestanteSplit[0]);
                var horasAdicionais = parseInt(quantidadeDias) * 24;
                horaFinal = horaFinal + horasAdicionais;

                return (horaFinal < 3 ? "urgent" :
                    horaFinal >= 5 ? "normal" :
                        "attention");
            } else {
                return "urgent"

            }
        }
    }

    function filtraHoraDeData(data) {
        var dataComHora = new Date(data);
        return dataComHora.toLocaleTimeString();
    }

    function leftPad(value, totalWidth, paddingChar) {
        var length = totalWidth - value.toString().length + 1;
        if(length >= 0) {
            return Array(length).join(paddingChar || '0') + value;
        } else {
            return value;
        }
    }

    return <div className="animated fadeIn">

        <div id="divAlertMessage">
            <Modal
                visible={page_state.state.showModal}
                closemodal={() => page_state.setState({ showModal: false })}
                type="bounceIn" className={"error-message-modal"}
            >
                <div className="error-message-modal"> {page_state.state.errorMessage} </div>
            </Modal>

        </div>

        <Row >
            <Row style={{width: 100+'%'}}>

                    <span className={"page-title page-title-actitivies-style"}>{page_state.state.title_page}</span>

                <Col>


                    <Button
                            style={{width: 130 + 'px'}} onClick={page_state.refreshRecords}
                            className="button-refresh-main-activities float-right">
                          <i className="fa fa-refresh" style={{paddingRight: 10+'px'}}></i>ATUALIZAR</Button>




                </Col>

            </Row>
            <Col xs="12" md="12">


                <FormGroup className={"row general-counts-table"} >
                    <Card className={"general-count-style"} >
                        <Table>
                            <tr style={{borderStyle: 'none'}}>
                                <td style={{borderStyle: 'none'}}>

                                    <Table borderless>
                                        <tr style={{backgroundColor: page_state.state.openPageOpecAssistente ? 'rgb(188, 229, 243)' : '#fff'}}>
                                            <span className={'title-card-style'} onClick={page_state.openVisionOpecAssistente}><b>Gestão de Negócio</b></span> </tr>
                                        <tr>
                                            <td style={{backgroundColor: '#fff', paddingBottom: 0+'px'}}>

                                                <span className={'table-column-general-vision-count-name'} onClick={page_state.fetchDataOpecAssistPending}>Pendente </span>
                                                <span className={'numberCircle'}>{page_state.state.total_order_pending}</span>
                                                <span className={'red-circle'} hidden={!page_state.state.urgent_total_order_pending}>&#x25cf;{page_state.state.urgent_total_order_pending}</span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{backgroundColor: '#fff', paddingBottom: 0+'px'}}>
                                                <span className={'table-column-general-vision-count-name'} onClick={page_state.fetchDataOpecAssistInAnalysis}>À Analisar </span>
                                                <span className={'numberCircle'}>{page_state.state.total_order_in_analysis}</span>
                                                <span className={'red-circle'} hidden={!page_state.state.urgent_total_order_in_analysis}>&#x25cf;{page_state.state.urgent_total_order_in_analysis}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{backgroundColor: '#fff', paddingBottom: 0+'px'}}>
                                                <span className={'table-column-general-vision-count-name'} onClick={page_state.fetchDataOpecAssistApproved}>Em Atendimento </span>
                                                <span className={'numberCircle'}>{page_state.state.total_order_approved}</span>
                                                <span className={'red-circle'} hidden={!page_state.state.urgent_total_order_approved}>&#x25cf;{page_state.state.urgent_total_order_approved}</span>
                                            </td>

                                        </tr>

                                        <tr>
                                            <td style={{backgroundColor: '#fff', paddingBottom: 0+'px'}}>
                                                <span className={'table-column-general-vision-count-name'} onClick={page_state.fetchDataOpecAssistCancelled}>Cancelados </span>
                                                <span className={'numberCircle'}>{page_state.state.total_order_cancelled}</span>
                                                <span className={'red-circle'} hidden={!page_state.state.urgent_total_order_cancelled}>&#x25cf;{page_state.state.urgent_total_order_cancelled}</span>
                                            </td>

                                        </tr>

                                        <tr>
                                            <td style={{backgroundColor: '#fff', paddingBottom: 0+'px'}}>
                                                <span className={'table-column-general-vision-count-name'} onClick={page_state.fetchDataOpecAssistFinished}>Concluídos </span>
                                                <span className={'numberCircle'}>{page_state.state.total_order_finished}</span>
                                            </td>

                                        </tr>

                                    </Table>
                                </td>
                            </tr>

                        </Table>
                    </Card>

                    <Card  className={"col-8 general-counts-table"} >
                        <CardBody >
                            <Row  >
                                <Col md="3" className={'filter-demandant-label'}>
                                    <Label>Nome do Cliente</Label>
                                </Col>
                                <Col md="3" className={'filter-demandant-label'}>
                                    <p >Nome do Agencia</p>
                                </Col>
                                <Col md="3" className={'filter-demandant-label'} >
                                    <Label>Contato de Atendimento</Label>
                                </Col>
                                <Col md="3" className={'filter-demandant-label'}>
                                    <p >Asisstente</p>
                                </Col>
                            </Row>

                            <Row >

                                <Col md="3">
                                    <ReactAutocomplete
                                        items={page_state.state.clientes}
                                        inputProps={{ class: 'form-control', disabled: (!page_state.state.openPageOpecAssistente)}}
                                        shouldItemRender={(item, cliente_nome) => item.nome_cliente.toLowerCase().indexOf(cliente_nome.toLowerCase()) > -1}
                                        getItemValue={item => item.nome_cliente}

                                        menuStyle={{borderRadius: '3px',
                                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            padding: '2px 0',
                                            fontSize: '90%',
                                            position: 'fixed',
                                            overflow: 'auto',
                                            maxHeight: '50%',
                                            zIndex: 999999}}

                                        renderItem={(item, highlighted) =>

                                            <div
                                                key={item.cpf_cnpj}
                                                style={{backgroundColor: highlighted ? '#00a3d9' : '#fff', zIndex: 999999}}
                                            >
                                                {item.nome_cliente + " - " + CnpjMask(item.cpf_cnpj)}
                                            </div>
                                        }

                                        value={page_state.state.cliente_nome}

                                        onChange={(event, value) => {
                                            page_state.setState({cliente_nome: value})
                                            clearTimeout(page_state.requestTimer)
                                            page_state.requestTimer = GetClientes(value, (items) => {
                                                page_state.setState({clientes: items})
                                            })
                                        }}

                                        onSelect={(value, item) => {
                                            page_state.setState({
                                                cliente_nome: value,
                                            });
                                        }}



                                    />
                                </Col>

                                <Col md="3">
                                    <ReactAutocomplete name="agencia" items={page_state.state.agencias} id="agencia"

                                                       inputProps={{ class: page_state.state.errors["agencia_nome"] ? "field-danger" : 'form-control', disabled: (page_state.state.disabled || !page_state.state.openPageOpecAssistente) ? 'disabled' : '' }}
                                                       shouldItemRender={(item, agencia_nome) => item.nome_instituicao.toLowerCase().indexOf(agencia_nome.toLowerCase()) > -1}
                                                       getItemValue={item => item.nome_instituicao}
                                                       menuStyle={{borderRadius: '3px',
                                                           boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                                           background: 'rgba(255, 255, 255, 0.9)',
                                                           padding: '2px 0',
                                                           fontSize: '90%',
                                                           position: 'fixed',
                                                           overflow: 'auto',
                                                           maxHeight: '50%',
                                                           zIndex: 999999}}

                                                       renderItem={(item, highlighted) =>
                                                           <div
                                                               key={item.cpf_cnpj}
                                                               style={{backgroundColor: highlighted ? '#00a3d9' : '#fff'}}>
                                                               {item.nome_instituicao + " - " + CnpjMask(item.cpf_cnpj)}
                                                           </div>
                                                       }

                                                       value={page_state.state.agencia_nome}

                                                       onChange={(event, value) => {
                                                           page_state.setState({agencia_nome: value})
                                                           clearTimeout(page_state.requestTimer)
                                                           page_state.requestTimer = GetAgencia(value, (items) => {
                                                               page_state.setState({agencias: items})
                                                           })
                                                       }}
                                                       onSelect={(value, item) => {

                                                           page_state.setState({
                                                               agencia_nome: value,
                                                           });
                                                       }}/>
                                </Col>
                                <Col md="3">
                                    <Input type="text" id="txt_contatoatendimento" name="txt_contatoatendimento"
                                           value={page_state.state.txt_contatoatendimento.toUpperCase()}
                                           onChange={page_state.handleInputChange} disabled={!page_state.state.openPageOpecAssistente}
                                           placeholder="Digite o Contato de Atendimento"
                                    />
                                </Col>
                                <Col xs="12" md="3">
                                    <Input type="text" id="txt_assistente" name="txt_assistente"
                                           value={page_state.state.txt_assistente.toUpperCase()}
                                           onChange={page_state.handleInputChange} disabled={!page_state.state.openPageOpecAssistente}
                                           placeholder="Digite o Assistente"
                                    />
                                </Col>
                            </Row>

                            <Row >
                                <Col md="3" className={'filter-demandant-label'}>
                                    <Label>Ponto de Venda</Label>
                                </Col>
                                <Col md="3" className={'filter-demandant-label'}>
                                    <p >Origem</p>
                                </Col>
                                <Col md="3" className={'filter-demandant-label'} >
                                    <Label>Tipo</Label>
                                </Col>
                                <Col md="3" className={'filter-demandant-label'} >
                                    <Label>Nº Solicitação</Label>
                                </Col>

                            </Row>

                            <Row >
                                <Col xs="12" md="3">
                                    <Input type="select" name="txt_ponto_venda"
                                           value={page_state.state.txt_ponto_venda}
                                           onChange={page_state.handleInputChange} disabled={!page_state.state.openPageOpecAssistente}
                                           className={"form-control-sm form-control-big"}>
                                        <option selected={page_state.state.txt_ponto_venda === ""} value="">--Selecione--</option>
                                        {page_state.state.lista_ponto_venda.map((e, key) => {
                                            return <option key={key} value={e.value}>{e.name}</option>;
                                        })}
                                    </Input>
                                </Col>

                                <Col xs="12" md="3">
                                    <Input type="select" name="origem_demanda"
                                           value={page_state.state.origem_demanda}
                                           onChange={page_state.handleInputChange} disabled={!page_state.state.openPageOpecAssistente}
                                           className={"form-control-sm form-control-big"}>

                                        <option value="">--Selecione--</option>
                                        <option value="MANUAL">MANUAL</option>
                                        <option value="AUTOMATICA">AUTOMÁTICA</option>

                                    </Input>
                                </Col>

                                <Col xs="12" md="3">
                                    <Input type="select" name="tipo_demanda"
                                           value={page_state.state.tipo_demanda} disabled={!page_state.state.openPageOpecAssistente}
                                           onChange={page_state.handleInputChange.bind(page_state)}
                                           className={"form-control-sm form-control-big"}>

                                        <option value="">--Selecione--</option>
                                        <option value="NOVA COMPRA">NOVA COMPRA</option>
                                        <option value="TROCA DE TÍTULO">TROCA DE TÍTULO</option>

                                    </Input>
                                </Col>

                                <Col md="3">
                                    <Input type="text" id="numero_solicitacao" name="numero_solicitacao"
                                           value={NumeroSolicitacaoMask(page_state.state.numero_solicitacao)}
                                           maxLength={12}
                                           onChange={page_state.handleInputChange} disabled={!page_state.state.openPageOpecAssistente}
                                           placeholder="Digite o Nº da Solicitação"
                                    />
                                </Col>

                            </Row>

                            <Row className={'spacing-inline-popup'} >

                                <Col className={'filter-demandant-label'} xs="12" md="2"> Período: </Col>

                                <Col xs="12" md="2">
                                    <DatePicker
                                        selected={page_state.state.dataInicio}
                                        onChange={page_state.handleInputChangeStartDate}
                                        showDisabledMonthNavigation
                                        placeholderText="Informe a Data"
                                        dateFormat="DD/MM/YYYY"
                                        minDate={moment().subtract(60, "days")}
                                        maxDate={moment().add(60, "days")}
                                        className={'form-control'}

                                    />
                                </Col>


                                <Col xs="12" md="2">
                                    <DatePicker
                                        selected={page_state.state.dataFim}
                                        onChange={page_state.handleInputChangeEndDate}
                                        showDisabledMonthNavigation
                                        placeholderText="Informe a Data"
                                        dateFormat="DD/MM/YYYY"
                                        minDate={moment().subtract(60, "days")}
                                        maxDate={moment().add(60, "days")}
                                        className={'form-control'}

                                    />

                                </Col>

                                <Col xs="12" md="2" style={{marginLeft: 1.3 + '%'}} className={'filter-demandant-label'}>
                                    <Input type="checkbox" id="checkbox8" name="cb_clientedireto" disabled={!page_state.state.openPageOpecAssistente}
                                           onChange={page_state.handleClik.bind(page_state)}/> Cliente Direto
                                </Col>

                                <Col >

                                    <Button style={{width: 200 + 'px', float: 'right'}} block color="primary"
                                            className="blue-button-normal" onClick={page_state.pesquisarDados}>PESQUISAR</Button>
                                </Col>
                            </Row>



                        </CardBody>
                    </Card>

                    <Card className={"general-count-style-left"} >
                        <Table>
                            <tr>
                                <td style={{height: 90 + 'px', borderTop: 0, paddingTop: 20 +'px'}}>
                                    <span className={'number-general-count-style'}> {page_state.state.total_em_analise} </span>
                                    <span className={'table-column-general-vision-count-name-big'} style={{fontSize: 14}} onClick={page_state.openVisionEmAtendimento}
                                          style={{cursor: 'pointer', fontSize: 14, backgroundColor: page_state.state.openPageEmAtendimento ? 'rgb(188, 229, 243)' : '#fff'}}>Em atendimento </span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{height: 90 + 'px', paddingTop: 20 +'px'}}>
                                    <span className={'number-general-count-style'}> {page_state.state.total_atendidas} </span>
                                    <span className={'table-column-general-vision-count-name-big'}  onClick={page_state.openVisionAtendidos}
                                          style={{cursor: 'pointer', fontSize: 14, backgroundColor: page_state.state.openPageAtendidos ? 'rgb(188, 229, 243)' : '#fff'}}>Atendidos </span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{height: 90 + 'px', paddingTop: 20 +'px'}}>
                                    <span className={'number-general-count-style'}> {page_state.state.total_nao_atendidas} </span>
                                    <span className={'table-column-general-vision-count-name-big'} onClick={page_state.openVisionNaoAtendidos}
                                          style={{cursor: 'pointer', fontSize: 14, backgroundColor: page_state.state.openPageNaoAtendidos ? 'rgb(188, 229, 243)' : '#fff'}}>Não Atendidos </span>
                                </td>
                            </tr>


                        </Table>
                    </Card>
                </FormGroup>



                <Card className={"row"} >
                    <h3 className={"legenda-h3"}></h3>

                    <CardBody className={'table-activities-style'}>
                        <div hidden={!page_state.state.openPageOpecAssistente}>

                            <FormGroup >
                                <Col >

                                    <ReactTable
                                        columns={[
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"URGÊNCIA"}
                                                    </span>
                                                ),
                                                accessor: "alerta",
                                                width: 130,
                                                Cell: row => (
                                                    <div
                                                        className={calculaPrioridadePorClass(row.value.tempo_restante, row.value.hora_programa, row.value.dias_restante, row.row._original) === 'urgent' ?  'urgent-item-activities' :
                                                            calculaPrioridadePorClass(row.value.tempo_restante, row.value.hora_programa, row.value.dias_restante, row.row._original) === 'normal' ?  'normal-item-activities':
                                                                calculaPrioridadePorClass(row.value.tempo_restante, row.value.hora_programa, row.value.dias_restante, row.row._original) === 'attention' ?  'attention-item-activities' : '' }
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center'                                                            }}
                                                    >
                                                        <span>
                                                            {calculaHora(row.value.tempo_restante, row.value.hora_programa, row.value.dias_restante, row.row._original)}
                                                        </span>
                                                    </div>
                                                )

                                            },
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"HORA DA CHEGADA"}
                                                    </span>
                                                ),
                                                accessor: "dt_criacao",
                                                width: 130,
                                                Cell: row => (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center'                                                            }}
                                                    >
                                                        <span>
                                                            {filtraHoraDeData(row.value)}
                                                        </span>
                                                    </div>
                                                )

                                            },
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"NÚMERO SOLICITAÇÃO"}
                                                    </span>
                                                ),
                                                accessor: "compra_numero",
                                                width: 150,
                                                Cell: row => (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center'                                                            }}
                                                    >
                                                        {row.value}
                                                    </div>
                                                )

                                            },
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"TIPO"}
                                                    </span>
                                                ),
                                                accessor: "tipo",
                                                width: 130,
                                                Cell: row => (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center'                                                            }}
                                                    >
                                                        {row.value}
                                                    </div>
                                                )

                                            },
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"CLIENTE"}
                                                    </span>
                                                ),
                                                accessor: "nome_cliente",
                                                Cell: row => (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center'                                                            }}
                                                    >
                                                        {row.value}
                                                    </div>
                                                )

                                            },
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"AGÊNCIA"}
                                                    </span>
                                                ),
                                                accessor: "nome_agencia",
                                                Cell: row => (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center'                                                            }}
                                                    >
                                                        {row.value}
                                                    </div>
                                                )

                                            },
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"CONTATO DE ATENDIMENTO"}
                                                    </span>
                                                ),
                                                accessor: "contato_atendimento",
                                                Cell: row => (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center'                                                            }}
                                                    >
                                                        {row.value}
                                                    </div>
                                                )

                                            },
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"ASSISTENTE"}
                                                    </span>
                                                ),
                                                accessor: "assistente",
                                                Cell: row => (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center'                                                            }}
                                                    >
                                                        {row.value}
                                                    </div>
                                                )

                                            },
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"STATUS"}
                                                    </span>
                                                ),
                                                accessor: "status",
                                                Cell: row => (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center'                                                            }}
                                                    >
                                                        {row.value}
                                                    </div>
                                                )

                                            },
                                            {
                                                Header:  () => (
                                                    <span style={{fontWeight: 'bold'}}>
                                                       {"AÇÕES"}
                                                    </span>
                                                ),
                                                accessor: "compra_id",
                                                width: 100,

                                                Cell: row => (
                                                    <div
                                                        hidden={!opecAssistentAccess}

                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '2px',
                                                            textAlign:'center',

                                                        }}
                                                    >
                                                        <a hidden={row.row._original.status === 'CONCLUÍDO'}  href={ row.row._original.tipo ==='Nova Compra' ? "#EditCompra?id_compra=" + row.value : "#EditarTroca?id_compra=" + row.value }> <img style={{cursor: 'pointer'}} src={ require('../../../../src/assets/edit-icon.png') } title={"Editar"}/></a>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <a href={"#managedemand?id_compra=" + row.value + "&tipo=" + row.row._original.tipo}> <img style={{cursor: 'pointer'}} src={ require(row.row._original.has_rp ? '../../../../src/assets/dollar-green.png' : '../../../../src/assets/dollar-red.png') } title={"RP de Serviço"}/></a>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <img onClick={() => page_state.handleOpenModalHistory(row.row._original)} style={{cursor: 'pointer'}} src={ require('../../../../src/assets/historic-icon.png') } title={"Histórico"}/>

                                                    </div>
                                                )

                                            }
                                        ]}

                                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                                        data={data}
                                        pages={pages} // Display the total number of pages
                                        loading={loading} // Display the loading overlay when we need it
                                        onFetchData={page_state.fetchDataOPECAssistente} // Request new data when things change
                                        filterable
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                        alwaysShowAllBtns
                                        collapseOnSortingChange
                                        collapseOnPageChange
                                        collapseOnDataChange
                                        nextText={"Próxima"}
                                        previousText={"Anterior"}
                                        noDataText={"Sem registros"}
                                        pageText={"Página"}
                                        ofText={"de"}
                                        rowsText={"linhas"}
                                        loadingText={"Carregando..."}

                                    />


                                </Col>







                            </FormGroup>

                        </div>

                        <div hidden={!page_state.state.openPageAtendidos}>

                            <Col >

                                <ReactTable
                                    columns={[


                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"DATA"}
                                                    </span>
                                            ),
                                            accessor: "data_exibicao",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value.substring(8,10)+"/"+row.value.substring(5,7)+"/"+row.value.substring(0,4)}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"PROGRAMA"}
                                                    </span>
                                            ),
                                            accessor: "programa",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"EXIBIDORA"}
                                                    </span>
                                            ),
                                            accessor: "exibidora",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"TIPO"}
                                                    </span>
                                            ),
                                            accessor: "tipo",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"CLIENTE"}
                                                    </span>
                                            ),
                                            accessor: "nome_cliente",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"CM"}
                                                    </span>
                                            ),
                                            accessor: "cm",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"TÍTULO"}
                                                    </span>
                                            ),
                                            accessor: "titulo_material",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"DUR."}
                                                    </span>
                                            ),
                                            accessor: "duracao",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"GRUPO DE CHOQUE"}
                                                    </span>
                                            ),
                                            accessor: "grupo_choque",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"STATUS"}
                                                    </span>
                                            ),
                                            accessor: "status",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"AÇÕES"}
                                                    </span>
                                            ),
                                            accessor: "",
                                            Cell: row => (
                                                <div

                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'}}
                                                >
                                                    {/*pointerEvents: opecExhibitionAccess ? '' : ''*/}




                                                    <div >

                                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <img  onClick={() => page_state.handleOpenModalHistoryItem(row.row._original)} style={{cursor: 'pointer'}} src={ require('../../../../src/assets/historic-icon.png') } />
                                                    </div>
                                                </div>
                                            )

                                        }
                                    ]}

                                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                                    data={dataAtendidos}
                                    pages={pages} // Display the total number of pages
                                    loading={loading} // Display the loading overlay when we need it
                                    onFetchData={page_state.fetchDataAtendidos} // Request new data when things change
                                    filterable
                                    defaultPageSize={10}
                                    className="-striped -highlight"
                                    alwaysShowAllBtns
                                    collapseOnSortingChange
                                    collapseOnPageChange
                                    collapseOnDataChange
                                    //getTdProps={onRowClick}
                                    nextText={"Próxima"}
                                    previousText={"Anterior"}
                                    noDataText={"Sem registros"}
                                    pageText={"Página"}
                                    ofText={"de"}
                                    rowsText={"linhas"}
                                    loadingText={"Carregando..."}
                                />
                            </Col>
                        </div>

                        <div hidden={!page_state.state.openPageNaoAtendidos}>

                            <Col >

                                <ReactTable
                                    columns={[


                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"DATA"}
                                                    </span>
                                            ),
                                            accessor: "data_exibicao",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value.substring(8,10)+"/"+row.value.substring(5,7)+"/"+row.value.substring(0,4)}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"PROGRAMA"}
                                                    </span>
                                            ),
                                            accessor: "programa",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"EXIBIDORA"}
                                                    </span>
                                            ),
                                            accessor: "exibidora",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"TIPO"}
                                                    </span>
                                            ),
                                            accessor: "tipo",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"CLIENTE"}
                                                    </span>
                                            ),
                                            accessor: "nome_cliente",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"CM"}
                                                    </span>
                                            ),
                                            accessor: "cm",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"TÍTULO"}
                                                    </span>
                                            ),
                                            accessor: "titulo_material",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"DUR."}
                                                    </span>
                                            ),
                                            accessor: "duracao",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"GRUPO DE CHOQUE"}
                                                    </span>
                                            ),
                                            accessor: "grupo_choque",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"STATUS"}
                                                    </span>
                                            ),
                                            accessor: "status",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"AÇÕES"}
                                                    </span>
                                            ),
                                            accessor: "",
                                            Cell: row => (
                                                <div

                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'}}
                                                >
                                                    {/*pointerEvents: opecExhibitionAccess ? '' : ''*/}




                                                    <div >

                                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <img  onClick={() => page_state.handleOpenModalHistoryItem(row.row._original)} style={{cursor: 'pointer'}} src={ require('../../../../src/assets/historic-icon.png') } />
                                                    </div>
                                                </div>
                                            )

                                        }
                                    ]}

                                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                                    data={dataNaoAtendidos}
                                    pages={pages} // Display the total number of pages
                                    loading={loading} // Display the loading overlay when we need it
                                    onFetchData={page_state.fetchDataNaoAtendidos} // Request new data when things change
                                    filterable
                                    defaultPageSize={10}
                                    className="-striped -highlight"
                                    alwaysShowAllBtns
                                    collapseOnSortingChange
                                    collapseOnPageChange
                                    collapseOnDataChange
                                    //getTdProps={onRowClick}
                                    nextText={"Próxima"}
                                    previousText={"Anterior"}
                                    noDataText={"Sem registros"}
                                    pageText={"Página"}
                                    ofText={"de"}
                                    rowsText={"linhas"}
                                    loadingText={"Carregando..."}
                                />
                        </Col>
                    </div>

                        <div hidden={!page_state.state.openPageEmAtendimento}>

                            <Col >

                                <ReactTable
                                    columns={[


                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"DATA"}
                                                    </span>
                                            ),
                                            accessor: "data_exibicao",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value.substring(8,10)+"/"+row.value.substring(5,7)+"/"+row.value.substring(0,4)}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"PROGRAMA"}
                                                    </span>
                                            ),
                                            accessor: "programa",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"EXIBIDORA"}
                                                    </span>
                                            ),
                                            accessor: "exibidora",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"TIPO"}
                                                    </span>
                                            ),
                                            accessor: "tipo",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"CLIENTE"}
                                                    </span>
                                            ),
                                            accessor: "nome_cliente",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"CM"}
                                                    </span>
                                            ),
                                            accessor: "cm",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"TÍTULO"}
                                                    </span>
                                            ),
                                            accessor: "titulo_material",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"DUR."}
                                                    </span>
                                            ),
                                            accessor: "duracao",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"GRUPO DE CHOQUE"}
                                                    </span>
                                            ),
                                            accessor: "grupo_choque",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"STATUS"}
                                                    </span>
                                            ),
                                            accessor: "status",
                                            Cell: row => (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'                                                            }}
                                                >
                                                    {row.value}
                                                </div>
                                            )

                                        },
                                        {
                                            Header:  () => (
                                                <span style={{fontWeight: 'bold'}}>
                                                       {"AÇÕES"}
                                                    </span>
                                            ),
                                            accessor: "",
                                            Cell: row => (
                                                <div

                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '2px',
                                                        textAlign:'center'}}
                                                >

                                                    <div >
                                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <img  onClick={() => page_state.handleOpenModalHistoryItem(row.row._original)} style={{cursor: 'pointer'}} src={ require('../../../../src/assets/historic-icon.png') } />
                                                    </div>
                                                </div>
                                            )

                                        }
                                    ]}

                                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                                    data={dataEmAtendimento}
                                    pages={pages} // Display the total number of pages
                                    loading={loading} // Display the loading overlay when we need it
                                    onFetchData={page_state.fetchDataEmAtendimento} // Request new data when things change
                                    filterable
                                    defaultPageSize={10}
                                    className="-striped -highlight"
                                    alwaysShowAllBtns
                                    collapseOnSortingChange
                                    collapseOnPageChange
                                    collapseOnDataChange
                                    //getTdProps={onRowClick}
                                    nextText={"Próxima"}
                                    previousText={"Anterior"}
                                    noDataText={"Sem registros"}
                                    pageText={"Página"}
                                    ofText={"de"}
                                    rowsText={"linhas"}
                                    loadingText={"Carregando..."}
                                />
                            </Col>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>

        <Popup
            open={page_state.state.openModalHistoryItem} closeOnEscape={true}
            closeOnDocumentClick contentStyle={{width: '60%', borderRadius: '10px'}}
            onClose={page_state.closeModalHistoryItemAction}
        >

            <a className="close close-button-popup-opec-exibicao" onClick={page_state.closeModalHistoryItemAction}>
                &times;
            </a>

            <div class="title-popup-opec-exibicao">
                <img src={ require('../../../../src/assets/historic-icon.png') } /> Histórico &nbsp;&nbsp;{page_state.state.tipo_action} / {page_state.state.cliente_action} / {page_state.state.agencia_action}
            </div>

            <div className="popup-historic font-popup">
                <Card className={"borderless"} >
                    <CardBody >
                        <Table responsive striped>
                            <thead>
                            <tr >

                                <th style={{width: 10 + '%'}} className={"text-center"}>DATA/HORA</th>
                                <th style={{width: 10 + '%'}} className={"text-center"} title={"Programa"}>PROG.</th>
                                <th style={{width: 10 + '%'}} className={"text-center"} title={"Exibidora"}>EXIB.</th>
                                <th style={{width: 10 + '%'}} className={"text-center"}>LEGENDA</th>
                                <th style={{width: 10 + '%'}} className={"text-center"}>CM</th>
                                <th style={{width: 10 + '%'}} className={"text-center"}>TÍTULO</th>
                                <th style={{width: 10 + '%'}} className={"text-center"} title={"Duração"}>DUR.</th>
                                <th style={{width: 10 + '%'}} className={"text-center"}>NA EXIBIDORA</th>
                                <th style={{width: 10 + '%'}} className={"text-center"}>USUÁRIO</th>
                                <th style={{width: 10 + '%'}} className={"text-center"}>STATUS</th>

                            </tr>
                            </thead>
                            <tbody >
                            {
                                page_state.state.historyList.map(
                                    (history, idx) => (

                                        <tr>


                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.timestamp}</td>
                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.programa}</td>
                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.exibidora}</td>
                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.legenda}</td>
                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.cm}</td>
                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.titulo_material}</td>
                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.duracao}</td>
                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.na_exibidora}</td>
                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.usuario_login}</td>
                                            <td style={{width: 10 + '%'}} className={"text-center"}>{history.status}</td>

                                        </tr>
                                    )
                                )
                            }

                            </tbody>
                        </Table>

                    </CardBody>
                </Card>
            </div>

        </Popup>

    </div>
}