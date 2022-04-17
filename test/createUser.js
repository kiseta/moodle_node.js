const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");
const assert = require("assert");
var should = require("chai").should();
var random = require('generate-random-data');

// ------------------------------- data --------------------------------------
var hr = '\n--------------~*~------------';
var baseUrl = 'http://52.39.5.126/';
var app = "Moodle LMS";
var homePageTitle = "Software Quality Assurance Testing";
var usersPageTitle = "SQA: Administration: Users: Accounts: Browse list of users";
var admin_username = 'tkuser'
var admin_password = 'Moodle!123';
var admin_fullname = 'Test User';


//new_firstName = random.femaleFirstName()
new_firstName = [random.femaleFirstName(), random.maleFirstName()][Math.floor(Math.random() * 2)];
new_lastName = random.lastName();
new_username = (new_firstName.concat("", new_lastName)).toLowerCase().substring(0, 10) + random.int(11,99);
new_password = 'Moodle!123';
new_fullName = new_firstName.concat(" ", new_lastName);
tld = random.tld();
random_domain = random.domain(tld);
new_email = new_username + "@" + random_domain;
console.log(new_firstName, new_lastName, new_username, new_fullName, new_email,tld, random_domain);

// ----------------------------------------------------------------------------


// use Mocha testing framework
// describe block
describe("Moodle Test: Add New User", function(){

    // it block (it = individual test)
    it("Launch Moodle app, login, register new user", async function(){

        let driver = await new Builder().forBrowser("chrome").build();

        await driver.get(baseUrl);
        actualHomePageTitle = await driver.getTitle();
        actualHomePageTitle.should.equal(homePageTitle);

        console.log('Launch', app, 'Website\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), hr);

        await driver.findElement(By.linkText("Log in")).click();

        console.log('Login\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), hr);

        await driver.findElement(By.id("username")).sendKeys(admin_username);
        await driver.findElement(By.id("password")).sendKeys(admin_password);
        await driver.findElement(By.id("loginbtn")).click();


        let fullNameText = await driver.findElement(By.className("usertext mr-1")).getText().then(function(value){
            return value
        })

        // assert using chai should
        fullNameText.should.equal(admin_fullname);

        console.log('Login Successful! User Name is confirmed:', fullNameText, hr);

        console.log('Confirm Dashboard\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), hr);


        await driver.findElement(By.linkText("Site administration")).click();
        await driver.findElement(By.linkText("Users")).click();
        await driver.findElement(By.linkText("Add a new user")).click();

        console.log('Navigate to Add New User\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), hr);

        // required filds only
        await driver.findElement(By.id("id_username")).sendKeys(new_username);
        await driver.findElement(By.linkText("Click to enter text")).click();
        await driver.findElement(By.id("id_newpassword")).sendKeys(new_password);
        await driver.findElement(By.id("id_firstname")).sendKeys(new_firstName);
        await driver.findElement(By.id("id_lastname")).sendKeys(new_lastName);
        await driver.findElement(By.id("id_email")).sendKeys(new_email);
        await driver.findElement(By.id("id_submitbutton")).click();

        currentPageTitle = await driver.getTitle()

        assert.strictEqual(currentPageTitle, usersPageTitle);

        currentPageTitle.should.equal(usersPageTitle);

        console.log('New User Added: ', new_username,'\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), hr);
      
        // search new user
        await driver.findElement(By.id("id_email")).sendKeys(new_email);
        await driver.findElement(By.id("id_addfilter")).click();
        // add assert full name and capture system id

        //delete new user
        await driver.findElement(By.xpath('//td[contains(., "' + new_email + '")]/../td/a[contains(@href, "delete=")]')).click();
        await driver.findElement(By.xpath('//button[text()="Delete"]')).click();

        // quit the browser after execution
        await driver.quit();

    });
});

