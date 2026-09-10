let deferredPrompt = null;
const installBtn = document.getElementById('installBtn');
const onlineBadge = document.getElementById('onlineBadge');
const footerStatus = document.getElementById('footerStatus');
const installHelp = document.getElementById('installHelp');
const installHelpText = document.getElementById('installHelpText');

function updateOnlineState(){
  const online = navigator.onLine;
  onlineBadge.textContent = online ? 'Online' : 'Offline';
  onlineBadge.classList.toggle('online', online);
  onlineBadge.classList.toggle('offline', !online);
  footerStatus.textContent = online ? 'Online' : 'Offline — hub shell available';
}
window.addEventListener('online', updateOnlineState);
window.addEventListener('offline', updateOnlineState);
updateOnlineState();

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.textContent = 'Install app';
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  installBtn.textContent = 'Installed';
  installBtn.disabled = true;
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    return;
  }

  const ua = navigator.userAgent.toLowerCase();
  const ios = /iphone|ipad|ipod/.test(ua);
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (standalone) {
    installHelpText.textContent = 'Renoweet Hub is already running as an installed app on this device.';
  } else if (ios) {
    installHelpText.textContent = 'On iPhone or iPad: open this page in Safari, tap Share, then choose Add to Home Screen.';
  } else {
    installHelpText.textContent = 'Use your browser menu and choose Install app or Add to Home screen. Chrome and Edge may also show an install icon in the address bar.';
  }
  installHelp.showModal();
});

document.getElementById('closeInstallHelp').addEventListener('click', () => installHelp.close());

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
}
