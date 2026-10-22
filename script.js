const screens = [...document.querySelectorAll('.screen')];
const progressSegments = [...document.querySelectorAll('.progress-segment')];
let currentScreen = 0;

function showScreen(index) {
  currentScreen = index;
  screens.forEach((screen, i) => {
    const active = i === index;
    screen.classList.toggle('active', active);
    screen.hidden = !active;
  });
  progressSegments.forEach((segment, i) => segment.classList.toggle('active', i <= Math.min(index, 3)));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-next]').forEach(button => {
  button.addEventListener('click', () => showScreen(Math.min(currentScreen + 1, screens.length - 1)));
});

function createParticles() {
  const holder = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    const size = 2 + Math.random() * 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${25 + Math.random() * 90}%`;
    particle.style.setProperty('--duration', `${7 + Math.random() * 11}s`);
    particle.style.setProperty('--delay', `${-Math.random() * 16}s`);
    holder.appendChild(particle);
  }
}
createParticles();

function popSparkles(x, y, amount = 14) {
  const symbols = ['✦', '✧', '·', '♡'];
  for (let i = 0; i < amount; i++) {
    const spark = document.createElement('span');
    spark.className = 'sparkle-pop';
    spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--x', `${(Math.random() - .5) * 190}px`);
    spark.style.setProperty('--y', `${(Math.random() - .5) * 170}px`);
    spark.style.fontSize = `${10 + Math.random() * 15}px`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 850);
  }
}

function confettiBurst(count = 90) {
  const layer = document.getElementById('confetti-layer');
  const colors = ['#ff3cac', '#9b6cff', '#f7d5ff', '#a9f1ff', '#ffd879'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--fall', `${1.7 + Math.random() * 2.1}s`);
    piece.style.setProperty('--drift', `${(Math.random() - .5) * 220}px`);
    piece.style.animationDelay = `${Math.random() * .5}s`;
    if (Math.random() > .5) piece.style.borderRadius = '50%';
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

document.getElementById('cake-button').addEventListener('click', event => {
  const rect = event.currentTarget.getBoundingClientRect();
  popSparkles(rect.left + rect.width / 2, rect.top, 18);
  confettiBurst(48);
  event.currentTarget.innerHTML = 'Birthday magic unlocked <span>♡</span>';
  event.currentTarget.disabled = true;
  event.currentTarget.style.opacity = '.86';
});

const giftButton = document.getElementById('gift-button');
const giftReveal = document.getElementById('gift-reveal');
const giftContinue = document.getElementById('gift-continue');

giftButton.addEventListener('click', () => {
  if (!giftReveal.hidden) return;
  giftButton.classList.add('opened');
  giftReveal.hidden = false;
  giftContinue.hidden = false;
  giftButton.setAttribute('aria-label', 'Gift opened');
  const rect = giftButton.getBoundingClientRect();
  popSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
});

document.getElementById('gift-ack').addEventListener('click', () => {
  const button = document.getElementById('gift-ack');
  button.innerHTML = 'I saw that 👀 <span>😂</span>';
  popSparkles(window.innerWidth / 2, window.innerHeight / 2, 12);
});

giftContinue.addEventListener('click', () => showScreen(4));

document.getElementById('celebrate-button').addEventListener('click', event => {
  confettiBurst(115);
  const rect = event.currentTarget.getBoundingClientRect();
  popSparkles(rect.left + rect.width / 2, rect.top, 22);
  document.getElementById('signoff').hidden = false;
  event.currentTarget.textContent = 'Happy birthday, Noor! ♡';
  event.currentTarget.disabled = true;
});

document.getElementById('restart-button').addEventListener('click', () => {
  giftButton.classList.remove('opened');
  giftReveal.hidden = true;
  giftContinue.hidden = true;
  document.getElementById('cake-button').disabled = false;
  document.getElementById('cake-button').innerHTML = 'Tap for a little sparkle <span>✦</span>';
  document.getElementById('cake-button').style.opacity = '';
  document.getElementById('gift-ack').innerHTML = 'Noted? <span>😇</span>';
  document.getElementById('signoff').hidden = true;
  const celebrate = document.getElementById('celebrate-button');
  celebrate.disabled = false;
  celebrate.innerHTML = 'One last thing <span>✦</span>';
  showScreen(0);
});
