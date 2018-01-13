function initcsp(csp){
  for(var i=0;i<9;i++){
    var tmp_row=[];
    for(var j=0;j<9;j++){
      var tmp_col=[];
      for(var k=1;k<10;k++){
        tmp_col.push(null);
      }
      tmp_row.push(tmp_col);
    }
    csp[i]=tmp_row;
  }
  return csp;
}

function makecsp(csp){
  var row=0;
  var a=document.getElementsByClassName('gridelement');
  for(var i=0;i<a.length;i++){
    if(i%9==0 && i!=0){
      row++;
    }
    if(a[i].innerHTML==0){
      for(var j=0;j<csp[row][i%9].length;j++){
        csp[row][i%9][j]=j+1;
      }
    }else if(a[i].innerHTML!=0){
      csp[row][i%9]=[parseInt(a[i].innerHTML)];
    }
  }
  return csp;
}

function getallnumbs(){
  var a=[1,2,3,4,5,6,7,8];
  return a;
}
