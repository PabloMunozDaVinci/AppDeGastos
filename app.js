const form = document.getElementById("transactionForm");

document.addEventListener("DOMContentLoaded", loadPage());
function loadPage() {
  let transactionObjArr =
    JSON.parse(localStorage.getItem("transactionData")) || [];
  transactionObjArr.forEach((transactionElement) =>
    insertRowInTransactionTable(transactionElement)
  );
}

form.addEventListener("submit", function (e) {
  event.preventDefault();

  let transactionFormData = new FormData(form);
  let transactionObj = convertFormDataToTransactionObj(transactionFormData);

  saveTransactionObj(transactionObj);
  insertRowInTransactionTable(transactionObj);
  form.reset();
});

function convertFormDataToTransactionObj(transactionFormData) {
  let transactionType = transactionFormData.get("transactionType");
  let transactionDescription = transactionFormData.get(
    "transactionDescription"
  );
  let transactionAmount = transactionFormData.get("transactionAmount");
  let transactionCategory = transactionFormData.get("transactionCategory");
  let transactionId = getNewTransactionId();
  return {
    transactionType: transactionType,
    transactionDescription: transactionDescription,
    transactionAmount: transactionAmount,
    transactionCategory: transactionCategory,
    transactionId: transactionId,
  };
}

//paso el objeto de la transaccion , lo parseo a string y lo guardo al local storage
function saveTransactionObj(transactionObj) {
  //primero obtengo lo que ya este en el storage, IMPORTANTE ,si no hay datos en el storage debo indicar que tome un array vacio con el operador OR

  myTransactionArray =
    JSON.parse(localStorage.getItem("transactionData")) || [];

  myTransactionArray.push(transactionObj);
  //convierto mi array de transaccion a json
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //guardo mi array de transaccion en formato JSON en el local storage
  localStorage.setItem("transactionData", transactionArrayJSON);
}

function insertRowInTransactionTable(transactionObj) {
  //agarro la tabla
  let transactionTableRef = document.getElementById("transactionTable");
  //en una nueva varialbe guardo los datos de la tabla , insertandole previamente un row en el ultimo lugar
  let newTransactionRowRef = transactionTableRef.insertRow(-1);

  // a mi row le agrego un atributo personalizado de transacion y se lo asigno con el objeto transactionObj
  newTransactionRowRef.setAttribute(
    "data-transaction-id",
    transactionObj["transactionId"]
  );
  //en una nueva varialbe guardo los datos de la tabla , insertandole previamente una celda en el ultimo lugar
  let newTyperCellRef = newTransactionRowRef.insertCell(0);

  //consigo los valores de las celdas que quiero llenar y los completo con lo que el usuario ingresa a travez del objeto

  newTyperCellRef.textContent = transactionObj["transactionType"];

  newTyperCellRef = newTransactionRowRef.insertCell(1);

  newTyperCellRef.textContent = transactionObj["transactionDescription"];

  newTyperCellRef = newTransactionRowRef.insertCell(2);

  newTyperCellRef.textContent = transactionObj["transactionAmount"];

  newTyperCellRef = newTransactionRowRef.insertCell(3);

  newTyperCellRef.textContent = transactionObj["transactionCategory"];

  let newDeleteCell = newTransactionRowRef.insertCell(4);
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  newDeleteCell.appendChild(deleteButton);

  //agarra la fila a eliminar, luego agarra el atributo data-transaction-id , leugo eliminar la fila de html y luego del local storage
  deleteButton.addEventListener("click", () => {
    let transactionRow = event.target.parentNode.parentNode;
    let transactionId = transactionRow.getAttribute("data-transaction-id");
    transactionRow.remove();
  });
}

function getNewTransactionId() {
  let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
  let newTransactionId = JSON.parse(lastTransactionId) + 1;
  localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
  return newTransactionId;
}

//le paso como parametro el transactionId de la  transaccion que quiero eliminar
function deleteTransactionObj(transactionId) {
  //busco en el localStorage la info de la transaccion
  let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
  //busco el elemento que cumpla con el ID creado
  let transactionIndexInArray = transactionObjArr.findIndex(
    (element) => element.transactionId === transactionId
  );
  //borro del array el indice que cumple la condicion , solo 1 vez
  transactionObjArr.splice(transactionIndexInArray, 1);
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //guardo mi array de transaccion en formato JSON en el local storage
  localStorage.setItem("transactionData", transactionArrayJSON);
}
