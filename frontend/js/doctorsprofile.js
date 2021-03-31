function showpara(id,iconid) {
    var x = document.getElementById(id);
    y= document.getElementById(iconid);
    if (x.style.display === "none") {
      x.style.display = "block";
      y.className="fas fa-angle-up";
    } else {
      x.style.display = "none";
      y.className="fas fa-angle-down";

    }
  }