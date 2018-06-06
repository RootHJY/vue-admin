//数组去重
export function uniqueArr(arr) {
    var n = [];
    for (var i = 0; i < arr.length; i++) {
        if (n.indexOf(arr[i]) == -1) {
            n.push(arr[i]);
        }
    }
    return n;
}

//数组删除指定值
export function removeArr(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}

export function generateTitle(title) {
    const hasKey = this.$te('route.' + title)
    const translatedTitle = this.$t('route.' + title) 
    if (hasKey) {
        return translatedTitle
    }
    return title
}
 



