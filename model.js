const Sequelize = require('sequelize');


const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false});

sequelize.define('quiz', {
    question: {
        type: Sequelize.STRING,
        unique: {msg: "Ya existe esta pregunta"},
        validate: {notEmpty: {msg: "La pregunta no puede estar vac�a"}}
    },
    answer: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "La respuesta no puede estar vac�a" }}
    }
});

sequelize.sync()
.then(() => sequelize.models.quiz.count())
.then(count => {
    if (!count) {
        return sequelize.models.quiz.bulkCreate([
            { question: "Capital de Italia", answer: "Roma" },
            { question: "Capital de Francia", answer: "Par�s" },
            { question: "Capital de Espa�a", answer: "Madrid" },
            { question: "Capita del Portugal", answer: "Lisboa" },
        ]);
    }
})
.catch(error => {
    console.log(error);
});

module.exports = sequelize;






























//const fs = require("fs");

//// Nombre del fichero donde se guardan las prguntas.
//// Es un fichero de textocon el JSON de quizzes.
//const DB_FILENAME = "quizzes.json";

//// Modelo de datos.

//// En esta variable se mantienen todos los quizzes existentes.
//// Es un array de objetos, donde cada objeto tiene los atributos question
//// y answer para guardar el texto de la pregunta y el de la respuesta.

//// Al arrancar la aplicaci�n, esta variable contieneestas cuatro preguntas
//// pero al final del m�dulo se llama a load() para cargar las preguntas
//// guardadas en el fichero DB_FILENAME
//let quizzes = [
//    {
//        question: "Capital de Italia: ",
//        answer: "Roma"
//    },
//    {
//        question: "Capital de Francia: ",
//        answer: "Par�s"
//    },
//    {
//        question: "Capital de Espa�a: ",
//        answer: "Madrid"
//    },
//    {
//        question: "Capital de Portugal: ",
//        answer: "Lisboa"
//    }];

///**
// * Carga las preguntas guardadas en el fichero.
// *
// * Este m�todo carga el contenido del fichero DB_FILENAME en la variable quizzes.
// * El contenido de ese fichero est� en formato JSON.
// * La primera vez que se ejecute este m�todo, el fichero DB_FILENAMEno
// * existe, y se producir� el error ENOENT. En este caso se salva el
// * conenido inicial almacenado en quizzes.
// * Si se produce otro tipo de error, se lanza una excepci�n que abortar�
// * la ejecuci�n del programa.
// */
//const load = () => {
//    fs.readFile(DB_FILENAME, (err, data) => {
//        if (err) {
//            // La primera vez no existe el fichero
//            if (err.code === "ENOENT") {
//                save(); //valores iniciales
//                return;
//            }
//            throw err;
//        }
//        let json = JSON.parse(data);
//        if (json) {
//            quizzes = json;
//        }
//    });
//};

///**
// * Guarda las preguntas en el fichero.
// *
// * Guarda en formato JSON el valor de quizzes en el fichero DB_FILENAME.
// * Si se preduce alg�n tipo de error, se lanza una excepci�n que abortar�
// * la ejecuci�n del programa.
// */
//const save = () => {
//    fs.writeFile(DB_FILENAME,
//        JSON.stringify(quizzes),
//        err => {
//            if (err) throw err;
//        });
//};

///**
// * Devuelve el n�mero total de preguntas existentes.
// *
// * @returns {number} n�mero total de preguntas existentes.
// */
//exports.count = () => quizzes.length;

///**
// * A�ade un nuevo quiz.
// *
// * @param  question String con la pregunta.
// * @param  answer String con la respuesta.
// */
//exports.add = (question, answer) => {
//    quizzes.push({
//        question: (question || "").trim(),
//        answer: (answer || "").trim()
//    });
//    save();
//};

///**
// * Actualiza e quiz situado en la posicion index.
// *
// * @param  id   Clave que identifica el quiz a actualizar.
// * @param  question String con la pregunta.
// * @param  answer   String con la respuesta.
// */
//exports.update = (id, question, answer) => {
//    const quiz = quizzes[id];
//    if (typeof quiz === "undefined") {
//        throw new Error(`El valor del par�metro id no es v�lido.`);
//    }
//    quizzes.splice(id, 1, {
//        question: (question || "").trim(),
//        answer: (answer || "").trim()
//    });
//    save();
//};

///**
// * Devuelve todos los quizzes existentes.
// *
// * Devuelve un clon del valor guardado en la variable quizzes, es decir, devuelve
// * un objeto nuevo con todas las preguntas existentes.
// * Para clonar quizzes se una stringify + parse.
// *
// * @returns {any}
// */
//exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

///**
// * Devuelde un clon del quiz almacenado en la posici�n dada.
// * Para clonar el quiz seuna stringify + parse.
// * 
// * @param  id   Clave que identifica el quiz a devolver.
// * @returns {question, answer}  Devuelve el objeto quiz de la posici�n dada.
// */
//exports.getByIndex = id => {
//    const quiz = quizzes[id];
//    if (typeof quiz === "undefined") {
//        throw new Error(`El valor del par�metro id no es v�lido.`);
//    }
//    return JSON.parse(JSON.stringify(quiz));
//};

///**
// * Elimina el quiz situado en la posici�n dada.
// *
// * @param  id   Clave que identifica el quiz a borrar.
// */
//exports.deleteByIndex = id => {
//    const quiz = quizzes[id];
//    if (typeof quiz === "undefined") {
//        throw new Error(`El valor del par�metro id no es v�lido.`);
//    }
//    quizzes.splice(id, 1);
//    save();
//};

//// Carga los quizzes almacenados en el fichero.
//load();