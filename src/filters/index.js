
export function formatDateMore(time) {
   	function setv(v){v = v < 10?'0' + v : v; return v; }
   	if(time){
		var v = new Date(time);
		var y = v.getFullYear();   //年
		var mm = v.getMonth() + 1; //上个月
		var d = v.getDate();      //天getDate.getDate()
		var h = v.getHours()
		var m = v.getMinutes()
		var s = v.getSeconds()
		return y + '/' + mm + '/' + d + " " +  setv(h) + ':' + setv(m)
   	}
}
