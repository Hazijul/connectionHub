document.addEventListener('DOMContentLoaded', () => {
    const shortsFeed = document.querySelector('.shorts-feed');
    const shortItems = document.querySelectorAll('.short-item');
    let currentIndex = 0;

    // Initialize the first short
    shortItems[0].querySelector('video').play();

    // Handle video interactions
    shortItems.forEach(item => {
        const video = item.querySelector('video');
        const likeBtn = item.querySelector('.like-btn');
        const dislikeBtn = item.querySelector('.dislike-btn');
        const commentBtn = item.querySelector('.comment-btn');
        const shareBtn = item.querySelector('.share-btn');
        const commentsSection = item.querySelector('.comments-section');
        const closeComments = item.querySelector('.close-comments');
        const addCommentForm = item.querySelector('.add-comment');

        // Like button functionality
        likeBtn.addEventListener('click', () => {
            const count = likeBtn.querySelector('span');
            const currentCount = parseInt(count.textContent);
            
            if (likeBtn.classList.contains('active')) {
                likeBtn.classList.remove('active');
                count.textContent = (currentCount - 1).toLocaleString();
            } else {
                likeBtn.classList.add('active');
                count.textContent = (currentCount + 1).toLocaleString();
                if (dislikeBtn.classList.contains('active')) {
                    dislikeBtn.classList.remove('active');
                    const dislikeCount = dislikeBtn.querySelector('span');
                    dislikeCount.textContent = (parseInt(dislikeCount.textContent) - 1).toLocaleString();
                }
            }
        });

        // Dislike button functionality
        dislikeBtn.addEventListener('click', () => {
            const count = dislikeBtn.querySelector('span');
            const currentCount = parseInt(count.textContent);
            
            if (dislikeBtn.classList.contains('active')) {
                dislikeBtn.classList.remove('active');
                count.textContent = (currentCount - 1).toLocaleString();
            } else {
                dislikeBtn.classList.add('active');
                count.textContent = (currentCount + 1).toLocaleString();
                if (likeBtn.classList.contains('active')) {
                    likeBtn.classList.remove('active');
                    const likeCount = likeBtn.querySelector('span');
                    likeCount.textContent = (parseInt(likeCount.textContent) - 1).toLocaleString();
                }
            }
        });

        // Comment button functionality
        commentBtn.addEventListener('click', () => {
            commentsSection.classList.add('active');
        });

        closeComments.addEventListener('click', () => {
            commentsSection.classList.remove('active');
        });

        // Add comment functionality
        addCommentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = addCommentForm.querySelector('input');
            const comment = input.value.trim();
            
            if (comment) {
                const commentsList = item.querySelector('.comments-list');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <img src="https://via.placeholder.com/32" alt="User" class="profile-pic">
                    <div class="comment-content">
                        <div class="comment-header">
                            <span class="username">John Doe</span>
                            <span class="time">Just now</span>
                        </div>
                        <p>${comment}</p>
                        <div class="comment-actions">
                            <button><i class="fas fa-heart"></i> 0</button>
                            <button>Reply</button>
                        </div>
                    </div>
                `;
                commentsList.insertBefore(newComment, commentsList.firstChild);
                input.value = '';

                // Update comment count
                const commentCount = commentBtn.querySelector('span');
                const currentCount = parseInt(commentCount.textContent);
                commentCount.textContent = (currentCount + 1).toLocaleString();
            }
        });

        // Share button functionality
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Check out this short video!',
                    text: item.querySelector('.caption').textContent,
                    url: window.location.href
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const dummy = document.createElement('input');
                document.body.appendChild(dummy);
                dummy.value = window.location.href;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
                alert('Link copied to clipboard!');
            }
        });
    });

    // Handle video navigation
    document.addEventListener('wheel', (e) => {
        if (e.deltaY > 0 && currentIndex < shortItems.length - 1) {
            // Scroll down - next video
            shortItems[currentIndex].querySelector('video').pause();
            shortItems[currentIndex].classList.remove('active');
            currentIndex++;
            shortItems[currentIndex].classList.add('active');
            shortItems[currentIndex].querySelector('video').play();
        } else if (e.deltaY < 0 && currentIndex > 0) {
            // Scroll up - previous video
            shortItems[currentIndex].querySelector('video').pause();
            shortItems[currentIndex].classList.remove('active');
            currentIndex--;
            shortItems[currentIndex].classList.add('active');
            shortItems[currentIndex].querySelector('video').play();
        }
    });

    // Modal functionality
    const createShortBtn = document.getElementById('createShortBtn');
    const createShortModal = document.getElementById('createShortModal');
    const shortForm = document.querySelector('.short-form');
    const videoInput = document.getElementById('shortVideo');
    const thumbnailInput = document.getElementById('shortThumbnail');
    const videoPreview = document.querySelector('.video-preview');
    const thumbnailPreview = document.querySelector('.thumbnail-preview');

    // Open modal
    createShortBtn.addEventListener('click', () => {
        createShortModal.classList.add('active');
    });

    // Close modal
    createShortModal.querySelector('.close-modal').addEventListener('click', () => {
        createShortModal.classList.remove('active');
    });

    // Close modal when clicking outside
    createShortModal.addEventListener('click', (e) => {
        if (e.target === createShortModal) {
            createShortModal.classList.remove('active');
        }
    });

    // Video preview
    videoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = true;
            videoPreview.innerHTML = '';
            videoPreview.appendChild(video);
            videoPreview.style.display = 'block';
        }
    });

    // Thumbnail preview
    thumbnailInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            thumbnailPreview.innerHTML = '';
            thumbnailPreview.appendChild(img);
            thumbnailPreview.style.display = 'block';
        }
    });

    // Form submission
    shortForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('shortTitle').value;
        const description = document.getElementById('shortDescription').value;
        const category = document.getElementById('shortCategory').value;
        const tags = document.getElementById('shortTags').value;
        const videoFile = videoInput.files[0];
        const thumbnailFile = thumbnailInput.files[0];

        if (videoFile && thumbnailFile) {
            createNewShort(title, description, category, tags, videoFile, thumbnailFile);
            createShortModal.classList.remove('active');
            shortForm.reset();
            videoPreview.style.display = 'none';
            thumbnailPreview.style.display = 'none';
        }
    });

    // Function to create a new short
    function createNewShort(title, description, category, tags, videoFile, thumbnailFile) {
        const shortsGrid = document.querySelector('.shorts-grid');
        const shortCard = document.createElement('div');
        shortCard.className = 'short-card';
        
        const videoUrl = URL.createObjectURL(videoFile);
        const thumbnailUrl = URL.createObjectURL(thumbnailFile);
        
        shortCard.innerHTML = `
            <div class="short-preview">
                <video src="${videoUrl}" poster="${thumbnailUrl}"></video>
                <div class="short-overlay">
                    <button class="play-btn"><i class="fas fa-play"></i></button>
                </div>
            </div>
            <div class="short-info">
                <div class="short-header">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" alt="Profile" class="profile-pic">
                    <div class="short-meta">
                        <h4>${title}</h4>
                        <span class="username">@johndoe</span>
                    </div>
                </div>
                <p class="short-description">${description}</p>
                <div class="short-stats">
                    <span><i class="fas fa-eye"></i> 0</span>
                    <span><i class="fas fa-heart"></i> 0</span>
                    <span><i class="fas fa-comment"></i> 0</span>
                    <span><i class="fas fa-share"></i> Share</span>
                </div>
            </div>
        `;

        // Add the new short at the beginning of the grid
        shortsGrid.insertBefore(shortCard, shortsGrid.firstChild);

        // Add event listeners to the new short's buttons
        const playBtn = shortCard.querySelector('.play-btn');
        const video = shortCard.querySelector('video');
        
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        video.addEventListener('ended', () => {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        // Add event listeners to stats
        const stats = shortCard.querySelectorAll('.short-stats span');
        stats.forEach(stat => {
            stat.addEventListener('click', () => {
                if (stat.querySelector('.fa-heart')) {
                    const count = parseInt(stat.textContent.trim());
                    stat.innerHTML = `<i class="fas fa-heart"></i> ${count + 1}`;
                    stat.style.color = 'var(--primary-color)';
                }
            });
        });
    }

    // Play/Pause functionality for existing shorts
    document.querySelectorAll('.short-card').forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        const video = card.querySelector('video');
        
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        video.addEventListener('ended', () => {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        // Add event listeners to stats
        const stats = card.querySelectorAll('.short-stats span');
        stats.forEach(stat => {
            stat.addEventListener('click', () => {
                if (stat.querySelector('.fa-heart')) {
                    const count = parseInt(stat.textContent.trim());
                    stat.innerHTML = `<i class="fas fa-heart"></i> ${count + 1}`;
                    stat.style.color = 'var(--primary-color)';
                }
            });
        });
    });

    // Category filtering
    const categoryLinks = document.querySelectorAll('.categories a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            // Here you would implement category filtering
            console.log('Filter by category:', link.textContent.trim());
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Here you would implement search filtering
        console.log('Search for:', searchTerm);
    });

    // Filter options
    const filterButtons = document.querySelectorAll('.filter-options button');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Here you would implement filter functionality
            console.log('Filter by:', btn.textContent.trim());
        });
    });

    // Trending tags
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Here you would implement tag filtering
            console.log('Filter by tag:', tag.textContent.trim());
        });
    });

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
}); 