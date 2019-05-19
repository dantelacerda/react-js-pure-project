import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarNav,
} from '@coreui/react';
import navigation from '../../_nav';
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import Cookies from "universal-cookie";
import soundFile from '../../assets/globoexpress-signal.mp3'

class DefaultLayout extends Component {

    constructor(props){
        super(props);
        this.state = {
            play: false,
            pause: true,
            cookies: new Cookies(),
        };

        this.url = "../assets/globo-vinheta.mp3";
        this.audio = new Audio(soundFile);
        this.togglePlay = this.togglePlay.bind(this);

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.notify = this.notify.bind(this);

    }

    notify() {
        var cookies =  new Cookies();
        var permissions = cookies.get('userPermissions')
        var nextState = this;
        var soundPermission = 660107;

        // Notifier.start("Teste", "Notifier Teste", "", "", "Teste2");
        //
        // if(permissions.includes(soundPermission)) {
        //     nextState.play();
        // }
    }

    play(){
        this.setState({
            play: true,
            pause: false
        });
        this.audio.play();
    }

    pause(){
        this.setState({ play: false, pause: true });
        this.audio.pause();
    }

    togglePlay() {
        this.setState({ play: !this.state.play });
        this.state.play ? this.audio.play() : this.audio.pause();
    }


    render() {
    return (

      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body aside-menu-hidden aside-menu-off-canvas a sidebar-minimized brand-minimized">
            <AppSidebar fixed display="lg" >
                <AppSidebarHeader />
                <AppSidebarForm />
                <AppSidebarNav  navConfig={navigation} {...this.props} />
                <AppSidebarFooter />

            </AppSidebar>
          <main className="main">

            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {

                   // if(sessionStorage.getItem('isauthenticated') === 'true'){
                       return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (

                               <route.component {...props} />

                           )} />)
                           : (null);
                   // }
                   },
                )}
                <Redirect from="/" to="/login" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>

      </div>
    );
  }
}

export default DefaultLayout;
