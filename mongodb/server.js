const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const rembg = require('rembg');
const fs = require('fs');
const path = require('path');
const Upload = require('./models/Upload');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bg-removal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

// File upload setup
const upload = multer({ dest: 'uploads/' });

app.post('/api/remove-bg', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const originalFile = fs.readFileSync(filePath);

    const processed = await rembg.remove(originalFile);
    const processedBase64 = processed.toString('base64');

    // Save to MongoDB
    const newUpload = new Upload({
      filename: req.file.originalname,
      processedImage: processedBase64,
    });
    await newUpload.save();

    // Delete the original file
    fs.unlinkSync(filePath);

    res.status(200).json({ data: processedBase64 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
