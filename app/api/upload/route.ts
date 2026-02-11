import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'san-valentino';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
    const apiKey = process.env.CLOUDINARY_API_KEY!;
    const apiSecret = process.env.CLOUDINARY_API_SECRET!;

    const timestamp = Math.floor(Date.now() / 1000).toString();

    // Create signature for signed upload
    const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

    // Build upload form data for Cloudinary
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', folder);
    uploadData.append('timestamp', timestamp);
    uploadData.append('api_key', apiKey);
    uploadData.append('signature', signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: uploadData }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Cloudinary error:', errorText);
      return NextResponse.json({ error: 'Upload to Cloudinary failed' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ url: data.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
