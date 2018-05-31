<style>
/**
* coupon styles
*/
.coupon {
position: relative; }
.coupon--bottom {
animation-iteration-count: 3;
margin-bottom: -25.67em;
height: 28.9em;
position: fixed;
padding: 0.68em 0.17em;
width: 100%;
bottom: 0;
z-index: 1000000;
background: #fd5800;
padding: 0.17em;
text-align: center;
cursor: pointer;
border-top-left-radius: 6px;
border-top-right-radius: 6px;
text-shadow: 0px 0px 1px #000;
font-size: 1.2rem;
box-shadow: 0px 2px 2px 2px #333; }
@media (min-width: 600px) {
.coupon--bottom {
width: 400px;
left: 50%;
margin-left: -200px; } }
.coupon--bottom .coupon__title {
margin: 0 1rem;
color: #fff;
display: inline-block; }
.coupon--bottom .coupon__value {
font-size: 2rem; }
.coupon--bottom .coupon__advices {
font-size: 1rem;
color: #fff; }
.coupon--bottom .coupon__ps {
font-size: 2rem;
color: #fff;
font-weight: bold; }
.coupon--bottom .countDown {
color: #fff; }
.coupon--bottom .countDown h6 {
color: #fff; }
.coupon--bottom .countDown .countDown__ctn {
background: #3d255b;
display: inline-block;
margin: 0 auto;
width: 250px;
padding: 0.17em 0.34em;
border-radius: 3px;
margin-top: 0.34em;
letter-spacing: 0.34em; }
.coupon--bottom .icon--couponStar {
fill: #cc6200;
width: 2em;
display: inline-block; }
.coupon--bottom .coupon__closer {
position: absolute;
top: 0.34em;
right: 0.34em;
display: inline-block; }
.coupon--bottom .icon--couponClose {
fill: #fff;
width: 0.85em;
height: 0.85em; }
.coupon--bottom .icon--couponClose:hover {
fill: #fff; }
.coupon--bottom .coupon__content {
color: #fff;
margin-top: 1.7em;
margin-left: -0.17em;
margin-right: -0.17em;
border-top: dashed 2px #fff;
border-bottom: dashed 2px #fff;
padding-top: 0.68em;
background: #3d255b;
margin-bottom: 0.68em; }
.coupon--bottom .coupon__id {
font-size: 3rem;
display: inline-block;
padding: 0 0.34em;
background: #fff;
text-align: center;
border: solid 4px #6e42a4;
color: #3d255b;
border-radius: 6px; }

.animated {
-webkit-animation-duration: 1.5s;
animation-duration: 1.5s;
-webkit-animation-delay: 10s;
-webkit-animation-fill-mode: initial;
animation-fill-mode: initial; }

.animated.infinite {
-webkit-animation-iteration-count: infinite;
animation-iteration-count: infinite; }

@keyframes bounce {
from,
20%,
53%,
80%,
to {
animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
transform: translate3d(0, 0, 0); }
40%,
43% {
animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
transform: translate3d(0, -30px, 0); }
70% {
animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
transform: translate3d(0, -15px, 0); }
90% {
transform: translate3d(0, -4px, 0); } }

.bounce {
animation-name: bounce;
transform-origin: center bottom; }
</style>

<div class="coupon bounce animated  coupon--bottom" data-qcontent="component__coupon"><span class="coupon__closer">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">
<g>
</g>
	<path d="M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z" />
</svg></span>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 488.027 488.027" style="enable-background:new 0 0 488.027 488.027;" xml:space="preserve">
<g>
    <g>
        <circle cx="179.163" cy="202.563" r="20.4"/>
        <circle cx="308.763" cy="285.363" r="20.4"/>
        <path d="M476.963,270.963l-7.4-10.1c-8-11-8.2-25.9-0.3-37.1l7.2-10.2c11-15.6,5.9-37.3-11-46.4l-11-5.9
			c-12-6.4-18.6-19.8-16.3-33.3l2.1-12.3c3.2-18.8-10.9-36.2-30-37l-12.5-0.5c-13.6-0.6-25.4-9.8-29.2-22.9l-3.5-12
			c-5.3-18.4-25.5-27.9-43.1-20.3l-11.5,4.9c-12.5,5.4-27.1,2.2-36.2-8l-8.3-9.3c-12.7-14.2-35-14.1-47.6,0.4l-8.2,9.4
			c-9,10.3-23.5,13.7-36.1,8.5l-11.6-4.8c-17.7-7.3-37.7,2.6-42.8,21l-3.3,12.1c-3.6,13.2-15.2,22.6-28.8,23.3l-12.5,0.7
			c-19.1,1.1-32.9,18.7-29.4,37.5l2.3,12.3c2.5,13.4-3.9,26.9-15.8,33.5l-10.9,6.1c-16.7,9.3-21.5,31.1-10.2,46.5l7.4,10.1
			c8,11,8.2,25.9,0.3,37.1l-7.2,10.2c-11,15.6-5.9,37.3,11,46.4l11,5.9c12,6.4,18.6,19.8,16.3,33.3l-2.1,12.3
			c-3.2,18.8,10.9,36.2,30,37l12.5,0.5c13.6,0.6,25.4,9.8,29.2,22.9l3.5,12c5.3,18.4,25.5,27.9,43.1,20.3l11.5-4.9
			c12.5-5.4,27.1-2.2,36.2,8l8.3,9.3c12.8,14.2,35.1,14.1,47.6-0.4l8.2-9.4c9-10.3,23.5-13.7,36.1-8.5l11.6,4.8
			c17.7,7.3,37.7-2.6,42.8-21l3.3-12.1c3.6-13.2,15.2-22.6,28.8-23.3l12.5-0.7c19.1-1.1,32.9-18.7,29.4-37.5l-2.3-12.3
			c-2.5-13.4,3.9-26.9,15.8-33.5l10.9-6.1C483.463,308.263,488.263,286.463,476.963,270.963z M129.863,202.563
			c0-27.2,22-49.2,49.2-49.2s49.2,22,49.2,49.2s-22,49.2-49.2,49.2S129.863,229.663,129.863,202.563z M188.563,329.463
			c-4.2,5.1-11.8,5.8-16.9,1.6l0,0c-5.1-4.2-5.8-11.8-1.6-16.9l129.1-155.5c4.2-5.1,11.8-5.8,16.9-1.6s5.8,11.8,1.6,16.9
			L188.563,329.463z M308.763,334.563c-27.2,0-49.2-22-49.2-49.2s22-49.2,49.2-49.2s49.2,22,49.2,49.2
			S335.963,334.563,308.763,334.563z"/>
    </g>
</g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
</svg>

    <h6 class="coupon__title"> <span class="coupon__value">10%  </span>ПРОМОКОД</h6>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 488.027 488.027" style="enable-background:new 0 0 488.027 488.027;" xml:space="preserve">
<g>
    <g>
        <circle cx="179.163" cy="202.563" r="20.4"/>
        <circle cx="308.763" cy="285.363" r="20.4"/>
        <path d="M476.963,270.963l-7.4-10.1c-8-11-8.2-25.9-0.3-37.1l7.2-10.2c11-15.6,5.9-37.3-11-46.4l-11-5.9
			c-12-6.4-18.6-19.8-16.3-33.3l2.1-12.3c3.2-18.8-10.9-36.2-30-37l-12.5-0.5c-13.6-0.6-25.4-9.8-29.2-22.9l-3.5-12
			c-5.3-18.4-25.5-27.9-43.1-20.3l-11.5,4.9c-12.5,5.4-27.1,2.2-36.2-8l-8.3-9.3c-12.7-14.2-35-14.1-47.6,0.4l-8.2,9.4
			c-9,10.3-23.5,13.7-36.1,8.5l-11.6-4.8c-17.7-7.3-37.7,2.6-42.8,21l-3.3,12.1c-3.6,13.2-15.2,22.6-28.8,23.3l-12.5,0.7
			c-19.1,1.1-32.9,18.7-29.4,37.5l2.3,12.3c2.5,13.4-3.9,26.9-15.8,33.5l-10.9,6.1c-16.7,9.3-21.5,31.1-10.2,46.5l7.4,10.1
			c8,11,8.2,25.9,0.3,37.1l-7.2,10.2c-11,15.6-5.9,37.3,11,46.4l11,5.9c12,6.4,18.6,19.8,16.3,33.3l-2.1,12.3
			c-3.2,18.8,10.9,36.2,30,37l12.5,0.5c13.6,0.6,25.4,9.8,29.2,22.9l3.5,12c5.3,18.4,25.5,27.9,43.1,20.3l11.5-4.9
			c12.5-5.4,27.1-2.2,36.2,8l8.3,9.3c12.8,14.2,35.1,14.1,47.6-0.4l8.2-9.4c9-10.3,23.5-13.7,36.1-8.5l11.6,4.8
			c17.7,7.3,37.7-2.6,42.8-21l3.3-12.1c3.6-13.2,15.2-22.6,28.8-23.3l12.5-0.7c19.1-1.1,32.9-18.7,29.4-37.5l-2.3-12.3
			c-2.5-13.4,3.9-26.9,15.8-33.5l10.9-6.1C483.463,308.263,488.263,286.463,476.963,270.963z M129.863,202.563
			c0-27.2,22-49.2,49.2-49.2s49.2,22,49.2,49.2s-22,49.2-49.2,49.2S129.863,229.663,129.863,202.563z M188.563,329.463
			c-4.2,5.1-11.8,5.8-16.9,1.6l0,0c-5.1-4.2-5.8-11.8-1.6-16.9l129.1-155.5c4.2-5.1,11.8-5.8,16.9-1.6s5.8,11.8,1.6,16.9
			L188.563,329.463z M308.763,334.563c-27.2,0-49.2-22-49.2-49.2s22-49.2,49.2-49.2s49.2,22,49.2,49.2
			S335.963,334.563,308.763,334.563z"/>
    </g>
</g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
</svg>

    <div class="coupon__content">
        <p class="text"> До 31 марта! <br/> Дополнительная праздничная скидка <br/><span class="coupon__value">10% по промокоду: <br/></span><span class="coupon__id"><br/></span></p>
    </div>
    <div class="countDown">
        <h6 class="countDown__header">До конца действия акции осталось:</h6>
        <div class="countDown__ctn  countDown--coupon--bottom" id="countDowncoupon--bottom" data-qcontent="component__countDown"></div>
    </div>
    <p class="text coupon__advices">
        Воспользуйтесь купоном, введя его номер в соответствующее поле на странице корзины.</p>
    <p class="coupon__ps"></p>
</div>

/*!
* The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
* Copyright (c) 2016 Edson Hilios
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
* the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
* FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
* IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){var b=a.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(b)}function d(a){return function(b){var d=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(d)for(var f=0,g=d.length;f<g;++f){var h=d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),j=c(h[0]),k=h[1]||"",l=h[3]||"",m=null;h=h[2],i.hasOwnProperty(h)&&(m=i[h],m=Number(a[m])),null!==m&&("!"===k&&(m=e(l,m)),""===k&&m<10&&(m="0"+m.toString()),b=b.replace(j,m.toString()))}return b=b.replace(/%%/,"%")}}function e(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),Math.abs(b)>1?c:d}var f=[],g=[],h={precision:100,elapse:!1,defer:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var i={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},j=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.options=a.extend({},h),this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&("function"==typeof d?(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)):this.options=a.extend({},h,d)),this.setFinalDate(c),this.options.defer===!1&&this.start()};a.extend(j.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var b,c=void 0!==a._data(this.el,"events"),d=new Date;b=this.finalDate.getTime()-d.getTime(),b=Math.ceil(b/1e3),b=!this.options.elapse&&b<0?0:Math.abs(b),this.totalSecsLeft!==b&&c&&(this.totalSecsLeft=b,this.elapsed=d>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-d.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish")))},dispatchEvent:function(b){var c=a.Event(b+".countdown");c.finalDate=this.finalDate,c.elapsed=this.elapsed,c.offset=a.extend({},this.offset),c.strftime=d(this.offset),this.$el.trigger(c)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];j.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new j(this,b[0],b[1])})}});

/**
* COMPONRNT: coupon script
*/
;$(document).ready(function(){

$('#countDowncoupon--bottom')
.countdown("2018/04/1", function(event) {
$(this).text(
event.strftime('%D Дней %H:%M:%S')
);
});

var cbCloser = $('.coupon__closer','.coupon--bottom');
cbCloser.on('click',function(e){
$('.coupon--bottom').remove();

});
$(".coupon--bottom").on('click',function(event){
var _this =  $(this);
_this.removeClass('animated');
_this.animate({'marginBottom': '0px'}, 500);
});
});
