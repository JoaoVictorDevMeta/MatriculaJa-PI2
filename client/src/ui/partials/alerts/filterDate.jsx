export const filterDate = (datastart,dataend,item) => {
    let itemdialista = item.split("/");
    const itemdatalist = itemdialista.reverse();
    // se só tem o fim do intervalo
    
    if(datastart === null && dataend !== null){
      return parseInt(itemdatalist[0]) < parseInt(dataend[0]) ||
        (parseInt(itemdatalist[0]) === parseInt(dataend[0]) && parseInt(itemdatalist[1]) < parseInt(dataend[1])) ||
        (parseInt(itemdatalist[0]) === parseInt(dataend[0]) && parseInt(itemdatalist[1]) === parseInt(dataend[1]) && parseInt(itemdatalist[2]) <= parseInt(dataend[2]))
    } else if(datastart !== null && dataend === null){ //se só tem o começo do intervalo
      return parseInt(itemdatalist[0]) > parseInt(datastart[0]) ||
        (parseInt(itemdatalist[0]) === parseInt(datastart[0]) && parseInt(itemdatalist[1]) > parseInt(datastart[1])) ||
        (parseInt(itemdatalist[0]) === parseInt(datastart[0]) && parseInt(itemdatalist[1]) === parseInt(datastart[1]) && parseInt(itemdatalist[2]) >= parseInt(datastart[2]))
  } else if(datastart !== null && dataend !== null) { // as possiveis combinações de intervalos
      if(datastart[0] < dataend[0]){ 
      return parseInt(datastart[0]) < parseInt(itemdatalist[0]) && parseInt(itemdatalist[0]) < parseInt(dataend[0]) ||
        (parseInt(itemdatalist[0]) === parseInt(datastart[0]) && parseInt(itemdatalist[1]) > parseInt(datastart[1])) ||
        (parseInt(itemdatalist[0]) === parseInt(datastart[0]) && parseInt(itemdatalist[1]) === parseInt(datastart[1]) && parseInt(itemdatalist[2]) >= parseInt(datastart[2])) ||
        (parseInt(itemdatalist[0]) === parseInt(dataend[0]) && parseInt(itemdatalist[1]) < parseInt(dataend[1])) ||
        (parseInt(itemdatalist[0]) === parseInt(dataend[0]) && parseInt(itemdatalist[1]) === parseInt(dataend[1]) && parseInt(itemdatalist[2]) <= parseInt(dataend[2]))
  } else if(datastart[0] === dataend[0] && datastart[1] < dataend[1]){
        return (parseInt(itemdatalist[0]) === parseInt(dataend[0]) && parseInt(datastart[1]) < parseInt(itemdatalist[1]) && parseInt(itemdatalist[1]) < parseInt(dataend[1])) ||
          (parseInt(itemdatalist[0]) === parseInt(dataend[0]) && parseInt(datastart[1]) === parseInt(itemdatalist[1]) && parseInt(itemdatalist[2]) >= parseInt(datastart[2])) || 
          (parseInt(itemdatalist[0]) === parseInt(dataend[0]) && parseInt(itemdatalist[1]) === parseInt(dataend[1]) && parseInt(itemdatalist[2]) <= parseInt(dataend[2]))

  } else if(datastart[0] === dataend[0] && datastart[1] === dataend[1]){
            return parseInt(itemdatalist[0]) === parseInt(dataend[0]) && parseInt(datastart[1]) === parseInt(itemdatalist[1]) && parseInt(datastart[2]) <= parseInt(itemdatalist[2]) && parseInt(itemdatalist[2]) <= parseInt(dataend[2])
      }
  } else if(datastart === null && dataend === null){
      return true;
  }
  };