// CREATING OBJECTS
/* let cellphone = {
    color: "whtie",
    weight: "155 grams",
    alarm: function(){
        console.log('Alarm is Buzzing');
    },
    ring: function(){
        console.log('Phone is ringing');
    }
} */

let cellphone = Object();
console.log(typeof cellphone);
cellphone.weight = '115 grams';
cellphone.color = 'black';
cellphone.ring = function() {
    console.log('Cellphone is ringing');
};
console.log(cellphone)

function Laptop() {
    this.weight = '500 grams';
}