const {By,Key,Builder} = require("selenium-webdriver");
const ltCapabilities = require("../capabilities")
const data = require("./data")
require("chromedriver");
const assert = require("assert");
const should = require("chai").should();
const rnd = require('generate-random-data');

// console.log(data.new_firstName, data.new_lastName, data.new_userName, data.tld, data.random_domain, data.new_email, '\n', data.description_text);

// ----------------------------------------------------------------------------

function helloworld(param){
    console.log("\n *^*^* " + param, new Date().toLocaleString() +  "\n")

}
// use Mocha testing framework
// describe block
describe("Moodle Test: Add New User", function(){
    var driver;

    // lambdatest related settings, username, key, host
    const USERNAME = ltCapabilities.capabilities.user;
    const KEY = ltCapabilities.capabilities.accessKey;
    const GRID_HOST = "hub.lambdatest.com/wd/hub";
    const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

beforeEach(function(){
    // driver = new Builder().forBrowser("chrome").build();

    ltCapabilities.capabilities.name = this.currentTest.title;
    driver = new Builder().usingServer(gridUrl).withCapabilities(ltCapabilities.capabilities).build();

    helloworld("Test started: ")
});

afterEach(async function(){
    await driver.quit();
    helloworld("Test ended at:")
});

    // it block (it = individual test)
    it("Launch Moodle app, login, register new user", async function(){

        await driver.get(data.baseUrl);
        actualHomePageTitle = await driver.getTitle();
        actualHomePageTitle.should.equal(data.homePageTitle);

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
        fullNameText.should.equal(data.admin_fullname);

        console.log('Login Successful! User Name is confirmed:', fullNameText, data.hr);

        console.log('Confirm Dashboard\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);

        // navigate to Add New User
        await driver.findElement(By.linkText("Site administration")).click();
        await driver.findElement(By.linkText("Users")).click();
        await driver.findElement(By.linkText("Add a new user")).click();

        console.log('Navigate to Add New User\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);

        // populate Add New User form, required filds only
        await driver.findElement(By.id("id_username")).sendKeys(data.new_userName);
        await driver.findElement(By.linkText("Click to enter text")).click();
        await driver.findElement(By.id("id_newpassword")).sendKeys(data.new_password);
        await driver.findElement(By.id("id_firstname")).sendKeys(data.new_firstName);
        await driver.findElement(By.id("id_lastname")).sendKeys(data.new_lastName);
        await driver.findElement(By.id("id_email")).sendKeys(data.new_email);

        await driver.findElement(By.id("id_description_editoreditable")).clear();
        await driver.findElement(By.id("id_description_editoreditable")).sendKeys(data.description_text);

        await driver.findElement(By.id("id_submitbutton")).click();

        currentPageTitle = await driver.getTitle()

        assert.strictEqual(currentPageTitle, data.usersPageTitle);

        currentPageTitle.should.equal(data.usersPageTitle);

        console.log('New User Added:', data.new_userName,'\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);
      
        // search new user
        await driver.findElement(By.id("id_email")).sendKeys(data.new_email);
        await driver.findElement(By.id("id_addfilter")).click();
        // add assert full name and capture system id

        let new_emailText = await driver.findElement(By.xpath('//td[contains(., "' + data.new_fullName + '")]/../td[contains(., "' + data.new_email + '")]')).getText().then(function(value){
            return value
        })
        new_emailText.should.equal(data.new_email);
        var href = await driver.findElement(By.linkText(data.new_fullName)).getAttribute("href");
        var sysId = href.split('id=').pop().split('&')[0];
        console.log('New User found: ', data.new_userName,'\nFull name:', data.new_fullName,'\nUser Email:', new_emailText, "\nNew User SysID:", sysId, data.hr);
        

        //delete new user
        await driver.findElement(By.xpath('//td[contains(., "' + data.new_email + '")]/../td/a[contains(@href, "delete=' + sysId + '")]')).click();
        await driver.findElement(By.xpath('//button[text()="Delete"]')).click();

        console.log('New User Deleted: ', data.new_userName,'\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);

    });

    
});

