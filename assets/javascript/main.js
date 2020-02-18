//Globals
var circleArray = [];
var squareArray = [];
var classNamer = null;
var partyInterval;

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
    location.reload();
    // $('#circlesGoHere').empty();
    // $('#squaresGoHere').empty();
    // circleArray = [];
    // squareArray = [];
    // $('.circleArrayReadout').empty()
    // $('.squareArrayReadout').empty()
    // $('#singleCircle').empty()
    // $('#singleSquare').empty()
    // $('#singleCircleReadout').empty()
    // $('#singleSquareReadOut').empty()
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


//single shape generator
$(".singleGenerator").on("click", function () {
    var type = $(this).val();
    var size = $(this).next('textarea').val();
    $(this).next('textarea').val('');
    var idName = 'soloShape'
    console.log('type:', type, 'size:', size);

    if (type == 'circle'){
        var circleInfo = '<p>Size='+size+', Area='+(size * 2 * Math.PI).toFixed(2)+'</p>'
        $('#singleCircleReadout').empty().append(circleInfo)
        drawCircle(idName, size, type)
    }else{
        var squareInfo = '<p>Size='+size+', Area='+(size * size)+'</p>'
        $('#singleSquareReadOut').empty().append(squareInfo)
        drawSquare(idName, size, type)
    }

});

var partyCounter = 0;
$(".partyMode").on("click", function () {
    partyInterval = setInterval(partyMode, 500);
    partyCounter++;
    if (partyCounter == 1){
        $(".partyMode").html("Party Harder?");
    }
    if (partyCounter == 2){
        $(".partyMode").html("Hit it Again!");
        $(".partyOn").attr("disabled", true).html("Can't Stop Won't Stop");
    }
    if (partyCounter == 3){
        $(".partyMode").html("Kick It Up Another Notch");
    }
    if (partyCounter == 4){
        $(".partyMode").html("You Want Another?");
    }
    if (partyCounter == 5){
        $(".partyMode").attr("disabled", true).html("Hit the clear button Party Animal");
    }
});

function partyMode(){
    $('#circlesGoHere').empty();
    $('#squaresGoHere').empty();
    circleArray = [];
    squareArray = [];
    $('.circleArrayReadout').empty()
    $('.squareArrayReadout').empty()
    for (i=0; i < 50; i++){
        partynumberGenerator(circleArray, i);
        partynumberGenerator(squareArray, i); 
    }
    displayArrays();
};

$(".partyOn").on("click", function () {
    partyCounter = 0;
    $(".partyMode").html("Party Mode!");
    clearInterval(partyInterval);
});



//draw circle
function partydrawCircle (idName, ranNum){
    let prettyColors1 = Math.floor(Math.random(1) * 255);
    let prettyColors2 = Math.floor(Math.random(1) * 255);
    let prettyColors3 = Math.floor(Math.random(1) * 255);
    var makeShape = ('<canvas class="'+classNamer+'" id="'+idName+'" width="210" height="210"></canvas>')
    $('#shapesGoHere').append(makeShape);
    var c = document.getElementById(""+idName+"");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(105, 105, ranNum, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgb('+prettyColors1+','+prettyColors2+','+prettyColors3+')';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb('+prettyColors1+','+prettyColors2+','+prettyColors3+')';
    ctx.stroke();
}

//draw square
function partydrawSquare (idName, ranNum){
    let prettyColors1 = Math.floor(Math.random(1) * 255);
    let prettyColors2 = Math.floor(Math.random(1) * 255);
    let prettyColors3 = Math.floor(Math.random(1) * 255);
    var makeShape = ('<canvas class="'+classNamer+'" id="'+idName+'" width="110" height="110"></canvas>')
    $('#shapesGoHere').append(makeShape);
    var c = document.getElementById(""+idName+"");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(5, 5, ranNum, ranNum);
    ctx.fillStyle = 'rgb('+prettyColors1+','+prettyColors2+','+prettyColors3+')';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb('+prettyColors1+','+prettyColors2+','+prettyColors3+')';
    ctx.stroke();
}

function partynumberGenerator(shape, i) {
    let ranNum = Math.floor(Math.random(1) * 100);
    shape.push(ranNum);
    var idName = (''+classNamer+i+'')

    if (shape == circleArray){
        partydrawCircle(idName, ranNum)
    } else {
        partydrawSquare(idName, ranNum)
    } 
}