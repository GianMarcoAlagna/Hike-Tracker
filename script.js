document.addEventListener('DOMContentLoaded', () => {

    const mainLink = function() {
        chrome.tabs.create({url: this.getAttribute('href')});
        return false;
    }

    const link = document.querySelector('#main-link');
    link.onclick = mainLink;

    document.querySelector('.text-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const lat = document.querySelector('#lat').value;
        const long = document.querySelector('#long').value;
        const hikeTime = document.querySelector('#hikeTime').value;
        console.log(hikeTime);


        if(isNaN(Number(lat)) || isNaN(Number(long)) || Number(lat) === Math.floor(Number(lat)) || Number(long) === Math.floor(Number(long)) || lat === '' || long === '') {
            const invalid = document.createElement('h1');
            invalid.id = 'invalid';
            invalid.textContent = 'Invalid Input please enter a decimal number';
            invalid.style = 'font-weight: bold; color: red; font-size: small; -webkit-text-stroke: 0.7px black;';

            if(document.querySelector('#invalid')) return false;
            else document.querySelector('.text-form').appendChild(invalid);

            setTimeout(() => {
                invalid.remove();
            }, 3000)
            return false;
        }

        const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`;
        try {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                const form = document.querySelector('.text-form');
                form.style.animation = 'close-form 2s';
    
                const sunrise = data.results.sunrise
                const goldenHour = data.results.golden_hour
                const sunset = data.results.sunset
                
                setTimeout(() => {
                    form.style.display = 'none';
    
                    //creating parent div with appended h4s
                    const info = document.createElement('div');
                    info.classList.add('info-box');
    
                    const firstHeader = document.createElement('h2')
                    firstHeader.textContent = "For current parameters:"
            
                    const h4sunrise = document.createElement('h2');
                    h4sunrise.id = 'sunrise';
            
                    const h4goldenHour = document.createElement('h2');
                    h4goldenHour.id = 'goldenHour';
            
                    const h4sunset = document.createElement('h2');
                    h4sunset.id = 'sunrise';
                    document.body.appendChild(info);
                    
                    const authors = document.createElement('small')
                    authors.innerHTML = 'Made by: <a id="credLink" href="https://github.com/GianMarcoAlagna" style="display:block">Frontend: Gian-Marco</a><a id="credLink" href="https://github.com/mannish-boy" style="display:block">Backend: Michael</a>'
                    
                    info.appendChild(firstHeader);
                    info.appendChild(h4sunrise);
                    info.appendChild(h4goldenHour);
                    info.appendChild(h4sunset);
                    info.appendChild(authors);
                    document.body.appendChild(info);
                    
                    // document.querySelector('#credLink').addEventListener('click', (e) => {
                    //     chrome.tabs.create({url: e.target.getAttribute('href')})
                    //     return false;
                    // });
    
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

                    document.querySelector('#credLink').addEventListener('click', (e) => {
                        chrome.tabs.create({url: e.target.getAttribute('href')})
                        return false;
                    });
                }, 1000);
            })
            .catch(error => console.error('Error from response:', error));
        } catch(error) {
            console.error(`There was an error with the request: ${error}`);
        }
    });
});


//function logToBackgroundConsole(message) {
//  chrome.extension.getBackgroundPage().console.log(message);
//}

