'use server'

import api from "@/service/api";
import Usuarios from "./usuario";

export interface Usuario {
  id: string;
  name: string;
}

export default async function Home() {

  const data = await api<Usuario[]>('/user', {
    cache: 'no-store' // Isso força o SSR ao não usar cache estático
  });

  console.log(process.env.NODE_ENV)

  console.log(process.env.NEXT_PUBLIC_VAR)

  console.log(process.env.NEXT_PUBLIC_API_URL)
  
  return (
    <div>
      <Usuarios user={data} />
    </div>
  );
}
