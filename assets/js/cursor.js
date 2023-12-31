// Define constants and variables
const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');
const mouse = { x: -100, y: -100 };
const pos = { x: 0, y: 0 };
const speed = 0.1;
const maxSqueeze = 0;
const accelerator = 0;

// Update mouse coordinates
function updateCoordinates(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}

// Get angle between mouse and cursor
function getAngle(diffX, diffY) {
	return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

// Get squeeze effect between mouse and cursor
function getSqueeze(diffX, diffY) {
	const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
	return Math.min(distance / accelerator, maxSqueeze);
}

// Update cursor position, angle and squeeze effect
function updateCursor() {
	const diffX = Math.round(mouse.x - pos.x);
	const diffY = Math.round(mouse.y - pos.y);
	pos.x += diffX * speed;
	pos.y += diffY * speed;
	const angle = getAngle(diffX, diffY);
	const squeeze = getSqueeze(diffX, diffY);
	const scale = `scale(${1 + squeeze}, ${1 - squeeze})`;
	const rotate = `rotate(${angle}deg)`;
	const translate = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
	cursor.style.transform = translate;
	cursorCircle.style.transform = `${rotate} ${scale}`;
}

// Update cursor modifiers
function updateCursorModifiers() {
	const cursorModifiers = document.querySelectorAll('[data-cursor]');
	cursorModifiers.forEach((cursorModifier) => {
		const className = cursorModifier.getAttribute('data-cursor');
		cursorModifier.addEventListener('mouseenter', () => {
			cursor.classList.add(className);
		});
		cursorModifier.addEventListener('mouseleave', () => {
			cursor.classList.remove(className);
		});
	});

	const disableCursorElements = document.querySelectorAll('[data-disable-cursor]');
	disableCursorElements.forEach((element) => {
		element.addEventListener('mouseenter', () => {
			cursor.style.display = 'none';
		});
		element.addEventListener('mouseleave', () => {
			cursor.style.display = 'block';
		});
	});
}

// Start the animation loop
function animate() {
	updateCursor();
	requestAnimationFrame(animate);
}

// Add event listeners and start animation loop
window.addEventListener('mousemove', updateCoordinates);
updateCursorModifiers();
requestAnimationFrame(animate);