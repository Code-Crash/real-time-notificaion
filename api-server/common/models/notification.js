'use strict';
module.exports = function (Notification) {

    Notification.observe('before save', function filterProperties(ctx, next) {

        if (ctx.isNewInstance) {
            ctx.instance.createdAt = new Date();
        } else {
            ctx.instance.updatedAt = new Date();
        }
        // Validation for Notificaion.
        if (ctx.instance && !ctx.instance.createdById) {
            var error = new Error();
            error.status = 401;
            error.message = 'You can\'t create notifictaion without createdById';
            error.code = 'CREATOR_MISSING';
            next(error)
        } else {
            next()
        }

    })

};
