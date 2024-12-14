import axios from 'axios';

export const CreateNotes = async (noteData) => {
    try {
        let data = JSON.stringify({
            "title": noteData.title,
            "note": noteData.note,
            "important": noteData.important,
            "study": noteData.study,
            "work": noteData.work,
            "personal": noteData.personal,
            "urgent": noteData.urgent,
            "archived": false
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/notes',
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config); // Usa await aquí
        console.log('Nota creada con éxito:', response.data);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error('Error al crear la nota:', error.message);
        throw error; // Maneja el error en el componente llamante
    }
};



export const GetNotes = async (getData) => {
    // Desestructuramos los parámetros que recibimos
    const { important, study, work, personal, urgent, archived } = getData;
    
    // Creamos la base de la URL
    let url = 'http://localhost:8080/notes?';

    // Aseguramos que archived siempre esté presente
    if (archived !== undefined) url += `archived=${archived}&`;

    // Añadimos los parámetros solo si son true
    if (important === true) url += `important=true&`;
    if (study === true) url += `study=true&`;
    if (work === true) url += `work=true&`;
    if (personal === true) url += `personal=true&`;
    if (urgent === true) url += `urgent=true&`;

    // Eliminar el último '&' si lo hay
    url = url.endsWith('&') ? url.slice(0, -1) : url;

    // Configuramos la solicitud axios
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url, // Usamos la URL construida dinámicamente
        headers: {}
    };

    console.log(url); // Verifica la URL generada

    // Retornar la promesa de axios para que pueda ser usada con .then() en el componente
    return axios.request(config);
};



export const DeleteNotes = async (id) => {
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:8080/notes/${id}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

};


export const EditNotes = async (id,updatedNote) => {
    let data = JSON.stringify(updatedNote);
      
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://localhost:8080/notes/${id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });  

};







