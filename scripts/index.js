// ---------
const main = document.querySelector('.main');
const progressBlock = document.querySelector('.progress-block');
const progress = document.querySelector('.progress');
const form = document.querySelector('form.poll');
const button = document.querySelector('.submit');
const fields = document.querySelectorAll('fieldset');
const error = document.querySelector('.error');

form.addEventListener('change', formChange);

function formChange() {
    button.classList.add('active');

    if(error.classList.contains('active')) {
        error.classList.remove('active');
    }

    window.scrollTo({
        top: button.getBoundingClientRect().top,
        behavior: 'smooth'
    });
}

button.addEventListener('click', nextForm);

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
        this.classList.remove('active');
    }

    // const formData = new FormData(form);
    // for(let el of formData) {
    //     console.log(el);
    // }
}