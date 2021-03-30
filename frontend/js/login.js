function changeicon(){
   var x = document.getElementById("password");
   var y= document.getElementById("toggle")
   
 if (x.type === "password") {
   x.type = "text";
   y.className='fa fa-eye';
 } else {
   x.type = "password";
   y.className='fa fa-eye-slash';
 }
}


var el = document.getElementById("date");
el.onchange = function () {
if (el.value === "") {
  el.classList.add("date");
} else {
  el.classList.remove("date");
}
};
  