export  const convertStringNumber = (str)=>{
    const notSpaceStr = str.replace(/\s+/g,"");
    const num = parseFloat(notSpaceStr);

    if(!isNaN(num) && isFinite(num)){
        return num;
    }else{
        return false;
    }
}