

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
 ? 'http://localhost:3000' : `http://${window.location.hostname}:${window.location.port}`;

 export default API_BASE_URL;