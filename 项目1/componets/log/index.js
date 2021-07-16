function sucessLog(msg,data){
    console.log(`\n%c ${msg}  ↓ `,'background:#67c23a;color:#fff;padding:1px;border-radius:3px');
    console.log(data)
}


function errorLog(msg,data){
    console.log(`\n%c ${msg}  ↓ `,'background:red;color:#fff;padding:1px;border-radius:3px');
    console.log(data)
}

function dangerLog(msg,data){
    console.log(`\n%c ${msg}  ↓ `,'background:#f56c6c;color:#fff;padding:1px;border-radius:3px');
    console.log(data)
}
function infoLog(msg,data){
    console.log(`\n%c ${msg}  ↓ `,'background:#409eff;color:#fff;padding:1px;border-radius:3px');
    console.log(data)
}

function defalutLog(msg,data){
    console.log(`\n%c ${msg}  ↓ `,'background:#606266;color:#fff;padding:1px;border-radius:3px');
    console.log(data)
}