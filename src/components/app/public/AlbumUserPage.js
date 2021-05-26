import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { back } from '../../../helpers/back';
import { NavBar } from '../../layout/NavBar';
import { getPhotos } from '../../redux/actions/photo';
import { PhotoCard } from '../auth/components/Photos/PhotoCard';
import { NoItemsExplore } from './NoItems/NoItemsExplore';

export const AlbumUserPage = ({ history }) => 
{
    const { username, album } = useParams();
    const photos = useSelector(state => state.photos);

    const dispatch = useDispatch();

    useEffect(() => 
    {
        // Busco las imágenes del álbum del usuario
        dispatch(getPhotos(`${username}/${album}`));
        console.log("Albums users")

    }, [dispatch, username, album]);

    return (
        <>
            <NavBar />

            <div className="container-fluid w-img mt-5 animate__animated animate__fadeIn">
                <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                    <div className="d-flex align-items-center">
                        <h1 className="text-light text-center">
                            <i className="bi bi-arrow-left-circle text-light pointer" onClick={() => back(history)}></i>
                            <span className="text-white-50"> Álbum:</span> {album}
                        </h1>
                    </div>
                </div>                

                <div className="container-fluid gallery pointer mt-3">
	
                {
                // Usar 2 componentes 
                (photos !== undefined && photos.length > 0) ? photos.reverse().map( ({image, uid = '', title, description, creation_date}) => 
                (
                    <PhotoCard key={uid} uid={uid} album={album} image={image} user_name={username} />

                )) : <NoItemsExplore object="photo" />
                }
                    
                </div>
            </div>
        </>
    )
}
