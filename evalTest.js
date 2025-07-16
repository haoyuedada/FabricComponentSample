let aItm = {
    "id": 123
}
let click = {
    cond: "this.id === 123",
}
let condf = function () {
    return eval(click.cond);
    // return new Function("return " + click.cond).call(this);
};
condRet = condf.call(aItm);
console.log("chy rListItem confRet:", condRet)