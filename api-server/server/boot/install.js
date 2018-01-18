'use strict';

module.exports = function (app) {
    var Notification = app.models.Notification;
    var Profile = app.models.Profile;

    /**
     * @desc This code will create the 5 users when the server will restart and then 6 notification,
     *      if the datasource is memory then it will create each time,
     *      and if the datasource is mongodb, it will create only once and
     *      on each restart, it will throw an error as user allready exists.
     */
    Profile.create([{
            'email': 'natalie@gmail.com',
            'username': 'natalie',
            'emailVerified': false,
            'isActive': false,
            'avatar': '3.jpg',
            'firstname': 'Natalie',
            'lastname': 'O\'Conner',
            'password': 'natalie',
        },
        {
            'email': 'simon@gmail.com',
            'username': 'simon',
            'emailVerified': false,
            'isActive': false,
            'avatar': '1.png',
            'firstname': 'Simon',
            'lastname': 'Cowell',
            'password': 'simon',
        },
        {
            'email': 'jason@gmail.com',
            'username': 'jason',
            'emailVerified': false,
            'isActive': false,
            'avatar': '2.png',
            'firstname': 'Jason',
            'lastname': 'Smith',
            'password': 'jason',
        }, {
            'email': 'charlotte@gmail.com',
            'username': 'Baken',
            'emailVerified': false,
            'isActive': false,
            'avatar': '4.jpg',
            'firstname': 'Charlotte',
            'lastname': 'Baken',
            'password': 'charlotte',
        }, {
            'email': 'willis@gmail.com',
            'username': 'willis',
            'emailVerified': false,
            'isActive': false,
            'avatar': '5.jpg',
            'firstname': 'Willis',
            'lastname': 'Marley',
            'password': 'willis',
        },
    ], function (err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log('Users Created:', users.length || 0);
            if (users && users.length === 5) {
                Notification.create([{
                    "text": "posted photo on your wall.",
                    "createdById": users[0].id
                }, {
                    "text": "commented on your last video",
                    "createdById": users[1].id
                }, {
                    "text": "like your post",
                    "createdById": users[2].id
                }, {
                    "text": "commented on your photo",
                    "createdById": users[3].id
                }, {
                    "text": "like your video.",
                    "createdById": users[4].id
                }, {
                    "text": "posted 2 comments on your photo.",
                    "createdById": users[3].id
                }], function (err, notifications) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Notifications Created:', notifications.length || 0);
                    }
                });
            }
        }
    });
};
