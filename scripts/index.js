// const select = document.querySelector('select');

// select.addEventListener('change', unFocus);

function unFocus() {
    document.activeElement.blur();
}

// ---------
const main = document.querySelector('.main');
const progressBlock = document.querySelector('.progress-block');
const progress = document.querySelector('.progress');
const form = document.querySelector('form.poll');
const button = document.querySelector('.submit');
const fields = document.querySelectorAll('fieldset');

form.addEventListener('change', formChange);

function formChange() {
    button.classList.add('active');

    window.scrollTo({
        top: button.getBoundingClientRect().top,
        behavior: 'smooth'
    });
}

button.addEventListener('click', nextForm);

function nextForm(e) {
    e.preventDefault();
    
    const prevActiveField = [...fields].findIndex(el => el.classList.contains('active'));

    fields[prevActiveField].classList.remove('active');

    if(prevActiveField === 0) {
        main.classList.remove('active');
        progressBlock.classList.add('active');
    }
    
    const progressWidth = progressBlock.clientWidth;
    const widthPercent = Math.round((progressWidth / (fields.length - prevActiveField)) / progressWidth * 100);
    progress.style.cssText = `width: ${widthPercent}%; transition: width 1s ease`;

    if(prevActiveField + 1 <= fields.length - 1) {
        fields[prevActiveField + 1].classList.add('active');
        this.classList.remove('active');
    }

}