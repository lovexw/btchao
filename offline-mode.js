// 离线模式优化脚本
(function() {
    'use strict';
    
    // 检测网络状态
    function isOnline() {
        return navigator.onLine;
    }
    
    // 移除所有外部依赖
    function enableOfflineMode() {
        // 移除Google AdSense
        const adsScripts = document.querySelectorAll('script[src*="googlesyndication"]');
        adsScripts.forEach(script => script.remove());
        
        // 移除Google Analytics等追踪脚本
        const trackingScripts = document.querySelectorAll('script[src*="google"], script[src*="gstatic"]');
        trackingScripts.forEach(script => script.remove());
        
        // 添加离线提示
        const offlineNotice = document.createElement('div');
        offlineNotice.innerHTML = `
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 8px 12px; margin: 10px; border-radius: 4px; font-size: 14px; color: #92400e;">
                <i class="fa fa-wifi" style="margin-right: 5px;"></i>
                检测到网络环境受限，已启用离线优化模式
            </div>
        `;
        document.body.insertBefore(offlineNotice, document.body.firstChild);
        
        console.log('离线模式已启用');
    }
    
    // 网络状态监听
    window.addEventListener('online', function() {
        console.log('网络已连接');
        const offlineNotices = document.querySelectorAll('[style*="fef3c7"]');
        offlineNotices.forEach(notice => notice.remove());
    });
    
    window.addEventListener('offline', function() {
        console.log('网络已断开');
        enableOfflineMode();
    });
    
    // 初始化检查
    setTimeout(function() {
        // 检查是否有网络连接问题
        const hasNetworkErrors = window.performance && 
            window.performance.getEntriesByType('navigation')[0] &&
            window.performance.getEntriesByType('navigation')[0].responseStart === 0;
            
        if (!isOnline() || hasNetworkErrors) {
            enableOfflineMode();
        }
    }, 3000);
    
})();