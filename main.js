document.addEventListener('DOMContentLoaded', () => {
    
    const typewriterTitle = () => {
        const el = document.getElementById('tit-head');
        if (!el) return;
        const text = el.textContent.trim();
        el.textContent = '';
        let i = 0;
        const speed = 50; 
        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    };
    
    typewriterTitle();
    
    const titleHead = document.getElementById('tit-head');
    if (titleHead) {
        titleHead.style.cursor = 'pointer';
        titleHead.addEventListener('click', typewriterTitle);
    }
    
    document.querySelectorAll('.enlaces_nav').forEach(link => {
        link.addEventListener('click', (e) => {
            
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    
    document.querySelectorAll('.logos-leng, .porque-que_son, .table-container').forEach(el => {
        observer.observe(el);
    });
    
    
    const createDarkModeToggle = () => {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'dark-mode-toggle';
        toggleBtn.textContent = '🌙';
        toggleBtn.title = 'Alternar modo oscuro';
        document.body.appendChild(toggleBtn);
        
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggleBtn.textContent = '☀️';
        }
        
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isNowDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isNowDarkMode);
            toggleBtn.textContent = isNowDarkMode ? '☀️' : '🌙';
        });
    };
    
    createDarkModeToggle();
    
    // Funcionalidad de escritura de c�digo en python.html
    const codigoBtn = document.getElementById('boton-codigo-ejemplo');
    const codigoText = document.getElementById('codigo-ejemplo-text');
    
    if (codigoBtn && codigoText) {
        let isActive = false;
        let typeoutTimeout = null;
        
        codigoBtn.addEventListener('click', () => {
            isActive = !isActive;
            
            if (isActive) {
                codigoText.classList.add('visible');
                codigoText.textContent = '';
                
                const code = 'print("Hola mundo")';
                let i = 0;
                const speed = 60;
                
                const typeCode = () => {
                    if (i < code.length) {
                        codigoText.textContent += code.charAt(i);
                        i++;
                        typeoutTimeout = setTimeout(typeCode, speed);
                    } else {
                        // Cuando el c�digo termina, mostrar el resultado
                        const resultadoText = document.getElementById('resultado-ejemplo-text');
                        if (resultadoText) {
                            resultadoText.classList.add('visible');
                            resultadoText.textContent = '';
                            
                            const resultado = 'Hola mundo';
                            let j = 0;
                            
                            const typeResult = () => {
                                if (j < resultado.length) {
                                    resultadoText.textContent += resultado.charAt(j);
                                    j++;
                                    typeoutTimeout = setTimeout(typeResult, speed);
                                }
                            };
                            typeResult();
                        }
                    }
                };
                typeCode();
            } else {
                clearTimeout(typeoutTimeout);
                codigoText.classList.remove('visible');
                codigoText.textContent = '';
                
                const resultadoText = document.getElementById('resultado-ejemplo-text');
                if (resultadoText) {
                    resultadoText.classList.remove('visible');
                    resultadoText.textContent = '';
                }
            }
        });
    }

    // --- Simulador de Python (cliente) ---
    const editor = document.getElementById('editor-code');
    const runBtn = document.getElementById('run-code');
    const clearBtn = document.getElementById('clear-output');
    const outputEl = document.getElementById('simulator-output');
    const loadBtn = document.getElementById('load-example');
    const exampleSelect = document.getElementById('example-select');
    const copyBtn = document.getElementById('copy-code');

    const EXAMPLES = {
        hola: 'print("Hola mundo")',
        math: 'a = 2 + 3\nprint(a)\nprint(10 * (2 + 3))',
        loop: 'for i in range(5):\n    print(i)'
    };

    function evaluateExpr(expr, env) {
        expr = expr.trim();
        // string literal
        const strm = expr.match(/^(['"])(.*)\1$/);
        if (strm) return strm[2];
        // number literal
        if (/^[+-]?(\d+(\.\d+)?)$/.test(expr)) return Number(expr);
        // variable
        if (/^[a-zA-Z_]\w*$/.test(expr)) return env[expr] !== undefined ? env[expr] : `(variable '${expr}' no definida)`;
        // replace variables with their values for arithmetic
        const safe = expr.replace(/([a-zA-Z_]\w*)/g, (m) => (env[m] !== undefined ? String(env[m]) : 'NaN'));
        if (/^[0-9+\-*/().\s]+$/.test(safe)) {
            try { return Function(`return (${safe})`)(); } catch (e) { return `# error: ${e.message}`; }
        }
        return `(expresión no soportada: ${expr})`;
    }

    function runPythonSim(code) {
        const lines = code.split(/\r?\n/);
        const env = {};
        let out = '';

        for (let i = 0; i < lines.length; i++) {
            const raw = lines[i];
            const line = raw.trim();
            if (!line) continue;

            // for-loop: for i in range(N):
            const forMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+range\((\d+)\):$/);
            if (forMatch) {
                const varName = forMatch[1];
                const n = parseInt(forMatch[2], 10);
                // collect indented block
                const block = [];
                let j = i + 1;
                while (j < lines.length && /^\s+/.test(lines[j])) { block.push(lines[j].trim()); j++; }
                i = j - 1;
                for (let k = 0; k < n; k++) {
                    env[varName] = k;
                    for (const bl of block) {
                        if (bl.startsWith('print(')) {
                            const inside = bl.match(/^print\((.*)\)$/)[1];
                            out += String(evaluateExpr(inside, env)) + '\n';
                        }
                    }
                }
                continue;
            }

            // assignment: name = expr
            const assign = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
            if (assign) {
                const name = assign[1];
                const expr = assign[2];
                env[name] = evaluateExpr(expr, env);
                continue;
            }

            // print
            const p = line.match(/^print\((.*)\)$/);
            if (p) {
                out += String(evaluateExpr(p[1], env)) + '\n';
                continue;
            }

            out += `# línea no soportada: ${line}\n`;
        }

        return out || '(sin salida)';
    }

    if (loadBtn && exampleSelect && editor) {
        loadBtn.addEventListener('click', () => {
            const ex = exampleSelect.value;
            editor.value = EXAMPLES[ex] || '';
        });
    }

    if (runBtn && editor && outputEl) {
        runBtn.addEventListener('click', () => {
            const code = editor.value || '';
            outputEl.textContent = 'Ejecutando...';
            setTimeout(() => { // simulate async
                outputEl.textContent = runPythonSim(code);
            }, 200);
        });
    }

    if (clearBtn && outputEl) {
        clearBtn.addEventListener('click', () => { outputEl.textContent = '(sin salida)'; });
    }

    if (copyBtn && editor) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard?.writeText(editor.value).then(() => {
                copyBtn.textContent = 'Copiado!';
                setTimeout(() => { copyBtn.textContent = 'Copiar'; }, 1200);
            }).catch(() => { alert('No se pudo copiar al portapapeles.'); });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const buscarBtn = document.getElementById('buscar-curso');
    const authModal = document.getElementById('auth-modal');
    const authOverlay = document.getElementById('auth-overlay');
    const authClose = document.getElementById('auth-close');
    const showLogin = document.getElementById('show-login');
    const showRegister = document.getElementById('show-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    function openModal() {
        authModal.classList.remove('hidden');
        authModal.setAttribute('aria-hidden', 'false');
        setTimeout(() => {
            const first = authModal.querySelector('input');
            if (first) first.focus();
        }, 50);
    }
    function closeModal() {
        authModal.classList.add('hidden');
        authModal.setAttribute('aria-hidden', 'true');
    }

    buscarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    authOverlay.addEventListener('click', closeModal);
    authClose.addEventListener('click', closeModal);

    showLogin.addEventListener('click', () => {
        showLogin.classList.add('active');
        showRegister.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });
    showRegister.addEventListener('click', () => {
        showRegister.classList.add('active');
        showLogin.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    loginForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        console.log('Iniciar sesión', {
            email: document.getElementById('login-email').value
        });
        closeModal();
    });
    registerForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const p1 = document.getElementById('reg-pass').value;
        const p2 = document.getElementById('reg-pass2').value;
        if (p1 !== p2) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        console.log('Registrar', {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value
        });
        closeModal();
    });

    document.addEventListener('keydown', (k) => {
        if (k.key === 'Escape') closeModal();
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    #dark-mode-toggle {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(88, 92, 133, 0.9);
        border: 2px solid white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    #dark-mode-toggle:hover {
        transform: scale(1.1);
        background-color: rgba(88, 92, 133, 1);
    }
    
    /* MODO OSCURO */
    body.dark-mode {
        background-color: #0f0f0f;
        color: #e8e8e8;
        background-image: url(https://s44783.pcdn.co/wp-content/uploads/sites/6/2024/08/programming-background-with-person-working-with-codes-computer-scaled.jpg.optimal.jpg) !important;
        background-size: cover;
        background-attachment: fixed;
        position: relative;
    }
    
    body.dark-mode::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(15, 15, 15, 0.75);
        z-index: -1;
        pointer-events: none;
    }
    
    body.dark-mode #contenedor {
        background-color: #0f0f0f;
    }
    
    body.dark-mode header {
        background-color: #1a1a2e;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }
    
    body.dark-mode #tit-head {
        color: #64b5f6;
        text-shadow: 0 2px 8px rgba(100, 181, 246, 0.3);
    }
    
    body.dark-mode .nav_item {
        background-color: #0d47a1;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    }
    
    body.dark-mode .nav_item:hover {
        background-color: #64b5f6;
        color: #0f0f0f;
    }
    
    body.dark-mode .enlaces_nav {
        color: #e0e0e0;
    }
    
    body.dark-mode .enlaces_nav:hover {
        color: #0f0f0f;
    }
    
    body.dark-mode #introduccion {
        background-color: #0f0f0f;
    }
    
    body.dark-mode .porque-que_son {
        background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(13, 71, 161, 0.15) 100%);
        color: #e8e8e8;
        border-left: 4px solid #64b5f6;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }
    
    body.dark-mode .tit-intro {
        color: #64b5f6;
    }
    
    body.dark-mode #tit-leng-pop {
        background-color: #1a1a2e;
        color: #64b5f6;
        border-bottom: 3px solid #64b5f6;
    }
    
    body.dark-mode #leng-pop {
        background-color: #0f0f0f;
    }
    
    body.dark-mode .logos-leng {
        background: linear-gradient(135deg, #1a1a2e 0%, #0d47a1 100%);
        box-shadow: 0 4px 12px rgba(100, 181, 246, 0.1);
    }
    
    body.dark-mode .tit-logo {
        background-color: rgba(100, 181, 246, 0.15);
        color: #64b5f6;
    }
    
    body.dark-mode #tit-comparativa {
        background-color: #1a1a2e;
        color: #64b5f6;
        border-bottom: 3px solid #64b5f6;
    }
    
    body.dark-mode .table-container {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    }
    
    body.dark-mode .comparativa-table {
        background-color: #1a1a2e;
        color: #e8e8e8;
    }
    
    body.dark-mode .comparativa-table thead {
        background: linear-gradient(135deg, #0d47a1 0%, #1a237e 100%);
    }
    
    body.dark-mode .comparativa-table thead th {
        color: #64b5f6;
        border-bottom: 2px solid #64b5f6;
    }
    
    body.dark-mode .comparativa-table tbody td {
        color: #e8e8e8;
        border-bottom-color: rgba(100, 181, 246, 0.1);
    }
    
    body.dark-mode .comparativa-table tbody tr:hover {
        background-color: rgba(100, 181, 246, 0.1);
    }
    
    body.dark-mode .comparativa-table .aspecto {
        color: #64b5f6;
        font-weight: 700;
    }
    
    body.dark-mode #pie_web {
        background-color: #0d0d1a;
        color: #b0b0b0;
        border-top: 2px solid #64b5f6;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.5);
    }
    
    body.dark-mode #dark-mode-toggle {
        background-color: rgba(100, 181, 246, 0.85);
        border-color: #64b5f6;
        box-shadow: 0 4px 12px rgba(100, 181, 246, 0.3);
    }
    
    body.dark-mode #dark-mode-toggle:hover {
        background-color: #64b5f6;
        box-shadow: 0 6px 16px rgba(100, 181, 246, 0.5);
    }

    
`;
document.head.appendChild(style);







