//判断一个对象是否为空
function isEmptyObject(obj) {
      for (var key in obj) {
        return false;
      }
      return true;
    }
module.exports = {
      isEmptyObject,
}