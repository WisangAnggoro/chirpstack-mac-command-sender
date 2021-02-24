var grpc = require('grpc-web');
var networkServerService = require('@chirpstack/chirpstack-api/ns/ns_grpc_pb');
var networkServerServiceMessages = require('@chirpstack/chirpstack-api/ns/ns_pb');

function callback (i)
{
	console.log(i)
}
export function sendMacCommand(CSSIP, devEUI, macCommandBytes) 
{	
	let networkServerServiceClient = new networkServerService.NetworkServerServiceClient(CSSIP,	grpc.credentials.createInsecure());
	let cList
	let macCmd = new networkServerServiceMessages.CreateMACCommandQueueItemRequest();
	
	devEUI = new Uint8Array( devEUI );
	
	macCommandBytes = new Uint8Array( macCommandBytes );

    cList = [ macCommandBytes ];          
		
	macCmd.setDevEui( devEUI );
	macCmd.setCid( 1 );
	macCmd.setCommandsList( cList );

	networkServerServiceClient.createMACCommandQueueItem( macCmd, ( err, res) => { 
		if( !err)
		{
			console.log( 'createMACCommandQueueItem result : ', res); 
			callback(null);
		}
		else
		{
			console.log( 'createMACCommandQueueItem ERROR details: ', err.details);
			callback(err);
		}
	});  
}