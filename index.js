const main = document.querySelector('main');
const root = document.querySelector(':root');
const input = document.getElementById('input');
const resultInput = document.getElementById('result');

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];  

document.getElementById('clear').addEventListener('click', () => {
  input.value = "";
  input.focus();
})

document.getElementById('equal').addEventListener('click', calculate);

document.querySelectorAll('.charKey').forEach((charKeyBtn) => {
  charKeyBtn.addEventListener('click', () => {
    const value = charKeyBtn.dataset.value;

    input.value += value;
  });
});

document.getElementById('themeSwitcher').addEventListener('click', () => {
  if(main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f5f9');
    root.style.setProperty('--border-color', '#aaa');
    root.style.setProperty('--font-color', '#212529');
    root.style.setProperty('--primary-color', '#26834a');
    main.dataset.theme = 'light';
  }else {
    root.style.setProperty('--bg-color', '#212529');
    root.style.setProperty('--border-color', '#666');
    root.style.setProperty('--font-color', '#f1f5f9');
    root.style.setProperty('--primary-color', '#4dff91');
    main.dataset.theme = 'dark';    
  }
})

document.getElementById('copyToClipboard').addEventListener('click', (ev) => {
  const button = ev.currentTarget;

  if(button.innerText === 'Copy') {
    button.innerText = "Copied!";
    button.classList.add('success');
    window.navigator.clipboard.writeText(resultInput.value);
  }else {
    button.innerText = 'Copy';
    button.classList.remove('success');
  }
})

input.addEventListener('keydown', (ev) => {
  ev.preventDefault();

  if(allowedKeys.includes(ev.key)) { // Verifica se a tecla digitada pelo usuário é permitida
    input.value += ev.key;
    return;
  }
  if(ev.key === 'Backspace'){
    input.value = input.value.slice(0, -1); // Exclui o último caractere do input
    return; 
  }
  if(ev.key === 'Enter')
    calculate();
})

function calculate() {
  try {
    const result = eval(input.value);
    resultInput.value = result ?? "";
    resultInput.classList.remove('error');
  }catch(er) {
    resultInput.value = 'ERROR';
    resultInput.classList.add('error');
    input.value = "";
  }finally {
    input.focus();    
  }
}