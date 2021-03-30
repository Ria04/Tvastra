var loadFile = function(event) {
    var imagesarr = document.getElementById('uploadPicInput').files;
    var div=document.getElementById('pic');
    var str="";
    for(var i=0;i<imagesarr.length;i++){
        str+='<img src="'+URL.createObjectURL(event.target.files[i])+'">';
    }
   
   div.innerHTML=str;

};

function showform() {
    const form = document.getElementById("floating-form");
    if (form.style.display == "flex")
        form.style.display = "none";
    else {
    form.style.display = "flex";
    }
}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;

    document.getElementById("date").setAttribute("max",today);