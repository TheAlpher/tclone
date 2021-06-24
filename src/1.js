let mydebounce=(fn,delay)=>{
    let timeout;
    return function(){
        clearTimeout(timeout);
        timeout=setTimeount(()=>fn(),delay);
    }
}


let mythrottling=(fn,delay)=>{
        let toggler;
        return function(){
            if(!toggler){
                fn();
                toggler=true;
                setTimeout(()=>toggler=false,delay);
            }
        
    }
}

let myall=(promises)=>{
    return new Promise(function(resolve,reject){
        let result=[];
let i=promises.length;
let pending=promises.length;
        if(!promises){
            resolve(result);
            return;
        }
while(i>0){
promises[i].then(function(val){
    result[i]=val;    
    if(pending==0){
        resolve(result);
    }
    pending--;
},reject)



    i++;
}
    })
} 