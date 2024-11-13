// src/pages/api/simulation/home.js

import { REST_API_PARAMS } from '../../../utils/Constants';

export default async function handler(req, res) {
    try {
        const response = await fetch(`${REST_API_PARAMS.baseUrl}/leadstatus`);
        const leadStatus = await response.json();
        res.status(200).json({ leadStatus });
    } catch (error) {
        console.error('Error fetching leadstatus:', error);
        res.status(500).json({ error: 'Failed to fetch leadstatus' });
    }
}
