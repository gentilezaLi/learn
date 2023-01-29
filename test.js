const Obj = {
	fn1: () => console.log(this),
	fn2: function() {console.log(this)}
}

Obj.fn1();
Obj.fn2();

