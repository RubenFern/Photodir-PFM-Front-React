import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { startLogout } from '../redux/actions/auth';
import { Search } from './Search';

export const NavBar = () => 
{
    const dispatch = useDispatch();

    const { logged, user: { user_name, is_admin } } = useSelector(state => state.auth);

    const logout = () =>
    {
        dispatch(startLogout());
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-header">
            <div className="container">
                <NavLink className="navbar-brand" exact to="/">PhotoDir</NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>  
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Search />

                {
                    (logged) ? // Condición de si está logueado el usuario
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item dropdown ">
                            <span className="nav-link dropdown-toggle user" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span> {user_name}</span>
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li className="text-white">
                                    <span className="dropdown-item text-white">
                                        <button
                                            className="nav-link btn"
                                            onClick={logout}
                                        >
                                            <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                                        </button>
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 w-25">
                        <NavLink to="/login" className="nav-item nav-link">
                            Iniciar Sesión
                        </NavLink>
                        <NavLink to="/registro" className="nav-item nav-link">
                            Regístrate
                        </NavLink>
                    </ul>
                }
                </div>
            </div>
        </nav>
        </>
    )
}
