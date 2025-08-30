// 修复所有页面的脚本
(function() {
    'use strict';
    
    // 禁用Cloudflare Rocket Loader
    if (typeof CloudFlare !== 'undefined') {
        CloudFlare.push(function() {
            CloudFlare.rocket.disable();
        });
    }
    
    // 创建基础样式
    const basicStyles = `
        <style id="emergency-styles">
        /* 紧急样式修复 */
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .bg-white { background-color: #ffffff; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-blue-600 { background-color: #2563eb; }
        .bg-orange-500 { background-color: #f97316; }
        .text-white { color: #ffffff; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-800 { color: #1f2937; }
        .text-blue-600 { color: #2563eb; }
        .text-orange-500 { color: #f97316; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .py-2 { padding: 0.5rem 0; }
        .px-4 { padding: 0 1rem; }
        .py-12 { padding: 3rem 0; }
        .mt-4 { margin-top: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .rounded { border-radius: 0.25rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .shadow-lg { box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
        .text-center { text-align: center; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: 1fr; }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .gap-6 { gap: 1.5rem; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
        .hover\\:bg-orange-600:hover { background-color: #ea580c; }
        .transition { transition: all 0.3s ease; }
        @media (min-width: 768px) {
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
            .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        }
        </style>
    `;
    
    // 等待DOM加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // 添加紧急样式
        if (!document.getElementById('emergency-styles')) {
            document.head.insertAdjacentHTML('beforeend', basicStyles);
        }
        
        // 移除可能导致问题的脚本
        const problematicScripts = document.querySelectorAll('script[src*="rocket-loader"]');
        problematicScripts.forEach(script => script.remove());
        
        console.log('页面修复脚本已加载');
    }
    
})();