jQuery(function($){
	
	///////////////////////////////////////////////////////
	//banner
	// banner初始化
	    var bannindex=0;
		var bw=$(".n_banner").width();
		$(".banner_box li").width(bw)
		var ban_width =bw;
		$(".banner .menu").hide();
		if($(".banner_box li").size>1){
		$(".banner .menu").show();
		var bannerroll = setInterval(bannext,4000);
		$('.banner').hover(function() {
			clearInterval(bannerroll) 
		},function(){
			bannerroll=setInterval(bannext,4000);
		});
		$(window).load(function(e) {
            changliw()
        });
		$(window).resize(function(e) {
           changliw()
        });
		function changliw(){
			bw=$(".n_banner").width();
			ban_width=$(window).width();
			$(".banner_box li").width(ban_width);
			$(".banner_box ul").css('margin-left',-ban_width);
			$(".banner").height($(".banner_box li img").height());

		}changliw()
		
		var bli_fisrt=$(".banner_box li").first().clone();
		var bli_last =$(".banner_box li").last().clone();
		$(".banner_box ul").append(bli_fisrt);
		$(".banner_box ul").prepend(bli_last);
		var ban_len=$(".banner_box li").length;//此句只能在append和prepend之后
		$(".banner_box ul").width(ban_len*ban_width);
	    $(".banner_box ul").css('margin-left',-ban_width);
		
		$(".banner .menu a").click(function() {
			bannindex=$(this).index();
		    $(this).addClass('now').siblings().removeClass('now');
			$(".banner_box ul").stop().animate({marginLeft:-(bannindex+1)*ban_width},500);
			
	    });
		$(".bnext").click(function(){
			bannext()
		});
		$(".bprev").click(function(){
			banprev()
		});
	  function bannext(){
			var Istrue=$(".banner_box ul").is(':animated');
			if(!Istrue){
				bannindex<ban_len-2?bannindex++:bannindex=0;
				$(".banner .menu a").eq(bannindex).addClass('now').siblings().removeClass('now');
				if(bannindex==ban_len-2){//当等于克隆之前li的个数时，li滑动到最后一个（包含克隆）并且立即跳转到第克隆前的第一个。
					$(".banner_box ul").stop().animate({marginLeft:-(bannindex+1)*ban_width},500,function(){
						bannindex=0;
						$(".banner .menu a").eq(bannindex).addClass('now').siblings().removeClass('now');
						$(this).animate({marginLeft:-ban_width},0);//显示克隆前的第一个
					});
				}else{
						$(".banner_box ul").stop().animate({marginLeft:-(bannindex+1)*ban_width},500);
					
				}
			}
	   }
	   
	   function banprev(){
			var Istrue=$(".banner_box ul").is(':animated');
			if(!Istrue){
				//初始化slideindex为0；这个地方容易出错，虽然是第二个图片，但index不是1；注意初始化值
				bannindex>0?bannindex--:bannindex=ban_len-3;
				$(".banner .menu a").eq(bannindex).addClass('now').siblings().removeClass('now');
				if(bannindex==ban_len-3){
					$(".banner_box ul").animate({marginLeft:0},500,function(){
						$(this).animate({marginLeft:-ban_width*(bannindex+1)},0);
					})
				}else{
					$(".banner_box ul").stop().animate({marginLeft:-ban_width*(bannindex+1)},500);
					$(".banner .menu a").eq(bannindex).addClass('now').siblings().removeClass('now');
				}
			}
	   }
	   
	     //移动端
		var startX, startY, moveEndX, moveEndY, X, Y;
		$(".banner_box li").on('touchstart',function(e){
			clearInterval(bannerroll);
			startX = e.originalEvent.changedTouches[0].pageX,
			startY = e.originalEvent.changedTouches[0].pageY;
		});
	
		$(".banner_box li").on('touchmove',function(e){
			
			moveEndX = e.originalEvent.changedTouches[0].pageX,
			moveEndY = e.originalEvent.changedTouches[0].pageY,
			X = moveEndX - startX,
			Y = moveEndY - startY;
			if (Math.abs(X) > Math.abs(Y)) {
				e.preventDefault();
				if(X>20){//向右滑动显示上一个
					banprev();
				}else if(X<0) {//向左滑动显示下一个
					bannext();
				}
			};
		});
	
		$(".banner_box li").on('touchend',function(e){
			
			moveEndX = e.originalEvent.changedTouches[0].pageX,
			moveEndY = e.originalEvent.changedTouches[0].pageY,
			X = moveEndX - startX,
			Y = moveEndY - startY;
			if(X==0&&Y==0){
				var _link=$(this).children('a').attr('href');
				window.open(_link)
			};
			bannerroll = setInterval(bannext,4000);
		});
	}
	////////////////////////////////////////////////////////////////
});