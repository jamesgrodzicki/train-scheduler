// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcV8UYbceRIuwogiHXglR6i2Lih7-uncA",
    authDomain: "train-scheduler-31d83.firebaseapp.com",
    databaseURL: "https://train-scheduler-31d83.firebaseio.com",
    projectId: "train-scheduler-31d83",
    storageBucket: "train-scheduler-31d83.appspot.com",
    messagingSenderId: "167861069824",
    appId: "1:167861069824:web:e34295460db408095110e5",
    measurementId: "G-RJQBLH6VN3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

$('#add-train').on('click', event => {
    event.preventDefault();

    const name = $('#name').val().trim();
    const destination = $('#destination').val().trim();
    const firstTime = $('#first-time').val().trim();
    const frequency = $('#frequency').val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });

    $('#name').val('');
    $('#destination').val('');
    $('#first-time').val('');
    $('#frequency').val('');
});

database.ref().orderByChild('dateAdded').on('child_added', childSnapshot => {
    // console.log(childSnapshot.val());

    const firstTime = childSnapshot.val().firstTime;
    const frequency = childSnapshot.val().frequency;

    const firstTimeConvert = moment(firstTime, 'HH:mm').subtract(1, 'years');

    const diffTime = moment().diff(moment(firstTimeConvert), 'minutes');
    const timeRemaining = diffTime % frequency;
    const minutesTillNextTrain = frequency-timeRemaining;
    const nextTrain = moment().add(minutesTillNextTrain, 'minutes');

    $('table').append(`<tr>
        <td>${childSnapshot.val().name}</td>
        <td>${childSnapshot.val().destination}</td>
        <td>${frequency}</td>
        <td>${moment(nextTrain).format('hh:mm A')}</td>
        <td>${minutesTillNextTrain}</td>
    </tr>`);
}, err => console.log(err.code));


