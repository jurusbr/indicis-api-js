
class Logger{ 
	info(msg){
        console.log(msg);
    }

    config(msg){
        console.log(`[CONFIG] ${msg}`);
    }
    
    title(msg){
        console.log("*****************");
        console.log(`******* ${msg} **********`);
        console.log("*****************");
	}
}
module.exports = new Logger();