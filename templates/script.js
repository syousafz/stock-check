var tickers = JSON.parse(localStorage.getItem(key:'tickers')) || [];
var lastPrices:{} = {};
var counter:number = 10;

function startUpdateCycle() : void {
    updatePrices();
    var countdown : number = setInterval(handler: function () : void {
        counter--;
        $('#counter').text(counter);
        if (counter <= 0) {
            updatePrices();
            counter = 10;
        }
    })
}