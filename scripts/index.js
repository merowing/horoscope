const main = document.querySelector('.main');
const progressBlock = document.querySelector('.progress-block');
const progress = document.querySelector('.progress');
const form = document.querySelector('form.poll');
const button = document.querySelector('.submit');
const fields = document.querySelectorAll('fieldset');
const error = document.querySelector('.error');
const questionsBlock = document.querySelector('.questions');
const statisticsBlock = document.querySelector('.statistics');
const summaryBlock = document.querySelector('.summary');

form.addEventListener('change', formChange);
button.addEventListener('click', nextForm);

function formChange() {
    button.classList.add('active');

    // if(error.classList.contains('active')) {
    //     error.classList.remove('active');
    // }

    window.scrollTo({
        top: button.getBoundingClientRect().top,
        behavior: 'smooth'
    });
}

function nextForm(e) {
    e.preventDefault();
    
    const prevActiveField = [...fields].findIndex(el => el.classList.contains('active'));

    if(prevActiveField === 0) {
        main.classList.remove('active');
        progressBlock.classList.add('active');
    }

    if(fields[prevActiveField].classList.contains('select')) {
        const select = fields[prevActiveField].querySelectorAll('select');

        const selectedItem = [...select].every(item => item.selectedIndex !== 0);
        
        error.classList.remove('active');
        if(!selectedItem) {
            error.classList.add('active');
            return false;
        }
    }

    fields[prevActiveField].classList.remove('active');

    const progressWidth = progressBlock.clientWidth;
    const widthPercent = Math.round((progressWidth / fields.length) / progressWidth * 100) * (prevActiveField + 1);
    
    progress.style.cssText = `width: ${widthPercent}%; transition: width 1s ease`;

    if(prevActiveField + 1 <= fields.length - 1) {
        fields[prevActiveField + 1].classList.add('active');
        button.classList.remove('active');
    }else {
        const formData = new FormData(form);
        for(let el of formData) {
            console.log(el);
        }

        questionsBlock.classList.remove('active');
        statistics();
    }
}

function statistics() {
    statisticsBlock.classList.add('active');

    const statisticsProgress = document.querySelector('.statistics-progress');
    const statisticsList = statisticsBlock.querySelectorAll('ul > li');
    const statisticsButton = document.querySelector('.statistics-button');
    const heads = statisticsBlock.querySelectorAll('h4');
    const [ , tapeMessage, doneMessage] = heads;
    
    const statsWidth = statisticsProgress.parentElement.clientWidth;
    statisticsButton.addEventListener('click', showSummary);
    
    async function showStatistics() {
        let i = 0;
        for(const item of statisticsList) {
            await nextItem(item, i);
            i = i + 1;
        }

        tapeMessage.classList.add('show');
        doneMessage.classList.add('show');
        statisticsButton.classList.add('active');

        window.scrollTo({
            top: statisticsButton.getBoundingClientRect().top,
            behavior: 'smooth'
        });
    }
    showStatistics();

    function progressStats(ind) {
        let widthStatsPercent = Math.round((statsWidth / statisticsList.length) / statsWidth * 100) * (ind + 1);
        if(ind === statisticsList.length - 1) widthStatsPercent = 100;
        
        statisticsProgress.style.cssText = `width: ${widthStatsPercent}%; transition: width 1s ease`;
        statisticsProgress.innerText = widthStatsPercent + '%';
    }

    function nextItem(item, ind) {
        return new Promise(resolve => setTimeout(() => {
                item.classList.add('show');
                progressStats(ind);
                resolve();
            }, 300)
        );
    }

    function showSummary() {
        statisticsBlock.classList.remove('active');
        summary();
    }
}

function summary() {
    const bg = document.querySelector('.bg');
    const information = document.querySelector('.information');
    const infoUl = information.querySelector('ul');
    const summaryButton = document.querySelector('.summary-button');
    const close = document.querySelector('.information-close');
    const mainBlock = document.querySelector('main');

    summaryButton.addEventListener('click', getDataFromSever);
    close.addEventListener('click', toggleShowInformation);

    summaryBlock.classList.add('active');

    function getDataFromSever() {
        const url = "https://swapi.dev/api/people/1/";
        const opts = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };

        fetch(url, opts)
            .then(res => res.json())
            .then(response => {
                const fragment = document.createDocumentFragment();
                const elems = Object.keys(response).reduce((prev, current) => {
                    const key = current;
                    const value = response[key];
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${key}</span>
                        <span>${value}</span>
                    `;
                    prev.appendChild(li);
                    
                    return prev;
                }, fragment);
                infoUl.appendChild(elems);
                
                toggleShowInformation();
            })
            .catch(error => {
                console.log(error);
            });
    }

    function toggleShowInformation() {
        if(mainBlock.classList.contains('fixed')) {
            bg.style.display = 'none';
            information.style.display = 'none';
            mainBlock.classList.remove('fixed');
        }else {
            bg.style.display = 'block';
            information.style.display = 'block';
            mainBlock.classList.add('fixed');
        }
    }
}
