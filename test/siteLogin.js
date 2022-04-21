const {By,Key,Builder} = require("selenium-webdriver");
const ltCapabilities = require("../capabilities")
const data = require("./data")
require("chromedriver");
const assert = require("assert");
const should = require("chai").should();


// use Mocha testing framework
// describe block
describe("Moodle Test: Login as Admin User, Log Out", function(){
    
    // lambdatest related settings, username, key, host
    const USERNAME = ltCapabilities.capabilities.user;
    const KEY = ltCapabilities.capabilities.accessKey;
    const GRID_HOST = "hub.lambdatest.com/wd/hub";
    const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

    beforeEach(function(){
        driver = new Builder().forBrowser("chrome").build();
    
        // ltCapabilities.capabilities.name = this.currentTest.title;
        // driver = new Builder().usingServer(gridUrl).withCapabilities(ltCapabilities.capabilities).build();
    
        console.log("\n*^*^*", "Test Started:", new Date().toLocaleString(), "\n")
    });
    
    afterEach(async function(){
        await driver.quit();
        console.log("\n*^*^*", "Test Ended:", new Date().toLocaleString(), "\n")
    });

    // it block (it = individual test)
    it("Launch Moodle app Login, Logout", async function(){


        await driver.get(data.baseUrl);
        actualHomePageTitle = await driver.getTitle()
        actualHomePageTitle.should.equal(data.homePageTitle)

        console.log('Launch', data.app, 'Website\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);

        await driver.findElement(By.linkText("Log in")).click();

        console.log('Login\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);

        await driver.findElement(By.id("username")).sendKeys(data.admin_username);
        await driver.findElement(By.id("password")).sendKeys(data.admin_password);
        await driver.findElement(By.id("loginbtn")).click();


        let fullNameText = await driver.findElement(By.className("usertext mr-1")).getText().then(function(value){
            return value
        })


        // assert using chai should
        fullNameText.should.equal(data.admin_fullname)

        console.log('Login Successful! User Name is confirmed:', fullNameText, data.hr)

        console.log('Confirm Dashboard\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);

        await driver.findElement(By.className("usertext mr-1")).click();
        await driver.findElement(By.xpath('//span[contains(.,"Log out")]')).click()

        console.log('Logout \nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);

    });
});

