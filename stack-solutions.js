class _Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }
  push(data) {
    //if the top of the stack is empty, then the data will be the
    //top of the stack
    if (this.top === null) {
      this.top = new _Node(data);
      return;
    }

    //if the top already has something then create a new node
    //add data to the new node
    // have the pointer point to the top 
    const node = new _Node(data, this.top);
    this.top = node;
  }
  pop() {
    //in order to remove the top of the stack, you have to point
    //the pointer to the next item and that next item becomes the
    //top of the stack
    const node = this.top;
    this.top = node.next;
    return node.data;
  }
}

/****************************************************/
function peek() {
  //if the top of the stack does not have anything 
  //then the stack is empty
  //otherwise return what's on the top
  if (s.top === null) {
    return null;
  }

  return s.top.data;
}
function display(newStack) {
  // displays the entire contents of the stack
  let node = newStack.top;
  while (node) {
    console.log(node.data);
    node = node.next;
  }
}
function isEmpty(s) {
  return s.top === null;
}

/*
A palindrome is a word, phrase, or number that is spelled the same forward and backward. 
For example,dad is a palindrome; A man, a plan, a canal: Panama� is a palindrome if 
you take out the spaces and ignore the punctuation; and 1,001 is a numeric palindrome. 
We can use a stack to determine whether or not a given string is a palindrome.
Write a function that takes a string of letters and returns true or false to determine 
whether it is palindromic. For example:
console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
// true, true, true
*/
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const stack = new Stack();

  for (let i = 0; i < s.length; i++) {
    stack.push(s.charAt(i));
  }

  //compare the last half of the string to the first half
  for (let i = 0; i < s.length / 2; i++) {
    if (stack.pop() !== s.charAt(i)) {
      return false;
    }
  }

  return true;
}

// true, true, true
/*console.log(isPalindrome("dad"));
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("1001"));*/

// *****************

function parenthesesMatch1(s) {
  const stack = new Stack();

  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    if (char === '(') {
      stack.push(char);
    }
    else if (char === ')') {
      const candidate = peek(stack);
      if (!candidate) {
        return false;
      }
      stack.pop();
    }
  }

  if (peek(stack)) {
    return false;
  }
  return true;
}



// Multiple
function parenthesesMatch2(s) {
  const stack = new Stack();

  const brackets = {
    '(': ')',
    '{': '}',
    '[': ']'
  };

  const openBrackets = Object.keys(brackets);
  const closeBrackets = Object.values(brackets);

  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    if (openBrackets.includes(char)) {
      stack.push(char);
    }
    else if (closeBrackets.includes(char)) {
      const candidate = peek(stack);
      if (brackets[candidate] !== char) {
        return false;
      }
      stack.pop();
    }
  }

  if (peek(stack)) {
    return false;
  }
  return true;
}

// With strings
function parenthesesMatch3(s) {
  const stack = new Stack();

  const brackets = {
    '(': ')',
    '{': '}',
    '[': ']'
  };

  const openBrackets = Object.keys(brackets);
  const closeBrackets = Object.values(brackets);

  const quotes = ['"', "'"];

  let inQuotes = false;

  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);

    if (quotes.includes(char)) {
      if (inQuotes) {
        const candidate = peek(stack);
        if (candidate === char) {
          stack.pop();
          inQuotes = false;
        }
      }
      else {
        stack.push(char);
        inQuotes = true;
      }
    }
    else if (openBrackets.includes(char) && !inQuotes) {
      stack.push(char);
    }
    else if (closeBrackets.includes(char) && !inQuotes) {
      const candidate = peek(stack);
      if (brackets[candidate] !== char) {
        return false;
      }
      stack.pop();
    }
  }

  if (peek(stack)) {
    return false;
  }
  return true;
}

console.log(parenthesesMatch1("(1 + 2) + 3"));
console.log(parenthesesMatch1("(1 + 2) + 3)"));
console.log(parenthesesMatch2(")1 + 2) + 3"));
console.log(parenthesesMatch2("(1 + 2 + (3)"));
console.log(parenthesesMatch3("([({})])"));
console.log(parenthesesMatch3("([({)}])"));
console.log(parenthesesMatch3("'{(\"'"));
console.log(parenthesesMatch3("[{'('}('')]"));
console.log(parenthesesMatch3("[{'(\"}('')]"));

/***********************/

function sortStack(originalStack) {
  let newStack = new Stack();
  while (!isEmpty(originalStack)) {
    let temp = originalStack.pop();
    while (!isEmpty(newStack) && (peek(newStack) > temp)) {
      originalStack.push(newStack.pop());
    }
    newStack.push(temp);
  }
  while (!isEmpty(newStack)) {
    originalStack.push(newStack.pop());
  }
}