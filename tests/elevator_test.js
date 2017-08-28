require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  beforeEach(function() {
    elevator.reset();
  });

  it('should be able to reset the stats', () => {
    elevator.currentFloor = 50;
    elevator.requests = { test: 'test' };
    elevator.floorsTraveled = 80;
    elevator.stops = 9;

    elevator.reset();

    assert.equal(elevator.currentFloor, 0);
    assert.deepEqual(elevator.requests, []);
    assert.equal(elevator.floorsTraveled, 0);
    assert.equal(elevator.stops, 0);
  })

  it('should bring a rider to a floor above their current floor', () => {
    let person = new Person('Brittany', 2, 5);
    elevator.addRequest(person);
    elevator.start(13)

    assert.equal(elevator.floorsTraveled, 5);
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.stops, 2);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let person = new Person('Brittany', 8, 3);
    elevator.addRequest(person);
    elevator.start(13);

    assert.equal(elevator.floorsTraveled, 13);
    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.stops, 2);
  });

  it('should be able to count the number of floors it has traveled and stops it has made', () => {
    let person = new Person('Cole', 5, 3);
    let personTwo = new Person('Bob', 4, 6);

    assert.equal(elevator.floorsTraveled, 0);
    assert.equal(elevator.currentFloor, 0);

    elevator.addRequest(person);
    elevator.start(13);

    assert.equal(elevator.floorsTraveled, 7);
    assert.equal(elevator.stops, 2);

    elevator.addRequest(personTwo);
    elevator.start(13);

    assert.equal(elevator.floorsTraveled, 10)
    assert.equal(elevator.stops, 4)
  });

  it('should be able to take multiple requests', () => {
    let person = new Person('Bob', 3, 9);
    let personTwo = new Person('Sue', 6, 2);

    elevator.addRequest([person, personTwo]);
    assert.equal(person.currentFloor, 3);
    assert.equal(personTwo.currentFloor, 6);
    elevator.start(13)

    assert.equal(elevator.floorsTraveled, 17);
    assert.equal(elevator.stops, 4);

    assert.equal(person.currentFloor, 9);
    assert.equal(personTwo.currentFloor, 2);
  });

  it('Person A goes up, Person B goes up', () => {
    const personA = new Person('Bob', 1, 5);
    const personB = new Person('Sue', 2, 3);

    elevator.addRequest([personA, personB]);
    assert.equal(personA.currentFloor, 1);
    assert.equal(personB.currentFloor, 2);
    elevator.start(13)

    assert.equal(elevator.stops, 4);

    assert.equal(personA.currentFloor, 5);
    assert.equal(personB.currentFloor, 3);
  });

  it('Person A goes up, Person B goes down', () => {
    const personA = new Person('Bob', 1, 5);
    const personB = new Person('Sue', 6, 2);

    elevator.addRequest([personA, personB]);
    assert.equal(personA.currentFloor, 1);
    assert.equal(personB.currentFloor, 6);
    elevator.start(13);

    assert.equal(elevator.stops, 4);
    assert.equal(elevator.floorsTraveled, 10);

    assert.equal(personA.currentFloor, 5);
    assert.equal(personB.currentFloor, 2);
  });

  it('Person A goes down, Person B goes up', () => {
    const personA = new Person('Bob', 2, 1);
    const personB = new Person('Sue', 6, 7);

    elevator.addRequest([personA, personB]);
    assert.equal(personA.currentFloor, 2);
    assert.equal(personB.currentFloor, 6);
    elevator.start(13);

    assert.equal(elevator.stops, 4);
    assert.equal(elevator.floorsTraveled, 17);

    assert.equal(personA.currentFloor, 1);
    assert.equal(personB.currentFloor, 7);
  });

  it('Person A goes down, Person B goes down', () => {
    const personA = new Person('Bob', 2, 1);
    const personB = new Person('Sue', 3, 1);

    elevator.addRequest([personA, personB]);
    assert.equal(personA.currentFloor, 2);
    assert.equal(personB.currentFloor, 3);
    elevator.start(13);

    assert.equal(elevator.stops, 4);
    assert.equal(elevator.floorsTraveled, 5);

    assert.equal(personA.currentFloor, 1);
    assert.equal(personB.currentFloor, 1);
  });

  it('should return to the lobby before 12:00pm', () => {
    const personA = new Person('Bob', 2, 5);

    elevator.addRequest(personA);
    elevator.start(5);

    assert.equal(elevator.currentFloor, 0);
  });

  it('should stay on the same floor if it is after 12:00pm', () => {
    const personA = new Person('Bob', 2, 5);

    elevator.addRequest(personA);
    elevator.start(13);

    assert.equal(elevator.currentFloor, 5);
  });
});
