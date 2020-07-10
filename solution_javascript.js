class Node { 
  constructor(op, pa, prev, next){
    this.op = op,
    this.pa = pa,
    this.prev = prev,
    this.next = next
  }

}

class EventSourcer {
  constructor() {
    this.value = 0;
    this.current = new Node(null, 0, null, null);
  }

//use doubly linked list

  setValue(){
    if(this.current.pa != null){
      this.value = this.current.pa;
    }
    
  }

  add(num) {
    //create new node
    this.current.next = new Node("add", num + this.current.pa, this.current, null);

    //set previous node reference for new node
    // this.current.next.prev = this.current;

    //update current node to new node
    this.current = this.current.next;
    
    //update the value
    this.setValue();

  }
  subtract(num) {
    this.current.next = new Node("sub", this.current.pa - num, this.current, null);

    // this.current.next.prev = this.current;

    this.current = this.current.next;

    this.setValue();
  }
  undo() {
    if(this.prev != null){
      this.current = this.current.prev;
      this.setValue();
    }
    
  }
  redo() {
    if(this.next != null){
      this.current = this.current.next;
      this.setValue();
      
    }
  }
  bulk_undo(num) {
    while(num != 0 && this.prev != null){
      this.undo();
      num--;
    }
  }
  bulk_redo(num) {
    while(num != 0 && this.next != null){
      this.redo();
      num--;
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
