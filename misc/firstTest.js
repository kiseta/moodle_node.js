const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");
const assert = require("assert");
const data = require("../test/data")
var should = require("chai").should();

async function example(){

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get(data.baseUrl);
    await driver.manage().window().maximize();
    actualHomePageTitle = await driver.getTitle()
    actualHomePageTitle.should.equal(data.homePageTitle)

    console.log('Launch', data.app, 'Website\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);

    await driver.findElement(By.linkText("Log in")).click();

    console.log('Login\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);

    await driver.findElement(By.id("username")).sendKeys(data.admin_username);
    await driver.findElement(By.id("password")).sendKeys(data.admin_password);
    await driver.findElement(By.id("loginbtn")).click();

    // assert using node assertion
    // validate login successful

    // let fullNameText = await driver.findElement(By.xpath("//span[@class='usertext mr-1']")).getText().then(function(value){
    //     return value
    // })

    let fullNameText = await driver.findElement(By.className("usertext mr-1")).getText().then(function(value){
        return value
    })

    assert.strictEqual(fullNameText, data.admin_fullname)

    // assert using chai should
    fullNameText.should.equal(data.admin_fullname)

    console.log('Login Successful! User Name is confirmed:', fullNameText, data.hr)

    console.log('Confirm Dashboard\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);


    await driver.findElement(By.linkText("Site administration")).click();
    await driver.findElement(By.linkText("Users")).click();
    await driver.findElement(By.linkText("Add a new user")).click();

    console.log('Navigate to Add New User\nTitle is:', await driver.getTitle(),'\nCurrent URL:', await driver.getCurrentUrl(), data.hr);


    // quit the browser after execution
    await driver.quit();
}

example();