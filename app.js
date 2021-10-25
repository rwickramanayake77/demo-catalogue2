// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// All the room in the world for your code
// Message listener function called for messages containing "hello"
const TARGET_CHANNEL = 'C02EJRU1B7Z'

app.message('RECORDING: Public Sector Solutions Enablement', async ({ message, client }) => {
  try {
    // Call chat.post
    const result22 = await client.chat.postMessage({
      channel: TARGET_CHANNEL,
      text: `Welcome to the team, you can introduce yourself in this channel.`
    });
    
    console.log(message);
    
    var heading = ":sparkler:  " + message.text.split("\n")[0] + "  :sparkler:";      
    var body = "\n\n" + message.text.split("\n")[2] ;   
    
    /*var options = {};
    options.user='U02DG1MDWTZ';
    const user = await client.users.profile.get(options);
    console.log("user: "+ user.real_name);*/
    
    var blockJSON1 = {channel: TARGET_CHANNEL ,     
      blocks: [
      {
			"type": "image",
			"alt_text": "test",
			"image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwM0tx9oMkZEE3FZYVRVx97KK_IQYKplGAww&usqp=CAU"
		  },
      {
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": heading,
				"emoji": true
			  }    
		  },          
		  {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": body     
			},         
		  },
      {
        "type": "divider"
      }]};
    
    var demoList = message.text.split("Agenda:")[1].split("\n\n")[0].split("\n");
    var demoCount = demoList.length;
    console.log("demo count: "+demoCount);    
    var recordingLink = message.text.split("Recording is")[1].split("<")[1].split("view")[0];
       
    for (var i=1; i<demoCount; i++){    
      var blockJSON2 = 
      {
        
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Presenter: *" + demoList[i].split("-")[2]   
			}, 
          "accessory": 
        {
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": ":fire3: Play Recording",
						"emoji": true
					},
					"value": "click_me_123",
					"url": recordingLink
				},        
    };
      
      var blockJSON3 = 
      {
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Customer*"
				},
				{
					"type": "mrkdwn",
					"text": "*Use Case*"
				},
				{
					"type": "plain_text",
					"text": demoList[i].split("-")[0]
				},
				{
					"type": "plain_text",
					"text": demoList[i].split("-")[1]
				}
			],
		};
      
      blockJSON1.blocks.push(blockJSON2);
      blockJSON1.blocks.push(blockJSON3);
      //blockJSON1.blocks.push(blockJSON4);
      blockJSON1.blocks.push({
  "type": "divider"
    }); 
    }
    

    /*var blockJSON4 = 
    {
        
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "123"  
			}, 
          "accessory": 
        {
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": ":fire3: Play Recording",
						"emoji": true
					},
					"value": "click_me_123",
					"url": recordingLink
				},        
    };
    
    blockJSON1.blocks.push(blockJSON4);
    blockJSON1.blocks.push({
  "type": "divider"
    }); */
    
    var lastLine = ":warning: " + message.text.split("\n")[message.text.split("\n").length-1] + ":warning: " ;
    
    blockJSON1.blocks.push({
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": lastLine
        
			}});
    
    console.log("JSON Msg 11:  "+ JSON.stringify(blockJSON1));
    const result = await client.chat.postMessage(blockJSON1);
  }
  catch (error) {
    console.error(error);
  }
});

//quip integration test code
/*var quip = require('./quip');
var client = new quip.Client({accessToken: "Y1VVQU1BdDhyM2o=|1663829552|+zxu8z3KI9FJnWusF5jrQ2K9Gr1LWkfv1lJfU3J6UAg="});

client.getAuthenticatedUser(function(err, user) {
    client.getFolder(user["starred_folder_id"], function(err, folder) {
        console.log("You have", folder["children"].length,
                    "items in your starred folder");
    });
});
*/

var object = {};

//var body = '<html><body><h1>This is heading 1</h1></body></html>';
//var body = '|r |a |s |i |k |a | | | | | | | | | | |\n|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |';

var body = '# DemoCatalogueRas55\n|A |B | | | | | | | | | | | | | | |\n|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |\n|1 |2 | | | | | | | | | | | | | | |\n|3 |4 | | | | | | | | | | | | | | |';

object.format = 'markdown';
object.content = body;
object.title='DemoCatalogueRas55';
object.type='spreadsheet';


/*client.newDocument(object, function(err, folder){
  console.log("test");
  
});*/

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
