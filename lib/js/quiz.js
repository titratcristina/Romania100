$(document).ready(function () {
    "use strict";

    //arrayul cu intrebari, alegeri si raspunsul corect
    var questions = [{
            question: "Unde a fost locul de desfășurare a Marii Adunări Naționale?",
            choices: ['Iasi', 'Viena', 'Alba-Iulia', 'Sinaia', 'Bucuresti'],
            correctAnswer: 2
        }, {
            question: "Ce reprezinta anul centenarului?",
            choices: ["100 ani de la Marea Unire", "100 ani de la Mica Unire", "50 ani de la Revolutie", "100 ani de la iesirea din al 2-lea Razboi mondial", "50 ani de la moartea lui Eminescu"],
            correctAnswer: 0
        }, {
            question: "Pe ce data a avut loc Marea Unire?",
            choices: ['24 ianuarie 1859', '25 decembrie 1989', '27 august 1916', '24 ianuarie 1918', '1 decembrie 1918'],
            correctAnswer: 4
        }, {
            question: "Dar Mica Unire?",
            choices: ['27 august 1916', '24 ianuarie 1918', '1 decembrie 1918', '24 ianuarie 1859', '25 decembrie 1989'],
            correctAnswer: 3
        }, {
            question: "Care sunt culorile steagului?",
            choices: ["rosu si albastru", "rosu si alb", "rosu, galben, si albastru", "rosu, alb, and albastu", "albastru, galben si rosu"],
            correctAnswer: 4
        }, {
            question: "Care este capitala Romaniei?",
            choices: ["Constanta", "Paris", "Alba Iulia", "Bucuresti", "Roma"],
            correctAnswer: 3
        }, {
            question: "Care este moneda nationala a Romaniei?",
            choices: ["franc", "euro", "lei", "rubla", "dolar"],
            correctAnswer: 2
        }, {
            question: "Ce a constituit România Mare?",
            choices: ["Unirea Basarabiei, a Bucovinei și a Transilvaniei cu Regatul României", "Unirea Basarabiei cu Regatul României", "Unirea Bucovinei și a Transilvaniei cu Regatul României", "Unirea Regatul României cu Transilvania ", "Unirea Basarabiei, a Bucovinei cu Regatul României"],
            correctAnswer: 0
  }, {
            question: "Care sunt considerate mancaruri traditionale?",
            choices: ['fructe de mare', 'kurtos', 'sarmalute cu mamaliguta', 'placinta americana', 'pizza'],
            correctAnswer: 2
  }, {
            question: "Ce s-a intamplat dupa cel de-al Doilea Razboi Mondial cu teritoriile Romaniei?",
            choices: ['Basarabia, Bucovina și ținutul Herței au fost încorporate URSS, iar Cadrilaterul a rămas Bulgariei', " Basarabia a fost încorporata de URSS", 'Cadrilaterul a rămas Bulgariei', 'Romania nu a aveut pierderi teritoriale', 'Doar Transilvania si Cadrilaterul au rămas României '],
            correctAnswer: 0
  }
  ];

    var questionCounter = 0; //numarul de intrebari
    var selections = []; //Array ul pentru alegerile utilizatorului
    var quiz = $('.content'); //divul pentru quiz

    // Afiseaza prima intrebare
    displayNext();

    // butonul next
    $('#next').on('click', function (e) {
        e.preventDefault();

        // neafisarea/oprirea butonului in timpul animatiei
        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        // afisarea unei alerte cand utilizatorul nu a selectat un raspuns
        if (isNaN(selections[questionCounter])) {
            $('#warning').text('Te rog, selecteaza un raspuns!');
        } else {
            questionCounter++;
            displayNext();
            $('#warning').text('');
        } //trece la intrebarea urmatoare daca este selectat
    });

    // butonul care te duce la intrebarea anterioara
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // butonul start over care te duce la prima intrebare
    $('#start').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // crearea si returnarea divului care contine intrebari si butoanele radio cu textul de avertizare 
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h3>Intrebarea ' + (index + 1) + ':</h3>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        var warningText = $('<p id="warning">');
        qElement.append(warningText);

        return qElement;

    }

    // crearea listei cu optiuni de raspuns 
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // adaugarea raspunsului ales de utilizator in array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // afisarea urmatorului element
    function displayNext() {
        quiz.fadeOut(function () {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // controlarea afisarii butonului 'inapoi'
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // calcularea punctajului si returnarea unui paragraf 
    function displayScore() {
        var score = $('<h3>', {
            id: 'question'
        });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }
        // afisarea unui mesaj in functie de puntajul obtinut
        var percentage = numCorrect / questions.length;
        if (percentage >= 0.9) {
            score.append('Incredibil! Ai obtinut ' + numCorrect + ' din ' +
                questions.length + ' raspunsuri corecte!');
        } else if (percentage >= 0.7) {
            score.append('Buna treaba! Ai obtinut ' + numCorrect + ' din ' +
                questions.length + ' raspunsuri corecte!');
        } else if (percentage >= 0.5) {
            score.append('Ai obtinut ' + numCorrect + ' din ' +
                questions.length + ' raspunsuri corecte.');
        } else {
            score.append('Ai obtinut doar ' + numCorrect + ' din ' +
                questions.length + ' raspunsuri corecte. Vrei sa incerci iar?');
        }
        return score;
    }
});
