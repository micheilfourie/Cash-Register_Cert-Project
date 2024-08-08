// freecodecamp uses price and cid to evaluate code 
let price = 19.52;
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

        } else if (changeDue >= 0) {

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

// display "Open" and "Closed"
function displayOpen(arr) {

    let s = "";

    for (let i = 0; i < arr.length; i++) {
        s += arr[i];
    }

    changeDueElement.textContent = s;
}

// process change
const processChange = (changeDue, status) => {

    const returnArr = [status];
    const itemValues = {
        PENNY: 0.01,
        NICKEL: 0.05,
        DIME: 0.1,
        QUARTER: 0.25,
        ONE: 1,
        FIVE: 5,
        TEN: 10,
        TWENTY: 20,
        "ONE HUNDRED": 100
    };

    for (const [itemName, value] of cid.reverse()) {
        let changeCount = 0;
        let availableItem = Math.ceil(value / itemValues[itemName]);

        while (itemValues[itemName] <= changeDue && availableItem > 0) {
            changeCount += itemValues[itemName];
            availableItem--;
            changeDue = (changeDue - itemValues[itemName]).toFixed(2);
        }

        if (changeCount > 0) {
            returnArr.push(` ${itemName}: $${changeCount.toFixed(2)}`);
        }
    }

    if (changeDue > 0) {
        return ["Status: INSUFFICIENT_FUNDS"];
    } else {
        return returnArr;
    }
};

purchaseButton.addEventListener("click", changeDue);