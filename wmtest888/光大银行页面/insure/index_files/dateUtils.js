//---------------------------------------------------     
// ���ڸ�ʽ��     
// ��ʽ YYYY/yyyy/YY/yy ��ʾ���     
// MM/M �·�     
// W/w ����     
// dd/DD/d/D ����     
// hh/HH/h/H ʱ��     
// mm/m ����     
// ss/SS/s/S ��     
//---------------------------------------------------     
Date.prototype.Format = function(formatStr)      
{      
    var str = formatStr;      
    var Week = ['��','һ','��','��','��','��','��'];     
     
    str=str.replace(/yyyy|YYYY/,this.getFullYear());      
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));      
    
    //����date�е�monthֵ��0��ʼ��month = 9 ʵ�ʴ���10��
    str=str.replace(/MM/,this.getMonth()>8?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));      
    str=str.replace(/M/g,(this.getMonth()+1));      
     
    str=str.replace(/w|W/g,Week[this.getDay()]);      
     
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());      
    str=str.replace(/d|D/g,this.getDate());      
     
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());      
    str=str.replace(/h|H/g,this.getHours());      
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());      
    str=str.replace(/m/g,this.getMinutes());      
     
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());      
    str=str.replace(/s|S/g,this.getSeconds());      
     
    return str;      
};

/**   
* ���������ַ���ת��Ϊ���ڶ���   
* ������yyyy-mm-dd��dd/mm/yyyy��ʽ���ַ���   
* ���أ�Date����   
* ע��IE�²�֧��ֱ��ʵ�������ڶ�����new Date("2011-04-06")   
*/   
Date.prototype.parseDate = function (dateStr) {
	if (typeof dateStr == 'string') {
		var flag = true;   
		var dateArray = dateStr.split("-");  
		if (dateArray.length != 3) {  
			dateArray = dateStr.split("/");  
			if (dateArray.length != 3) {  
				return null;  
			}  
			flag = false;  
		}  
		var newDate = new Date();  
		if (flag) {  
			newDate.setFullYear(dateArray[0], dateArray[1] - 1, dateArray[2]);  
		} else {  
			newDate.setFullYear(dateArray[2], dateArray[1] - 1, dateArray[0]);  
		}  
		newDate.setHours(0, 0, 0);  
		return newDate;  
	} else if (dateStr instanceof Date) {
		return dateStr;
	}
}; 


/**
 * �ж��Ƿ�Ϊ����
 */
Date.prototype.isLeapYear = function() {
	 return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));
};

/**
 * ��Date����չ���� Date ת��Ϊָ����ʽ��String * ��(M)����(d)��12Сʱ(h)��24Сʱ(H)����(m)����(s)����(E)������(q)
 * ������ 1-2 ��ռλ�� * ��(y)������ 1-4 ��ռλ��������(S)ֻ���� 1 ��ռλ��(�� 1-3 λ������) 
 * eg: 
 *  (newDate()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 *  (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 �� 20:09:04      
 *  (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 �ܶ� 08:09:04      
 *  (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 ���ڶ� 08:09:04      
 *  (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */  
Date.prototype.formatDate = function(formatStr) {
	var o = {         
	    "M+" : this.getMonth()+1, //�·�         
	    "d+" : this.getDate(), //��         
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //Сʱ         
	    "H+" : this.getHours(), //Сʱ         
	    "m+" : this.getMinutes(), //��         
	    "s+" : this.getSeconds(), //��         
	    "q+" : Math.floor((this.getMonth()+3)/3), //����         
	    "S" : this.getMilliseconds() //����         
	    }; 
	
    var week = {         
	    "0" : "/u65e5",         
	    "1" : "/u4e00",         
	    "2" : "/u4e8c",         
	    "3" : "/u4e09",         
	    "4" : "/u56db",         
	    "5" : "/u4e94",         
	    "6" : "/u516d"        
	    };  
    
    if(/(y+)/.test(formatStr)){         
        formatStr = formatStr.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(formatStr)){         
        formatStr = formatStr.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(formatStr)){         
            formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }
    return formatStr;      
};

/**
 * �������
 */
Date.prototype.addDate = function(strInterval, number) { 
	number = parseInt(number);
    var dateTemp = this; 
    switch (strInterval) {
    	case 'ms' :
    		return new Date(Date.parse(dateTemp) + (1000 * number)); 
        case 's' :
        	return new Date(Date.parse(dateTemp) + (1000 * number)); 
        case 'mi' :
        	return new Date(Date.parse(dateTemp) + (60000 * number)); 
        case 'h' :
        	return new Date(Date.parse(dateTemp) + (3600000 * number)); 
        case 'd' :
        case '40' :
        	return new Date(Date.parse(dateTemp) + (86400000 * number)); 
        case 'w' :
        	return new Date(Date.parse(dateTemp) + ((86400000 * 7) * number)); 
        case 'q' :
        	return new Date(dateTemp.getFullYear(), (dateTemp.getMonth()) + number*3, dateTemp.getDate(), dateTemp.getHours(), dateTemp.getMinutes(), dateTemp.getSeconds()); 
        case 'M' :
        case 'month' :
        case '41' :
        	return new Date(dateTemp.getFullYear(), (dateTemp.getMonth()) + number, dateTemp.getDate(), dateTemp.getHours(), dateTemp.getMinutes(), dateTemp.getSeconds()); 
        case 'y' :
        case 'Y' :
        case 'year' :
        case '42' :
        	return new Date((dateTemp.getFullYear() + number), dateTemp.getMonth(), dateTemp.getDate(), dateTemp.getHours(), dateTemp.getMinutes(), dateTemp.getSeconds()); 
    } 
}

/**   
 * ������������������֮��Ĳ�ֵ   
 * ������date�����ڶ���   
 * flag��ms-���룬ss-�룬mi-�֣�hh-Сʱ��d-�죬w-�ܣ�M-�£�y-��   
 * ���أ���ǰ���ں�date�����������ĺ���/��/��/Сʱ/��   
 */   
Date.prototype.dateDiff = function(endDate, interval) {   
	//������ַ���ת��Ϊ������  
    if (typeof endDate == 'string' ) {   
        endDate = new Date().parseDate(endDate);  
    }  
    switch (interval) {
    	case 'ms' :return parseInt(endDate - startDate);
        case 'ss' :return parseInt((endDate - startDate) / 1000);  
        case 'mi' :return parseInt((endDate - startDate) / 60000); // 60 * 1000 
        case 'hh' :return parseInt((endDate - startDate) / 3600000);  // 60 * 60 * 1000
        case 'd' :return parseInt((endDate - startDate) / 86400000);  // 24 * 60 * 60 * 1000
        case 'w' :return parseInt((endDate - startDate) / 604800000); // 7 * 24 * 60 * 60 * 1000 
        case 'm' :return (endDate.getMonth() + 1) + ((endDate.getFullYear() - startDate.getFullYear()) * 12) - (startDate.getMonth() + 1);  
        case 'y' :return endDate.getFullYear() - startDate.getFullYear();  
    } 
};  

/**   
 * ������������������֮��Ĳ�ֵ   
 * ������date�����ڶ���   
 * flag��ms-���룬ss-�룬mi-�֣�hh-Сʱ��d-�죬w-�ܣ�M-�£�y-��   
 * ���أ���ǰ���ں�date�����������ĺ���/��/��/Сʱ/��   
 */   
function dateDiff(startDate, endDate, interval) {   
	//������ַ���ת��Ϊ������  
	if (typeof startDate == 'string' ) {   
		startDate = new Date().parseDate(startDate);  
    } 
	
    if (typeof endDate == 'string' ) {   
        endDate = new Date().parseDate(endDate);  
    }  
    switch (interval) {
    	case 'ms' :return parseInt(endDate - startDate);
        case 'ss' :return parseInt((endDate - startDate) / 1000);  
        case 'mi' :return parseInt((endDate - startDate) / 60000); // 60 * 1000 
        case 'hh' :return parseInt((endDate - startDate) / 3600000);  // 60 * 60 * 1000
        case 'd' :return parseInt((endDate - startDate) / 86400000);  // 24 * 60 * 60 * 1000
        case 'w' :return parseInt((endDate - startDate) / 604800000); // 7 * 24 * 60 * 60 * 1000 
        case 'm' :return (endDate.getMonth() + 1) + ((endDate.getFullYear() - startDate.getFullYear()) * 12) - (startDate.getMonth() + 1);  
        case 'y' :return endDate.getFullYear() - startDate.getFullYear();  
    } 
};  

//+---------------------------------------------------  
//| ������ʱ��������� ���ڸ�ʽΪ YYYY-MM-dd   
//+---------------------------------------------------  
function dateDiffInDays(startDateStr, endDateStr) {
  return dateDiff(startDateStr, endDateStr, "d");
}  

/**
 * ��ȡ���ڣ����ڸ�ʽΪyyyy-mm-dd
 * @param date 
 * @returns
 */
function getDate(date){
	var arrDate = date.split("-");  
	return new Date(parseInt(arrDate[0],10),parseInt(arrDate[1],10)-1,parseInt(arrDate[2],10));
}

Date.prototype.after = function(compareDate){
	var date = this,
		dateMills = Date.parse(date.Format('MM/dd/yyyy')),
		compMills = Date.parse(compareDate.Format('MM/dd/yyyy'));
	
	if(dateMills > compMills){
		return true;
	}else{
		return false;
	}
};

Date.prototype.before = function(compareDate){
	var date = this,
		dateMills = Date.parse(date.Format('MM/dd/yyyy')),
		compMills = Date.parse(compareDate.Format('MM/dd/yyyy'));
	
	if(dateMills < compMills){
		return true;
	}else{
		return false;
	}
};

/***
 * ��ǰ���ڵĿ�ʼʱ��
 * @param date
 * @return
 */
function startTimeDate(dateStr) {
	var startTimeDate = new Date().parseDate(dateStr);
	startTimeDate.setHours(0, 0, 0);
	return startTimeDate;
};

/***
 * ��ǰ���ڵĽ���ʱ��
 * @param date
 * @return
 */
function endTimeDate(dateStr) {
	var endTimeDate = new Date().parseDate(dateStr);
	endTimeDate.setHours(23, 59, 59);
	return endTimeDate;
};


function calculationAge(startDateStr, birthDateStr) {
	var startDate = new Date().parseDate(startDateStr);
	var birthDate = new Date().parseDate(birthDateStr); 
	var age = 0;
	if (startDate != null && birthDate != null) {
		var diffDays = dateDiffInDays(birthDate, startDate);
		if (diffDays < 365) {
			age = 0;
		} else {
			var yearDiff = startDate.getFullYear() - birthDate.getFullYear();
			var monthDiff = startDate.getMonth() - birthDate.getMonth();
			var dayDiff = startDate.getDate() - birthDate.getDate();
			if (monthDiff < 0) {// ��������
				age = yearDiff - 1;
			} else if (monthDiff > 0) {// ��������
				age = yearDiff;
			} else {// Ҫ��day
				if (dayDiff < 0) {// ����
					age = yearDiff - 1;
				} else {// ����
					age = yearDiff;
				}
			}
		}
	}
	return age;
};