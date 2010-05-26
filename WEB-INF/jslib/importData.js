require("Page");
require("Demo");

var pages = [
	{id: "Home", name: "Home", 
		demos: function(){ 
			return load("Demo");
		}
	}
];

var demos = [
	{id: "TestDemo1", name: "Test Demo 1"},
	{id: "TestDemo2", name: "Test Demo 2"},
	{id: "TestDemo3", name: "Test Demo 3"},
	{id: "TestDemo4", name: "Test Demo 4"}
]

setupData = function(){
	function resolveImport(obj){
		for (var prop in obj){
			if (typeof obj[prop]=="object"){
				if (obj[prop]["$ref"]){
					obj[prop]=[].concat(load(obj[prop]["$ref"]));
				}

				if (obj[prop].length > 0){
					var map = obj[prop].map(function(o){
						if (o["$ref"]){
							return [].concat(load(o["$ref"]))[0];
						}else{
							return o;
						}
					});
					obj[prop]=map;
				}
			}
		}
	}

	demos.forEach(function(o){
		var p = new Demo(o);
		resolveImport(p);
		commit();	
	});

	pages.forEach(function(props){
		var p = new Page(props);
		resolveImport(p);
		commit();
	});

	commit();
}

try {
	print("Checking for Page/Home");
	load("Page/Home");
}catch(err){
	print("Page/Home not found, importing default dataset: " + err);
	setupData();
	User.createUser("dmachi", "fornow");
}
