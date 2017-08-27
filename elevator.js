export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.requests = {};
    this.riders = [];
    this.floorsTraveled = 0;
    this.stops = 0;
  }

  requestRider(person) {
    this.riders.push(person);
    
  }

  goToFloor(person) {
    this.move(person.currentFloor);
    this.move(person.dropOffFloor);
  }

  move(floor) {
    while (this.currentFloor !== floor) {
      if (this.currentFloor < floor) {
        this.currentFloor++;
        this.floorsTraveled++;
      } else {
        this.currentFloor--;
        this.floorsTraveled++;
      }
    }
    this.stops++;
  }

  reset() {
    this.currentFloor = 0;
    this.requests = {};
    this.riders = {};
    this.floorsTraveled = 0;
    this.stops = 0;
  }
}
