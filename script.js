// const baseUrl = "https://v6.exchangerate-api.com/v6/f61ba8e8c4102492a3883413/pair/USD/PKR";

const select = document.querySelectorAll(".select");
let img = document.querySelector(".img");
let btn = document.querySelector(".btn");
let amount = document.querySelector(".amount");
let amountvalue = amount.value;
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg = document.querySelector(".msg");

// Put all options to drop down
for (let options of select) {
    for (let countryname in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = countryname;
        newOpt.value = countryname;
        options.append(newOpt);
    
        if(options.name ==="from" && countryname==="USD"){
            newOpt.selected="selected";}

       if(options.name ==="to" && countryname==="PKR"){
            newOpt.selected="selected";}
        }

        options.addEventListener("change", (evt)=>{
          updateflag(evt.target)
        }) ;   
}


let updateflag =(element)=>{
   let currencycode=element.value;    // 3 characters , key extracting from object 
   let countrycode = countryList[currencycode];         // value extracting from key
   let newImg= `https://flagsapi.com/${countrycode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");          // "to" ya "from" se , who ever the parent 
   img.src = newImg;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amountvalue = amount.value;
    if(amountvalue==="" || amountvalue<0){
        amountvalue=1;
        amount.value="1";
    }
    const url = `https://v6.exchangerate-api.com/v6/f61ba8e8c4102492a3883413/pair/${fromCurr.value}/${toCurr.value}`;
    let responce = await fetch(url);
    let data = await responce.json();
    let exchangerate= data.conversion_rate;   // fetch from api
    let finalamount  =  amountvalue * exchangerate ;
    console.log(finalamount);
    msg.innerText = `${amountvalue} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;

});
