import React, {Component} from 'react';

import {login_template} from "./templates/login_page";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Login: '',
            Senha: '',
            disableButtons: false,
            statusLogin:'',
            statusLoginColor: 'gray'

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.addStatusLogin = this.addStatusLogin.bind(this);
        this.enableButtonAndClearPage = this.enableButtonAndClearPage.bind(this);
    }

    enableButtonAndClearPage() {
        this.setState({
            disableButtons: false,
            statusLogin: '',
            statusLoginColor: 'gray'
        })
    }

    disableButton(disable) {
        if(disable) {
            this.setState({
                disableButtons: true
            })
        } else {
            this.setState({
                disableButtons: false
            })
        }
    }

    addStatusLogin(message, colorMessage) {

        this.setState({
            statusLogin: message,
            statusLoginColor: colorMessage
        })
    }

    keyPress(e){
        //If enter has been clicked
        if(e.keyCode == 13){
            this.handleLogin();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value

        });

    }

    handleLogin() {

        if (this.state.Login && this.state.Senha) {
            window.open('#gestaodemandante', '_parent');
        } else {
            this.addStatusLogin('Informe o Login e Senha', 'red')
        }

    }

    render() {


        return (
            login_template(this)

        );
    }
}

export default Login;
