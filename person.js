export default class Person {
  constructor(name, pickupFloor, dropOffFloor) {
    this.name = name;
    this.pickupFloor = pickupFloor;
    this.dropOffFloor = dropOffFloor;
    this.currentFloor = pickupFloor;
    this.directionUp = pickupFloor < dropOffFloor;
  }
}
