// live clock

function update() {
    $('#current_time').text(moment().format('MMMM D, YYYY H:mm:ss'));
}

setInterval(update, 1000);