
//A function to fill out the select on index.php with the results from the API.
function fillSelect(){

    //DOM for the select
    var sel = document.getElementById("search-select");

    fetch("https://api.statbank.dk/v1/tableinfo/BIL5")
    .then(response => response.json())
    .then(info => info["variables"]["0"]["values"])
    .then(data => {

        for(i = 0; i < data.length; i++){

            //Creating an option element and then appending text and value, then appending it onto the select element.
            var opt = document.createElement("option");
            opt.appendChild(document.createTextNode(data[i]["text"]));
            opt.value = data[i]["id"];

            sel.appendChild(opt);

        }

    });

}

//Making sure to run fillSelect() as the window finished loading.
window.onload = fillSelect();

function submitForm(){

    //DOM for submit, result div, select, input for year, input for month.
    var button = document.getElementById("submit-button");
    var result = document.getElementById("result");

    var type = document.getElementById("search-select");
    var year = document.getElementById("search-year");
    var month = document.getElementById("search-month");

    //In case the user inputs something longer than the possible year, longer than the month, or over.
    if(year.value.length > 4 || month.value.length > 2 || month.value > "12" || year.value == "" || month.value == ""){

        alert("Tjek om du har udfyldt og overholder formatet med årstal og måned.");

    }

    //If the button has the value of reset and is then pressed, it resets result, and input fields.
    else if(button.value == "Reset"){

        result.innerHTML = "";
        year.value = "";
        month.value = "";

        button.value = "Søg";

    }

    //Using the inputs from the user to get the result by use of API and then using the result for the result divs innerHTML.
    else{

        var url = "https://api.statbank.dk/v1/data/BIL5/JSONSTAT?BILTYPE=" + type.value + "&Tid=" + year.value + "M" + month.value;

        fetch(url)
        .then(response => response.json())
        .then(info => info)
        .then(data => {

            //Changing the innerHTML of the result div to show the result of the API.
            result.innerHTML = "Resultat:<br>" + "<input type='text' value='" + data["dataset"]["value"][0] + "' disabled>";

            if(data){

                button.value = "Reset";

            }

        });

    }

}