export const notify = (text: string) => {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    new Notification(text);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        new Notification(text);
      }
    });
  }
};
