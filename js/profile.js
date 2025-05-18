document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.content-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Create Post functionality
    const createPostForm = document.querySelector('.create-post');
    const postInput = createPostForm.querySelector('input');
    const postButton = createPostForm.querySelector('.btn-primary');

    postButton.addEventListener('click', () => {
        const postContent = postInput.value.trim();
        if (postContent) {
            createNewPost(postContent);
            postInput.value = '';
        }
    });

    // Function to create a new post
    function createNewPost(content) {
        const postsGrid = document.querySelector('.posts-grid');
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        const currentTime = new Date();
        const timeString = 'Just now';
        
        postCard.innerHTML = `
            <div class="post-header">
                <img src="https://via.placeholder.com/40" alt="Profile" class="profile-pic">
                <div class="post-info">
                    <h4>John Doe</h4>
                    <span class="post-time">${timeString}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${content}</p>
            </div>
            <div class="post-actions">
                <button><i class="fas fa-heart"></i> 0</button>
                <button><i class="fas fa-comment"></i> 0</button>
                <button><i class="fas fa-share"></i> Share</button>
            </div>
        `;

        // Add the new post at the beginning of the grid
        postsGrid.insertBefore(postCard, postsGrid.firstChild);

        // Add event listeners to the new post's buttons
        const likeBtn = postCard.querySelector('.post-actions button:first-child');
        likeBtn.addEventListener('click', () => {
            const likeCount = likeBtn.textContent.trim();
            const newCount = parseInt(likeCount) + 1;
            likeBtn.innerHTML = `<i class="fas fa-heart"></i> ${newCount}`;
            likeBtn.style.color = 'var(--primary-color)';
        });
    }

    // Profile picture and cover photo upload functionality
    const editProfilePic = document.querySelector('.edit-profile-pic');
    const editCover = document.querySelector('.edit-cover');

    editProfilePic.addEventListener('click', () => {
        // Create file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.querySelector('.profile-pic-large img').src = e.target.result;
                    document.querySelector('.nav-profile .profile-pic').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    editCover.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.querySelector('.cover-photo img').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    // Like button functionality for existing posts
    document.querySelectorAll('.post-actions button:first-child').forEach(btn => {
        btn.addEventListener('click', () => {
            const likeCount = btn.textContent.trim();
            const newCount = parseInt(likeCount) + 1;
            btn.innerHTML = `<i class="fas fa-heart"></i> ${newCount}`;
            btn.style.color = 'var(--primary-color)';
        });
    });

    // Shorts Section Functionality
    const createShortBtn = document.getElementById('createShortBtn');
    const createShortModal = document.getElementById('createShortModal');
    const shortForm = document.querySelector('.short-form');
    const videoInput = document.getElementById('shortVideo');
    const thumbnailInput = document.getElementById('shortThumbnail');
    const videoPreview = document.querySelector('.video-preview');
    const thumbnailPreview = document.querySelector('.thumbnail-preview');

    // Modal functionality
    createShortBtn.addEventListener('click', () => {
        createShortModal.classList.add('active');
    });

    createShortModal.querySelector('.close-modal').addEventListener('click', () => {
        createShortModal.classList.remove('active');
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

    // Short form submission
    shortForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('shortTitle').value;
        const description = document.getElementById('shortDescription').value;
        const videoFile = videoInput.files[0];
        const thumbnailFile = thumbnailInput.files[0];

        if (videoFile && thumbnailFile) {
            createNewShort(title, description, videoFile, thumbnailFile);
            createShortModal.classList.remove('active');
            shortForm.reset();
            videoPreview.style.display = 'none';
            thumbnailPreview.style.display = 'none';
        }
    });

    // Function to create a new short
    function createNewShort(title, description, videoFile, thumbnailFile) {
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
                <h4>${title}</h4>
                <div class="short-stats">
                    <span><i class="fas fa-eye"></i> 0</span>
                    <span><i class="fas fa-heart"></i> 0</span>
                    <span><i class="fas fa-comment"></i> 0</span>
                </div>
                <div class="short-actions">
                    <button class="edit-short"><i class="fas fa-edit"></i></button>
                    <button class="delete-short"><i class="fas fa-trash"></i></button>
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
    });

    // Edit and Delete functionality
    document.querySelectorAll('.short-actions button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const shortCard = btn.closest('.short-card');
            
            if (btn.classList.contains('edit-short')) {
                // Here you would implement edit functionality
                console.log('Edit short:', shortCard.querySelector('h4').textContent);
            } else if (btn.classList.contains('delete-short')) {
                if (confirm('Are you sure you want to delete this short?')) {
                    shortCard.remove();
                }
            }
        });
    });
}); 
