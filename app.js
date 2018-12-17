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
//Ask user for # of traits to look for then return the result 
function askForTraits(people,age){
    let trait;
    let traitType;
    let arrayByTraits =[];
    let numTraits = prompt("how many traits do you want to search for(1-6): ");
    if (isNaN(numTraits)) {
      alert("Invaild Input");
      askForTraits(people);
    }
    if(numTraits > 6){
      alerts("set to max value");
      numTraits =6;
    }
    else if(numTraits <1){
      alerts("set to min value");
        numTraits =1;}
for(let i =0;i<numTraits;i++){
    if(i>=1){
      alert("Searching for the next trait:");
    arrayByTraits= resurTraitSearch(arrayByTraits);
    }
  //call function to repeat while i < numTraits
  else{
    alert("Searching for trait:");
    arrayByTraits= resurTraitSearch(people);
  }
}
      // display final array that hold matching value to user input
    displayPeople(arrayByTraits);
}
//recursion set up for checking for multi traits to find 
function resurTraitSearch(people)
{
   let trait = prompt("Choose a trait to search by: gender, height, weight, occupation, eyeColor, age.");
     let traitType = checkForTraitEntered(trait);
     let arrayByTraits = [];
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
      resurTraitSearch(people);
    }
    //display names
     return arrayByTraits;
}
// return a trait that was inputed by the user
function checkForTraitEntered(trait)
{
  let traitType;
      switch(trait){
        case "gender":
        traitType = prompt("Choose male or female.");
        if((traitType != "male" && traitType != "female") || !isNaN(traitType)){
          alert("invaild input");
          traitType =checkForTraitEntered(trait);
        }
        break;
        case "height":
        traitType = prompt("Enter height by inches(60-80).");
        if (isNaN(traitType)|| traitType < 60 || traitType > 80) {
          alert("invaild input");
          traitType =checkForTraitEntered(trait);
        }
        break;
        case "weight":
        traitType = prompt("Enter weight by pounds.");
        if (isNaN(traitType)) {
          alert("invaild input");
          traitType =checkForTraitEntered(trait);
        }
        break;
        case "occupation":
        traitType = prompt("Enter an occupation: programmer, assistant, landscaper, nurse, student, architect, doctor, or politician.");
        if (traitType != "programmer"&& traitType != "assistant" && traitType != "landscaper"&& traitType != "nurse" && traitType != "student" 
        &&  traitType != "doctor" && traitType != "politician" && traitType != "architect") {
           alert("invaild input");
         traitType =checkForTraitEntered(trait);
        }
        break;
        case "eyeColor":
        traitType = prompt("Enter an eyeColor: brown, black, hazel, blue, or green.");
        if (traitType != "brown" && traitType != "black"&& traitType != "hazel" && traitType != "blue"&& traitType !="green") {
          alert("invaild input");
         traitType = checkForTraitEntered(trait);
        }
        break;
        case "age":
        traitType = prompt("Enter a person's age.");
        if (isNaN(traitType)) {
          alert("invaild input");
        traitType =  checkForTraitEntered(trait);
        }
        break;
        default: 
         alert("No vaild input");
      }
      return traitType;
}
//create a array for all people with matching input of age
function  Age(people,age){
  let currentTime = getcurrenttime();
  let arrayOfBirthdays = people.filter(function(el){
  let birthDayArray = el.dob.split("/");
  let birthYear = currentTime[2] - age;
    if(birthDayArray[2] == birthYear){
      if(birthDayArray[0] >= currentTime[0]){
        if(birthDayArray[1] > currentTime[1]){
        return false;
        }
      return true;
      }
    return true;
    }
    else{
      if(birthDayArray[2] == birthYear - 1){
        if(birthDayArray[0] >= currentTime[0]){
          if(birthDayArray[1] > currentTime[1]){
          return true;
          }
        }
      }
    } 
  });
  return arrayOfBirthdays;
}
//calculate the age for a single person to display
function calculateIndivAge(person){
  let currentTime = getcurrenttime();
  let birthDayArray = person.dob.split("/");
  let birthYearAge = currentTime[2] - birthDayArray[2];
  let birthYear = currentTime[2] - birthYearAge;
  if(birthDayArray[2] == birthYear){
        if(birthDayArray[0] >= currentTime[0]){
          if(birthDayArray[1] > currentTime[1]){
          return birthYearAge-1;
          }
        return birthYearAge;
        }
      return birthYearAge;
      }
}
//get current time from local machine
function getcurrenttime(){
  let toDay = new Date();
  let currentDate = [];
  currentDate.push(toDay.getMonth()+1);
  currentDate.push(toDay.getDate());
  currentDate.push(toDay.getFullYear());
  return currentDate;
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
    });
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
//search through the array for all the generations 
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
//search for the imediate family mebers to user input
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
  }
  return familyArray;
}
// search for a person based off of user input
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
              return false;
            }
          });
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
//display all infomation about a single person
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