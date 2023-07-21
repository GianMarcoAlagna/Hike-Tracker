document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.text-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const lat = document.querySelector('#lat').value;
        const long = document.querySelector('#long').value;
        const hikeTime = document.querySelector('#hikeTime').value;
        console.log(hikeTime)

        const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const sunrise = data.results.sunrise
            const goldenHour = data.results.golden_hour
            const sunset = data.results.sunset

            //creating result div with appended h4s 
            const resultList = document.createElement('div');
            resultList.classList.add('resultList');
            const firstHeader = document.createElement('h3')
            firstHeader.textContent = "For current parameters:"
            resultList.appendChild(firstHeader);
       
            const h4sunrise = document.createElement('h4');
            h4sunrise.id = 'sunrise';
            resultList.appendChild(h4sunrise);
       
            const h4goldenHour = document.createElement('h4');
            h4goldenHour.id = 'goldenHour';
            resultList.appendChild(h4goldenHour);
       
            const h4sunset = document.createElement('h4');
            h4sunset.id = 'sunrise';
            resultList.appendChild(h4sunset);
       
       
            document.body.appendChild(resultList);

        if (hikeTime){
            //modifying the fetched times with inputted hike times
            const [hours, minutes] = hikeTime.split(':');

            const leaveSunrise = moment(sunrise, 'h:mm:ss A').subtract(hours, 'hours').subtract(minutes, 'minutes').format('h:mm:ss A');
            h4sunrise.textContent = `Sunrise: Start at ${leaveSunrise}`;

            const leaveGoldenHour = moment(goldenHour, 'h:mm:ss A').subtract(hours, 'hours').subtract(minutes, 'minutes').format('h:mm:ss A');
            h4goldenHour.textContent = `Golden Hour: Start at ${leaveGoldenHour}`;

            const leaveSunset = moment(sunset, 'h:mm:ss A').subtract(hours, 'hours').subtract(minutes, 'minutes').format('h:mm:ss A');
            h4sunset.textContent = `Sunset: Leave by ${leaveSunset} to return before sunset`;
        
        } else {
            h4sunrise.textContent = `Sunrise is at ${sunrise}`;
            h4goldenHour.textContent = `Golden Hour is at ${goldenHour}`;
            h4sunset.textContent = `Sunset is at ${sunset}`;
            };
        })

        .catch(error => console.error('Error:', error))
        // display sunrise, golden hour, and sunset
        
    });
});


//function logToBackgroundConsole(message) {
//  chrome.extension.getBackgroundPage().console.log(message);
//}

