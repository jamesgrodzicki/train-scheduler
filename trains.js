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

    console.log(name);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);


    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });

    $('#name').text = '';
    $('#destination').text = '';
    $('#first-time').text = '';
    $('#frequency').text = '';
});

