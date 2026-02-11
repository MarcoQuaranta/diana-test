export async function uploadToCloudinary(blob: Blob, folder?: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', blob, 'photo.jpg');
  if (folder) {
    formData.append('folder', folder);
  }

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Upload failed');
  }

  const data = await res.json();
  return data.url;
}
