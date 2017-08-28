const REQUESTS = 'REQUESTS';
const RIDERS = 'RIDERS';

export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.requests = [];
    this.riders = [];
    this.floorsTraveled = 0;
    this.stops = 0;
    this.directionUp = true;
  }

  reset() {
    this.currentFloor = 0;
    this.requests = [];
    this.riders = [];
    this.floorsTraveled = 0;
    this.stops = 0;
    this.directionUp = true;
  }

  start() {
    while(this.requests.length || this.riders.length) {
      this.findTargetFloor();
    }
  }

  addRequest(persons) {
    if (persons.length > 1) {
      persons.forEach(person => {
        this.requests.push(person);
      })
    } else {
      this.requests.push(persons);
    }
  }

  findTargetFloor() {
    const riderFloors = this.riders.map(e => e.dropOffFloor);
    const requestFloors = this.requests.map(e => e.pickupFloor);
    const targetFloor = this.directionUp
      ? Math.max(...riderFloors, ...requestFloors)
      : Math.min(...riderFloors, ...requestFloors)
    this.traverse(targetFloor);
  }

  traverse(floor) {
    while (this.currentFloor !== floor) {
      if (this.currentFloor < floor) {
        this.currentFloor++;
        this.floorsTraveled++;
        this.manageRiders();
      } else {
        this.currentFloor--;
        this.floorsTraveled++;
        this.manageRiders();
      }
      // console.log(`Current Floor: ${this.currentFloor}`)``
    }
    this.directionUp = !this.directionUp;
  }

  manageRiders() {
    this.riders.forEach((rider, i) => {
      if (rider.dropOffFloor === this.currentFloor) {
        this.riders.splice(i, 1);
        this.stops++;
      }
    })


    this.requests.forEach((rider, i) => {
      const onCurrentFloor = rider.pickupFloor === this.currentFloor;
      const sameDirection = this.directionUp === rider.directionUp;
      const lastRider = this.riders.length < 1 && onCurrentFloor;

      if ((onCurrentFloor && sameDirection) || lastRider) {
        this.riders.push(rider);
        this.requests.splice(i, 1);
        this.stops++;
      }
    })
  }
}
