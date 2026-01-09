document.addEventListener('DOMContentLoaded', () => {
	// 1. Initial Setup: Create the overlay if it doesn't exist
	if (!document.querySelector('.menu-overlay')) {
		createMenuOverlay();
	}

	// 2. Event Delegation for Menu Toggles
	// This covers both the header hamburger and any other potential toggles
	document.body.addEventListener('click', (e) => {
		// Traverse up to find if a click was inside a .menu-toggle
		const toggleBtn = e.target.closest('.menu-toggle');
		if (toggleBtn) {
			e.preventDefault();
			toggleMenuOverlay();
		}
	});
});

/**
 * Toggles the visibility of the full-screen menu overlay
 */
function toggleMenuOverlay() {
	const overlay = document.querySelector('.menu-overlay');
	const toggles = document.querySelectorAll('.menu-toggle');

	if (overlay) {
		const isHidden = !overlay.classList.contains('active');
		if (isHidden) {
			overlay.classList.add('active');
			document.body.style.overflow = 'hidden'; // Prevent background scrolling
			// Change all toggle icons to X
			toggles.forEach(btn => btn.textContent = '✕');
		} else {
			overlay.classList.remove('active');
			document.body.style.overflow = ''; // Restore scrolling
			// Change all toggle icons to Hamburger
			toggles.forEach(btn => btn.textContent = '☰');
		}
	}
}

/**
 * Creates the menu overlay structure dynamically
 * mimicking the content of menu.html
 */
function createMenuOverlay() {
	// Define the menu items
	const items = [
		{ href: 'concept.html', en: 'Concept & Menu', jp: 'コンセプト・メニュー' },
		{ href: 'access.html', en: 'Access', jp: '店舗への行き方' },
		{ href: 'gallery.html', en: 'Gallery', jp: '店舗の様子' },
		{ href: 'index.html', en: 'Original Contents', jp: 'オリジナルコンテンツ' }
	];

	// Create the overlay container
	const overlay = document.createElement('div');
	overlay.className = 'menu-overlay';

	// Background Doodles (Same as menu.html)
	const img1 = document.createElement('img');
	img1.src = 'images/cupcake.png';
	img1.className = 'bg-doodle d-left';
	img1.alt = '';

	const img2 = document.createElement('img');
	img2.src = 'images/cake.png';
	img2.className = 'bg-doodle d-right';
	img2.alt = '';

	// Navigation Container
	const menu = document.createElement('nav');
	menu.className = 'overlay-menu';

	// Generate Links
	items.forEach(it => {
		const a = document.createElement('a');
		a.href = it.href;
		a.className = 'overlay-item';
		a.innerHTML = `<span class="nav-en">${it.en}</span><span class="nav-jp">${it.jp}</span>`;
		menu.appendChild(a);
	});

	// Assemble everything
	overlay.appendChild(img1); // Add doodles
	overlay.appendChild(img2);
	// No separate close button needed as header icon toggles it
	overlay.appendChild(menu);
	document.body.appendChild(overlay);
}


/* Press Release Slider */
document.addEventListener('DOMContentLoaded', () => {
	const track = document.getElementById('sliderTrack');
	const prevBtn = document.getElementById('prevBtn');
	const nextBtn = document.getElementById('nextBtn');

	// Config
	const cardWidth = 280; // Must match CSS .pr-card
	const totalSlides = 3;
	let currentIndex = 0;

	function updateSlider() {
		// Apply transform. CSS !important on PC handles the disable.
		track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
	}

	if (prevBtn && nextBtn && track) {
		prevBtn.addEventListener('click', () => {
			if (currentIndex > 0) {
				currentIndex--;
				updateSlider();
			}
		});

		nextBtn.addEventListener('click', () => {
			if (currentIndex < totalSlides - 1) {
				currentIndex++;
				updateSlider();
			}
		});
	}
});

