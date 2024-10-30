function validateForm() {
    var date = document.getElementById("date").value;
    var number = document.getElementById("number").value;
    var customer = document.getElementById("customer").value;
    var dateCustomer = document.getElementById("date-customer").value;

    if (date == "") {
        alert("Cần nhập ngày");
        return false;
    }
    if (number == "") {
        alert("Cần nhập số lượng");
        return false;
    } else if (number < 0) {
        alert("Không thể là 0. Cần nhập lại!!");
        return false;
    }
    return true;
}

function showDate() {
    var voucherList;
    if (localStorage.getItem("voucherList") == null) {
        voucherList = [];
    } else {
        voucherList = JSON.parse(localStorage.getItem("voucherList"));
    }

    var html = "";
    voucherList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.date + "</td>";
        html += "<td>" + element.number + "</td>";
        html += "<td>" + element.customer + "</td>";
        html += "<td>" + element.dateCustomer + "</td>";
        html += `<td>
                    <button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
                    <button onclick="updateData(${index})" class="btn btn-warning m-2">Edit</button>
                 </td>`;
        html += "</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML = html;
}

window.onload = showDate;

function AddData() {
    if (validateForm() == true) {
        var date = document.getElementById("date").value;
        var number = document.getElementById("number").value;
        var customer = document.getElementById("customer").value;
        var dateCustomer = document.getElementById("date-customer").value;

        var voucherList;
        if (localStorage.getItem("voucherList") == null) {
            voucherList = [];
        } else {
            voucherList = JSON.parse(localStorage.getItem("voucherList"));
        }

        voucherList.push({
            date: date,
            number: number,
            customer: customer,
            dateCustomer: dateCustomer,
        });
        localStorage.setItem("voucherList", JSON.stringify(voucherList));
        showDate();

        // Reset form fields
        document.getElementById("date").value = "";
        document.getElementById("number").value = "";
        document.getElementById("customer").value = "";
        document.getElementById("date-customer").value = "";
    }
}
function deleteData(index) {
    let voucherList = JSON.parse(localStorage.getItem("voucherList"));
    voucherList.splice(index, 1); // Xóa phần tử tại vị trí index
    localStorage.setItem("voucherList", JSON.stringify(voucherList));
    showData(); // Cập nhật bảng
}

function updateData(index) {
    let voucherList = JSON.parse(localStorage.getItem("voucherList"));
    let voucher = voucherList[index];

    // Hiển thị dữ liệu lên form
    document.getElementById("date").value = voucher.date;
    document.getElementById("number").value = voucher.number;
    document.getElementById("customer").value = voucher.customer;
    document.getElementById("date-customer").value = voucher.dateCustomer;

    // Xóa dữ liệu hiện tại, cho phép người dùng cập nhật
    deleteData(index);
}

