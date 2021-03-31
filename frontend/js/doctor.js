function remove(id, filterelement) {
  var x = document.getElementById(id);
  var ele = document.getElementById(filterelement);
  ele.checked = false;
  x.style.display = "none";
  ele.form.submit();
}

async function expand(id) {
  var d = document.getElementById("showmore" + id);
  var b = document.getElementById(id);

  var x = window.matchMedia("(min-width: 1024px)");

  if (x.matches) {
    if (d.style.maxHeight !== "unset") {
      {
        d.style.maxHeight = "unset";
        b.innerHTML = "- Show Less";
        b.style.color = "gray";
      }
    } else {
      d.style.maxHeight = "9rem";
      b.innerHTML = "+Show More";
      b.style.color = "#167ddd";
    }
  }
  else{
    if (d.style.maxHeight !== "unset") {
      {
        d.style.maxHeight = "unset";
        b.innerHTML = "- Show Less";
        b.style.color = "gray";
      }
    } else {
      d.style.maxHeight = "7rem";
      b.innerHTML = "+Show More";
      b.style.color = "#167ddd";
    }
  }


}


async function showschedule(scheduleid, docid) {
  var schedule = document.getElementById(scheduleid);

  var main=document.getElementById("bookdiv");
  var main1=document.getElementsByClassName("bookAppointmentContainer");



  if(main.classList[1]){
  main.classList.remove("hidebookdiv");
  var x = window.matchMedia("(min-width: 768px)");
  if (x.matches) {
    main.style.display="grid";
    main.style.gridColumn="1/3";
    main.style.gridRow="2/3";

    for(var i=0;i<main1.length;i++){
      main1[i].style.display="grid";
      main1[i].style.gridColumn="1/3";
      main1[i].style.gridRow="2/3";
    }
  }

}
else{
  main.classList.add("hidebookdiv");
}
  
 

  if (schedule.style.display == "none") {
   
    schedule.style.display = "grid";
    
    const data = await fetch("/getschedule/" + docid, { method: "get" });
    const c = await data.json();

    var nowDate = new Date();

    for (var l = 0; l < 7; l++) {
      var count = 0;
      for (sl = 0; sl < c[l].schedule.length; sl++) {
        if (c[l].schedule[sl].isbooked == false) {
          count += 1;
        }
      }
      var no = l + 1;
      if (l == 0) {
       
        document.getElementById("item" + no + docid).innerHTML =
          "<h5>Today</h5><h6><span>" + count + " Slots Available</span></h6>";
        
      } else if (l == 1) {
        document.getElementById("item" + no + docid).innerHTML =
          "<h5>Tomorrow</h5><h6><span>" +
          count +
          " Slots Available</span></h6>";
      } else {
        document.getElementById("item" + no + docid).innerHTML =
          "<h5>" +
          " " +
          new Date(Date.now() + l * 24 * 60 * 60 * 1000)
            .toString()
            .slice(0, 15) +
          "</h5><h6><span>" +
          count +
          " Slots Available</span></h6>";
      }
    }
  } else {
    schedule.style.display = "none";
    main.style.display="none";
  }
}

async function showsubschedule(id, did, index) {
  if(document.getElementById(id).style.display=="none"){
  document.getElementById(id).style.display = "flex";
  var ff = index + 1;
  const slotdata = await fetch("/getslots/" + did + "/" + index, {
    method: "get",
  });


  const demo = await slotdata.json();


  const morning = demo[0];
  const afternoon = demo[1];
  const evening = demo[2];


  var morningslot = "";
  var eveningslot = "";
  var afternoonslot = "";

  for (var m = 0; m < morning.length; m++) {
    morningslot +=
      ' <form method="post" onclick="this.submit()" action="/bookslot/' +
      did +
      "/" +
      morning[m].time +
      "/" +
      morning[m].day +
      "/" +
      morning[m]._id +
      '"> <h4><span>' +
      morning[m].time +
      " AM" +
      "</span></h4></form>";
  }
  if(morningslot.length>0){
  document.getElementById("mor" + did).innerHTML = morningslot;
  }
  else{
    document.getElementById("mor" + did).innerHTML = "<h6>No Slots available in morning</h6>";
  }
  for (var e = 0; e < evening.length; e++) {
    eveningslot +=
      ' <form method="post" onclick="this.submit()" action="/bookslot/' +
      did +
      "/" +
      evening[e].time +
      "/" +
      evening[e].day +
      "/" +
      evening[e]._id +
      '"> <h4><span>' +
      evening[e].time +
      " PM" +
      "</span></h4></form>";
  }
  if(eveningslot.length>0){
  document.getElementById("eve" + did).innerHTML = eveningslot;
}
else{
  document.getElementById("eve" + did).innerHTML = "<h6>No Slots available in morning</h6>";
}
  for (var a = 0; a < afternoon.length; a++) {
    afternoonslot +=
      ' <form method="post" onclick="this.submit()" action="/bookslot/' +
      did +
      "/" +
      afternoon[a].time +
      "/" +
      afternoon[a].day +
      "/" +
      afternoon[a]._id +
      '"> <h4><span>' +
      afternoon[a].time +
      " PM" +
      "</span></h4></form>";
  }
  if(afternoonslot.length>0){
  document.getElementById("after" + did).innerHTML = afternoonslot;
}
else{
  document.getElementById("after" + did).innerHTML = "<h6>No Slots available in morning</h6>";
}
}
else{
  document.getElementById(id).style.display="none";
}
}


function moveCarousel(dirc, carouselId) {
    var carouselItems = document.getElementById(carouselId).children;
    if (dirc === "left") {
        for (var i = 0; i < carouselItems.length; i++) {
            if (carouselItems[i].style.display !== "none")
                break;
        }
        if (i + 3 < carouselItems.length) {
            for (var j = 0; j < carouselItems.length; j++) {
                if (j === i + 1 || j === i + 2 || j === i + 3) {
                    carouselItems[j].style.display = "flex";
                }
                else
                    carouselItems[j].style.display = "none";
            }
        }
    }
    else if (dirc === "right") {
        for (var i = 0; i < carouselItems.length; i++) {
            if (carouselItems[i].style.display !== "none")
                break;
        }
        if (i !== 0) {
            for (var j = 0; j < carouselItems.length; j++) {
                if (j === i - 1 || j === i || j === i + 1) {
                    carouselItems[j].style.display = "flex";
                }
                else
                    carouselItems[j].style.display = "none";
            }
        }
    }
}



