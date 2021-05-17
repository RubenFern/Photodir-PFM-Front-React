import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { NavBar } from '../../layout/NavBar';
import { getPhoto } from '../../redux/actions/photo';
import { types } from '../../redux/types/types';
import { DeleteComponent } from './components/Photos/DeleteComponent';
import { EditComponent } from './components/Photos/EditComponent';
import { FormModal } from './FormModal';

export const PhotoPage = ({ history }) => 
{
    const { photo } = useParams();
    
    // State de prueba para el like de la imagen
    const [CheckLike, setCheckLike] = useState(false);
    console.log(CheckLike)
    
    const { user: { user_name } } = useSelector(state => state.auth);
    const { uid, title, description, image, creation_date, likes } = useSelector(state => state.photos);
    const reload = useSelector(state => state.reload);

    const dispatch = useDispatch();

    useLayoutEffect(() => 
    {
        // Obtengo los datos de la imagen para no depender de la página anterior y poder recargar los datos al editar  
        dispatch(getPhoto(photo, history));
        console.log('recargaphoto')

        // Finalizo el renderizado desactivando el reload
        return () =>
        {
            dispatch({
                type: types.reloadFalse
            });
        }   
    }, [photo, dispatch, history, reload]);

    const back = () =>
    {
        if (history.length <= 2)
        {
            history.push('/home');
        } else
        {
            history.goBack();
        }
    }

    return (
        <>
            <NavBar />

            <div className="container">
                <div className="gallery mt-3">
                    <h1 className="title-img container">{title}</h1>
                    <div className="only-item animate__animated animate__fadeIn">
                        <img 
                            className="only-img" 
                            src={`http://localhost:3010/api/upload/photo/${user_name}/${image}`} 
                            alt={image}
                            onClick={back}
                        />
                        <input id="heart" onChange={ () => setCheckLike(!CheckLike) } type="checkbox" />
                        <label id="lbl-heart" htmlFor="heart"><i className="fas fa-heart"></i> </label>
                        <label className="text-light">{likes} Me gusta</label>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <div className="h-25">
                        <EditComponent action="Editar" uid={uid} title={title} description={description} image={image} />
                    </div>
                    <div className="h-25 ms-3 mx-5">
                        <DeleteComponent action="Eliminar" uid={uid} image={image} />
                    </div>
                </div>
            </div>
            

            <FormModal tipo="photo" />
        </>
    )
}
