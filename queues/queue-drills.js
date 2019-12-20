const _Node = require('./node');

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  //add data to a queue...insertion
  enqueue(data) {
    const node = new _Node(data);
    if(this.first === null) {
      this.first = node;
    }
    if(this.last) {
      this.last.next = node;
    }
    this.last = node; //make the new node the last item on the queue
  }

  //remove from the queue...only can remove from the beginning of the queue

  dequeue(data) {
    if(this.first === null) {
      return;
    } 
    const node = this.first;
    this.first = this.first.next;
    if(node === this.last) {
      this.last = null;
    }
    return node.value;
  }
}

function main() {
  const starTrekQ = new Queue();

  starTrekQ.enqueue('Kirk');
  starTrekQ.enqueue('Spock');
  starTrekQ.enqueue('Uhura');
  starTrekQ.enqueue('Sulu');
  starTrekQ.enqueue('Checkov');
  display(starTrekQ);
  starTrekQ.dequeue('Spock');
  console.log(starTrekQ);
}
main();

//peek at first item in the queue
function peek(queue) {
  if(!queue.first) return null;
  return queue.first.value;
}

//check to see if the queue is empty or not
function isEmpty(queue) {
  return (queue.first === null);
}

function display(queue) {
  let currNode = queue.first;
  if(currNode === null) console.log('empty queue');
  while(currNode.next !==null) {
    console.log(currNode.value);
    currNode = currNode.next;
  }
  console.log(currNode.value);
}

const pairOff = function (str, mQ, fQ) {
  if (str.charAt(0) === 'M') {
    mQ.enqueue(str);
  } else {
    fQ.enqueue(str);
  }

  if (!isEmpty(mQ) && !isEmpty(fQ)) {
    console.log(`F dancer is ${fQ.dequeue()}, and the M dancer is ${mQ.dequeue()}`);
  }
};

const banker = function(qu) {
  while(!isEmpty(qu)) {
    console.log(peek(qu) + ' is talking with the banker.');
    let d4 = Math.floor(Math.random() * 4);
    if(d4 === 0) {
      console.log('But they failed to fill out proper paperwork and have to go to the back of the line.');
      qu.enqueue(qu.dequeue());
    }else  {
      console.log(peek(qu) + ' left the bank.');
      qu.dequeue();
    }
    console.log(' '); 
  }
};
