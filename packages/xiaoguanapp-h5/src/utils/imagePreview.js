/* eslint-disable */

(function( global, factory ) {
  //For CommonJS and CommonJS-like
  if ( typeof module === "object" && typeof module.exports === "object" ) {
      module.exports = global.document ?
          factory( global, true ) :
          function( w ) {
              if ( !w.document ) {
                  throw new Error( "previewImage requires a window with a document" );
              }
              return factory( w );
          };
  } else {
      factory( global );
  }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function(window){
  var $ = {};
  var style = "#__previewImage-container{-ms-touch-action:none;touch-action:none;-webkit-touch-action:none;line-height:100vh;background-color:#000;width:100vw;height:100vh;position:fixed;overflow:hidden;top:0;left:0;z-index: 2147483647;transition:transform .3s;-ms-transition:transform .3s;-moz-transition:transform .3s;-webkit-transition:transform .3s;-o-transition:transform .3s;transform:translate3d(100%,0,0);-webkit-transform:translate3d(100%,0,0);-ms-transform:translate3d(100%,0,0);-o-transform:translate3d(100%,0,0);-moz-transform:translate3d(100%,0,0)}#__previewImage-container .previewImage-text{position:absolute;top:.6em;text-align:center;font-size:18px;line-height:25px;color:#fff;z-index:10;padding: 0.2em 0.4em;background-color: rgba(255,255,255,0.4);border-radius: 50%;letter-spacing: 0;right:.8em}#__previewImage-container .previewImage-text .previewImage-text-index{font-size: 24px;}#__previewImage-container .previewImage-box{width:999999rem;height:100vh}#__previewImage-container .previewImage-box .previewImage-item{width:100vw;height:100vh;margin-right:15px;float:left;text-align:center;background:url(http://static.luyanghui.com/svg/oval.svg) no-repeat center/auto}#__previewImage-container .previewImage-box .previewImage-item.previewImage-nobackground{background:none}#__previewImage-container .previewImage-box .previewImage-item .previewImage-image{vertical-align:middle;width:100%}";
  $.isArray = function(value) {
    return Object.prototype.toString.call(value) == '[object Array]';
  }
  /**
   * get multiple elements
   * @public
   */
  $.all = function(selector, contextElement) {
    var nodeList,
      list = [];
    if (contextElement) {
      nodeList = contextElement.querySelectorAll(selector);
    } else {
      nodeList = document.querySelectorAll(selector);
    }
    if (nodeList && nodeList.length > 0) {
      list = Array.prototype.slice.call(nodeList);
    }
    return list;
  }

  /**
   * delegate an event to a parent element
   * @public
   * @param  array     $el        parent element
   * @param  string    eventType  name of the event
   * @param  string    selector   target's selector
   * @param  function  fn
   */
  $.delegate = function($el, eventType, selector, fn) {
    if (!$el) { return; }
    $el.addEventListener(eventType, function(e) {
      var targets = $.all(selector, $el);
      if (!targets) {
        return;
      }
      for (var i=0; i<targets.length; i++) {
        var $node = e.target;
        while ($node) {
          if ($node == targets[i]) {
            fn.call($node, e);
            break;
          }
          $node = $node.parentNode;
          if ($node == $el) {
            break;
          }
        }
      }
    }, false);
  };
  var _previewImage = function(){
      this.winw = window.innerWidth||document.body.clientWidth;  //???????????????
      this.winh = window.innerHeight||document.body.clientHeight; //???????????????
      this.originWinw = this.winw;    //????????????????????????
      this.originWinh = this.winh;    //????????????????????????
      this.marginRight = 15;  //?????????????????????->previewImage-item???margin-right
      this.imageChageMoveX = this.marginRight+this.winw;  //?????????????????????x?????????
      this.imageChageNeedX = Math.floor(this.winw*(0.5)); //??????????????????x?????????
      this.cssprefix = ["","webkit","Moz","ms","o"]; //css??????
      this.version = '1.0.3'; //?????????
      this.imgLoadCache = new Object();  //???????????????????????? key=md5(img.src),value={isload:true,elem:img};
      this.scale = 1;     //????????????????????????
      this.maxScale = 4;  //??????????????????????????????
      this.maxOverScale = 6;  //?????????????????????????????????
      // this.minScale = 0.5; //???????????????????????????
      this.openTime = 0.3;    //??????????????????????????????
      this.slipTime = 0.3;    //??????????????????
      this.maxOverWidthPercent = 0.5; //????????????????????????????????????????????????????????????
      this.$box = false;  //????????????????????????
      this.isPreview = false; //????????????????????????
      var $style = document.createElement('style');   //????????????
      $style.innerText = style;   //????????????
      $style.type = 'text/css';
      this.$container = document.createElement('div');    //????????????
      this.$container.id = '__previewImage-container';    //????????????id
      this.$container.style.width = this.winw+'px';   //????????????
      this.$container.style.height = this.winh+'px';  //????????????
      document.body.appendChild(this.$container);     //???????????????body
      document.head.appendChild($style);              //???????????????head
      this.bind();    //????????????
  }
  _previewImage.prototype.start = function(obj){  //????????? todo
      var urls = obj.urls;    //????????????????????????
      var current = obj.current;  //???????????????????????????

      this.$container.innerHTML = ''; //????????????
      if(!urls||!$.isArray(urls)||urls.length==0){    //????????????
          throw new Error("urls must be a Array and the minimum length more than zero");
          return
      }
      if(!current){   //????????????
          this.index = 0; 
          console.warn("current is empty,it will be the first value of urls!");
      }else{
          var index = urls.indexOf(current);
          if(index<0){
              index = 0;
              console.warn("current isnot on urls,it will be the first value of urls!");
          }
          this.index = index; //??????????????????
      }
      this.urls = urls;   //????????????url??????
      this.maxLen = urls.length-1;  //??????????????? 0<=index<=maxLen
      this.cIndex = this.maxLen+1;    //containerIndex
      this.bIndex = this.maxLen+2;    //boxIndex
      this.imgStatusCache = new Object(); //??????????????????
      this.render();                //??????????????????
  }

  _previewImage.prototype.render = function(){
      var _this = this;
      if(this.$box===false){  //??????????????????
          var box = document.createElement('div');
          box.className += 'previewImage-box';
          this.$box = box; //??????????????????
      }else{
          this.$box.innerHTML = '';  //??????????????????-????????????
      }
      var text = document.createElement('div');   //????????????/?????????--????????????
      this.$text = text;
      this.$text.className += 'previewImage-text';
      this.$text.innerHTML = "<span class='previewImage-text-index'>"+(this.index+1)+"/</span>"+(this.maxLen+1);    //???????????????/????????????
      this.container = this.imgStatusCache[this.cIndex] = {elem:this.$container,x:this.winw,y:0,m:0,my:0,scale:1,scalem:1}; //??????????????????
      this.box = this.imgStatusCache[this.bIndex] = {elem:this.$box,x:0,y:0,m:0,my:0,scale:1,scalem:1};   //????????????????????????
      this.urls.forEach(function(v,i){    //??????
          var div = document.createElement('div');
          var hash = window.md5?md5(v+i):v+i;
          var img;
          var imgCache = _this.imgLoadCache[hash];
          //????????????&&??????????????????
          if(imgCache&&imgCache.isload){    //???????????????--????????????
              img = imgCache.elem;
              div.className+=" previewImage-nobackground";
          }else{  //???????????????--???????????????????????????
              img = new Image();
              img.className += 'previewImage-image';
              _this.imgLoadCache[hash] = {isload:false,elem:img};
              if(i == _this.index){   //????????????????????????????????????
                  img.src = v;
                  img.onload = function(){
                      div.className+=" previewImage-nobackground";
                      _this.imgLoadCache[hash].isload = true;
                  }
              }
          }
          _this.imgStatusCache[i] = {hash:hash,x:0,m:0,y:0,my:0,scale:_this.scale,scalem:1};  //??????????????????
          // img.setAttribute("data-index",i);  //?????????
          div.className+=' previewImage-item';
          div.appendChild(img);
          _this.$box.appendChild(div); //?????????div?????? ????????????
      })
      
      this.$container.appendChild(this.$box);    //??????????????????
      this.$container.appendChild(this.$text);    //????????????????????????
      var offsetX = -this.imageChageMoveX*this.index;  //????????????????????????????????????????????????
      this.box.x = offsetX;   //??????????????????????????????????????????????????????
      this.container.x = 0;   //??????????????????
      this.$container.style.display = "block";
      setTimeout(function(){
          _this.translateScale(_this.bIndex,0);
          _this.translateScale(_this.cIndex,_this.openTime);
          _this.isPreview = true;
      },50);
  }

  _previewImage.prototype.bind = function(){
      var $container = this.$container;
      var _this = this;
      var closePreview = function(){
          _this.closePreview.call(_this);
      }
      var touchStartFun = function(){
          _this.touchStartFun.call(_this);
      }
      var touchMoveFun = function(){
          _this.touchMoveFun.call(_this);
      }
      var touchEndFun = function(){
          _this.touchEndFun.call(_this);
      }

      // var orientationChangeFun = function(){
      //     var angle = screen.orientation.angle;
      //     var _this = this;
      //     if(angle==90||angle==180){
      //         _this.winw = _this.originWinh;
      //         _this.winh = _this.originWinw;
      //     }else{
      //         _this.winw = _this.originWinw;
      //         _this.winh = _this.originWinh;
      //     }
      //     _this.$container.style.width = _this.winw+'px';   //????????????
      //     _this.$container.style.height = _this.winh+'px';  //????????????
      //     _this.imageChageMoveX = _this.marginRight+_this.winw;
      //     var offsetX = -_this.imageChageMoveX*_this.index;  //????????????????????????????????????????????????
      //     try{
      //         _this.box.x = offsetX;   //??????????????????????????????????????????????????????
      //         _this.translateScale(_this.bIndex,0);
      //     }catch(e){}
      // }.bind(this);

      var reSizeFun = function(){
          var _this = this;
          _this.winw = window.innerWidth||document.body.clientWidth;  //???????????????
          _this.winh = window.innerHeight||document.body.clientHeight; //???????????????
          _this.originWinw = _this.winw;    //????????????????????????
          _this.originWinh = _this.winh;    //????????????????????????
          _this.$container.style.width = _this.winw+'px';   //????????????
          _this.$container.style.height = _this.winh+'px';  //????????????
          _this.imageChageMoveX = _this.marginRight+_this.winw;
          var offsetX = -_this.imageChageMoveX*_this.index;  //????????????????????????????????????????????????
          try{
              _this.box.x = offsetX;   //??????????????????????????????????????????????????????
              _this.translateScale(_this.bIndex,0);
          }catch(e){}
      }.bind(this);

      // window.addEventListener("orientationchange",orientationChangeFun,false);
      window.addEventListener("resize",reSizeFun,false);
      $.delegate($container,'click','.previewImage-item',closePreview);
      $.delegate($container,'touchstart','.previewImage-item',touchStartFun);
      $.delegate($container,'touchmove','.previewImage-item',touchMoveFun);
      $.delegate($container,'touchend','.previewImage-item',touchEndFun);
      $.delegate($container,'touchcancel','.previewImage-item',touchEndFun);
  }

  _previewImage.prototype.closePreview = function(){
      var _this = this;
      this.imgStatusCache[this.cIndex].x = this.winw;
      this.translateScale(this.cIndex,this.openTime);
      this.imgStatusRewrite();
      this.translateScale(this.index,this.slipTime);
      setTimeout(function(){
          _this.$container.style.display = "none";
      },this.slipTime*1000);
      _this.isPreview = false;
  }

  _previewImage.prototype.touchStartFun = function(imgitem){
      this.ts = this.getTouches();
      this.allowMove = true;  //????????????
      this.statusX = 0; //??????X???????????????
      this.statusY = 0; //??????Y???????????????
  }

  _previewImage.prototype.touchMoveFun = function(imgitem){
      this.tm = this.getTouches();
      var tm = this.tm;
      var ts = this.ts;
      this.moveAction(ts,tm);
  }

  _previewImage.prototype.touchEndFun = function(imgitem){
      var $container = this.$container;
      this.te = this.getTouches();
      this.endAction(this.ts,this.te);
  }

  _previewImage.prototype.moveAction = function(ts,tm){
      if(!this.allowMove){
          return
      }
      var imgStatus = this.getIndexImage();
      var maxWidth = this.winw*0.3/imgStatus.scale;
      var x0_offset = tm.x0 - ts.x0;
      var y0_offset = tm.y0 - ts.y0;
      if(Math.abs(y0_offset)>0){  //??????Ios????????????????????????????????????
          event.preventDefault();
      }
      var imgPositionX = imgStatus.x+x0_offset;
      var imgPositionY = imgStatus.y+y0_offset;
      var allow = this.getAllow(this.index);
      var allowX = this.allowX = allow.x;
      var allowY = this.allowY = allow.y0;
      if(x0_offset<=0){  //??????
          this.allowX = -allowX;
      }
      if(y0_offset<=0){   //??????
          allowY = this.allowY = allow.y1;
      }
      if(tm.length==1){   //?????????(????????????)
          if(imgStatus.scale>1){ 
              //Y????????????
              if(imgPositionY>=allow.y0){  //?????????????????????
                  this.statusY = 1;
                  var overY = imgPositionY - allow.y0;
                  imgStatus.my = allow.y0-imgStatus.y+this.getSlowlyNum(overY,maxWidth);
              }else if(imgPositionY<=allow.y1){ //?????????????????????
                  this.statusY = 1;
                  var overY = imgPositionY - allow.y1;
                  imgStatus.my = allow.y1-imgStatus.y+this.getSlowlyNum(overY,maxWidth); 
              }else{
                  this.statusY = 2;
                  imgStatus.my = y0_offset;
              }
              
              //X????????????
              if(x0_offset<0&&imgStatus.x<=-allowX){ //??????->????????????????????????????????????->??????????????????????????????-???????????????
                  this.statusX = 1;
                  this.box.m = x0_offset; //??????????????????
                  if(this.index==this.maxLen){ //box???????????????
                      this.box.m = this.getSlowlyNum(x0_offset);  //????????????
                  }
                  this.translateScale(this.bIndex,0);
                  this.translateScale(this.index,0);
              }else if(x0_offset>0&&imgStatus.x>=allowX){    //??????->????????????????????????????????????->??????????????????????????????-???????????????
                  this.statusX = 2;
                  this.box.m = x0_offset;
                  if(this.index==0){ //box???????????????
                      this.box.m = this.getSlowlyNum(x0_offset);  //????????????
                  }
                  this.translateScale(this.bIndex,0);
                  this.translateScale(this.index,0);
              }else{  //????????????????????????->???????????????????????????->????????????
                  if(x0_offset==0){
                      return
                  }
                  this.statusX = 3;
                  imgStatus.m = x0_offset;
                  if(imgPositionX>=allowX){   //?????????????????????
                      this.statusX = 4;
                      var overX = imgPositionX - allowX;
                      imgStatus.m = allowX-imgStatus.x+this.getSlowlyNum(overX,maxWidth);
                  }
                  if(imgPositionX<=-allowX){  //?????????????????????
                      this.statusX = 4;
                      var overX = imgPositionX + allowX;
                      imgStatus.m = -allowX-imgStatus.x+this.getSlowlyNum(overX,maxWidth);
                  }
                  this.translateScale(this.index,0);
              }
          }else{  //scale == 1;
              if(Math.abs(y0_offset)>5&&this.statusX != 5){  //???????????????
                  var $img = this.getJqElem(this.index);
                  var imgBottom = $img.height-this.winh;
                  if(y0_offset>0&&imgPositionY>0){
                      this.statusX = 7;
                      this.allowY = 0;
                      imgStatus.my = - imgStatus.y + this.getSlowlyNum(imgPositionY,maxWidth);
                  }else if(y0_offset<0&&imgPositionY<-imgBottom){
                      this.statusX = 7;
                      if($img.height>this.winh){
                          var overY = imgPositionY + imgBottom;
                          this.allowY = -imgBottom;
                          imgStatus.my = -imgBottom - imgStatus.y + this.getSlowlyNum(overY,maxWidth);
                      }else{
                          this.allowY = 0;
                          imgStatus.my = - imgStatus.y + this.getSlowlyNum(imgPositionY,maxWidth);
                      }
                  }else{

                      this.statusX = 6;
                      imgStatus.my = y0_offset;
                  }
                  this.translateScale(this.index,0);
              }else{
                  if(this.statusX == 6){
                      return
                  }
                  this.statusX = 5;
                  if((this.index==0&&x0_offset>0)||(this.index==this.maxLen&&x0_offset<0)){ //box??????????????????
                      this.box.m = this.getSlowlyNum(x0_offset);
                  }else{
                      this.box.m = x0_offset;
                  }
                  this.translateScale(this.bIndex,0);
              }
          }
      }else{  //?????????(??????????????????)
          var scalem = this.getScale(ts,tm)
          var scale = scalem*imgStatus.scale;
          if(scale>=this.maxScale){  //????????????????????????
              var over = scale - this.maxScale;
              scale = this.maxScale+this.getSlowlyNum(over,this.maxOverScale);
              scalem = scale/imgStatus.scale;
          }
          imgStatus.scalem = scalem;
          this.translateScale(this.index,0);
      }
  }

  _previewImage.prototype.endAction = function(ts,te){
      var imgStatus = this.getIndexImage();
      var x0_offset = te.x0 - ts.x0;
      var y0_offset = te.y0 - ts.y0;
      var time = te.time - ts.time;
      var slipTime = 0;
      this.allowMove = false; //??????????????????
      if(ts.length==1){      //?????????(????????????)
          if(Math.abs(x0_offset)>10){ //????????????????????????
              event.preventDefault();
          }
          switch(this.statusY){
              case 1:
                  imgStatus.y = this.allowY;
                  imgStatus.my = 0;
                  slipTime = this.slipTime;
              break
              case 2:
                  imgStatus.y = imgStatus.y+imgStatus.my;
                  imgStatus.my = 0;
              break
          }

          switch(this.statusX){
              case 1: //??????->????????????????????????????????????->??????????????????????????????-???????????????
                  if(this.index!=this.maxLen&&(x0_offset<=-this.imageChageNeedX||(time<200&&x0_offset<-30))){    //?????????
                      this.changeIndex(1);
                  }else{
                      this.changeIndex(0);
                      if(slipTime!=0){
                          this.translateScale(this.index,slipTime);
                      }
                  }
              break
              case 2: //??????->????????????????????????????????????->??????????????????????????????-???????????????
                  if(this.index!=0&&(x0_offset>=this.imageChageNeedX||(time<200&&x0_offset>30))){ //?????????
                      this.changeIndex(-1);
                  }else{
                      this.changeIndex(0);
                      if(slipTime!=0){
                          this.translateScale(this.index,slipTime);
                      }
                  }
              break
              case 3: //scale>1,????????????????????????->??????????????????????????????
                  imgStatus.x = imgStatus.x+imgStatus.m;
                  imgStatus.m = 0;
                  this.translateScale(this.index,slipTime);
              break
              case 4: //scale>1,????????????????????????->???????????????????????????->????????????
                  imgStatus.x = this.allowX;
                  imgStatus.m = 0;
                  slipTime = this.slipTime;
                  this.translateScale(this.index,slipTime);
              break
              case 5: //scale=1,box?????????????????????
                  if(x0_offset>=this.imageChageNeedX||(time<200&&x0_offset>30)){    //?????????
                      this.changeIndex(-1);
                  }else if(x0_offset<=-this.imageChageNeedX||(time<200&&x0_offset<-30)){ //?????????
                      this.changeIndex(1);
                  }else{
                      this.changeIndex(0);
                  }
              break
              case 6: //scale=1,?????????
                  imgStatus.y = imgStatus.y+imgStatus.my;
                  imgStatus.my = 0;
              break
              case 7: //scale=1,????????? ?????????
                  imgStatus.y = this.allowY;
                  imgStatus.my = 0;
                  this.translateScale(this.index,this.slipTime);
              break
          }
      }else{  // ??????????????????
          event.preventDefault();

          var scale = imgStatus.scale*imgStatus.scalem;
          var $img = this.getJqElem(this.index);
          imgStatus.scale = scale;
          var allow = this.getAllow(this.index);

          if(imgStatus.x>allow.x){
              slipTime = this.slipTime; 
              imgStatus.x = allow.x;
          }else if(imgStatus.x<-allow.x){
              slipTime = this.slipTime;
              imgStatus.x = -allow.x;
          }

          if(imgStatus.y>allow.y0){
              slipTime = this.slipTime; 
              imgStatus.y = allow.y0;
          }else if(imgStatus.y<allow.y1){
              slipTime = this.slipTime; 
              imgStatus.y = allow.y1;
          }

          if($img.height*imgStatus.scale<=this.winh){
              imgStatus.y = 0;
          }

          if($img.width*imgStatus.scale<=this.winw){
              imgStatus.x = 0;
          }

          imgStatus.scalem = 1;
          if(scale>this.maxScale){     //??????????????????????????????
              imgStatus.scale = this.maxScale;
              slipTime = this.slipTime;
          }else if(scale<1){//????????????1
              this.imgStatusRewrite();
              slipTime = this.slipTime;
          }
          if(slipTime!=0){
              this.changeIndex(0);
              this.translateScale(this.index,slipTime);
          }
      }
  };

  _previewImage.prototype.getAllow = function(index){
      var $img = this.getJqElem(index);
      var imgStatus = this.getIndexImage(index);
      var allowX = Math.floor(($img.width*imgStatus.scale-this.winw)/(2*imgStatus.scale));
      var allowY0,allowY1;
      if($img.height*imgStatus.scale<=this.winh){
          allowY0 = 0;
          allowY1 = 0;
      }else if($img.height<=this.winh){
          allowY0 = Math.floor(($img.height*imgStatus.scale-this.winh)/(2*imgStatus.scale));
          allowY1 = -allowY0;
      }else{
          allowY0 = Math.floor($img.height*(imgStatus.scale-1)/(2*imgStatus.scale));
          allowY1 = -Math.floor(($img.height*(imgStatus.scale+1)-2*this.winh)/(2*imgStatus.scale));
      }
      return {
          x:allowX,
          y0:allowY0,
          y1:allowY1,
      };
  };

  _previewImage.prototype.getSlowlyNum = function(x,maxOver){
      var maxOver = maxOver||this.winw*this.maxOverWidthPercent;
      if(x<0){
          x = -x;
          return -(1-(x/(maxOver+x)))*x;
      }else{
          return (1-(x/(maxOver+x)))*x;
      }
  };

  _previewImage.prototype.getScale = function(ts,tm){
      var fingerRangeS = Math.sqrt(Math.pow((ts.x1 - ts.x0),2)+Math.pow((ts.y1-ts.y0),2)); //????????????????????????
      var fingerRangeM = Math.sqrt(Math.pow((tm.x1 - tm.x0),2)+Math.pow((tm.y1-tm.y0),2)); //?????????????????????????????????
      var range = fingerRangeM/fingerRangeS;
      return range;
  };

  _previewImage.prototype.imgStatusRewrite = function(index){
      var index = index===undefined?this.index:index;
      var imgStatus = this.imgStatusCache[index];
      imgStatus.x = 0;
      imgStatus.y = 0;
      imgStatus.m = 0;
      imgStatus.my = 0;
      imgStatus.scale = 1;
      imgStatus.scalem = 1;
      if(index!=this.index){
          this.translateScale(index,this.slipTime);
      }
  }

  _previewImage.prototype.changeIndex = function(x){
      var imgStatus = this.getIndexImage();
      var oldIndex = this.index;
      var _this = this;
      if(this.index==0&&x==-1){
          this.index = this.index;
      }else if(this.index==this.maxLen&&x==1){
          this.index = this.index;
      }else{
          this.index+=x;
          this.$text.innerHTML = "<span class='previewImage-text-index'>"+(this.index+1)+"/</span>"+(this.maxLen+1);    //???????????????/????????????
          var hash = this.imgStatusCache[this.index].hash;
          var imgCache = this.imgLoadCache[hash];
          if(!imgCache.isload){    //??????????????????????????????
              imgCache.elem.src = this.urls[this.index];
              imgCache.elem.onload = function(){
                  imgCache.elem.parentNode.className+=" previewImage-nobackground";
                  imgCache.isload = true;
              }
          }else{
              imgCache.elem.parentNode.className+=" previewImage-nobackground";
          }
      }
      this.box.x = -this.imageChageMoveX*this.index;
      this.box.m = 0;
      if(oldIndex!=this.index){
          this.imgStatusRewrite(oldIndex);
      }
      this.translateScale(this.bIndex,this.slipTime);
  }

  _previewImage.prototype.getIndexImage = function(index){
      var index = index==undefined?this.index:index;
      return  this.imgStatusCache[this.index];
  }

  _previewImage.prototype.translateScale = function (index,duration){
      var imgStatus = this.imgStatusCache[index];
      $elem = this.getJqElem(index);
      var scale = imgStatus.scale*imgStatus.scalem;
      var offsetX = imgStatus.x+imgStatus.m;
      var offsetY = imgStatus.y+imgStatus.my;
      var tran_3d='scale3d('+scale+','+scale+',1) '+' translate3d(' + offsetX + 'px,' + offsetY + 'px,0px)';
      // var tran_2d='scale('+scale+','+scale+') '+' translate(' + offsetX + 'px,' + offsetY +'px)';
      var transition = 'transform '+duration+'s ease-out';
      this.addCssPrefix($elem,'transition',transition);
      this.addCssPrefix($elem,'transform',tran_3d);
  }

  _previewImage.prototype.getJqElem = function(index){
      var $elem;
      var index = index==undefined?this.index:index;
      if(index<=this.maxLen){
          var hash = this.imgStatusCache[index].hash;
          var img = this.imgLoadCache[hash].elem;
          $elem = img;
      }else{
          var elem = this.imgStatusCache[index].elem;
          $elem = elem;
      }

      return $elem
  }
  /**
   * [addCssPrefix ??????css??????]
   * @param {[elem]} elem  [element]
   * @param {[string]} prop  [css attribute]
   * @param {[string]} value [css value]
   */
  _previewImage.prototype.addCssPrefix = function(elem,prop,value){    //????????????todo
      for(var i in this.cssprefix){
          var cssprefix = this.cssprefix[i];
          if(cssprefix===""){
              prop = prop.toLowerCase();
          }else{
              var len = prop.length;
              prop = prop.substr(0,1).toUpperCase()+prop.substr(1,len).toLowerCase()
          }
          if(document.body.style[prop]!==undefined){
              elem.style[prop] = value;
              return 
          }
      }
  }

  _previewImage.prototype.getTouches = function(e){
      var touches = event.touches.length>0?event.touches:event.changedTouches;
      var obj = {touches:touches,length:touches.length};
          obj.x0 = touches[0].pageX
          obj.y0 = touches[0].pageY;
          obj.time = new Date().getTime();
      if(touches.length>=2){
          obj.x1 = touches[0].pageX
          obj.y1 = touches[1].pageY
      }
      return obj;
  }
  window.previewImage = new _previewImage();
  // AMD loader
  if ( typeof define === "function" && define.amd ) {
      define([], function() {
          return previewImage;
      } );
  }

  return previewImage;
}));