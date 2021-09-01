
let preguntas_incorrectas = [];
let getData = [];
let next = 0;
let respuestaUser;
let incorrectasUser = [];
let correctasUser = [];
let score = 0;
let eroor = 0;

scoremaximo = document.getElementById("scoremaximo")
const form = document.getElementById("main-form")
const inicio = document.getElementById("inicio");
const maincontent = document.getElementById("main-content")
const Reset = document.getElementById("Reset")
let radiobutton = document.getElementsByName(`respuesta${next}`)

let verScore = localStorage.getItem('puntaje');
scoremaximo.value = verScore


const buscarCategory = (NumberOfQuestions, category) => {

    if (category === "any") {
        let urlBase = `https://opentdb.com/api.php?amount=${NumberOfQuestions}`
        buscarDifficulty()
        return urlBase
    } else {
        let urlBase = `https://opentdb.com/api.php?amount=${NumberOfQuestions}&category=${category}`
        return urlBase
    }

}

const buscarDifficulty = (urlBase, difficulty) => {
    if (difficulty === "any") {
        urlBase = ``
        return urlBase
    } else {
        urlBase = `&difficulty=${difficulty}`
        return urlBase
    }

}

const buscarType = (urlBase, type) => {
    if (type === "any") {
        urlBase = ``
        return urlBase
    } else {
        urlBase = `&type=${type}`
        return urlBase
    }

}

const imgCategory = (category) => {


    if (category === "General Knowledge") {
        imagen = "assets/img/iconos/conocimiento.svg"
        return imagen
    } else if (category === "Entertainment: Books") {
        imagen = "assets/img/iconos/book.svg"
        return imagen
    }
    else if (category === "Entertainment: Film") {
        imagen = "assets/img/iconos/peliculas.svg"
        return imagen
    }
    else if (category === "Entertainment: Music") {
        imagen = "assets/img/iconos/musica.svg"
        return imagen
    }
    else if (category === "Entertainment: Musicals & Theatres") {
        imagen = "assets/img/iconos/musical&teatro.svg"
        return imagen
    } else if (category === "Entertainment: Television") {
        imagen = "assets/img/iconos/television.svg"
        return imagen
    }
    else if (category === "Entertainment: Video Games") {
        imagen = "assets/img/iconos/gamepad.svg"
        return imagen
    }
    else if (category === "Entertainment: Board Games") {
        imagen = "assets/img/iconos/juegosmesa.svg"
        return imagen
    }
    else if (category === "Science & Nature") {
        imagen = "assets/img/iconos/molecules.svg"
        return imagen
    } else if (category === "Science: Computers") {
        imagen = "assets/img/iconos/computer.svg"
        return imagen
    }
    else if (category === "Science: Mathematics") {
        imagen = "assets/img/iconos/matematicas.svg"
        return imagen
    }
    else if (category === "Mythology") {
        imagen = "assets/img/iconos/Mythology-zeus.svg"
        return imagen
    }
    else if (category === "Sports") {
        imagen = "assets/img/iconos/Sports.svg"
        return imagen
    } else if (category === "Geography") {
        imagen = "assets/img/iconos/globe.svg"
        return imagen
    }
    else if (category === "History") {
        imagen = "assets/img/iconos/historia.svg"
        return imagen
    }
    else if (category === "Politics") {
        imagen = "assets/img/iconos/politica.svg"
        return imagen
    }
    else if (category === "Art") {
        imagen = "assets/img/iconos/arte.svg"
        return imagen
    } else if (category === "Celebrities") {
        imagen = "assets/img/iconos/celebridades.svg"
        return imagen
    } else if (category === "Animals") {
        imagen = "assets/img/iconos/animal.svg"
        return imagen
    }
    else if (category === "Vehicles") {
        imagen = "assets/img/iconos/vehiculos.svg"
        return imagen
    }
    else if (category === "Entertainment: Comics") {
        imagen = "assets/img/iconos/comic.svg"
        return imagen
    }
    else if (category === "Science: Gadgets") {
        imagen = "assets/img/iconos/Gadgets.svg"
        return imagen
    }
    else if (category === "Entertainment: Japanese Anime & Manga") {
        imagen = "assets/img/iconos/JapaneseAnime.svg"
        return imagen
    }
    else if (category === "Entertainment: Cartoon & Animations") {
        imagen = "assets/img/iconos/Cartoon&Animations.svg"
        return imagen
    }
}


const empezar = (event) => {

    inicio.style.display = "none"
    maincontent.style.display = "flex"

    let urlBase = ""
    event.preventDefault();

    let NumberOfQuestions = document.getElementById("NumeroPreguntas").value;
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficulty").value;
    let type = document.getElementById("type").value;

    urlBase = buscarCategory(NumberOfQuestions, category)
    urlBase += buscarDifficulty(urlBase, difficulty)
    urlBase += buscarType(urlBase, type)
    fetch(urlBase).then(response => response.json())
        .then(resultado => guardarConsulta(resultado.results));
}

const guardarConsulta = resultado => {
    getData = resultado;
    mostrarpreguntas()

}
const nextpag = () => {

    ++next
    //reasigno variable radioButton
    mostrarpreguntas()
    radiobutton = document.getElementsByName(`respuesta${next}`)


}


const barajearpreguntas = () => {
    for (let i = preguntas_incorrectas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [preguntas_incorrectas[i], preguntas_incorrectas[j]] = [preguntas_incorrectas[j], preguntas_incorrectas[i]];
    }
}


const respuestasSelecionadas = () => {

    //RECORRO LOS RADIO BUTTON Y VERIFICO CUAL ESTA CHEQUEADO

    for (let q = 0; q < radiobutton.length; q++) {
        const element = radiobutton[q];
        if (element.checked) {
            respuestaUser = element.value
            if (respuestaUser === getData[next - 1].correct_answer) {
                correctasUser.push(respuestaUser);
                ++score
            } else {
                incorrectasUser.push(respuestaUser)
            }
        }


    }

}

const mostrarpreguntas = () => {
    respuestasSelecionadas()
    if (next >= getData.length) {
        next = getData.length;
        maincontent.innerText = ""
        next = 0;
        resultadoFinal()

    } else {

        maincontent.innerText = ""
        preguntasDesordenadas = [];
        //AGREGAR LAS RESPUESTAS EN UN SOLO ARREGLO
        preguntas_incorrectas = getData[next].incorrect_answers
        preguntas_incorrectas.push(getData[next].correct_answer)
        barajearpreguntas()

        //RESPUESTA CORRECTA EN CONSOLA
        console.log(getData[next].correct_answer)

        // CREACION DE ELEMENTOS HTML
        const imgcategoria = document.createElement("img")
        const tituloCategoria = document.createElement("h2")
        const numeroDePreguntas = document.createElement("h1")
        const preguntas = document.createElement("h3")
        const containerTitleCategory = document.createElement("div")
        const containerContadorPregunta = document.createElement("div")
        const mainRespuesta = document.createElement("div")
        const contentRespuesta = document.createElement("div")

        // AGREGANDO CONTENIDO A LOS ELEMNTOS HTML

        tituloCategoria.innerText = getData[next].category
        numeroDePreguntas.innerText = `Pregunta # ${next + 1}`
        preguntas.innerHTML = getData[next].question


        // AGREGANDO ATRIBUTOS A LOS ELEMENTOS

        containerTitleCategory.className = "containerTitleCategory"
        imgcategoria.src = imgCategory(getData[next].category)
        imgcategoria.className = "img-category"

        tituloCategoria.className = "titlecategory"

        numeroDePreguntas.className = "numeroPreguntas"
        preguntas.className = "preguntas"

        mainRespuesta.className = "main-respuesta"
        contentRespuesta.className = "content-Respuesta"


        //Crea las respuestas con su radio buttom 
        for (let i = 0; i < preguntas_incorrectas.length; i++) {
            //Creacion de los elementos
            const radiobutton = document.createElement("input")
            const labelrespuestas = document.createElement("label")
            //Agregando contenido 
            labelrespuestas.innerHTML = preguntas_incorrectas[i]
            //Agregando atributos
            labelrespuestas.className = "main-label"
            radiobutton.type = "radio"
            radiobutton.name = `respuesta${next}`
            radiobutton.value = preguntas_incorrectas[i]
            radiobutton.className = "main-redio"
            //agregando al contenedor 
            mainRespuesta.appendChild(contentRespuesta)
            labelrespuestas.appendChild(radiobutton)
            contentRespuesta.appendChild(labelrespuestas)
            // contentRespuesta.appendChild(labelrespuestas)
            // labelrespuestas.appendChild(radiobutton)
        }

        // AGREGANDO ELEMENTOS AL HTML
        maincontent.appendChild(containerTitleCategory)
        containerTitleCategory.appendChild(imgcategoria)
        containerTitleCategory.appendChild(tituloCategoria)

        maincontent.appendChild(containerContadorPregunta)
        containerContadorPregunta.appendChild(numeroDePreguntas)

        maincontent.appendChild(preguntas)
        maincontent.appendChild(mainRespuesta)


        // buttonNext.disabled = false;
    }


}

maincontent.addEventListener("click", (e) => {

    //    console.log(e.target.nodeName===INPUT)

    if (e.target.nodeName === "INPUT") {
        nextpag()
    } else if (e.srcElement.innerText === "Finish") {
        inicio.style.display = "block"
        maincontent.style.display = "none"
        mostrarScore()
        maincontent.innerText = ""


    }
})



const resultadoFinal = () => {

    getData.forEach((element, index) => {

        // CREACION DE ELEMENTOS HTML
        const ResultadoFinal = document.createElement("h1")
        const preguntas_correctas = document.createElement("h2")
        const totalScore = document.createElement("h2")
        const anteriroScore = document.createElement("h2")

        const imgcategoria = document.createElement("img")
        const tituloCategoria = document.createElement("h3")
        const numeroDePreguntas = document.createElement("h2")
        const preguntas = document.createElement("h4")
        const containerTitleCategory = document.createElement("div")
        const containerContadorPregunta = document.createElement("div")
        const containerbutton = document.createElement("div")
        const buttoomFinihs = document.createElement("button")
        const mainRespuesta = document.createElement("div")
        const contentRespuesta = document.createElement("div")

        // AGREGANDO CONTENIDO A LOS ELEMNTOS HTML
        ResultadoFinal.innerText = "Resultado"
        preguntas_correctas.innerHTML = `Respuestas Correctas ${score} De ${getData.length}`
        totalScore.innerText = `Total Puntaje ${score * 50}`
        anteriroScore.innerText = `Puntaje Anterior ${localStorage.getItem("puntaje")}`
        tituloCategoria.innerText = element.category
        numeroDePreguntas.innerHTML = `Pregunta # ${index + 1}`
        preguntas.innerHTML = element.question

        // AGREGANDO ATRIBUTOS A LOS ELEMENTOS
        ResultadoFinal.className = "ResultadoFinal"
        preguntas_correctas.className = "preguntas_correctas"
        totalScore.className = "totalScore"
        anteriroScore.className = "anteriroScore"
        containerTitleCategory.className = "containerTitleCategory"
        imgcategoria.src = imgCategory(element.category)
        imgcategoria.className = "img-category"

        tituloCategoria.className = "titlecategory"

        numeroDePreguntas.className = "numeroPreguntas"
        preguntas.className = "preguntas"

        mainRespuesta.className = "main-respuesta"
        contentRespuesta.className = "content-Respuesta"


        // AGREGANDO ELEMENTOS AL HTML
        if (index === 0) {
            maincontent.appendChild(ResultadoFinal)
            maincontent.appendChild(preguntas_correctas)
            maincontent.appendChild(totalScore)
            maincontent.appendChild(anteriroScore)

            if ((score * 50) > verScore) {
                totalScore.style.color = "#70f770"
                anteriroScore.style.color = "red"
            } else {
                anteriroScore.style.color = "#70f770"
                totalScore.style.color = "red"

            }

        }
        // AGREGO ELEMENTOS AL DOCUMENTE 
        maincontent.appendChild(containerTitleCategory)
        containerTitleCategory.appendChild(imgcategoria)
        containerTitleCategory.appendChild(tituloCategoria)

        maincontent.appendChild(containerContadorPregunta)
        containerContadorPregunta.appendChild(numeroDePreguntas)

        maincontent.appendChild(preguntas)
        maincontent.appendChild(mainRespuesta)

        // CREO EL ELEMENTO QUE CONTENE LAS RESPUESTAS
        // if (element.type !== "boolean") {

            for (let i = 0; i < element.incorrect_answers.length; i++) {
                const labelrespuestas = document.createElement("label")

                const respuestas = element.incorrect_answers[i]
                //Agregando contenido 
                labelrespuestas.innerHTML = respuestas
                //Agregando atributos
                labelrespuestas.className = "main-label"

                //PINTO LAS  RESPUESTAS SI ES CORRECTA O INCORRECTA
                correctasUser.find(correct => {
                    if (respuestas === correct) {
                        labelrespuestas.className = "main-labelCorrecta";
                        console.log(labelrespuestas)
                    }
                })
                incorrectasUser.find(incorrect => {
                    if (respuestas === incorrect) {
                        labelrespuestas.className = "main-labelIncorrecta";
                    }
                })
                //agregando al contenedor 

                mainRespuesta.appendChild(contentRespuesta)
                contentRespuesta.appendChild(labelrespuestas)
            }


        // } else {
        //     for (let x = 0; x < correctasUser.length; x++) {
        //         const respuestaBolean = correctasUser[x];
        //         if(element.correct_answer === respuestaBolean){
        //             console.log("aki")
        //         }
        //     }
        // }





        //AGREGO EL BOTON FINISH
        if (getData.length - 1 === index) {
            containerbutton.className = "container-button"
            buttoomFinihs.className = "Finish"
            buttoomFinihs.innerText = "Finish"
            mainRespuesta.appendChild(containerbutton)
            containerbutton.appendChild(buttoomFinihs)
        }

    });



    Puntaje = score * 50;

    preguntas_incorrectas = [];
    getData = [];
    next = 0;
    respuestaUser;
    incorrectasUser = [];
    correctasUser = [];
    score = 0;
    eroor = 0;


    if (Puntaje > verScore) {
        localStorage.removeItem('puntaje');
        localStorage.setItem("puntaje", Puntaje);
        verScore = Puntaje
    }

    console.log(Puntaje)
    console.log(verScore)
}


const pintarverde = (respuesta) => {
    labelrespuestas.className = "main-labelCorrecta"

    return
}


const mostrarScore = () => {
    scoremaximo.value = verScore

}

const resetScore = () => {
    localStorage.removeItem('puntaje');
    verScore = 0
    scoremaximo.value = 0
}



form.onsubmit = empezar;
Reset.onclick = resetScore
// buttonNext.onclick = nextpag;
//  document.addEventListener("DOMContentLoaded", empezar)