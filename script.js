const app = document.getElementById('app');
const getStartedButton = document.getElementById('get-started');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const circle = document.querySelector('.circle');
const captureButton = document.getElementById('capture-button');
const retakeButton = document.getElementById('retake-button');
const analyzeButton = document.getElementById('analyze-button');
const capturedImage = document.getElementById('captured-image');


let currentScreen = 'welcome';
let stream = null;


function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
    document.getElementById(`${screenId}-screen`).classList.remove('hidden');
    currentScreen = screenId;
}


async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing the camera", err);
        alert("ไม่สามารถเข้าถึงกล้องได้ กรุณาตรวจสอบการอนุญาตการใช้งานกล้อง");
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

function captureImage() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext('2d').drawImage(video, 3, 3);
    capturedImage.src = canvas.toDataURL('image/png');
    showScreen('result');
}

getStartedButton.addEventListener('click', () => {
    showScreen('camera');
    startCamera();
});


captureButton.addEventListener('click', captureImage);


retakeButton.addEventListener('click', () => {
    showScreen('camera');
    startCamera();
});


analyzeButton.addEventListener('click', () => {
    // ใส่โค้ดสำหรับการวิเคราะห์ภาพที่นี่
    alert("กำลังวิเคราะห์ภาพ...");
});


// เมื่อสลับหน้าจอ ให้ปิดกล้องถ้าไม่ได้อยู่ในหน้ากล้อง
app.addEventListener('click', (event) => {
    if (currentScreen !== 'camera' && stream) {
        stopCamera();
    }
});
