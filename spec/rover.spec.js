const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// // NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
// //       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
describe("Rover class", function() {
  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
   let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });
//test 8
  it("response returned by receiveMessage contains name of message", function(){
    let rover = new Rover(98382);
    let message = new Message("Message test",[])
    expect(rover.receiveMessage(message).message).toContain("Message test");
  });
//test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let rover = new Rover(98328);
    let command1 = new Command('STATUS_CHECK');
    let command2 = new Command('MOVE', 20);
    let commands = [command2, command1];
    let message = new Message('Two commands',commands);
    let response = rover.receiveMessage(message).results;
    expect(response.length).toEqual(commands.length);
  });
// test 10
  it("responds correctly to status check command", function(){
    let rover = new Rover(98328);
    let command1 = new Command('STATUS_CHECK');
    let command2 = new Command('MOVE', 20);
    let commands = [command2, command1];
    let message = new Message('status check',[command1]);
    let response = rover.receiveMessage(message).results;
    expect(response).toEqual([
  {
    completed: true,
    roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 98328 }
  }
])

  });
  //test11
  it("responds correctly to mode change command", function(){
    let rover = new Rover(98328);
    let command1 = new Command('STATUS_CHECK');
    let command2 = new Command('MOVE', 20);
    let command3 = new Command('MODE_CHANGE', "LOW_POWER");
    let commands = [command2, command1];
    let message = new Message('Two commands',[command3]);
    let response = rover.receiveMessage(message).results;
    expect(response).toEqual([ { completed: true } ]);
    expect(rover.mode).toEqual("LOW_POWER");

  });
//test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let rover = new Rover(98328);
    let command1 = new Command('STATUS_CHECK');
    let command2 = new Command('MOVE', 20);
    let command3 = new Command('MODE_CHANGE','LOW_POWER');
    let commands = [command3, command2];
    let message = new Message('Two commands',commands);
    let response = rover.receiveMessage(message).results;
    expect(response[1]["completed"]).toBe(false)

  });
//test 13
  it("responds with position for move command", function(){
    let rover = new Rover(98328);
    let command1 = new Command('STATUS_CHECK');
    let command2 = new Command('MOVE', 20);
    let commands = [command2, command1];
    let message = new Message('Command to move',commands);
    let response = rover.receiveMessage(message).results;
    expect(response[1]["roverStatus"]["position"]).toEqual(20);

  });
















});

