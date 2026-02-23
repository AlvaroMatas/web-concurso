document.addEventListener('DOMContentLoaded', () => {
    
    // 1. EFECTO TYPING EN EL TÍTULO
    const typewriterTitle = () => {
        const el = document.getElementById('tit-head');
        if (!el) return;
        const text = "Lenguajes de Programación 💻";
        el.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    };
    typewriterTitle();

    // 2. DETECTAR LENGUAJE ACTUAL
    const path = window.location.pathname.toLowerCase();
    let currentLang = 'python';
    if(path.includes('javascript')) currentLang = 'javascript';
    if(path.includes('java.html')) currentLang = 'java';
    if(path.includes('c.html')) currentLang = 'csharp';

    // 3. FUNCIONALIDAD DEL SIMULADOR
    const editor = document.getElementById('editor-code');
    const runBtn = document.getElementById('run-code');
    const output = document.getElementById('simulator-output');
    const copyBtn = document.getElementById('copy-code');
    const clearBtn = document.getElementById('clear-output');

    if(runBtn) {
        runBtn.addEventListener('click', () => {
            const code = editor.value.trim();
            output.textContent = "Procesando...";
            
            // Simulación de ejecución real
            setTimeout(() => {
                if (code === "") {
                    output.textContent = "Error: El editor está vacío.";
                } else if (code.includes('print') || code.includes('console.log') || code.includes('System.out') || code.includes('Console.Write')) {
                    output.textContent = "> " + (code.match(/"([^"]+)"/) ? code.match(/"([^"]+)"/)[1] : "Código ejecutado con éxito.");
                } else {
                    output.textContent = "Error de sintaxis: Comando no reconocido en la simulación.";
                }
            }, 500);
        });
    }

    // 4. BOTÓN COPIAR (Puntos extra por UX)
    if(copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(editor.value);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "¡Copiado!";
            copyBtn.style.backgroundColor = "#4caf50";
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = "";
            }, 2000);
        });
    }

    // 5. BOTÓN LIMPIAR
    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            editor.value = '';
            output.textContent = '(sin salida)';
        });
    }

    // 6. MOSTRAR/OCULTAR EJEMPLO HOLA MUNDO
    const btnHola = document.getElementById('boton-codigo-ejemplo');
    const txtHola = document.getElementById('codigo-ejemplo-text');
    const resHola = document.getElementById('resultado-ejemplo-text');

    if(btnHola) {
        btnHola.addEventListener('click', () => {
            txtHola.classList.toggle('visible');
            resHola.classList.toggle('visible');
            btnHola.textContent = txtHola.classList.contains('visible') ? "Ocultar Código" : "Mostrar Código";
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATOS DE LENGUAJES (Simulando el JSON que pasaste)
    const languages = [
        { id: "python", name: "Python", logo: "python-removebg-preview.png", year: 1991, typing: "Dinámico", rank: 1 },
        { id: "javascript", name: "JavaScript", logo: "javascript-removebg-preview.png", year: 1995, typing: "Dinámico", rank: 2 },
        { id: "java", name: "Java", logo: "java-removebg-preview.png", year: 1995, typing: "Estático", rank: 3 },
        { id: "csharp", name: "C#", logo: "C_-removebg-preview.png", year: 2000, typing: "Estático", rank: 4 }
    ];

    // 2. LLENAR TABLA AUTOMÁTICAMENTE
    const tbody = document.getElementById('datos-leng-tbody');
    if (tbody) {
        languages.forEach(lang => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${lang.logo}" width="40" alt="${lang.name}"></td>
                <td><strong>${lang.name}</strong></td>
                <td>${lang.year}</td>
                <td>${lang.typing}</td>
                <td>#${lang.rank}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // 3. BUSCADOR EN TIEMPO REAL
    const searchInput = document.getElementById('input-busqueda');
    const resultsDiv = document.getElementById('resultados-busqueda');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            resultsDiv.innerHTML = '';

            if (term.length > 0) {
                const filtered = languages.filter(l => l.name.toLowerCase().includes(term));
                
                filtered.forEach(l => {
                    const item = document.createElement('div');
                    item.className = 'result-item';
                    item.innerHTML = `
                        <span>${l.name} (${l.year})</span>
                        <small style="color: #3498db">Ver más →</small>
                    `;
                    item.onclick = () => window.location.href = `${l.id === 'csharp' ? 'c' : l.id}.html`;
                    resultsDiv.appendChild(item);
                });
            }
        });
    }
});
});






