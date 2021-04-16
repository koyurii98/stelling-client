export const getQueryString = (key)=>{
  var str = window.location.href;
  var index = str.indexOf("?") + 1;
  var lastIndex = str.indexOf("#") > -1 ? str.indexOf("#") + 1 : str.length;
  if (index === 0) {
    return "";
  }
  str = str.substring(index, lastIndex); 
  str = str.split("&");

  var rst = "";

  for (var i = 0; i < str.length; i++) {
    var arr = str[i].split("=");
    if (arr.length !== 2) {
      break;
    }
    if (arr[0] === key) {
      rst = arr[1];
      break;
    }
  }
  return rst;
}