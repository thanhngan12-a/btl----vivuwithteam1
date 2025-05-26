function m1() {
    const username = document.getElementById("ten_dang_nhap").value;
    const password = document.getElementById("mat_khau").value;
    const usertb = document.getElementById("usertb");
    const passtb = document.getElementById("passtb");

    // Reset error messages
    usertb.innerText = "";
    passtb.innerText = "";

    // Validate username
    if (username === "") {
        usertb.innerText = "Vui lòng không để trống tài khoản";
        return;
    }
    if (username.length < 3) {
        usertb.innerText = "Tên đăng nhập phải có ít nhất 3 ký tự";
        return;
    }

    // Validate password
    if (password === "") {
        passtb.innerText = "Vui lòng không để trống mật khẩu";
        return;
    }
    if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
        passtb.innerText = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số";
        return;
    }

    // Check credentials against sessionStorage
    const storedUsername = sessionStorage.getItem("tk") || "";
    const storedPassword = sessionStorage.getItem("mk") || "";
    
    if (username !== storedUsername || password !== storedPassword) {
        passtb.innerText = "Tài khoản hoặc mật khẩu không đúng";
        return;
    }

    // Successful login
    sessionStorage.setItem("trangthai", "hien");
    alert("Đăng nhập thành công!");
    window.location.href = "index.html";
}