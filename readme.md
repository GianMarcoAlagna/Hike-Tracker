Changes:

- Michael Mann changes 7/21
    - Changed Latitude and Longitude inputs so that latitudes are first, as per coordinate format standard
    - Adding text input for hiking time "hikeTime" in html
    - Added placeholder text to prompt inputs from users
    - added the module "moment" to handle subtraction of hikeTime from the fetched data
    - if "hikeTime" has an input, it will console log a statement that includes the hikeTime substraction from sunrise, golden hour and sunset
    - if hikeTime input is left empty, the extension will just console log the Sunrise, Golden Hour, and Sunset times

- Currently working on:
    - Error handling if the input time in the textbox didn't match the format for the moment node to handle the subtraction 