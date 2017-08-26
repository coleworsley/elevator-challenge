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

  it('should bring a rider to a floor above their current floor', () => {
    let person = new Person('Brittany', 2, 5);
    elevator.goToFloor(person);

    assert.equal(elevator.floorsTraveled, 5);
    assert.equal(elevator.currentFloor, 5);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let person = new Person('Brittany', 8, 3);
    elevator.goToFloor(person);

    assert.equal(elevator.floorsTraveled, 13);
    assert.equal(elevator.currentFloor, 3);
  });
});
