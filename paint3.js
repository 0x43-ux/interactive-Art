function getRandomColor(excludeColors = []) {
    const colors = ['white', 'white', 'white', 'yellow', 'blue', 'red'];
    let availableColors = colors.filter(color => !excludeColors.includes(color));
    return availableColors[Math.floor(Math.random() * availableColors.length)];
}

function isSpaceAvailable(occupied, colStart, rowStart, colSpan, rowSpan) {
    for (let r = rowStart; r < rowStart + rowSpan; r++) {
        for (let c = colStart; c < colStart + colSpan; c++) {
            if (occupied[r][c]) {
                return false;
            }
        }
    }
    return true;
}

function markSpaceAsOccupied(occupied, colStart, rowStart, colSpan, rowSpan) {
    for (let r = rowStart; r < rowStart + rowSpan; r++) {
        for (let c = colStart; c < colStart + colSpan; c++) {
            occupied[r][c] = true;
        }
    }
}

function createSquare(colStart, rowStart, colSpan, rowSpan, adjacentColors, color = null, hoverEffect = true) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.gridColumn = `${colStart + 1} / span ${colSpan}`;
    square.style.gridRow = `${rowStart + 1} / span ${rowSpan}`;
    square.style.backgroundColor = color ? color : getRandomColor(adjacentColors);

    if (hoverEffect) {
        square.addEventListener('mouseenter', () => splitSquare(square, colSpan, rowSpan));
    }

    return square;
}

function findEmptySpace(occupied, colSpan, rowSpan) {
    for (let rowStart = 0; rowStart <= 10 - rowSpan; rowStart++) {
        for (let colStart = 0; colStart <= 10 - colSpan; colStart++) {
            if (isSpaceAvailable(occupied, colStart, rowStart, colSpan, rowSpan)) {
                return { colStart, rowStart };
            }
        }
    }
    return null;
}

function splitSquare(square, colSpan, rowSpan) {
    const fragmentCount = 4;

    square.style.display = 'grid';
    square.style.gridTemplateColumns = `repeat(2, 1fr)`;
    square.style.gridTemplateRows = `repeat(2, 1fr)`;

    const originalStyle = square.style.cssText; //초기 스타일 

    square.innerHTML = ''; // 없어도 코드는 잘 작동함 다만 불안해서 그냥 놔둠

    for (let i = 0; i < fragmentCount; i++) {
        const fragment = document.createElement('div');
        fragment.classList.add('fragment');
        fragment.style.backgroundColor = getRandomColor();
        fragment.style.border = '5px solid black';
        square.appendChild(fragment);
    }

    // 0.5초뒤 원상복귀
    setTimeout(() => {
        square.style.cssText = originalStyle;
        square.innerHTML = '';
    }, 500);
}

function generateMondrianArt() {
    const occupied = Array.from({ length: 10 }, () => Array(10).fill(false));

    //오른쪽 위 영역 설정
    const whiteSquare = createSquare(0, 0, 2, 6, [], 'white', false);
    whiteSquare.style.width = '100%';
    whiteSquare.style.height = '100%';

    const goBackBtn = document.createElement('button');
    goBackBtn.classList.add('goBackBtn');
    goBackBtn.onclick = function () {
        location.href = './index.html';
    };

    const arrowImg = document.createElement('img');
    arrowImg.classList.add('arrowImg');
    arrowImg.src = './pictures/arrow.png';
    arrowImg.alt = '';

    goBackBtn.appendChild(arrowImg);
    whiteSquare.appendChild(goBackBtn);


    const changeImg = document.createElement('button');
    changeImg.classList.add('changeImgBtn');
    changeImg.onclick = function () {
        location.href = './paint3.html';
    };

    const reloadImg = document.createElement('img2');
    reloadImg.classList.add('reloadImg');
    reloadImg.src = './pictures/arrow.png';
    reloadImg.alt = '';

    goBackBtn.appendChild(arrowImg);
    whiteSquare.appendChild(changeImg);


    document.body.appendChild(whiteSquare);
    markSpaceAsOccupied(occupied, 0, 0, 2, 6);

    //나머지 부분
    for (let attempt = 0; attempt < 100; attempt++) {
        let colSpan = Math.floor(Math.random() * 3) + 1;
        let rowSpan = Math.floor(Math.random() * 3) + 1;

        const emptySpace = findEmptySpace(occupied, colSpan, rowSpan);



        if (emptySpace) {
            const { colStart, rowStart } = emptySpace;

            const adjacentColors = [];
            if (colStart > 0 && occupied[rowStart][colStart - 1]) adjacentColors.push(occupied[rowStart][colStart - 1]);
            if (rowStart > 0 && occupied[rowStart - 1][colStart]) adjacentColors.push(occupied[rowStart - 1][colStart]);
            if (colStart + colSpan < 10 && occupied[rowStart][colStart + colSpan]) adjacentColors.push(occupied[rowStart][colStart + colSpan]);
            if (rowStart + rowSpan < 10 && occupied[rowStart + rowSpan][colStart]) adjacentColors.push(occupied[rowStart + rowSpan][colStart]);


            const square = createSquare(colStart, rowStart, colSpan, rowSpan, adjacentColors);
            document.body.appendChild(square);
            markSpaceAsOccupied(occupied, colStart, rowStart, colSpan, rowSpan);
        }
    }
}

generateMondrianArt();