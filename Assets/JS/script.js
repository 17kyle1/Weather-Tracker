
var searchBtn = document.getElementById("searchBtn")
var key = "5516d82eff4ca1032d27d96a6df03e2e"

var Cities = [];
if(localStorage.getItem("history")) {
    Cities = JSON.parse(localStorage.getItem("history"))
}



function performSearch () {
    var inputVal = document.getElementById("citySearch").value.trim();
    Cities.push(inputVal)
    localStorage.setItem('history', JSON.stringify(Cities));
    weatherSearch(inputVal)
 
}
performSearch ()

function weatherSearch(city) {
    var queryURL = "api.openweathermap.org/data/2.5/forecast?" + city + "&units=imperial&appid=" + key;
    fetch(queryURL)
    .then(function(result) {
        return result.json()
    })
    .then(function (data) {
       
       
        

        var cityName = document.getElementById("city-name");
        cityName.textContent = data.name;

        var today = dayjs().format('MM/DD/YYYY');
        document.getElementByClass("current-date").textContent = today
        document.getElementByClass("temp").textContent = "Temp: " + data.main.temp + "degrees";
        document.getElementByClass("wind").textContent = "Wind: " + data.wind.speed + " MPH";
        document.getElementByClass("humid").textContent = "Humidity: " + data.main.humidity + "%";
        loadSearches()
    })
}




function loadSearches() {
    document.getElementById("history").innerHTML = "";

    for(i=0; i<Cities.length; i++) {
        var newBtn = document.createElement("button")
        newBtn.textContent = Cities[i];
        newBtn.addEventListener("click"), function(e) {
            weatherSearch(e.target.textContent)
        }
        
        document.getElementById("history").append(newBtn)
    }
}

loadSearches()