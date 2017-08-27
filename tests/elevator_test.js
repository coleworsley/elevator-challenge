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
    assert.deepEqual(elevator.requests, {});
    assert.equal(elevator.floorsTraveled, 0);
    assert.equal(elevator.stops, 0);
  })

  it('should bring a rider to a floor above their current floor', () => {
    let person = new Person('Brittany', 2, 5);
    elevator.goToFloor(person);

    assert.equal(elevator.floorsTraveled, 5);
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.stops, 2);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let person = new Person('Brittany', 8, 3);
    elevator.goToFloor(person);

    assert.equal(elevator.floorsTraveled, 13);
    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.stops, 2);
  });

  it('should be able to count the number of floors it has traveled and stops it has made', () => {
    let person = new Person('Cole', 5, 3);
    let personTwo = new Person('Cole', 4, 6);

    assert.equal(elevator.floorsTraveled, 0);
    assert.equal(elevator.currentFloor, 0);

    elevator.goToFloor(person);

    assert.equal(elevator.floorsTraveled, 7);
    assert.equal(elevator.stops, 2);

    elevator.goToFloor(personTwo);

    assert.equal(elevator.floorsTraveled, 10)
    assert.equal(elevator.stops, 4)
  });
});
