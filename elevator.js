export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.requests = {};
    this.riders = {};
    this.floorsTraveled = 0;
  }

  goToFloor(person) {
    this.moveTo(person.currentFloor);
    this.moveTo(person.dropOffFloor)
  }

  moveTo(floor) {
    while (this.currentFloor !== floor) {
      if (this.currentFloor < floor) {
        this.currentFloor++;
        this.floorsTraveled++;
      } else {
        this.currentFloor--;
        this.floorsTraveled++;
      }
    }
  }

  reset() {
    this.currentFloor = 0;
    this.requests = {};
    this.riders = {};
    this.floorsTraveled = 0;
  }
}
