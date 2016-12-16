// // function SuperClass() {}
// // function SubClass() {}
// // function Surrogate() {}
//
// Surrogate.prototype = SuperClass.prototype;
// SubClass.prototype = new Surrogate();
// SubClass.prototype.constructor = SubClass;

Function.prototype.inherits = function(superClass) {
  function Surrogate() {}
  console.log(superClass);
  Surrogate.prototype = superClass.prototype;
  console.log(this);
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function Animal() {}
Animal.prototype.eat = function() {console.log("nom"); };

function Cat() {}
Cat.inherits(Animal);
let g = new Cat();
g.eat();
