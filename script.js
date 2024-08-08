// freecodecamp uses price and cid to evaluate code 
let price = 19.5;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const PENNY = 0.01;
const NICKEL = 0.05;
const DIME = 0.1;
const QUARTER = 0.25;
const ONE = 1;
const FIVE = 5;
const TEN = 10;
const TWENTY = 20;
const HUNDRED = 100;

const INSUFFICIENT_FUNDS = "Status: INSUFFICIENT_FUNDS";
const OPEN = "Status: OPEN";
const CLOSED = "Status: CLOSED";

const cashInput = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const changeDueElement = document.getElementById("change-due");

function changeDue() {

    const cash = parseFloat(cashInput.value);
    const changeDue = cash - price;

    if (cash < price) {

        alert("Customer does not have enough money to purchase the item");

    } else if (changeDue === 0) {

        changeDueElement.textContent = "No change due - customer paid with exact cash";

    } else {

        const msg = changeAvailability(changeDue);

        if (msg === INSUFFICIENT_FUNDS) {

            displayInsufficientFunds();

        } else if (changeDue > 0) {

            let arr = processChange(changeDue, msg);
            displayOpen(arr);

        }
    }
}

// check if change is available
function changeAvailability(changeDue) {

    let changeAvailable = 0;
    for (let i = 0; i < cid.length; i++) {
        changeAvailable += cid[i][1];
    }

    if (changeDue > changeAvailable) {

        return INSUFFICIENT_FUNDS;

    } else if (changeDue == changeAvailable) {

        return CLOSED;

    } else {

        return OPEN;

    }
}

// display "Insufficient Funds"
function displayInsufficientFunds() {
    changeDueElement.textContent = INSUFFICIENT_FUNDS;
}

// display "Open" 
function displayOpen(arr) {

    let s = "";

    for (let i = 0; i < arr.length; i++) {
        s += arr[i];
    }

    changeDueElement.textContent = s;
}

// process change
function processChange(changeDue, status) {
    let returnArr = [status];

    for (let i = cid.length - 1; i >= 0; i--) {

        const item = cid[i];
        const itemName = item[0];
        let value;

        switch (itemName) {
            case "PENNY":
                value = PENNY;
                break;
            case "NICKEL":
                value = NICKEL;
                break;
            case "DIME":
                value = DIME;
                break;
            case "QUARTER":
                value = QUARTER;
                break;
            case "ONE":
                value = ONE;
                break;
            case "FIVE":
                value = FIVE;
                break;
            case "TEN":
                value = TEN;
                break;
            case "TWENTY":
                value = TWENTY;
                break;
            case "ONE HUNDRED":
                value = HUNDRED;
                break;
            default:
                value = 0;
        }

        if (value !== 0 && changeDue > 0) {

            let availaleItem = Math.ceil(item[1] / value);
            let changeCount = 0;

            while (value <= changeDue && availaleItem > 0) {
                changeCount += value;
                availaleItem--;
                changeDue = (changeDue - value).toFixed(2);
            }

            if (changeCount > 0) {
                returnArr += ` ${itemName}: $${changeCount.toFixed(2)}`;
            }
        }
    }

    if (changeDue > 0) {
        return [INSUFFICIENT_FUNDS];
    } else {
        return returnArr;
    }
}

purchaseButton.addEventListener("click", changeDue);