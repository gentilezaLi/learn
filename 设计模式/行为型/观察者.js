class Subject {
  constructor() {
    this.observer = [];
  }
  add(ob) {
    this.observer.push(ob);
  }
  remove(ob) {
    this.observer = this.observer.filter((x) => x !== ob);
  }
  notify(name) {
    this.observer.forEach((x) => x.update(name));
  }
}
class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(this.name + "收到更新");
  }
}
const Sub = new Subject();
const user1=new Observer('alice')
const user2=new Observer('bob')

Sub.add(user1)
Sub.add(user2)
Sub.notify()
Sub.remove(user2)
Sub.notify()

