document.addEventListener('DOMContentLoaded', () => {

    // --- 0. DYNAMICALLY CALCULATE DAYS SINCE START (Resolved Error) ---
    // Sets start date to November 6th, 2025
    const startDate = new Date('2025-11-06T00:00:00'); 
    const today = new Date();
    
    // Calculate the difference in milliseconds and convert to days
    const timeDifference = today.getTime() - startDate.getTime();
    const daysSinceStart = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Update the HTML element's data-target attribute for the counter
    const daysStatElement = document.querySelector('.stats-grid .stat-item:first-child .stat-number');
    if (daysStatElement) {
        daysStatElement.setAttribute('data-target', daysSinceStart);
        daysStatElement.textContent = '0'; 
    }

    // --- 1. STATS COUNTER ANIMATION ---
    const statCounters = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const duration = 2000; // 2 seconds animation time
        const increment = target / (duration / 16); 

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.round(current).toLocaleString(); 
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        requestAnimationFrame(updateCounter);
    };

    // Use Intersection Observer to start animation when the stats section is in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statCounters.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    const duoStatsSection = document.querySelector('.duo-stats');
    if (duoStatsSection) {
        observer.observe(duoStatsSection);
    }


    // --- 2. DATE COUNTDOWN TIMER ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // We will define the target date and time directly here for precision
        // Target: December 15, 2025, at 16:00 (4:00 PM)
        const targetDate = new Date('2025-12-15T16:00:00').getTime(); // Use 16:00 for 4 PM

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                document.getElementById('countdown').innerHTML = "IT'S TIME! Let's go on our date!";
                clearInterval(countdownInterval);
                return;
            }

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in elements
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Run immediately to avoid delay
    }   


    // --- 3. FLOATING BACKGROUND HEARTS ---
    const heartContainer = document.getElementById('heart-container');
    const createFloatingHeart = () => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️'; // The heart emoji
        
        heart.style.left = `${Math.random() * 100}vw`; 
        heart.style.animationDuration = `${Math.random() * 8 + 7}s`; 
        heart.style.fontSize = `${Math.random() * 1 + 1}em`; 

        heartContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 15000); 
    };

    setInterval(createFloatingHeart, 500); // Create a new floating heart every 0.5 seconds


    // --- 4. CURSOR-FOLLOWING HEARTS ---
    document.addEventListener('mousemove', (e) => {
        // 20% chance to drop a sparkle heart on mousemove
        if (Math.random() < 0.2) { 
            const heart = document.createElement('div');
            heart.classList.add('cursor-heart');
            heart.innerHTML = '✨'; 
            
            heart.style.left = `${e.clientX}px`;
            heart.style.top = `${e.clientY}px`;
            
            document.body.appendChild(heart);

            // Remove heart after the animation finishes
            setTimeout(() => {
                heart.remove();
            }, 1000); 
        }
    });

});