const MODE = 'prod';
const cacheFiles = [
  '/Board/index.html',
  '/Board/public/javascripts/canvas.js',
  '/Board/public/javascripts/main.js',
  '/Board/public/stylesheets/main.css',
  '/Board/assets/icons/paintbrush.png',
  '/Board/assets/icons/pen.cur',
  '/Board/assets/icons/eraser.cur'
];

const logMessage = message => {
  if (MODE === 'dev') {
    console.log(message);
  }
};

const createCacheByName = async cacheName => {
  return caches.open(cacheName);
};

const loadResourcesFromCache = async request => {
  return caches.match(request);
};

const installEventHandler = async () => {
  const cacheName = 'paint';
  const paintCache = await createCacheByName(cacheName);
  return paintCache.addAll(cacheFiles);
};

self.addEventListener('install', function(installEvent) {
  try {
    installEvent.waitUntil(installEventHandler());
  } catch (error) {
    logMessage(error);
  }
});

const fetchEventHandler = async request => {
  try {
    const requestedResources = await loadResourcesFromCache(request);
    if (requestedResources) {
      logMessage(request);
      return requestedResources;
    } else {
      return fetch(request);
    }
  } catch (error) {
    logMessage(error);
  }
};

self.addEventListener('fetch', function(fetchEvent) {
  fetchEvent.respondWith(fetchEventHandler(fetchEvent.request));
});
