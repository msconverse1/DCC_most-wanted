"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the first and last name of the person you are looking for? Enter 'yes' or 'no'.", yesNo).toLowerCase();
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
function askForTraits(people,age){
    //Currently only setup to check for gender
    //TODO : search by height,weight,occupation,eyecolor
    // use the trait an create a switch statment for each trait and prompt a example trait like gender is setup
    let trait;
    let traitType;
    let arrayByTraits =[];
    let numTraits = prompt("how many traits do you want to search for(1-6): ");
    if (isNaN(numTraits)) {
      numTraits = prompt("how many traits do you want to search for(1-6): ");
    }
    if(numTraits > 6){
      numTraits =6;
    }
    else if(numTraits <1)
      {numTraits =1;}
      trait = prompt("Choose a trait to search by: gender, height, weight, occupation, eyeColor, age.");
      traitType = checkForTraitEntered(traitType,trait);
      //logic to call which function we want 
    if (trait == "age"){
       arrayByTraits = Age(people,traitType);
    }
    else if (trait == "gender"|| trait == "height"|| trait == "weight"|| trait == "occupation"|| trait == "eyeColor"){
      arrayByTraits = TraitsSearch(people,trait,traitType);
    }
    //if incorrect info is entered call func again
    else{ 
      alert("please enter one of the six choices given. ");
      askForTraits(people,age);
    }
    //display names
      displayPeople(arrayByTraits);
      // recursion
    if(numTraits >1){
      askForTraits(arrayByTraits);
    }
}
function checkForTraitEntered(traitType,trait)
{
      switch(trait){
        case "gender":
        traitType = prompt("Choose male or female.");
        if((traitType != "male" && traitType != "female") || !isNaN(traitType)){
          alert("invaild input");
          traitType =checkForTraitEntered(traitType,trait)
        }
        break;
        case "height":
        traitType = prompt("Enter height by inches(60-80).");
        if (isNaN(traitType)|| traitType < 60 || traitType > 80) {
          alert("invaild input");
          traitType =checkForTraitEntered(traitType,trait)
        }
        break;
        case "weight":
        traitType = prompt("Enter weight by pounds.");
        if (isNaN(traitType)) {
          alert("invaild input");
          traitType =checkForTraitEntered(traitType,trait)
        }
        break;
        case "occupation":
        traitType = prompt("Enter an occupation: programmer, assistant, landscaper, nurse, student, architect, doctor, or politician.");
        if (traitType != "programmer"&& traitType != "assistant" && traitType != "landscaper"&& traitType != "nurse" && traitType != "student" 
        &&  traitType != "doctor" && traitType != "politician" ) {
           alert("invaild input");
         traitType =checkForTraitEntered(traitType,trait)
        }
        break;
        case "eyeColor":
        traitType = prompt("Enter an eyeColor: brown, black, hazel, blue, or green.");
        if (traitType != "brown" && traitType != "black"&& traitType != "hazel" && traitType != "blue"&& traitType !="green") {
          alert("invaild input");
         traitType = checkForTraitEntered(traitType,trait)
        }
        break;
        case "age":
        traitType = prompt("Enter a person's age.");
        if (isNaN(traitType)) {
          alert("invaild input");
        traitType =  checkForTraitEntered(traitType,trait)
        }
        break;
      }
      return traitType;
}

function  Age(people,age){
  let toDay = new Date();
  let currentDay = toDay.getDate();
  let currentMonth = toDay.getMonth();
  let currentYear = toDay.getFullYear();

  let arrayOfBirthdays = people.filter(function(el){
    let birthDayArray = el.dob.split("/");
    let birthYear = currentYear - age;
      if(birthDayArray[2] == birthYear){
        if(birthDayArray[0] >= currentMonth){
          if(birthDayArray[1] > currentDay){
          return false;
          }
        return true;
        }
      return true;
      }
      else{
        if(birthDayArray[2] == birthYear - 1){
          if(birthDayArray[0] >= currentMonth){
            if(birthDayArray[1] > currentDay){
            return true;
            }
          }
        }
      } 
    });
  return arrayOfBirthdays;
}
function calculateIndivAge(person){
  let toDay = new Date();
  let currentDay = toDay.getDate();
  let currentMonth = toDay.getMonth();
  let currentYear = toDay.getFullYear();
  let birthDayArray = person.dob.split("/");
  let birthYearAge = currentYear - birthDayArray[2];
  let birthYear = currentYear - birthYearAge;
  if(birthDayArray[2] == birthYear){
        if(birthDayArray[0] >= currentMonth){
          if(birthDayArray[1] > currentDay){
          return birthYearAge-1;
          }
        return birthYearAge;
        }
      return birthYearAge;
      }
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
    displayPeople(searchByGeneration(person,people));
    //searchByGeneration(person,people);
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

function searchByGeneration(person,people){
  let descendantsArray = [];
  for (var i = 0; i < people.length; i++) {
      if(person.id == people[i].parents[0] || person.id == people[i].parents[1] ){
        console.log(people[i].firstName +" is the Child of "+ person.firstName);
        descendantsArray.push(people[i]);
        searchByGeneration(people[i],people);
      }
  }
  return descendantsArray;
}

function searchByFamily(person,people){
 let familyArray = [];
 for(let i =0;i < people.length;i++){
  //check if they have a spouse
    if (person.id == people[i].currentSpouse) {
      console.log(people[i].firstName +" is the Spouse of "+ person.firstName );
     familyArray.push(people[i])
    }
  // check if they have children
    if(person.id == people[i].parents[0] || person.id == people[i].parents[1] ){
     console.log(people[i].firstName +" is the Child of "+ person.firstName);
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
  personInfo += "Age: " + calculateIndivAge(person) + "\n";
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
