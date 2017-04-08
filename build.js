var file = require('fs');
exports.write = function(){

var rd = file.createReadStream('stories/story.js');
var data = ""
var storyFormat = '{ "base64": "{{story}}" }';


rd.on('readable', function(){
	var chunk;
	var startWriting = 0;
	while( null != (chunk = rd.read(1))){
		if( chunk == "'")
		{
			startWriting = !startWriting;
			continue;
		}
		if(startWriting)
			data += chunk;
	}
	writeIt();
});

function writeIt(){

	storyFormat = storyFormat.replace("{{story}}", data);
	var wr = file.createWriteStream('www/stories/story.json');
	wr.once('open', function(){
		wr.write(storyFormat);
		wr.end();
	});
}

}