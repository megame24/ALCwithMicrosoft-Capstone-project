angular.module('app').controller('ContactController', [ContactController]);

function ContactController() {
    var contact = this;
    contact.contact = function() {
        var value = contact.details
        var message = `${value.name} your feedback on ${value.select} with details: ${value.message}, have been recieved. Please check your email: ${value.email} with in 2 days for a reply from us. Thank you for shopping with Grocery Cloud.`
        alert(message);
    }
}