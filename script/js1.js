//给span添加额外的classname
//ExtraClass为额外添加的classname，注意加入空格
function SpanStyle(ExtraClass){
	"use strict";
	var spans = document.currentScript.parentElement.getElementsByTagName("span"); 
	for(var i=0;i<spans.length;++i){ 
		spans[i].className+=ExtraClass;
	}
}

//关联script父对象内所有panel-heading与panel-body,添加折叠功能
//PreName为id名前缀，BeginingIDNum为开始赋值的编号起始，collapsing表示初始折叠
function SetCollapseID(PreName,BeginingIDNum,collapsing){
	"use strict";
	if(BeginingIDNum.constructor === Number){
		var idName = "";
		var childs = document.currentScript.parentElement.getElementsByTagName("div");
		for(var j=0;j<childs.length;++j){
			if(childs[j].className.indexOf("panel-heading")!==-1){
				idName = PreName+ ++BeginingIDNum;
				childs[j].setAttribute("data-toggle","collapse");
				childs[j].setAttribute("data-target","#"+idName);
			}
			else if(childs[j].className.indexOf("panel-body")!==-1){
				childs[j].id = idName;
				if(collapsing){
					childs[j].className += " panel-collapse collapse";					
				}
				else{
					childs[j].className += " panel-collapse collapse in";					
				}
			}
		}
	}	
}

//检测id为idName的element最后一个松开的按键是否为code，如果是，执行callBack
function KeyUpTest(idName,code,callBack) {
	"use strict";
	if(event.keyCode===code){
		callBack();
	}
}

//复制id为idName的element的value
function Copy(idName) {
	"use strict";
	var content = document.getElementById(idName);
	content.select();
	document.execCommand('Copy');
	alert('复制成功');
}

var wordPre = "word";
var wordNum = 1;

//返回一个方便进入百度盘以及显示提取码的div，src为分享地址,password为分享码，className为生成div的类名
function Pan(src,password,className){
	"use strict";
	var idName = wordPre+ ++wordNum;
	var Out = document.createElement("div");
	Out.className = className;
	var element = document.createElement("button");
	element.className = "btn btn-primary";
	element.style = "display: inline-block;";
	element.setAttribute("onclick","location.href='"+src+"'");
	element.textContent = "百度网盘";
	Out.appendChild(element);
	//生成框组
	var inputGroup = document.createElement("div");
	inputGroup.className = "input-group";
	inputGroup.style = "display: inline-block;width: 120px;";
	//生成输入框
	element = document.createElement("input");
	element.id = idName;
	element.className = "form-control";
	element.style = "display: inline;width: 60px";
	element.setAttribute("readOnly", true); 
	element.setAttribute("data-html", true); 
	element.setAttribute("value", password); 
	element.setAttribute("onKeyUp", "KeyUpTest('"+idName+"',13,function(){Copy('"+idName+"');})"); 
	element.setAttribute("data-toggle", "tooltip"); 
	element.title="按下Enter键复制提取码<br>如果有Enter键的话"; 
	inputGroup.appendChild(element);
	//生成后方粘连的标签
	var span = document.createElement("span");
	span.className = "input-group-btn";	
	span.style = "display: inline;";
	//按钮
	element = document.createElement("button");
	element.className = "btn btn-default";
	element.setAttribute("onClick", "Copy('"+idName+"')"); 
	element.textContent = "复制";
	//组装
	span.appendChild(element);
	inputGroup.appendChild(span);
	//再套一层
	element = document.createElement("div");
	element.style = "display: inline-block;width: 200px;white-space:nowrap; margin: 5px;";
	element.innerHTML="提取码：";
	element.appendChild(inputGroup);
	//组装
	Out.appendChild(element);
	//加入到指定位置
	return Out;
	/*
		<button class="btn btn-primary" onClick="location.href='https://pan.baidu.com/s/15ylGShsQ9eSwMrdZIqrH1g'">百度网盘</button>
		提取码：
		<input id="word1" class="form-control" style="display: inline;width: 80px" readonly value="0bo6" onKeyUp="KeyUpTest('word1',13,function(){Copy('word1');})" data-toggle="tooltip" title="按下Enter键复制提取码">
	*/
}

//在代码执行的位置添加一个带提取码的百度盘组，src为分享地址,password为分享码，className为生成div的类名
function AddPan(src,password,className){
	"use strict";
	document.currentScript.parentElement.appendChild(Pan(src,password,className));
}

//在id名为pointId的对象下方插入一个带提取码的百度盘，src为分享地址,password为分享码，className为生成div的类名
function PointPan(pointId,src,password,className){
	"use strict";
	document.getElementById(pointId).appendChild(Pan(src,password,className));
}

//为id为idName的对象添加class（记得加空格）
function AddClass(idName,className){
	"use strict";
	document.getElementById(idName).className+=className;
}

//如果id为idName的对象无className属性则添加className，否则删去（别加空格）
function SwitchClass(idName,className){
	"use strict";
	var element = document.getElementById(idName);
	if(element.className.indexOf(className)!==-1){
		element.classList.remove(className);
	}
	else{
		element.className+=" "+className;
	}
}

//是否为手机端
var isPhone;

//执行判断语句
function PhoneTest(){
	"use strict";
   var sUserAgent = navigator.userAgent.toLowerCase();
   isPhone = /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent);
}

//放大图片的弹出框的id
var modalIdRecord;
//图片内元素的id
var modalInnerIdRecord;
//放大图片的弹出框内显示大图的Img
var modalImg;
//放大图片的弹出框内显示大图的Img
var modalImgIdRecord;
//大图的标题
var modalTitle;

//设置放大图片的弹出框的ID名
function SetModalID(modalId,modalInnerId,modalImgId,modalTitleId){
	"use strict";
	modalIdRecord = modalId;
	modalInnerIdRecord = modalInnerId;
	modalImgIdRecord = modalImgId;
	modalImg = document.getElementById(modalImgId);
	modalTitle = document.getElementById(modalTitleId);
}

//某些添加元素的函数进行操作的点
var point;

//在id名为pointId的对象下方插入一个带提取码的百度盘，src为分享地址,password为分享码，className为生成div的类名
function LocatePoint(pointId){
	"use strict";
	point = document.getElementById(pointId);
}

//在point元素内加入图片与标题的轮播项，图片sro为imgSrc，图片描述w为title，为active则图片显示
function AddModalImgItem(imgSrc,title,active){
	"use strict";
	var item = document.createElement("div");
	item.className = active?"item active":"item";
	var img = document.createElement("img");
	img.setAttribute("src",imgSrc);
	img.setAttribute("alt","waitting");
	img.className = "clickable";
	ModalShow(img,imgSrc,title);
	var inform = document.createElement("div");
	inform.className = "carousel-caption";
	inform.innerHTML = title;
	item.appendChild(img);
	item.appendChild(inform);
	point.appendChild(item);
}

//在point元素内加入能弹出modal框的图片，imgSrc为图片地址，title为model框标题
function AddModalImg(imgSrc,title){
	"use strict";
	var img = document.createElement("img");
	img.setAttribute("src",imgSrc);
	ModalShow(img,imgSrc,title);
	point.appendChild(img);
}

//加入弹出modal框的功能
function ModalShow(element,imgSrc,title){
	"use strict";
	element.setAttribute("onclick","popModal('"+imgSrc+"','"+title+"');");	
}

//modal框内图片能否放大
var ImgAmplifiable = false;

//弹出modal框
function popModal(imgSrc,title){
	"use strict";
	var modalID = '#'+modalIdRecord;
	modalImg.className = "notfit";
	modalImg.setAttribute("src",imgSrc);
	if(modalImg.width>$(modalID).width()){
		modalImg.className = "";
		ImgAmplifiable = true;
	}
	else{
		modalImg.className = "notfit";
		ImgAmplifiable = false;
	}
	modalTitle.innerHTML = title;
	$(modalID).modal('show');
}

//放大modal框内图片
function ModalImageAmplify(){
	"use strict";
	if(ImgAmplifiable){
		SwitchClass(modalImgIdRecord,"notfit");
	}
}

//顶部导航栏id
var topNavId;

//连接id为idName的变量，方便改body顶边距
function connectNav(idName){
	"use strict";
	topNavId = idName;
	$(window).resize(onResize);
}

//修改顶边距
function onResize(){
	"use strict";
	$("body").css("padding-Top", document.getElementById(topNavId).offsetHeight);
}
