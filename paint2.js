document.addEventListener('mousemove', (e) => {
    let mouseX = e.pageX -15; // document의 x좌표값
    let mouseY = e.pageY +15; // document의 y좌표값

    let cursor = document.querySelector('.cursor');
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

})

let previousMouseX = 0;
let direction = 1; 

function mouseDirection(event) {
    const mouseX = event.clientX; 
    
    if (mouseX-5 > previousMouseX) {
        direction = 2; 
    } else if (mouseX+5 < previousMouseX) {
        direction = 0; 
    } else {
        direction = 1; 
    }

    previousMouseX = mouseX;
}

function rotateIcarus() {
    const cursorElements = document.getElementsByClassName("cursor");

    if (cursorElements.length > 0) { // 클래스에 해당하는 요소가 존재할 경우
        const cursorElement = cursorElements[0]; // 첫 번째 요소 선택

        if (direction === 2) {
            cursorElement.style.transform = "rotate(30deg)";
        } else if (direction === 0) {
            cursorElement.style.transform = "rotate(-50deg)";
        } else {
            cursorElement.style.transform = "rotate(0deg)";
        }
    }
}

document.addEventListener('mousemove', (event) => {
    mouseDirection(event);
    rotateIcarus();
});

const hoverDiv = document.querySelector('.ConsoleWontShutOff');
const hDivs = document.getElementsByClassName('detail');

hoverDiv.addEventListener('mouseover', () => {
    for (let i = 0; i < hDivs.length; i++) {
        hDivs[i].style.opacity = "1";
    }
});

hoverDiv.addEventListener('mouseout', () => {
    for (let i = 0; i < hDivs.length; i++) {
        hDivs[i].style.opacity = "0";
    }
});





const images = [
    './pictures/f9a9b68f3f2415b6103eec8119fa8e6c.jpg', // 첫 번째 이미지 파일 경로
    './pictures/f9a9b68f3f2415b6103eec8119fa8e6c 2.jpg', // 두 번째 이미지 파일 경로
    './pictures/f9a9b68f3f2415b6103eec8119fa8e6c 3.jpg'  // 세 번째 이미지 파일 경로
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomImage() {
    const img = document.createElement('img');
    img.src = images[getRandomInt(0, images.length - 1)];
    img.className = 'image';

    const newLeft = getRandomInt(150, window.innerWidth - 150);  // 새로 생성된 이미지의 왼쪽 위치
    img.style.left = `${newLeft}px`;
    img.style.width = `${getRandomInt(50, 100)}px`;

    // 이전에 생성된 이미지의 위치와 비교
    const prevImages = document.querySelectorAll('.image');
    let isValidPosition = true;

    prevImages.forEach((prevImg) => {
        const prevLeft = parseInt(prevImg.style.left, 10);
        if (Math.abs(prevLeft - newLeft) < 150) {
            isValidPosition = false;
        }
    });

    if (isValidPosition) {
        document.body.appendChild(img);
    } else {

    }

}

function startAnimation() {
    setInterval(createRandomImage, 1000);
}

startAnimation();