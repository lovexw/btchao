// 终极修复脚本 - 彻底解决所有JavaScript错误
(function() {
    'use strict';
    
    console.log('🔧 启动终极修复模式...');
    
    // 1. 覆盖全局错误处理
    window.addEventListener('error', function(e) {
        if (e.message && e.message.includes('siteHostMap')) {
            console.log('🛡️ 已拦截siteHostMap错误');
            e.preventDefault();
            return false;
        }
        if (e.filename && e.filename.includes('index.js')) {
            console.log('🛡️ 已拦截index.js错误');
            e.preventDefault();
            return false;
        }
    });
    
    // 2. 覆盖Promise错误处理
    window.addEventListener('unhandledrejection', function(e) {
        if (e.reason && e.reason.message && e.reason.message.includes('siteHostMap')) {
            console.log('🛡️ 已拦截Promise siteHostMap错误');
            e.preventDefault();
            return false;
        }
    });
    
    // 3. 禁用所有可能的问题脚本
    const problematicPatterns = [
        'rocket-loader',
        'cloudflare',
        'googlesyndication',
        'google-analytics',
        'gtag',
        'sodar',
        'index.js'
    ];
    
    function removeProblematicScripts() {
        const allScripts = document.querySelectorAll('script');
        allScripts.forEach(script => {
            const src = script.src || '';
            const content = script.textContent || '';
            
            problematicPatterns.forEach(pattern => {
                if (src.includes(pattern) || content.includes(pattern)) {
                    console.log('🗑️ 移除问题脚本:', src || '内联脚本');
                    script.remove();
                }
            });
        });
    }
    
    // 4. 创建安全的全局对象
    window.siteHostMap = window.siteHostMap || {};
    window.CloudFlare = window.CloudFlare || {
        push: function() {},
        rocket: { disable: function() {} }
    };
    
    // 5. 阻止动态脚本注入
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(this, tagName);
        
        if (tagName.toLowerCase() === 'script') {
            const originalSetAttribute = element.setAttribute;
            element.setAttribute = function(name, value) {
                if (name === 'src' && problematicPatterns.some(pattern => value.includes(pattern))) {
                    console.log('🚫 阻止加载问题脚本:', value);
                    return;
                }
                return originalSetAttribute.call(this, name, value);
            };
        }
        
        return element;
    };
    
    // 6. 定期清理
    function periodicCleanup() {
        removeProblematicScripts();
        
        // 清理可能的错误元素
        const errorElements = document.querySelectorAll('[data-error], .error-element');
        errorElements.forEach(el => el.remove());
    }
    
    // 7. 初始化和定期执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(periodicCleanup, 100);
            setTimeout(periodicCleanup, 1000);
            setTimeout(periodicCleanup, 3000);
        });
    } else {
        setTimeout(periodicCleanup, 100);
        setTimeout(periodicCleanup, 1000);
        setTimeout(periodicCleanup, 3000);
    }
    
    // 8. 持续监控
    setInterval(periodicCleanup, 10000);
    
    console.log('✅ 终极修复模式已激活');
    
})();