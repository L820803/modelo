import { API_URL } from "@/lib/ApiEndPoints";
import api from "@/service/api";
import Usuarios from "./usuario";

async function getData() {

  try {
  
    const response = await api<Usuario[]>('/user');
    if(!response){
      return [];
    }
    return response ?? [];
  } catch (error: any) {
    return []
  }
}

export interface Usuario {
  id: string
  name: string
}

export default async function Home() {

  const data = await getData();

  return (
    <div>
      <Usuarios user={data} />
    </div>
  );
}
