module.exports = function(tmpl) {

	// Returns a function which takes one `data` argument used to populate
	// the template. Inspired by Resig's micro-templating thing. 
	//
	// <: ... JS goes here :>
	// <:=output:>
	//
	// todo: Add echo/print fn

	var regex = /~:(=)?(.+?):~/g,
		match,
		prevI = 0,
		nonCode,
		code,
		isPrint,
		ret = [],
		fn;

	tmpl = tmpl.replace(/[\r\n]/g, '\\\n\\n');
	
	while (match = regex.exec(tmpl)) {

		nonCode = tmpl.substring(prevI, regex.lastIndex - match[0].length);
		isPrint = !!match[1]
		code = match[2];;
			
		ret.push('s+=("' + nonCode.replace(/"/g,'\\"') + '");');
		ret.push(isPrint ? 's+=('+code+');' : code + ';');
	
		prevI = regex.lastIndex;
			
	}
	
	if (prevI < tmpl.length) {
		// Push in last bit (not gained from loop)
		ret.push('s+=("' + tmpl.substring(prevI).replace(/"/g,'\\"') + '");');
	}

	
	return Function('data', "var s = '';with(data){" + ret.join('') + "} return s;");
		
};
