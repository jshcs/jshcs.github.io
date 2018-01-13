vars={};

function checkrow(csp,row,col,num){
  for(var i=0;i<9;i++){
    if(csp[row][i].indexOf(num)!=(-1) && csp[row][i].length==1){
      return false;
    }
  }
  return true;
}

function checkcol(csp,row,col,num){
  for(var i=0;i<9;i++){
    if(csp[i][col].indexOf(num)!=(-1) && csp[i][col].length==1){
      return false;
    }
  }
  return true;
}

function checkgrid(csp,row,col,num){
  var r=0;
  r=row;
  var c=0;
  c=col;
  while((r%3)!=0){
    r-=1;
  }
  while((c%3)!=0){
    c-=1;
  }
  for(var i=r;i<r+3;i++){
    for(var j=c;j<c+3;j++){
      if(csp[i][j].indexOf(num)!=(-1) && csp[i][j].length==1){
        return false;
      }
    }
  }
  return true;
}

function checkconstraint(csp,row,col,num){
  if(checkrow(csp,row,col,num)==true && checkcol(csp,row,col,num)==true && checkgrid(csp,row,col,num)==true){
    return true;
  }else{
    return false;
  }
}

function iszero(csp){
  for(var i=0;i<9;i++){
    for(var j=0;j<9;j++){
      if(csp[i][j].length>1){
        return true;
      }
    }
  }
  return false;
}

function findzero(csp){
  var min_length=10;
  var min_x=9;
  var min_y=9;
  for(var i=0;i<9;i++){
    for(var j=0;j<9;j++){
      if((csp[i][j].length<min_length) && (csp[i][j].length>1)){
        min_length=csp[i][j].length;
        min_x=i;
        min_y=j;
      }
    }
  }
  return [min_x,min_y];
}

function get_neighbors(row,col){
  var list_neighbors=[];
  //Neighbors in the same row
  for(var i=0;i<9;i++){
    if(i!=col){
      list_neighbors.push([row,i]);
    }
  }

  //Neighbors in the same column
  for(var i=0;i<9;i++){
    if(i!=row){
      list_neighbors.push([i,col]);
    }
  }

  //Remaining neighbors in the same 3*3 sub-grid
  var r=0;
  r=row;
  var c=0;
  c=col;
  while((r%3)!=0){
    r-=1;
  }
  while((c%3)!=0){
    c-=1;
  }
  for(var i=r;i<r+3;i++){
    for(var j=c;j<c+3;j++){
      if(list_neighbors.indexOf([i,j])==-1 && i!=row && j!=col){
        list_neighbors.push([i,j]);
      }
    }
  }
  return list_neighbors;
}

function CP(csp,r,c,val){
  var temp_vars = JSON.parse(JSON.stringify(csp));
  var neighbors=get_neighbors(r,c);

  var to_be_removed=[];
  for(var i=0;i<temp_vars[r][c].length;i++){
    if(temp_vars[r][c][i]!=val){
      to_be_removed.push(temp_vars[r][c][i]);
    }
  }
  temp_vars[r][c]=[parseInt(val)];
  var csp = JSON.parse(JSON.stringify(temp_vars));
  for(var i=0;i<neighbors.length;i++){
    var n=neighbors[i];
    if(temp_vars[n[0]][n[1]].indexOf(val)!=(-1)){
      var index=temp_vars[n[0]][n[1]].indexOf(val);
      temp_vars[n[0]][n[1]].splice(index, 1);
      if(temp_vars[n[0]][n[1]].length==0){
        return false;
      }else if(temp_vars[n[0]][n[1]].length==1){
        if(checkconstraint(csp,n[0],n[1],temp_vars[n[0]][n[1]][0])==false){
          return false;
        }else{
          var t=preprocess(csp);
          if(t!=false){
            temp_vars=t;
          }
        }
      }
    }
  }
  var all_units=[];
  var row_units=[];
  var col_units=[];
  var grid_units=[];
  for(var row=0;row<9;row++){
    row_units.push([row,c]);
  }
  for(var col=0;col<9;col++){
    col_units.push([r,col]);
  }
  var tr=0;
  tr=r;
  var tc=0;
  tc=c;
  while((tr%3)!=0){
    tr-=1;
  }
  while((tc%3)!=0){
    tc-=1;
  }
  for(var i=tr;i<tr+3;i++){
    for(var j=tc;j<tc+3;j++){
      grid_units.push([i,j]);
    }
  }

  all_units.push(row_units);
  all_units.push(col_units);
  all_units.push(grid_units);
  for(var i=0;i<to_be_removed.length;i++){
    var val2=to_be_removed[i];
    for(var j=0;j<all_units.length;j++){
      var u=all_units[j];
      var has_val=[];
      for(var k=0;k<u.length;k++){
        var a=u[k];
        if(has_val.indexOf(a)==(-1)){
          if(temp_vars[a[0]][a[1]].indexOf(val2)!=(-1)){
            has_val.push(a);
          }
        }
      }
      if(has_val.length==1){
        return CP(temp_vars,has_val[0][0],has_val[0][1],val2);
      }
    }
  }

  return temp_vars;

}

function preprocess(csp){
  for(var r=0;r<9;r++){
    for(var c=0;c<9;c++){
      if(csp[r][c].length==1){
        var val=csp[r][c][0];
        var neighbors=get_neighbors(r,c);
        for(var i=0;i<neighbors.length;i++){
          var n=neighbors[i];
          if(csp[n[0]][n[1]].indexOf(val)!=(-1)){
            var index=csp[n[0]][n[1]].indexOf(val);
            csp[n[0]][n[1]].splice(index,1);
            if(csp[n[0]][n[1]].length==0){
              return false;
            }
          }
        }
      }
    }
  }
  return csp;
}

function BT(csp){
  vars;
  var r=0;
  var c=0;
  if(iszero(csp)==false){
    return true;
  }else{
    var f0=findzero(csp);
    r=f0[0];
    c=f0[1];
  }
  var init_value={};
  var init_value = JSON.parse(JSON.stringify(csp));
  for(var j=0;j<csp[r][c].length;j++){
    var val=csp[r][c][j];
    if(true){
      var f=CP(csp,r,c,val);
      if(f==false){
        csp=init_value;
      }else if(f!=false){
        vars=f;
        if(BT(vars)){
          return vars;
        }
      }
    }
  }
  return false;
}

function displaycsp(csp){
  var a=document.getElementsByClassName('gridelement');
  for(var i=0;i<9;i++){
    for(var j=0;j<9;j++){
      var ele=document.getElementById((i.toString()).concat(j.toString()));
      ele.innerHTML=csp[i][j].toString();
    }
  }
}

function solvepuzzle(){
  vars=makecsp(initcsp(vars));
  vars=preprocess(vars);
  if(vars==false){
    alert('NO SOLUTION!!');
  }else{
    var res=BT(vars);
    if(res==false){
      alert('NO SOLUTION EXISTS');
    }else{
      displaycsp(vars);
    }

  }
}

function solvewithtiming(){
  var a=performance.now();
  solvepuzzle();
  var b=performance.now();
  console.log('Duration(seconds):',(b-a)/1000);
}
