<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Køretøjer</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    
    <div id="search">

        <div id="flex-1">
            <label for="type">Køretøjstype</label><br>
            <select name="type" id="search-select">
            </select>
        </div>

        <div id="flex-2">
            <label for="type">Årstal</label><br>
            <input type="number" name="year" id="search-year" placeholder="1992-2020" maxlength="4">
        </div>

        <div id="flex-3">
            <label for="type">Måned</label><br>
            <input type="number" name="month" id="search-month" placeholder="01-12" maxlength="2">
        </div>

        <div id="flex-4">
            <input type="submit" value="Søg" onclick="submitForm()" id="submit-button">
        </div>

    </div>

    <div id="result"></div>

    <script src="javascript/script.js"></script>

</body>
</html>