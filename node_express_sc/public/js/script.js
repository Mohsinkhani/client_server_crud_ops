
var _customerData = [{
  Code: 1,
  Name: "John Doe",
  Email: "jd@c.com",
  Gender: "Male",
  city: "Riyadh",
}];

var bindData = function () {
  resetForm();
  _customerData.forEach(element => {
    insertNewRecord(element);
  });
};

//!initial values
var selectedRow = null;
//!form submit logic
function onFormSubmit(e) {
  event.preventDefault();
  var customer = readFormData();
  //
  var selectedCustomer = _customerData.find(item => {
    return item.Code == customer.Code
  });

  // Check if all fields in formData are filled
  if (customer.Code && customer.Name && customer.Email && customer.Gender && customer.city) {
    if (selectedCustomer == undefined) {
      _customerData.push(customer);
    } else {
      selectedCustomer.Name = customer.Name;
      selectedCustomer.Email = customer.Email;
      selectedCustomer.Gender = customer.Gender;
      selectedCustomer.city = customer.city;
    }

    bindData();
    
  } else {
    alert("Please fill out all fields before submitting.");
  }
}

//!get method(Retriving the data)
function readFormData() {
  var customer = {};
  customer.Code = document.getElementById("Code").value;
  customer.Name = document.getElementById("Name").value;
  customer.Email = document.getElementById("Email").value;
  customer.Gender = document.getElementById("Gender").value;
  customer.city = document.getElementById("city").value;

  return customer;
}
//!insert the data (Post method)
function insertNewRecord(data) {
  var table = document
    .getElementById("storeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.Code;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.Name;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.Email;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.Gender;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = data.city;
  cell4 = newRow.insertCell(5);
  cell4.innerHTML = `<button onClick="onEdit(` + data.Code + `)">Edit</button> <button onClick = "onDelete(` + data.Code + `)">Delete</button>`;
}
//!edit and update the data (Update method)
//editing the data(get)
function onEdit(Code) {
  // document.getElementById("storeList").deleteRow(row.rowIndex);
  var oldCustomer = _customerData.find(item => {
    return item.Code == Code
  });

  document.getElementById("Code").value = oldCustomer.Code;
  document.getElementById("Name").value = oldCustomer.Name;
  document.getElementById("Email").value = oldCustomer.Email;
  document.getElementById("Gender").value = oldCustomer.Gender;
  document.getElementById("city").value = oldCustomer.city;
  document.getElementById("submitButton").value = "Update"; // Change button text to "Update"
}

//updating the data
function updateRecord(formData) {
  //
}

//!deleting the data (delete method)
//delete the data
function onDelete(Code) {
  if (confirm("Are you sure about deleting😒 the data ?")) {
    // document.getElementById("storeList").deleteRow(row.rowIndex);
    var oldCustomer = _customerData.find(item => {
      return item.Code == Code
    });
    _customerData.splice(oldCustomer, 1);
    bindData();
  }
}
//!reseting the values in form
function resetForm() {
  document.getElementById("Code").value = "";
  document.getElementById("Name").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("Gender").value = "";
  document.getElementById("city").value = "";
  document.getElementById("submitButton").value = "submit"; // Reset button text to "Submit"

  selectedRow = null;

  document.getElementById("customersList").innerHTML = "";
}
// function searchTable() {
//   var input, filter, table, tr, td, i, j, txtValue;
//   input = document.getElementById("searchBox");
//   filter = input.value.toLowerCase();
//   table = document.getElementById("storeList");
//   tr = table.getElementsByTagName("tr");

//   for (i = 1; i < tr.length; i++) {
//     tr[i].style.display = "none";
//     td = tr[i].getElementsByTagName("td");
//     for (j = 0; j < td.length; j++) {
//       if (td[j]) {
//         txtValue = td[j].textContent || td[j].innerText;
//         if (txtValue.toLowerCase().indexOf(filter) > -1) {
//           tr[i].style.display = "";
//           break;
//         }
//       }
//     }
//   }
// }

bindData();