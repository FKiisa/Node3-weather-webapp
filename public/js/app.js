console.log('Loaded!');

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const messageThree = document.getElementById('message-3')
const messageFour = document.getElementById('message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchTerm.value;
    messageTwo.innerHTML = 'Loading location...'
    messageOne.innerHTML = '';
    messageThree.innerHTML = '';
    messageFour.innerHTML = '';
    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                messageOne.innerHTML = data.error;
                messageTwo.innerHTML = '';
            } else {
                messageOne.innerHTML = data.location;
                messageTwo.innerHTML = 'Probability to rain is ' + data.forecast.precipProbability;
                messageThree.innerHTML = 'Weather summary is ' + data.forecast.summary;
                messageFour.innerHTML = 'The temperature is ' + data.forecast.temperature;               
            }
        })
    }) 
})