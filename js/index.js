var n=8;
var i=1;


function next(){
	if(i==n)
		i=1;
	else
		i++;
        var img = document.getElementById("slideshow_img");
            img.setAttribute("src", "img/SLIDE/slideshow_" + i + ".jpg");
}

function autoplay(){
	setInterval(next, 3000)
}


window.onload = function() {
// Lấy tên file hiện tại (ví dụ: "about.html")
  const currentPage = window.location.pathname.split("/").pop();

  // Lấy tất cả link trong menu
  const menuLinks = document.querySelectorAll("#menu-item .me_item");

  menuLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    // Nếu href trùng với trang hiện tại → tô màu
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.parentElement.classList.add("active"); // tô luôn <li>
    }
  });}


