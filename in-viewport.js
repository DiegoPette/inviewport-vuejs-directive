import Vue from 'vue';

export const inviewport = {
    inserted: function (el,binding) {
        //DATA
        var elem = null;
        var viewport = null;
        var scrollY = null;
        var elementPos = null;
        var viewportBottomMargin = 0;
        var viewportTopMargin = 0;
        var once = false;

        var debugMode = false;

        //CHECK OPTIONS
        var opt = binding.value;
        if(opt){
            if(opt.vMarginTop){
                viewportTopMargin = +opt.vMarginTop;
            }
            if(opt.vMarginBottom){
                viewportBottomMargin = +opt.vMarginBottom;
            }
            if(opt.once){
                once = opt.once;
            }
            if(opt.debugMode){
                debugMode = true;
                var terminal = document.createElement("div");
                terminal.style.cssText = "position: fixed;top:0;right:0;background-color:#000;color: #fff;width: 300px;height: 300px;z-index: 100;opacity: .8;padding:15px;";
                document.body.appendChild(terminal);
                
                var marginTop = document.createElement("div");
                marginTop.style.cssText = "position:fixed;height: 1px;width: 100%;background-color: red;left:0;z-index: 50;top:"+viewportTopMargin+"px;";
                document.body.appendChild(marginTop);

                var marginBottom = document.createElement("div");
                marginBottom.style.cssText = "position:fixed;height: 1px;width: 100%;background-color: red;left:0;z-index: 50;bottom:"+viewportBottomMargin+"px;";
                document.body.appendChild(marginBottom);
            }
            if(debugMode){
                console.log('OPTIONS ARE SET');
                console.log(opt);
            }
        }

        //FUNCTIONS
        var getElemClientRect = function(){
            return JSON.parse(JSON.stringify(el.getBoundingClientRect()));
        };

        var getViewportHeight = function(){
            var _viewportheight;
            if (typeof window.innerHeight != 'undefined'){
                _viewportheight = window.innerHeight
            } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientHeight != 'undefined' && document.documentElement.clientHeight != 0){
                _viewportheight = document.documentElement.clientHeight
            }else {
                _viewportheight = document.getElementsByTagName('body')[0].clientHeight
            }
            return _viewportheight;
        };

        var getScrollY = function(){
            var _scrollY;
            if(window.scrollY){
                _scrollY = window.scrollY;
            } else {
                _scrollY = document.documentElement.scrollTop;
            }
            return _scrollY;
        };

        var checkPosition = function(){
            var _position;
            if(elem.top > (viewport - viewportBottomMargin)){  // 1
                _position = 'below-viewport';
            } else if(elem.top <= (viewport - viewportBottomMargin) && elem.top > (0 + viewportTopMargin) && elem.bottom > (viewport - viewportBottomMargin) ){ // 2
                _position = 'partially-in-viewport-bottom';
            } else if(elem.top < (0 + viewportTopMargin) && elem.bottom > (viewport - viewportBottomMargin) ) { // 3
                _position = 'partially-in-viewport-middle';
            } else if(elem.top < (viewport - viewportBottomMargin) && elem.top >= (0 + viewportTopMargin) && elem.bottom <= (viewport - viewportBottomMargin)){ // 4
                _position = 'fully-in-viewport';
            } else if(elem.top < (0 + viewportTopMargin) && elem.bottom < (viewport - viewportBottomMargin) && elem.bottom > (0 + viewportTopMargin)){ // 5
                _position = 'partially-in-viewport-top';
            } else if(elem.top < (0 + viewportTopMargin) && elem.bottom <= (0 + viewportTopMargin)){ // 6
                _position = 'above-viewport';
            }
            return _position;
        };

        //CLASS TOGGLER
        var classToggler = function(){
            if(!el.classList.contains(elementPos)){
                el.classList.remove('below-viewport');
                el.classList.remove('partially-in-viewport-bottom');
                if(!once){
                    el.classList.remove('partially-in-viewport-middle');
                }
                if(!once){
                    el.classList.remove('fully-in-viewport');
                }
                el.classList.remove('partially-in-viewport-top');
                el.classList.remove('above-viewport');

                el.classList.add(elementPos);
            }
            if(debugMode){
                console.log(el.classList);
            }
        };

        //UPDATE FUNCTION
        var updatePositions = function(){
            elem = getElemClientRect();
            viewport = getViewportHeight();
            scrollY = getScrollY();
            elementPos = checkPosition();
            if(debugMode){
                console.log('--------------------------')
                console.log('elem.top = '+elem.top);
                console.log('elem.bottom = '+elem.bottom);
                console.log('viewport = '+viewport);
                console.log('scrollY = '+scrollY);
                console.log('viewportTopMargin = '+viewportTopMargin);
                console.log('viewportBottomMargin = '+viewportBottomMargin);
                console.log('elementPos = '+elementPos);
                var html = '';
                html += 'viewport = '+viewport+'<br />';
                html += 'scrollY = '+scrollY+'<br />';
                html += 'viewportTopMargin = '+viewportTopMargin+'<br />';
                html += 'viewportBottomMargin = '+viewportBottomMargin+'<br />';
                html += 'elem.top = '+elem.top+'<br />';
                html += 'elem.bottom = '+elem.bottom+'<br />';
                html += 'elementPos = '+elementPos+'<br />';
                terminal.innerHTML = html;
            }
            classToggler();
        };

        //EVENT HANDLER
        var eventHandler = function(){
            updatePositions();
        };

        //LISTENERS
        window.addEventListener('scroll', eventHandler);
        window.addEventListener('resize', eventHandler);

        //ONINSERTED
        updatePositions();
    },
    unbind: function (){
        window.removeEventListener('scroll', eventHandler);
        window.removeEventListener('resize', eventHandler);
    }
  };

Vue.directive('in-viewport', inviewport);