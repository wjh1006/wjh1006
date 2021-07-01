function ajax() {
    this.get = function () {
        var hxr = new XMLHttpRequest();
        var URL = `http://49.232.47.192:9527${arguments[0]}`
        if (arguments.length == 2) {
            var fn = arguments[1];
        } else {
            URL = URL + "?"
            for (var k in arguments[1]) {
                URL = URL + k + "=" + arguments[1][k] + "&"
            }
            URL = URL.slice(0, URL.length - 1)
            var fn = arguments[2];
        }
        hxr.open('GET', URL)
        hxr.send()
        hxr.onreadystatechange = function () {
            if (hxr.readyState == 4 && hxr.status == 200) {
                var res = hxr.responseText;
                res = JSON.parse(res)
                fn(res)
            }
        }
    };
}