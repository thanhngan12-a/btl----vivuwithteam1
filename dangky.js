function m1() {
        // Validate username
        if (document.getElementById("ten_dang_nhap").value === "") {
            document.getElementById("usertb").innerText = "Vui lòng không để trống tài khoản";
        } else if (document.getElementById("ten_dang_nhap").value.length < 3) {
            document.getElementById("usertb").innerText = "Tên đăng nhập phải có ít nhất 3 ký tự";
        } else {
            document.getElementById("usertb").innerText = "";
        }

        // Validate email
        if (document.getElementById("email").value === "") {
            document.getElementById("emailtb").innerText = "Vui lòng không để trống email";
        } else if (!document.getElementById("email").value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            document.getElementById("emailtb").innerText = "Email không hợp lệ";
        } else {
            document.getElementById("emailtb").innerText = "";
        }

        // Validate password
        if (document.getElementById("mat_khau").value === "") {
            document.getElementById("passtb").innerText = "Vui lòng không để trống mật khẩu";
        } else if (!document.getElementById("mat_khau").value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
            document.getElementById("passtb").innerText = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số";
        } else {
            document.getElementById("passtb").innerText = "";
        }

        // Check if all validations pass
        if (
            document.getElementById("ten_dang_nhap").value !== "" &&
            document.getElementById("ten_dang_nhap").value.length >= 3 &&
            document.getElementById("email").value !== "" &&
            document.getElementById("email").value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) &&
            document.getElementById("mat_khau").value !== "" &&
            document.getElementById("mat_khau").value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
        ) {
            alert("Đăng ký thành công!");
            sessionStorage.setItem("tk", document.getElementById("ten_dang_nhap").value);
            sessionStorage.setItem("mk", document.getElementById("mat_khau").value);
            sessionStorage.setItem("trangthai", "hien"); // Thêm trạng thái đăng nhập
            window.location.href = "dangnhap.html"; // Chuyển thẳng đến index.html
        }
    }