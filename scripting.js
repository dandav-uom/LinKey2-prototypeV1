//Read in JSON files for basic user mode
var basic_species_dictionary = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "basic_species_dictionary.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

//Read in JSON files for advanced user mode
var advanced_species_dictionary = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "advanced_species_dictionary.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

//Read in file of probability distribution character states of each character
var prob_dist_characters = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "prob_dist_characters.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

//Set the strting user mode as basic 
var species_dictionary_rest = JSON.parse(JSON.stringify(basic_species_dictionary));

//List of submitted characters in the selected column
var submited_characters = [];

//variable to track if female characters should be shown
var hideFemale = false;

//male characters list
var maleChar = ["head_region_male", "male_pedipalp_femur_appearance","male_pedipalp_patella_appearance", 
"male_pedipalp_tibia_appearance", "male_pedipalp_cymbium_appearance", "male_pedipalp_paracymbium_form",
"male_pedipalp_brances_paracymbrium", "male_pedipalp_embolus_appearance", "male_pedipalp_lamella_characteristica" ];

//female characters list
var femaleChar = ["female_palp", "epigyne_appearance", "epigyne_form" ,"epigyne_seminal_receptacles"];



//Function to set the current mode as "basic"
function basicDictSet(){
    location.reload();
    species_dictionary_rest = JSON.parse(JSON.stringify(basic_species_dictionary));
    $("#basic").css("background-color", "green")
    $("#advanced").css("background-color", " #c2c2d6")

}

//Functoin to set the current mode as "advanced"
function advancedDictSet(){
        sessionStorage.setItem("onReload", "doFn1");
        location.reload();
}


//Set the current mode as either basic or advanced depending on which the user clicks with the select mode button
window.onload = function() {
    if (sessionStorage.getItem("onReload") == "doFn1"){
        sessionStorage.setItem("onReload", "");
        species_dictionary_rest = JSON.parse(JSON.stringify(advanced_species_dictionary));
         $("#basic").css("background-color", "#c2c2d6")
    $("#advanced").css("background-color", "green")
    }
};


// Function to initialsie the species probability column 
function setSpecies() {
    $("#myUL").empty()
     species_dictionary = JSON.parse(JSON.stringify(species_dictionary_rest)); 
        for (var i = 0, len = species_dictionary_rest.length; i < len; i++) {
        species_dictionary[i] = species_dictionary_rest[i];
        }
    for (var i = 0; i < 1530; i++){
        var input = species_dictionary[i].name.slice(1, -1) + " : " + "waiting for input...";
        var listNode = document.getElementById("myUL")
        var liNode = document.createElement("LI");
        liNode.className = "LI"
        var txtNode = document.createElement("a");
        txtNode.target = "_blank";
        txtNode.rel = "noopener noreferrer";
        txtNode.innerHTML = input;
        txtNode.href = "species_index/" + species_dictionary[i].name.slice(1, -1) + ".html";
        liNode.appendChild(txtNode);
        listNode.appendChild(liNode);

    }
}



// Function to sort the species probability column in descending probability
function sortByProperty(objArray, prop, direction){
    if (arguments.length<2) throw new Error("ARRAY, AND OBJECT PROPERTY MINIMUM ARGUMENTS, OPTIONAL DIRECTION");
    if (!Array.isArray(objArray)) throw new Error("FIRST ARGUMENT NOT AN ARRAY");
    const clone = objArray.slice(0);
    const direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending
    const propPath = (prop.constructor===Array) ? prop : prop.split(".");
    clone.sort(function(a,b){
        for (let p in propPath){
                if (a[propPath[p]] && b[propPath[p]]){
                    a = a[propPath[p]];
                    b = b[propPath[p]];
                }
        }
        // convert numeric strings to integers
        a = parseFloat(a)
        b = parseFloat(b)
        return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
    });
    return clone;
}


//Function for a search box
function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i]
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

//Function for a text search box
function myFunction2() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput2');
  filter = input.value.toUpperCase();
  ul = document.getElementById("testsearch");
  li = ul.getElementsByTagName('BUTTON');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i]
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
     if (li[i].id == "removeButton"){
     	li[i].style.display = "none";
     }
    } else {
      li[i].style.display = "none";
    }
  }
}




//Function to remove a character from the selected column, and put it back into the character select column
function removeSelection(thingToMove, calcInput, changeBackText){
	species_dictionary = JSON.parse(JSON.stringify(species_dictionary_rest));

        var thingToMove = "#" + thingToMove;
        $(thingToMove).appendTo("#toChoose");
        x = $(thingToMove + " .list-group-item");
        for (var i = 0; i < x.length; i ++){
            x[i].style.display = "inline";
        }
        y = $(thingToMove + " #removeButton");
         for (var i = 0; i < y.length; i ++){
            y[i].style.display = "none";
        }

        for(var i = submited_characters.length -1; i >= 0 ; i--){
            if(submited_characters[i][0] == calcInput){
                submited_characters.splice(i, 1);
                }
            }
    

        $(thingToMove + " .panel-heading").attr("style", "    background-color: #858585")
    if (submited_characters.length == 0){
        setSpecies();
    }
    if (submited_characters.length != 0){

     for (var i = 0; i < submited_characters.length; i++){
        if (submited_characters[i][0]== "length_of_prosoma"){
            basic_user_input_prosoma_length()
        }
     else if (submited_characters[i][0]== "length_of_tml"){
            basic_user_input_tml_length()
        }
    else {
        basic_user_input(submited_characters[i][0], submited_characters[i][1]);
        } 
    }
        }
//loop through above and run appropriatly
    
     z =  $(thingToMove + " a");
     for (var i = 0; i < z.length; i ++){
        z[i].innerHTML = changeBackText;
    }
    var $wrapper = $('#toChoose');
    $wrapper.find('.panel-group').sort(function(a, b) {
    return +a.dataset.divorder - +b.dataset.divorder;
})
.appendTo($wrapper);

 checkCharSex(male_characters, female_characters, submited_characters)

	

}


//Function to remove a country selection from the selected column and return it to the character select column
function removeCountry(thingToMove, calcInput, changeBackText){
		
		
        species_dictionary = JSON.parse(JSON.stringify(species_dictionary_rest));

        var thingToMove = "#" + thingToMove;
        t = $( thingToMove+" .myInput2");
    t[0].style.display = "block"; 
        $(thingToMove).appendTo("#toChoose");
        x = $(thingToMove + " .list-group-item");
        for (var i = 0; i < x.length; i ++){
            x[i].style.display = "inline";
        }
        y = $(thingToMove + " #removeButton");
         for (var i = 0; i < y.length; i ++){
            y[i].style.display = "none";
        }

        for(var i = submited_characters.length -1; i >= 0 ; i--){
            if(submited_characters[i][0] == calcInput){
                submited_characters.splice(i, 1);
                }
            }
    

        $(thingToMove + " .panel-heading").attr("style", "     background-color: #858585")

    if (submited_characters.length == 0){
        setSpecies();
    }
    if (submited_characters.length != 0){

    for (var i = 0; i < submited_characters.length; i++){
        if (submited_characters[i][0] == "length_of_prosoma"){
            basic_user_input_prosoma_length(submited_characters[i][0], submited_characters[i][1])
        }
         else if (submited_characters[i][0]== "length_of_tml"){
            basic_user_input_tml_length()
        }
    else{
    basic_user_input(submited_characters[i][0], submited_characters[i][1]); 
    }
    //loop through aboe and calc properly
    }
        }
//loop through above and run appropriatly
    
     z =  $(thingToMove + " a");
     for (var i = 0; i < z.length; i ++){
        z[i].innerHTML = changeBackText;
    }
    var $wrapper = $('#toChoose');
    $wrapper.find('.panel-group').sort(function(a, b) {
    return +a.dataset.divorder - +b.dataset.divorder;
})
.appendTo($wrapper);
	
    
}



// Function to move a selected characer and character state to the selected column
function descripSelect(SelectDisplay, thingToMove, calcInput){

    species_dictionary = JSON.parse(JSON.stringify(species_dictionary_rest));
    var thingToMove = "#" + thingToMove;
    $(thingToMove + " .panel-heading").attr("style", "    background-color: #228B22");
    $(thingToMove).appendTo("#selectedItems");
    x = $( thingToMove+" .list-group-item");
    for (var i = 0; i < x.length; i ++){
        x[i].style.display = "none";
    }
    y = $(thingToMove+ " #removeButton");
   
    for (var i = 0; i < y.length; i ++){
        y[i].style.display = "inline";
    }
    z =  $(thingToMove + " a");
     for (var i = 0; i < z.length; i ++){
        z[i].innerHTML = SelectDisplay;
    }
   
    var things_to_add_submitted = calcInput.split("!");

    submited_characters.push(things_to_add_submitted);
     for (var i = 0; i < submited_characters.length; i++){
        if(submited_characters[i][0]== "length_of_prosoma"){
            basic_user_input_prosoma_length()
        }
         else if (submited_characters[i][0]== "length_of_tml"){
            basic_user_input_tml_length()
        }
    else {    
    basic_user_input(submited_characters[i][0], submited_characters[i][1]);
    } 
    //loop through aboe and calc properly
    }

 var $wrapper = $('#toChoose');
    $wrapper.find('.panel-group').sort(function(a, b) {
    return +a.dataset.divorder - +b.dataset.divorder;
})
.appendTo($wrapper);


 checkCharSex(male_characters, female_characters, submited_characters)
}



// Function to move a selected country to the selected column
function selectCountry(SelectDisplay, thingToMove, calcInput){
    species_dictionary = JSON.parse(JSON.stringify(species_dictionary_rest)); 
    var thingToMove = "#" + thingToMove;
    var t = $( thingToMove+" .myInput2");
    	t[0].style.display = "none"; 
    $(thingToMove + " .panel-heading").attr("style", "    background-color: #228B22")
    $(thingToMove).appendTo("#selectedItems");
    x = $( thingToMove+" .list-group-item");
    for (var i = 0; i < x.length; i ++){
        x[i].style.display = "none";
    }
    y = $(thingToMove+ " #removeButton");
    for (var i = 0; i < y.length; i ++){
        y[i].style.display = "inline";
    }
    z =  $(thingToMove + " a");
     for (var i = 0; i < z.length; i ++){
        z[i].innerHTML = SelectDisplay;
    }
    var things_to_add_submitted = calcInput.split("!");
    submited_characters.push(things_to_add_submitted);
    for (var i = 0; i < submited_characters.length; i++){
        if(submited_characters[i][0]== "length_of_prosoma"){
            basic_user_input_prosoma_length()
        }
         else if (submited_characters[i][0]== "length_of_tml"){
            basic_user_input_tml_length()
        }
    else{
        basic_user_input(submited_characters[i][0], submited_characters[i][1]); 
        }
    //loop through aboe and calc properly
    }

 var $wrapper = $('#toChoose');
    $wrapper.find('.panel-group').sort(function(a, b) {
    return +a.dataset.divorder - +b.dataset.divorder;
})
.appendTo($wrapper);
}






// Function to perform bayesian calculations for discrete characters 
function basic_user_input(character, char_value){
	$('#myUL > li').remove();
    for (var i = 0; i < 1530; i++){
        var index = prob_dist_characters[character].indexOf(char_value);
        species_dictionary[i].current_probability =  species_dictionary[i].current_probability * species_dictionary[i][character][index];     
        }
    total_probability = 0;
    for (var i = 0; i < 1530; i++){
            total_probability += species_dictionary[i].current_probability;
        }
    for (var i = 0; i < 1530; i++){
        species_dictionary[i].current_probability =  species_dictionary[i].current_probability/total_probability
        }
    const resultsByObjectId = sortByProperty(species_dictionary, 'current_probability', -1);
    for (var i = 0; i < 1530; i++) {
        var input = resultsByObjectId[i].name.slice(1, -1);
        var listNode = document.getElementById("myUL")
        var liNode = document.createElement("LI");
        liNode.className= "LI";
        var divContainer1 = document.createElement("div");
        divContainer1.className = "progress";
        var progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progressBar.style.height = "100%";
        progressBar.style.width = String(resultsByObjectId[i].current_probability*100) + "%";
        progressBar.style.color = "black";
        progressBar.style.background = "grey";
        progressBar.innerHTML = (resultsByObjectId[i].current_probability *100).toFixed(2) + "%";
        divContainer1.appendChild(progressBar);
        var txtNode = document.createElement("a");
        txtNode.target = "_blank";
        txtNode.rel = "noopener noreferrer";
        txtNode.innerHTML = input;
        txtNode.href = "species_index/" + input + ".html";
        liNode.appendChild(txtNode);
        liNode.appendChild(divContainer1)

        listNode.appendChild(liNode);

    }
    }
    
setSpecies();


//Function to display a pop up help menu as a lightbox
function helpPopUp(modal, btn, close){
    var modal = document.getElementById(modal);
    var btn = document.getElementById(btn);
    var span = document.getElementById(close);
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        }
        window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }

}
}


// Function to move prosoma length character panel and its value input by the user to the selected column
 function calcProbProsoma(){
    SelectDisplay = "Prosoma length: " + String(document.getElementById("pro_len_input").value);
    thingToMove = "prosoma_length-panel";
    calcInput = ["length_of_prosoma", document.getElementById("pro_len_input").value];
    species_dictionary = JSON.parse(JSON.stringify(species_dictionary_rest));
    var thingToMove = "#" + thingToMove;
    $(thingToMove + " .panel-heading").attr("style", "    background-color: #228B22");
    $(thingToMove).appendTo("#selectedItems");
    x = $( thingToMove+" .list-group-item");
    for (var i = 0; i < x.length; i ++){
        x[i].style.display = "none";
    };
    y = $(thingToMove+ " #removeButton");
   
    for (var i = 0; i < y.length; i ++){
        y[i].style.display = "inline";
    };
    z =  $(thingToMove + " a");
     for (var i = 0; i < z.length; i ++){
        z[i].innerHTML = SelectDisplay;
    };
    var things_to_add_submitted = ["length_of_prosoma",document.getElementById("pro_len_input").value ];
    submited_characters.push(things_to_add_submitted);

     for (var i = 0; i < submited_characters.length; i++){
          if(submited_characters[i][0]== "length_of_prosoma"){
            basic_user_input_prosoma_length()
        }
         else if (submited_characters[i][0]== "length_of_tml"){
            basic_user_input_tml_length()
        }
    else {    
    basic_user_input(submited_characters[i][0], submited_characters[i][1]);
    } 
    //loop through aboe and calc properly
    }

 var $wrapper = $('#toChoose');
    $wrapper.find('.panel-group').sort(function(a, b) {
    return +a.dataset.divorder - +b.dataset.divorder;
})
.appendTo($wrapper);

}


// Function to perform bayesian calculation for the value of prosoma length input by the user
 function basic_user_input_prosoma_length(){
    $('#myUL > li').remove();
    var pdf_total = 0;
    var pdf_values = [];
    for (var i = 0; i < 1530; i++){
        x = document.getElementById("pro_len_input").value;
        mu = species_dictionary[i]["length_of_prosoma"][0];
        sigma = species_dictionary[i]["length_of_prosoma"][1] 
        pdf = jStat.lognormal.pdf(x, mu, sigma);
        species_dictionary[i].current_probability =  species_dictionary[i].current_probability * pdf;     
        };
       
    total_probability = 0;
    for (var i = 0; i < 1530; i++){
            total_probability += species_dictionary[i].current_probability;
        };
    for (var i = 0; i < 1530; i++){
        species_dictionary[i].current_probability =  species_dictionary[i].current_probability/total_probability
        };

   
    resultsByObjectId = sortByKey(species_dictionary, "current_probability")


    for (var i = 0; i < 1530; i++) {
        var input = resultsByObjectId[i].name.slice(1, -1);
        var listNode = document.getElementById("myUL")
        var liNode = document.createElement("LI");
        liNode.className= "LI";
        var divContainer1 = document.createElement("div");
        divContainer1.className = "progress";
        var progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progressBar.style.height = "100%";
        progressBar.style.width = String(resultsByObjectId[i].current_probability*100) + "%";
        progressBar.style.color = "black";
        progressBar.style.background = "grey";
        progressBar.innerHTML = (resultsByObjectId[i].current_probability *100).toFixed(2) + "%";
        divContainer1.appendChild(progressBar);
        var txtNode = document.createElement("a");
        txtNode.target = "_blank";
        txtNode.rel = "noopener noreferrer";
        txtNode.innerHTML = input;
        txtNode.href = "species_index/" + input + ".html";
        liNode.appendChild(txtNode);
        liNode.appendChild(divContainer1)

        listNode.appendChild(liNode);

    }
}


// Function to move trichobothrium relative to metatarsus length character panel and its value input by the user to the selected column
function calcProbTml(){
    SelectDisplay = "Tml length: " + String(document.getElementById("tml_len_input").value);
    thingToMove = "tml_length-panel";
    calcInput = ["length_of_tml", document.getElementById("tml_len_input").value];
    species_dictionary = JSON.parse(JSON.stringify(species_dictionary_rest));
    var thingToMove = "#" + thingToMove;
    $(thingToMove + " .panel-heading").attr("style", "    background-color: #228B22");
    $(thingToMove).appendTo("#selectedItems");
    x = $( thingToMove+" .list-group-item");
    for (var i = 0; i < x.length; i ++){
        x[i].style.display = "none";
    };
    y = $(thingToMove+ " #removeButton");
   
    for (var i = 0; i < y.length; i ++){
        y[i].style.display = "inline";
    };
    z =  $(thingToMove + " a");
     for (var i = 0; i < z.length; i ++){
        z[i].innerHTML = SelectDisplay;
    };
    var things_to_add_submitted = ["length_of_tml",document.getElementById("tml_len_input").value ];
    submited_characters.push(things_to_add_submitted);

    for (var i = 0; i < submited_characters.length; i++){
           if(submited_characters[i][0]== "length_of_prosoma"){
            basic_user_input_prosoma_length()
        }
         else if (submited_characters[i][0]== "length_of_tml"){
            basic_user_input_tml_length()
        }
    else {    
    basic_user_input(submited_characters[i][0], submited_characters[i][1]);
    } 
    //loop through aboe and calc properly
    }

 var $wrapper = $('#toChoose');
    $wrapper.find('.panel-group').sort(function(a, b) {
    return +a.dataset.divorder - +b.dataset.divorder;
})
.appendTo($wrapper);

}



// Function to perform bayesian calculations for trichbothrium length relative to metatarsus 4 value input by the user
function basic_user_input_tml_length(){
    $('#myUL > li').remove();
    var pdf_total = 0;
    var pdf_values = [];
    for (var i = 0; i < 1530; i++){
        x = document.getElementById("tml_len_input").value;
        mu = species_dictionary[i]["length_of_tml"][0];
        sigma = species_dictionary[i]["length_of_tml"][1] 
        pdf = jStat.lognormal.pdf(x, mu, sigma);
        species_dictionary[i].current_probability =  species_dictionary[i].current_probability * pdf;     
        };

    total_probability = 0;
    for (var i = 0; i < 1530; i++){
            total_probability += species_dictionary[i].current_probability;
        };
    for (var i = 0; i < 1530; i++){
        species_dictionary[i].current_probability =  species_dictionary[i].current_probability/total_probability
        };


        resultsByObjectId = sortByKey(species_dictionary, "current_probability")


    for (var i = 0; i < 1530; i++) {
        var input = resultsByObjectId[i].name.slice(1, -1);
        var listNode = document.getElementById("myUL")
        var liNode = document.createElement("LI");
        liNode.className= "LI";
        var divContainer1 = document.createElement("div");
        divContainer1.className = "progress";
        var progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progressBar.style.height = "100%";
        progressBar.style.width = String(resultsByObjectId[i].current_probability*100) + "%";
        progressBar.style.color = "black";
        progressBar.style.background = "grey";
        progressBar.innerHTML = (resultsByObjectId[i].current_probability *100).toFixed(2) + "%";
        divContainer1.appendChild(progressBar);
        var txtNode = document.createElement("a");
        txtNode.target = "_blank";
        txtNode.rel = "noopener noreferrer";
        txtNode.innerHTML = input;
        txtNode.href = "species_index/" + input + ".html";
        liNode.appendChild(txtNode);
        liNode.appendChild(divContainer1)

        listNode.appendChild(liNode);

    }
}



//Function to sort characters in the character column
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}


//Male specific characters
var male_characters = [" Male", "head_region_male", "male_pedipalp_femur_appearance", 
"male_pedipalp_patella_appearance", "male_pedipalp_tibia_appearance", "male_pedipalp_cymbium_appearance",
"male_pedipalp_paracymbium_form", "male_pedipalp_brances_paracymbrium", "male_pedipalp_embolus_appearance",
"male_pedipalp_lamella_characteristica"]

//Female specific characters
var female_characters = [" Female", "female_palp", "epigyne_appearance", "epigyne_form", "epigyne_seminal_receptacles" ];


//Function to hide/show sex specific characters depending in which characters are currently selected
function checkCharSex(male, female, select){

    var selected_chars = []
    for (var i = 0; i < select.length; i++){
        if (select[i][0] == "sex"){
            selected_chars.push(select[i][1])
        }
        else{
        selected_chars.push(select[i][0])
        }
    }

    if (female.some(v=> selected_chars.indexOf(v) !== -1) == true){
        console.log("female character is in selected");
        var to_hide = $('div[data-sex="male"]')
        var to_show = $('div[data-sex="female"]')

        for (var i = 0; i < to_hide.length; i++){
        to_hide[i].style.display = "none";
        }
        for (var i = 0; i < to_show.length; i++){
        to_show[i].style.display = "block";
        }
        if ((selected_chars.indexOf(" Female") !== -1) != true){
            descripSelect('Sex: female', 'Sex-panel', `sex! Female`)
            console.log("calulating female input...")
        }
        }
    else if (male.some(v=> selected_chars.indexOf(v) !== -1)){
        console.log("male character is in selected")
        var to_hide = $('div[data-sex="female"]')
        var to_show = $('div[data-sex="male"]')
         for (var i = 0; i < to_hide.length; i++){
        to_hide[i].style.display = "none";
        }
        for (var i = 0; i < to_show.length; i++){
        to_show[i].style.display = "block";
        }
        if ((selected_chars.indexOf(" Male") !== -1) != true){
            descripSelect('Sex: male', 'Sex-panel', `sex! Male`)
            console.log("calulating Male input...")
        }

    }
    else {
        console.log("No male or female characters in selected")
        var to_show1 = $('div[data-sex="male"]')
        var to_show2 = $('div[data-sex="female"]')

        for (var i = 0; i < to_show1.length; i++){
        to_show1[i].style.display = "block";
            }

        for (var i = 0; i < to_show2.length; i++){
        to_show2[i].style.display = "block";
            }
        }

    }


console.log(species_dictionary)


/*

var prosoma_list = [0.65,0.72,0.91,0.99,1.19,1.05,0.76,0.8,0.99,0.89,0.69,0.75,0.88,0.89,0.65,0.65,0.72,0.7,0.88,0.81,0.78,0.83,0.78,0.71,0.91,0.8,0.74,0.73,0.74,0.71,0.8,0.6,0.7,0.8,0.8,0.86,0.7,0.82,0.82,0.8,0.8,0.79,0.7,0.8,0.79,0.78,0.78,0.9,0.76,0.85,0.8,0.92,0.76,0.8,0.7,0.82,0.9,0.56,0.65,0.7,0.7,1.8,2.05,1.9,2.0,1.4,1.4,0.95,0.85,1.01,0.85,0.78,0.75,0.89,0.89,0.86,1.05,1.16,0.89,0.61,0.65,0.65,0.85,0.7,0.7,0.64,0.77,1.22,0.95,0.89,0.95,0.78,0.82,0.67,0.63,0.5,0.76,0.8,0.79,0.79,1.2,1.2,0.82,0.75,1.1,1.15,1.06,0.75,0.8,0.8,0.8,1.2,1.13,1.3,1.13,1.15,1.08,0.7,0.8,1.2,1.05,0.93,0.87,1.9,1.6,0.95,0.75,0.89,0.75,1.34,0.89,1.12,0.9,1.22,1.1,1.65,1.5,1.65,1.45,1.05,1.05,1.2,1.15,1.3,1.1,0.9,0.9,0.89,0.89,0.89,0.89,0.6,0.6,0.6,0.55,0.7,1.05,0.75,0.84,0.75,1.1,0.8,0.65,0.63,0.7,0.68,1.4,1.55,0.89,0.89,0.98,0.76,0.6,0.6,0.89,0.9,0.8,0.73,0.66,1.1,0.97,0.79,0.65,0.65,0.6,0.56,0.55,0.53,1.09,0.93,0.56,0.58,0.85,0.65,0.89,0.8,0.72,0.89,1.22,1.2,0.9,0.9,0.8,0.7,0.89,0.89,0.65,0.55,0.47,0.5,0.6,1.12,0.92,1.2,1.1,0.78,0.68,0.7,0.78,0.77,0.65,0.96,0.92,1.21,1.1,0.89,0.85,0.55,0.68,0.65,1.6,1.1,1.05,1.4,1.17,0.66,0.6,0.65,0.65,0.7,0.8,0.89,0.95,0.62,0.87,0.78,0.7,0.8,0.7,0.6,0.8,0.75,0.82,0.9,0.91,0.7,0.7,1.07,1.05,0.95,0.95,0.86,0.85,0.9,0.86,1.6,1.7,0.65,0.61,0.63,0.68,0.66,0.68,0.9,0.85,0.9,0.89,1.15,0.7,0.8,0.8,0.75,0.61,0.6,0.63,0.57,0.89,0.88,1.01,0.95,0.89,0.9,0.85,0.8,1.1,0.9,1.03,0.89,0.53,0.55,1.01,0.8,0.66,0.65,0.8,0.8,0.84,0.7,1.05,0.95,0.9,0.78,0.82,0.7,0.9,0.78,0.88,0.7,0.76,0.7,1.1,1.1,0.98,0.9,0.8,0.8,0.68,0.65,0.75,0.8,1.1,1.1,0.8,0.8,0.9,0.9,1.6,1.6,1.7,1.7,1.5,1.2,0.75,0.75,0.65,0.75,0.7,0.75,0.6,0.6,0.75,0.7,0.6,0.65,0.8,0.65,0.67,0.89,0.68,0.68,0.72,0.85,0.8,0.7,1.4,0.89,1.35,1.1,1.2,1.1,0.89,0.9,0.72,0.5,0.96,0.85,1.2,0.91,0.97,0.96,1.3,1.2,0.75,0.52,1.2,0.89,1.6,1.4,1.12,0.97,1.25,1.18,1.2,1.05,1.38,1.2,1.12,1.2,0.89,0.89,0.98,0.76,0.75,0.65,0.68,0.74,0.8,0.8,0.68,0.73,0.7,0.7,0.6,0.55,0.6,0.55,0.59,0.54,0.62,0.6,0.75,0.6,0.52,0.51,0.55,0.54,0.89,0.85,1.2,1.25,0.83,0.92,0.82,0.8,2.2,2.0,1.06,1.05,2.3,1.9,0.58,0.52,0.5,0.5,0.58,0.51,0.58,0.52,0.89,0.95,1.01,1.1,0.98,0.89,1.2,1.3,0.95,1.03,1.04,1.15,0.9,1.05,0.89,1.4,0.85,0.92,1.2,1.35,0.98,1.09,0.75,0.67,0.65,0.66,0.7,0.69,0.7,0.71,0.68,1.15,1.32,1.25,1.35,1.4,1.35,1.5,1.6,0.6,0.6,1.35,1.6,1.55,1.7,1.85,1.85,1.26,1.4,1.45,1.04,1.08,0.72,0.7,0.6,0.63,1.1,1.2,0.94,0.9,1.1,1.15,1.2,0.93,0.9,1.2,1.1,1.01,1.11,0.81,0.8,0.5,0.49,0.89,0.89,0.6,0.8,0.75,1.1,0.97,1.2,1.1,0.78,0.8,0.8,0.75,0.84,0.75,1.12,1.04,1.08,0.95,1.26,1.15,1.2,0.89,1.35,1.15,1.4,1.17,1.2,1.05,1.03,0.95,0.88,0.7,0.92,0.81,0.87,0.77,0.8,0.75,0.94,0.89,0.45,0.46,0.58,0.6,1.08,1.1,0.91,0.8,0.95,1.1,0.7,0.8,0.86,0.95,2.2,2.4,2.5,2.25,0.75,0.84,0.7,0.9,1.4,1.4,1.1,1.1,0.89,1.1,0.95,0.83,0.8,0.88,0.95,0.9,0.95,0.79,0.78,0.95,1.22,1.3,1.3,1.25,1.1,0.58,0.65,1.55,1.58,0.8,0.8,0.6,0.7,0.85,0.9,0.7,0.7,0.65,1.6,1.6,1.6,1.42,1.3,1.3,1.2,1.05,0.8,0.73,0.7,0.75,2.1,1.9,1.8,1.8,2.3,1.8,3.0,1.75,3.0,2.4,0.89,1.2,1.12,1.08,1.09,1.25,1.5,1.3,1.2,1.6,1.7,0.7,0.7,0.9,0.8,0.95,0.81,0.95,0.95,0.95,0.8,0.95,0.93,0.9,0.85,0.9,0.8,0.9,0.9,0.56,0.58,0.55,0.6,0.5,0.55,0.52,0.6,0.51,0.66,0.69,0.7,0.72,0.58,0.68,0.75,0.7,0.7,0.55,0.7,0.63,0.49,0.58,0.6,0.55,0.55,0.66,0.68,0.5,0.58,0.75,0.68,1.03,0.7,0.99,0.98,0.78,0.75,0.76,0.7,0.83,0.71,0.68,0.67,2.0,2.0,1.5,1.5,1.9,1.7,2.2,2.15,1.3,1.3,1.35,0.89,0.8,0.8,0.85,0.73,0.7,0.89,0.89,0.89,0.78,0.75,0.72,0.72,0.7,0.81,0.65,0.7,0.65,0.62,0.75,1.07,0.95,0.96,0.95,0.97,0.86,0.65,0.81,0.82,0.78,0.7,0.68,0.58,0.72,1.95,1.7,1.6,1.9,1.65,1.45,1.25,0.94,1.13,0.89,0.73,0.66,0.65,0.7,0.9,0.89,0.78,0.7,0.89,0.85,0.62,0.64,0.6,0.58,0.7,0.75,0.9,0.95,0.68,0.62,0.86,0.75,0.89,0.85,1.16,1.09,1.05,0.95,0.95,0.89,1.15,0.7,0.66,0.89,1.27,0.9,1.05,0.95,0.95,1.02,1.25,1.1,1.1,1.2,0.89,1.05,1.1,1.15,1.35,1.1,1.1,1.18,1.35,0.89,1.3,1.25,1.1,1.35,1.15,1.35,1.3,1.15,0.45,0.44,0.8,0.82,2.09,1.7,2.0,2.25,2.2,1.5,1.9,1.8,2.5,2.3,1.2,1.3,1.9,1.8,0.78,0.8,1.05,0.9,0.9,0.8,0.95,0.9,0.9,0.9,1.06,0.91,1.1,0.85,1.6,0.92,1.3,0.88,1.05,0.8,0.89,0.9,1.6,0.9,1.1,1.7,1.66,1.35,1.35,1.47,1.4,0.89,1.1,0.95,1.1,1.5,1.45,1.1,0.94,1.05,0.92,1.15,1.1,0.7,0.7,0.86,0.86,0.8,0.8,0.64,0.68,0.78,0.9,1.02,0.9,0.9,0.86,0.68,0.7,0.92,0.8,0.7,0.8,0.72,0.88,0.92,0.98,0.89,0.66,0.72,0.85,0.7,0.87,0.89,0.8,0.9,0.88,0.85,0.93,0.9,0.7,0.73,0.85,0.89,0.89,0.89,0.89,0.83,0.78,0.91,0.9,0.8,0.85,0.82,0.87,0.95,0.84,0.78,0.94,0.8,0.8,0.65,0.56,0.65,0.58,0.56,0.5,0.5,0.72,0.67,0.68,0.62,0.55,0.48,0.6,0.56,0.56,0.54,0.78,0.75,0.75,0.7,0.62,0.63,0.57,0.58,0.96,0.98,1.2,1.1,0.9,0.89,0.7,0.7,0.7,0.75,0.68,0.75,0.7,0.72,0.75,0.63,0.72,0.85,0.75,0.62,0.7,0.8,0.76,0.6,0.63,0.66,0.75,0.7,0.7,0.65,0.89,0.76,0.83,0.8,1.98,1.9,0.8,0.9,0.6,0.8,0.7,0.8,0.92,0.88,0.88,0.7,1.05,1.11,1.1,1.15,0.89,1.25,1.06,1.05,0.99,0.95,0.9,1.1,1.1,1.13,0.86,0.76,0.87,0.8,0.71,0.75,0.89,0.88,0.85,0.89,1.05,0.9,0.95,0.95,0.9,1.15,0.8,0.78,0.91,1.02,0.6,0.58,0.69,0.73,0.7,1.5,1.55,0.89,0.85,0.68,0.55,0.6,0.55,0.82,0.9,0.65,0.71,0.9,0.78,0.83,0.72,1.35,1.1,0.8,0.52,0.71,0.65,1.02,0.82,0.85,0.89,1.18,1.1,0.83,0.95,0.7,0.7,0.84,0.85,0.89,0.91,0.77,0.78,0.65,0.68,0.78,0.71,0.7,0.7,0.85,0.8,0.75,0.75,0.7,0.61,0.85,0.81,0.7,0.66,0.59,0.64,0.58,0.55,0.64,0.65,0.6,0.64,0.62,0.7,0.55,0.59,0.68,0.7,0.68,0.65,0.55,0.52,0.65,0.6,0.65,0.7,0.66,0.63,0.6,0.65,0.75,0.66,0.9,0.82,0.8,0.8,1.1,0.8,0.65,0.6,1.2,1.03,0.92,1.09,1.04,0.63,0.58,2.25,2.4,2.2,2.2,0.74,0.82,0.68,0.75,0.85,0.95,0.89,0.89,0.6,0.56,0.75,0.64,1.06,0.89,1.4,1.26,1.1,1.2,1.13,1.08,0.74,0.74,0.76,0.68,0.63,0.7,0.72,0.64,0.6,0.75,0.75,0.7,0.65,0.7,0.62,0.68,0.66,0.66,0.6,0.89,0.89,0.7,0.65,0.59,0.56,0.55,0.59,1.62,1.41,1.55,1.65,0.89,0.89,1.3,1.3,1.03,1.06,0.84,1.05,0.95,0.79,0.9,0.89,0.89,0.8,0.92,1.04,1.04,1.1,1.02,0.8,0.8,0.89,1.1,1.1,1.18,1.02,1.05,1.15,1.2,0.9,0.95,0.9,0.9,0.92,0.89,0.71,0.62,0.9,0.65,0.82,0.95,0.8,0.78,1.13,1.12,0.92,0.95,0.66,0.7,0.85,0.8,1.18,0.89,1.5,0.76,0.76,0.83,0.85,0.82,0.85,0.82,0.8,0.98,0.98,0.81,0.82,0.9,0.9,0.84,0.85,0.9,0.99,0.76,0.75,0.89,1.1,0.7,0.72,0.89,0.9,0.5,0.47,0.65,0.77,0.62,0.7,0.98,1.05,0.89,0.89,1.03,1.15,1.2,1.3,1.1,1.1,1.1,1.08,1.05,0.85,0.98,1.45,1.08,1.05,1.2,1.2,1.1,1.2,1.2,1.2,1.5,1.2,1.11,1.05,1.1,1.1,1.05,1.3,1.35,1.3,1.4,1.35,1.6,1.2,1.2,0.89,1.1,1.55,1.35,1.2,1.3,1.15,1.25,1.1,0.9,1.1,1.2,1.05,1.17,1.06,1.5,1.5,1.2,1.3,1.13,1.18,1.4,1.3,1.1,1.15,1.55,1.5,1.1,1.05,1.3,1.2,1.9,1.9,1.5,1.4,1.2,1.6,1.45,1.25,1.1,1.1,1.6,0.9,1.2,1.6,0.89,0.95,1.3,1.6,1.18,1.55,1.3,2.0,1.9,1.5,1.2,1.2,1.15,1.12,1.19,1.6,1.25,1.17,1.05,0.89,1.1,1.5,1.42,1.2,1.4,1.45,1.08,1.2,1.3,1.4,0.9,1.09,1.5,1.15,1.12,1.05,1.02,0.89,1.08,0.95,0.89,0.89,1.42,1.18,1.35,1.1,0.92,0.71,0.75,0.9,0.75,0.85,0.85,0.72,0.84,1.6,1.15,0.65,0.7,0.6,0.65,0.62,0.68,0.63,0.6,0.52,0.65,0.55,0.63,0.57,0.62,0.63,0.73,0.8,0.9,0.95,1.3,1.38,1.1,1.15,0.95,0.89,1.02,1.1,1.2,1.18,0.95,0.95,1.2,1.25,1.2,1.2,1.25,1.35,0.95,0.89,0.89,0.95,0.89,0.95,0.95,0.8,0.95,0.88,0.89,0.89,1.2,1.03,1.06,1.15,1.15,0.93,0.98,1.09,1.17,0.8,0.78,1.1,1.2,1.1,1.04,0.9,0.8,1.3,1.12,1.28,1.3,0.89,1.3,0.76,0.78,1.1,0.89,0.88,0.9,0.89,0.89,1.02,1.08,1.2,0.5,0.5,0.62,0.57,0.89,0.89,1.7,1.5,0.89]
var tml_list = [0.68,0.67,0.82,0.85,0.4,0.4,0.36,0.35,0.25,0.26,0.27,0.24,0.24,0.4,0.23,0.27,0.87,0.81,0.65,0.62,0.83,0.86,0.19,0.2,0.21,0.27,0.22,0.22,0.24,0.25,0.26,0.25,0.29,0.23,0.22,0.3,0.21,0.88,0.9,0.3,0.25,0.25,0.26,0.85,0.84,0.27,0.2,0.22,0.23,0.24,0.21,0.31,0.3,0.25,0.25,0.8,0.8,0.35,0.41,0.48,0.47,0.7,0.63,0.81,0.79,0.71,0.7,0.19,0.19,0.22,0.23,0.19,0.17,0.19,0.4,0.39,0.4,0.57,0.61,0.43,0.37,0.42,0.46,0.43,0.38,0.41,0.41,0.51,0.55,0.47,0.46,0.34,0.32,0.34,0.37,0.34,0.35,0.41,0.34,0.34,0.93,0.93,0.8,0.78,0.96,0.91,0.86,0.8,0.81,0.78,0.77,0.22,0.21,0.34,0.33,0.4,0.4,0.3,0.25,0.22,0.22,0.22,0.22,0.21,0.19,0.29,0.27,0.4,0.26,0.3,0.3,0.25,0.25,0.23,0.23,0.18,0.16,0.21,0.2,0.24,0.23,0.19,0.2,0.21,0.2,0.2,0.22,0.4,0.4,0.4,0.4,0.19,0.19,0.22,0.22,0.2,0.53,0.6,0.56,0.52,0.55,0.53,0.31,0.34,0.44,0.4,0.4,0.42,0.41,0.38,0.27,0.29,0.22,0.3,0.45,0.38,0.3,0.33,0.34,0.44,0.42,0.33,0.31,0.25,0.25,0.29,0.32,0.25,0.33,0.34,0.33,0.33,0.44,0.38,0.4,0.39,0.35,0.4,0.37,0.33,0.31,0.31,0.34,0.4,0.4,0.4,0.37,0.39,0.35,0.35,0.36,0.32,0.34,0.24,0.24,0.38,0.42,0.29,0.34,0.31,0.3,0.3,0.33,0.42,0.34,0.4,0.4,0.36,0.31,0.31,0.38,0.4,0.47,0.27,0.26,0.38,0.43,0.43,0.45,0.44,0.45,0.42,0.41,0.41,0.37,0.4,0.31,0.31,0.59,0.62,0.42,0.36,0.5,0.4,0.47,0.32,0.39,0.44,0.41,0.6,0.59,0.44,0.44,0.55,0.62,0.26,0.23,0.53,0.52,0.5,0.51,0.32,0.32,0.53,0.54,0.53,0.51,0.53,0.52,0.54,0.51,0.47,0.38,0.38,0.41,0.41,0.43,0.46,0.48,0.53,0.4,0.42,0.45,0.42,0.41,0.49,0.56,0.46,0.37,0.32,0.41,0.49,0.46,0.4,0.44,0.49,0.44,0.38,0.49,0.53,0.48,0.5,0.41,0.42,0.44,0.45,0.43,0.46,0.43,0.4,0.56,0.5,0.45,0.48,0.44,0.48,0.41,0.46,0.42,0.49,0.25,0.27,0.76,0.75,0.68,0.74,0.8,0.83,0.98,0.98,0.52,0.48,0.43,0.42,0.4,0.59,0.44,0.4,0.4,0.4,0.53,0.53,0.51,0.55,0.42,0.5,0.44,0.4,0.45,0.45,0.64,0.66,0.5,0.5,0.52,0.4,0.48,0.46,0.4,0.47,0.44,0.44,0.39,0.35,0.46,0.46,0.44,0.45,0.42,0.47,0.43,0.44,0.4,0.45,0.43,0.5,0.44,0.49,0.44,0.52,0.39,0.44,0.49,0.42,0.47,0.46,0.42,0.44,0.46,0.4,0.51,0.45,0.47,0.4,0.43,0.42,0.46,0.4,0.33,0.4,0.43,0.35,0.42,0.39,0.4,0.42,0.3,0.33,0.39,0.36,0.31,0.33,0.38,0.41,0.36,0.36,0.36,0.32,0.17,0.29,0.53,0.55,0.18,0.21,0.15,0.18,0.16,0.17,0.2,0.18,0.46,0.46,0.45,0.43,0.45,0.45,0.44,0.46,0.58,0.58,0.81,0.86,0.85,0.75,0.86,0.87,0.84,0.84,0.81,0.83,0.84,0.87,0.86,0.89,0.77,0.8,0.83,0.86,0.86,0.87,0.4,0.29,0.42,0.32,0.4,0.33,0.38,0.34,0.36,0.65,0.77,0.71,0.72,0.74,0.7,0.7,0.68,0.33,0.33,0.6,0.61,0.59,0.62,0.74,0.73,0.69,0.73,0.77,0.69,0.62,0.7,0.7,0.7,0.72,0.55,0.53,0.6,0.6,0.78,0.75,0.77,0.68,0.66,0.79,0.77,0.95,0.94,0.9,0.86,0.52,0.61,0.4,0.4,0.37,0.22,0.22,0.2,0.17,0.22,0.24,0.2,0.24,0.21,0.25,0.22,0.22,0.2,0.2,0.23,0.24,0.23,0.2,0.24,0.25,0.21,0.23,0.22,0.2,0.19,0.2,0.23,0.24,0.19,0.2,0.22,0.18,0.4,0.3,0.39,0.42,0.42,0.42,0.31,0.4,0.46,0.54,0.18,0.19,0.22,0.22,0.29,0.2,0.31,0.33,0.59,0.64,0.22,0.22,0.24,0.26,0.75,0.85,0.2,0.26,0.11,0.12,0.11,0.11,0.23,0.19,0.15,0.19,0.16,0.18,0.15,0.2,0.13,0.23,0.4,0.15,0.15,0.2,0.2,0.23,0.24,0.2,0.2,0.22,0.25,0.21,0.22,0.17,0.2,0.18,0.19,0.23,0.22,0.32,0.51,0.53,0.82,0.8,0.32,0.36,0.36,0.36,0.32,0.43,0.35,0.38,0.18,0.19,0.22,0.2,0.16,0.16,0.14,0.17,0.15,0.15,0.37,0.35,0.57,0.52,0.48,0.5,0.39,0.53,0.55,0.41,0.46,0.33,0.33,0.18,0.2,0.19,0.18,0.2,0.19,0.21,0.2,0.13,0.18,0.2,0.18,0.16,0.17,0.19,0.18,0.48,0.44,0.45,0.48,0.37,0.4,0.42,0.42,0.4,0.96,0.95,0.93,0.91,0.5,0.59,0.62,0.61,0.57,0.58,0.53,0.57,0.55,0.67,0.6,0.54,0.6,0.57,0.57,0.44,0.5,0.64,0.62,0.29,0.3,0.85,0.85,0.66,0.67,0.42,0.5,0.4,0.62,0.54,0.59,0.14,0.16,0.12,0.13,0.16,0.13,0.16,0.12,0.52,0.56,0.55,0.54,0.44,0.51,0.24,0.24,0.36,0.4,0.4,0.4,0.78,0.78,0.81,0.79,0.4,0.87,0.77,0.76,0.72,0.79,0.87,0.36,0.37,0.33,0.32,0.31,0.34,0.29,0.35,0.32,0.36,0.33,0.35,0.42,0.39,0.19,0.19,0.18,0.19,0.22,0.25,0.75,0.69,0.21,0.4,0.9,0.9,0.9,0.9,0.96,0.95,0.88,0.89,0.93,0.92,0.4,0.42,0.46,0.48,0.33,0.39,0.82,0.83,0.61,0.61,0.67,0.68,0.7,0.66,0.2,0.95,0.95,0.28,0.32,0.25,0.25,0.28,0.28,0.18,0.21,0.22,0.23,0.23,0.18,0.23,0.2,0.23,0.22,0.22,0.2,0.2,0.22,0.22,0.21,0.22,0.27,0.21,0.19,0.24,0.22,0.17,0.2,0.21,0.16,0.2,0.23,0.2,0.32,0.34,0.37,0.36,0.2,0.21,0.13,0.13,0.2,0.18,0.26,0.19,0.23,0.26,0.17,0.22,0.15,0.12,0.56,0.63,0.55,0.58,0.32,0.36,0.8,0.82,0.4,0.67,0.63,0.62,0.67,0.63,0.61,0.66,0.8,0.63,0.63,0.67,0.75,0.62,0.67,0.63,0.63,0.66,0.68,0.59,0.67,0.55,0.61,0.75,0.72,0.31,0.31,0.38,0.4,0.24,0.19,0.23,0.23,0.47,0.47,0.4,0.44,0.14,0.17,0.17,0.17,0.17,0.22,0.17,0.2,0.18,0.18,0.14,0.19,0.15,0.17,0.3,0.2,0.2,0.18,0.22,0.18,0.17,0.15,0.17,0.2,0.2,0.19,0.19,0.17,0.12,0.18,0.18,0.2,0.19,0.17,0.17,0.18,0.15,0.15,0.2,0.23,0.4,0.4,0.17,0.2,0.17,0.18,0.14,0.14,0.18,0.18,0.16,0.14,0.18,0.2,0.17,0.17,0.33,0.34,0.33,0.35,0.39,0.39,0.38,0.35,0.38,0.36,0.33,0.37,0.4,0.38,0.48,0.33,0.4,0.5,0.53,0.53,0.61,0.55,0.62,0.71,0.75,0.54,0.54,0.48,0.52,0.55,0.52,0.63,0.6,0.58,0.6,0.52,0.57,0.87,0.8,0.64,0.58,0.57,0.63,0.63,0.73,0.71,0.8,0.78,0.51,0.55,0.9,0.89,0.89,0.87,0.89,0.4,0.22,0.22,0.21,0.21,0.26,0.85,0.88,0.89,0.86,0.88,0.87,0.83,0.81,0.33,0.43,0.33,0.35,0.4,0.48,0.4,0.34,0.57,0.59,0.4,0.4,0.35,0.36,0.39,0.4,0.38,0.41,0.55,0.59,0.38,0.38,0.33,0.33,0.37,0.4,0.51,0.35,0.41,0.59,0.52,0.93,0.94,0.88,0.49,0.44,0.41,0.41,0.56,0.51,0.34,0.45,0.41,0.4,0.4,0.41,0.36,0.37,0.39,0.63,0.7,0.65,0.7,0.4,0.45,0.47,0.45,0.34,0.34,0.46,0.35,0.37,0.35,0.46,0.49,0.55,0.54,0.35,0.37,0.45,0.49,0.46,0.44,0.39,0.41,0.46,0.45,0.39,0.39,0.57,0.56,0.55,0.54,0.58,0.57,0.55,0.55,0.56,0.51,0.53,0.56,0.4,0.6,0.59,0.57,0.46,0.46,0.67,0.74,0.8,0.82,0.71,0.68,0.79,0.79,0.73,0.76,0.7,0.74,0.7,0.76,0.65,0.72,0.7,0.72,0.77,0.77,0.67,0.7,0.82,0.8,0.25,0.27,0.29,0.29,0.26,0.3,0.3,0.28,0.24,0.17,0.27,0.27,0.26,0.4,0.4,0.31,0.36,0.3,0.33,0.31,0.32,0.44,0.42,0.41,0.41,0.5,0.58,0.4,0.4,0.28,0.27,0.28,0.25,0.2,0.2,0.32,0.35,0.32,0.32,0.33,0.39,0.89,0.86,0.58,0.52,0.57,0.5,0.58,0.47,0.47,0.6,0.6,0.4,0.42,0.61,0.56,0.56,0.53,0.53,0.54,0.4,0.4,0.53,0.58,0.56,0.59,0.5,0.5,0.23,0.22,0.29,0.27,0.4,0.4,0.2,0.23,0.17,0.18,0.24,0.21,0.2,0.22,0.2,0.25,0.26,0.25,0.25,0.21,0.22,0.26,0.23,0.21,0.23,0.23,0.21,0.21,0.23,0.2,0.18,0.19,0.2,0.22,0.19,0.24,0.22,0.22,0.2,0.17,0.24,0.17,0.18,0.67,0.65,0.58,0.57,0.32,0.35,0.34,0.44,0.52,0.54,0.55,0.53,0.69,0.72,0.76,0.59,0.61,0.44,0.47,0.4,0.35,0.31,0.36,0.38,0.35,0.35,0.34,0.34,0.36,0.32,0.41,0.4,0.4,0.31,0.3,0.45,0.45,0.41,0.42,0.34,0.37,0.44,0.44,0.75,0.86,0.33,0.38,0.92,0.91,0.13,0.13,0.17,0.16,0.28,0.3,0.15,0.14,0.24,0.22,0.18,0.18,0.21,0.29,0.21,0.23,0.17,0.15,0.23,0.18,0.15,0.22,0.19,0.2,0.22,0.22,0.21,0.18,0.23,0.2,0.17,0.15,0.15,0.18,0.16,0.19,0.21,0.19,0.16,0.16,0.17,0.19,0.17,0.14,0.18,0.18,0.18,0.17,0.17,0.2,0.24,0.21,0.17,0.17,0.17,0.13,0.2,0.2,0.17,0.16,0.2,0.19,0.39,0.36,0.2,0.4,0.13,0.15,0.11,0.11,0.19,0.21,0.4,0.4,0.3,0.32,0.3,0.3,0.18,0.2,0.22,0.18,0.21,0.2,0.2,0.21,0.15,0.12,0.14,0.12,0.12,0.12,0.16,0.11,0.11,0.22,0.21,0.22,0.23,0.22,0.21,0.4,0.17,0.23,0.17,0.2,0.18,0.15,0.19,0.22,0.22,0.22,0.4,0.4,0.29,0.28,0.2,0.19,0.14,0.11,0.18,0.15,0.22,0.26,0.18,0.19,0.2,0.22,0.23,0.41,0.4,0.5,0.46,0.5,0.5,0.61,0.68,0.22,0.21,0.4,0.4,0.33,0.43,0.43,0.42,0.44,0.41,0.43,0.4,0.4,0.45,0.38,0.4,0.42,0.45,0.48,0.51,0.46,0.71,0.67,0.51,0.49,0.56,0.5,0.63,0.61,0.57,0.63,0.47,0.49,0.67,0.64,0.61,0.57,0.6,0.68,0.45,0.48,0.51,0.48,0.56,0.5,0.41,0.43,0.42,0.43,0.59,0.65,0.66,0.56,0.53,0.46,0.57,0.49,0.48,0.68,0.7,0.4,0.43,0.56,0.56,0.54,0.56,0.46,0.49,0.47,0.51,0.44,0.48,0.55,0.58,0.47,0.5,0.4,0.4,0.56,0.62,0.5,0.5,0.57,0.7,0.73,0.33,0.35,0.37,0.45,0.24,0.24,0.72,0.77,0.4]
var char_inputs = ["appearance","length_of_femur_1","prosoma_appearance","fovea_visible_dark_groove","opisthosoma_appearance","dorsal_spines_femur_1","posterior_eye_row_form","pme_sep_rel_diam", "head_region_male", "eye_appearance", "size_ame_rel_ale", "prolateral_spines_femur_I", "prolateral_spines_tibia_I", "anterior_cheliceral_teeth", "conspicuous_struct_chelicerae", "maxillae", "female_palp", "sternum_appearance", "sternum_extends_betw_coxaeIV", "width_sternum_betw_coxae_rel_d", "metaIV_dorsally_tmIV_presence", "dorsal_spines_meta_I", "tibiaIV_num_dorsal_spines", "num_dorsal_spines_tibiaI-IV", "tibia_I_II_vent_spines", "epigyne_appearance", "epigyne_form", "epigyne_seminal_receptacles", "male_pedipalp_femur_appearance", "male_pedipalp_patella_appearance", "male_pedipalp_tibia_appearance", "male_pedipalp_cymbium_appearance", "male_pedipalp_paracymbium_form", "male_pedipalp_brances_paracymbrium", "male_pedipalp_embolus_appearance", "male_pedipalp_lamella_characteristica", "country_dist", "sex","length_of_prosoma", "length_of_tml"]
//Scripts for making the results data. Delete after/save copy to different file. 

//Make a list of inputs for each species e.g. length of prosoma etc. 

var final_results = []  // initialise results array
for (var m = 0; m < 1530; m++){    //Go through each species
    species_dictionary = JSON.parse(JSON.stringify(basic_species_dictionary)); //reset the dictionary probabilities    
    current_species = species_dictionary[m]  // set current species array to a variable
    for (var g = 0; g < 40; g++){
        current_input = char_inputs[g]
        current_input_max = Math.max(...current_species[current_input])
        temp_index = current_species[current_input].indexOf(current_input_max)
        if (current_input_max == 1){
            console.log()
        }
        else if (current_input == "length_of_prosoma"){
            var x = prosoma_list[m]
            var pdf_total = 0;
            var pdf_values = [];
            for (var i = 0; i < 1530; i++){
                mu = species_dictionary[i]["length_of_prosoma"][0];
                sigma = species_dictionary[i]["length_of_prosoma"][1] 
                pdf = jStat.lognormal.pdf(x, mu, sigma);
                species_dictionary[i].current_probability =  species_dictionary[i].current_probability * pdf;     
                };

            total_probability = 0;
            for (var i = 0; i < 1530; i++){
                total_probability += species_dictionary[i].current_probability;
                };
            for (var i = 0; i < 1530; i++){
                species_dictionary[i].current_probability =  species_dictionary[i].current_probability/total_probability
                };
            }

         else if (current_input == "name"){
            console.log()
        }
         else if (current_input == "current_probability"){
            console.log()
        }
         else if (current_input == "length_of_tml"){
            var x = tml_list[m]
            var pdf_total = 0;
            var pdf_values = [];
            for (var i = 0; i < 1530; i++){
                mu = species_dictionary[i]["length_of_tml"][0];
                sigma = species_dictionary[i]["length_of_tml"][1] 
                pdf = jStat.lognormal.pdf(x, mu, sigma);
                species_dictionary[i].current_probability =  species_dictionary[i].current_probability * pdf;     
                };

            total_probability = 0;
            for (var i = 0; i < 1530; i++){
                total_probability += species_dictionary[i].current_probability;
            };
            for (var i = 0; i < 1530; i++){
                species_dictionary[i].current_probability =  species_dictionary[i].current_probability/total_probability
            };
        }

    else { 
          for (var i = 0; i < 1530; i++){
        species_dictionary[i].current_probability =  species_dictionary[i].current_probability * species_dictionary[i][current_input][temp_index];  
        }
    total_probability = 0;
    for (var i = 0; i < 1530; i++){
            total_probability += species_dictionary[i].current_probability;
        }
    for (var i = 0; i < 1530; i++){
        species_dictionary[i].current_probability =  species_dictionary[i].current_probability/total_probability
        }    
        } 
    }

    final_results.push(species_dictionary[m].name, species_dictionary[m].current_probability)
}


        
       
  
  */



