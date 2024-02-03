// Mason Buller
// Assignment 5
// 11-27-23

"use strict";

class Customer {
    constructor(name, city, state, email) {
        this.name = name;
        this.city = city;
        this.state = state;
        this.email = email;
    }

    get isNameValid() {
        if (this.name == "") {
            return false;
        } else {
            return true;
        }
    }

    get isCityValid() {
        if (this.city == "") {
            return false;
        } else {
            return true;
        }
    }

    get isStateValid() {
        if (this.state == "") {
            return false;
        } else {
            return true;
        }
    }

    get isEmailValid() {
        const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
        if (this.email == "" || !emailPattern.test(this.email)) {
            return false;
        } else {
            return true;
        }
    }

    get isValid() {
        return this.isNameValid && this.isEmailValid && this.isCityValid && this.isStateValid;
    }

    toString() {
        return `<li>${this.email}</li>
                <ul>
                    <li>${this.name}</li>
                    <li>${this.city}, ${this.state}
                </ul>`
    }

}

const jMDB = {
    customers: [new Customer("Jim James", "Lincoln", "NE", "jimjames@gmail.com"), new Customer("Jane Smith", "Bellevue", "NE", "jsmith@icloud.com")],

    add(cust) {
        if (cust instanceof Customer) {
            this.customers.push(cust);
        } else {
            console.log("That's not a customer!");
        }
    },
    listCustomers() {
        let stringList = "";
        for (let customer of this.customers) {
            stringList += `${customer.toString()}\n`;
        }
        return stringList;
    },
    compareEmail(email) {
        for (let customer of this.customers) {
            if (email == customer.email) {
                return false;
            }
        }
    }
};

const addCustomer = function() {
    $("span").text("");

    let name = $("#name").val();
    let city = $("#city").val();
    let state = $("#state").val();
    let email = $("#email").val();

    const customer = new Customer(name, city, state, email);
    if (!customer.isValid) {
        if (customer.isNameValid === false) {
            $("#name").next().text("Please enter a name.");
        }
        if (customer.isCityValid === false) {
            $("#city").next().text("Please enter a city.");
        }
        if (customer.isStateValid === false) {
            $("#state").next().text("Please select a state.");
        }
        if (customer.isEmailValid === false) {
            $("#email").next().text("Please enter a valid email.");
        }
    } else {
        if (jMDB.compareEmail(customer.email) == false) {
            $("#message").text("ERROR: Email is already registered. Please enter a different email.");
        } else {
            jMDB.add(customer);
            displayToPage();
            clearElements();
        }
    }
};

const displayToPage = function() {
    const customersList = jMDB.listCustomers().toString();
    $("ol").empty();
    $("ol").html(customersList);
}

const clearElements = function() {
    $("#name").val("");
    $("#city").val("");
    $("#state").val("");
    $("#email").val("");
}

$(document).ready( () => {
    displayToPage();
    $("#add").click(addCustomer);
})