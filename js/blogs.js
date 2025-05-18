document.addEventListener('DOMContentLoaded', () => {
    const createBlogBtn = document.querySelector('.create-blog .btn-primary');
    const modal = document.getElementById('createBlogModal');
    const closeModal = document.querySelector('.close-modal');
    const blogForm = document.querySelector('.blog-form');
    const searchInput = document.querySelector('.search-box input');
    const filterSelect = document.querySelector('.filter-options select');
    const categoryLinks = document.querySelectorAll('.blog-categories a');
    const topicTags = document.querySelectorAll('.tag');
    const readMoreBtns = document.querySelectorAll('.read-more');

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

    // Modal functionality
    createBlogBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Blog form submission
    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('blogTitle').value;
        const category = document.getElementById('blogCategory').value;
        const content = document.getElementById('blogContent').value;
        const imageFile = document.getElementById('blogImage').files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                createNewBlogPost(title, category, content, e.target.result);
            };
            reader.readAsDataURL(imageFile);
        }

        modal.classList.remove('active');
        blogForm.reset();
    });

    // Function to create a new blog post
    function createNewBlogPost(title, category, content, imageUrl) {
        const blogsGrid = document.querySelector('.blogs-grid');
        const blogCard = document.createElement('article');
        blogCard.className = 'blog-card';
        
        blogCard.innerHTML = `
            <div class="blog-image">
                <img src="${imageUrl}" alt="Blog Image">
                <span class="category">${category}</span>
            </div>
            <div class="blog-content">
                <div class="blog-header">
                    <img src="https://via.placeholder.com/40" alt="Author" class="profile-pic">
                    <div class="blog-info">
                        <h4>John Doe</h4>
                        <span class="post-time">Just now</span>
                    </div>
                </div>
                <h3>${title}</h3>
                <p>${content.substring(0, 150)}...</p>
                <div class="blog-footer">
                    <div class="blog-stats">
                        <span><i class="fas fa-heart"></i> 0</span>
                        <span><i class="fas fa-comment"></i> 0</span>
                        <span><i class="fas fa-bookmark"></i> 0</span>
                    </div>
                    <button class="read-more">Read More</button>
                </div>
            </div>
        `;

        // Add the new blog post at the beginning of the grid
        blogsGrid.insertBefore(blogCard, blogsGrid.firstChild);

        // Add event listeners to the new blog post's buttons
        const likeBtn = blogCard.querySelector('.blog-stats span:first-child');
        likeBtn.addEventListener('click', () => {
            const count = parseInt(likeBtn.textContent.trim());
            likeBtn.innerHTML = `<i class="fas fa-heart"></i> ${count + 1}`;
            likeBtn.style.color = 'var(--primary-color)';
        });
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const blogCards = document.querySelectorAll('.blog-card');

        blogCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const category = card.querySelector('.category').textContent.toLowerCase();

            if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Filter functionality
    filterSelect.addEventListener('change', (e) => {
        const filter = e.target.value;
        const blogCards = Array.from(document.querySelectorAll('.blog-card'));

        switch (filter) {
            case 'latest':
                blogCards.sort((a, b) => {
                    const timeA = a.querySelector('.post-time').textContent;
                    const timeB = b.querySelector('.post-time').textContent;
                    return timeA.localeCompare(timeB);
                });
                break;
            case 'popular':
                blogCards.sort((a, b) => {
                    const likesA = parseInt(a.querySelector('.blog-stats span:first-child').textContent);
                    const likesB = parseInt(b.querySelector('.blog-stats span:first-child').textContent);
                    return likesB - likesA;
                });
                break;
            case 'trending':
                blogCards.sort((a, b) => {
                    const viewsA = parseInt(a.querySelector('.blog-stats span:last-child').textContent);
                    const viewsB = parseInt(b.querySelector('.blog-stats span:last-child').textContent);
                    return viewsB - viewsA;
                });
                break;
        }

        const blogsGrid = document.querySelector('.blogs-grid');
        blogCards.forEach(card => blogsGrid.appendChild(card));
    });

    // Category selection
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.textContent.trim();
            
            categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');

            const blogCards = document.querySelectorAll('.blog-card');
            blogCards.forEach(card => {
                if (category === 'All' || card.querySelector('.category').textContent === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Topic tag selection
    topicTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const topic = tag.textContent.substring(1); // Remove the # symbol
            searchInput.value = topic;
            searchInput.dispatchEvent(new Event('input'));
        });
    });

    // Read More functionality
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const blogCard = btn.closest('.blog-card');
            const title = blogCard.querySelector('h3').textContent;
            const content = blogCard.querySelector('p').textContent;
            
            // Here you would typically navigate to a full blog post page
            console.log('Reading more:', { title, content });
            alert('Full blog post view would be implemented here!');
        });
    });
}); 