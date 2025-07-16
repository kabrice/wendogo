import formidable from 'formidable';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { REST_API_PARAMS } from '../../store/apis/uploadToDriveApi'; // Correct import path

export const config = {
    api: {
        bodyParser: false, // Required for file uploads
    },
};

// 📌 Helper function to parse Formidable file uploads
const parseForm = async (req) => {
    const form = formidable({
        keepExtensions: true, // Keep original file extension
        multiples: false, // Allow only one file at a time
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { fields, files } = await parseForm(req); // Use async parsing
        const file = files.file; // Get uploaded file
        const fileType = fields.type; // Get file type (bulletin, CV, etc.)

        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        // Create FormData for Flask API
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.filepath), file.originalFilename);
        formData.append('type', fileType);

        // Set Headers
        const headers = {
            ...formData.getHeaders(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
        };

        // 📤 Send to Flask API
        const flaskResponse = await axios.post(
            `${REST_API_PARAMS.baseUrl}/api/upload-to-drive`,
            formData,
            { headers }
        );

        return res.status(200).json(flaskResponse.data);
    } catch (error) {
        console.error('Upload Error:', error);
        return res.status(500).json({ success: false, message: 'Error uploading file' });
    }
}
