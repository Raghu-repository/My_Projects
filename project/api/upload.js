import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from 'formidable';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const uploadDir = path.join(process.cwd(), '/public/uploads');

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      return 'uploaded' + ext;
    }
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error parsing the file.');
      return;
    }

    const filePath = files.image[0].filepath;
    const fileUrl = '/uploads/' + path.basename(filePath);

    setTimeout(async () => {
      try {
        await fs.unlink(filePath);
        console.log('Image deleted.');
      } catch (err) {
        console.error('Error deleting file:', err);
      }
    }, 60000);

    res.status(200).json({ url: fileUrl });
  });
};