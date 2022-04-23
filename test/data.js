var rnd = require('generate-random-data');


// ------------------------------- site data --------------------------------------
const hr = '\n--------------~*~------------';
const baseUrl = 'http://52.39.5.126/';
const app = "Moodle LMS";
const homePageTitle = "Software Quality Assurance Testing";
const usersPageTitle = "SQA: Administration: Users: Accounts: Browse list of users";

// -------------------------------- admin data ----------------------------------
const admin_username = 'tkuser'
const admin_password = 'Moodle!123';
const admin_fullname = 'Test User';

// --------------------------------- new user data ---------------------------------------
var new_firstName = [rnd.femaleFirstName(), rnd.maleFirstName()][Math.floor(Math.random() * 2)];
var new_lastName = rnd.lastName();
var new_userName = (new_firstName.concat("", new_lastName)).toLowerCase().substring(0, 10) + rnd.int(11,99);
var new_password = 'Moodle!123';
var new_fullName = new_firstName.concat(" ", new_lastName);
var tld = rnd.tld();
var random_domain = rnd.domain(tld);
var new_email = new_userName + "@" + random_domain;
var description_text = rnd.sentence(10, 50)
// -------------------------------------------------------------------------------------------



module.exports = {
    hr, baseUrl, app, homePageTitle, usersPageTitle, admin_username, admin_password, admin_fullname,
    new_firstName, new_lastName, new_userName, new_password, new_fullName, tld, random_domain, new_email, description_text,
}
