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
    
    const activeField = [...fields].findIndex(el => el.classList.contains('active'));

    fields[activeField].classList.remove('active');

    if(activeField === 0) {
        main.classList.remove('active');
        progressBlock.classList.add('active');
    }

    const widthPercent = Math.round((progressBlock.clientWidth / fields.length) / progressBlock.clientWidth * 100);
    progress.style.cssText = `width: ${widthPercent}%; transition: width 1s ease`;

    if(activeField + 1 <= fields.length - 1) {
        fields[activeField + 1].classList.add('active');
        this.classList.remove('active');
    }

}