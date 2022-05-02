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
        progress.classList.add('active');
    }

    if(activeField + 1 <= fields.length - 1) {
        fields[activeField + 1].classList.add('active');
        this.classList.remove('active');
    }

}