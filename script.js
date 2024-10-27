const video = document.getElementById('video');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

let mediaRecorder;
const chunks = [];

// Akses kamera dan mikrofon
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        video.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = event => {
            chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            // Simpan atau tampilkan video yang direkam
            console.log(url); // Ganti dengan logika penyimpanan
        };

        startButton.onclick = () => {
            mediaRecorder.start();
        };

        stopButton.onclick = () => {
            mediaRecorder.stop();
        };
    })
    .catch(err => {
        console.error('Error accessing media devices.', err);
    });