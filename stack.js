const _Node = require('./node');

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    //if the stack is empty  
    if (this.top === null) {
      this.top = new _Node(data, null);
      return; //new node will be at the top of the stack
    }
    //if the stack isn't empty
    const node = new _Node(data, this.top); //create new node, push data to that node
    this.top = node;
  }
  //remove the top of the stack
  pop() {
    const node = this.top;
    this.top = node.next;  //point pointer to next item
    return node.data; //that item becomes the top of the stack
  }
}

//Drill 1: Create a stack
function main() {
  const starTrek = new Stack();

  starTrek.push('Kirk');
  starTrek.push('Spock');
  starTrek.push('McCoy');
  starTrek.push('Scotty');
  starTrek.pop('McCoy');
  display(starTrek);
  console.log(starTrek);
}

main();

//Drill 2: Useful methods for a stack

//look at top of stack without removing it
function peek() {
  if (stack.top === null) {
    return null;
  }
  return stack.top.data;
}

//check if stack empty or not
function isEmpty(stack) {
  return (stack.top === null);
}

//display teh entire contents of the slack
function display(newStack) {
  let currNode = newStack.top;
  if (currNode === null) console.log('empty stack');
  while (currNode.next !== null) {
    console.log(currNode.value);
    currNode = currNode.next;
  }
  console.log(currNode.value);
}

//determine whether a given input is a palindrome or not
//compare front half to the back half the string
//ignore the character in the middle if the string has an odd number of chars
//loop through the first half of the string and push chars to a stack
//then iterate through the second half of the string and compare the top char in stack
//to the next char of the word.  if at any point stackChar !== stringChar, return false
//else, return true
function is_palindrome(string) {
  string = string.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  if (string.length <= 1) return true;
  const endOfIndex = Math.floor((string.length - 2) / 2);
  const startOfIndex = Math.floor((string.length / 2));

  const charStack = new Stack();

  for (let i = 1; i <= endOfIndex; i++) {
    charStack.push(string[i]);
  }
  for (let i = startOfIndex; i < string.length; i++) {
    if (string[i] !== charStack.pop()) return false;
  }
  return true;
}
console.log(is_palindrome('dad'));
console.log(is_palindrome('A man, a plan, a canal: Panama'));
console.log(is_palindrome('1001'));
console.log(is_palindrome('Tauhida'));

//Drill 4: Matching parentheses in an expression
function parenthesisCheck(string) {
  if (!string.length) return null;
  const parStack = new Stack();
  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') {
      parStack.push('(');
    }
    if (string[i] === ')') {
      if (isEmpty(parStack)) {
        console.log('You are missing a"("');
        return false;
      }
      parStack.pop();
    }
  }
  if (!isEmpty(parStack)) {
    console.log('You are missing a ")"');
    return false;
  }
  return true;
}

//Drill 5: Sort Stack
function sortStack(stack) {
  if (stack.top === null || stack.top.next === null) return stack;

  const newStack = new Stack();
  let minVal = stack.top.value;
  let maxVal = stack.top.value;
  let currNode = stack.top;
  while (currNode.next !== null) {
    if (currNode.value > maxVal) maxVal = currNode.value;
    if (currNode.value < minVal) minVal = currNode.value;
    currNode = currNode.next;
  }
  if (currNode.value > maxVal) maxVal = currNode.value;
  if (currNode.value < minVal) minVal = currNode.value;

  newStack.push(maxVal);

  while (newStack.top.value !== minVal) {
    let currNode = stack.top;
    let currMax = minVal;

    while (currNode.next !== null) {
      if (currNode.value > currMax && currNode.value < newStack.top.value) {
        currMax = currNode.value;
      }
      currNode = currNode.next;
    }
    if (currNode.value > currMax && currNode.value < newStack.top.value) {
      currMax = currNode.value;
    }
    newStack.push(currMax);
  }
  return newStack;

}