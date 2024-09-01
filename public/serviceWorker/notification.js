self.addEventListener('install', function(event) {
  event.waitUntil(
    self.skipWaiting()
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    self.clients.claim()
  );
});

// Function to send notification
function sendNotification() {
  self.registration.showNotification('Reminder', {
    body: 'Reminder to add your expenses to the app to keep all expense intact',
    icon: '/icons/android-launchericon-72-72.png'
  });
}

// Schedule notification to be sent at 3 PM daily
function scheduleNotification() {
  const now = new Date();
  const desiredTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0); // 3 PM

  let delay = desiredTime.getTime() - now.getTime();
  if (delay < 0) {
    // If desired time has passed today, schedule it for tomorrow
    desiredTime.setDate(desiredTime.getDate() + 1);
    delay = desiredTime.getTime() - now.getTime();
  }

  setTimeout(function() {
    sendNotification();
    // Schedule the next notification for the next day
    scheduleNotification();
  }, delay);
}

// Call scheduleNotification() when the service worker is installed
self.addEventListener('install', function(event) {
  event.waitUntil(scheduleNotification());
});
