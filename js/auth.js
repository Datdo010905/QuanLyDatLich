window.onload = function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const quyen = localStorage.getItem("phanQuyen");

    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    }
}

