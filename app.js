"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      var foundPerson = searchByName(people);
      // look for a fix if the data.js is changed
      mainMenu(foundPerson[0], people);
      break;
    case 'no':
      // TODO: search by traits
     //userinput to choice a traittype
      askForTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
}
function askForTraits(people){
    //Currently only setup to check for gender
    //TODO : search by height,weight,occupation,eyecolor
    // use the trait an create a switch statment for each trait and prompt a exaple trait like gender is setup
    let trait;
    let traitType;
    let arrayByTraits =[];
      trait = prompt("Choice a trait to search by. Example: gender,height,weight,occupation,eyeColor");
      switch(trait){
        case "gender":
        traitType = prompt("Choose male or female");
        break;
        case "height":
        traitType = prompt("Search by inches");
        break;
        case "weight":
        traitType = prompt("Enter weight by pounds");
        break;
        case "occupation":
        traitType = prompt("Choose from: programmer, assistant, landscaper, nurse, student, architect, doctor, politician");
        break;
        case "eyeColor":
        traitType = prompt("Choose from: brown, black, hazel, blue, green");
        break;
      }
      arrayByTraits = TraitsSearch(people,trait,traitType);
      displayPeople(arrayByTraits);
      if(arrayByTraits.length >1)
      askForTraits(arrayByTraits);
}

//parse the data.js by traits
function TraitsSearch(people,trait,traitType){
    let newArray = people.filter(function(element){
      if (element[trait] == traitType) {
        return true;
      }
      else{
        return false;
      }
    })
    return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. 
  We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + 
    " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  
  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    displayPeople(searchByFamily(person,people));
    
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByFamily(person,people){
 let parentsID;
 let personID;
 let familyArray = [];
 for(let i =0;i < people.length;i++){
  if (person.id == people[i].currentSpouse) {
    console.log(people[i].firstName +"is the Spouse of "+ person.firstName );
    familyArray.push(people[i])
  }
 if(person.id == people[i].parents[0] || person.id == people[i].parents[1] ){
  console.log(people[i].firstName +"are the parents of "+ person.firstName);
  familyArray.push(people[i]);
 }
  else{
    
 }
  }
  return familyArray;
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
    if (isNaN(firstName)) {
      var lastName = promptFor("What is the person's last name?", chars);
        if (isNaN(lastName)) {
          var foundPerson = people.filter(function(person){
                 // TODO: find the person using the name they entered
            if((person.firstName === firstName && person.lastName === lastName)||
              person.firstName.toLowerCase()===firstName && person.lastName.toLowerCase() === lastName){
              //displayPerson(person);
              return true;
            }
            else{
              console.log("There is not any matching name found");
              return false;
            }
          })
        }   
        else{
          console.log("This is a not a string!");
        }
    }   
    else{
      console.log("This is a not a string!");
    }

  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "eyeColor: " + person.eyeColor + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
