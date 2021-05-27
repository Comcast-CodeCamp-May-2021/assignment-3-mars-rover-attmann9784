// const Message = require('../message.js');
// const Command = require('../command.js');


class Rover {
  constructor (postion, mode, generatorWatts){
    this.position = postion;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(messageObject) {
    // let testCommandOne = new Command("MOVE", 20);
    // let testCommandTwo = new Command("MODE_CHANGE", "LOW_POWER");
    // let testCommandThree = new Command("STATUS_CHECK");
    // let testMessage = new Message("Message with two commands.", [testCommandOne,testCommandTwo]);
    // let testRover = new Rover(1234);
    let results1 = [];
    let newObject = {
    message: messageObject.name,
    results: results1
    };
    // console.log(messageObject.commands);
    // console.log(messageObject.commands.length);
    for (let i = 0; i < messageObject.commands.length; i++){
     let commandObject =(messageObject.commands[i]);
    //  console.log(commandObject.commandType)
      if (commandObject.commandType === "STATUS_CHECK") {
        let status = {
        completed: true,
        roverStatus:{mode:this.mode,generatorWatts:this.generatorWatts,position:this.position}
      }
      results1.push(status);
      }else if (commandObject.commandType ==="MODE_CHANGE"){
        this.mode = commandObject.value;
        console.log(commandObject.value)
        let status = {
        completed: true,
      }
      results1.push(status);
      }else if (commandObject.commandType === "MOVE") {
        // console.log(this.mode);
        if (this.mode === "LOW_POWER"){
          let status = {
          completed: false 
          }
        results1.push(status);
        }else {
          this.position = messageObject.commands[i].value;
          // console.log(commandObject.commandType);
          // console.log(this.position);
         let status = {
          completed: true,
        }
      results1.push(status);
     }
    }
    }
    return newObject
  }
}

    

    // return (`Message: ${message.name},\nResults: ${results}`)
// MOVE 	Number representing the position the rover should move to. 	position 	{completed: true}
// STATUS_CHECK 	No values sent with this command. 	No updates 	{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 87382098}} Values for mode, generatorWatts, position will depend on current state of rover.
// MODE_CHANGE 	String representing rover mode (see modes) 	mode 	{completed: true}
// LOW_POWER 	Can't be moved in this state.
// NORMAL 	None

//function creates 2 properties and object and and array
// let message = new Message("New Command: ", )
// let move = new Command("MOVE", 12000);
// let statusCheck = new Command("STATUS_CHECK", "");
// let modeChange = new Command("MODE_CHANGE", "LOW_POWER");
// let commands = [move, statusCheck, modeChange]





// let results = {
//   message: message.name,
//   roverStatus: {
//     position: "",
//     mode: "",
//     generatorWatts: ""
//   }
// }












module.exports = Rover;