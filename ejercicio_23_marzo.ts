// Ejercicio 23 Marzo
//* Encuentre la nota mas alta de un estudiante
// * Encuentre la nota mas alta de un curso.
// * Valide si un estudiante tiene notas que tienen sentido
// *  - Una nota tiene sentido si su valor está entre 0 y 5, su peso es mayor que 0% y menor o igual a 100%,
// *      y la suma de todos los pesos no supera 100%
// * Encuentre todos los estudiantes en riesgo de perder la materia.
// *  - Un estudiante se considera en riesgo de perder la materia si ya tiene
// *      más del 80% de las notas, y su promedio acumulado es menor o igual a 3.5

type Nota = {
    nota: number;
    peso: number;
};

type Estudiante = {
    nombre: string;
    notas: Nota[];
};

const cursoProgramacion: Estudiante[] = [
    {
        nombre: "Juan",
        notas: [
            { nota: 4, peso: 10 },
            { nota: 3.5, peso: 20 },
            { nota: 4.8, peso: 25 },
            { nota: 2.5, peso: 15 },
            { nota: 4, peso: 30 },
        ],
    },
    {
        nombre: "Ana",
        notas: [
            { nota: 3.2, peso: 10 },
            { nota: 4.5, peso: 20 },
            { nota: 3, peso: 25 },
            { nota: 3, peso: 15 },
            { nota: 2.5, peso: 30 },
        ],
    },
    {
        nombre: "Pedro",
        notas: [
            { nota: 2, peso: 10 },
            { nota: 2, peso: 20 },
            { nota: 2, peso: 25 },
            { nota: 2, peso: 15 },
            { nota: 2, peso: 10 },
        ],
    },
];

function notaMasAlta(estudiante: Estudiante): number {
    let notaMaxima = 0;
    for (let i = 0; i < estudiante.notas.length; i++) {
        const nota = estudiante.notas[i];
        if (nota.nota > notaMaxima) {
        notaMaxima = nota.nota;
        }
    }
    return notaMaxima;
}

function notaMasAltaCurso(estudiantes: Estudiante[]): number {
    let notaMaxima = 0;
    for (let i = 0; i < estudiantes.length; i++) {
        const estudiante = estudiantes[i];
        const notaEstudiante = notaMasAlta(estudiante);
        if (notaEstudiante > notaMaxima) {
        notaMaxima = notaEstudiante;
        }
    }
    return notaMaxima;
}

function notasTienenSentido(estudiante: Estudiante): boolean {
    let sumaPesos = 0;
    for (let i = 0; i < estudiante.notas.length; i++) {
        const nota = estudiante.notas[i];
        if (nota.nota < 0 || nota.nota > 5) {
            return false;
        }
        if (nota.peso <= 0 || nota.peso > 100) {
            return false;
        }
        sumaPesos += nota.peso;
    }
    return sumaPesos <= 100;
}

function estudiantesEnRiesgo(estudiantes: Estudiante[]): Estudiante[] {
    const resultado: Estudiante[] = [];
    for (let i = 0; i < estudiantes.length; i++) {
        const estudiante = estudiantes[i];
        const pesosAcumulados = estudiante.notas.reduce((acumulado, nota) => acumulado + nota.peso, 0);
        const notasAcumuladas = estudiante.notas.reduce((acumulado, nota) => acumulado + nota.nota * nota.peso / 100, 0);
        if (pesosAcumulados >= 80 && notasAcumuladas <= 3.5) {
            resultado.push(estudiante);
        }
    }
    return resultado;
}

for (let i = 0; i < cursoProgramacion.length; i++) {
    const estudiante = cursoProgramacion[i];
    console.log(
        `La nota más alta de ${estudiante.nombre} es ${notaMasAlta(estudiante)}`
    );
}

let notaMaximaCurso = 0;
for (let i = 0; i < cursoProgramacion.length; i++) {
    const estudiante = cursoProgramacion[i];
    const notaMaximaEstudiante = notaMasAlta(estudiante);
    if (notaMaximaEstudiante > notaMaximaCurso) {
        notaMaximaCurso = notaMaximaEstudiante;
    }
}
console.log(`La nota más alta del curso es ${notaMaximaCurso}`);

for (let i = 0; i < cursoProgramacion.length; i++) {
    const estudiante = cursoProgramacion[i];
    console.log(
        `Las notas de ${estudiante.nombre} tienen sentido: ${notasTienenSentido(estudiante)}`
    );
}

const estudiantesEnRiesgoalto = estudiantesEnRiesgo(cursoProgramacion);

console.log("Estudiantes en riesgo de perder la materia:");
for (let i = 0; i < estudiantesEnRiesgoalto.length; i++) {
    console.log(estudiantesEnRiesgoalto[i].nombre);
}
