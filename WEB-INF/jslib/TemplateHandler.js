var templateDir = "templates";
var Template = require("cjsTemplate").Template;

var TemplateHandler = function(obj){
		var out, templateName, templateString;
	
		/*	
		if (obj.renderTemplate){
			try {
				out = obj.renderTemplate();
				response.setContentType("text/html; charset=utf-8");
				response.getOutputStream().print(out);
				return;
			}catch(e){
				//squelching error for the first attempt after reload
				//console.log("//FIXME figure out how to manage the parser closure below, transient doesn't seem to work, not sure a cluster would either");
				//console.log("Error executing template from cache: " + e);	
			}
		}
		*/
	
		print("renderTemplate() not found, loading template from disk");

		if (obj.template) {
			templateName = templateDir + "/" +  obj.template + ".html";
			//print("Reading Template: " + templateName);
			templateString = readFile(templateName)
		}else{
			templateName = templateDir + "/" + obj.id + ".html";
			//print("Reading Template: " + templateName);
			try {
				templateString = readFile(templateName);
			}catch(err){
				console.log("Unable to read template from : " + templateName);
			}

			if (!templateString){
				try {
					var parts = obj.id.split("/");
					parts.pop();
					templateName = templateDir + "/" + parts.join("/") + ".html";
					//print("Reading Template: " + templateName);
					templateString = readFile(templateName);
				}catch(err){
					console.log("Unable to read template from : " + templateName);
					return err;
				}
			}
		}

		
		if (templateString){
			try {
				print("Found Template: " + templateName);
				print("Parsing Template");
			        var template = new Template();
			        var functionStr = template.parse(templateString);

			        if(functionStr){
			                print("Successfully compiled: " + functionStr);
					//print("handler this: " + serialize(obj));
			                obj.renderTemplate = functionStr;
			                //commit();

					print("Rendering Template");
					print("TEMPLATEFUNCTION: " + functionStr);
					out = new Function('$data',functionStr)(obj);
			        }else{
			                print("Template compilation failed");
			        }
			}catch(err){
				console.log("Error compiling template: " + err);
			}
		}	

		if (!out) {
			print("Error rendering html/template in ", obj.id);
			return;
		}

		print("Rendering Completed. Rendered length: " + out.length);
		response.setContentType("text/html; charset=utf-8");
		response.getOutputStream().print(out);
}

exports.TemplateHandler = TemplateHandler;

