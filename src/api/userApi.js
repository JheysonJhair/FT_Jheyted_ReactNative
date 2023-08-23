export const buscarUsuario = async () => {
    const response = await fetch('http://soundthezerb.ccontrolz.com/api/users/getall');
    const data = await response.json();
    return data.result;
};

