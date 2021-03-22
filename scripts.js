let timeout = 100;
var date;

const isBrowserLocale24h = () =>
    !new Intl.DateTimeFormat(navigator.language, { hour: "numeric" })
    .format(0)
    .match(/AM/);

$().ready(() => {
    let digits = ['hmsd', 'hlsd', 'mmsd', 'mlsd'];
    digits.forEach(digit => {
        let divs = "";
        for (let i = 0; i < 15; i++) {
            if (i == 4 || i == 10) {
                divs += `<div class="grid-child" id="${digit}-${i}"></div>`;
            } else {
                divs += `<div class="grid-child" id="${digit}-${i}"></div>`;
            }
        }
        $(`#${digit}`).html(divs);
    });
    setInterval(() => start(), 1000);
});

function start() {
    let time = new Date();
    if (date == undefined || (date.getMinutes() != time.getMinutes() || date.getHours() != time.getHours())) {
        date = time;
        const hours = time.getHours();
        const minutes = time.getMinutes();
        console.log((hours / 10));
        setTimeout(() => put(Math.floor(hours / 10), 'hmsd'), timeout * 0, hours);
        setTimeout(() => put(hours % 10, 'hlsd'), timeout * 1, hours);
        setTimeout(() => $('.colon').fadeIn().css('display', 'grid'), timeout * 2, hours);
        setTimeout(() => put(Math.floor(minutes / 10), 'mmsd'), timeout * 3, minutes);
        setTimeout(() => put(minutes % 10, 'mlsd'), timeout * 4, minutes);
        if (isBrowserLocale24h) {
            const ampm = hours >= 12 ? '.am' : '.pm';
            const pmam = hours <= 12 ? '.am' : '.pm';
            setTimeout(() => {
                $(ampm).fadeOut();
                $(pmam).fadeIn();
            }, timeout * 5, ampm)
        }
    }
}

function put(number, onContainer) {
    let numbers = [
        [0, 1, 2, 3, 5, 6, 8, 9, 11, 12, 13, 14],
        [1, 2, 5, 8, 11, 14],
        [0, 1, 2, 5, 6, 7, 8, 9, 12, 13, 14],
        [0, 1, 2, 5, 6, 7, 8, 11, 12, 13, 14],
        [0, 2, 3, 5, 6, 7, 8, 11, 14],
        [0, 1, 2, 3, 6, 7, 8, 11, 12, 13, 14],
        [0, 1, 2, 3, 6, 7, 8, 9, 11, 12, 13, 14],
        [0, 1, 2, 5, 8, 11, 14],
        [0, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14],
        [0, 1, 2, 3, 5, 6, 7, 8, 11, 12, 13, 14]
    ];
    let stack = numbers[number];
    setOut(0, stack, onContainer);
};

function setOut(start, stack, onContainer) {
    setTimeout(() => {
        if (start == 15) return;
        if (stack[0] != start) {
            setColor(start, onContainer, false);
        } else {
            setColor(stack[0], onContainer, true);
            stack.shift();
        }
        if (start == 3 || start == 9) start += 2;
        else start += 1;
        setOut(start, stack, onContainer);
    }, 50, start, stack, onContainer);
}

function setColor(location, onContainer, toStatus) {
    let id = `#${onContainer}-${location}`;
    let status = ($(id).hasClass('colored-location'));
    if (status !== toStatus) {
        if (toStatus == true) {
            $(id).animate({ opacity: 1 });
        } else $(id).animate({ opacity: 0 });
        $(id).toggleClass('colored-location');
    }
};