search();
async function search() {
    const hd = await fetch("/getfilter", { method: "GET" });
    const d = await hd.json();
    console.log(d);
    var options = "";
    for (var i = 0; i < d.length; i++) {
        options += '<option value="' + d[i] + '">';
    }
    document.getElementById('demo').innerHTML = options;
}



var header = document.getElementById("myDIV");
var li = header.getElementsByTagName("li");
for (var i = 0; i < li.length; i++) {
    li[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += "active";
    });
}


var header1 = document.getElementById("myDIV2");
var li = header1.getElementsByTagName("li");

for (var i = 0; i < li.length; i++) {
    li[i].addEventListener("click", function () {
        for (var i = 0; i < li.length; i++) {
            li[i].classList.remove("active")
        }
        this.className += "active";
    });
}


function showdiv(id){
    for(var i=1;i<8;i++){
        document.getElementById('div'+i).classList.remove("activediv")
    }
    document.getElementById(id).classList.add("activediv");
}


function showtabdiv(id){
    for(var i=1;i<8;i++){
        document.getElementById('tab-div'+i).classList.remove("activediv")
    }
    document.getElementById(id).classList.add("activediv");
}

                function currentSlide(n) {
                    var head = document.getElementById("doctor-container");
                    var slides = head.getElementsByClassName("figure-wrap");

                    for (var s = 0; s < slides.length; s++) {
                        slides[s].style.display = "none";
                    }
                    slides[n].style.display = "flex";

                }

                currentSlide(0);




                var carouselhead = document.getElementById("carousel");
                var dots = carouselhead.getElementsByClassName("dot");
                for (var j = 0; j < dots.length; j++) {
                    dots[j].addEventListener("click", function () {
                        var currentdot = document.getElementsByClassName("activecarousel");
                        currentdot[0].className = currentdot[0].className.replace("activecarousel", " ");
                        this.className += " activecarousel";
                    });
                }
