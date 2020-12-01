//variables
var svg;

//funciones

function aleatorio(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function repite(){
    bola.mueve();
    bola.dibuja();
    bola.gol();
    
    
}

//Window onload
window.onload = () =>
    {
    svg=document.getElementById("mapa");
    game= new game(0,0);
    game.jugar();
    setInterval(repite,10);
}

//clases
class game{
    constructor(ganadas1, ganadas2){
        this.ganadas1=ganadas1;
        this.ganadas2=ganadas2;
    }

jugar(){
    bola= new bola(aleatorio(50,950),aleatorio(3,5),aleatorio(3,5),svg);
    var palo1= new palo("palo1",50,350,svg);
    var palo2= new palo("palo2",2450,350,svg);
    
    
}

}

class bola {
    constructor(y,vely,velx,svgcontenedor){
        this.x=1250;
        this.y=y;
        this.velx=velx;
        this.vely=vely;
        this.radio=20;

        this.tagcircle=document.createElementNS("http://www.w3.org/2000/svg","circle");
        this.tagcircle.setAttributeNS(null,"cx",this.x);
        this.tagcircle.setAttributeNS(null,"cy",this.y);
        this.tagcircle.setAttributeNS(null,"r",this.radio);
        this.tagcircle.setAttributeNS(null,"id","bola");
        this.tagcircle.setAttributeNS(null,"fill","white");
        svgcontenedor.appendChild(this.tagcircle);
    }
    
    mueve(){
    
        this.x += this.velx;
        this.y += this.vely;

        if(this.x-this.radio<=0 || this.x+ this.radio >= 2800){
            this.velx*=-1;
        }
        if(this.y-this.radio<=0 || this.y+this.radio >= 1000){
            this.vely*=-1;
        }

        var p1= document.getElementById("palo1");
        var p2= document.getElementById("palo2");
        
        if(this.x >=p2.x.animVal.value-this.radio && this.x <=p2.x.animVal.value+p2.width.animVal.value && this.y+this.radio>=p2.y.animVal.value && this.y-this.radio<=(p2.y.animVal.value+p2.height.animVal.value)){
            this.velx = -1;
            this.velx  -=2;
            if(Math.round(Math.random())*3==3){
                if(this.vely>0){
                    this.vely+=1;
                    if(this.vely>10)this.vely=9;
                }else{
                    this.vely+=-1;
                    if(this.vely<-10)this.vely=-9;
                 }
            }
        }
        if(this.x-this.radio<=p1.x.animVal.value+p1.width.animVal.value && this.x >=p1.x.animVal.value && this.y+this.radio>=p1.y.animVal.value && this.y-this.radio<=p1.y.animVal.value+p1.height.animVal.value){
            this.velx = -1;
            this.velx+=3;
            if(Math.round(Math.random())*3==3){
                if(this.vely>0){
                    this.vely+=1;
                    if(this.vely>10)this.vely=6;
                }else{
                    this.vely+=-1;
                    if(this.vely<-10)this.vely=-6;
                }
            }
        }   
    }
    dibuja(){
        this.tagcircle.setAttributeNS(null, "cx", this.x);
        this.tagcircle.setAttributeNS(null, "cy", this.y);
    }
    gol(){

    }
}


class palo{
    constructor(nombre,x, y,svgcontenedor){
        this.x=x;
        this.y=y;
        this.width=20;
        this.height=150;
        this.nombre=nombre;

        this.tagpalo=document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.tagpalo.setAttributeNS(null,"x",this.x);
        this.tagpalo.setAttributeNS(null,"y",this.y);
        this.tagpalo.setAttributeNS(null,"width",this.width);
        this.tagpalo.setAttributeNS(null,"height",this.height);
        this.tagpalo.setAttributeNS(null,"id",this.nombre);
        this.tagpalo.setAttributeNS(null,"fill","white");
        svgcontenedor.appendChild(this.tagpalo);
        
        var p1= document.getElementById("palo1");
        var p2= document.getElementById("palo2");
        

            document.addEventListener("keydown", event=>{
            
            if(p1.y.animVal.value>=0){
                if(event.key=="w"|| event.key=="W"){
                   
                    p1.setAttributeNS(null,"y", p1.y.animVal.value-25);
                }
            }
            if(p1.y.animVal.value<=850){
                if(event.key=="s" || event.key=="S"){
                    p1.setAttributeNS(null, "y", p1.y.animVal.value+25);
                }
            }
            if( p2.y.animVal.value>=0){

                if(event.key=="ArrowUp"){
                    p2.setAttributeNS(null,"y",p2.y.animVal.value-50);
                }
            }
            if(p2.y.animVal.value<=850){
                if(event.key=="ArrowDown"){
                    p2.setAttributeNS(null,"y",p2.y.animVal.value+50);
                }
                }
            })
        
        
}

}
