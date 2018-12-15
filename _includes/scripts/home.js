/*(function () {

})();*/

// const applicationServerPublicKey = 'BDHKPaCLbGyTeocs9pWEMR9k9dAUM1H0FcqSpdFkhvlUm813A9eeQSaBSXLh7hlNeJHzwZukKE7lH91nMpmAS3w';

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('/sw.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}