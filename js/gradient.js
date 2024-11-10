// js/gradient.js
class GradientBackground {
    constructor() {
        this.interBubble = document.querySelector('.interactive');
        this.curX = 0;
        this.curY = 0;
        this.tgX = 0;
        this.tgY = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animate();
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (event) => {
            this.tgX = event.clientX;
            this.tgY = event.clientY;
        });
    }

    animate() {
        this.curX += (this.tgX - this.curX) / 20;
        this.curY += (this.tgY - this.curY) / 20;
        if (this.interBubble) {
            this.interBubble.style.transform = `translate(${Math.round(this.curX)}px, ${Math.round(this.curY)}px)`;
        }
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize gradient background
document.addEventListener('DOMContentLoaded', () => {
    new GradientBackground();
});