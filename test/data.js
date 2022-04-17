var random = require('generate-random-data');
new_firstName = [random.femaleFirstName(), random.maleFirstName()][Math.floor(Math.random() * 2)];
new_lastName = random.lastName();
new_username = (new_firstName + new_lastName).toLowerCase().substring(0, 10) + random.int(11,99);