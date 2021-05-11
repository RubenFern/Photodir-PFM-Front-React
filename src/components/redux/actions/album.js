import { fetchImage, fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
import { types } from "../types/types";


const getAlbums = (path) =>
{
    return async(dispatch) =>
    {
        // Uso un path variable para usar la función en el home del usuario conectado, y cuando se busque por usuario
        const res = await fetchNoToken(`albumes/${path}`);
        const { albums } = await res.json();

        dispatch({
            type: types.viewAlbums,
            payload: albums
        });
    }
}

const addAlbum = (data) =>
{
    return async(dispatch) =>
    {
        const { name, description, infoImage } = data;
        let image = undefined;

        // Si el usuario añadió una imagen la guardo, si no le asigno la imagen por defecto mediante la API
        if (infoImage)
        {
            // Alamceno la imagen en la API 
            const resSaveImage = await fetchImage('upload/album', infoImage, 'POST');
            const { resp: { nameImgUpload } } = await resSaveImage.json();
            
            // Si se subió una imagen guardo el nombre 
            image = nameImgUpload;
        }

        // Almaceno el álbum en la base de datos
        const res = await fetchWithToken('albumes', {name, description, image}, 'POST');
        const album = await res.json();
            
        dispatch({
            type: types.addAlbum,
            payload: album
        });
    }
}

const editAlbum = (data) =>
{
    return async(dispatch) =>
    {
        const { name, image: fileImage, description, oldName, oldImage } = data;
        let image = oldImage;

        // Si modificó la imagen elimino la anterior y la cambio por la nueva la almaceno en la API
        if (fileImage.lastModified)
        {
            image = fileImage.name;

            const resSaveImage = await fetchImage('upload/album', fileImage, 'POST', oldImage);
            const { resp: { nameImgUpload } } = await resSaveImage.json();

            // Guardo la nueva imagen
            image = nameImgUpload;
        }

        // Modifico los campos
        const res = await fetchWithToken(`albumes/${oldName}`, {name, image, description}, 'PUT');
        const album = await res.json();

        dispatch({
            type: types.editAlbum,
            payload: album
        });
    }
}

const deleteAlbum = (data) =>
{
    return async(dispatch) =>
    {
        const { image, name, description } = data;
        const res = await fetchWithToken(`albumes/${name}`, {name, image, description}, 'DELETE');
        const { album } = await res.json();

        dispatch({
            type: types.deleteAlbum,
            payload: album
        });
    }
}

export 
{
    getAlbums,
    addAlbum,
    editAlbum,
    deleteAlbum
}