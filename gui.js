


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
	responder(result);
}

function userMenu(){
	var checkChoice = true;
	var userChoice;
	var menuString = "Please choose one of the following:\n\n"
		menuString +="Enter \"1\" to search for a person \n"
		menuString +="Enter \"2\" to search for a person's decendents \n"
		menuString +="Enter \"3\" to search for a person's immediate family members \n"
		menuString +="Enter \"4\" to search for a person's next of kin \n"
		menuString +="Enter \"Exit\" to exit Most-Wanted\n"
		
	while(checkChoice){
		userChoice = prompt(menuString);
		if(userChoice > 0 && userChoice < 5) { return userChoice;}
		else if(userChoice.toLowerCase() === "exit"){ checkChoice = false;}
	}
	
	return "GoodBye!";
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
		}
	}
	return result;
}

function getGrandparentsNames(parentId1, parentId2){
	var result = "";
	var parents = [];
	var grandParents = [];
	
	var j = 0;
	for(var i = 0; i < family.length; i++){		
		if(family[i].id === parentId1 || family[i].id === parentId2){								
			parents[j++] = family[i];
		}				
	}	
	j = 0;
	for(var i = 0; i < family.length; i++){		
		if(family[i].id === parents[0].parents[0] || family[i].id === parents[0].parents[1] || family[i].id === parents[1].parents[0] || family[i].id === parents[1].parents[1]){				
			grandParents[j++] = family[i];
		}				
	}
	if(grandParents.length > 0){
		sortByAge(grandParents);
		for(var i = 0; i < grandParents.length; i++){
			result += grandParents[i].firstName + " " + grandParents[i].lastName + "\n";
		}
	}
	else{
		result = "No listed grandparents \n";
	}
	return result;
}

function getGrandChildren(memberId){
	var result = "";
	var children = [];
	var grandChildren = [];
	var j = 0;
	for(var i = 0; i < family.length; i++){
		if(family[i].parents[0] !== undefined){			
			if(family[i].parents[0] === memberId || family[i].parents[1] === memberId){			
				children[j++] = family[i];
			}
		}
	}
	j = 0;
	for(var i = 0; i < family.length; i++){		
		for(var k = 0; k < children.length; k++){
			if(family[i].parents[0] !== undefined){
				if(children[k].id === family[i].parents[0] || children[k].id === family[i].parents[1]){			
					grandChildren[j++] = family[i];
				}
			}	
		}	
	}
	if(grandChildren.length > 0){
		sortByAge(grandChildren);
		for(var i = 0; i < grandChildren.length; i++){
			result += grandChildren[i].firstName + " " + grandChildren[i].lastName + "\n";
		}
	}
	else{
		result = "Does not have grandchildren.\n";
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

function getChildrenNames(memberId){
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
		result = "Does not have children.\n";
	}
	
	return result;
}

function responder(results){
	// results may be a list of strings, an object, or a single string. 
	alert(results);
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

function getUserId(member){
	return member.id;
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

function getFamily(){
	// return list of names of immediate family members
	for (var key in dataObj) {//Added 
		if (dataObj.hasOwnProperty(key)) {
			console.log(key + " -> " + JSON.stringify(dataObj[key]));
		}
	}
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

function getCurrentSpouse(spouseId){
	var result = "";
	
	for(var i = 0; i < family.length; i++){
		if(family[i].id === spouseId){
			result = family[i].firstName + " " + family[i].lastName + "\n";
		}
	}
	return result;
}

function getParentsNames(parentId1, parentId2){
	var result = "";
	var parents = [];
	var j = 0;
	
	for(var i = 0; i < family.length; i++){			
		if(family[i].id === parentId1 || family[i].id === parentId2){	
			parents[j++] = family[i];
		}
	}
}

// initSearch();
