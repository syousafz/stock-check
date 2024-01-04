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
    }, timeout : 1000)
}

$(document).ready(function () {
    tickers.forEach(function(ticker : T) {
        addTickerToGrid();
    });

    updatePrices();

    $('add-ticker-form').submit(function(e) {
        e.preventDefault();
        var newTicker = $('#new-ticker').val().toUpperCase();
        if (!tickers.includes(newTicker)) {
            tickers.push(newTicker);
            localStorage.setItem('tickers', JSON.stringify(tickers))
            addTickerToGrid(newTicker);
        }
        $('new-ticker').val('');
        updatePrices();
    });

    $('#tickers-grid').on('click', '.remove-btn', function() {
        var tickerToRemove = $(this).data('ticker');
        tickers = tickers.filter(t => t !== tickerToRemove);
        localStorage.setItem('tickers', JSON.stringify(tickers))
        $(`#${tickerToRemove}`).remove();
    });

    startUpdateCycle();
});

function addTickerToGrid(ticker): void {
    $('#ticker-grid').append(`<div id="${ticker}" class="stock-box">`)
}