// Type definitions for service_worker_api
// Project: https://developer.mozilla.org/fr/docs/Web/API/ServiceWorker_API
// Definitions by: Tristan Caron <https://github.com/tristancaron>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
/// <reference path="./es6-promise/es6-promise.d.ts" />
/// <reference path="libs/ServiceWorker.ts" />
var GrowthPushWebSetting = {
    iconImage: './img/gp_icon.png',
    title: 'YOUR_APP_NAME',
    applicationId: 1,
    secret: '9TnH8Y3He22BV0SzGXH832Gb3qBuq3p4'
};
self.addEventListener('push', function (event) {
    event.waitUntil(self.registration.pushManager.getSubscription().then(function (subscription) {
        self.fetch('https://api.growthpush.com/1/trials/cors?token=' + subscription.subscriptionId + '&applicationId=' + GrowthPushWebSetting.applicationId + '&secret=' + GrowthPushWebSetting.secret)
            .then(function (response) {
            return response.json();
        }).catch(function (response) {
        }).then(function (data) {
            var icon = GrowthPushWebSetting.iconImage;
            self.registration.showNotification(GrowthPushWebSetting.title, {
                icon: icon,
                body: data.text,
                tag: 'growthpush-trialId=' + data.trialId,
                vibrate: data.sound ? 1000 : 0,
                silent: !data.sound,
                data: data.extra
            });
        });
    }));
}, false);
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(clients.matchAll({ type: 'window' }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow) {
            return clients.openWindow('/');
        }
    }));
}, false);
