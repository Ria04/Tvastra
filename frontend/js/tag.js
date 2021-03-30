var input = document.querySelector('input[name=yourhospital]');
var input2 = document.querySelector('input[name=achievements]');
var input3 = document.querySelector('input[name=qualifications]');
var input4 = document.querySelector('input[name=awards]');
var input5 = document.querySelector('input[name=specialization]');
var input6 = document.querySelector('input[name=treatments]');


var tagify = new Tagify(input, {
originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
});
var tagify2= new Tagify(input2, {
originalInputValueFormat: valuesArr2 => valuesArr2.map(item => item.value).join(',')
});
var tagify3= new Tagify(input3, {
originalInputValueFormat: valuesArr3 => valuesArr3.map(item => item.value).join(',')
});
var tagify4= new Tagify(input4, {
originalInputValueFormat: valuesArr4 => valuesArr4.map(item => item.value).join(',')
});
var tagify5= new Tagify(input5, {
originalInputValueFormat: valuesArr5 => valuesArr5.map(item => item.value).join(',')
});
var tagify6= new Tagify(input6, {
originalInputValueFormat: valuesArr6 => valuesArr6.map(item => item.value).join(',')
});

var loadFile = function(event) {
    var image = document.getElementById('pic');
    var image2 = document.getElementById('headerpic');

    image.src = URL.createObjectURL(event.target.files[0]);
    image2.src = URL.createObjectURL(event.target.files[0]);

};