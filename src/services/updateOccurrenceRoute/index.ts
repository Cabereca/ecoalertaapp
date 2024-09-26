import api from "../../api/api";

export const updateOccurrenceRoute = async (data, id) => {
  try {
    const newOcurrence = await api
      .put(`/occurrence/${id}`, data)
      .then((response) => {
        return response.data;
      });

    console.log(newOcurrence);

    alert("Ocorrência editada com sucesso!");

    return newOcurrence;
  } catch (error) {
    if (error.response) {
      // O servidor retornou uma resposta com um status de erro
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida
      console.error("Error request:", error.request);
    } else {
      // Alguma coisa ocorreu ao configurar a requisição que disparou o erro
      console.error("Error message:", error.message);
    }
  }
};
