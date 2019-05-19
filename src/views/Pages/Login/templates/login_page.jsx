import {
    Button,
    Card,
    CardBody,
    Col,
    Input,
    Row,
    Container, CardGroup, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';

import React from 'react';
import {ClipLoader} from "react-spinners";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export var login_template = (page_state)=>{
    const {  } = page_state.state;


    return <div className="app flex-row align-items-center">
        <Container>
            <Row className="justify-content-center">
                <Col md="8">
                    <CardGroup>
                        <Card className="p-4">
                            <CardBody>
                                <h1>Login</h1>
                                <p className="text-muted">Acesse sua conta</p>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-user"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input onChange={page_state.handleInputChange} type="text" name="Login"/>
                                </InputGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-lock"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input onChange={page_state.handleInputChange} type="password" name="Senha"
                                           onKeyDown={page_state.keyPress}/>
                                </InputGroup>
                                <Row>
                                    <Col xs="4">
                                        <Button color="primary" className="px-4"
                                                onClick={page_state.handleLogin}
                                                disabled={page_state.state.disableButtons}>Login</Button>
                                    </Col>
                                    <Col xs="8" className="text-left">

                                        <div className='sweet-loading'>
                                            <ClipLoader
                                                className={'sweet-loading'}
                                                sizeUnit={"px"}
                                                size={30}
                                                color={'#123abc'}
                                                loading={page_state.state.disableButtons}
                                            />
                                        </div>
                                        {/*<Button color="link" className="px-0">Esqueceu sua senha?</Button>*/}

                                    </Col>
                                </Row>
                                <Row>
                                    <p style={{marginTop: 10, color: page_state.state.statusLoginColor, fontWeight: 500}}>{page_state.state.statusLogin}</p>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card className="text-white py-5 d-md-down-none"
                              style={{paddingLeft: 60 + 'px', background: '#00a3d9'}}>
                            <img src={require('../../../../assets/img/brand/react-logo.png')}
                                 style={{width: 250 + 'px', marginTop: 50 + 'px'}}/>


                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    </div>
}