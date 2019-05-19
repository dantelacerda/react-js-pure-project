import React from 'react';

import {
    Button,
    Card,
    CardBody,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
} from 'reactstrap';

import ReactAutocomplete from 'react-autocomplete'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import moment from 'moment';

import {GetClientes, GetClientesCnpj} from "../../../service/ClientService";
import {CnpjMask} from "../../../utils/cnpj";
import {GetAgencia} from "../../../service/AgencyService";
import {GetProgram} from "../../../service/ProgramService";
import {GetExibidora} from "../../../service/ExibidoraService";
import {AllowedLetters} from "../../../utils/autocompletePermissions";
import { ClipLoader } from 'react-spinners';
import Modal from "react-animated-modal";


export var VendasTemplate = (page_state) => {

    return  <div className="animated fadeIn">

        <div id="divAlertMessage">
            <Modal
                visible={page_state.state.showModal}
                closemodal={() => page_state.setState({ showModal: false })}
                type="bounceIn"
            >
                <div className="error-message-modal"> {page_state.state.errorMessage} </div>
            </Modal>

        </div>


        <Row>
            <h1 className={"page-title"}>Nova Compra</h1>
            <Col xs="12" md="12">

                {/*<Button style={{width: 200 + 'px'}} block color="primary"*/}
                        {/*className="blue-button-normal" onClick={page_state.testeEmail}>TESTAR EMAIL</Button>*/}
                {/*<Button style={{width: 200 + 'px'}} block color="primary"*/}
                        {/*className="blue-button-normal" onClick={page_state.testeInsercao}>TESTAR INSERÇÃO</Button>*/}
                <Card>

                    <CardBody>
                        <FormGroup row>
                            <Col md="3" className={page_state.state.errors["cliente_nome"] ? "label-danger" : ''}>
                                <Label>Nome do Cliente</Label>
                            </Col>
                            <Col xs="12" md="3">
                                <p className={page_state.state.errors["cliente_cnpj"] ? "label-danger" : ''}>CNPJ do Cliente</p>
                            </Col>
                            <Col md="3" className={page_state.state.errors["agencia_nome"] ? "label-danger" : ''}>
                                <Label>Nome do Agencia</Label>
                            </Col>
                            <Col xs="12" md="3">
                                <p className={page_state.state.errors["agencia_cnpj"] ? "label-danger" : ''}>CNPJ da Agência</p>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <ReactAutocomplete
                                    items={page_state.state.clientes}
                                    inputProps={{ class: page_state.state.errors["cliente_nome"] ? "field-danger" : 'form-control', name: 'cliente_nome' }}

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
                                            // key={item.cpf_cnpj}
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
                                            cliente_cnpj: item.cpf_cnpj,
                                        });

                                    }}


                                />
                            </Col>

                            <Col xs="12" md="3">
                                <ReactAutocomplete
                                    items={page_state.state.clientes}
                                    inputProps={{ class: page_state.state.errors["cliente_cnpj"] ? "field-danger" : 'form-control', name: 'cliente_cnpj'   }}
                                    // shouldItemRender={(item, cliente_cnpj) => item.cpf_cnpj.toLowerCase().indexOf(cliente_cnpj.toLowerCase()) > -1}

                                    getItemValue={item => item.cpf_cnpj}

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
                                            style={{backgroundColor: highlighted ? '#00a3d9' : '#fff'}}
                                        >
                                            {item.nome_cliente + " - " + CnpjMask(item.cpf_cnpj)}
                                        </div>
                                    }

                                    // value={CnpjMask(page_state.state.cliente_cnpj)}
                                    value={CnpjMask(page_state.state.cliente_cnpj)}

                                    onChange={(event, value) => {
                                        page_state.setState({cliente_cnpj: value})
                                        clearTimeout(page_state.requestTimer)
                                        page_state.requestTimer = GetClientesCnpj(value, (items) => {
                                            page_state.setState({clientes: items})
                                        })
                                    }}

                                    onSelect={(value, item) => {

                                        page_state.setState({
                                            cliente_nome: item.nome_cliente,
                                            cliente_cnpj: item.cpf_cnpj,
                                        });

                                    }}


                                />
                            </Col>

                            <Col md="3">
                                <ReactAutocomplete name="teste" items={page_state.state.agencias} id="agencia"

                                                   inputProps={{ class: page_state.state.errors["agencia_nome"] ? "field-danger" : 'form-control', disabled: (page_state.state.disabled) ? 'disabled' : '', name: 'agencia_nome'  }}

                                                   // shouldItemRender={(item, agencia_nome) => item.nome_instituicao.toLowerCase().indexOf(agencia_nome.toLowerCase()) > -1}

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
                                                           agencia_cnpj: item.cpf_cnpj,
                                                       });

                                                   }}/>
                            </Col>

                            <Col md="2" >
                                <Input type="text" id="text-input" name="cnpj_agencia" className={page_state.state.errors["agencia_cnpj"] ? "field-danger" : 'form-control'}
                                       disabled={page_state.state.disabled}
                                       value={CnpjMask(page_state.state.agencia_cnpj)}/>
                            </Col>


                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <span  style={{color: "red"}}>{page_state.state.errors["cliente_nome"]}</span>

                            </Col>

                            <Col xs="12" md="3">
                                <span style={{color: "red"}}>{page_state.state.errors["cliente_cnpj"]}</span>
                            </Col>
                            <Col md="3">
                                <span style={{color: "red"}}>{page_state.state.errors["agencia_nome"]}</span>
                            </Col>
                            <Col xs="12" md="3">
                                <span style={{color: "red"}}>{page_state.state.errors["agencia_cnpj"]}</span>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label>Contato de Atendimento</Label>
                            </Col>
                            <Col xs="12" md="3">
                                <p className={page_state.state.errors["txt_assistente"] ? "label-danger" : ''}>Assistente</p>
                            </Col>

                            <Col xs="12" md="3">
                                <p className={page_state.state.errors["txt_ponto_venda"] ? "label-danger" : ''}>Ponto de Venda</p>
                            </Col>


                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Input type="text" id="txt_contatoatendimento" name="txt_contatoatendimento"
                                       value={page_state.state.txt_contatoatendimento.toUpperCase()}
                                       onChange={page_state.handleInputChange}
                                       onKeyPress="this.value=this.value.toUpperCase()"
                                       placeholder="Digite o Contato de Atendimento"
                                />
                            </Col>
                            <Col xs="12" md="3">
                                <Input type="text" id="txt_assistente" name="txt_assistente"
                                       value={page_state.state.txt_assistente.toUpperCase()}
                                       onChange={page_state.handleInputChange}
                                       placeholder="Digite o Assistente"
                                />
                            </Col>

                            <Col xs="12" md="3">
                                <Input type="select" name="txt_ponto_venda"
                                       value={page_state.state.txt_ponto_venda}
                                       onChange={page_state.handleChange.bind(page_state, "txt_ponto_venda")}
                                       className={page_state.state.errors["txt_ponto_venda"] ? "field-danger form-control-sm form-control-big" : "form-control-sm form-control-big"}>
                                    <option selected={page_state.state.txt_ponto_venda === ""} value="">--Selecione--</option>
                                    {page_state.state.lista_ponto_venda.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.name}</option>;
                                    })}
                                </Input>
                            </Col>

                            <Col xs="12" md="2" style={{marginLeft: 1.3 + '%'}}>
                                <Input type="checkbox" id="checkbox8" name="cb_clientedireto"
                                       onChange={page_state.handleClik.bind(page_state)}/> Cliente Direto
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <span  style={{color: "red"}}>{page_state.state.errors["contato_atendimento"]}</span>

                            </Col>

                            <Col xs="12" md="3">
                                <span style={{color: "red"}}>{page_state.state.errors["assistente"]}</span>
                            </Col>
                            <Col md="3">
                                <span style={{color: "red"}}>{page_state.state.errors["txt_ponto_venda"]}</span>
                            </Col>
                            <Col xs="12" md="3">
                                <span style={{color: "red"}}>{page_state.state.errors["cliente_direto"]}</span>
                            </Col>
                        </FormGroup>


                    </CardBody>

                </Card>
                <Card>
                    <h3 className={"legenda-h3"}>Legendar Material</h3>
                    <CardBody>

                        <FormGroup row>
                            <Col xs="12" md="15">

                                <Table responsive>
                                    <thead>
                                    <tr>

                                        <th style={{width: 14 + '%'}} className={page_state.state.errors["txt_cm"] ? "label-danger borderless" : 'borderless'}>CM</th>

                                        <th style={{width: 18 + '%'}}
                                            className={page_state.state.errors["txt_cm"] ? "label-danger borderless" : 'borderless'}>Título
                                        </th>

                                        <th style={{width: 14 + '%'}} className={page_state.state.errors["txt_duracao"] ? "label-danger borderless" : 'borderless'}
                                            >Duração
                                        </th>
                                        <th style={{width: 14 + '%'}}
                                            className={page_state.state.errors["lst_matnaglobo"] ? "label-danger borderless" : 'borderless'}>Mat. na Globo?
                                        </th>
                                        <th style={{width: 14 + '%'}} className={page_state.state.errors["txt_grupodechoque"] ? "label-danger borderless" : 'borderless'}>Grupo de Choque
                                        </th>
                                        <th style={{width: 15 + '%'}} className={page_state.state.errors["lst_player"] ? "label-danger borderless" : 'borderless'}>Player
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>

                                        <td className={"borderless"}><Input
                                            onChange={page_state.handleChange.bind(page_state, "txt_cm")}
                                            value={page_state.state.txt_cm}
                                            className={page_state.state.errors["txt_cm"] ? "field-danger form-control-sm form-control-big" : "form-control-sm form-control-big"}
                                            type="text"
                                            name="txt_cm"
                                            placeholder="Digite um CM"
                                            maxLength="6"
                                        />
                                            <span style={{color: "red"}}>{page_state.state.errors["txt_cm"]}</span>
                                        </td>
                                        <td className={"borderless"}><Input
                                            onChange={page_state.handleChange.bind(page_state, "txt_titulo")}
                                            value={page_state.state.txt_titulo.toUpperCase()}
                                            className={page_state.state.errors["txt_titulo"] ? "field-danger form-control-sm form-control-big" : "form-control-sm form-control-big"}
                                            type="text"
                                            name="txt_titulo"
                                            placeholder="Digite um titulo"
                                            maxLength="30"
                                        />
                                            <span
                                                style={{color: "red"}}>{page_state.state.errors["txt_titulo"]}</span>
                                        </td>
                                        <td className={"text-center"} className={"borderless"}>
                                            <Input onChange={page_state.handleChange.bind(page_state, "txt_duracao")}
                                                   value={page_state.state.txt_duracao}
                                                   className={page_state.state.errors["txt_duracao"] ? "field-danger form-control-sm form-control-big" : "form-control-sm form-control-big"}
                                                   type="text"
                                                   name="txt_duracao"
                                                   placeholder="Digite a duração"
                                                   maxLength="3"
                                            />
                                            <span
                                                style={{color: "red"}}>{page_state.state.errors["txt_duracao"]}</span>
                                        </td>
                                        <td className={"borderless text-center  vertical-align-middle"}>

                                            <Input type="select" name="lst_matnaglobo"
                                                   value={page_state.state.lst_matnaglobo}
                                                   onChange={page_state.handleChange.bind(page_state, "lst_matnaglobo")}
                                                   className={page_state.state.errors["lst_matnaglobo"] ? "field-danger form-control-sm form-control-big" : "form-control-sm form-control-big"}>
                                                <option value=""></option>
                                                <option value="Sim">Sim</option>
                                                <option value="Não">Não</option>
                                            </Input>
                                            <span
                                                style={{color: "red"}}>{page_state.state.errors["lst_matnaglobo"]}</span>
                                        </td>
                                        <td className={"borderless"}><Input
                                            onChange={page_state.handleChange.bind(page_state, "txt_grupodechoque")}
                                            value={page_state.state.txt_grupodechoque.toUpperCase()}
                                            className={page_state.state.errors["txt_grupodechoque"] ? "field-danger form-control-sm form-control-big" : "form-control-sm form-control-big"}
                                            type="text"
                                            name="txt_grupodechoque"
                                            placeholder="Digite um Grupo de Choque"
                                            maxLength="30"
                                        />
                                            <span
                                                style={{color: "red"}}>{page_state.state.errors["txt_grupodechoque"]}</span>
                                        </td>
                                        <td className={"borderless"}>

                                            <Input type="select" name="lst_player" value={page_state.state.lst_player}
                                                   onChange={page_state.handleChange.bind(page_state, "lst_player")}
                                                   className={page_state.state.errors["lst_player"] ? "field-danger form-control-sm form-control-big" : "form-control-sm form-control-big"}
                                                   disabled={(page_state.state.disablednaglobo) ? true : false}>

                                                <option value=""></option>
                                                <option value="ADSTREAM">ADSTREAM</option>
                                                <option value="ADTOOX">ADTOOX</option>
                                                <option value="VATI">VATI</option>
                                                <option value="ZARPA">ZARPA</option>

                                            </Input>
                                            <span
                                                style={{color: "red"}}>{page_state.state.errors["lst_player"]}</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>


                            </Col>


                            <Card className={"borderless"} style={{width: '100%'}}>
                                <CardBody style={{width: 100 + '%'}} className={"float-right"}>
                                    <Row style={{float: 'right'}}>
                                        <Col xs="12" md="15">
                                            <Button onClick={page_state.incluiLegenda} style={{width: 200 + 'px'}}
                                                    block color="primary" name={'botaoadicionarlegendas'}
                                                    className="blue-button-normal">ADICIONAR</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>


                            <Col xs="12" md="12">


                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th style={{width: 5 + '%'}} className={"text-center"}></th>
                                        <th style={{width: 5 + '%'}}>LEGENDA</th>
                                        <th style={{width: 9 + '%'}}>CM</th>
                                        <th style={{width: 9 + '%'}}>TITULO</th>
                                        <th style={{width: 9 + '%'}}>DURAÇÂO</th>
                                        <th style={{width: 9 + '%'}}>MAT.NA GLOBO</th>
                                        <th style={{width: 6 + '%'}}>G.CHOQUE</th>
                                        <th style={{width: 13 + '%'}}>PLAYER</th>


                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        page_state.state.linhaslegenda.map(
                                            (linhaslegenda, idx) => (
                                                <tr>
                                                    <td className={"text-center"}><Input
                                                        className="form-check-input"
                                                        onChange={page_state.salvaIndiceCheckBoxMaterial.bind(page_state, idx  )}
                                                        type="checkbox" id="checkbox_select"
                                                        name="cb_select_legenda_{idx}"

                                                        id={page_state.props.id}/></td>
                                                    <td><p key={idx}>{linhaslegenda.legenda}</p></td>
                                                    <td><p key={idx}>{linhaslegenda.cm}</p></td>
                                                    <td><p key={idx}>{linhaslegenda.titulo_material}</p></td>
                                                    <td><p key={idx}>{linhaslegenda.duracao}</p></td>
                                                    <td><p key={idx}>{linhaslegenda.material_na_glob}</p></td>
                                                    <td><p key={idx}>{linhaslegenda.grupo_choque}</p></td>
                                                    <td><p key={idx}>{linhaslegenda.player}</p></td>
                                                </tr>
                                            )
                                        )

                                    }


                                    </tbody>
                                </Table>


                            </Col>


                        </FormGroup>


                    </CardBody>


                    <Card className={"borderless"} style={{width: '100%'}}>
                        <CardBody style={{width: 100 + '%'}} className={"float-right"}>
                            <Row style={{float: 'right'}}>
                                <Col>
                                    <Button onClick={page_state.deleteCaptions.bind(page_state)} style={{width: 200 + 'px'}}
                                            block color="dark" className="black-button-normal">EXCLUIR ITENS</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </Card>


                <Card>
                    <h3 className={"legenda-h3"}>Incluir e Aprovar Inserções</h3>
                    <CardBody>
                        <FormGroup row>
                            <Col md="3">
                                <span className={"error-message-popup"}>{page_state.state.errors["errors_insertions"]}</span>

                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" md="12">


                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th style={{width: 4 + '%'}} className={"text-center"}> </th>
                                        <th style={{width: 10 + '%'}} className={page_state.state.errors["txt_data"] ? "label-danger" : 'text-center'}>DATA</th>
                                        <th style={{width: 8 + '%'}} className={page_state.state.errors["programa"] ? "label-danger" : 'text-center'} title={"Programa"}>PROGR.</th>
                                        <th style={{width: 8 + '%'}} className={page_state.state.errors["exibidora"] ? "label-danger" : 'text-center'} title={"Exibidora"}>EXIB.</th>
                                        <th style={{width: 6 + '%'}} className={page_state.state.errors["disponibilidade"] ? "label-danger" : 'text-center'} title={"Disponibilidade"}>DISP.</th>
                                        <th style={{width: 9 + '%'}} className={page_state.state.errors["tituloinsercao"] ? "label-danger" : 'text-center'}>LEGENDA</th>
                                        <th style={{width: 9 + '%'}} className={"text-center"}>CM</th>
                                        <th style={{width: 13 + '%'}} className={"text-center"}>TÍTULO</th>
                                        <th style={{width: 6 + '%'}} className={"text-center"} title={"Duração"}>DUR.</th>
                                        <th style={{width: 13 + '%'}} className={"text-center"}>GRUPO DE CHOQUE</th>
                                        <th style={{width: 12 + '%'}} className={page_state.state.errors["lst_matexibidora"] ? "label-danger" : 'text-center'}>MAT NA EXIBIDORA?</th>
                                        <th style={{width: 12 + '%'}} className={"text-center"}></th>


                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className={"text-center"} style={{verticalAlign: "middle"}}>
                                            {/*<button className={"icon-note transparent-button"}></button>*/}
                                        </td>

                                        <td style={{verticalAlign: "middle", width:10 +'%'}}><DatePicker

                                            name={'dataPrograma'}
                                            className={"form-control"}
                                            selected={page_state.state.txt_data}
                                            onChange={page_state.handleInputChangeDate}
                                            minDate={moment()}
                                            maxDate={moment().add(5, "days")}
                                            showDisabledMonthNavigation
                                            placeholderText="Informe a Data"
                                            dateFormat="DD/MM/YYYY"
                                            fixedHeight

                                        /></td>
                                        <td>
                                            <ReactAutocomplete name="programasautocomplete" items={page_state.state.programas} id="programa"
                                                               inputProps={{ class: page_state.state.errors["programa"] ? "field-danger" : 'form-control', name: 'programa' }}

                                                               selectOnBlur
                                                               shouldItemRender={(item, programa) => item.sigla_programa.toLowerCase().indexOf(programa.toLowerCase()) > -1}
                                                               getItemValue={item => item.sigla_programa}
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
                                                                       key={item.sigla_programa}
                                                                       style={{backgroundColor: highlighted ? '#00a3d9' : '#fff'}}>
                                                                       {item.sigla_programa}
                                                                   </div>
                                                               }

                                                               value={AllowedLetters(page_state.state.programa.toUpperCase())}


                                                               onChange={(event, value) => {

                                                                   page_state.setState({programa: value})
                                                                   clearTimeout(page_state.requestTimer)
                                                                   page_state.requestTimer = GetProgram(value, (items) => {
                                                                       page_state.setState({programas: items})
                                                                   })
                                                               }}


                                                               onSelect={(value, item) => {

                                                                   page_state.setState({
                                                                       programa: value,
                                                                       dataParamPrograma: item
                                                                   });

                                                               }}/>
                                        </td>

                                        <td>

                                            <ReactAutocomplete name="exibidorasautocomplete" items={page_state.state.exibidoras} id="exibidora"

                                                               inputProps={{ class: page_state.state.errors["exibidora"] ? "field-danger" : 'form-control', name: 'exibidora'   }}
                                                               shouldItemRender={(item, exibidora) => item.me_merc.toLowerCase().indexOf(exibidora.toLowerCase()) > -1}
                                                               getItemValue={item => item.me_merc}
                                                               selectOnBlur
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
                                                                       key={item.me_merc}
                                                                       style={{backgroundColor: highlighted ? '#00a3d9' : '#fff'}}>
                                                                       {item.me_merc}
                                                                   </div>
                                                               }

                                                               value={AllowedLetters(page_state.state.exibidora.toUpperCase())}

                                                               onChange={(event, value) => {
                                                                   page_state.setState({exibidora: value})
                                                                   clearTimeout(page_state.requestTimer)
                                                                   page_state.requestTimer = GetExibidora(value, (items) => {
                                                                       page_state.setState({exibidoras: items})
                                                                   })
                                                               }}

                                                               onSelect={(value, item) => {
                                                                   page_state.setState({
                                                                       exibidora: value,
                                                                       cd_nivel_merc: item.cd_nivel_merc
                                                                   });

                                                               }}/>

                                        </td>

                                        <td>

                                            <Input type="select" name="disponibilidade"
                                                   value={page_state.state.disponibilidade}
                                                   onChange={page_state.handleChange.bind(page_state, "disponibilidade")}
                                                   className={page_state.state.errors["disponibilidade"] ? "field-danger" : "form-control"}>
                                                <option value=""></option>
                                                <option value="Sim">Sim</option>
                                                <option value="Não">Não</option>
                                            </Input>

                                        </td>
                                        <td><Input type="select" name="tituloinsercao" id="tituloinsercao"
                                                   onChange={page_state.handleInputSelectInsercaoChange}
                                                   className={page_state.state.errors["tituloinsercao"] ? "field-danger" : "form-control"}>
                                            <option selected={page_state.state.tituloinsercao === ""} value="">--Selecione--</option>
                                                     {page_state.state.titulo.map((e, key) => {
                                                return <option key={key} value={e.value}>{e.name}</option>;
                                            })}
                                        </Input>
                                        </td>
                                        <td><Input value={page_state.state.txt_cm2} className={"form-control"} disabled="true"
                                                   type="text" name="txt_cm2" onChange={page_state.handleInputChange.bind(page_state)}/></td>
                                        <td><Input value={page_state.state.txt_titulo2} className={"form-control"} disabled="true"
                                                   type="text" name="txt_titulo2" onChange={page_state.handleInputChange.bind(page_state)}/></td>
                                        <td><Input value={page_state.state.txt_duracao2} className={"form-control"} disabled="true"
                                                   type="text" name="txt_duracao2" onChange={page_state.handleInputChange.bind(page_state)}/></td>
                                        <td><Input value={page_state.state.txt_grupochoque2} className={"form-control"} disabled="true"
                                                   type="text" name="txt_grupochoque2" onChange={page_state.handleInputChange.bind(page_state)}/></td>
                                        <td>
                                            <Input type="select" name="lst_matexibidora" id="lst_matexibidora"
                                                   onChange={page_state.handleInputSelectChangeExibidora}
                                                   className={page_state.state.errors["lst_matexibidora"] ? "field-danger" : "form-control"}>
                                                <option value=""></option>
                                                <option value="Sim" selected={page_state.state.lst_matexibidora === "Sim"}>Sim</option>
                                                <option value="Não" selected={page_state.state.lst_matexibidora === "Não"}>Não</option>


                                            </Input></td>
                                        <td style={{verticalAlign: "middle"}}><Button title={"Adicionar"}
                                            onClick={page_state.incluiInsercao} type="submit" size="sm"
                                            color="primary" name={'botaoIncluirInsercao'}> + </Button></td>

                                    </tr>


                                    {
                                        page_state.state.linhas_insercoes.map(
                                            (linhas_insercoes, idx) => (
                                                <tr>
                                                    <td className={"text-center"} style={{width: 4 + '%'}}><Input
                                                        className="form-check-input"
                                                        onChange={page_state.salvaIndiceCheckBoxInsercao.bind(page_state, idx)}
                                                        ref={idx} type="checkbox" id="checkbox_select2"
                                                        name="cb_select_legenda2_{idx}"/></td>
                                                    <td style={{width: 5 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.data2}</p></td>
                                                    <td style={{width: 9 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.programa2}</p></td>
                                                    <td style={{width: 9 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.exibidora2}</p></td>
                                                    <td style={{width: 9 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.disponibilidade2}</p>
                                                    </td>
                                                    <td style={{width: 9 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.legenda2}</p></td>
                                                    <td style={{width: 6 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.cm2}</p></td>
                                                    <td style={{width: 13 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.titulo2}</p></td>
                                                    <td style={{width: 9 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.duracao2}</p></td>
                                                    <td style={{width: 12 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.grupodechoque2}</p></td>
                                                    <td style={{width: 12 + '%'}} className={"text-center"}><p key={idx}>{linhas_insercoes.materialexibidora2}</p>
                                                    </td>


                                                </tr>
                                            )
                                        )

                                    }


                                    </tbody>
                                </Table>


                            </Col>
                            <Card className={"borderless"} style={{width: '100%'}}>
                                <CardBody style={{width: 100 + '%'}} className={"float-right"}>
                                    <Row style={{float: 'right'}}>

                                        <Col>
                                            <Button onClick={page_state.deleteInsertions.bind(page_state)}
                                                    style={{width: 200 + 'px'}} block color="dark"
                                                    className="black-button-normal">EXCLUIR ITENS</Button>
                                        </Col>

                                        <Col>

                                            <Button style={{width: 200 + 'px'}} block color="dark" className="black-button-normal" onClick={page_state.backToManageDemand}>VOLTAR</Button>
                                        </Col>


                                        <Col>
                                            <Button style={{width: 200 + 'px'}} block color="primary" disabled={page_state.state.disableButtons}
                                                    className="blue-button-normal" onClick={page_state.insereTrocaEmAnalise} name={'botaoIncluirSolicitacaoAnalise'}>À ANALISAR</Button>

                                        </Col>

                                        <Col >

                                            <Button style={{width: 200 + 'px'}} block color="primary" disabled={page_state.state.disableButtons}
                                                    className="blue-button-normal" onClick={page_state.ApproveOrder} name={'botaoAprovarSolicitacao'}>APROVAR SOLICITAÇÃO</Button>
                                        </Col>

                                        <Col>
                                            <div className='sweet-loading'>
                                                <ClipLoader
                                                    className={'sweet-loading'}
                                                    sizeUnit={"px"}
                                                    size={30}
                                                    color={'#123abc'}
                                                    loading={page_state.state.disableButtons}
                                                />
                                            </div>
                                        </Col>
                                    </Row>


                                </CardBody>
                            </Card>
                        </FormGroup>

                    </CardBody>

                </Card>
            </Col>
        </Row>

    </div>

}



