//DOM to get the select box.
var sel = document.getElementById("search-select");

// Create Promise polyfill script tag
var promiseScript = document.createElement("script");
promiseScript.type = "text/javascript";
//promiseScript.src = "https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js";
promiseScript.src = "javascript/promise-polyfill.js";

// Create Fetch polyfill script tag
var fetchScript = document.createElement("script");
fetchScript.type = "text/javascript";
//fetchScript.src = "https://cdn.jsdelivr.net/npm/whatwg-fetch@3.4.0/dist/fetch.umd.min.js";
fetchScript.src = "javascript/fetch.js";

// Add polyfills to head element
document.head.appendChild(promiseScript);
document.head.appendChild(fetchScript);

// Wait for the polyfills to load and run the function.
setTimeout(function () {
    window.fetch("https://api.statbank.dk/v1/tableinfo/BIL5")
    .then(function(response){

        //if the response to the API is slow or nonexistant, throw an error.
        if(response.status >= 400){
            throw new Error("Bad response from server");
        }
        //if not, the response is then put in json
        return response.json();

    })
    .then(function(info){

        //response is then specified through info
        return info["variables"]["0"]["values"];

    })
    .then(function(data){

        //info's specification is then used as data and determined how many times the for loop must run by .length
        for(i = 0; i < data.length; i++){

            //Creating an option element and then appending text and value, then appending it onto the select element.
            var opt = document.createElement("option");
            opt.appendChild(document.createTextNode(data[i]["text"]));
            opt.value = data[i]["id"];

            sel.appendChild(opt);

        }

    }) 
    .catch();
}, 100);

//A function that goes through the form's values to deem if it is acceptable and follows format, then applies it to the API for an answer.
function submitForm(){

    //DOM for submit, result div, select, input for year, input for month.
    var button = document.getElementById("submit-button");
    var result = document.getElementById("result");

    var type = document.getElementById("search-select");
    var year = document.getElementById("search-year");
    var month = document.getElementById("search-month");

    var currentYear = new Date().getFullYear();

    //If the button has the value of reset and is then pressed, it resets result, and input fields.
    if(button.value == "Reset"){

        result.innerHTML = "";
        year.value = "";
        month.value = "";

        button.value = "Søg";

    }

    //In case the user inputs something longer than the possible year, longer than the month, or over.
    else if(year.value.length > 4 || year.value == "" || year.value < 1992 || year.value > currentYear || month.value > 12 || month.value < 1 || month.value % 1 != 0 || year.value % 1 != 0 ){

        alert("Tjek om du har udfyldt og overholder formatet med årstal og måned. Således: Årstal minimum 1992 op til " + currentYear + ", måned fra 1 til 12.");

    }

    //Using the inputs from the user to get the result by use of API and then using the result for the result divs innerHTML.
    else{

        if(month.value.length < 2){

            //in case the user only inputs a single digit, this will make sure the API gets the correct result by adding a "0" in front.
            var tempMonth = "0" + month.value.toString();

        }
        else{

            var tempMonth = month.value;

        }

        var url = "https://api.statbank.dk/v1/data/BIL5/JSONSTAT?BILTYPE=" + type.value + "&Tid=" + year.value + "M" + tempMonth;
        
        fetch(url)
        .then(function(response){

            //if the response to the API is slow or nonexistant, throw an error.
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            //if not, the response is then put in json
            return response.json();

        })
        .then(function(data){

            //Getting the result from the API.
            var apiResult = data["dataset"]["value"][0];

            //If there is no search result.
            if(apiResult == null){

                apiResult = "Ingen registreringer";

            }

            //Changing the innerHTML of the result div to show the result of the API.
            result.innerHTML = "Resultat:<br>" + "<input type='text' value='" + apiResult + "' disabled>";

            if(data){

                button.value = "Reset";

            }

        });
        
    }

}