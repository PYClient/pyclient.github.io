const STORAGE_KEY = 'pyclient.chat.state.v1';
const OWNER_CONFIG = {
    username: 'pyclient',
    accessCode: 'owner-setup',
    displayName: 'PYClient',
    avatar: '👑'
};

const AVATAR_OPTIONS = ['👑', '🧑‍💻', '🎧', '🧠', '🐱', '🐶', '🦊', '🐼', '🦁', '🦄', '🐙', '🪐', '🌈', '🔥', '⚡️', '🎮', '🎨', '📚', '🌊', '🌙'];
const EMOJI_OPTIONS = ['👍', '❤️', '😂', '🔥', '🎉', '🤝', '✨', '👀', '😅', '🙌', '✅', '🚀', '💡', '🫶', '😎', '🥳', '😴', '🤖', '📌', '⚡️'];
const COLOR_POOL = ['#5b8cff', '#22c55e', '#f97316', '#ec4899', '#14b8a6', '#a855f7', '#f59e0b', '#38bdf8'];

const BOT_USERS = [
    {
        id: 'bot-echo',
        username: 'echobot',
        displayName: 'Echo Bot',
        avatar: '🤖',
        role: 'bot',
        status: 'online',
        color: '#38bdf8'
    },
    {
        id: 'bot-guide',
        username: 'guidebot',
        displayName: 'Guide Bot',
        avatar: '🧭',
        role: 'bot',
        status: 'online',
        color: '#a78bfa'
    }
];

const elements = {
    app: document.getElementById('app'),
    channelList: document.getElementById('channel-list'),
    dmList: document.getElementById('dm-list'),
    messageList: document.getElementById('message-list'),
    messageInput: document.getElementById('message-input'),
    composerForm: document.getElementById('composer-form'),
    typingIndicator: document.getElementById('typing-indicator'),
    composerFooter: document.getElementById('composer-footer'),
    channelName: document.getElementById('active-channel-name'),
    channelDescription: document.getElementById('active-channel-description'),
    memberList: document.getElementById('member-list'),
    memberCount: document.getElementById('member-count'),
    pinnedList: document.getElementById('pinned-list'),
    pinnedCount: document.getElementById('pinned-count'),
    activityList: document.getElementById('activity-list'),
    currentUserName: document.getElementById('current-user-name'),
    currentUserStatus: document.getElementById('current-user-status'),
    currentUserAvatar: document.getElementById('current-user-avatar'),
    loginModal: document.getElementById('login-modal'),
    loginForm: document.getElementById('login-form'),
    loginUsername: document.getElementById('login-username'),
    loginDisplayName: document.getElementById('login-display-name'),
    loginPasscode: document.getElementById('login-passcode'),
    loginOwnerCode: document.getElementById('login-owner-code'),
    loginStatus: document.getElementById('login-status'),
    loginAvatarGrid: document.getElementById('login-avatar-grid'),
    loginHelper: document.getElementById('login-helper'),
    settingsModal: document.getElementById('settings-modal'),
    closeSettings: document.getElementById('close-settings'),
    cancelSettings: document.getElementById('cancel-settings'),
    saveSettings: document.getElementById('save-settings'),
    themeSelect: document.getElementById('theme-select'),
    accentPicker: document.getElementById('accent-picker'),
    densitySelect: document.getElementById('density-select'),
    profileDisplayName: document.getElementById('profile-display-name'),
    profileStatus: document.getElementById('profile-status'),
    profileAvatarGrid: document.getElementById('profile-avatar-grid'),
    moderationModal: document.getElementById('moderation-modal'),
    closeModeration: document.getElementById('close-moderation'),
    moderationToggle: document.getElementById('moderation-toggle'),
    reportList: document.getElementById('report-list'),
    moderationUserList: document.getElementById('moderation-user-list'),
    blockedTermInput: document.getElementById('blocked-term-input'),
    addBlockedTerm: document.getElementById('add-blocked-term'),
    blockedTermsList: document.getElementById('blocked-terms-list'),
    slowModeRange: document.getElementById('slow-mode-range'),
    slowModeValue: document.getElementById('slow-mode-value'),
    clearChannelButton: document.getElementById('clear-channel'),
    channelModal: document.getElementById('channel-modal'),
    closeChannelModal: document.getElementById('close-channel-modal'),
    cancelChannel: document.getElementById('cancel-channel'),
    channelForm: document.getElementById('channel-form'),
    channelNameInput: document.getElementById('channel-name'),
    channelDescriptionInput: document.getElementById('channel-description'),
    channelOwnerOnly: document.getElementById('channel-owner-only'),
    newChannelButton: document.getElementById('new-channel-button'),
    logoutButton: document.getElementById('logout-button'),
    settingsToggle: document.getElementById('settings-toggle'),
    searchToggle: document.getElementById('search-toggle'),
    chatSearch: document.getElementById('chat-search'),
    messageSearchInput: document.getElementById('message-search-input'),
    clearSearch: document.getElementById('clear-search'),
    pinnedToggle: document.getElementById('pinned-toggle'),
    emojiToggle: document.getElementById('emoji-toggle'),
    emojiPicker: document.getElementById('emoji-picker'),
    attachmentToggle: document.getElementById('attachment-toggle'),
    toastContainer: document.getElementById('toast-container')
};

let state = loadState();
let uiState = {
    activeChannelId: state.currentChannelId || 'general',
    searchQuery: ''
};

let loginAvatarChoice = AVATAR_OPTIONS[0];
let profileAvatarChoice = AVATAR_OPTIONS[0];
let saveTimer = null;
const typingUsers = new Map();

init();

function init() {
    ensureMessages();
    applyTheme();
    initAvatarGrids();
    initEmojiPicker();
    bindEvents();
    refreshApp();
    if (!state.session.currentUserId || isBanned(state.session.currentUserId)) {
        openModal(elements.loginModal);
    } else {
        closeModal(elements.loginModal);
    }
}

function createDefaultState() {
    const now = new Date().toISOString();
    const users = { byId: {}, allIds: [] };
    BOT_USERS.forEach((user) => addUserToCollection(users, user));

    const channels = {
        byId: {
            general: {
                id: 'general',
                name: 'General',
                description: 'Everyday updates, quick check-ins, and team chat.',
                type: 'channel',
                ownerOnly: false
            },
            announcements: {
                id: 'announcements',
                name: 'Announcements',
                description: 'Owner-only updates for the community.',
                type: 'channel',
                ownerOnly: true
            },
            support: {
                id: 'support',
                name: 'Support',
                description: 'Questions, feedback, and troubleshooting.',
                type: 'channel',
                ownerOnly: false
            }
        },
        allIds: ['general', 'announcements', 'support']
    };

    const messages = {
        general: [
            {
                id: createId('msg'),
                authorId: 'bot-guide',
                content: 'Welcome to PyClient Chat! Your messages auto-save locally and you can customize everything in Settings.',
                createdAt: now,
                reactions: { '🎉': ['bot-guide'] },
                pinned: true,
                system: false
            }
        ],
        announcements: [
            {
                id: createId('msg'),
                authorId: 'bot-guide',
                content: 'Announcements are read-only unless you sign in as the owner.',
                createdAt: now,
                reactions: {},
                pinned: false,
                system: true
            }
        ],
        support: [
            {
                id: createId('msg'),
                authorId: 'bot-echo',
                content: 'Need help? Ask away and I will echo your question for now.',
                createdAt: now,
                reactions: {},
                pinned: false,
                system: false
            }
        ]
    };

    return {
        settings: {
            theme: 'dark',
            accent: '#5b8cff',
            density: 'comfortable'
        },
        users,
        accounts: {},
        channels,
        messages,
        moderation: {
            mutedUserIds: [],
            bannedUserIds: [],
            reports: [],
            blockedTerms: ['spam', 'scam'],
            slowModeSeconds: 0
        },
        activity: [
            {
                id: createId('activity'),
                text: 'Workspace initialized.',
                createdAt: now
            }
        ],
        drafts: {},
        lastMessageAt: {},
        session: {
            currentUserId: null
        },
        currentChannelId: 'general'
    };
}

function loadState() {
    const defaults = createDefaultState();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaults;
    try {
        const parsed = JSON.parse(stored);
        return hydrateState(defaults, parsed);
    } catch (error) {
        console.error('Failed to load saved state.', error);
        return defaults;
    }
}

function hydrateState(defaults, stored) {
    const state = { ...defaults, ...stored };
    state.settings = { ...defaults.settings, ...(stored.settings || {}) };
    state.moderation = { ...defaults.moderation, ...(stored.moderation || {}) };
    state.accounts = stored.accounts || {};
    state.users = mergeCollections(defaults.users, stored.users);
    state.channels = mergeCollections(defaults.channels, stored.channels);
    state.messages = { ...defaults.messages, ...(stored.messages || {}) };
    state.activity = stored.activity || defaults.activity;
    state.drafts = stored.drafts || {};
    state.lastMessageAt = stored.lastMessageAt || {};
    state.session = { ...defaults.session, ...(stored.session || {}) };
    state.currentChannelId = stored.currentChannelId || defaults.currentChannelId;
    return state;
}

function mergeCollections(defaultCollection, storedCollection = {}) {
    const byId = { ...defaultCollection.byId, ...(storedCollection.byId || {}) };
    const allIds = Array.from(new Set([...(storedCollection.allIds || []), ...Object.keys(byId)]));
    return { byId, allIds };
}

function addUserToCollection(collection, user) {
    collection.byId[user.id] = user;
    if (!collection.allIds.includes(user.id)) {
        collection.allIds.push(user.id);
    }
}

function ensureMessages() {
    state.channels.allIds.forEach((channelId) => {
        if (!state.messages[channelId]) {
            state.messages[channelId] = [];
        }
    });
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.settings.theme);
    document.documentElement.style.setProperty('--accent', state.settings.accent);
    document.body.dataset.density = state.settings.density;
}

function bindEvents() {
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.logoutButton.addEventListener('click', handleLogout);
    elements.channelList.addEventListener('click', handleChannelSelect);
    elements.dmList.addEventListener('click', handleChannelSelect);
    elements.composerForm.addEventListener('submit', handleSendMessage);
    elements.messageInput.addEventListener('input', handleTypingInput);
    elements.messageInput.addEventListener('keydown', handleComposerKeydown);
    elements.messageList.addEventListener('click', handleMessageAction);
    elements.settingsToggle.addEventListener('click', openSettings);
    elements.closeSettings.addEventListener('click', () => closeModal(elements.settingsModal));
    elements.cancelSettings.addEventListener('click', () => closeModal(elements.settingsModal));
    elements.saveSettings.addEventListener('click', saveSettings);
    elements.searchToggle.addEventListener('click', toggleSearch);
    elements.messageSearchInput.addEventListener('input', handleSearch);
    elements.clearSearch.addEventListener('click', clearSearch);
    elements.pinnedToggle.addEventListener('click', toggleDetailPanel);
    elements.emojiToggle.addEventListener('click', toggleEmojiPicker);
    elements.emojiPicker.addEventListener('click', handleEmojiClick);
    elements.attachmentToggle.addEventListener('click', () => showToast('File attachments are coming soon.'));
    elements.moderationToggle.addEventListener('click', openModeration);
    elements.closeModeration.addEventListener('click', () => closeModal(elements.moderationModal));
    elements.reportList.addEventListener('click', handleReportAction);
    elements.moderationUserList.addEventListener('click', handleModerationUserAction);
    elements.addBlockedTerm.addEventListener('click', addBlockedTerm);
    elements.slowModeRange.addEventListener('input', handleSlowModeChange);
    elements.clearChannelButton.addEventListener('click', clearChannelHistory);
    elements.newChannelButton.addEventListener('click', openChannelModal);
    elements.closeChannelModal.addEventListener('click', () => closeModal(elements.channelModal));
    elements.cancelChannel.addEventListener('click', () => closeModal(elements.channelModal));
    elements.channelForm.addEventListener('submit', handleCreateChannel);
    document.addEventListener('click', handleGlobalClick);
}

function initAvatarGrids() {
    renderAvatarGrid(elements.loginAvatarGrid, loginAvatarChoice);
    renderAvatarGrid(elements.profileAvatarGrid, profileAvatarChoice);
    elements.loginAvatarGrid.addEventListener('click', (event) => handleAvatarSelect(event, 'login'));
    elements.profileAvatarGrid.addEventListener('click', (event) => handleAvatarSelect(event, 'profile'));
}

function initEmojiPicker() {
    elements.emojiPicker.innerHTML = '';
    EMOJI_OPTIONS.forEach((emoji) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'emoji-option';
        button.dataset.emoji = emoji;
        button.textContent = emoji;
        elements.emojiPicker.appendChild(button);
    });
}

function renderAvatarGrid(container, selectedAvatar) {
    container.innerHTML = '';
    AVATAR_OPTIONS.forEach((avatar) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `avatar-option${avatar === selectedAvatar ? ' selected' : ''}`;
        button.dataset.avatar = avatar;
        button.textContent = avatar;
        container.appendChild(button);
    });
}

function handleAvatarSelect(event, context) {
    const button = event.target.closest('[data-avatar]');
    if (!button) return;
    const avatar = button.dataset.avatar;
    if (context === 'login') {
        loginAvatarChoice = avatar;
        renderAvatarGrid(elements.loginAvatarGrid, loginAvatarChoice);
        return;
    }
    profileAvatarChoice = avatar;
    renderAvatarGrid(elements.profileAvatarGrid, profileAvatarChoice);
}

async function handleLogin(event) {
    event.preventDefault();
    elements.loginHelper.textContent = '';
    const username = elements.loginUsername.value.trim();
    if (!username) return;
    const usernameKey = username.toLowerCase();
    const displayName = elements.loginDisplayName.value.trim() || username;
    const passcode = elements.loginPasscode.value.trim();
    const ownerCode = elements.loginOwnerCode.value.trim();
    const status = elements.loginStatus.value;

    const account = state.accounts[usernameKey];
    if (account) {
        if (state.moderation.bannedUserIds.includes(account.userId)) {
            elements.loginHelper.textContent = 'This account has been banned.';
            return;
        }
        if (account.passcodeHash) {
            if (!passcode) {
                elements.loginHelper.textContent = 'Passcode required for this account.';
                return;
            }
            const hash = await hashPasscode(passcode);
            if (hash !== account.passcodeHash) {
                elements.loginHelper.textContent = 'Incorrect passcode.';
                return;
            }
        } else if (passcode) {
            account.passcodeHash = await hashPasscode(passcode);
        }

        const user = state.users.byId[account.userId];
        user.status = status;
        if (displayName) {
            user.displayName = displayName;
        }
        user.role = getRoleForLogin(usernameKey, ownerCode, user.role);
        loginAvatarChoice = user.avatar || loginAvatarChoice;
        setCurrentUser(user.id);
        addActivity(`${user.displayName} signed in.`, 'login');
        ensureBotDmChannels(user.id);
    } else {
        const user = createUser({
            username,
            displayName,
            avatar: loginAvatarChoice,
            status,
            role: getRoleForLogin(usernameKey, ownerCode)
        });
        state.users.byId[user.id] = user;
        state.users.allIds.push(user.id);
        state.accounts[usernameKey] = {
            userId: user.id,
            passcodeHash: passcode ? await hashPasscode(passcode) : null
        };
        setCurrentUser(user.id);
        addActivity(`${user.displayName} joined the workspace.`, 'join');
        ensureBotDmChannels(user.id);
    }

    closeModal(elements.loginModal);
    elements.loginForm.reset();
    saveState();
    refreshApp();
}

function getRoleForLogin(usernameKey, ownerCode, fallbackRole = 'member') {
    if (usernameKey === OWNER_CONFIG.username && ownerCode === OWNER_CONFIG.accessCode) {
        return 'owner';
    }
    return fallbackRole === 'owner' ? 'member' : fallbackRole;
}

function handleLogout() {
    state.session.currentUserId = null;
    saveState();
    refreshApp();
    openModal(elements.loginModal);
}

function createUser({ username, displayName, avatar, status, role }) {
    return {
        id: createId('user'),
        username,
        displayName,
        avatar,
        status,
        role: role || 'member',
        color: pickColor(),
        createdAt: new Date().toISOString()
    };
}

function ensureBotDmChannels(userId) {
    BOT_USERS.forEach((bot) => {
        getOrCreateDmChannel(userId, bot.id);
    });
}

function getOrCreateDmChannel(userId, otherUserId) {
    const existing = state.channels.allIds.find((channelId) => {
        const channel = state.channels.byId[channelId];
        return channel.type === 'dm' && channel.members?.includes(userId) && channel.members?.includes(otherUserId);
    });
    if (existing) return existing;
    const channelId = createId('dm');
    state.channels.byId[channelId] = {
        id: channelId,
        name: '',
        description: '',
        type: 'dm',
        ownerOnly: false,
        members: [userId, otherUserId]
    };
    state.channels.allIds.push(channelId);
    state.messages[channelId] = [];
    return channelId;
}

function setCurrentUser(userId) {
    state.session.currentUserId = userId;
    applyRole();
}

function applyRole() {
    document.body.dataset.role = isOwner() ? 'owner' : 'member';
}

function isOwner(userId = state.session.currentUserId) {
    const user = state.users.byId[userId];
    return user?.role === 'owner';
}

function isMuted(userId = state.session.currentUserId) {
    return state.moderation.mutedUserIds.includes(userId);
}

function isBanned(userId = state.session.currentUserId) {
    return state.moderation.bannedUserIds.includes(userId);
}

function handleChannelSelect(event) {
    const button = event.target.closest('[data-channel-id]');
    if (!button) return;
    const channelId = button.dataset.channelId;
    setActiveChannel(channelId);
}

function setActiveChannel(channelId) {
    uiState.activeChannelId = channelId;
    state.currentChannelId = channelId;
    saveState();
    renderChannels();
    renderDMs();
    renderMessages();
    renderPinned();
    updateComposerState();
}

function handleSendMessage(event) {
    event.preventDefault();
    if (!state.session.currentUserId) return;
    const channelId = uiState.activeChannelId;
    const channel = state.channels.byId[channelId];
    const text = elements.messageInput.value.trim();
    if (!text) return;

    if (isMuted()) {
        showToast('You are muted and cannot send messages.');
        return;
    }

    if (channel.ownerOnly && !isOwner()) {
        showToast('Only the owner can post in this channel.');
        return;
    }

    if (isSlowModeLocked()) {
        const remaining = getSlowModeRemaining();
        showToast(`Slow mode is active. Wait ${remaining}s.`);
        return;
    }

    const blockedTerm = findBlockedTerm(text);
    if (blockedTerm && !isOwner()) {
        const report = createReport(channelId, state.session.currentUserId, null, `Blocked term: ${blockedTerm}`, text);
        state.moderation.reports.unshift(report);
        showToast('Message blocked by safety filters.');
        addActivity('A message was blocked by filters.', 'moderation');
        saveState();
        renderReports();
        renderActivity();
        return;
    }

    const message = createMessage(channelId, state.session.currentUserId, text);
    addMessage(channelId, message);

    elements.messageInput.value = '';
    elements.messageInput.style.height = 'auto';
    state.drafts[channelId] = '';
    updateComposerState();
    if (channel.type !== 'dm') {
        maybeTriggerBotResponse(channelId, text);
    }
}

function handleComposerKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        elements.composerForm.dispatchEvent(new Event('submit'));
    }
}

function handleTypingInput() {
    const channelId = uiState.activeChannelId;
    const value = elements.messageInput.value;
    state.drafts[channelId] = value;
    adjustTextareaHeight();
    scheduleSave();
    updateComposerState();
    setTyping(state.session.currentUserId, value.length > 0);
}

function adjustTextareaHeight() {
    elements.messageInput.style.height = 'auto';
    elements.messageInput.style.height = `${Math.min(elements.messageInput.scrollHeight, 160)}px`;
}

function createMessage(channelId, authorId, content) {
    return {
        id: createId('msg'),
        channelId,
        authorId,
        content,
        createdAt: new Date().toISOString(),
        editedAt: null,
        reactions: {},
        pinned: false,
        system: false
    };
}

function addMessage(channelId, message) {
    const atBottom = isNearBottom();
    state.messages[channelId].push(message);
    state.lastMessageAt[message.authorId] = message.createdAt;
    addActivity(`${getUserName(message.authorId)} posted in #${getChannelLabel(channelId)}.`, 'message');
    saveState();
    renderMessages();
    renderPinned();
    renderActivity();
    if (atBottom) {
        scrollToBottom();
    }
}

function addActivity(text, type = 'info') {
    state.activity.unshift({
        id: createId('activity'),
        text,
        type,
        createdAt: new Date().toISOString()
    });
    state.activity = state.activity.slice(0, 50);
}

function renderMessages() {
    const channelId = uiState.activeChannelId;
    const messages = state.messages[channelId] || [];
    const filter = uiState.searchQuery.toLowerCase();
    const filtered = filter
        ? messages.filter((message) => {
            const authorName = getUserName(message.authorId).toLowerCase();
            return message.content.toLowerCase().includes(filter) || authorName.includes(filter);
        })
        : messages;

    elements.messageList.innerHTML = '';
    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = filter ? 'No messages match that search.' : 'No messages yet. Start the conversation!';
        elements.messageList.appendChild(empty);
        return;
    }

    filtered.forEach((message) => {
        elements.messageList.appendChild(renderMessage(message));
    });
}

function renderMessage(message) {
    const author = state.users.byId[message.authorId];
    const wrapper = document.createElement('div');
    wrapper.className = `message${message.system ? ' system' : ''}`;
    wrapper.dataset.messageId = message.id;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = author?.avatar || getInitials(author?.displayName || '');
    avatar.style.background = author?.color || 'var(--accent)';

    const content = document.createElement('div');
    content.className = 'message-content';

    const meta = document.createElement('div');
    meta.className = 'message-meta';
    const name = document.createElement('span');
    name.className = 'message-author';
    name.textContent = author ? author.displayName : 'Unknown';

    const badges = document.createElement('span');
    badges.className = 'message-badges';
    if (author?.role === 'owner') {
        badges.innerHTML += '<span class=\"badge owner\">Owner</span>';
    }
    if (author?.role === 'bot') {
        badges.innerHTML += '<span class=\"badge bot\">Bot</span>';
    }

    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = formatTime(message.createdAt);
    meta.appendChild(name);
    meta.appendChild(badges);
    meta.appendChild(time);

    if (message.editedAt) {
        const edited = document.createElement('span');
        edited.className = 'message-edited';
        edited.textContent = '(edited)';
        meta.appendChild(edited);
    }

    const body = document.createElement('div');
    body.className = 'message-body';
    body.textContent = message.content;

    const actions = document.createElement('div');
    actions.className = 'message-actions';
    const canEdit = message.authorId === state.session.currentUserId && !message.system;
    const canDelete = isOwner() || message.authorId === state.session.currentUserId;
    const canPin = isOwner();

    if (canEdit) {
        actions.appendChild(actionButton('Edit', 'edit'));
    }
    if (canDelete) {
        actions.appendChild(actionButton('Delete', 'delete'));
    }
    if (canPin) {
        actions.appendChild(actionButton(message.pinned ? 'Unpin' : 'Pin', 'pin'));
    }
    if (!isOwner() && !message.system) {
        actions.appendChild(actionButton('Report', 'report'));
    }

    const reactions = document.createElement('div');
    reactions.className = 'message-reactions';
    const existingReactions = message.reactions || {};
    Object.entries(existingReactions).forEach(([emoji, users]) => {
        if (!users.length) return;
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = `reaction-chip${users.includes(state.session.currentUserId) ? ' active' : ''}`;
        chip.dataset.action = 'react';
        chip.dataset.emoji = emoji;
        chip.textContent = `${emoji} ${users.length}`;
        reactions.appendChild(chip);
    });

    const reactionBar = document.createElement('div');
    reactionBar.className = 'reaction-bar';
    EMOJI_OPTIONS.slice(0, 4).forEach((emoji) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'reaction-button';
        button.dataset.action = 'react';
        button.dataset.emoji = emoji;
        button.textContent = emoji;
        reactionBar.appendChild(button);
    });

    content.appendChild(meta);
    content.appendChild(body);
    if (!message.system) {
        content.appendChild(actions);
        content.appendChild(reactionBar);
        content.appendChild(reactions);
    }

    wrapper.appendChild(avatar);
    wrapper.appendChild(content);

    return wrapper;
}

function actionButton(label, action) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ghost-button small';
    button.dataset.action = action;
    button.textContent = label;
    return button;
}

function handleMessageAction(event) {
    const button = event.target.closest('button');
    if (!button) return;
    const action = button.dataset.action;
    if (!action) return;
    const messageEl = button.closest('[data-message-id]');
    if (!messageEl) return;
    const messageId = messageEl.dataset.messageId;
    const channelId = uiState.activeChannelId;
    const message = (state.messages[channelId] || []).find((item) => item.id === messageId);
    if (!message) return;

    if (action === 'edit') {
        const updated = prompt('Edit message', message.content);
        if (updated === null) return;
        message.content = updated.trim() || message.content;
        message.editedAt = new Date().toISOString();
        saveState();
        renderMessages();
        return;
    }

    if (action === 'delete') {
        state.messages[channelId] = state.messages[channelId].filter((item) => item.id !== messageId);
        addActivity('A message was removed.', 'moderation');
        saveState();
        renderMessages();
        renderPinned();
        renderActivity();
        return;
    }

    if (action === 'pin') {
        message.pinned = !message.pinned;
        addActivity(message.pinned ? 'A message was pinned.' : 'A message was unpinned.', 'moderation');
        saveState();
        renderMessages();
        renderPinned();
        renderActivity();
        return;
    }

    if (action === 'report') {
        const reason = prompt('Report reason', 'Inappropriate content');
        if (!reason) return;
        const report = createReport(channelId, state.session.currentUserId, message, reason, message.content);
        state.moderation.reports.unshift(report);
        showToast('Report sent to moderation.');
        saveState();
        renderReports();
        return;
    }

    if (action === 'react') {
        const emoji = button.dataset.emoji;
        toggleReaction(message, emoji);
        saveState();
        renderMessages();
    }
}

function toggleReaction(message, emoji) {
    if (!message.reactions[emoji]) {
        message.reactions[emoji] = [];
    }
    const list = message.reactions[emoji];
    const userId = state.session.currentUserId;
    const index = list.indexOf(userId);
    if (index === -1) {
        list.push(userId);
    } else {
        list.splice(index, 1);
    }
}

function createReport(channelId, reporterId, message, reason, snapshot) {
    return {
        id: createId('report'),
        channelId,
        reporterId,
        reason,
        messageId: message?.id || null,
        messageSnapshot: snapshot,
        createdAt: new Date().toISOString()
    };
}

function renderChannels() {
    const current = uiState.activeChannelId;
    elements.channelList.innerHTML = '';
    state.channels.allIds
        .map((id) => state.channels.byId[id])
        .filter((channel) => channel.type !== 'dm')
        .forEach((channel) => {
            const button = document.createElement('button');
            button.className = `channel-button${current === channel.id ? ' active' : ''}`;
            button.dataset.channelId = channel.id;

            const left = document.createElement('span');
            left.className = 'channel-meta';
            left.innerHTML = `<span class=\"channel-icon\">#</span><span>${channel.name}</span>`;

            const badge = document.createElement('span');
            badge.className = 'channel-pill';
            badge.textContent = channel.ownerOnly ? 'Owner' : 'Live';

            button.appendChild(left);
            button.appendChild(badge);
            elements.channelList.appendChild(button);
        });
    renderActiveChannel();
}

function renderActiveChannel() {
    const channel = state.channels.byId[uiState.activeChannelId];
    if (!channel) return;
    const isDm = channel.type === 'dm';
    const otherUser = isDm ? getDmPartner(channel) : null;
    elements.channelName.textContent = isDm ? otherUser?.displayName || 'Direct message' : channel.name;
    elements.channelDescription.textContent = isDm ? `Direct message with ${otherUser?.displayName || 'unknown user'}.` : channel.description;
    elements.messageInput.placeholder = isDm
        ? `Message ${otherUser?.displayName || 'direct message'}`
        : `Message #${channel.name.toLowerCase()}`;
}

function renderDMs() {
    elements.dmList.innerHTML = '';
    const currentUserId = state.session.currentUserId;
    if (!currentUserId) return;
    const dmChannels = state.channels.allIds
        .map((id) => state.channels.byId[id])
        .filter((channel) => channel.type === 'dm' && channel.members?.includes(currentUserId));

    dmChannels.forEach((channel) => {
        const otherUser = getDmPartner(channel);
        if (!otherUser) return;
        const button = document.createElement('button');
        button.className = `dm-button${uiState.activeChannelId === channel.id ? ' active' : ''}`;
        button.dataset.channelId = channel.id;
        button.innerHTML = `
            <span class=\"avatar mini\" style=\"background:${otherUser.color}\">${otherUser.avatar || getInitials(otherUser.displayName)}</span>
            <span class=\"dm-name\">${otherUser.displayName}</span>
        `;
        elements.dmList.appendChild(button);
    });
}

function getDmPartner(channel) {
    const currentUserId = state.session.currentUserId;
    const partnerId = channel.members?.find((id) => id !== currentUserId);
    return state.users.byId[partnerId];
}

function renderMembers() {
    const currentUserId = state.session.currentUserId;
    elements.memberList.innerHTML = '';
    if (!currentUserId) return;
    const members = state.users.allIds
        .map((id) => state.users.byId[id])
        .filter(Boolean);

    elements.memberCount.textContent = `${members.length} online`;
    members.forEach((user) => {
        const item = document.createElement('div');
        item.className = 'member-card';
        item.innerHTML = `
            <span class=\"avatar mini\" style=\"background:${user.color}\">${user.avatar || getInitials(user.displayName)}</span>
            <div class=\"member-meta\">
                <div class=\"member-name\">${user.displayName}</div>
                <div class=\"member-status\"><span class=\"status-dot status-${user.status}\"></span>${formatStatus(user.status)}</div>
            </div>
            ${user.role === 'owner' ? '<span class=\"badge owner\">Owner</span>' : ''}
        `;
        elements.memberList.appendChild(item);
    });
}

function renderPinned() {
    const channelId = uiState.activeChannelId;
    const pinned = (state.messages[channelId] || []).filter((message) => message.pinned);
    elements.pinnedList.innerHTML = '';
    elements.pinnedCount.textContent = pinned.length ? `${pinned.length}` : '0';
    if (!pinned.length) {
        elements.pinnedList.innerHTML = '<p class=\"muted\">No pinned messages.</p>';
        return;
    }
    pinned.forEach((message) => {
        const entry = document.createElement('div');
        entry.className = 'pinned-item';
        entry.innerHTML = `
            <div class=\"pinned-author\">${getUserName(message.authorId)}</div>
            <div class=\"pinned-text\">${message.content}</div>
            <div class=\"pinned-time\">${formatTime(message.createdAt)}</div>
        `;
        elements.pinnedList.appendChild(entry);
    });
}

function renderActivity() {
    elements.activityList.innerHTML = '';
    state.activity.slice(0, 10).forEach((entry) => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div>${entry.text}</div>
            <span class=\"activity-time\">${formatTime(entry.createdAt)}</span>
        `;
        elements.activityList.appendChild(item);
    });
}

function renderCurrentUser() {
    const user = state.users.byId[state.session.currentUserId];
    if (!user) {
        elements.currentUserName.textContent = 'Guest';
        elements.currentUserStatus.textContent = 'Offline';
        elements.currentUserAvatar.textContent = '?';
        return;
    }
    elements.currentUserName.textContent = user.displayName;
    elements.currentUserStatus.textContent = formatStatus(user.status);
    elements.currentUserAvatar.textContent = user.avatar || getInitials(user.displayName);
    elements.currentUserAvatar.style.background = user.color;
}

function renderReports() {
    elements.reportList.innerHTML = '';
    if (!state.moderation.reports.length) {
        elements.reportList.innerHTML = '<p class=\"muted\">No reports at the moment.</p>';
        return;
    }
    state.moderation.reports.forEach((report) => {
        const reporter = getUserName(report.reporterId);
        const channel = getChannelLabel(report.channelId);
        const card = document.createElement('div');
        card.className = 'report-card';
        card.innerHTML = `
            <div class=\"report-meta\">
                <span>Reporter: ${reporter}</span>
                <span>#${channel}</span>
                <span>${formatTime(report.createdAt)}</span>
            </div>
            <div class=\"report-reason\">${report.reason}</div>
            <div class=\"report-message\">${report.messageSnapshot || 'Message deleted'}</div>
            <div class=\"report-actions\">
                <button class=\"ghost-button small\" data-report-id=\"${report.id}\" data-action=\"dismiss\">Dismiss</button>
                <button class=\"danger-button small\" data-report-id=\"${report.id}\" data-action=\"remove\">Remove Message</button>
            </div>
        `;
        elements.reportList.appendChild(card);
    });
}

function renderModerationUsers() {
    elements.moderationUserList.innerHTML = '';
    state.users.allIds.forEach((userId) => {
        const user = state.users.byId[userId];
        if (!user || user.role === 'bot') return;
        const muted = state.moderation.mutedUserIds.includes(userId);
        const banned = state.moderation.bannedUserIds.includes(userId);
        const card = document.createElement('div');
        card.className = 'moderation-user-card';
        card.innerHTML = `
            <div class=\"moderation-user-meta\">
                <span class=\"avatar mini\" style=\"background:${user.color}\">${user.avatar || getInitials(user.displayName)}</span>
                <div>
                    <div class=\"member-name\">${user.displayName}</div>
                    <div class=\"member-status muted\">${user.username}</div>
                </div>
            </div>
            <div class=\"moderation-user-actions\">
                <button class=\"ghost-button small\" data-user-id=\"${userId}\" data-action=\"${muted ? 'unmute' : 'mute'}\">${muted ? 'Unmute' : 'Mute'}</button>
                <button class=\"danger-button small\" data-user-id=\"${userId}\" data-action=\"${banned ? 'unban' : 'ban'}\">${banned ? 'Unban' : 'Ban'}</button>
            </div>
        `;
        elements.moderationUserList.appendChild(card);
    });
}

function updateComposerState() {
    const channel = state.channels.byId[uiState.activeChannelId];
    const muted = isMuted();
    const ownerOnly = channel?.ownerOnly && !isOwner();
    const locked = muted || ownerOnly;
    elements.messageInput.disabled = locked;
    const isFocused = document.activeElement === elements.messageInput;
    if (!isFocused || locked) {
        elements.messageInput.value = state.drafts[uiState.activeChannelId] || '';
    }
    const notes = [];
    if (ownerOnly) notes.push('Read-only channel for members.');
    if (muted) notes.push('You are muted by the owner.');
    if (state.moderation.slowModeSeconds > 0) {
        notes.push(`Slow mode: ${state.moderation.slowModeSeconds}s`);
    }
    if (state.lastSavedAt) {
        notes.push(`Saved ${formatTime(state.lastSavedAt)}`);
    }
    elements.composerFooter.textContent = notes.join(' • ');
}

function toggleSearch() {
    elements.chatSearch.classList.toggle('active');
    if (!elements.chatSearch.classList.contains('active')) {
        clearSearch();
    } else {
        elements.messageSearchInput.focus();
    }
}

function handleSearch() {
    uiState.searchQuery = elements.messageSearchInput.value.trim();
    renderMessages();
}

function clearSearch() {
    uiState.searchQuery = '';
    elements.messageSearchInput.value = '';
    renderMessages();
}

function toggleDetailPanel() {
    document.body.classList.toggle('show-detail');
}

function toggleEmojiPicker() {
    elements.emojiPicker.classList.toggle('active');
}

function handleEmojiClick(event) {
    const button = event.target.closest('[data-emoji]');
    if (!button) return;
    const emoji = button.dataset.emoji;
    insertEmoji(emoji);
}

function insertEmoji(emoji) {
    const input = elements.messageInput;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const text = input.value;
    input.value = `${text.slice(0, start)}${emoji}${text.slice(end)}`;
    input.selectionStart = input.selectionEnd = start + emoji.length;
    input.focus();
    handleTypingInput();
}

function handleGlobalClick(event) {
    if (!elements.emojiPicker.contains(event.target) && !elements.emojiToggle.contains(event.target)) {
        elements.emojiPicker.classList.remove('active');
    }
}

function openSettings() {
    const user = state.users.byId[state.session.currentUserId];
    if (!user) return;
    elements.themeSelect.value = state.settings.theme;
    elements.accentPicker.value = state.settings.accent;
    elements.densitySelect.value = state.settings.density;
    elements.profileDisplayName.value = user.displayName;
    elements.profileStatus.value = user.status;
    profileAvatarChoice = user.avatar || profileAvatarChoice;
    renderAvatarGrid(elements.profileAvatarGrid, profileAvatarChoice);
    openModal(elements.settingsModal);
}

function saveSettings() {
    const user = state.users.byId[state.session.currentUserId];
    if (!user) return;
    state.settings.theme = elements.themeSelect.value;
    state.settings.accent = elements.accentPicker.value;
    state.settings.density = elements.densitySelect.value;
    user.displayName = elements.profileDisplayName.value.trim() || user.displayName;
    user.status = elements.profileStatus.value;
    user.avatar = profileAvatarChoice || user.avatar;
    saveState();
    applyTheme();
    renderCurrentUser();
    renderMembers();
    renderMessages();
    closeModal(elements.settingsModal);
}

function openModeration() {
    if (!isOwner()) return;
    renderReports();
    renderModerationUsers();
    renderBlockedTerms();
    elements.slowModeRange.value = state.moderation.slowModeSeconds;
    elements.slowModeValue.textContent = `${state.moderation.slowModeSeconds}s`;
    openModal(elements.moderationModal);
}

function handleReportAction(event) {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const reportId = button.dataset.reportId;
    const action = button.dataset.action;
    const report = state.moderation.reports.find((item) => item.id === reportId);
    if (!report) return;

    if (action === 'dismiss') {
        state.moderation.reports = state.moderation.reports.filter((item) => item.id !== reportId);
        saveState();
        renderReports();
        return;
    }

    if (action === 'remove' && report.messageId) {
        const channelMessages = state.messages[report.channelId] || [];
        state.messages[report.channelId] = channelMessages.filter((msg) => msg.id !== report.messageId);
        state.moderation.reports = state.moderation.reports.filter((item) => item.id !== reportId);
        addActivity('A reported message was removed.', 'moderation');
        saveState();
        renderReports();
        renderMessages();
        renderPinned();
        renderActivity();
    }
}

function handleModerationUserAction(event) {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const userId = button.dataset.userId;
    const action = button.dataset.action;
    const user = state.users.byId[userId];
    if (!user) return;

    if (action === 'mute') {
        state.moderation.mutedUserIds.push(userId);
        addActivity(`${user.displayName} was muted.`, 'moderation');
    }

    if (action === 'unmute') {
        state.moderation.mutedUserIds = state.moderation.mutedUserIds.filter((id) => id !== userId);
        addActivity(`${user.displayName} was unmuted.`, 'moderation');
    }

    if (action === 'ban') {
        state.moderation.bannedUserIds.push(userId);
        addActivity(`${user.displayName} was banned.`, 'moderation');
        if (state.session.currentUserId === userId) {
            handleLogout();
        }
    }

    if (action === 'unban') {
        state.moderation.bannedUserIds = state.moderation.bannedUserIds.filter((id) => id !== userId);
        addActivity(`${user.displayName} was unbanned.`, 'moderation');
    }

    saveState();
    renderModerationUsers();
    renderMembers();
}

function addBlockedTerm() {
    const term = elements.blockedTermInput.value.trim();
    if (!term) return;
    if (!state.moderation.blockedTerms.includes(term)) {
        state.moderation.blockedTerms.push(term);
        saveState();
        renderBlockedTerms();
    }
    elements.blockedTermInput.value = '';
}

function renderBlockedTerms() {
    elements.blockedTermsList.innerHTML = '';
    if (!state.moderation.blockedTerms.length) {
        elements.blockedTermsList.innerHTML = '<p class=\"muted\">No blocked terms.</p>';
        return;
    }
    state.moderation.blockedTerms.forEach((term) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'blocked-chip';
        chip.textContent = term;
        chip.addEventListener('click', () => {
            state.moderation.blockedTerms = state.moderation.blockedTerms.filter((item) => item !== term);
            saveState();
            renderBlockedTerms();
        });
        elements.blockedTermsList.appendChild(chip);
    });
}

function handleSlowModeChange() {
    state.moderation.slowModeSeconds = Number(elements.slowModeRange.value);
    elements.slowModeValue.textContent = `${state.moderation.slowModeSeconds}s`;
    saveState();
    updateComposerState();
}

function clearChannelHistory() {
    const channelId = uiState.activeChannelId;
    state.messages[channelId] = [];
    addActivity(`Channel #${getChannelLabel(channelId)} was cleared.`, 'moderation');
    saveState();
    renderMessages();
    renderPinned();
    renderActivity();
}

function openChannelModal() {
    if (!isOwner()) return;
    elements.channelForm.reset();
    openModal(elements.channelModal);
}

function handleCreateChannel(event) {
    event.preventDefault();
    const name = elements.channelNameInput.value.trim();
    if (!name) return;
    const id = createId('channel');
    state.channels.byId[id] = {
        id,
        name,
        description: elements.channelDescriptionInput.value.trim() || 'New channel',
        type: 'channel',
        ownerOnly: elements.channelOwnerOnly.checked
    };
    state.channels.allIds.push(id);
    state.messages[id] = [];
    addActivity(`Channel #${name} created.`, 'moderation');
    saveState();
    renderChannels();
    closeModal(elements.channelModal);
}

function setTyping(userId, isTyping) {
    if (!userId) return;
    if (!isTyping) {
        typingUsers.delete(userId);
        updateTypingIndicator();
        return;
    }
    typingUsers.set(userId, Date.now());
    updateTypingIndicator();
    setTimeout(() => {
        const last = typingUsers.get(userId);
        if (last && Date.now() - last >= 2400) {
            typingUsers.delete(userId);
            updateTypingIndicator();
        }
    }, 2600);
}

function updateTypingIndicator() {
    const others = Array.from(typingUsers.keys()).filter((id) => id !== state.session.currentUserId);
    if (!others.length) {
        elements.typingIndicator.textContent = '';
        return;
    }
    const names = others.map((id) => getUserName(id)).join(', ');
    elements.typingIndicator.textContent = `${names} ${others.length === 1 ? 'is' : 'are'} typing...`;
}

function maybeTriggerBotResponse(channelId, text) {
    const triggerBot = channelId === 'support' || /help|support|issue/i.test(text);
    if (!triggerBot) return;
    const bot = state.users.byId['bot-echo'];
    if (!bot) return;
    setTyping(bot.id, true);
    const response = `Echoing: ${text.slice(0, 140)}${text.length > 140 ? '...' : ''}`;
    setTimeout(() => {
        setTyping(bot.id, false);
        const message = createMessage(channelId, bot.id, response);
        addMessage(channelId, message);
    }, 1200 + Math.random() * 1200);
}

function isSlowModeLocked() {
    if (state.moderation.slowModeSeconds === 0) return false;
    const last = state.lastMessageAt[state.session.currentUserId];
    if (!last) return false;
    const diff = (Date.now() - new Date(last).getTime()) / 1000;
    return diff < state.moderation.slowModeSeconds;
}

function getSlowModeRemaining() {
    const last = state.lastMessageAt[state.session.currentUserId];
    if (!last) return 0;
    const diff = (Date.now() - new Date(last).getTime()) / 1000;
    return Math.max(0, Math.ceil(state.moderation.slowModeSeconds - diff));
}

function findBlockedTerm(text) {
    const lower = text.toLowerCase();
    return state.moderation.blockedTerms.find((term) => lower.includes(term.toLowerCase()));
}

function refreshApp() {
    applyRole();
    renderChannels();
    renderDMs();
    renderCurrentUser();
    renderMembers();
    renderMessages();
    renderPinned();
    renderActivity();
    renderReports();
    renderModerationUsers();
    updateComposerState();
    scrollToBottom();
}

function saveState() {
    scheduleSave();
}

function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        state.lastSavedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        updateComposerState();
    }, 200);
}

function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    elements.toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 2200);
}

function getUserName(userId) {
    return state.users.byId[userId]?.displayName || 'Unknown';
}

function getChannelLabel(channelId) {
    return state.channels.byId[channelId]?.name || 'channel';
}

function formatTime(value) {
    return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatStatus(status) {
    const labels = {
        online: 'Online',
        away: 'Away',
        dnd: 'Do not disturb',
        invisible: 'Invisible'
    };
    return labels[status] || 'Offline';
}

function getInitials(name) {
    return name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function createId(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;
}

function pickColor() {
    return COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)];
}

function isNearBottom() {
    const { scrollTop, scrollHeight, clientHeight } = elements.messageList;
    return scrollHeight - scrollTop - clientHeight < 120;
}

function scrollToBottom() {
    elements.messageList.scrollTop = elements.messageList.scrollHeight;
}

async function hashPasscode(value) {
    if (window.crypto?.subtle) {
        const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
        return Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
    }
    return btoa(value);
}
