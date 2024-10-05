import { NextResponse } from "next/server";
import { API_URL } from "@/lib/ApiEndPoints";

export async function GET() {
    
    try {

        const response = await fetch(`${API_URL}/user`);

        console.log(API_URL)

        if (!response.ok) {
            return NextResponse.json({
                message: 'Erro ao buscar'
            });
        }
        const data = await response.json();
        return NextResponse.json(data)

    } catch (error: any) {
        return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
}
