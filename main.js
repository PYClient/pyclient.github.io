document.addEventListener('DOMContentLoaded', () => {
    // --- DATA SOURCE ---
    const videos = [
        { id: 'z5hnfe', title: 'Watch unnamed | Streamable', duration: 143, date: '2023-08-11T05:21:14Z' },
        { id: 'o9m6lq', title: 'Watch Destiny 2 2025.01.26 - 14.45.58.28.DVR | Streamable', duration: 28, date: '2024-01-26T19:45:58Z' },
        { id: '86gj80', title: 'Watch elh | Streamable', duration: 5, date: '2022-09-15T14:33:01Z' },
        { id: 'x3t77s', title: 'Watch das | Streamable', duration: 88, date: '2023-02-28T22:05:49Z' },
        { id: '8bjvfu', title: 'Watch Cowboy Bebop Season 1 Episode 2 | Streamable', duration: 1440, date: '2022-04-19T10:00:00Z' },
        { id: '4muuxd', title: 'Watch video_2022-02-26_15-10-28 | Streamable', duration: 45, date: '2022-02-26T15:10:28Z' },
        { id: '233adn', title: 'Watch UI-97 Sharjah Light Festival Call Girls...', duration: 30, date: '2023-11-01T18:00:00Z' },
        { id: '5cv4xg', title: 'Watch 5cv4xg | Streamable', duration: 12, date: '2022-07-22T08:19:54Z' },
        { id: '1cbwv2', title: 'Watch 2025-09-27 14-02-21 | Streamable', duration: 21, date: '2023-09-27T14:02:21Z' },
        { id: 'lq3dp1', title: 'Watch vlc-record-2025-08-16-02h06m01s...', duration: 185, date: '2023-08-16T02:06:01Z' },
        { id: 'njvv68', title: 'Watch Lil TJAY - Forever (Official Music Video)...', duration: 195, date: '2023-05-10T12:00:00Z' },
        { id: 'za7zfh', title: 'Watch 103333950 CCA-3160250 kool-carz | Streamable', duration: 44, date: '2024-01-01T10:00:00Z' },
        { id: 'di9r4t', title: 'Watch sskfu67_scale_2x_prob-3 | Streamable', duration: 7, date: '2022-12-05T16:48:23Z' },
        { id: 'nukupo', title: 'Watch 1234 | Streamable', duration: 4, date: '2024-01-02T11:00:00Z' },
        { id: 'oomw7e', title: 'Watch Nice one. | Streamable', duration: 15, date: '2023-06-18T20:15:11Z' },
        { id: 'owwvpf', title: 'Watch 2025-05-15 04-38-53 | Streamable', duration: 10, date: '2024-01-03T12:00:00Z' },
        { id: '0ctjos', title: 'Watch 2025-08-17 19-17-22 | Streamable', duration: 15, date: '2024-01-04T13:00:00Z' },
        { id: 'cgxl9r', title: 'Watch [AND 1 - MG 3] Joshua Giuliani with another...', duration: 32, date: '2022-03-26T18:00:00Z' },
        { id: '8rc4zd', title: 'Watch [클립]따린 - 서른 즈음에 (김광석) | Streamable', duration: 245, date: '2023-08-15T20:30:00Z' },
        { id: '88nvfx', title: 'Watch Adv. Thando Gumede ZA (Highlights) | Streamable', duration: 185, date: '2023-05-20T10:00:00Z' },
        { id: 'uju5qz', title: 'Watch Basketball | Streamable', duration: 58, date: '2024-02-01T15:00:00Z' },
        { id: 'e3vdt0', title: 'Watch Fog 1 | Streamable', duration: 290, date: '2022-10-30T11:55:33Z' },
        { id: 'ks9rix', title: 'Watch Boothy cheated on his girlfriend | Streamable', duration: 12, date: '2024-02-02T16:00:00Z' },
        { id: '8hzsh0', title: 'Watch Bubbling Bowl game | Streamable', duration: 25, date: '2024-02-03T17:00:00Z' },
        { id: 'gnxefb', title: 'Watch sad | Streamable', duration: 9, date: '2023-04-01T00:12:47Z' },
        { id: '1b4ruo', title: 'Watch call com shark macedo | Streamable', duration: 63, date: '2024-02-04T18:00:00Z' },
        { id: '0op1wy', title: 'Watch CEN-24-161 Social Media Posts...', duration: 15, date: '2023-12-01T09:00:00Z' },
        { id: '3vhtvn', title: 'Watch Comp 1_92 | Streamable', duration: 92, date: '2024-02-06T20:00:00Z' },
        { id: 'f8y4o0', title: 'Watch Deliler Vid 1-2 | Streamable', duration: 150, date: '2024-02-07T21:00:00Z' },
        { id: '2vv1yn', title: 'Watch divebombing maben | Streamable', duration: 7, date: '2024-02-08T22:00:00Z' },
        { id: '4isbea', title: 'Watch Euro Truck Simulator 2 2025.07.02...', duration: 45, date: '2024-02-09T23:00:00Z' },
        { id: 'fago5c', title: 'Watch Fate:stay Night Unlimited Bladeworks - Episode 2', duration: 1440, date: '2022-10-12T05:00:00Z' },
        { id: 'zc77w1', title: 'Watch Fiksavimas | Streamable', duration: 18, date: '2024-02-11T01:00:00Z' },
        { id: 'zoo6js', title: 'Watch Film 004 | Streamable', duration: 180, date: '2024-02-12T02:00:00Z' },
        { id: '5qz8a4', title: 'Watch gostovanjetvprva | Streamable', duration: 300, date: '2024-02-13T03:00:00Z' },
        { id: 'sgqje0', title: 'Watch gp 123 | Streamable', duration: 3, date: '2024-02-14T04:00:00Z' },
        { id: 'u8t1ri', title: 'Watch I\'M IN THE CLUB | Streamable', duration: 5, date: '2024-02-15T05:00:00Z' },
        { id: 'b2g7bx', title: 'Watch Innovación Digital - PCreativas | Streamable', duration: 60, date: '2024-02-16T06:00:00Z' },
        { id: 'zgnk4x', title: 'Watch INV clan in enemys list | Streamable', duration: 22, date: '2024-02-17T07:00:00Z' },
        { id: 's393xj', title: 'Watch lanna | Streamable', duration: 13, date: '2024-02-18T08:00:00Z' },
        { id: 'gm7tru', title: 'Watch Le pourquoi ! | Streamable', duration: 8, date: '2024-02-19T09:00:00Z' },
        { id: 'cjvo9r', title: 'Watch LeiaKidnap | Streamable', duration: 48, date: '2024-02-20T10:00:00Z' },
        { id: '329z3v', title: 'Watch Micah Peavy P&R reject dunk | Streamable', duration: 11, date: '2023-03-15T21:00:00Z' },
        { id: 'mvelg8', title: 'Watch michael | Streamable', duration: 2, date: '2024-02-22T12:00:00Z' },
        { id: '01t66e', title: 'Watch MICRO IS GARBAGE | Streamable', duration: 1, date: '2024-02-23T13:00:00Z' },
        { id: 'gx4zz8', title: 'Watch niggas gay - KB | Streamable', duration: 2, date: '2024-02-24T14:00:00Z' },
        { id: '5cwxek', title: 'Watch OCULUS R6 | Streamable', duration: 31, date: '2024-02-25T15:00:00Z' },
        { id: 'gvsikl', title: 'Watch One fateful night | Streamable', duration: 94, date: '2024-02-26T16:00:00Z' },
        { id: '1g9v8t', title: 'Watch op phi so nit hep | Streamable', duration: 17, date: '2024-02-27T17:00:00Z' },
        { id: 'pednlg', title: 'Watch pednlg | Streamable', duration: 6, date: '2024-02-28T18:00:00Z' },
        { id: 'zn9pod', title: 'Watch pistol pog | Streamable', duration: 9, date: '2024-03-01T19:00:00Z' },
        { id: 'fq5ytc', title: 'Watch Project Startup | Streamable', duration: 120, date: '2024-03-02T20:00:00Z' },
        { id: '4kt7sm', title: 'Watch Replay 2025-07-15 11-43-03 | Streamable', duration: 30, date: '2024-03-03T21:00:00Z' },
        { id: 'dgveb8', title: 'Watch Replay_2025-10-01_05-05-37 | Streamable', duration: 25, date: '2024-03-04T22:00:00Z' },
        { id: 'ridiwi', title: 'Watch ridiwi | Streamable', duration: 5, date: '2024-03-05T23:00:00Z' },
        { id: 'pty4b9', title: 'Watch Roblox 2025-08-08 19-19-02 | Streamable', duration: 15, date: '2024-03-06T00:00:00Z' },
        { id: 'ap76v0', title: 'Watch rollson the FUCKING nigger | Streamable', duration: 2, date: '2024-03-07T01:00:00Z' },
        { id: 'ow5sje', title: 'Watch Screen Recording 2025-09-14 185635 | Streamable', duration: 20, date: '2024-03-08T02:00:00Z' },
        { id: 'ofva66', title: 'Watch Sharp Left | Streamable', duration: 10, date: '2024-03-09T03:00:00Z' },
        { id: 'sujdl2', title: 'Watch sujdl2 | Streamable', duration: 7, date: '2024-03-10T04:00:00Z' },
        { id: '01rxsg', title: 'Watch Thank you, Blizzard QA Testers | Streamable', duration: 14, date: '2022-07-28T15:00:00Z' },
        { id: 'f62a6x', title: 'Watch unnamed | Streamable', duration: 3, date: '2024-03-12T06:00:00Z' },
        { id: 'jnank7', title: 'Watch unnamed | Streamable', duration: 4, date: '2024-03-13T07:00:00Z' },
        { id: 'lkqofz', title: 'Watch unnamed | Streamable', duration: 5, date: '2024-03-14T08:00:00Z' },
        { id: 'g71oyh', title: 'Watch video_2022-04-28_09-53-01 | Streamable', duration: 28, date: '2022-04-28T10:00:00Z' },
        { id: '3tq56g', title: 'Watch vinny | Streamable', duration: 9, date: '2024-03-16T10:00:00Z' },
        { id: 'qxjrf1', title: 'Watch We are invested now! WCOOP Side Event: $320 PKO...', duration: 29, date: '2023-09-25T22:00:00Z' },
        { id: 'wnfe9t', title: 'Watch Who\'s sandbagging now? | Streamable', duration: 19, date: '2024-03-18T12:00:00Z' },
        { id: 'zjzsoc', title: 'Watch X-5 Festival City Call Girls...', duration: 30, date: '2024-03-19T13:00:00Z' },
        { id: 'noz480', title: 'Watch yt1s.com - Onboard Carlos SAINZ...', duration: 95, date: '2022-07-01T16:00:00Z' },
        { id: 'tapgah', title: 'Watch Zenless Zone Zero | Streamable', duration: 65, date: '2023-11-24T14:00:00Z' },
        { id: 'fihsdb', title: 'Watch курьер | Streamable', duration: 118, date: '2024-03-22T16:00:00Z' }
    ];
    
    const originalVideos = [...videos]; // A permanent copy for the "default" sort order

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
    const colorPickerContainer = document.getElementById('color-picker-container');
    const colorResetButton = document.getElementById('reset-color-btn');

    // --- STATE MANAGEMENT ---
    let currentSort = 'default';
    let currentSearchTerm = '';

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

        updateGalleryView(); // Initial render
    }

    // --- CORE DISPLAY LOGIC ---
    function updateGalleryView() {
        let videosToDisplay = [...originalVideos];

        switch (currentSort) {
            case 'title-asc':
                videosToDisplay.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                videosToDisplay.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'date-desc':
                videosToDisplay.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'date-asc':
                videosToDisplay.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'duration-asc':
                videosToDisplay.sort((a, b) => a.duration - b.duration);
                break;
            case 'duration-desc':
                videosToDisplay.sort((a, b) => b.duration - a.duration);
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
        gallery.innerHTML = '';
        if (videoArray.length === 0) {
            resultsIndicator.textContent = `No videos found matching your criteria.`;
            return;
        }
        const fragment = document.createDocumentFragment();
        videoArray.forEach((video, index) => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.style.animationDelay = `${index * 0.02}s`;
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
    
    function updateResultsIndicator(filteredCount, totalCount) {
        if (currentSearchTerm) {
            resultsIndicator.textContent = `Showing ${filteredCount} of ${totalCount} videos.`;
        } else {
            resultsIndicator.textContent = `Showing all ${totalCount} videos.`;
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
        colorPicker.value = savedColor || getDefaultAccentColor();
        updateResetButtonVisibility();
        
        colorPicker.addEventListener('input', (e) => {
            const newColor = e.target.value;
            document.documentElement.style.setProperty('--accent-color', newColor);
            document.documentElement.style.setProperty('--accent-color-translucent', hexToRgba(newColor, 0.2));
            sessionStorage.setItem('themeColor', newColor);
            updateResetButtonVisibility();
        });
    }

    function resetThemeColor() {
        sessionStorage.removeItem('themeColor');
        document.documentElement.style.removeProperty('--accent-color');
        document.documentElement.style.removeProperty('--accent-color-translucent');
        colorPicker.value = getDefaultAccentColor();
        updateResetButtonVisibility();
    }

    function updateResetButtonVisibility() {
        const isCustomColor = !!sessionStorage.getItem('themeColor');
        colorPickerContainer.classList.toggle('show-reset', isCustomColor);
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
                    placeholder.appendChild(iframe);
                    observer.unobserve(placeholder);
                }
            });
        }, { rootMargin: '100px' });
        lazyVideos.forEach(video => observer.observe(video));
    }

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
