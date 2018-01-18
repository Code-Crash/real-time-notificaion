'use strict';
module.exports = function (Profile) {

    Profile.observe('before save', function (ctx, next) {
        console.log('Before Save Profile');
        if (ctx.instance) {
            ctx.instance['username'] = ctx.instance.username ? ctx.instance.username.toLowerCase() : undefined;
            ctx.instance['email'] = ctx.instance.email ? ctx.instance.email.toLowerCase() : undefined;
        }
        next();
    });

};
