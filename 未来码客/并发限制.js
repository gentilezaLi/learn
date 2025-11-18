class Seduler {
  constructor() {
    this.max = 2;
    this.working = [];
    this.unwork = [];
  }
  add(asyncTask) {
    return new Promise((resolve) => {
      asyncTask.resolve = resolve;
      if (this.working.length < this.max) {
        this.run(asyncTask);
      } else {
        this.unwork.push(asyncTask);
      }
    });
  }
  run(task) {
    this.working.push(task);
    task().then(() => {
      task.resolve();
      let index = this.working.indexOf(task);
      this.working.splice(index, 1);
      if (this.unwork.length > 0) {
        this.run(this.unwork.shift());
      }
    });
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const seduler = new Seduler();
const addTask = (time, order) => {
  seduler
    .add(() => timeout(time))
    .then(() => {
      console.log(order);
    });
};

addTask(4000, 4);
addTask(2000, 2);
addTask(3000, 3);
addTask(900, 1);
