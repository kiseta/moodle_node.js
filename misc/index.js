
var sysId = "http://52.39.5.126/user/view.php?id=5612&course=1".split('id=').pop().split('&')[0];
console.log(" *** SysID", sysId)

// const webdriver = require('selenium-webdriver'),
//     By = webdriver.By,
//     until = webdriver.until;

// const driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();

// driver.get('http://52.39.5.126/').then(function(){ 

//     driver.findElement(By.linkText("Log in")).click();
//     driver.findElement(By.id("username")).sendKeys("tkuser");
//     driver.findElement(By.id("password")).sendKeys("Moodle!123");
//     driver.findElement(By.id("loginbtn")).click();
// })

// const webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
// const driver = new webdriver.Builder().forBrowser('chrome').build();

// driver.get('http://52.39.5.126/').then(function(){
// driver.findElement(webdriver.By.linkText('Log in')).click().then(function(){
//     driver.getTitle().then(function(title) {
//       console.log(title)
//       if(title === 'Software Quality Assurance Testing: Log in to the site') {
//         console.log('Test passed');

//       } else {
//          console.log('Test failed');
//       }
//      driver.quit();
//     });
//   });
// });

// driver.get('http://www.google.com').then(function(){
// driver.findElement(webdriver.By.name('q')).sendKeys('webdriver\n').then(function(){
//     driver.getTitle().then(function(title) {
//       console.log(title)
//       if(title === 'webdriver - Google Search') {
//          console.log('Test passed');
//       } else {
//          console.log('Test failed');
//       }
//      driver.quit();
//     });
//   });
// });