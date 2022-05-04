const daysBlock = document.querySelector('.days');
const monthBlock = document.querySelector('.month');
const yearBlock = document.querySelector('.years');
const zodiacBlock = document.querySelector('.zodiac');
const zodiacImageDefaultSrc = './images/zodiac/';

const daysList = createDays();
daysBlock.appendChild(daysList);

const monthList = createMonth();
monthBlock.appendChild(monthList);

const yearsList = createYears();
yearBlock.appendChild(yearsList);

daysBlock.addEventListener('change', setZodiac);
monthBlock.addEventListener('change', day);
yearBlock.addEventListener('change', day);

function day() {
    const selected = daysBlock.selectedIndex;
    daysBlock.innerHTML = '';

    daysBlock.appendChild( createDays() );
    daysBlock.selectedIndex = selected;

    if(daysBlock.selectedIndex === -1) {
        daysBlock.selectedIndex = 0;
    }

    setZodiac();
}

function setZodiac() {
    if(daysBlock.selectedIndex <= 0 || monthBlock.selectedIndex <= 0 || yearBlock.selectedIndex <= 0) {
        zodiacBlock.classList.remove('active');

        daysBlock.classList.remove('active');
        monthBlock.classList.remove('active');
        yearBlock.classList.remove('active');
    }else {
        const day = parseInt(daysBlock.value);
        const month = parseInt(monthBlock.value);

        // getZodiac from zodiac.js
        if(!isNaN(day) && !isNaN(month)) {
            const { name } = getZodiac({day, month});

            const zodiacFigcaption = zodiacBlock.querySelector('figcaption');
            const zodiacImage = zodiacBlock.querySelector('img');
            
            zodiacFigcaption.innerText = name.ru;
            zodiacImage.src = zodiacImageDefaultSrc + name.en + '.png';

            zodiacBlock.classList.add('active');

            daysBlock.classList.add('active');
            monthBlock.classList.add('active');
            yearBlock.classList.add('active');
        }
    }
}

function createList(arr) {
    const fragment = document.createDocumentFragment();
    
    return arr.reduce((prev, current, i) => {
        const option = document.createElement('option');
        option.innerText = current;
        option.value = current;

        prev.appendChild(option);
        return prev;
    }, fragment);
}

function createYears() {
    const yearFrom = 1900;
    const yearTo = 2022;

    let arr = Array(yearTo - yearFrom + 1).fill().map((item, i) => {
        return yearFrom + i;
    }).reverse();
    arr = ['Год', ...arr];

    return createList(arr);
}

function createDays() {

    let num = 31;
    const month = parseInt(monthBlock.value);
    const year = parseInt(yearBlock.value);

    if((month - 1) % 2 === 1) {
        num = 30;
    }
    if(month === 2) {
        num = 28 + +(year % 4 === 0);
    }

    let arr = Array(num).fill().map((item, i) => {
        let day = i + 1;
        if(i < 9) {
            day = '0' + day;
        }
        return day.toString();
    });
    arr = ['День', ...arr];

    return createList(arr);
}

function createMonth() {
    let arr = Array(12).fill().map((item, i) => {
        let month = i + 1;
        if(i < 9) {
            month = '0' + month;
        }
        return month.toString();
    });
    arr = ['Месяц', ...arr];

    return createList(arr);
}
