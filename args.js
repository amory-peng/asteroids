function sum(...args) {
  let total = 0;
  args.forEach( (el)=> {
    total += el;
  });
  return total;
}

// console.log(sum(1, 2, 3, 40));

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

// Function.prototype.myBind = function(context) {
//   console.log(arguments);
//   let args = Array.from(arguments);
//   return () => this.apply(context, args.slice(1));
//
// };


Function.prototype.myBind = function(context, ...args) {
  console.log(args);
  // let args = Array.from(args);
  return (...args2) => this.apply(context, args.concat(args2));

};

function curriedSum(numArgs) {
  let numbers = [];
  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs + 1) {
      let total = 0;
      numbers.slice(1).forEach ((el) => {
        total += el;
      });

      return total;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum(numArgs);
}

Function.prototype.curry = function(numArgs) {
  let numbers = [];
  let that = this;
  function _curry(num) {
    numbers.push(num);
    if (numbers.length === numArgs + 1) {
      // return that.apply(that, numbers.slice(1));
      return that(...numbers.slice(1));
    } else {
      return _curry;
    }
  }
  return _curry(numArgs);
};




function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

// console.log(sumThree(4, 20, 6)); // == 30

// // you'll write `Function#curry`!
// let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// console.log(f1 = f1(6)); // = 30

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6)); // == 30
