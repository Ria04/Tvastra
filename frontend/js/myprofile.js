function openotpbox() {
    const form = document.getElementById("floating-form");
    if (form.style.display == "flex")
        form.style.display = "none";
    else {
    form.style.display = "flex";
    }
}
function enterotp() {
    const form = document.getElementById("otp-form");
    if (form.style.display == "flex")
        form.style.display = "none";
    else {
    form.style.display = "flex";
    }
}

