import { publishTokenValue } from './mqtt.service.js';

// Controller untuk publish nilai token
export const publishTokenValueController = (req, res) => {
    const { token } = req.body;
    
    // Publish nilai token ke MQTT
    publishTokenValue(token);
    
    res.status(200).json({
        message: 'Token value published successfully',
        token: token
    });
};

