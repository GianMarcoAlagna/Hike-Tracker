document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.text-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const long = document.querySelector('#long').value;
        const lat = document.querySelector('#lat').value;
        const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error))
        // display sunrise, golden hour, and sunset
        
    });
});


//function logToBackgroundConsole(message) {
//  chrome.extension.getBackgroundPage().console.log(message);
//}