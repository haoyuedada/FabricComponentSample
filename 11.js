let obj = {
  '51': {count: 1, time: 1641651467},
  '52': {count: 1, time: 1641651468},
  '53': {count: 1, time: 1641651466},
};
let arr =   Object.entries(obj)
    .sort(([, a], [, b]) => a.time - b.time);

const sortedObj = 
Object.fromEntries(
    arr
);

console.log(arr);
console.log(sortedObj);
console.log(obj);
