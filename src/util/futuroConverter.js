
class FuturoConverter{    
    
    constructor(){
        this.months =  {
            "F":"01",
            "G":"02",
            "H":"03",
            "J":"04",
            "K":"05",
            "M":"06",
            "N":"07",
            "Q":"08",
            "U":"09",
            "V":"10",
            "X":"11",
            "Z":"12"
        }
    }
    
    fromCodeToDate(code){
        const coreCode = code.substring(3);
        const month = coreCode.charAt(0);
        const year = code.substring(4);
        return `${this.months[month.toUpperCase()]}-${year}`
	}
}
module.exports = new FuturoConverter();