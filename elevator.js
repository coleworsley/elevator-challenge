export default class Elevator {
  constructor() {
    currentFloor: 0;
    requests: {};
    riders: {};
  }

  goToFloor(user) {
    while(this.currentFloor !== user.dropOffFloor) {
      if (this.currentFloor < user.dropOffFloor) {
        this.currentFloor++
      } else {
        this.currentFloor--
      }
    }
  }

  reset() {
    this.currentFloor = 0;
  }
}
