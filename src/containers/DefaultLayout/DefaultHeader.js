import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/react-logo.png'
import logomini from '../../assets/img/brand/react-logo.png'
import {Logout} from "../../service/LoginService";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {


  render() {

    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
          <span className={''}>
                <AppNavbarBrand
                  full={{ src: logo, width: 30, height: 30, alt: 'Logo Full',  }}
                  minimized={{ src: logomini, width: 30, height: 30, alt: 'Logo Mini' }}
                />
          </span>
          <span className={"page-title page-title-globo-express"}> React Puro </span>
        <Nav className="ml-auto" navbar>


          <AppHeaderDropdown direction="down">
            <DropdownToggle nav className="nav-link-header" >

              <img src={ require('../../assets/settings-menu-icon.png')}
                   className="img-avatar" alt="admin@bootstrapmaster.com" style={{paddingTop: '11px'}}/>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem ><i className="fa fa-envelope"></i>Gerenciamento de E-mails</DropdownItem>
              </DropdownMenu>

          </AppHeaderDropdown>



            <AppHeaderDropdown direction="down">
                <DropdownToggle nav className="nav-link-header" >

                    <img src={ require('../../assets/logout-menu-icon.png')}
                         className="img-avatar" alt="admin@bootstrapmaster.com" style={{paddingTop: '11px'}}/>
                </DropdownToggle>
                <DropdownMenu right style={{ right: 'auto' }}>
                    <DropdownItem onClick={Logout}><i className="fa fa-lock"></i>Logout</DropdownItem>
                </DropdownMenu>
            </AppHeaderDropdown>
        </Nav>
          {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
