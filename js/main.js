document.addEventListener('DOMContentLoaded', () => {
    // --- DATA SOURCE ---
    const videos = [
        { id: 'za7zfh', title: 'Watch 103333950 CCA-3160250 kool-carz | Streamable' },
        { id: 'nukupo', title: 'Watch 1234 | Streamable' },
        { id: 'owwvpf', title: 'Watch 2025-05-15 04-38-53 | Streamable' },
        { id: '0ctjos', title: 'Watch 2025-08-17 19-17-22 | Streamable' },
        { id: 'cgxl9r', title: 'Watch [AND 1 - MG 3] Joshua Giuliani with another, and he\'ll let you know how many he has [16:43 1st] | MN Boys AA State Tourney Final 2022 | Streamable' },
        { id: '8rc4zd', title: 'Watch [클립]따린 - 서른 즈음에 (김광석) | Streamable' },
        { id: '88nvfx', title: 'Watch Adv. Thando Gumede ZA (Highlights) | Streamable' },
        { id: 'uju5qz', title: 'Watch Basketball | Streamable' },
        { id: 'ks9rix', title: 'Watch Boothy cheated on his girlfriend | Streamable' },
        { id: '8hzsh0', title: 'Watch Bubbling Bowl game | Streamable' },
        { id: '1b4ruo', title: 'Watch call com shark macedo | Streamable' },
        { id: '0op1wy', title: 'Watch CEN-24-161 Social Media Posts - December - Head Start on New Year’s Resolutions-6 | Streamable' },
        { id: '3vhtvn', title: 'Watch Comp 1_92 | Streamable' },
        { id: 'f8y4o0', title: 'Watch Deliler Vid 1-2 | Streamable' },
        { id: '2vv1yn', title: 'Watch divebombing maben | Streamable' },
        { id: '4isbea', title: 'Watch Euro Truck Simulator 2 2025.07.02 - 02.20.40.28.DVR | Streamable' },
        { id: 'fago5c', title: 'Watch Fate:stay Night Unlimited Bladeworks - Episode 2 | Streamable' },
        { id: 'zc77w1', title: 'Watch Fiksavimas | Streamable' },
        { id: 'zoo6js', title: 'Watch Film 004 | Streamable' },
        { id: '5qz8a4', title: 'Watch gostovanjetvprva | Streamable' },
        { id: 'sgqje0', title: 'Watch gp 123 | Streamable' },
        { id: 'u8t1ri', title: 'Watch I\'M IN THE CLUB | Streamable' },
        { id: 'b2g7bx', title: 'Watch Innovación Digital - PCreativas | Streamable' },
        { id: 'zgnk4x', title: 'Watch INV clan in enemys list | Streamable' },
        { id: 's393xj', title: 'Watch lanna | Streamable' },
        { id: 'gm7tru', title: 'Watch Le pourquoi ! | Streamable' },
        { id: 'cjvo9r', title: 'Watch LeiaKidnap | Streamable' },
        { id: '329z3v', title: 'Watch Micah Peavy P&R reject dunk | Streamable' },
        { id: 'mvelg8', title: 'Watch michael | Streamable' },
        { id: '01t66e', title: 'Watch MICRO IS GARBAGE | Streamable' },
        { id: 'gx4zz8', title: 'Watch niggas gay - KB | Streamable' },
        { id: '5cwxek', title: 'Watch OCULUS R6 | Streamable' },
        { id: 'gvsikl', title: 'Watch One fateful night | Streamable' },
        { id: '1g9v8t', title: 'Watch op phi so nit hep | Streamable' },
        { id: 'pednlg', title: 'Watch pednlg | Streamable' },
        { id: 'c1zfhp', title: 'Watch Pirates vs. Rockies Highlights | Streamable' },
        { id: 'zn9pod', title: 'Watch pistol pog | Streamable' },
        { id: 'fq5ytc', title: 'Watch Project Startup | Streamable' },
        { id: '4kt7sm', title: 'Watch Replay 2025-07-15 11-43-03 | Streamable' },
        { id: 'dgveb8', title: 'Watch Replay_2025-10-01_05-05-37 | Streamable' },
        { id: 'ridiwi', title: 'Watch ridiwi | Streamable' },
        { id: 'pty4b9', title: 'Watch Roblox 2025-08-08 19-19-02 | Streamable' },
        { id: 'ap76v0', title: 'Watch rollson the FUCKING nigger | Streamable' },
        { id: 'ow5sje', title: 'Watch Screen Recording 2025-09-14 185635 | Streamable' },
        { id: 'ofva66', title: 'Watch Sharp Left | Streamable' },
        { id: 'sujdl2', title: 'Watch sujdl2 | Streamable' },
        { id: '01rxsg', title: 'Watch Thank you, Blizzard QA Testers | Streamable' },
        { id: 'f62a6x', title: 'Watch unnamed | Streamable' },
        { id: 'jnank7', title: 'Watch unnamed | Streamable' },
        { id: 'lkqofz', title: 'Watch unnamed | Streamable' },
        { id: 'g71oyh', title: 'Watch video_2022-04-28_09-53-01 | Streamable' },
        { id: '3tq56g', title: 'Watch vinny | Streamable' },
        { id: 'qxjrf1', title: 'Watch We are invested now! WCOOP Side Event: $320 PKO | Streamable' },
        { id: 'wnfe9t', title: 'Watch Who\'s sandbagging now? | Streamable' },
        { id: 'zjzsoc', title: 'Watch X-5 Festival City Call Girls 0525373611 Full-Night Call Girls in Festival City | Streamable' },
        { id: 'noz480', title: 'Watch yt1s.com - Onboard Carlos SAINZ with P1 in FP2 Silverstone Formula 1 Resume Lap_1080p | Streamable' },
        { id: 'tapgah', title: 'Watch Zenless Zone Zero | Streamable' },
        { id: 'fihsdb', title: 'Watch курьер | Streamable' }
    ];

    // --- ELEMENT SELECTORS ---
    const gallery = document.getElementById('video-gallery');
    const searchInput = document.getElementById('search-input');
    const noResults = document.getElementById('no-results');
    const themeToggle = document.getElementById('theme-toggle');
    const tabContainer = document.querySelector('.tabs');
    const viewToggleContainer = document.getElementById('view-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const videoCountElement = document.getElementById('video-count');
    const colorPicker = document.getElementById('color-picker');
    const colorResetButton = document.getElementById('reset-color-btn');

    // --- 1. INITIAL PAGE SETUP ---
    function initPage() {
        if (videoCountElement) videoCountElement.textContent = `${videos.length} Videos`;
        initTabs();
        populateGallery();
        initViewToggle();
        initBackToTop();
        initColorPicker();
        if (searchInput) searchInput.addEventListener('input', handleSearch);
        if (themeToggle) themeToggle.addEventListener('click', handleThemeToggle);
        if (colorResetButton) colorResetButton.addEventListener('click', resetThemeColor);
    }

    // --- 2. THEME & COLOR CUSTOMIZATION ---
    function handleThemeToggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        // Update color picker to reflect new theme's default if no custom color is set
        if (!localStorage.getItem('themeColor')) {
            colorPicker.value = getDefaultAccentColor();
        }
    }

    function initColorPicker() {
        const savedColor = localStorage.getItem('themeColor');
        colorPicker.value = savedColor || getDefaultAccentColor();
        colorPicker.addEventListener('input', (e) => {
            const newColor = e.target.value;
            document.documentElement.style.setProperty('--accent-color', newColor);
            localStorage.setItem('themeColor', newColor);
        });
    }

    function resetThemeColor() {
        localStorage.removeItem('themeColor');
        document.documentElement.style.removeProperty('--accent-color');
        colorPicker.value = getDefaultAccentColor();
    }

    function getDefaultAccentColor() {
        // Temporarily remove the inline style to read the default from the stylesheet
        const inlineStyle = document.documentElement.style.getPropertyValue('--accent-color');
        document.documentElement.style.removeProperty('--accent-color');
        const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
        // Re-apply the inline style if it existed
        if (inlineStyle) document.documentElement.style.setProperty('--accent-color', inlineStyle);
        return defaultColor;
    }

    // --- 3. TAB FUNCTIONALITY ---
    function initTabs() {
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

    // --- 4. GALLERY & VIDEO HANDLING ---
    function populateGallery() {
        if (!gallery) return;
        const fragment = document.createDocumentFragment();
        videos.forEach((video, index) => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.setAttribute('data-title', video.title.toLowerCase());
            card.style.animationDelay = `${index * 0.03}s`;
            card.innerHTML = `
                <div class="video-embed-placeholder" data-src="https://streamable.com/e/${video.id}"></div>
                <div class="video-label">
                    <a href="https://streamable.com/${video.id}" target="_blank" rel="noopener noreferrer" title="${video.title}">${video.title}</a>
                </div>`;
            fragment.appendChild(card);
        });
        gallery.appendChild(fragment);
        initLazyLoad();
    }

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
                    placeholder.appendChild(iframe);
                    observer.unobserve(placeholder);
                }
            });
        }, { rootMargin: '100px' });
        lazyVideos.forEach(video => observer.observe(video));
    }

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const videoCards = gallery.querySelectorAll('.video-card');
        let visibleCount = 0;
        videoCards.forEach(card => {
            const title = card.dataset.title;
            if (title.includes(searchTerm)) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // --- 5. UI CONTROLS ---
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
    initPage();
});
