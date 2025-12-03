document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto máquina de escribir en el título
    const typewriterTitle = () => {
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
    };
    
    typewriterTitle();
    
    // 2. Hacer que el título sea clickeable para repetir la animación
    const titleHead = document.getElementById('tit-head');
    if (titleHead) {
        titleHead.style.cursor = 'pointer';
        titleHead.addEventListener('click', typewriterTitle);
    }
    
    // 3. Scroll suave para los enlaces del menú
    document.querySelectorAll('.enlaces_nav').forEach(link => {
        link.addEventListener('click', (e) => {
            // Solo aplicar scroll suave si es un ancla local
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
    
    // 4. Animación al entrar en viewport (cuando se ven los elementos)
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
    
    // Observar elementos
    document.querySelectorAll('.logos-leng, .porque-que_son, .table-container').forEach(el => {
        observer.observe(el);
    });
    
    // 5. Toggle Modo Oscuro
    const createDarkModeToggle = () => {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'dark-mode-toggle';
        toggleBtn.textContent = '🌙';
        toggleBtn.title = 'Alternar modo oscuro';
        document.body.appendChild(toggleBtn);
        
        // Recuperar preferencia guardada
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
});

// Agregar animación CSS dinámicamente
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


