//Animal Array for initial buttons
var topics = [
    "cat",
    "dog",
    "elephant",
    "monkey",
    "zebra",
    "horse",
    "wolf",
    "hamster",
    "panda",
    "polar bear",
    "bear",
    "lion"
];

//generate buttons based off initial array
$(document).ready(function () {
    for (var i = 0; i < topics.length; i++) {
        $("#buttonsGoHere").append("<button type='button' onclick='searchGif(\"" + topics[i] + "\")' class='btn btn-primary' value=' " + topics[i] + "'> " + topics[i] + " </button>");
    }
    
});

//gif generator click function
function animalButtonClicked() {
    var userInput = $('#animalNew').val();
    searchGif(userInput);
}

//submit button click handler
$("#buttonAdd").on("click", function () {
    var userInput = $('#animalNew').val();

    if (userInput) {
        $('#buttonsGoHere').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
    $("#buttonGenerator")[0].reset();
});


function searchGif(animal) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=vWeqA6PcC3xHnWrrZbAf3lPknrmsIrEm&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
            displayGif(response);
        })
}

//API call - API Key = vWeqA6PcC3xHnWrrZbAf3lPknrmsIrEm

function displayGif(response) {
    $("#gifsGoHere").empty();
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
        var rating = "<div class='ratings'> Rating: " + (results[i].rating) + " </div>";
        var image ='<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="gif" style= "width:380px;">' + rating;

        image = "<div class='col-md-4'>" + image + "</div>";
        $('#gifsGoHere').append(image);
    }


 
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
}

