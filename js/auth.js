window.onload = function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const quyen = localStorage.getItem("phanQuyen");

    if (isLoggedIn !== "true" || quyen == 0) {
        window.location.href = "login.html";
    }
}

