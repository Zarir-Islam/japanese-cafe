document.addEventListener('DOMContentLoaded', () => {
	const menuIcon = document.querySelector('.menu-icon');

	if (menuIcon) {
		// If page has a nav menu, treat the icon as a close (index page)
		if (document.querySelector('.nav-menu')) {
			menuIcon.addEventListener('click', shutdownSite);
		} else {
			// Otherwise (concept-menu page), treat the icon as a menu toggle
			menuIcon.addEventListener('click', () => {
				if (typeof toggleMenuOverlay === 'function') toggleMenuOverlay();
			});
		}
	}

	// Ensure the overlay exists on pages that don't have the nav already
	if (!document.querySelector('.nav-menu')) {
		createMenuOverlay();
	}
});

function shutdownSite() {
	// Try to close the window (works when window opened by script)
	try { window.close(); } catch (e) { /* ignore */ }
	// Try to navigate away
	try { window.location.href = 'about:blank'; } catch (e) { /* ignore */ }

	// Fallback: replace the page content with a shutdown message
	setTimeout(() => {
		document.body.innerHTML = '';
		const wrapper = document.createElement('div');
		wrapper.className = 'shutdown-screen';
		wrapper.innerHTML = `
			<div>
				<h1>Website closed</h1>
				<p>Thank you for visiting.</p>
			</div>
		`;
		document.body.appendChild(wrapper);
		document.title = 'Closed';
	}, 200);
}

function createMenuOverlay() {
	const items = [
		{ href: 'concept-menu.html', en: 'Concept & Menu', jp: 'コンセプト・メニュー' },
		{ href: '#', en: 'Access', jp: '店舗への行き方' },
		{ href: '#', en: 'Gallery', jp: '店舗の様子' },
		{ href: '#', en: 'Original Contents', jp: 'オリジナルコンテンツ' }
	];

	const overlay = document.createElement('div');
	overlay.className = 'menu-overlay hidden';

	const closeBtn = document.createElement('button');
	closeBtn.className = 'overlay-close';
	closeBtn.setAttribute('aria-label', 'Close menu');
	closeBtn.textContent = '✕';
	closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));

	const menu = document.createElement('nav');
	menu.className = 'overlay-menu';

	items.forEach(it => {
		const a = document.createElement('a');
		a.href = it.href;
		a.className = 'overlay-item';
		a.innerHTML = `<span class="nav-en">${it.en}</span><span class="nav-jp">${it.jp}</span>`;
		menu.appendChild(a);
	});

	overlay.appendChild(closeBtn);
	overlay.appendChild(menu);
	document.body.appendChild(overlay);

	// Expose toggle function globally so header handler can call it
	window.toggleMenuOverlay = () => {
		overlay.classList.toggle('hidden');
	};
}

// Helpful for debugging when needed
// window._debugScript = { shutdownSite, createMenuOverlay };
