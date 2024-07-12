const randomizeButton = document.querySelector('.randomize');
const addButton = document.querySelector('.add');

function createList() {
    const inputValues = document.querySelector('.elements');
    const list = document.querySelector('.list');
    const elementsError = document.querySelector('.elements-error');

    list.innerHTML = '';
    elementsError.classList.remove('visible');

    const notEmptyItems = inputValues.value.split('\n').filter(item => item.trim() !== '');

    if (notEmptyItems.length === 0) {
        elementsError.innerHTML = 'Add some values';
        elementsError.classList.add('visible');
        return;
    }

    if (notEmptyItems.length > 50) {
        elementsError.innerHTML = 'Elements must not be more than 50';
        elementsError.classList.add('visible');
        return;
    }

    notEmptyItems.forEach(item => {
        const newListItem = document.createElement('li');

        newListItem.textContent = item.toString();
        newListItem.classList.add('list-item');
        list.appendChild(newListItem);
    });
}

window.addEventListener('load', createList);
addButton.addEventListener('click',  createList);

let isRunning = false;

function randomize() {
    if (isRunning) {
        return;
    }

    isRunning = true;

    const listItems = document.querySelectorAll('.list-item');

    if (listItems.length === 0) {
        isRunning = false;
        return
    }

    const totalItems = listItems.length;
    let currentIndex = 0;

    listItems.forEach(item => item.classList.remove('winner'));

    function getRandomNumber() {
        const min = totalItems * 3 + 1;
        const max = totalItems * 6;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const totalCycles = getRandomNumber();
    const totalDuration = 4000;
    const intervalTime = totalDuration / totalCycles;

    function highlightNextItem() {
        if (currentIndex > 0) {
            listItems[currentIndex - 1].classList.remove('current-item');
        } else {
            listItems[listItems.length - 1].classList.remove('current-item');
        }

        listItems[currentIndex].classList.add('current-item');

        currentIndex = (currentIndex + 1) % listItems.length;
    }

    let cycles = 0;

    function animate() {
        if (cycles < totalCycles) {
            highlightNextItem();
            cycles++;
            setTimeout(animate, intervalTime);
        } else {
            const lastIndex = currentIndex > 0 ? currentIndex - 1 : listItems.length - 1;

            listItems[lastIndex].classList.add('winner');
            isRunning = false;
        }
    }

    animate();
}

randomizeButton.addEventListener('click', randomize);