interface FalProxyRequest {
  url: string;
  method: 'GET' | 'POST';
  body?: any;
}

export async function callFalProxy(request: FalProxyRequest): Promise<any> {
  const response = await fetch('/api/fal/proxy', {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      'x-fal-target-url': request.url,
    },
    body: request.body ? JSON.stringify(request.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Proxy error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}