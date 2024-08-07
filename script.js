let price = 1.87;
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

const cashInput = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const changeDueElement = document.getElementById("change-due");

function calculateChangeDue() {
    const cash = parseFloat(cashInput.value);
    let changeDue = cash - price;

    let changeArr = [
        { name: "PENNY", value: 0, amount: 0.01 },
        { name: "NICKEL", value: 0, amount: 0.05 },
        { name: "DIME", value: 0, amount: 0.1 },
        { name: "QUARTER", value: 0, amount: 0.25 },
        { name: "ONE", value: 0, amount: 1 },
        { name: "FIVE", value: 0, amount: 5 },
        { name: "TEN", value: 0, amount: 10 },
        { name: "TWENTY", value: 0, amount: 20 },
        { name: "ONE HUNDRED", value: 0, amount: 100 }
    ];

    changeArr.reverse();

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (changeDue === 0) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
        return;
    } else {

        console.log("else called");

        let count = changeArr.length;

        while (count > 0) {
            for (let i = cid.length - 1; i > 0; i--) {
                const value = cid[i][1];

                console.log("value: " + value);


                if (value <= changeDue) {
                    changeArr.forEach((item) => {
                        console.log("call forEach");

                        console.log("item.name: " + item.name);
                        console.log("cid[i][0]: " + cid[i][0]);


                        if (item.name == cid[i][0] && cid[0][1] > 0) {
                            item.value++;
                            changeDue -= item.amount;
                            cid[i][1] -= item.amount;

                            changeDue = changeDue.toFixed(2);
                            cid[i][1] = cid[i][1].toFixed(2);

                            console.log("changeDue: " + changeDue);
                            console.log("cid[i][1]: " + cid[i][1]);

                        }
                    });
                }
            }
            count--;
        }

        if (changeDue > 0) {

            changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";

        } else {

            changeDueElement.textContent = "Status: OPEN";

            let changeDueString = "";

            changeArr.forEach((item) => {
                if (item.value > 0) {
                    changeDueString += `${item.name}: $${(item.amount * item.value).toFixed(2)}`;
                }
            });

            changeDueElement.textContent = changeDueString;
        }


    }
}

purchaseButton.addEventListener("click", calculateChangeDue);