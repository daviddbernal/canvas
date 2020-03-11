Array.prototype.iterator = function(callback) {
  for (let iter in this)
    if (typeof this[iter] !== "function") callback(this[iter]);
};
function iterator(callback) {
  for (let i = 0; i < this.length; i++) callback(this[i]);
}
function pow(...args) {
  let res = 1;
  for (let i = 0; i < args[1]; i++) res *= args[0];
  return res;
}
function hypo() {
  return Math.sqrt(pow(arguments[0], 2) + pow(arguments[1], 2));
}
