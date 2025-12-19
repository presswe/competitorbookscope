import { NextResponse } from 'next/server';
import { fetchBooks, QueryType } from '@/lib/aladin-client';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const publisher = searchParams.get('publisher') || '';
    const type = (searchParams.get('type') as QueryType) || 'ItemNewAll'; // ItemNewAll, Bestseller

    // Basic validation or mapping if needed
    // For "Popular Books" (Section 2), we might use type=Bestseller

    try {
        const books = await fetchBooks(type, 'Book', publisher);
        return NextResponse.json({ items: books });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
