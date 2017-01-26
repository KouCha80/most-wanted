


function initSearch(people){
	alert("Welcome to Most-Wanted! Please follow all prompts to do your search.");
	var person = prompt("Please Enter your name to start your search", "");
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
		var fullName = prompt("Enter person's Full Name to see their family members: ");
		var parsedName = fullName.split(" "); 
		result = getImmediateFamily(getUserId(getPersonInfo(parsedName[0], parsedName[1])));
		if(result === ""){ result = "This person have no family members";}
	}
	else if(parseInt(menuChoice) === 4){
		var fullName = prompt("Enter person's Full Name to find next of kin: ");
		var parsedName = fullName.split(" ");
		result = getNextOfKin(getUserId(getPersonInfo(parsedName[0], parsedName[1])));
		if(result === ""){ result = "No next of kin found";}	
	}
	responder(result);
}

function userMenu(){
	var makeChoice = true;
	var userChoice;
	var menuString = "Please choose one of the following options:\n\n"
		menuString +="Enter \"1\" to search for a person \n"
		menuString +="Enter \"2\" to search for a person's decendents \n"
		menuString +="Enter \"3\" to search for a person's family members \n"
		menuString +="Enter \"4\" to search for a person's next of kin \n"
		menuString +="Enter \"Exit\" to exit Most-Wanted\n"		
	while(makeChoice){
		userChoice = prompt(menuString);
		if(userChoice > 0 && userChoice < 5) { return userChoice;}
		else if(userChoice.toLowerCase() === "exit"){ makeChoice = false;}
	}
	return "Please Come Again!";
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
		if(person.Spouse !== null){	
		result += "\nCurrent Spouse: " + person.Spouse + " " ;}

	return result;
}
function getSpouse(spouseId){
	var result = "";
	
	for(var i = 0; i < family.length; i++){
		if(family[i].id === spouseId){
			result = family[i].firstName + " " + family[i].lastName + "\n";
		}
	}
	return result;
}

function getNextOfKin(memberId){
	var result = "";
	for(var i = 0; i < family.length; i++){
		if(family[i].id === memberId){
			if(family[i].Spouse !== null){
					result = getSpouse(family[i].Spouse) + "\n";
			}
			else{
				result = "This person is currently not married.\n";
			}
				result += getChildren(family[i].id) + "\n";
			if(family[i].parents[0] !== undefined){
				result += getParents(family[i].parents[0], family[i].parents[1]) + "\n";
			}
			else{
				result += "This person's parents are not listed in our records\n\n";
			}
			if(family[i].parents[0] !== undefined){
				result += getSiblings(family[i].parents[0], memberId) + "\n";
			}
			else{
				result += "This person does not have siblings.\n\n";
			}
		}
	}
	return result;
}


function getSiblings(parentId, memberId){
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
			result += "This person does not have siblings.\n";
		}	
	return result;
}

function getChildren(memberId){
	var result = "";
	var children = [];
	var j = 0;
	for(var i = 0; i < family.length; i++){
		if(family[i].parents[0] !== undefined){			
			if(family[i].parents[0] === memberId || family[i].parents[1] === memberId){	
				children[j++] = family[i];
			}
		}
	}
	if(children.length > 0){
		sortByAge(children);
		for(var i = 0; i < children.length; i++){
			result += children[i].firstName + " " + children[i].lastName + "\n";
		}
	}
	else{
		result = "This person does not have children.\n";
	}
	
	return result;
}
function getUserId(member){
	return member.id;
}
function responder(results){
	alert(results);
}

function getPersonInfo(firstname, lastname){
	var result = "Not Found"; 
	
	for (var i = 0; i < family.length; ++i) {
			if(family[i].firstName.toLowerCase() === firstname.toLowerCase() && family[i].lastName.toLowerCase() === lastname.toLowerCase()){	
				return family[i];
			}						
		}	
		if(result === "Person is not Found"){
			alert("You've searched a name that doesn't match our records");
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

function getImmediateFamily(memberId){
	var result = "";
	for(var i = 0; i < family.length; i++){
		if(family[i].id === memberId){
			if(family[i].parents[0] !== undefined){
				result = getParents(family[i].parents[0]) + getParents(family[i].parents[1]) + "\n";
			}
			if(family[i].parents[0] !== undefined){
				result += getSiblings(family[i].parents[0], memberId) + "\n";
			}
			if(family[i].Spouse !== null){
				result += getSpouse(family[i].Spouse) + "\n";
			}
			result += getChildren(family[i].id) + "\n";
		}
	}
	return result;
}

function getAge(){
	;
}
function getHeight(){
	;
}
function getWeight(){
	;
}
function getEye(){
	;
}
function getOccupation(){
	;
}
