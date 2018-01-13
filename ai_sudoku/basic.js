//Global csp
var vars={};

function removecellcontent(cellelement){
  cellelement.innerHTML="";
}
function makeeditable(){
  var b=document.getElementById("donepuzzle");
  b.style.visibility="visible";
  var a=document.getElementsByClassName("gridelement");
  for(var i=0;i<a.length;i++){
    a[i].setAttribute("contenteditable","true");
  }
}
function donepuzzle(){
  document.getElementById("solvepuzzle").disabled=false;
  var a=document.getElementsByClassName("gridelement");

  for(var i=0;i<a.length;i++){
    a[i].setAttribute("contenteditable","false");
    if(a[i].innerHTML!="0"){
      a[i].style.backgroundColor="#FFEFD5";
    }
  }
  document.getElementById("donepuzzle").style.visibility="hidden";

}
function readtable(){
  var values=[];
  var a=document.getElementsByClassName("gridelement");
  for(var i=0;i<a.length;i++){
    values.push(a[i].innerHTML);
  }
  solvewithtiming();
  document.getElementById("solvepuzzle").disabled=true;
}
function resetvalues(){
  var values=[];
  var a=document.getElementsByClassName("gridelement");
  for(var i=0;i<a.length;i++){
    a[i].innerHTML=0;
    a[i].style.backgroundColor="white";
    values.push(a[i].innerHTML);
  }
  document.getElementById("solvepuzzle").disabled=true;
}
function makethegrid(){
  var rmax=9,cmax=9;
  var t=document.createElement("table");
  t.setAttribute("id","grid");
  document.body.appendChild(t);
  for(var i=0;i<rmax;i++){
    var r=document.createElement("tr");
    var idforrow="tr"+i;
    r.setAttribute("id",idforrow);
    document.getElementById("grid").appendChild(r);
    for(var j=0;j<cmax;j++){
      var c=document.createElement("td");
      var idforcol=(i.toString()).concat(j.toString());
      c.setAttribute("id",idforcol);
      c.setAttribute("class","gridelement");
      c.setAttribute("contenteditable","false");
      c.setAttribute("onfocus","removecellcontent(this)");
      if(j==2 || j==5){
        c.className+=" specialcol";
      }
      c.innerHTML=0;
      document.getElementById(idforrow).appendChild(c);
    }

  }
}

makethegrid();
