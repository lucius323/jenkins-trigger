'use strict'

///////////////////////////////////////////////////////////
// Node imports, must be installed with npm install and
// packaged along the lambda code zip
//
///////////////////////////////////////////////////////////

const request = require('request');

///////////////////////////////////////////////////////////
// Lambda Handler, this is the method that gets invoked
// when the lambda server is triggered
//
///////////////////////////////////////////////////////////
exports.handler = ( event, context, callback ) => {
	
	console.log(event)
	
	let repo = event.body.repository.name,
		ref = event.body.ref,
		branch = ref.split('/')[2],
		job_name = `${repo}-${branch}`
		
	console.log(`commit branch => ${branch}`)
		
	const user_name = "username",
	      user_secret = "usersecret",
	      jenkins_url = "jenkinsurl",
	      dev_token = "devtoken",
	      prod_token = "prodtoken"
	     
	let trigger_url = `https://${user_name}:${user_secret}@${jenkins_url}/${job_name}/build?token=${branch == 'dev' ? dev_token : prod_token}`
	
	console.log(trigger_url)
	
	let options = {
	    url: trigger_url,
	    method : "POST"
	}


	request(options,(err,res,body)=>{
		if(err){
			callback( null , { errMsg: err } )
		}
		else {
			console.log(`res body => ${body}`)
			callback( null , { resultMsg : res } )

		}
	})
}
