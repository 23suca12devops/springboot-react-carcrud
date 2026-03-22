export default async function handler(req, res) {
  const url =
    'https://carcrud-fge8hdgyfkbufcg5.centralindia-01.azurewebsites.net/api/cars' + req.url;
  
  const response = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.text(); // use text() first to avoid JSON.parse errors
  try {
    res.status(response.status).json(JSON.parse(data));
  } catch {
    res.status(response.status).send(data);
  }
}