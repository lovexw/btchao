// CDN备选方案
function loadCSS(href, fallback) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onerror = function() {
        if (fallback) {
            loadCSS(fallback);
        }
    };
    document.head.appendChild(link);
}

// 加载Tailwind CSS with fallback
loadCSS('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', 
        'https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css');

// 加载Font Awesome with fallback  
loadCSS('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');