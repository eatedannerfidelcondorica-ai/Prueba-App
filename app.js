
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const totalTareas = document.getElementById("totalTareas");
const completadas = document.getElementById("completadas");
const pendientes = document.getElementById("pendientes");

const barraProgreso = document.getElementById("barraProgreso");
const porcentaje = document.getElementById("porcentaje");

const darkModeBtn = document.getElementById("darkModeBtn");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

/* ==========================
   GUARDAR EN LOCALSTORAGE
========================== */

function guardarTareas() {
    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );
}

/* ==========================
   MOSTRAR TAREAS
========================== */

function mostrarTareas() {

    taskList.innerHTML = "";

    tareas.forEach((tarea, index) => {

        const div = document.createElement("div");

        div.classList.add("task");

        if (tarea.completada) {
            div.classList.add("completada");
        }

        div.innerHTML = `
            <h3>${tarea.titulo}</h3>

            <p>
                <strong>Materia:</strong>
                ${tarea.materia}
            </p>

            <p>
                <strong>Fecha:</strong>
                ${tarea.fecha}
            </p>

            <button onclick="completarTarea(${index})">
                ${
                    tarea.completada
                    ? "✓ Completada"
                    : "Completar"
                }
            </button>

            <button onclick="eliminarTarea(${index})">
                Eliminar
            </button>
        `;

        taskList.appendChild(div);
    });

    actualizarEstadisticas();
}

/* ==========================
   AGREGAR TAREA
========================== */

taskForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const titulo =
        document.getElementById("titulo").value;

    const materia =
        document.getElementById("materia").value;

    const fecha =
        document.getElementById("fecha").value;

    tareas.push({
        titulo,
        materia,
        fecha,
        completada: false
    });

    guardarTareas();

    mostrarTareas();

    taskForm.reset();
});

/* ==========================
   ELIMINAR
========================== */

function eliminarTarea(index) {

    tareas.splice(index, 1);

    guardarTareas();

    mostrarTareas();
}

/* ==========================
   COMPLETAR
========================== */

function completarTarea(index) {

    tareas[index].completada =
    !tareas[index].completada;

    guardarTareas();

    mostrarTareas();
}

/* ==========================
   ESTADÍSTICAS
========================== */

function actualizarEstadisticas() {

    let total = tareas.length;

    let hechas = tareas.filter(
        tarea => tarea.completada
    ).length;

    let faltan = total - hechas;

    totalTareas.textContent = total;
    completadas.textContent = hechas;
    pendientes.textContent = faltan;

    let progreso = 0;

    if (total > 0) {
        progreso = (hechas / total) * 100;
    }

    barraProgreso.style.width =
        progreso + "%";

    porcentaje.textContent =
        Math.round(progreso) + "%";
}

/* ==========================
   MODO OSCURO
========================== */

if (
    localStorage.getItem("modoOscuro")
    === "true"
) {
    document.body.classList.add("dark");
}

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "modoOscuro",
        document.body.classList.contains("dark")
    );
});

/* ==========================
   INICIO
========================== */

mostrarTareas();
