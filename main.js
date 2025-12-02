document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('tit-head');
    if (!el) return;
    const text = el.textContent.trim();
    el.textContent = '';
    let i = 0;
    const speed = 50; // milisegundos por carácter
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
});
