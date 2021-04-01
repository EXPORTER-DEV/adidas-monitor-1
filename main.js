const request = require('request-promise'); 

const getStock = async (url) => {
	console.log('Initing Adidas Stock Monitor for: '+url);

	const pid = url.split("://")[1].split("/")[2].split('.')[0];

	console.log('Got PID: '+pid);

	let response = 0;
    await request({
    	gzip: 1,
    	url: 'https://www.adidas.ru/api/products/'+pid+'/availability/',
    	headers: {
    		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.73.11 (KHTML like Gecko) Version/7.0.1 Safari/537.73.11'
    	}
    }).then((b) => {
    	response = JSON.parse(b);
    });
    if(!response) return;

    let stock = 0;
   	for(let i = 0; i < response.variation_list.length; i++){
   		if(response.variation_list[i].availability > 0){
   			console.log("IN STOCK: "+response.variation_list[i].size);
   			stock = 1;
   		}
   	}
   	if(stock == 0){
   		console.log('OUT OF STOCK.');
   	}
};

getStock("https://www.adidas.ru/krossovki-stan-smith/FX5502.html");