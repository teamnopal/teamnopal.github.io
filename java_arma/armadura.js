//zona de eventos lista: https://www.w3schools.com/jsref/dom_obj_event.asp
//no estes jugando con las variables, puedes hacer bluckes infinitos
for (var i = 0; i < document.getElementsByClassName("opcionesMenu").length; i++) {
  document.getElementsByClassName("opcionesMenu")[i].addEventListener("click", choseMenu);
}
for (var i = 0; i < document.getElementsByClassName("direccion").length; i++) {
  document.getElementsByClassName("direccion")[i].addEventListener("change",choseDireccion)
}
for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
  if (document.getElementsByTagName("input")[i].type=="checkbox") {
    document.getElementsByTagName("input")[i].checked=false;
  }
  if (document.getElementsByTagName("input")[i].type=="number") {
    document.getElementsByTagName("input")[i].value="";
  }
}
document.getElementsByName("agregarBarra")[0].addEventListener("click", addBarra);
document.getElementsByName("agregarCarga")[0].addEventListener("click",addCarga);
document.getElementsByName("agregarApoyo")[0].addEventListener("click", addApoyo);
document.getElementById("econs").addEventListener("change", bloquearE);
document.getElementById("acons").addEventListener("change", bloquearA);
document.getElementById("n1").addEventListener("change",nodoIn);
document.getElementById("n2").addEventListener("change",nodoFn);
for (var i = 0; i < document.getElementsByClassName("opcionesPlanos").length; i++) {
  document.getElementsByClassName("opcionesPlanos")[i].addEventListener("click",chosePlano);
}
document.getElementById("escala").addEventListener("change",zoomewere);
document.getElementById("ajustes").addEventListener("click",showAjustes);
document.getElementById("hecho").addEventListener("click",showAjustes);
document.getElementById("hecho").addEventListener("click",graficoChange);
document.getElementById("solucion").addEventListener("click",principal);
document.getElementById("modifayer").addEventListener("click",chowCorreccion);
document.getElementById("mBarra").addEventListener("click",modificarBarra);
document.getElementById("modb").addEventListener("change",prepModBarra);
document.getElementById("modc").addEventListener("change",prepModoCarga);
document.getElementById("mCarga").addEventListener("click",modificarCarga);
//zona de variabes
var barra= new Array();//barra[][nodod de inicio, nodo final, longitud,cx,cy,cz,E,A,F]9
var nodo=new Array();//nodo[][x,y,z,rx,ry,rz,fx,fy,fz]9
var cont=new Array(3);
var acciones= new Array();//acciones[][nodo,direccion,magnitud]3
var zoom=1;
cont[0]=0;
ejexy();
ejexz();
ejezy();
var modifi=1;
var k;
var fila;
var columna;
var remplazo;
//zona de funciones
function modificarCarga() {
  if (document.getElementById("modc").value==0 || document.getElementById("fuerza").value=="") {
    return false;
  }
  if (document.getElementsByClassName("direccion")[0].checked==false && document.getElementsByClassName("direccion")[1].checked==false && document.getElementsByClassName("direccion")[2].checked==false) {
    alert("segunda");
    return false;
  }
  var nc=parseInt(document.getElementById("modc").value)-1;
  acciones[nc][2]=parseFloat(document.getElementById("fuerza").value);
  for (var i = 0; i < document.getElementsByClassName("direccion").length; i++) {
    if (document.getElementsByClassName("direccion")[i].checked) {
      acciones[nc][1]=i;
    }
  }
  fila=document.getElementById("tcargas").childNodes[nc+2];
  for (var i = 0; i < 3; i++) {
    columna=fila.childNodes[i+5];
    remplazo=document.createElement("td");
    if (i==acciones[nc][1]) {
      remplazo.appendChild(document.createTextNode(acciones[nc][2]));
    }else {
      remplazo.appendChild(document.createTextNode("---"));
    }
    fila.replaceChild(remplazo,columna);
  }
  graficoChange();
}
function prepModoCarga() {
  if (document.getElementById("modc").value==0) {
    return false;
  }
  for (var i = 0; i < document.getElementsByClassName("direccion").length; i++) {
    document.getElementsByClassName("direccion")[i].checked=false;
  }
  var nc=parseInt(document.getElementById("modc").value)-1;
  document.getElementById("fuerza").value=acciones[nc][2];
  for (var i = 0; i < document.getElementsByClassName("direccion").length; i++) {
    document.getElementsByClassName("direccion")[i].checked=false;
    if (i==acciones[nc][1]) {
      document.getElementsByClassName("direccion")[i].checked=true;
    }
  }
}
function prepModBarra() {
  if (document.getElementById("modb").value==0) {
    return false;
  }
  for (var i = 0; i < document.getElementsByClassName("constante").length; i++) {
    document.getElementsByClassName("constante")[i].checked=false;
  }
  document.getElementById("moduloE").disabled=false;
  document.getElementById("area").disabled=false;
  var nB=parseInt(document.getElementById("modb").value)-1;
  document.getElementById("moduloE").value=barra[nB][6];
  document.getElementById("area").value=barra[nB][7];
}
function modificarBarra() {
  //chowCorreccion();
  if (document.getElementById("modb").value==0) {
    return false;
  }
  var nB=parseInt(document.getElementById("modb").value)-1;
  if (document.getElementById("econs").checked) {
    barra[nB][6]=1;
  }else {
    barra[nB][6]=parseFloat(document.getElementById("moduloE").value);
  }
  if (document.getElementById("acons").checked) {
    barra[nB][7]=1;
  }else {
    barra[nB][7]=parseFloat(document.getElementById("area").value);
  }
  fila=document.getElementById("tbarras").childNodes[nB+2];
  columna=fila.childNodes[4];
  remplazo=document.createElement("td");
  remplazo.appendChild(document.createTextNode(barra[nB][6]));
  fila.replaceChild(remplazo,columna);
  columna=fila.childNodes[5];
  remplazo=document.createElement("td");
  remplazo.appendChild(document.createTextNode(barra[nB][7]));
  fila.replaceChild(remplazo,columna);
}
function chowCorreccion() {
  if (document.getElementsByClassName("modificar")[1].classList.contains("quitar") && document.getElementsByClassName("modificar")[0].classList.contains("quitar")) {

  }else {
    for (var i = 0; i < document.getElementsByClassName("modificar").length; i++) {
      if (document.getElementsByClassName("modificar")[i].classList.contains("quitar")) {
      }else {
        document.getElementsByClassName("modificar")[i].classList.add("quitar");
      }
    }
    for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
      document.getElementsByTagName("input")[i].disabled=false;
    }
    for (var i = 0; i < document.getElementsByTagName("select").length; i++) {
      document.getElementsByTagName("select")[i].disabled=false;
    }
    for (var i = 0; i < document.getElementsByClassName("constante").length; i++) {
      document.getElementsByClassName("constante")[i].checked=false;
    }
    return false;
  }
  for (var i = 0; i < document.getElementsByClassName("modificar").length; i++) {
    if (document.getElementsByClassName("modificar")[i].classList.contains("quitar")) {

    }else {
      document.getElementsByClassName("modificar")[i].classList.add("quitar");
    }
  }
  if (modifi==1) {
    document.getElementsByClassName("modificar")[1].classList.remove("quitar");
    for (var i = 0; i < document.getElementsByClassName("coordenadas").length; i++) {
      document.getElementsByClassName("coordenadas")[i].disabled=true;
    }
    for (var i = 0; i < 2; i++) {
      document.getElementsByClassName("nodos")[i].disabled=true;
    }
    document.getElementsByClassName("agregar")[0].disabled=true;
  }else if (modifi==2) {
    document.getElementsByClassName("modificar")[0].classList.remove("quitar");
    document.getElementsByClassName("nodos")[2].disabled=true;
    document.getElementsByClassName("agregar")[1].disabled=true;
  }else if (modifi==3) {
    return false;
  }
}
function zoomewere() {
  zoom=document.getElementById("escala").value/50;
  graficoChange();
}
function principal() {
  var w= new Array();
  var trans;
  var compl;
  k=new Array(3*nodo.length);
  for (var i = 0; i < k.length; i++) {
    k[i]=new Array(3*nodo.length+1);
  }
  for (var i = 0; i < 3*nodo.length; i++) {
    for (var j = 0; j < 3*nodo.length+1; j++) {
      k[i][j]=0;
    }
  }
  for (var i = 0; i < nodo.length; i++) {
    for (var j = 0; j < nodo.length; j++) {
      if (i==j) {
        var c=0;
        w[i]=new Array();
        for (var h = 0; h < barra.length; h++) {
          if (barra[h][0]==i || barra[h][1]==i) {
            w[i][c]=h;
            c=c+1;
          }
        }
        for (var h = 0; h < c; h++) {
          k[i*3][i*3]=k[i*3][i*3]+barra[w[i][h]][6]*barra[w[i][h]][7]*(barra[w[i][h]][3]**2)/barra[w[i][h]][2];
          k[i*3][i*3+1]=k[i*3][i*3+1]+barra[w[i][h]][6]*barra[w[i][h]][7]*barra[w[i][h]][3]*barra[w[i][h]][4]/barra[w[i][h]][2];
          k[i*3][i*3+2]=k[i*3][i*3+2]+barra[w[i][h]][6]*barra[w[i][h]][7]*barra[w[i][h]][3]*barra[w[i][h]][5]/barra[w[i][h]][2];
          k[i*3+1][i*3+1]=k[i*3+1][i*3+1]+barra[w[i][h]][6]*barra[w[i][h]][7]*(barra[w[i][h]][4]**2)/barra[w[i][h]][2];
          k[i*3+1][i*3]=k[i*3+1][i*3]+barra[w[i][h]][6]*barra[w[i][h]][7]*barra[w[i][h]][3]*barra[w[i][h]][4]/barra[w[i][h]][2];
          k[i*3+1][i*3+2]=k[i*3+1][i*3+2]+barra[w[i][h]][6]*barra[w[i][h]][7]*barra[w[i][h]][5]*barra[w[i][h]][4]/barra[w[i][h]][2];
          k[i*3+2][i*3+2]=k[i*3+2][i*3+2]+barra[w[i][h]][6]*barra[w[i][h]][7]*(barra[w[i][h]][5]**2)/barra[w[i][h]][2];
          k[i*3+2][i*3]=k[i*3+2][i*3]+barra[w[i][h]][6]*barra[w[i][h]][7]*barra[w[i][h]][3]*barra[w[i][h]][5]/barra[w[i][h]][2];
          k[i*3+2][i*3+1]=k[i*3+2][i*3+1]+barra[w[i][h]][6]*barra[w[i][h]][7]*barra[w[i][h]][5]*barra[w[i][h]][4]/barra[w[i][h]][2];
        }
      }else {
        for (var h = 0; h < barra.length; h++) {
          if ((barra[h][0]==i && barra[h][1]==j) || (barra[h][1]==i && barra[h][0]==j)) {
            k[i*3][j*3]=-barra[h][6]*barra[h][7]*(barra[h][3]**2)/barra[h][2];
            k[i*3][j*3+1]=-barra[h][6]*barra[h][7]*barra[h][3]*barra[h][4]/barra[h][2];
            k[i*3][j*3+2]=-barra[h][6]*barra[h][7]*barra[h][3]*barra[h][5]/barra[h][2];
            k[i*3+1][j*3+1]=-barra[h][6]*barra[h][7]*(barra[h][4]**2)/barra[h][2];
            k[i*3+1][j*3]=-barra[h][6]*barra[h][7]*barra[h][3]*barra[h][4]/barra[h][2];
            k[i*3+1][j*3+2]=-barra[h][6]*barra[h][7]*barra[h][5]*barra[h][4]/barra[h][2];
            k[i*3+2][j*3+2]=-barra[h][6]*barra[h][7]*(barra[h][5]**2)/barra[h][2];
            k[i*3+2][j*3]=-barra[h][6]*barra[h][7]*barra[h][3]*barra[h][5]/barra[h][2];
            k[i*3+2][j*3+1]=-barra[h][6]*barra[h][7]*barra[h][5]*barra[h][4]/barra[h][2];
          }
        }
      }
    }
  }
  for (var i = 0; i < nodo.length; i++) {
    for (var j = 6; j < 9; j++) {
      nodo[i][j]=0;
    }
  }
  for (var i = 0; i < acciones.length; i++) {
    if (acciones[i][1]==0) {
      nodo[acciones[i][0]][6]=nodo[acciones[i][0]][6] + acciones[i][2];
    }else if (acciones[i][1]==1) {
      nodo[acciones[i][0]][7]=nodo[acciones[i][0]][7] + acciones[i][2];
    }else {
      nodo[acciones[i][0]][8]=nodo[acciones[i][0]][8] + acciones[i][2];
    }
  }
  for (var i = 0; i < nodo.length; i++) {
    k[i*3][nodo.length*3]=nodo[i][6];
    k[i*3+1][nodo.length*3]=nodo[i][7];
    k[i*3+2][nodo.length*3]=nodo[i][8];
  }
  for (var i = 0; i < nodo.length; i++) {
    if (nodo[i][3]==1) {
      for (var j = 0; j < nodo.length*3; j++) {
        k[j][i*3]=0;
      }
      for (var j = 0; j < nodo.length*3+1; j++) {
        k[i*3][j]=0;
      }
    }
    if (nodo[i][4]==1) {
      for (var j = 0; j < nodo.length*3; j++) {
        k[j][i*3+1]=0;
      }
      for (var j = 0; j < nodo.length*3+1; j++) {
        k[i*3+1][j]=0;
      }
    }
    if (nodo[i][5]==1) {
      for (var j = 0; j < nodo.length*3; j++) {
        k[j][i*3+2]=0;
      }
      for (var j = 0; j < nodo.length*3+1; j++) {
        k[i*3+2][j]=0;
      }
    }
  }
  for (var i = 0; i < nodo.length*3; i++) {
    if (k[i][i]==0) {
      c=1;
    }else {
      c=k[i][i];
    }
    for (var j = 0; j < nodo.length*3+1; j++) {
      k[i][j]=k[i][j]/c;
    }
    for (var j = 0; j < nodo.length*3; j++) {
      c=k[j][i];
      for (var h = 0; h < nodo.length*3+1; h++) {
        if (i==j) {

        }else {
          k[j][h]=k[j][h]-k[i][h]*c;
        }
      }
    }
  }
  for (var i = 0; i < barra.length; i++) {
    barra[i][8]=((k[barra[i][0]*3][nodo.length*3]-k[barra[i][1]*3][nodo.length*3])*(barra[i][3]**3+barra[i][3]*barra[i][4]**2+barra[i][3]*barra[i][5]**2)+(k[barra[i][0]*3+1][nodo.length*3]-k[barra[i][1]*3+1][nodo.length*3])*(barra[i][4]**3+barra[i][4]*barra[i][3]**2+barra[i][4]*barra[i][5]**2)+(k[barra[i][0]*3+2][nodo.length*3]-k[barra[i][1]*3+2][nodo.length*3])*(barra[i][5]**3+barra[i][5]*barra[i][3]**2+barra[i][5]*barra[i][4]**2))/(barra[i][2]*barra[i][6]*barra[i][7]);
  }
  for (var i = 0; i < barra.length; i++) {
    compl=document.createElement("td");
    compl.appendChild(document.createTextNode(i+1));
    trans=document.createElement("tr");
    trans.appendChild(compl);
    for (var j = 0; j < 3; j++) {
      compl=document.createElement("td");
      if (j<2) {
        compl.appendChild(document.createTextNode(barra[i][j]+1));
      }else {
        compl.appendChild(document.createTextNode(barra[i][j]));
      }
      trans.appendChild(compl);
    }
    for (var j = 6; j < 9; j++) {
      compl=document.createElement("td");
      if (Math.abs(barra[i][j])<0.001) {
        compl.appendChild(document.createTextNode(0.000));
      }else {
        compl.appendChild(document.createTextNode(Math.abs(barra[i][j])));
      }
      trans.appendChild(compl);
    }
    compl=document.createElement("td");
    if (barra[i][8]>0) {
      compl.appendChild(document.createTextNode("Compr."));
    }else if (barra[i][8]<0) {
      compl.appendChild(document.createTextNode("Tens."));
    }else {
      compl.appendChild(document.createTextNode("---"));
    }
    trans.appendChild(compl);
    compl=document.createElement("td");
    compl.appendChild(document.createTextNode(-barra[i][8]*barra[i][2]/(barra[i][7]*barra[i][6])));
    trans.appendChild(compl);
    document.getElementById("tsolBarra").appendChild(trans);
  }
  for (var i = 0; i < nodo.length; i++) {
    compl=document.createElement("td");
    compl.appendChild(document.createTextNode(i+1));
    trans=document.createElement("tr");
    trans.appendChild(compl);
    for (var j = 0; j < 3; j++) {
      compl=document.createElement("td");
      compl.appendChild(document.createTextNode(nodo[i][j]));
      trans.appendChild(compl);
    }
    for (var j = 3; j < 6; j++) {
      compl=document.createElement("td");
      if (nodo[i][j]==1) {
        compl.appendChild(document.createTextNode("Resist."));
      }else {
        compl.appendChild(document.createTextNode("Free"));
      }
      trans.appendChild(compl);
    }
    for (var j = 6; j < 9; j++) {
      compl=document.createElement("td");
      compl.appendChild(document.createTextNode(nodo[i][j]));
      trans.appendChild(compl);
    }
    for (var j = 0; j < 3; j++) {
      compl=document.createElement("td");
      compl.appendChild(document.createTextNode(k[i*3+j][nodo.length*3]));
      trans.appendChild(compl);
    }
    var rx=-nodo[i][6];
    var ry=-nodo[i][7];
    var rz=-nodo[i][8];
    for (var j = 0; j < barra.length; j++) {
      if (barra[j][0]==i) {
        rx=(rx+barra[j][8]*barra[j][3])*nodo[i][3];
        ry=(ry+barra[j][8]*barra[j][4])*nodo[i][4];
        rz=(rz+barra[j][8]*barra[j][5])*nodo[i][5];
      }
      if (barra[j][1]==i) {
        rx=(rx-barra[j][8]*barra[j][3])*nodo[i][3];
        ry=(ry-barra[j][8]*barra[j][4])*nodo[i][4];
        rz=(rz-barra[j][8]*barra[j][5])*nodo[i][5];
      }
    }
    compl=document.createElement("td");
    if (Math.abs(rx)<0.0001) {
      compl.appendChild(document.createTextNode(0.000));
    }else {
      compl.appendChild(document.createTextNode(rx));
    }
    trans.appendChild(compl);
    compl=document.createElement("td");
    if (Math.abs(ry)<0.0001) {
      compl.appendChild(document.createTextNode(0.000));
    }else {
      compl.appendChild(document.createTextNode(ry));
    }
    trans.appendChild(compl);
    compl=document.createElement("td");
    if (Math.abs(rz)<0.0001) {
      compl.appendChild(document.createTextNode(0.000));
    }else {
      compl.appendChild(document.createTextNode(rz));
    }
    trans.appendChild(compl);
    document.getElementById("tsolNodos").appendChild(trans);
  }
}
function dibujarApoyos(nn) {
  if (document.getElementById("grafApoyos").checked==false) {
    return false;
  }
  var can=document.getElementById("planoxy").getContext("2d");
  can.fillStyle="rgb(238, 238, 165)";
  can.strokeStyle="rgb(238, 238, 165)";
  if (nodo[nn][3]==1 && nodo[nn][4]==1 && nodo[nn][5]==1) {
    can.fillRect(50+50*nodo[nn][0]*zoom-4,520-50*nodo[nn][1]*zoom-4,8,8);
  }else {
    can.moveTo(50+50*nodo[nn][0]*zoom,520-50*nodo[nn][1]*zoom);
    can.arc(50+50*nodo[nn][0]*zoom,520-50*nodo[nn][1]*zoom,4,0,2*Math.PI,false);
    can.fill();
  }
  var can=document.getElementById("planoxz").getContext("2d");
  can.fillStyle="rgb(238, 238, 165)";
  can.strokeStyle="rgb(238, 238, 165)";
  if (nodo[nn][3]==1 && nodo[nn][4]==1 && nodo[nn][5]==1) {
    can.fillRect(50+50*nodo[nn][0]*zoom-4,100+50*nodo[nn][2]*zoom-4,8,8);
  }else {
    can.moveTo(50+50*nodo[nn][0]*zoom,100+50*nodo[nn][2]*zoom);
    can.arc(50+50*nodo[nn][0]*zoom,100+50*nodo[nn][2]*zoom,4,0,2*Math.PI,false);
    can.fill();
  }
  var can=document.getElementById("planozy").getContext("2d");
  can.fillStyle="rgb(238, 238, 165)";
  can.strokeStyle="rgb(238, 238, 165)";
  if (nodo[nn][3]==1 && nodo[nn][4]==1 && nodo[nn][5]==1) {
    can.fillRect(50+50*nodo[nn][2]*zoom-4,520-50*nodo[nn][1]*zoom-4,8,8);
  }else {
    can.moveTo(50+50*nodo[nn][2]*zoom,520-50*nodo[nn][1]*zoom);
    can.arc(50+50*nodo[nn][2]*zoom,520-50*nodo[nn][1]*zoom,4,0,2*Math.PI,false);
    can.fill();
  }
}
function addApoyo() {
  if (document.getElementsByClassName("resist")[0].checked || document.getElementsByClassName("resist")[1].checked || document.getElementsByClassName("resist")[2].checked) {
    var nn=parseFloat(document.getElementById("na").value-1);
    var trans;
    if (document.getElementsByClassName("resist")[0].checked) {
      nodo[nn][3]=1;
    }else {
      nodo[nn][3]=0;
    }
    if (document.getElementsByClassName("resist")[1].checked) {
      nodo[nn][4]=1;
    }else {
      nodo[nn][4]=0;
    }
    if (document.getElementsByClassName("resist")[2].checked) {
      nodo[nn][5]=1;
    }else {
      nodo[nn][5]=0;
    }
    dibujarApoyos(nn);
    compl=document.createElement("td");
    compl.appendChild(document.createTextNode(nn+1));
    trans=document.createElement("tr");
    trans.appendChild(compl);
    for (var i = 0; i <3 ; i++) {
      compl=document.createElement("td");
      compl.appendChild(document.createTextNode(nodo[nn][i]));
      trans.appendChild(compl);
    }
    for (var i = 3; i < 6; i++) {
      compl=document.createElement("td");
      if (nodo[nn][i]==1) {
        compl.appendChild(document.createTextNode("Rst."));
      }else {
        compl.appendChild(document.createTextNode("Free"));
      }
      trans.appendChild(compl);
    }
    document.getElementById("tapoyos").appendChild(trans);
    graficoChange();
  }else {
    return 0;
  }
}
function dibujarCargas(nc) {
  if (document.getElementById("grafCargas").checked==false) {
    return false;
  }
  var can=document.getElementById("planoxy").getContext("2d");
  can.beginPath();
  can.strokeStyle="#7fb9fb";
  can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
  if (acciones[nc][1]==0) {
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]-.15*acciones[nc][2])*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]-.02*acciones[nc][2])*zoom,520-50*(nodo[acciones[nc][0]][1]-.1)*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]-.02*acciones[nc][2])*zoom,520-50*(nodo[acciones[nc][0]][1]+.1)*zoom);
  }else if (acciones[nc][1]==1) {
    can.lineTo(50+50*nodo[acciones[nc][0]][0]*zoom,520-50*(nodo[acciones[nc][0]][1]-.15*acciones[nc][2])*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]-.1)*zoom,520-50*(nodo[acciones[nc][0]][1]-.02*acciones[nc][2])*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]+.1)*zoom,520-50*(nodo[acciones[nc][0]][1]-.02*acciones[nc][2])*zoom);
  }
  can.stroke();
  can=document.getElementById("planoxz").getContext("2d");
  can.beginPath();
  can.strokeStyle="#7fb9fb";
  can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,100+50*nodo[acciones[nc][0]][2]*zoom);
  if (acciones[nc][1]==0) {
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]-.15*acciones[nc][2])*zoom,100+50*nodo[acciones[nc][0]][2]*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,100+50*nodo[acciones[nc][0]][2]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]-.02*acciones[nc][2])*zoom,100+50*(nodo[acciones[nc][0]][2]-.1)*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,100+50*nodo[acciones[nc][0]][2]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]-.02*acciones[nc][2])*zoom,100+50*(nodo[acciones[nc][0]][2]+.1)*zoom);
  }else if (acciones[nc][1]==2) {
    can.lineTo(50+50*nodo[acciones[nc][0]][0]*zoom,100+50*(nodo[acciones[nc][0]][2]-.15*acciones[nc][2])*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,100+50*nodo[acciones[nc][0]][2]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]-.1)*zoom,100+50*(nodo[acciones[nc][0]][2]-.02*acciones[nc][2])*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][0]*zoom,100+50*nodo[acciones[nc][0]][2]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][0]+.1)*zoom,100+50*(nodo[acciones[nc][0]][2]-.02*acciones[nc][2])*zoom);
  }
  can.stroke();
  can=document.getElementById("planozy").getContext("2d");
  can.beginPath();
  can.strokeStyle="#7fb9fb";
  can.moveTo(50+50*nodo[acciones[nc][0]][2]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
  if (acciones[nc][1]==2) {
    can.lineTo(50+50*(nodo[acciones[nc][0]][2]-.15*acciones[nc][2])*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][2]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][2]-.02*acciones[nc][2])*zoom,520-50*(nodo[acciones[nc][0]][1]-.1)*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][2]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][2]-.02*acciones[nc][2])*zoom,520-50*(nodo[acciones[nc][0]][1]+.1)*zoom);
  }else if (acciones[nc][1]==1) {
    can.lineTo(50+50*nodo[acciones[nc][0]][2]*zoom,520-50*(nodo[acciones[nc][0]][1]-.15*acciones[nc][2])*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][2]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][2]-.1)*zoom,520-50*(nodo[acciones[nc][0]][1]-.02*acciones[nc][2])*zoom);
    can.moveTo(50+50*nodo[acciones[nc][0]][2]*zoom,520-50*nodo[acciones[nc][0]][1]*zoom);
    can.lineTo(50+50*(nodo[acciones[nc][0]][2]+.1)*zoom,520-50*(nodo[acciones[nc][0]][1]-.02*acciones[nc][2])*zoom);
  }
  can.stroke();
}
function choseDireccion() {
  if (this.checked) {
    for (var i = 0; i < document.getElementsByClassName("direccion").length; i++) {
      document.getElementsByClassName("direccion")[i].checked=false;
    }
    this.checked=true;
  }else {
    for (var i = 0; i < document.getElementsByClassName("direccion").length; i++) {
      document.getElementsByClassName("direccion")[i].checked=false;
    }
  }
}
function addCarga() {
  if (document.getElementsByClassName("direccion")[0].checked || document.getElementsByClassName("direccion")[1].checked || document.getElementsByClassName("direccion")[2].checked) {
    var trans;
    acciones[acciones.length]=new Array(3);
    var trans=document.createElement("option");
    trans.appendChild(document.createTextNode(acciones.length));
    trans.setAttribute("value", acciones.length);
    document.getElementById("modc").appendChild(trans);
    acciones[acciones.length-1][0]=parseFloat(document.getElementById("nc").value-1);
    acciones[acciones.length-1][2]=parseFloat(document.getElementById("fuerza").value);
    for (var i = 0; i < document.getElementsByClassName("direccion").length; i++) {
      if (document.getElementsByClassName("direccion")[i].checked) {
        acciones[acciones.length-1][1]=i;
      }
    }
    var compl=document.createElement("td");
    compl.appendChild(document.createTextNode(acciones.length));
    trans=document.createElement("tr");
    trans.appendChild(compl);
    compl=document.createElement("td");
    compl.appendChild(document.createTextNode(acciones[acciones.length-1][0]+1));
    trans.appendChild(compl);
    for (var i = 0; i < 3; i++) {
      compl=document.createElement("td");
      compl.appendChild(document.createTextNode(nodo[acciones[acciones.length-1][0]][i]));
      trans.appendChild(compl);
    }
    for (var i = 0; i < 3; i++) {
      compl=document.createElement("td");
      if (acciones[acciones.length-1][1]==i) {
        compl.appendChild(document.createTextNode(acciones[acciones.length-1][2]));

      }else {
        compl.appendChild(document.createTextNode("---"));
      }
      trans.appendChild(compl);
    }
    document.getElementById("tcargas").appendChild(trans);
  }else {
    return false;
  }
  dibujarCargas(acciones.length-1);
}
function graficoChange() {
  var can=document.getElementById("planoxy").getContext("2d");
  can.clearRect(0,0,document.getElementById("planoxy").width,document.getElementById("planoxy").height);
  can=document.getElementById("planoxz").getContext("2d");
  can.clearRect(0,0,document.getElementById("planoxz").width,document.getElementById("planoxz").height);
  can=document.getElementById("planozy").getContext("2d");
  can.clearRect(0,0,document.getElementById("planozy").width,document.getElementById("planozy").height);
  ejexy();
  ejexz();
  ejezy();
  for (var i = 0; i < barra.length; i++) {
    dibujarBarraxy(nodo[barra[i][0]][0],nodo[barra[i][0]][1],nodo[barra[i][1]][0],nodo[barra[i][1]][1]);
    dibujarBarraxz(nodo[barra[i][0]][0],nodo[barra[i][0]][2],nodo[barra[i][1]][0],nodo[barra[i][1]][2]);
    dibujarBarrazy(nodo[barra[i][0]][2],nodo[barra[i][0]][1],nodo[barra[i][1]][2],nodo[barra[i][1]][1]);
    dibujarNumBarra(i);
  }
  for (var i = 0; i < nodo.length; i++) {
    dibujarNumNodo(i);
    if (nodo[i][3]==1 || nodo[i][4]==1 || nodo[i][5]==1) {
      dibujarApoyos(i);
    }
  }
  for (var i = 0; i < acciones.length; i++) {
    dibujarCargas(i);
  }
}
function dibujarNumNodo(nn) {
  if (document.getElementById("numNodo").checked) {
    var can=document.getElementById("planoxy").getContext("2d");
    can.fillStyle="#fc0000";
    can.font="15px Consolas";
    can.fillText(nn+1,50+50*nodo[nn][0]*zoom,520-50*nodo[nn][1]*zoom);
    can=document.getElementById("planoxz").getContext("2d");
    can.fillStyle="#fc0000";
    can.font="15px Consolas";
    can.fillText(nn+1,50+50*nodo[nn][0]*zoom,100+50*nodo[nn][2]*zoom);
    can=document.getElementById("planozy").getContext("2d");
    can.fillStyle="#fc0000";
    can.font="15px Consolas";
    can.fillText(nn+1,50+50*nodo[nn][2]*zoom,520-50*nodo[nn][1]*zoom);
  }else {
    return false;
  }
}
function dibujarNumBarra(nb) {
  if (document.getElementById("numBarra").checked) {
    var can=document.getElementById("planoxy").getContext("2d");
    can.fillStyle="#9eb19a";
    can.font="15px Consolas";
    can.fillText(nb+1,50+25*(nodo[barra[nb][1]][0]+nodo[barra[nb][0]][0])*zoom,520-25*(nodo[barra[nb][1]][1]+nodo[barra[nb][0]][1])*zoom);
    can=document.getElementById("planoxz").getContext("2d");
    can.fillStyle="#9eb19a";
    can.font="15px Consolas";
    can.fillText(nb+1,50+25*(nodo[barra[nb][1]][0]+nodo[barra[nb][0]][0])*zoom,100+25*(nodo[barra[nb][1]][2]+nodo[barra[nb][0]][2])*zoom);
    can=document.getElementById("planozy").getContext("2d");
    can.fillStyle="#9eb19a";
    can.font="15px Consolas";
    can.fillText(nb+1,50+50*(nodo[barra[nb][1]][2]+nodo[barra[nb][0]][2])*zoom/2,520-50*(nodo[barra[nb][1]][1]+nodo[barra[nb][0]][1])*zoom/2);
  }else {
    return false;
  }
}
function showAjustes() {
  if (document.getElementsByClassName("menuAjustes")[0].classList.contains("quitar")) {
    document.getElementsByClassName("menuAjustes")[0].classList.remove("quitar");
  }else {
    document.getElementsByClassName("menuAjustes")[0].classList.add("quitar");
  }
}
function nodoIn() {
  if (document.getElementById("n1").value==0) {
    return false;
  }
  document.getElementById("x1").value=nodo[parseFloat(document.getElementById("n1").value)-1][0];
  document.getElementById("y1").value=nodo[parseFloat(document.getElementById("n1").value)-1][1];
  document.getElementById("z1").value=nodo[parseFloat(document.getElementById("n1").value)-1][2];
}
function nodoFn() {
  if (document.getElementById("n2").value==0) {
    return false;
  }
  document.getElementById("x2").value=nodo[parseFloat(document.getElementById("n2").value)-1][0];
  document.getElementById("y2").value=nodo[parseFloat(document.getElementById("n2").value)-1][1];
  document.getElementById("z2").value=nodo[parseFloat(document.getElementById("n2").value)-1][2];
}
function ejexy() {
  var can=document.getElementById("planoxy").getContext("2d");
  can.strokeStyle= "#9eb19a";
  can.beginPath();
  can.moveTo(20,600);
  can.lineTo(20,540);
  can.stroke();
  can.beginPath();
  can.moveTo(20,600);
  can.lineTo(80,600);
  can.stroke();
  can.fillStyle="#9eb19a"
  can.font="15px Consolas";
  can.fillText("Y", 16,538);
  can.fillText("X", 81,605);
}
function ejexz() {
  var can=document.getElementById("planoxz").getContext("2d");
  can.strokeStyle= "#9eb19a";
  can.beginPath();
  can.moveTo(20,40);
  can.lineTo(80,40);
  can.stroke();
  can.beginPath();
  can.moveTo(20,40);
  can.lineTo(20,100);
  can.stroke();
  can.fillStyle="#9eb19a"
  can.font="15px Consolas";
  can.fillText("Z", 16,115);
  can.fillText("X", 81,45);
}
function ejezy() {
  var can=document.getElementById("planozy").getContext("2d");
  can.strokeStyle= "#9eb19a";
  can.beginPath();
  can.moveTo(20,600);
  can.lineTo(20,540);
  can.stroke();
  can.beginPath();
  can.moveTo(20,600);
  can.lineTo(80,600);
  can.stroke();
  can.fillStyle="#9eb19a"
  can.font="15px Consolas";
  can.fillText("Y", 16,538);
  can.fillText("Z", 81,605);
}
function dibujarBarraxy(xi,yi,xf,yf) {
  var can=document.getElementById("planoxy").getContext("2d");
  can.beginPath();
  can.strokeStyle="#98cf9b";
  can.moveTo(50+50*xi*zoom,520-50*yi*zoom);
  can.lineTo(50+25*(xf+xi)*zoom,520-25*(yf+yi)*zoom);
  can.stroke();
  can.beginPath();
  can.strokeStyle="#ba7272";
  can.moveTo(50+50*(xf+xi)*zoom/2,520-50*(yf+yi)*zoom/2);
  can.lineTo(50+50*xf*zoom,520-50*yf*zoom);
  can.stroke();
}
function dibujarBarrazy(zi,yi,zf,yf) {
  var can=document.getElementById("planozy").getContext("2d");
  can.beginPath();
  can.strokeStyle="#98cf9b";
  can.moveTo(50+50*zi*zoom,520-50*yi*zoom);
  can.lineTo(50+25*(zf+zi)*zoom,520-25*(yf+yi)*zoom);
  can.stroke();
  can.beginPath();
  can.strokeStyle="#ba7272";
  can.moveTo(50+50*(zf+zi)*zoom/2,520-50*(yf+yi)*zoom/2);
  can.lineTo(50+50*zf*zoom,520-50*yf*zoom);
  can.stroke();
}
function dibujarBarraxz(xi,zi,xf,zf) {
  var can=document.getElementById("planoxz").getContext("2d");
  can.beginPath();
  can.strokeStyle="#98cf9b";
  can.moveTo(50+50*xi*zoom,100+50*zi*zoom);
  can.lineTo(50+25*(xf+xi)*zoom,100+25*(zf+zi)*zoom);
  can.stroke();
  can.beginPath();
  can.strokeStyle="#ba7272";
  can.moveTo(50+50*(xf+xi)*zoom/2,100+50*(zf+zi)*zoom/2);
  can.lineTo(50+50*xf*zoom,100+50*zf*zoom);
  can.stroke();
}
function addBarra() {
  var trans;
  barra[barra.length]=new Array(9);
  trans=document.createElement("option");
  trans.appendChild(document.createTextNode(barra.length));
  trans.setAttribute("value", barra.length);
  document.getElementById("modb").appendChild(trans);
  var x1=parseFloat(document.getElementById("x1").value);
  var y1=parseFloat(document.getElementById("y1").value);
  var z1=parseFloat(document.getElementById("z1").value);
  var x2=parseFloat(document.getElementById("x2").value);
  var y2=parseFloat(document.getElementById("y2").value);
  var z2=parseFloat(document.getElementById("z2").value);
  dibujarBarraxy(x1,y1,x2,y2);
  dibujarBarrazy(z1,y1,z2,y2);
  dibujarBarraxz(x1,z1,x2,z2);

  if (x1== 0 && y1==0 && z1==0 && cont[0]==0) {
    cont[0]=1;
    nodo[nodo.length]=new Array(9);
    nodo[nodo.length-1][0]=x1;
    nodo[nodo.length-1][1]=y1;
    nodo[nodo.length-1][2]=z1;
    nodo[nodo.length-1][3]=0;
    nodo[nodo.length-1][4]=0;
    nodo[nodo.length-1][5]=0;
    dibujarNumNodo(nodo.length-1);
    for (var i = 0; i < document.getElementsByClassName("nodos").length; i++) {
      trans=document.createElement("option");
      trans.appendChild(document.createTextNode(nodo.length));
      trans.setAttribute("value", nodo.length);
      document.getElementsByClassName("nodos")[i].appendChild(trans);
    }
  }
  barra[barra.length-1][2]=((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2)**(1/2);
  barra[barra.length-1][3]=(x2-x1)/barra[barra.length-1][2];
  barra[barra.length-1][4]=(y2-y1)/barra[barra.length-1][2];
  barra[barra.length-1][5]=(z2-z1)/barra[barra.length-1][2];
  cont[1]=0;
  for (var i = 0; i < nodo.length; i++) {
    if (nodo[i][0]==x1 && nodo[i][1]==y1 && nodo[i][2]==z1) {
      cont[1]=1;
      barra[barra.length-1][0]=i;
    }
  }
  if (cont[1]==0) {
    nodo[nodo.length]=new Array(9);
    nodo[nodo.length-1][0]=x1;
    nodo[nodo.length-1][1]=y1;
    nodo[nodo.length-1][2]=z1;
    nodo[nodo.length-1][3]=0;
    nodo[nodo.length-1][4]=0;
    nodo[nodo.length-1][5]=0;
    dibujarNumNodo(nodo.length-1);
    barra[barra.length-1][0]=nodo.length-1;
    for (var i = 0; i < document.getElementsByClassName("nodos").length; i++) {
      trans=document.createElement("option");
      trans.appendChild(document.createTextNode(nodo.length));
      trans.setAttribute("value", nodo.length);
      document.getElementsByClassName("nodos")[i].appendChild(trans);
    }
  }
  if (x2== 0 && y2==0 && z2==0 && cont[0]==0) {
    cont[0]=1;
    nodo[nodo.length]=new Array(9);
    nodo[nodo.length-1][0]=x2;
    nodo[nodo.length-1][1]=y2;
    nodo[nodo.length-1][2]=z2;
    nodo[nodo.length-1][3]=0;
    nodo[nodo.length-1][4]=0;
    nodo[nodo.length-1][5]=0;
    dibujarNumNodo(nodo.length-1);
    for (var i = 0; i < document.getElementsByClassName("nodos").length; i++) {
      trans=document.createElement("option");
      trans.appendChild(document.createTextNode(nodo.length));
      trans.setAttribute("value", nodo.length);
      document.getElementsByClassName("nodos")[i].appendChild(trans);
    }
  }
  cont[1]=0;
  for (var i = 0; i < nodo.length; i++) {
    if (nodo[i][0]==x2 && nodo[i][1]==y2 && nodo[i][2]==z2) {
      cont[1]=1;
      barra[barra.length-1][1]=i;
    }
  }
  if (cont[1]==0) {
    nodo[nodo.length]=new Array(9);
    nodo[nodo.length-1][0]=x2;
    nodo[nodo.length-1][1]=y2;
    nodo[nodo.length-1][2]=z2;
    nodo[nodo.length-1][3]=0;
    nodo[nodo.length-1][4]=0;
    nodo[nodo.length-1][5]=0;
    dibujarNumNodo(nodo.length-1);
    barra[barra.length-1][1]=nodo.length-1;
    for (var i = 0; i < document.getElementsByClassName("nodos").length; i++) {
      trans=document.createElement("option");
      trans.appendChild(document.createTextNode(nodo.length));
      trans.setAttribute("value", nodo.length);
      document.getElementsByClassName("nodos")[i].appendChild(trans);
    }
  }
  if (document.getElementById("econs").checked) {
    barra[barra.length-1][6]=1;
  }else {
    barra[barra.length-1][6]=parseFloat(document.getElementById("moduloE").value);
  }
  if (document.getElementById("acons").checked) {
    barra[barra.length-1][7]=1;
  }else {
    barra[barra.length-1][7]=parseFloat(document.getElementById("area").value);
  }
  var compl=document.createElement("td");
  compl.appendChild(document.createTextNode(barra.length));
  trans=document.createElement("tr");
  trans.appendChild(compl);
  for (var i = 0; i < 2; i++) {
    compl=document.createElement("td");
    compl.appendChild(document.createTextNode(barra[barra.length-1][i]+1));
    trans.appendChild(compl);
  }
  compl=document.createElement("td");
  compl.appendChild(document.createTextNode(barra[barra.length-1][2]));
  trans.appendChild(compl);
  document.getElementById("tbarras").appendChild(trans);
  for (var i = 6; i < 8; i++) {
    compl=document.createElement("td");
    compl.appendChild(document.createTextNode(barra[barra.length-1][i]));
    trans.appendChild(compl);
  }
  dibujarNumBarra(barra.length-1);
}
function bloquearE() {
  if (document.getElementById("econs").checked) {
    document.getElementById("moduloE").disabled=true;
    document.getElementById("moduloE").setAttribute("placeholder", "------");
    document.getElementById("moduloE").value="";
  }else {
    document.getElementById("moduloE").disabled=false;
    document.getElementById("moduloE").setAttribute("placeholder", "Modulo de elasticidad");
  }
}
function bloquearA() {
  if (document.getElementById("acons").checked) {
    document.getElementById("area").disabled=true;
    document.getElementById("area").setAttribute("placeholder", "------");
    document.getElementById("area").value="";
  }else {
    document.getElementById("area").disabled=false;
    document.getElementById("area").setAttribute("placeholder", "Area de la seccion");
  }
}
function chosePlano() {
  for (var i = 0; i < document.getElementsByClassName("opcionesPlanos").length; i++) {
    if (document.getElementsByClassName("opcionesPlanos")[i].classList.contains("planoElegido")) {
      document.getElementsByClassName("opcionesPlanos")[i].classList.remove("planoElegido");
    }
  }
  for (var i = 0; i < document.getElementsByClassName("zonaDibujo").length; i++) {
    if (document.getElementsByClassName("zonaDibujo")[i].classList.contains("quitar")) {
      document.getElementsByClassName("zonaDibujo")[i].classList.remove("quitar")
    }
  }
  this.classList.add("planoElegido");
  if (this.id=="plxy") {
    document.getElementById("planoxz").classList.add("quitar");
    document.getElementById("planozy").classList.add("quitar");
  }else if (this.id=="plxz") {
    document.getElementById("planoxy").classList.add("quitar");
    document.getElementById("planozy").classList.add("quitar");
  }else {
    document.getElementById("planoxy").classList.add("quitar");
    document.getElementById("planoxz").classList.add("quitar");
  }
}
function choseMenu() {
  for (var i = 0; i < document.getElementsByClassName("opcionesMenu").length; i++) {
    if (document.getElementsByClassName("opcionesMenu")[i].classList.contains("menuElegido")) {
      document.getElementsByClassName("opcionesMenu")[i].classList.remove("menuElegido");
    }
  }
  this.classList.add("menuElegido");
  for (var i = 0; i < document.getElementsByClassName("entrada").length; i++) {
    if (document.getElementsByClassName("entrada")[i].classList.contains("quitar")) {
      document.getElementsByClassName("entrada")[i].classList.remove("quitar");
    }
  }
  for (var i = 0; i < document.getElementsByClassName("tabla").length; i++) {
    if (document.getElementsByClassName("tabla")[i].classList.contains("quitar")) {
      document.getElementsByClassName("tabla")[i].classList.remove("quitar");
    }
  }
  if (this.id==="barras"){
    document.getElementById("ecargas").classList.add("quitar");
    document.getElementById("eapoyos").classList.add("quitar");
    document.getElementById("resultados").classList.add("quitar");
    document.getElementById("tapoyos").classList.add("quitar");
    document.getElementById("tcargas").classList.add("quitar");
    document.getElementById("tsolNodos").classList.add("quitar");
    modifi=1;
  }else if (this.id==="cargas") {
    document.getElementById("ebarras").classList.add("quitar");
    document.getElementById("eapoyos").classList.add("quitar");
    document.getElementById("resultados").classList.add("quitar");
    document.getElementById("tbarras").classList.add("quitar");
    document.getElementById("tapoyos").classList.add("quitar");
    document.getElementById("tsolNodos").classList.add("quitar");
    modifi=2;
  }else if (this.id==="apoyos") {
    document.getElementById("ebarras").classList.add("quitar");
    document.getElementById("ecargas").classList.add("quitar");
    document.getElementById("resultados").classList.add("quitar");
    document.getElementById("tbarras").classList.add("quitar");
    document.getElementById("tcargas").classList.add("quitar");
    document.getElementById("tsolNodos").classList.add("quitar");
    modifi=3;
  }else {
    document.getElementById("ebarras").classList.add("quitar");
    document.getElementById("ecargas").classList.add("quitar");
    document.getElementById("eapoyos").classList.add("quitar");
    document.getElementById("tbarras").classList.add("quitar");
    document.getElementById("tcargas").classList.add("quitar");
    document.getElementById("tapoyos").classList.add("quitar");
    modifi=4;
  }
}
