document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EFECTO TYPING EN EL TÍTULO ---
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

    // --- 2. FUNCIONALIDAD DEL SIMULADOR (Páginas individuales) ---
    const editor = document.getElementById('editor-code');
    const runBtn = document.getElementById('run-code');
    const output = document.getElementById('simulator-output');
    const copyBtn = document.getElementById('copy-code');
    const clearBtn = document.getElementById('clear-output');

    if(runBtn && editor) {
        runBtn.addEventListener('click', () => {
            const code = editor.value.trim();
            output.textContent = "Procesando...";
            
            setTimeout(() => {
                if (code === "") {
                    output.textContent = "Error: El editor está vacío.";
                } else if (code.includes('print') || code.includes('console.log') || code.includes('System.out') || code.includes('Console.Write')) {
                    // Extrae el texto entre comillas para simular la salida
                    const match = code.match(/"([^"]+)"/);
                    output.textContent = "> " + (match ? match[1] : "Código ejecutado con éxito.");
                } else {
                    output.textContent = "Error de sintaxis: Comando no reconocido en la simulación.";
                }
            }, 500);
        });
    }

    if(copyBtn && editor) {
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

    if(clearBtn && editor) {
        clearBtn.addEventListener('click', () => {
            editor.value = '';
            output.textContent = '(sin salida)';
        });
    }

    // --- 3. MOSTRAR/OCULTAR EJEMPLO HOLA MUNDO ---
    const btnHola = document.getElementById('boton-codigo-ejemplo');
    const txtHola = document.getElementById('codigo-ejemplo-text');
    const resHola = document.getElementById('resultado-ejemplo-text');

    if(btnHola && txtHola) {
        btnHola.addEventListener('click', () => {
            txtHola.classList.toggle('visible');
            resHola.classList.toggle('visible');
            btnHola.textContent = txtHola.classList.contains('visible') ? "Ocultar Código" : "Mostrar Código";
        });
    }

    // --- 4. COMPARADOR DE LENGUAJES (Index.html) ---
    const dataLenguajes = {
        python: {
            nombre: "Python",
            uso: "IA, Ciencia de Datos, Backend",
            dificultad: "Baja (Muy legible)",
            rendimiento: "Medio",
            tipado: "Dinámico",
            empresa: "Google, Instagram"
        },
        javascript: {
            nombre: "JavaScript",
            uso: "Web Frontend, Node.js, Mobile",
            dificultad: "Media",
            rendimiento: "Alto (en V8 Engine)",
            tipado: "Dinámico",
            empresa: "Facebook, Netflix"
        },
        java: {
            nombre: "Java",
            uso: "Apps Empresariales, Android",
            dificultad: "Alta",
            rendimiento: "Muy Alto",
            tipado: "Estático",
            empresa: "Bancos, Amazon"
        },
        csharp: {
            nombre: "C#",
            uso: "Videojuegos (Unity), Windows",
            dificultad: "Media/Alta",
            rendimiento: "Muy Alto",
            tipado: "Estático",
            empresa: "Microsoft, Ubisoft"
        }
    };

    const btnComparar = document.getElementById('btn-comparar');
    const selectL1 = document.getElementById('lang1');
    const selectL2 = document.getElementById('lang2');
    const tableResult = document.getElementById('resultado-comparativa');
    const bodyComp = document.getElementById('body-comparativa');
    const nameL1 = document.getElementById('name-l1');
    const nameL2 = document.getElementById('name-l2');

    if (btnComparar) {
        btnComparar.addEventListener('click', () => {
            const l1 = dataLenguajes[selectL1.value];
            const l2 = dataLenguajes[selectL2.value];

            // Actualizar nombres en la cabecera
            nameL1.textContent = l1.nombre;
            nameL2.textContent = l2.nombre;

            // Limpiar tabla anterior
            bodyComp.innerHTML = "";

            // Definir qué aspectos comparar
            const aspectos = [
                { etiqueta: "Uso Principal", clave: "uso" },
                { etiqueta: "Dificultad de Aprendizaje", clave: "dificultad" },
                { etiqueta: "Rendimiento", clave: "rendimiento" },
                { etiqueta: "Tipo de Tipado", clave: "tipado" },
                { etiqueta: "Empresas que lo usan", clave: "empresa" }
            ];

            // Construir filas
            aspectos.forEach(asp => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td class="aspecto" style="font-weight: bold; background-color: #f4f4f4;">${asp.etiqueta}</td>
                    <td>${l1[asp.clave]}</td>
                    <td>${l2[asp.clave]}</td>
                `;
                bodyComp.appendChild(fila);
            });

            // Mostrar la tabla y bajar suavemente
            tableResult.style.display = "block";
            tableResult.scrollIntoView({ behavior: 'smooth' });
        });
    }
});






