fs = require('fs');
var filename = './data/davinci.txt'
var maps = {
       
}
var mapContext = {
    write: function (key, val) {
        if (maps[key]) {
            maps[key].push( val.toString());
        } else {
            maps[key] = {
                vals: [],
                index: 0,
                hasNext: function () {
                    return this.index < this.vals.length;
                },
                next: function () {
                    var d = this.vals[this.index];
                    this.index++;
                    return d;
                },
                push: function (val) {
                    this.vals.push(val);
                }
            }
            maps[key].push(val.toString());
        }
    }
}
var reduceContext =  {
    write: function (key,val) {
        console.log('key:'+key + " value:" + val);
    }
}








var map = function (key, value, context) {
    var words = value.split(/[^a-zA-Z]/);
    for (var i = 0; i < words.length; i++) {
        if (words[i] !== "") {
            context.write(words[i].toLowerCase(), 1);
        }
    }
};
var reduce = function (key, values, context) {
    var sum = 0;
    
    while (values.hasNext()) {
        sum += parseInt(values.next());

    }
  
    context.write(key, sum);
};





var data = fs.readFileSync(filename)

var datalist = data.toString().split('\n')

for (var i = 0; i < datalist.length; i++) {
    map(i, datalist[i], mapContext);
}
for (var d in maps) {
    reduce(d, maps[d], reduceContext);
}