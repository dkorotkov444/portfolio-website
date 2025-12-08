// Lightweight image modal for project thumbnails
(function(){
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('img-modal-img');
    const modalCaption = document.getElementById('img-modal-caption');
    const closeBtn = document.getElementById('img-modal-close');
    let lastTrigger = null;

    function openModal(trigger){
        const full = trigger.dataset.full;
        if(!full) return;
        lastTrigger = trigger;
        modalImg.src = full;
        const thumb = trigger.querySelector('img');
        const alt = thumb && thumb.alt ? thumb.alt : '';
        modalImg.alt = alt;
        modalCaption.textContent = alt;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden','false');
        // lock scroll
        document.documentElement.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal(){
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden','true');
        // clear src to free memory
        modalImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        modalImg.alt = '';
        modalCaption.textContent = '';
        document.documentElement.style.overflow = '';
        if(lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
        lastTrigger = null;
    }

    document.querySelectorAll('.js-open-modal').forEach(function(el){
        el.addEventListener('click', function(e){
            e.preventDefault();
            openModal(el);
        });
    });

    closeBtn.addEventListener('click', function(){ closeModal(); });

    // click outside modal closes
    modal.addEventListener('click', function(e){
        if(e.target === modal) closeModal();
    });

    // ESC key closes and Tab trapping when modal is open
    document.addEventListener('keydown', function(e){
        // Close on Escape
        if(e.key === 'Escape' && modal.classList.contains('is-open')){
            e.preventDefault();
            closeModal();
            return;
        }

        // Simple focus trap: keep Tab navigation inside modal when it's open
        if(e.key === 'Tab' && modal.classList.contains('is-open')){
            const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])';
            const focusables = Array.prototype.slice.call(modal.querySelectorAll(focusableSelectors)).filter(function(el){
                return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
            });
            if(focusables.length === 0){
                e.preventDefault();
                return;
            }
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if(e.shiftKey){
                // Shift + Tab
                if(document.activeElement === first){
                    e.preventDefault();
                    last.focus();
                }
            } else {
                // Tab
                if(document.activeElement === last){
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });
})();

// Lightweight video modal for project demo videos
(function(){
    const videoModal = document.getElementById('video-modal');
    if(!videoModal) return; // Exit if modal doesn't exist
    
    const videoElement = document.getElementById('video-modal-video');
    const videoSource = videoElement.querySelector('source');
    const videoCloseBtn = document.getElementById('video-modal-close');
    let lastVideoTrigger = null;

    function openVideoModal(trigger){
        const videoSrc = trigger.dataset.video;
        if(!videoSrc) return;
        lastVideoTrigger = trigger;
        videoSource.src = videoSrc;
        videoElement.load();
        videoModal.classList.add('is-open');
        videoModal.setAttribute('aria-hidden','false');
        // lock scroll
        document.documentElement.style.overflow = 'hidden';
        videoCloseBtn.focus();
    }

    function closeVideoModal(){
        videoModal.classList.remove('is-open');
        videoModal.setAttribute('aria-hidden','true');
        // stop and clear video
        videoElement.pause();
        videoSource.src = '';
        document.documentElement.style.overflow = '';
        if(lastVideoTrigger && typeof lastVideoTrigger.focus === 'function') lastVideoTrigger.focus();
        lastVideoTrigger = null;
    }

    document.querySelectorAll('.js-open-video-modal').forEach(function(el){
        el.addEventListener('click', function(e){
            e.preventDefault();
            openVideoModal(el);
        });
    });

    if(videoCloseBtn){
        videoCloseBtn.addEventListener('click', function(e){ 
            e.preventDefault();
            e.stopPropagation();
            closeVideoModal(); 
        });
    }

    // click outside modal closes
    videoModal.addEventListener('click', function(e){
        if(e.target === videoModal) closeVideoModal();
    });

    // ESC key closes video modal
    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && videoModal.classList.contains('is-open')){
            e.preventDefault();
            closeVideoModal();
        }
    });
})();
