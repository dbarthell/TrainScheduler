var config = {
    apiKey: "AIzaSyCcS9sPT0c-hJ6tP0Af4ipDi6RDp4ltJio",
    authDomain: "train-scheduler-71999.firebaseapp.com",
    databaseURL: "https://train-scheduler-71999.firebaseio.com",
    projectId: "train-scheduler-71999",
    storageBucket: "",
    messagingSenderId: "943289197487"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstTime = 0;
var arrivalTime = 0;

// Capture new train submission
$("#add-train").on("click", function (event) {

    event.preventDefault();

    // Grab values from text boxes
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = moment($("#time-input").val().trim(), "HH:mm").format("hh:mm");
    arrivalTime = moment($("#arrival-input").val().trim(), "HH:mm").format("hh:mm");

    // Push key value pairs into firebase table
    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        arrivalTime: arrivalTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });    

});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().arrivalTime);

    // Append items to html elements
    var markup = "<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().firstTime + "</td><td>" + childSnapshot.val().arrivalTime + "</td></tr>";
    $("tbody").append(markup);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

