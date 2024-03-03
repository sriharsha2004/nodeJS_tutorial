var x = [1,2,3,4]
console.log(x);
var y = ["hello","world"]
// module.exports = x
//  it will only export only x
// but to export both x, y use;
module.exports = {
    x,y
}

// the obove thing is same as
// module.exports = {
//     x:x,y:y
// }
//  we can also give our own key