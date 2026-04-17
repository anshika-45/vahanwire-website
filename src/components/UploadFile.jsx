import { useState } from 'react';
import axios from 'axios';

const SingleImageUpload = () => {
  console.log("kcenwdkjnbjkdw");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:6600/api/upload/upload-single', formData);
      console.log("ejwbjkcbkjeb",response);
      setUploadedUrl(response.data.imageUrl);
      setPreview(null);
      alert('Image uploaded successfully');
    } catch (error) {
      alert('Upload failed');
      console.log("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileSelect} />
      
      {preview && (
        <div>
          <img src={preview} alt="Preview" style={{ width: 200, height: 200, objectFit: 'cover' }} />
          <button onClick={uploadImage} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}

      {uploadedUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadedUrl} alt="Uploaded" style={{ width: 200, height: 200, objectFit: 'cover' }} />
          <p>{uploadedUrl}</p>
        </div>
      )}
    </div>
  );
};

export default SingleImageUpload;