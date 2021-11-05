// ==UserScript==
// @name         Bilibili直播弹幕屏蔽
// @namespace    https://windrises.net
// @version      0.1
// @description  屏蔽底端弹幕等
// @author       windrises
// @run-at       document-end
// @require      http://code.jquery.com/jquery-1.8.3.min.js
// @include      /^(https://live\.bilibili\.com/*)
// ==/UserScript==

(function() {
    var interval = 100;                 // 屏蔽周期，单位毫秒，默认100
    var color_change = true;            // 是否统一弹幕颜色为白色，默认开启
    var bottom_block = true;            // 是否屏蔽底端弹幕，默认开启
    var bottom_height = 0.2;            // 底端弹幕屏蔽范围，默认屏蔽底端20%区域的弹幕
    var img_block = true;               // 是否屏蔽图片弹幕（表情动画），默认开启

    setInterval(function() {
        var height = $(".danmaku-item-container").height();
        $(".bilibili-danmaku").each(function() {
            var danmu = $(this);
            var top = danmu.css("top").replace("px", "");

            if (color_change) {
                danmu.css("color", "rgb(255, 255, 255)");
            }

            if (img_block) {
                if (danmu.find("img").length > 0) {
                    danmu.hide();
                }
            }

            if (bottom_block) {
                if (height != null && top * 1.0 / height > (1 - bottom_height)) {
                    danmu.hide();
                }
            }
        });
    }, interval);
})();
