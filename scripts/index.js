const select = document.querySelector('select');

select.addEventListener('change', unFocus);

function unFocus() {
    document.activeElement.blur();
}
