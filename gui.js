function initSearch(people){
	alert("Welcome and Thanks for choosing Most-Wanted! This will help search for any person you want to know more infomation about. Please follow all neccessary prompts to do your searches.");
	var displayName = promptDisplayWelcome();
	if (displayName !==null){" ";}
	alert("Hello " + displayName + "! Again, thanks for choosing Most-Wanted. You may now proceed to start your search.");

	var menuChoice = displayMenu();
	var result;
	result = menuChoice;
	if(parseInt(menuChoice) === 1){
		var fullName = promptFullName();
		var parsedName = fullName.split(" ");
		result = displayPersonInfo(getPersonInfo(parsedName[0], parsedName[1]));
	}
	else if(parseInt(menuChoice) === 2){
		// fullName = prompt("Enter person's Full Name to see their family members.");
		var immediateFamily = promptFamilyMembers();
		parsedName = immediateFamily.split(" ");
		result = getImmediateFamily(getUser(getPersonInfo(parsedName[0], parsedName[1])));
		if(result === ""){ result = "This person have no family members";}
	}
	else if(parseInt(menuChoice) === 3){
		var descendants = promptForDescendants();
		parsedName = descendants.split(" ");
		result = getDescendantsInfo(getUser(getPersonInfo(parsedName[0], parsedName[1])));
		if(result === ""){ result = "This person have no descendants";}
	}
	else if(parseInt(menuChoice) === 4){
		var nextOfKin = promptNextOfKin();
		parsedName = nextOfKin.split(" ");
		result = getNextOfKin(getUser(getPersonInfo(parsedName[0], parsedName[1])));
		if(result === ""){ result = "No next of kin found in records.";}
	}
	commute(result);
	alert("Your search results has ended, Thank You.");

}
function promptDisplayWelcome(){
	return prompt("Please Enter your name to start search.").toLowerCase();
}
function promptFullName(){
	return prompt("Please type the Full Name of the person.").toLowerCase();
}
function promptFamilyMembers(){
	return prompt("Please type the Full Name of the person to see their family members.").toLowerCase();
}
function promptForDescendants(){
	return prompt("Enter person's Full Name to find their decendants.").toLowerCase();
}
function promptNextOfKin(){
	return prompt("Enter person's Full Name to find next of kin.").toLowerCase();
}

function commute(results){
	alert(results);
}

function displayMenu(){
	var userChoice = true;
	var userInput;
	alert("Please choose one of the following options:")
	var mainMenu = ("")
		mainMenu +="Choose \"1\" to search for a person \n"
		mainMenu +="Choose \"2\" to search for a person's family members \n"
		mainMenu +="Choose \"3\" to search for a person's decendents \n"
		mainMenu +="Choose \"4\" to search for a person's next of kin \n"
		mainMenu +="Choose \"Exit\" to exit Most-Wanted\n"
	while(userChoice){
		userInput = prompt(mainMenu);
		if(userInput > 0 && userInput < 5) { return userInput;}
		else if(userInput.toLowerCase() === "exit"){ userChoice = false;}
	}
	return "Please Come Again!";
}
function displayPersonInfo(person){
	var result =
		"\nId Number: " + person.id +
		"\nFirst Name: " + person.firstName +
		"\nLast Name: " + person.lastName +
		"\nGender: " + person.gender +
		"\nDate Of Birth: " + person.dob +
		"\nHeight: " + person.height +
		"\nWeight: " + person.weight +
		"\nEye Color: " + person.eyeColor +
		"\nOccupation: " + person.occupation;
		if(person.Spouse !== null){
		result += "\nCurrent Spouse: " + person.Spouse + " " ;}
		if(person.parents[0] !== undefined){
		result += "\nParents: " + person.parents[0] + " "}
		if(person.parents[1] !== undefined){
		result += " and " + person.parents [1] + " ";}

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

function getSpouseInfo(spouse){
	var result = "";

	for(var i = 0; i < family.length; i++){
		if(family[i].id === spouse){
			result = family[i].firstName + " " + family[i].lastName + "\n";
		}
	}
	return result;
}

function getNextOfKin(person){
	var result = "";
	for(var i = 0; i < family.length; i++){
		if(family[i].id === person){
			if(family[i].Spouse !== null){
					result = getSpouseInfo(family[i].Spouse) + "\n";
			}
			else{
				result = "This person is currently not married.\n";
			}
				result += getChildrenInfo(family[i].id) + "\n";
			if(family[i].parents[0] !== undefined){
				result += getParentsInfo(family[i].parents[0], family[i].parents[1]) + "\n";
			}
			else{
				result += "This person's parents are not listed in our records\n\n";
			}
			if(family[i].parents[0] !== undefined){
				result += getSiblingsInfo(family[i].parents[0], person) + "\n";
			}
			else{
				result += "This person does not have siblings.\n\n";
			}
		}
	}
	return result;
}
function getSiblingsInfo(people, person){
	var result = "";
	var siblings = [];
	var j = 0;
	for(var i = 0; i < family.length; i++){
		if(family[i].parents[0] !== undefined){
			if((family[i].parents[0] === people || family[i].parents[1] === people) && family[i].id !== person){
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

function getChildrenInfo(person){
	var result = "";
	var children = [];
	var j = 0;
	for(var i = 0; i < family.length; i++){
		if(family[i].parents[0] !== undefined){
			if(family[i].parents[0] === person || family[i].parents[1] === person){
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
function getUser(member){
	return member.id;
}

function getDescendantsInfo(person){
var result = "";

	for(var i = 0; i < family.length; i++){
		if(family[i].parents[0] !== undefined){
			if(family[i].parents[0] === person || family[i].parents[1] === person){
				result += family[i].firstName + " " + family[i].lastName + "\n";
				result += getDescendantsInfo(family[i].id);
			}
		}
	}
	return result;
}

function getImmediateFamily(person){
	var result = "";
	for(var i = 0; i < family.length; i++){
		if(family[i].id === person){
			if(family[i].parents[0] !== undefined){
				result = getParentsInfo(family[i].parents[0]) + getParentsInfo(family[i].parents[1]) + "\n";
			}
			if(family[i].parents[0] !== undefined){
				result += getSiblingsInfo(family[i].parents[0], person) + "\n";
			}
			if(family[i].Spouse !== null){
				result += getSpouseInfo(family[i].Spouse) + "\n";
			}
			result += getChildrenInfo(family[i].id) + "\n";
		}
	}
	return result;
}

function getAge(){

}
function getHeight(){

}
function getWeight(){

}
function getEye(){

}
function getOccupation(){

}
