document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.achievement-carousel');
    let currentCarousel = null;
    let currentIndex = 0;

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        
        // Add click event to all carousel images
        images.forEach((img, index) => {
            img.addEventListener('click', function() {
                openFullscreen(this, carousel, index);
            });
        });
    });

    const fullscreenContainer = document.getElementById("fullscreen-container");
    const fullscreenImage = document.getElementById("fullscreen-image");
    const fullscreenVideo = document.getElementById("fullscreen-video");
    const fullscreenPrev = document.getElementById("fullscreen-prev");
    const fullscreenNext = document.getElementById("fullscreen-next");
    const fullscreenExit = document.getElementById("fullscreen-exit");

    function openFullscreen(element, carousel, index) {
        currentCarousel = carousel;
        currentIndex = index;
        const images = carousel ? carousel.querySelectorAll('.carousel-image') : [element];
        
        if (element.tagName.toLowerCase() === 'img') {
            fullscreenImage.src = element.src;
            fullscreenImage.style.display = "block";
            fullscreenVideo.style.display = "none";
        } else if (element.tagName.toLowerCase() === 'video') {
            fullscreenVideo.src = element.querySelector('source').src;
            fullscreenVideo.style.display = "block";
            fullscreenImage.style.display = "none";
        }

        fullscreenContainer.style.display = "flex";
        document.body.style.overflow = "hidden";

        // Update navigation function for fullscreen mode
        if (carousel && images.length > 1) {
            fullscreenPrev.style.display = "flex";
            fullscreenNext.style.display = "flex";
            fullscreenPrev.onclick = () => showFullscreenImage(images, (currentIndex - 1 + images.length) % images.length);
            fullscreenNext.onclick = () => showFullscreenImage(images, (currentIndex + 1) % images.length);
        } else {
            fullscreenPrev.style.display = "none";
            fullscreenNext.style.display = "none";
        }
    }

    function showFullscreenImage(images, index) {
        currentIndex = index;
        fullscreenImage.src = images[index].src;
    }

    function closeFullscreen() {
        fullscreenContainer.style.display = "none";
        fullscreenImage.style.display = "none";
        fullscreenVideo.style.display = "none";
        fullscreenVideo.pause();
        document.body.style.overflow = "auto";
        currentCarousel = null;
    }

    fullscreenExit.addEventListener('click', closeFullscreen);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add click event to all images and videos
    const allImages = document.querySelectorAll('img');
    const allVideos = document.querySelectorAll('.video-item');

    allImages.forEach(img => {
        if (!img.closest('.achievement-carousel')) {
            img.addEventListener('click', function() {
                openFullscreen(this, null, 0);
            });
        }
    });

    allVideos.forEach(video => {
        video.addEventListener('click', function() {
            openFullscreen(this.querySelector('video'), null, 0);
        });
    });

    // Add click event to timeline images
    const timelineImages = document.querySelectorAll('.timeline-image');
    timelineImages.forEach(img => {
        img.addEventListener('click', function() {
            openFullscreen(this, null, 0);
        });
    });

    // Keyboard navigation for fullscreen mode
    document.addEventListener('keydown', function(e) {
        if (fullscreenContainer.style.display === "flex") {
            if (e.key === "ArrowLeft" && fullscreenPrev.style.display === "flex") {
                fullscreenPrev.click();
            } else if (e.key === "ArrowRight" && fullscreenNext.style.display === "flex") {
                fullscreenNext.click();
            } else if (e.key === "Escape") {
                closeFullscreen();
            }
        }
    });

    // Close fullscreen when clicking outside the image
    fullscreenContainer.addEventListener('click', function(e) {
        if (e.target === fullscreenContainer) {
            closeFullscreen();
        }
    });
});