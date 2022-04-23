// const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");
const webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
const driver = new webdriver.Builder().forBrowser('chrome').build();


var sysId = "/user/view.php?id=5612&course=1".split('id=').pop().split('&')[0];
console.log(" *** SysID", sysId);


// driver.get('http://52.39.5.126/').then(function(){
// driver.findElement(webdriver.By.linkText('Log in')).click().then(function(){
//     driver.getTitle().then(function(title) {
//       console.log(title)
//       if(title === 'Software Quality Assurance Testing: Log in to the site') {

//         console.log('App launched. Test passed');

//       } else {
//          console.log('Test failed');
//       }
//      driver.quit();
//     });
//   });
// });

driver.get('http://www.google.com').then(function(){
driver.findElement(webdriver.By.name('q')).sendKeys('webdriver\n').then(function(){
    driver.getTitle().then(function(title) {
      console.log(title)
      if(title === 'webdriver - Google Search') {
         console.log('Test passed');
      } else {
         console.log('Test failed');
      }
     driver.quit();
    });
  });
});