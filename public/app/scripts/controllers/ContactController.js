angular.module('app').controller('ContactController', [ContactController]);

function ContactController() {
    var contact = this;
    contact.welcome = 'Welcome to the contact page!!';
}