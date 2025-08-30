// 增强版CDN回退机制
(function() {
    'use strict';
    
    // CDN资源配置
    const cdnResources = {
        tailwind: [
            'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css',
            'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
        ],
        fontawesome: [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
            'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
            'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        ],
        chartjs: [
            'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js',
            'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js',
            'https://unpkg.com/chart.js@3.9.1/dist/chart.min.js'
        ]
    };

    // 加载CSS资源
    function loadCSS(urls, callback) {
        let currentIndex = 0;
        
        function tryLoad() {
            if (currentIndex >= urls.length) {
                console.warn('所有CSS CDN都无法加载');
                if (callback) callback(false);
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = urls[currentIndex];
            
            link.onload = function() {
                console.log('CSS加载成功:', urls[currentIndex]);
                if (callback) callback(true);
            };
            
            link.onerror = function() {
                console.warn('CSS加载失败:', urls[currentIndex]);
                currentIndex++;
                setTimeout(tryLoad, 100);
            };
            
            document.head.appendChild(link);
        }
        
        tryLoad();
    }

    // 加载JS资源
    function loadJS(urls, callback) {
        let currentIndex = 0;
        
        function tryLoad() {
            if (currentIndex >= urls.length) {
                console.warn('所有JS CDN都无法加载');
                if (callback) callback(false);
                return;
            }
            
            const script = document.createElement('script');
            script.src = urls[currentIndex];
            
            script.onload = function() {
                console.log('JS加载成功:', urls[currentIndex]);
                if (callback) callback(true);
            };
            
            script.onerror = function() {
                console.warn('JS加载失败:', urls[currentIndex]);
                currentIndex++;
                setTimeout(tryLoad, 100);
            };
            
            document.head.appendChild(script);
        }
        
        tryLoad();
    }

    // 检查资源是否已加载
    function checkResource(type) {
        switch(type) {
            case 'tailwind':
                return document.querySelector('link[href*="tailwind"]') !== null;
            case 'fontawesome':
                return document.querySelector('link[href*="font-awesome"]') !== null;
            case 'chartjs':
                return typeof Chart !== 'undefined';
            default:
                return false;
        }
    }

    // 初始化回退机制
    function initFallback() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initFallback);
            return;
        }

        // 检查并加载Tailwind CSS
        setTimeout(() => {
            if (!checkResource('tailwind')) {
                console.log('检测到Tailwind CSS未加载，启动回退机制');
                loadCSS(cdnResources.tailwind);
            }
        }, 2000);

        // 检查并加载Font Awesome
        setTimeout(() => {
            if (!checkResource('fontawesome')) {
                console.log('检测到Font Awesome未加载，启动回退机制');
                loadCSS(cdnResources.fontawesome);
            }
        }, 2500);

        // 检查并加载Chart.js
        setTimeout(() => {
            if (!checkResource('chartjs')) {
                console.log('检测到Chart.js未加载，启动回退机制');
                loadJS(cdnResources.chartjs);
            }
        }, 3000);
    }

    // 禁用Cloudflare Rocket Loader
    if (window.CloudFlare) {
        window.CloudFlare.push(function() {
            window.CloudFlare.rocket.disable();
        });
    }

    // 启动回退机制
    initFallback();

})();