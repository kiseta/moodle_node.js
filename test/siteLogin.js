const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");
// const data = require("data")
var should = require("chai").should();

// ------------------------------- data --------------------------------------
var hr = '\n--------------~*~------------';
var baseUrl = 'http://52.39.5.126/';
var app = "Moodle LMS";
var homePageTitle = "Software Quality Assurance Testing";
var admin_username = 'tkuser';
var admin_password = 'Moodle!123';
var admin_fullname = 'Test User';

// ----------------------------------------------------------------------------


// use Mocha testing framework
// describe block
describe("Test: Login", function(){

    // it block (it = individual test)
    it("Launch Moodle app and login", async function(){

        let driver = await new Builder().forBrowser("chrome").build();

        await driver.get(baseUrl);
        actualHomePageTitle = await driver.getTitle()
        actualHomePageTitle.should.equal(homePageTitle)

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
        fullNameText.should.equal(admin_fullname)

        console.log('Login Successful! User Name is confirmed:', fullNameText, hr)

        console.log('Confirm Dashboard\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), hr);


        // quit the browser after execution
        await driver.quit();

    });
});

