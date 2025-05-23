import api from "../api";
import { Contato } from "../model/contato";


export const getContatos = async () => {
  const response = await api.get("/contatos");
  return response.data;
};

export const addContato = async (contato: Omit<Contato, "_id">) => {
  return await api.post("/contatos", contato);
};

export const deleteContato = async (id: string) => {
  return await api.delete(`/contatos/${id}`);
};

export const updateContato  = async(
    id: string,
    contato: Partial<Contato>
) => {
    return await api.put(`/contatos/${id}`,contato);
}

export const getContatoById = async(id:string) => {
    const response = await api.get(`/contatos/${id}`);
    return response.data;
}