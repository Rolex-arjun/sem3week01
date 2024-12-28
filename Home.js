import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!file) {
      alert('Please upload a file first!');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/remove-bg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload an Image to Remove Background</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Processing...' : 'Remove Background'}
      </button>
      {result && (
        <div>
          <h3>Processed Image:</h3>
          <img src={`data:image/png;base64,${result}`} alt="Processed" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default Home;
