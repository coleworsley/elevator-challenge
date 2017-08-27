export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.requests = [];
    this.riders = [];
    this.floorsTraveled = 0;
    this.stops = 0;
    this.direction = 'up';
  }

  addRequest(person) {
    console.log(this.riders);
    this.riders.push(person);
  }

  goToFloor(person) {
    this.riders.push(person)
    while(this.riders.length) {
      const floor = this.riders.find(e => {
        if (direction === 'up') {

        }
      })

    }
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
    this.direction = 'up';
  }
}
