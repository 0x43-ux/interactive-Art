const hoverDiv = document.querySelector('.artDiv1');
const hoverDiv2 = document.querySelector('.artDiv2');
const hoverDiv3 = document.querySelector('.artDiv3');
const hoverDiv4 = document.querySelector('.artDiv4');

const image = document.getElementById('bgImg');

hoverDiv.addEventListener('mouseover', () => {
    image.src = './pictures/pngtree-checkered-piet-mondrian-style-emulation-image_1398200.jpg'; // 변경할 이미지의 경로
});

hoverDiv2.addEventListener('mouseover', () => {
    image.src = './pictures/90.jpeg'; // 변경할 이미지의 경로
});

hoverDiv3.addEventListener('mouseover', () => {
    image.src = './pictures/1DD4F9A9-8D2A-45D4-B028-AA62F24485F4_1_201_a.jpeg'; // 변경할 이미지의 경로
});

hoverDiv4.addEventListener('mouseover', () => {
    image.src = './pictures/E0E54BB9-C89C-457D-8107-BB8BD379F6F8_1_201_a.jpeg'; // 변경할 이미지의 경로
});
