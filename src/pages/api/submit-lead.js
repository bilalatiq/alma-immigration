export default function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;
    // Mock storage (in real app, this would go to a database)
    console.log('Lead submitted:', formData);
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}