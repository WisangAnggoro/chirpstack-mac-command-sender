const grpc = require('grpc');
const networkServerService = require('@chirpstack/chirpstack-api/ns/ns_grpc_pb');
const networkServerServiceMessages = require('@chirpstack/chirpstack-api/ns/ns_pb');

function callback (i)
{
	console.log(i)
}

module.exports = {
	sendMacCommand: function (CSSIP, devEUI, macCommandBytes) 
	{	
		let networkServerServiceClient = new networkServerService.NetworkServerServiceClient(CSSIP,	grpc.credentials.createInsecure());
		let cList
		let macCmd = new networkServerServiceMessages.CreateMACCommandQueueItemRequest();
		
		devEUI = new Uint8Array( devEUI );
		macCommandBytes = new Uint8Array( macCommandBytes );
	
		cList = [ macCommandBytes ]; 
		
		// console.log(devEUI)
		// console.log(cList)
			
		macCmd.setDevEui( devEUI );
		macCmd.setCid( 1 );
		macCmd.setCommandsList( cList );

		return new Promise((resolve,reject)=>{
			networkServerServiceClient.createMACCommandQueueItem( macCmd, ( err, res) => { 
				if( !err)
				{
					console.log( 'createMACCommandQueueItem result : ', res); 
					// callback(null);
					resolve(true)
				}
				else
				{
					console.log( 'createMACCommandQueueItem ERROR details: ', err.details);
					// callback(err);
					reject(false)
				}
			}); 
		})
	
		 
	}
}