// api/status.js
export default function handler(req, res) {
    res.json({ 
      status: 'online', 
      message: 'Smart contract audit portfolio service is running' 
    });
  }