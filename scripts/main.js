'use strict';

var a = 5;
let b = 'Paul';
const c = null;

// console.log(typeof Number.isNaN(105 / b));

//Primitive data types
console.log(typeof a); //number
console.log(typeof b); //string
console.log(typeof true); //boolean
console.log(typeof undefined); //undefined
console.log(typeof 2n); //bigint
console.log(typeof Symbol('n')); //symbol
console.log(typeof c); //object //is a lie

//truthy, falsey
if (5 == true) {
  console.log('Yeey!');
} else if ('p' == 'p') {
  console.log('Nooo!');
} else {
}

a = 1;
switch (a) {
  case 1:
    console.log('E unu');
    break;
  case 2:
    console.log('E doi');
    break;
  default:
    console.log('E altceva');
}

if (a === 1) {
  console.log('E unu');
} else if (a === 2) {
  console.log('E doi');
} else {
  console.log('E altceva');
}

// nullish coalescing operator
console.log(null ?? 1);

let d;

// ...

const e = d ?? 14;

console.log(d);

// Valid names: Start with $, _, any letter a-z, A-Z; contain $, _, any letter or number
function avgOfThree(n1, n2, n3 = 0) {
  const sum = n1 + n2 + n3;
  const avg = sum / 3;
  return avg;
}

const func = avgOfThree;
console.log(func(2, 3, 4));

console.log(avgOfThree(2, 4));

//function declaration
function avg(...nums) {
  let sum = 0;
  // for (let i = 0; i < nums.length; i++) {
  //   const curNum = nums[i];
  //   sum += curNum;
  // }

  for (const curNum of nums) {
    sum += curNum;
  }

  // const sum = nums.reduce(function (sum, curNum) {
  //   return sum + curNum;
  // });

  // nums.forEach(function (curNum) {
  //   sum += curNum;
  // });

  return sum / nums.length;
}
console.log(avg(1, 2, 3, 4, 5, 6));

//function expression
const func1 = function () {
  return 'Paul';
};
console.log(func1());

//callback
function parent(cb) {
  return cb() + 4;
}

function child() {
  return 2;
}

console.log(parent(child));

//arrow functions
const arrow = (n1, n2) => n1 + n2;
const arrow2 = (n1, n2) => {
  return n1 + n2;
};

console.log(
  arrow(1, 2),
  parent(() => 7)
);

const res = [2, 5, 6, -3].reduce((sum, num) => sum + num, 0);
console.log(res);

//Complex types are mutable
const arr = [];
console.log(arr);
arr.push('Paul');
console.log(arr);
arr.unshift('Negoescu');
console.log(arr);
console.log(arr.shift());

arr[0] = 'Tudor';
console.log(arr);

//Primitives are immutable
// const str = 'Paul';
// console.log(str[0]);
// str[0] = 'T';
// console.log(str);
// console.log(str.charAt(1));
// console.log((3.1415).toFixed(3));
// console.log(new String('dasdas'));

const toSort = [3, -4, 5, 1];
console.log(
  toSort.toSorted((a, b) => b - a),
  toSort
);

// Object
const o = {
  prop: 'valoare',
  'Paul Negoescu': 'nume',
  0: 1,
  1: 2,
  2: 3,
};

console.clear();
console.log(o['Paul Negoescu'], o['prop'], o.prop, o[0]);

const numeProp = 'Paul Negoescu';
console.log(o[numeProp]);

const numeProp2 = 'test';
o[numeProp2] = 42;

console.log(o);

const o2 = {
  [numeProp2]: 105,
  func: function () {
    console.log('Yeeey!');
  },
  func2() {
    console.log('Even better!');
  },
};

console.log(o2);

o2.func2();

const valoare = 4;

const person = {
  fName: 'Paul',
  lName: 'Negoescu',
  height: 1.85,
  weight: 100,
  valoare,
  calculateBmi() {
    console.log(this);
    return (this.weight / this.height ** 2).toFixed(2);
  },
  func2: () => {
    console.log(this);
    return (this.weight / this.height ** 2).toFixed(2);
  },
  get fullName() {
    return this.fName + ' ' + this.lName;
  },
  set fullName(val) {
    [this.fName, this.lName] = val.split(' ');
  },
};

const name = 'Andrei';

// Destructuring Assignment
const arr1 = [1, 2, [3, 4, 5]];
const [, , [trei, , cinci]] = arr1;
console.log({ trei, cinci });
const o3 = {
  prop: 'val',
  prop2: [1, 6],
  prop3: { name: 'Paul' },
};
const {
  prop3: { name: alias },
  prop: altNume,
  prop,
} = o3;
console.log({ alias, altNume, prop });
// End Destructuring Assigment

console.log(person.fullName);
person.fullName = 'Andrei Oniga';
console.log(person.fullName, person.fName);

const func3 = person.calculateBmi;

const p = {
  // weight: 12,
  // height: 1.4,
  func: person.calculateBmi.bind('sdasdas'),
};

console.log(person.calculateBmi.apply({ weight: 10, height: 10 }));

// How to figure out what "this" is
// 1. This is determined at the time of function invocation
//      a. this is whatever is to the left of the .
//      b. if we "use strict", if there is nothing to the left of the dot, this is undefined
//      c. if we don't "use strict", if there is nothing to the left of the dot, this is window
//      d. using .call, or .apply we can set this to whatever we want
// 2. This can be determined at the moment of function creation:
//      a. arrow functions get their this from the current scope as if it is a normal variable => lexical this
//      b. using .bind we can set this to whatever we wan

console.clear();
// Object and Array Spreading
const a0 = ['Paul'];
const a1 = [1, 2, 3, a0];
const a2 = [4, 5, 6];
const maybeClone = a1;
const clone = [...a1];
const realClone = structuredClone(a1);

console.log(clone === a1, {
  clone: JSON.stringify(clone),
  a1: JSON.stringify(a1),
});

maybeClone[0] = 7;
clone[0] = 9;
console.log({ a1, maybeClone, clone });

function testPassByRef(a) {
  const clone = [...a];
  clone[0] = 42;
}

testPassByRef(a1);
console.log({ a1 });

const newArr = ['Paul', ...a2, 'Negoescu', ...a1, 8, 9, 10];
console.log({ newArr });

a0.push('Negoescu');
console.log({ a1, clone, realClone });

const o1 = { prop: 'test' };
const o8 = { newProp: 'Paul', ...o1 };
console.log(o8);

{
  let i = 0;
  while (i < 20) {
    console.log(i);
    i++;
  }
}

for (let i = 0; i < 20; i++) {
  console.log(i);
}

{
  let i = 20;
  do {
    console.log(i);
    i++;
  } while (i < 20);
}

for (const elem of a1) {
  console.log(elem);
}

for (const key in o8) {
  console.log(key, o8[key]);
}
