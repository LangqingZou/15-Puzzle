var type = 2;
var numbers = [];

function createTable() {
    random();
    const myTable = document.createElement("table");
    myTable.id = "myTable";
    myTable.className = "puzzle";
    document.body.appendChild(myTable);

    var counter = 0;
    for (let i = 0; i < type; i++) {
        const row = document.createElement("tr");
        for (j = 0; j < type; j++) {
            const cell = document.createElement("td");
            cell.id = counter;
            cell.addEventListener("click", clickHandler);
            row.appendChild(cell);
            counter++;
        }
        myTable.appendChild(row);
    }

    for (let i = 0; i < type * type; i++) {
        var cell = document.getElementById(i);
        if (numbers[i] == type * type) {
            cell.innerHTML = "";
            cell.className = "emptyCell";
        } else {
            cell.innerHTML = numbers[i];
            cell.className = "cell";
        }
    }
}

function random() {
    //numbers = [1,2,3,4]
    for (let i = 0; i < type ** 2; i++) {
        numbers[i] = i + 1;
    }
    var ctr = numbers.length,
        temp,
        index;
    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = numbers[ctr];
        numbers[ctr] = numbers[index];
        numbers[index] = temp;
    }
}

function clickHandler() {
    //console.log("id" + this.id);
    var emptyID = checkAdjacentCell(this.id);
    var target = document.getElementById(this.id);
    //console.log(emptyID);
    if (emptyID >= 0) {
        target.animate({ backgroundColor: "lightblue" }, 200);
        var text = target.textContent;
        var empty = document.getElementById(emptyID);
        target.className = "emptyCell";
        target.innerHTML = "";
        empty.className = "cell";
        empty.innerHTML = text;
    } else {
        target.animate({ backgroundColor: "red" }, 400);
    }
    checkWin();
}

function checkAdjacentCell(id) {
    var flag = -1;
    const topCellId = parseInt(id) - type,
        bottomCellId = parseInt(id) + type,
        rightCellId = parseInt(id) + 1,
        leftCellId = parseInt(id) - 1;
    adjacentId = [topCellId, bottomCellId, rightCellId, leftCellId];

    if (adjacentId[2] % type == 0) {
        adjacentId[2] = -1;
    } else if (adjacentId[3] % type == type - 1) {
        adjacentId[3] = -1;
    }

    for (let i = 0; i < adjacentId.length; i++) {
        if (adjacentId[i] <= type ** 2 - 1 && adjacentId[i] >= 0) {
            var cell = document.getElementById(adjacentId[i]);
            if (cell.className == "emptyCell") {
                flag = adjacentId[i];
            }
        }
    }
    return flag;
}

function checkWin(){
    flag=true;
    for(let i=0; i<(type*type)-1; i++){
        var cell = document.getElementById(i);
        if(cell.textContent==i+1){
            continue;
        }else{
            flag=false;
        }
    }
    if(flag){
        var mesg = confirm("Congratulations！You win!! Do you want to play again?");
        if(mesg){
            location.reload()
        }
    }
}
