import React from 'react';
import StateContext from '../store.jsx';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


const NavBar = props => {
    let searchInput = '';
    return (
        <StateContext.Consumer>
            {context => {
                let { recentSearches } = context;
                return (
                    <div>
                        <p>Logo Here</p>
                        <p>Search</p>
                        <div>
                            <p id="recentSearches">Recently Searched</p>
                            <p>{recentSearches[0]}</p>
                            <p>{recentSearches[1]}</p>
                        </div>
                    </div>
                );
            }}
        </StateContext.Consumer>
    )
}

export default NavBar;