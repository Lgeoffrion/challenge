//Globals
var circleArray = [];
var squareArray = [];
var classNamer = null;

//random number generator
function numberGenerator(shape, i) {
    let ranNum = Math.floor(Math.random(1) * 100);
    shape.push(ranNum);
    var idName = (''+classNamer+i+'')

    if (shape == circleArray){
        drawCircle(idName, ranNum)
    } else {
        drawSquare(idName, ranNum)
    }
    
}

//Generate shapes
$('.shapeGenerator').on('click', function (){
    console.log(($(this).val()));
    let arrayName = $(this).val();
    classNamer = arrayName;
    $(('.'+classNamer+'')).remove()
    
    if (arrayName == 'circle'){
        circleArray = [];
    } else {
        squareArray = [];
    }

    for (i=0; i < 50; i++){
        if (arrayName == 'circle'){
            numberGenerator(circleArray, i);
        } else {
            numberGenerator(squareArray, i);
        }
    }

    displayArrays();

    console.log('circleArray', circleArray);
    console.log('squareArray', squareArray);
});

//display Array Numbers
function displayArrays(){
    $('.circleArrayReadout').empty().append('<p>'+circleArray.toString()+'</p>');
    $('.squareArrayReadout').empty().append('<p>'+squareArray.toString()+'</p>');
}


//draw circle
function drawCircle (idName, ranNum){
    if (idName != 'soloShape'){
        var makeShape = ('<canvas class="'+classNamer+'" id="'+idName+'" width="210" height="210"></canvas>')
        $('#circlesGoHere').append(makeShape);
        var c = document.getElementById(""+idName+"");
    } else{
        var makeShape = ('<canvas id="'+idName+'Circle" width="210" height="210"></canvas>')
        $('#singleCircle').empty().append(makeShape);
        var c = document.getElementById(""+idName+"Circle");
        console.log(c);
    }
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(105, 105, ranNum, 0, 2 * Math.PI);
    ctx.fillStyle = '#0000ff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

//draw square
function drawSquare (idName, ranNum){
    if (idName != 'soloShape'){
        var makeShape = ('<canvas class="'+classNamer+'" id="'+idName+'" width="110" height="110"></canvas>')
        $('#squaresGoHere').append(makeShape);
        var c = document.getElementById(""+idName+"");
    } else{
        var makeShape = ('<canvas id="'+idName+'Square" width="210" height="210"></canvas>')
        $('#singleSquare').empty().append(makeShape);
        var c = document.getElementById(""+idName+"Square");
    }

    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(5, 5, ranNum, ranNum);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

//clear all button
$(".clearAll").on("click", function () {
    $('#circlesGoHere').empty();
    $('#squaresGoHere').empty();
    circleArray = [];
    squareArray = [];
    $('.circleArrayReadout').empty()
    $('.squareArrayReadout').empty()
    $('#singleCircle').empty()
    $('#singleSquare').empty()
});


//rearrange arrays
$(".arrayArrange").on("click", function () {
    let arrayName = $(this).val();
    classNamer = arrayName;

    if($(this).val() == 'circle'){
        circleArray.sort((a, b) => b - a);
        $('#circlesGoHere').empty();
    } else if ($(this).val() == 'square'){
        squareArray.sort((a, b) => b - a);
        $('#squaresGoHere').empty();
    } else {
        circleArray.sort((a, b) => b - a);
        squareArray.sort((a, b) => b - a);
        $('#circlesGoHere').empty();
        $('#squaresGoHere').empty();
    }
    displayArrays();
    console.log('CIRCLE SAYS ARRAY', circleArray);
    for (i=0; i < 50; i++){
        if (arrayName == 'circle'){
            drawCircle((classNamer+i), circleArray[i]);
        } else if (arrayName == 'square'){
            drawSquare((classNamer+i), squareArray[i]);
        } else{
            drawCircle(('circle'+i+''), circleArray[i]);
            drawSquare(('square'+i+''), squareArray[i]);
        }
    }
    
});


$(".singleGenerator").on("click", function () {
    var type = $(this).val();
    var size = $(this).next('textarea').val();
    $(this).next('textarea').val('');
    var idName = 'soloShape'
    console.log('type:', type, 'size:', size);
    if (type == 'circle'){
        drawCircle(idName, size, type)
    }else{
        drawSquare(idName, size, type)
    }

});









//submit button click handler
$("#buttonAdd").on("click", function () {
    var userInput = $('#animalNew').val();

    if (userInput) {
        $('#buttonsGoHere').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
    $("#buttonGenerator")[0].reset();
});





    //Pause Gifs and change animation status
    $(".gif").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


