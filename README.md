# Real Time Notification System

## Description

Demonstration of real time notification system.

### Project Details

#### Technology Stack

##### API Server:

 * [Node.js](https://nodejs.org/en/) (7.10.0)
 * [NPM](https://www.npmjs.com/) (5.5.1)
 * [LoopBack](http://loopback.io/) (3.x)
 * [FireLoop](http://fireloop.io/) (1.x)
 * [Socket.io](https://socket.io/) (2.x)

##### Client Server:

 * [AngularJS](https://angular.io/) (5.x)
 * [MaterialUI](https://material.angular.io/) (5.x)
 * [Socket.io-client](https://socket.io/) (2.x)

##### Database:

  ```
  Note: We can decide which datasource we need to use, more details are below.
  ```

 * Memory
 * [MongoDB](https://www.mongodb.com/)


#### Requirements:

 * Should have NodeJS/NPM installed.
 * Should have MongoDB installed.

#### Development Environment:

I have made sure that the project behaves similarly on all the platforms.
But, I have used macOS Sierra system (10.12.6) and tested on Google Chrome(62.0.3202.89)

#### Project Setup:

##### Setup api-server:

* The api-server is responsible for storing and generating the data along with the required API's and storage features.
* To start the ```api-server``` we need to follow the below steps.

```
$cd api-server/

$npm install

$npm start
```
* ``` npm start ``` will run the server once, and if we do any modification in ```api-server code``` we need to run the server again to reflect the changes. So we can also run the server by ``` nodemon ``` by using the command as below.

```
$npm install -g nodemon <run if you don't have nodemon>
$nodemon
```
* You can decide if you want to use ``` npm start ``` or ``` nodemon ```.
* Right now we are using the memory datasource, you can see the datasource configuration in ```server/datasources.json```
* If you want to switch the datasource to MongoDB, then you can copy and paste the content from ```server/datasources.json.example``` to  ```server/datasources.json``` , and you also need to copy the content from ```server/model-config.json.example``` to  ```server/model-config.json``` and in order to work after doing this changes, you need to run the MongoDB.
* If everything is fine, you will see the ```api-server``` is running on ```http://localhost:3000```.


##### Setup web-server:

* The web-server is responsible for showing and provide the good UI/UX to the user and also it will provide the control over data to manipulation.
* To start the ```web-server``` we need to follow the below steps.

```
$cd web-server/

$npm install

$npm start
```
* If you face any issues with ```npm start```, then check if you have installed ```@angular/cli``` or not, you can install by using the command as follow:

```
$npm install @angular/cli -g
```
* If ```npm install``` is running for a long time, use control+c and then see if there is any error or not, and also try running ```npm start``` if it works.
* If everything is fine, you will see the web-server is running on ```http://localhost:4200/```.
* In order to run the application, you need to run both the server ```(web and api)``` simultaneously.


#### How it works?

* When the ```api-server``` start, it creates 5 users and 6 notifications by default, you can find the code in ```server/boot/install.js```.
* After that, the ```api-server``` will generate the random notification from the random user in every 30 seconds, you can find the code in ```server/scripts/auto-generator.js```.
* Initially we are showing only 5 notifications at a time in the drop-down, if you want to see all the notifications you can go to the tab namely ```All Notifications``` or you can also jump to all notifications from Notification drop-down by clicking the button ```See All```.

#### What is Notification Playground?

* The Notification Playground is the place where you can do add, edit, update and delete operations on the Notification.

#### More Details:

* I have deployed the application on Heroku for the demo, try the link [first-link](), if this does not work then try [second-link](http://notification.pravintiwari.com/)

```
Note: On Server version of the application, I have written two CRON job as below.

1. To Generate the Notifications in every 30 seconds.
2. To Delete all the notifications in every 5 minutes.
```

```javascript
// CRON job code to delete all the notifications

    var k = schedule.scheduleJob('ClearNotificaions', '*/5 * * * *', function () {
        console.log('************* CRON JOB STARTED FOR CLEAR **************');
        Notification.destroyAll({}, function (err, notifications) {
            if (err) {
                console.log('CRON ERROR:', err);
                console.log('************* CRON JOB FOR CLEAR FINISH **************');
            }
            console.log('notifications destroyed');
        });
    });

```
* This is a [video link](https://drive.google.com/file/d/18YubA_7Gc_g9yso62vsCi0KMUpU63lnd/view?usp=sharing)
* Some More Screenshots:
* * ![Notificaion Dropdown](https://i.imgur.com/0D2LC5p.png)
* * ![Notification Playground](https://i.imgur.com/CzAFFT1.png)
* * ![Search Profile](https://i.imgur.com/nvBGiXz.png)
* * ![Search Notification](https://i.imgur.com/THPDx4z.png)
* * ![All Notificaitons](https://i.imgur.com/S2U3H3u.png)

#### Author:

* Pravin Tiwari
* Mail:  pravintiwari1992@gmail.com
