document.addEventListener('DOMContentLoaded', function () {
    const calcularBtn = document.getElementById('calcular');
    const generarPdfBtn = document.getElementById('generar-pdf');
    const resultadosDiv = document.getElementById('resultados');

    calcularBtn.addEventListener('click', calcularPuntuacion);
    generarPdfBtn.addEventListener('click', generarPDF);

    function calcularPuntuacion() {
        const nombre = document.getElementById('nombre').value.trim();
        if (!nombre) {
            alert('Por favor ingresa el nombre del estudiante');
            return;
        }

        document.getElementById('nombre-estudiante').textContent = nombre;

        const puntuaciones = {
            mates: calcularMateria('mates', 30, 3),
            lectura: calcularMateria('lectura', 27, 3),
            naturales: calcularMateria('naturales', 39, 3),
            sociales: calcularMateria('sociales', 33, 3),
            ingles: calcularMateria('ingles', 35, 1)
        };

        const sumaPonderada = puntuaciones.mates.ponderada +
            puntuaciones.lectura.ponderada +
            puntuaciones.naturales.ponderada +
            puntuaciones.sociales.ponderada +
            puntuaciones.ingles.ponderada;

        const puntuacionTotal = (sumaPonderada / 13) * 5;
        const puntuacionTotalRedondeada = Math.ceil(puntuacionTotal);

        // Mostrar resultados por materia
        for (let id in puntuaciones) {
            const datos = puntuaciones[id];
            document.getElementById(`puntaje-${id}`).textContent = Math.ceil(datos.porcentaje);
            document.getElementById(`detalle-${id}`).textContent =
                `Ponderación: ${Math.ceil(datos.ponderada)}`;
        }

        // Mostrar total
        document.getElementById('puntaje-total').textContent = puntuacionTotalRedondeada;
        document.getElementById('detalle-total').textContent =
            `Ponderación total: ${Math.ceil(sumaPonderada)} / 13 × 5 = ${puntuacionTotalRedondeada}`;

        resultadosDiv.classList.remove('hidden');
    }

    function calcularMateria(materia, total, ponderacion) {
        const correctas = parseFloat(document.getElementById(`correctas-${materia}`).value);

        if (isNaN(correctas) || correctas < 0 || correctas > total) {
            alert(`Por favor ingresa un valor válido para ${materia} (entre 0 y ${total})`);
            throw new Error('Valor inválido');
        }

        const porcentaje = (correctas / total) * 100;
        const ponderada = porcentaje * ponderacion;

        return {
            correctas,
            total,
            ponderacion,
            porcentaje,
            ponderada
        };
    }

    function generarPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text('Resultados Reto Del Buho', 105, 20, { align: 'center' });

        doc.setFontSize(14);
        doc.text(`Nombre: ${document.getElementById('nombre').value}`, 15, 35);

        const fecha = new Date().toLocaleDateString();
        doc.text(`Fecha: ${fecha}`, 15, 45);

        let y = 60;
        doc.setFontSize(12);
        doc.setFillColor(200, 200, 200);
        doc.rect(15, y, 180, 10, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text('Materia', 20, y + 7);
        doc.text('Puntaje/100', 100, y + 7);
        doc.text('Ponderación', 140, y + 7);
        y += 15;

        const materias = ['mates', 'lectura', 'naturales', 'sociales', 'ingles'];
        const nombresMaterias = {
            'mates': 'Matemáticas',
            'lectura': 'Lectura',
            'naturales': 'Ciencias Naturales',
            'sociales': 'Sociales y Ciudadanas',
            'ingles': 'Inglés'
        };

        materias.forEach(materia => {
            const puntaje = document.getElementById(`puntaje-${materia}`).textContent;
            const detalle = document.getElementById(`detalle-${materia}`).textContent;
            doc.text(nombresMaterias[materia], 20, y);
            doc.text(puntaje, 100, y);
            doc.text(detalle.replace('Ponderación: ', ''), 140, y);
            y += 10;
        });

        y += 10;
        doc.setFontSize(14);
        doc.text('Puntuación Total:', 20, y);
        doc.text(document.getElementById('puntaje-total').textContent, 100, y);
        y += 10;
        doc.setFontSize(10);
        doc.text(document.getElementById('detalle-total').textContent, 20, y, { maxWidth: 180 });

        doc.save(`Resultados_${document.getElementById('nombre').value.replace(/ /g, '_')}.pdf`);
    }
});
