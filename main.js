document.addEventListener('DOMContentLoaded', () => {
    // --- DATA STORE ---
    let videos = [];
    let originalVideos = [];

    // --- ELEMENT SELECTORS ---
    const gallery = document.getElementById('video-gallery');
    const searchInput = document.getElementById('search-input');
    const sortBySelect = document.getElementById('sort-by');
    const resultsIndicator = document.getElementById('results-indicator');
    const themeToggle = document.getElementById('theme-toggle');
    const tabContainer = document.querySelector('.tabs');
    const viewToggleContainer = document.getElementById('view-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const colorPicker = document.getElementById('color-picker');
    const colorControlsWrapper = document.getElementById('color-controls-wrapper');
    const colorResetButton = document.getElementById('reset-color-btn');
    const returnToGalleryBtn = document.getElementById('return-to-gallery-btn');
    const randomVideoTrigger = document.getElementById('random-video-trigger');
    const toastContainer = document.getElementById('toast-container');

    // --- STATE MANAGEMENT ---
    let currentSort = 'default';
    let currentSearchTerm = '';

    // --- ASYNCHRONOUS INITIALIZATION ---
    async function main() {
        initPage();
        renderSkeletons(); 

        try {
            const response = await fetch('./videos.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const fetchedVideos = await response.json();
            videos = fetchedVideos;
            originalVideos = [...fetchedVideos]; 
            
            updateGalleryView();
        } catch (error) {
            console.error("Could not fetch video data:", error);
            if (resultsIndicator) {
                resultsIndicator.textContent = "Unable to load videos. If you are viewing this file locally, you must use a local server (like VS Code Live Server) due to browser security restrictions.";
                resultsIndicator.style.color = "var(--accent-color)";
            }
            gallery.innerHTML = ''; 
        }
    }

    // --- INITIALIZATION ---
    function initPage() {
        initTabs();
        initViewToggle();
        initBackToTop();
        initColorPicker();
        
        if (themeToggle) themeToggle.addEventListener('click', handleThemeToggle);
        if (colorResetButton) colorResetButton.addEventListener('click', resetThemeColor);
        if (searchInput) searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            updateGalleryView();
        });
        if (sortBySelect) sortBySelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            updateGalleryView();
        });
        if (returnToGalleryBtn) returnToGalleryBtn.addEventListener('click', () => {
            const galleryTabButton = document.querySelector('.tab-button[data-tab="gallery-tab"]');
            if (galleryTabButton) galleryTabButton.click();
        });
        if (randomVideoTrigger) randomVideoTrigger.addEventListener('click', selectRandomVideo);

        if (gallery) {
            gallery.addEventListener('click', (e) => {
                const btn = e.target.closest('.copy-link-btn');
                if (btn) {
                    const link = btn.dataset.link;
                    navigator.clipboard.writeText(link).then(() => {
                        showToast("Link copied to clipboard!");
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        showToast("Failed to copy link.");
                    });
                }
            });
        }
    }

    // --- SKELETON LOADING ---
    function renderSkeletons() {
        if (!gallery) return;
        gallery.innerHTML = '';
        const skeletonCount = 12; 
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < skeletonCount; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton-card';
            skeleton.innerHTML = `
                <div class="skeleton-thumb"></div>
                <div class="skeleton-text"></div>
            `;
            fragment.appendChild(skeleton);
        }
        gallery.appendChild(fragment);
    }

    // --- TOAST NOTIFICATIONS (UPDATED) ---
    function showToast(message) {
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon">✨</span>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Trigger animation in
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove after 2500ms (Faster)
        setTimeout(() => {
            // Trigger animation out (same as in, reversed)
            toast.classList.remove('show');
            
            // Wait for transition to finish before removing from DOM
            setTimeout(() => {
                toast.remove();
            }, 500); // Matches CSS transition time
        }, 2500);
    }

    // --- RANDOM VIDEO LOGIC ---
    function selectRandomVideo() {
        if (videos.length === 0) return;

        if (currentSearchTerm !== '') {
            searchInput.value = '';
            currentSearchTerm = '';
            updateGalleryView();
        }

        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];
        
        const cards = gallery.querySelectorAll('.video-card');
        const targetCard = cards[randomIndex];

        if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            targetCard.style.transition = 'box-shadow 0.5s ease, transform 0.5s ease';
            targetCard.style.boxShadow = '0 0 30px 10px var(--accent-color)';
            targetCard.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                targetCard.style.boxShadow = '';
                targetCard.style.transform = '';
            }, 1500);

            showToast(`Selected: ${randomVideo.title}`);
        }
    }

    // --- CORE DISPLAY LOGIC ---
    function updateGalleryView() {
        if (!videos.length) return;

        let videosToDisplay = [...originalVideos];

        switch (currentSort) {
            case 'title-asc':
                videosToDisplay.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                videosToDisplay.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }

        const lowerCaseSearchTerm = currentSearchTerm.toLowerCase();
        if (lowerCaseSearchTerm) {
            videosToDisplay = videosToDisplay.filter(video => 
                video.title.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        renderGallery(videosToDisplay);
        updateResultsIndicator(videosToDisplay.length, originalVideos.length);
    }

    function renderGallery(videoArray) {
        if (!gallery) return;
        gallery.innerHTML = '';
        
        if (videoArray.length === 0) {
            resultsIndicator.textContent = `No videos found matching your criteria.`;
            return;
        }
        
        const fragment = document.createDocumentFragment();
        videoArray.forEach((video, index) => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.style.animationDelay = `${index * 0.01}s`;
            
            const videoLink = `https://streamable.com/${video.id}`;
            
            card.innerHTML = `
                <div class="video-embed-placeholder" data-src="https://streamable.com/e/${video.id}">
                    <button class="copy-link-btn" data-link="${videoLink}" title="Copy Link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </button>
                </div>
                <div class="video-label">
                    <a href="${videoLink}" target="_blank" rel="noopener noreferrer" title="${video.title}">${video.title}</a>
                </div>`;
            fragment.appendChild(card);
        });
        gallery.appendChild(fragment);
        initLazyLoad();
    }
    
    function updateResultsIndicator(filteredCount, totalCount) {
        if (resultsIndicator) {
            if (currentSearchTerm) {
                resultsIndicator.textContent = `Showing ${filteredCount} of ${totalCount} videos.`;
            } else {
                resultsIndicator.textContent = `Showing all ${totalCount} videos.`;
            }
        }
    }

    // --- THEME & COLOR CUSTOMIZATION ---
    function handleThemeToggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        sessionStorage.setItem('theme', newTheme);
        if (!sessionStorage.getItem('themeColor')) {
            colorPicker.value = getDefaultAccentColor();
        }
        updateResetButtonVisibility();
    }

    function initColorPicker() {
        const savedColor = sessionStorage.getItem('themeColor');
        if (colorPicker) {
            colorPicker.value = savedColor || getDefaultAccentColor();
            colorPicker.addEventListener('input', (e) => {
                const newColor = e.target.value;
                document.documentElement.style.setProperty('--accent-color', newColor);
                document.documentElement.style.setProperty('--accent-color-translucent', hexToRgba(newColor, 0.2));
                sessionStorage.setItem('themeColor', newColor);
                updateResetButtonVisibility();
            });
        }
        updateResetButtonVisibility();
    }

    function resetThemeColor() {
        sessionStorage.removeItem('themeColor');
        document.documentElement.style.removeProperty('--accent-color');
        document.documentElement.style.removeProperty('--accent-color-translucent');
        if (colorPicker) colorPicker.value = getDefaultAccentColor();
        updateResetButtonVisibility();
    }

    function updateResetButtonVisibility() {
        const isCustomColor = !!sessionStorage.getItem('themeColor');
        if (colorControlsWrapper) {
            colorControlsWrapper.classList.toggle('show-reset', isCustomColor);
        }
    }

    function getDefaultAccentColor() {
        const inlineStyle = document.documentElement.style.getPropertyValue('--accent-color');
        document.documentElement.style.removeProperty('--accent-color');
        const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
        if (inlineStyle) document.documentElement.style.setProperty('--accent-color', inlineStyle);
        return defaultColor;
    }
    
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // --- UI & UTILITIES ---
    function initLazyLoad() {
        const lazyVideos = document.querySelectorAll('.video-embed-placeholder[data-src]');
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target;
                    const iframe = document.createElement('iframe');
                    iframe.src = placeholder.dataset.src;
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allowfullscreen', '');
                    iframe.setAttribute('loading', 'lazy'); 
                    placeholder.appendChild(iframe);
                    observer.unobserve(placeholder);
                }
            });
        }, { rootMargin: '200px' });
        
        lazyVideos.forEach(video => observer.observe(video));
    }

    function initTabs() {
        if (!tabContainer) return;
        tabContainer.addEventListener('click', (e) => {
            if (e.target.matches('.tab-button')) {
                const targetTab = e.target.dataset.tab;
                tabContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTab) content.classList.add('active');
                });
            }
        });
    }

    function initViewToggle() {
        if (!viewToggleContainer) return;
        viewToggleContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.view-button');
            if (button) {
                const view = button.dataset.view;
                viewToggleContainer.querySelectorAll('.view-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                gallery.classList.remove('view-compact', 'view-large');
                if (view === 'compact' || view === 'large') {
                    gallery.classList.add(`view-${view}`);
                }
            }
        });
    }

    function initBackToTop() {
        if (!backToTopButton) return;
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('show', window.scrollY > 300);
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- START THE APP ---
    main();
});
