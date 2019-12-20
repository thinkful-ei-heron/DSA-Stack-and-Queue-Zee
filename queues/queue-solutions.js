7 - Create a queue class using Doubly linked List */
class _Node {
    constructor(value) {
        this.value=value,
        this.next=null,
        this.prev=null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        //create a node with the data that you want to add to the queue
        const node = new _Node(data);

        //if the queue is empty, 
        //make the node the first node on the queue
        if (this.first === null) {
            this.first = node;
        }
        //if there is something on the queue already
        //then take the node that is currently at the end of the queue
        //and link it to the new node
        if (this.last) {
            node.prev = this.last;
            this.last.next = node;
        }
        //make the new node the last item on the queue
        this.last = node;
    }
    dequeue() {
         //if the queue is empty, there is nothing to return
        if (this.first === null) {
            return;
        }
        //make the first item on the queue to be the 
        //the item that is next on the line 
        // the item after the current first item
        const node = this.first;
        this.first = node.next;
         //if this is the last item in the queue
        if (node === this.last) {
            this.last = null;
        }
        return node.value;
    }
}


/**********************/
function squareDance(queue) {
    const spareMen = new Queue();
    const spareWomen = new Queue();

    const pairs = new Queue();

    let personA, personB;
    while (personA = queue.dequeue()) {
        if (personA.gender === 'male') {
            if (personB = spareWomen.dequeue()) {
                pairs.enqueue([personA, personB]);
            }
            else {
                spareMen.enqueue(personA);
            }
        }

        else if (personA.gender === 'female') {
            if (personB = spareMen.dequeue()) {
                pairs.enqueue([personA, personB]);
            }
            else {
                spareWomen.enqueue(personA);
            }
        }
    }
    return pairs;
}

const queue = new Queue();
queue.enqueue({
    name: 'Gwendolyn Wilderman',
    gender: 'female'
});
queue.enqueue({
    name: 'Wilbur Brakus',
    gender: 'male'
});
queue.enqueue({
    name: 'Vallie Howell',
    gender: 'female'
});
queue.enqueue({
    name: 'Nova Doyle',
    gender: 'female'
});
queue.enqueue({
    name: 'Monica Turcotte',
    gender: 'female'
});
queue.enqueue({
    name: 'Corine Smith',
    gender: 'female'
});
queue.enqueue({
    name: 'Jamir Sporer',
    gender: 'male'
});

squareDance(queue).display();

/******************************/
function ophidianBank() {
    const queue = new Queue();
    // Assumption: New people join the queue at the same rate they are seen

    for (var i=0; i<100; i++) {
        console.log('Person joined line');
        queue.enqueue({
            angriness: 0 // How fed up the person is with doing their paperwork
        });

        const person = queue.dequeue();
        if (Math.random() < 0.25) {
            console.log(`Person with angriness ${person.angriness} sent to the back`);
            person.angriness++;
            queue.enqueue(person);
        }
        else {
            console.log(`Person with angriness ${person.angriness} processed`);
        }
    }
}

ophidianBank();
    
/*
Queue Implementation using Stack
A common way to implement a queue is to use a doubly linked list. 
Using the concept of queue in mind, implement a queue using 2 stacks and no other data structure. 
(You are not allowed to use a doubly linked list or array. Use the stack implementation 
with Linked list from your today’s reading material)
*/

class Queue {
    constructor() {
        //this.top = null;
        this.oldStack = new Stack();
        this.newStack = new Stack();
    }
    eneque(item) {
        this.oldStack.push(item);
    }
   
    dequeue() {
        this._reverseElement();
        return this.newStack.pop();
    }
    peek() {
        this._reverseElement();
        return this.newStack.peek();
    };
    _reverseElement(){
        if(isEmpty(this.newStack)){
            while(!isEmpty(this.oldStack)){
                this.newStack.push(this.oldStack.pop());
            }
        }
    }
}