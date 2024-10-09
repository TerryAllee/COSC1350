function calculateTip(){
    const billAmount = parseFloat(document.getElementById("billAmount").value);
    const tipPercentage = parseFloat(document.getElementById("serviceQuality").value);

    if(isNaN(billAmount) || billAmount <= 0){
        alert("Enter a correct bill amount.");
        return;
    }
    const tipAmount = billAmount * tipPercentage;

    //Show the tip amount
    document.getElementById("tipAmount").innerHTML = `Tip: $${tipAmount.toFixed(2)}`;

    //Add and display the total bill 
    const totalBill = billAmount + tipAmount;
    document.getElementById("totalAmount").innerHTML = `Total Bill: $${totalBill.toFixed(2)}`;
}