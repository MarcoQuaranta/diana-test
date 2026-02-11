import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
    const apiKey = process.env.CLOUDINARY_API_KEY!;
    const apiSecret = process.env.CLOUDINARY_API_SECRET!;

    // Use Cloudinary Admin API to list resources in san-valentino folder
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=san-valentino&type=upload&max_results=100`,
      {
        headers: { Authorization: `Basic ${auth}` },
        next: { revalidate: 30 },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Cloudinary list error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
    }

    const data = await res.json();
    const photos = (data.resources || []).map((r: { secure_url: string; created_at: string; public_id: string }) => ({
      url: r.secure_url,
      createdAt: r.created_at,
      id: r.public_id,
    }));

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Photos API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
