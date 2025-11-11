const STATUS_PENDING = "pending";
const STATUS_FULFILLED = "fulfilled";
const STATUS_REJECTED = "rejected";

const excutorFnWithCatchError = (fn, params, resolve, reject) => {
  try {
    const result = fn(params);
    resolve(result);
  } catch (error) {
    reject(error);
  }
};

class MyPromise {
  constructor(excutor) {
    this.status = STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };
    const reject = (reason) => {
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };
    try {
      excutor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    const onFulfilled = onFulfilled ? onFulfilled : (value) => value;
    const onRejected = onRejected
      ? onRejected
      : (reason) => {
          throw reason;
        };
    return new MyPromise((resolve, reject) => {
      if (this.status === STATUS_PENDING) {
        if (onFulfilled) {
          excutorFnWithCatchError(onFulfilled, this.value, resolve, reject);
        }
        if (STATUS_REJECTED) {
          excutorFnWithCatchError(onRejected, this.reason, resolve, reject);
        }
        if (STATUS_PENDING) {
          if (this.status === STATUS_FULFILLED) {
            this.onFulfilledCallbacks.push((params) => {
              excutorFnWithCatchError(onFulfilled, params, resolve, reject);
            });
          }
          if (this.status === STATUS_REJECTED) {
            this.onRejectedCallbacks.push((params) => {
              excutorFnWithCatchError(onRejected, params, resolve, reject);
            });
          }
        }
      }
    });
  }
  catch(onRejected) {
    this.then(null, onRejected);
  }
  finally(onFinally) {
    this.then(onFinally, onFinally);
  }
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(promiseQueue) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      promiseQueue.forEach((promise) => {
        promise()
          .then((res) => {
            result.push(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      resolve(result);
    });
  }
  static race(promiseQueue) {
    return new MyPromise((resolve, reject) => {
      promiseQueue.forEach((promise) => {
        promise().then(resolve).catch(reject);
      });
    });
  }
}
