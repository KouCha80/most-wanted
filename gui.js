


function initSearch(people){
	alert("Welcome to Most-Wanted! Please follow all prompts to do your search.");
	var person = prompt("Please Enter your name to start", "");
	if (person != null){
	}
	alert("Hello " + person + "! Let's get started.");
	var menuChoice = userMenu();
	var result;
	result = menuChoice;
	
	if(parseInt(menuChoice) === 1){
		var fullName = prompt("Enter a person's Full Name to see their record: ");
		var parsedName = fullName.split(" ");
		result = displayPerson(getPersonInfo(parsedName[0], parsedName[1]));	
	}
	else if(parseInt(menuChoice) === 2){
		var fullName = prompt("Enter person's Full Name to find their decendants: ");
		var parsedName = fullName.split(" ");
		result = getDescendants(getUserId(getPersonInfo(parsedName[0], parsedName[1])));
		if(result === ""){ result = "This person have no descendants";}
	}
	else if(parseInt(menuChoice) === 3){
		var fullName = prompt("Enter person's Full Name to see their immediate family members: ");
		var parsedName = fullName.split(" "); 
		result = getImmediateFamily(getUserId(getPersonInfo(parsedName[0], parsedName[1])));
		if(result === ""){ result = "This person have no immediate family members";}
	}
	else if(parseInt(menuChoice) === 4){
		var fullName = prompt("Enter person's Full Name to find next of kin: ");
		var parsedName = fullName.split(" ");
		result = getNextOfKin(getUserId(getPersonInfo(parsedName[0], parsedName[1])));
		if(result === ""){ result = "No next of kin found";}
	}
	else if(parseInt(menuChoice) === 5){			
		var userInput = prompt(message);
		userInput = userInput.toLowerCase();
		userInput = userInput.split(/,/);
		while(userInput.length > 5) { 
			alert("You have entered 6 inputs"); 
			userInput = "";
			userInput = prompt(message);
			userInput = userInput.split(/,/);
		}
		result = searchFilter(userInput);
		if(result === ""){ result = "Sorry this person is not in our records";}		
	}
	responder(result);
}

function userMenu(){
	var checkChoice = true;
	var userChoise;
	var menuString = "Please choose one of the following:\n\n"
		menuString +="Enter \"1\" to search for a person \n"
		menuString +="Enter \"2\" to search for a person's decendents \n"
		menuString +="Enter \"3\" to search for a person's immediate family members \n"
		menuString +="Enter \"4\" to search for a person's next of kin \n"
		menuString +="Enter \"Exit\" to exit Most-Wanted\n"
		
	while(checkChoice){
		userChoise = prompt(menuString);
		if(userChoise > 0 && userChoise < 6) { return userChoise;}
		else if(userChoise.toLowerCase() === "exit"){ checkChoice = false;}
	}
	
	return "GoodBye!";
}
function getUserId(member){
	return member.id;
}
function responder(results){
	alert(results);
}
function sortByAge(array){
	var j;
	for (var i = 0; i < array.length; i++){
        j = i - 1;			
        while(j >= 0 && new Date(array[j].dob) > new Date(array[j + 1].dob)){
            swap(array,j);
            j = j - 1;
        }
    }
}


function displayPerson(person){
	var result =
		"Id Number: " + person.id +
		"\nFirst Name: " + person.firstName + 
		"\nLast Name: " + person.lastName +
		"\nGender: " + person.gender +
		"\nDate Of Birth: " + person.dob +
		"\nHeight: " + person.height +
		"\nWeight: " + person.weight +
		"\nEye Color: " + person.eyeColor +
		"\nOccupation: " + person.occupation;
		if(person.parents[0] !== undefined){	
		result += "\nParents: " + person.parents[0] + " "}
		if(person.parents[1] !== undefined){	
		result += " and " + person.parents [1] + " ";}
		if(person.currentSpouse !== null){	
		result += "\nCurrent Spouse: " + person.currentSpouse + " " ;}

	return result;
}
function getPersonInfo(firstname, lastname){
	var result = "Not Found"; 
	
	for (var i = 0; i < family.length; ++i) {
			if(family[i].firstName.toLowerCase() === firstname.toLowerCase() && family[i].lastName.toLowerCase() === lastname.toLowerCase()){	
				return family[i];
			}						
		}	
		if(result === "Not Found"){
			alert("Name Not Found");
			var fullName = prompt("Please enter full name or enter \"Exit\" to quit");
			parsedName = fullName.split(" ");
				if(fullName.toLowerCase() !== "exit"){
					var result = getPersonInfo(parsedName[0], parsedName[1])
				}
			else {
				result = "Have a nice Day!"
			}
		}

	return result;
}
function swap(array, index){
	var holdFirstVariable = array[index + 1];
    array[index + 1] = array[index];
    array[index] = holdFirstVariable;
}
function getNextOfKin(memberId){
	var result = "";
	for(var i = 0; i < family.length; i++){
		if(family[i].id === memberId){
			if(family[i].currentSpouse !== null){
					result = getCurrentSpouse(family[i].currentSpouse) + "\n";
			}
			else{
				result = "Does not have a current spouse.\n";
			}/**/
				result += getChildrenNames(family[i].id) + "\n";
			if(family[i].parents[0] !== undefined){
				result += getParentsNames(family[i].parents[0], family[i].parents[1]) + "\n";
			}
			else{
				result += "Parents are not listed\n\n";
			}
			if(family[i].parents[0] !== undefined){
				result += getSiblingsNames(family[i].parents[0], memberId) + "\n";
			}
			else{
				result += "Does not have siblings.\n\n";
			}
			//Testing for GrandChild
			result += getGrandChildren(family[i].id) + "\n";
			//Test for Grandparents
			if(family[i].parents[0] !== undefined){
				result += getGrandparentsNames(family[i].parents[0], family[i].parents[1]) + "\n";
			}
		}//End of if
	}
	return result;
}
function getDescendants(memberId){
var result = "";

	for(var i = 0; i < family.length; i++){
		if(family[i].parents[0] !== undefined){		
			if(family[i].parents[0] === memberId || family[i].parents[1] === memberId){								
				result += family[i].firstName + " " + family[i].lastName + "\n";	
				result += getDescendants(family[i].id);
			}
		}
	}			
	return result;
}
function getSiblingsNames(parentId, memberId){
	var result = "";
	var siblings = [];
	var j = 0;
	for(var i = 0; i < family.length; i++){
		if(family[i].parents[0] !== undefined){			
			if((family[i].parents[0] === parentId || family[i].parents[1] === parentId) && family[i].id !== memberId){	
				siblings[j++] = family[i];
			}
		}
	}
	if(siblings.length > 0){
		sortByAge(siblings);
		for(var i = 0; i < siblings.length; i++){
			result += siblings[i].firstName + " " + siblings[i].lastName + "\n";
		}
	}	
	else{
			result += "Does not have siblings.\n";
		}	
	return result;
}
function getImmediateFamily(memberId){
	var result = "";
	for(var i = 0; i < family.length; i++){
		if(family[i].id === memberId){
			if(family[i].parents[0] !== undefined){
				result = getParentsNames(family[i].parents[0]) + getParentsNames(family[i].parents[1]) + "\n";
			}
			if(family[i].parents[0] !== undefined){
				result += getSiblingsNames(family[i].parents[0], memberId) + "\n";
			}
			if(family[i].currentSpouse !== null){
				result += getCurrentSpouse(family[i].currentSpouse) + "\n";
			}
			result += getChildrenNames(family[i].id) + "\n";
		}
	}
	return result;
}





