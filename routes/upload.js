// routes/upload.js
import express from 'express';
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;
