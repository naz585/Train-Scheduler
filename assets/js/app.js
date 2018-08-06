// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-5G1pmli1gMSeJtHQsjgdllfTxvtv6AY",
    authDomain: "train-27948.firebaseapp.com",
    databaseURL: "https://train-27948.firebaseio.com",
    projectId: "train-27948",
    storageBucket: "train-27948.appspot.com",
    messagingSenderId: "755375482958"
};
firebase.initializeApp(config);
var database = firebase.database();

$(".lead").text("Current Time: " + moment().format("HH:mm"));
var trainName = "";
var Destination = "";
var fequency = 0;
var firstTrain = "";

$(".add-user").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();


    trainName = $(".employeeName").val().trim();
    Destination = $(".role").val().trim();
    firstTrain = $(".startDate").val().trim();
    fequency = $(".monthlyRate").val().trim();
    console.log(trainName);
    console.log(Destination);
    console.log(fequency);
    console.log(firstTrain);

    database.ref().push({
        trainName: trainName,
        Destination: Destination,
        fequency: fequency,
        firstTrain: firstTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.trainName);
    console.log(sv.Destination);
    console.log(sv.fequency);
    console.log(sv.firstTrain);
    var minutes = moment().diff(moment(sv.firstTrain, "HH:mm"), "minutes")
    var nextTrainMin = sv.fequency - (minutes % sv.fequency);
    var nextTrainTime = moment().add(nextTrainMin, 'minutes').format('HH:mm')


    console.log(nextTrainMin + " min");
    $("tbody").append("<tr class='well'><th class='train-name'> " + sv.trainName +
        " </th><th class='destination'> " + sv.Destination +
        " </th><th class='frequency'> " + sv.fequency +
        " </th><th class='next-arvl'> " + nextTrainTime +
        " </th><th class='minutes'> " + nextTrainMin + " </th></tr>");

},


    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });



