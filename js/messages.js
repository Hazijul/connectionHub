document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // New Message Modal
    const newMessageBtn = document.querySelector('.new-message-btn');
    const newMessageModal = document.getElementById('newMessageModal');
    const closeModal = document.querySelector('.close-modal');
    const messageInput = document.querySelector('.message-input input');
    const sendBtn = document.querySelector('.send-btn');
    const conversationsList = document.querySelector('.conversations-list');
    const messagesArea = document.querySelector('.messages-area');

    // Open new message modal
    newMessageBtn.addEventListener('click', () => {
        newMessageModal.classList.add('active');
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        newMessageModal.classList.remove('active');
    });

    // Close modal when clicking outside
    newMessageModal.addEventListener('click', (e) => {
        if (e.target === newMessageModal) {
            newMessageModal.classList.remove('active');
        }
    });

    // Search conversations
    const searchInput = document.querySelector('.search-messages input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const conversations = document.querySelectorAll('.conversation');

        conversations.forEach(conversation => {
            const name = conversation.querySelector('h4').textContent.toLowerCase();
            const message = conversation.querySelector('.last-message').textContent.toLowerCase();

            if (name.includes(searchTerm) || message.includes(searchTerm)) {
                conversation.style.display = 'flex';
            } else {
                conversation.style.display = 'none';
            }
        });
    });

    // Search users in new message modal
    const searchUsersInput = document.querySelector('.search-users input');
    searchUsersInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const users = document.querySelectorAll('.user-item');

        users.forEach(user => {
            const name = user.querySelector('h4').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                user.style.display = 'flex';
            } else {
                user.style.display = 'none';
            }
        });
    });

    // Send message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                    <span class="message-time">${timeString}</span>
                </div>
            `;

            messagesArea.appendChild(messageElement);
            messageInput.value = '';
            messagesArea.scrollTop = messagesArea.scrollHeight;

            // Simulate reply after 1 second
            setTimeout(() => {
                const replyElement = document.createElement('div');
                replyElement.className = 'message received';
                replyElement.innerHTML = `
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" alt="Sarah Wilson" class="profile-pic">
                    <div class="message-content">
                        <p>Thanks for your message! I'll get back to you soon.</p>
                        <span class="message-time">${timeString}</span>
                    </div>
                `;

                messagesArea.appendChild(replyElement);
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }, 1000);
        }
    }

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Switch conversations
    const conversations = document.querySelectorAll('.conversation');
    conversations.forEach(conversation => {
        conversation.addEventListener('click', () => {
            // Remove active class from all conversations
            conversations.forEach(c => c.classList.remove('active'));
            // Add active class to clicked conversation
            conversation.classList.add('active');
            // Remove unread badge
            const badge = conversation.querySelector('.unread-badge');
            if (badge) {
                badge.remove();
            }
        });
    });

    // User selection in new message modal
    const userItems = document.querySelectorAll('.user-item');
    userItems.forEach(user => {
        user.addEventListener('click', () => {
            const userName = user.querySelector('h4').textContent;
            const userPic = user.querySelector('.profile-pic').src;
            
            // Create new conversation
            const newConversation = document.createElement('div');
            newConversation.className = 'conversation active';
            newConversation.innerHTML = `
                <img src="${userPic}" alt="${userName}" class="profile-pic">
                <div class="conversation-info">
                    <div class="conversation-header">
                        <h4>${userName}</h4>
                        <span class="time">Just now</span>
                    </div>
                    <p class="last-message">Start a conversation</p>
                </div>
            `;

            // Add to conversations list
            conversationsList.insertBefore(newConversation, conversationsList.firstChild);
            
            // Close modal
            newMessageModal.classList.remove('active');
            
            // Clear messages area
            messagesArea.innerHTML = `
                <div class="message-date">Today</div>
            `;
        });
    });

    // Attachment button functionality
    const attachmentBtn = document.querySelector('.attachment-btn');
    attachmentBtn.addEventListener('click', () => {
        // Here you would implement file attachment functionality
        alert('File attachment functionality would be implemented here!');
    });

    // Emoji button functionality
    const emojiBtn = document.querySelector('.emoji-btn');
    emojiBtn.addEventListener('click', () => {
        // Here you would implement emoji picker functionality
        alert('Emoji picker would be implemented here!');
    });

    // Chat actions (phone, video, info)
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.querySelector('i').className;
            if (action.includes('phone')) {
                alert('Voice call functionality would be implemented here!');
            } else if (action.includes('video')) {
                alert('Video call functionality would be implemented here!');
            } else if (action.includes('info')) {
                alert('Chat info would be displayed here!');
            }
        });
    });
}); 