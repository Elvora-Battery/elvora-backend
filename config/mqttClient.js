import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://ee.unsoed.ac.id', {
    clientId: "ESP32_client",
    clean: true
});

client.on('connect', () => {
    console.log('Connected to MQTT broker');
});

client.on('error', (error) => {
    console.error('Failed to connect to MQTT broker:', error);
});

export default client;
