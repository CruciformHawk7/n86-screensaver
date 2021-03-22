let timeout = 300;
let digits = ['hmsd', 'hlsd', 'mmsd', 'mlsd'];
var date;
var wasPM;
var blankMethod = false;

const isBrowserLocale24h = () =>
    !new Intl.DateTimeFormat(navigator.language, { hour: "numeric" })
    .format(0)
    .match(/AM/);

$(() => {
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
        const h1 = Math.floor(hours / 10);
        const h2 = hours % 10;
        const m1 = Math.floor(minutes / 10);
        const m2 = minutes % 10;
        if (blankMethod) setClockViaBlank(h1, h2, m1, m2);
        else setClock(h1, h2, m1, m2);
    }
}

function setClock(h1, h2, m1, m2) {
    let hours = (h1 * 10) + h2;
    setTimeout(() => put(h1, digits[0]),
        timeout * 0, h1);
    setTimeout(() => put(h2, digits[1]),
        timeout * 1, h2);
    setTimeout(() => {
            $('.colon-1').fadeIn();
            $('.colon-2').fadeIn();
        },
        timeout * 2);
    setTimeout(() => put(m1, digits[2]),
        timeout * 3, m1);
    setTimeout(() => put(m2, digits[3]),
        timeout * 4, m2);


    if (isBrowserLocale24h) {
        let isPM = hours >= 12;
        if (wasPM == undefined || wasPM != isPM) {
            wasPM = isPM;
            setTimeout(() => {
                if (isPM == true) {
                    $('.pm').fadeIn();
                    $('.am').fadeOut();
                } else {
                    $('.am').fadeIn();
                    $('.pm').fadeOut();
                }
            }, timeout * 5, wasPM, isPM);
        }
    }
}

function setClockViaBlank(h1, h2, m1, m2) {
    let hours = (h1 * 10) + h2;
    setTimeout(() => put(10, digits[0]),
        timeout * 0, h1);
    setTimeout(() => put(h1, digits[0]),
        timeout * 0.5, h1);
    setTimeout(() => put(10, digits[1]),
        timeout * 1, h2);
    setTimeout(() => put(h2, digits[1]),
        timeout * 1.5, h2);
    setTimeout(() => {
            $('.colon-1').fadeIn();
            $('.colon-2').fadeIn();
        },
        timeout * 2);
    setTimeout(() => put(10, digits[2]),
        timeout * 3, m1);
    setTimeout(() => put(m1, digits[2]),
        timeout * 3.5, m1);
    setTimeout(() => put(10, digits[3]),
        timeout * 4, m2);
    setTimeout(() => put(m2, digits[3]),
        timeout * 4.5, m2);


    if (isBrowserLocale24h) {
        let isPM = hours >= 12;
        if (wasPM == undefined || wasPM != isPM) {
            wasPM = isPM;
            setTimeout(() => {
                if (isPM == true) {
                    $('.pm').fadeIn();
                    $('.am').fadeOut();
                } else {
                    $('.am').fadeIn();
                    $('.pm').fadeOut();
                }
            }, timeout * 5, wasPM, isPM);
        }
    }
}

function testRandom() {
    const h1 = Math.round(Math.random() * 2);
    const h2 = (h1 == 2) ? Math.round(Math.random() * 3) :
        Math.round(Math.random() * 9);
    const m1 = Math.round(Math.random() * 5);
    const m2 = Math.round(Math.random() * 9);

    console.log(`Setting time to ${h1}${h2}:${m1}${m2}.`);

    setClock(h1, h2, m1, m2);
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
        [0, 1, 2, 3, 5, 6, 7, 8, 11, 12, 13, 14],
        []
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