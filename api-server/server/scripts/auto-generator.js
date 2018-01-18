'use strict';

var schedule = require('node-schedule');

var notificationCron = function (server) {

    var Profile = server.models.Profile;
    var Notification = server.models.Notification;
    var notificationOptions = [
        'posted photo on your wall.',
        'commented on your last video',
        'commented on your photo',
        'like your post',
        'like your video.'
    ];

    var rule = new schedule.RecurrenceRule();
    // We will generate randome notificaion in each 30 seconds added as below.
    var j = schedule.scheduleJob('NotificaionAutoGenerator', '*/30 * * * * *', function () {
        console.log('************* CRON JOB STARTED **************');
        Profile.find({}, function (err, profiles) {
            if (err) {
                console.log('CRON ERROR:', err);
                console.log('************* CRON JOB FINISH **************');
            }
            console.log('profiles:', profiles && profiles.length);

            if (profiles && profiles.length > 0) {
                var randomValue = Math.floor(Math.random() * profiles.length);
                var selectedProfile = profiles[randomValue] || profiles[0];
                randomValue = Math.floor(Math.random() * notificationOptions.length);
                var selectedNotificaion = notificationOptions[randomValue] || notificationOptions[0];

                Notification.create({
                    'text': selectedNotificaion,
                    'createdById': selectedProfile.id

                }, function (err, notification) {
                    if (err) {
                        console.log('NOTIFICAION CREATE ERROR : ', err);
                        console.log('************* CRON JOB FINISH **************');
                    }
                    if (notification) {
                        console.log('NOTIFICAION CREATEED :', notification);
                        console.log('************* CRON JOB FINISH **************');
                    }
                });
            }

        });
    });

    // j.cancel();
};

module.exports = {
    notificationCron: notificationCron
};
