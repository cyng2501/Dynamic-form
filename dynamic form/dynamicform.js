var fields = Array();
var fields2 = Array();
var x = 0;

function createfield1() {
    var field = document.getElementById('addingfields').value;
    if (field == null || field == " " || field == "") {
        document.getElementById('addingfields').style.border = "1px solid red";
    } else {

        fields[x] = document.getElementById('addingfields').value;
        x++;
        document.getElementById('addingfields').value = '';
        document.getElementById('addingfields').style.border = "";
    }
}

function createform() {
    var formerr = document.createTextNode("No Fields");
    var forms = document.getElementById('forms');
    if (fields.length == 0) {
        forms.innerHTML = "";
        forms.appendChild(formerr);
        forms.style.display = "block";
    } else {
        var datatable = document.getElementById('datatable');
        datatable.innerHTML = "";
        forms.style.display = "block";
        forms.innerHTML = "";
        var heading = document.createElement("tr");
        heading.id = "datahead";
        datatable.appendChild(heading);
        var datahead = document.getElementById('datahead');
        while (forms.hasChildNodes()) {
            forms.removeChild(forms.lastChild);
        }
        var idhead = document.createElement("th");
        idhead.appendChild(document.createTextNode("Id"));
        datahead.appendChild(idhead);
        for (i = 0; i < fields.length; i++) {
            var formdiv = document.createElement("Div");
            formdiv.className = "form-group";
            var inputname = document.createElement("Label");
            inputname.appendChild(document.createTextNode(fields[i]));
            var input = document.createElement("Input");
            input.type = "text";
            input.name = fields[i];
            input.id = fields[i] + i;
            input.className = "forminput form-control";
            formdiv.appendChild(inputname);
            formdiv.appendChild(input);
            forms.appendChild(formdiv);

            var dataheading = document.createElement("th");
            dataheading.appendChild(document.createTextNode(fields[i]));
            datahead.appendChild(dataheading);
        }
        var submitbutton = document.createElement("Button");
        submitbutton.type = "button";
        submitbutton.className = "formsubmit btn btn-primary btn-block";
        submitbutton.appendChild(document.createTextNode("Submit"));
        forms.appendChild(submitbutton);
        submitbutton.onclick = function() {
            updatedata();
        }

        var edithead = document.createElement("th");
        var deletehead = document.createElement("th");
        edithead.appendChild(document.createTextNode("Edit"));
        deletehead.appendChild(document.createTextNode("Delete"));
        datahead.appendChild(edithead);
        datahead.appendChild(deletehead);

        fields2 = [...fields];
        fields = [];
        x = 0;
    }
}

function checkempty() {
    var check = true;
    for (i = 0; i < fields2.length; i++) {
        if (document.getElementById(fields2[i] + i).value == "" || document.getElementById(fields2[i] + i).value == " " || document.getElementById(fields2[i] + i).value == null) {
            check = false;
        }
    }
    return check;
}

function updatedata() {
    if (checkempty()) {
        var datatable = document.getElementById("datatable");
        var newRow = datatable.insertRow(datatable.rows.length);
        var cell = newRow.insertCell(0);
        var a = datatable.rows.length - 1;
        cell.outerHTML = "<td class='idvalue'>" + a + "</td>";
        for (i = 0; i < fields2.length; i++) {
            var cell1 = newRow.insertCell(i + 1);
            var celldata = document.getElementById(fields2[i] + i).value;
            // cell1.id = fields2[i] + a;
            cell1.innerHTML = celldata;
            document.getElementById(fields2[i] + i).value = "";
            document.getElementById(fields2[i] + i).style.border = "";
        }
        var z = fields2.length + 1;
        var cell2 = newRow.insertCell(z);
        var editbtn = document.createElement("button");
        editbtn.type = "button";
        editbtn.id = "edit" + a;
        editbtn.className = "tablebtn btn btn-default btn-block";
        editbtn.appendChild(document.createTextNode("Edit"));
        editbtn.onclick = function() {
            editdata();
        }
        cell2.appendChild(editbtn);
        var y = fields2.length + 2;
        var cell3 = newRow.insertCell(y);
        var deletebtn = document.createElement("button");
        deletebtn.type = "button";
        deletebtn.id = "delete" + a;
        deletebtn.className = "tablebtn btn btn-default btn-block";
        deletebtn.appendChild(document.createTextNode("Delete"));
        deletebtn.onclick = function() {
            deletedata();
        }
        cell3.appendChild(deletebtn);
    } else {
        for (i = 0; i < fields2.length; i++) {
            if (document.getElementById(fields2[i] + i).value == "" || document.getElementById(fields2[i] + i).value == " " || document.getElementById(fields2[i] + i).value == null) {
                document.getElementById(fields2[i] + i).style.border = "1px solid red";
            }
            document.getElementById(fields2[i] + i).value = "";
        }
    }
}

function editdata() {
    var editcell = event.target.parentNode;
    var editrow = editcell.parentNode;
    var editext = event.target.textContent;
    if (editext == "Edit") {
        for (i = 0; i <= fields2.length; i++) {
            var cell = editrow.cells[i];
            var content = cell.innerHTML;
            cell.innerHTML = "<input type='text' class='editinput' value='" + content + "'>";
        }
        event.target.textContent = "Save";
    } else {
        for (i = 0; i <= fields2.length; i++) {
            var cell = editrow.cells[i];
            var content = cell.querySelector(".editinput").value;
            cell.innerHTML = content;
        }
        event.target.textContent = "Edit";
    }
}

function deletedata() {
    var deleteconfirm = confirm("Are you sure?\nYou want to delete this row")
    if (deleteconfirm == true) {
        var deletecell = event.target.parentNode;
        var deleterow = deletecell.parentNode;
        deleterow.parentNode.removeChild(deleterow);
    }
}