function showform() {
    const form = document.getElementById("floating-form");
    if (form.style.display == "flex")
        form.style.display = "none";
    else {
    form.style.display = "flex";
    }
}
function showslots(id) {
    const slot = document.getElementById(id);
    if (slot.style.display == "flex")
        slot.style.display = "none";
    else {
        slot.style.display = "flex";
        
    };
}