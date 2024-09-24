// import express from 'express';


// const router = express.Router();

// // Route untuk publish nilai token


// export default router;

import express from 'express';
import client from '../../config/mqttClient.js';
import { publishTokenValueController } from './mqtt.controller.js';

const router = express.Router();

router.get('/mqtt-status', (req, res) => {
    if (client.connected) {
        return res.status(200).json({ message: 'Connected to MQTT broker' });
    } else {
        return res.status(500).json({ message: 'Not connected to MQTT broker' });
    }
});

router.post('/publish-token', publishTokenValueController);

export default router;
