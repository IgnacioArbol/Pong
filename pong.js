//variables
var svg;
var pai;
var pad;
//funciones

function aleatorio(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function repite(){
    bola.mueve();
    bola.dibuja();
    bola.gol();
    game.pintar();
    
    pai.pintar();
    pad.pintar();
   
    
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
        bola= new bola(aleatorio(50,950),aleatorio(2,3),aleatorio(3,5),svg);
         pai= new palo("palo1",50,360,svg);
         pad= new palo("palo2",2450,360,svg);
         this.mover();
    
    
    }
    mover(){
        document.addEventListener("keydown",(e) =>{
            switch(e.key){
                case 'w':
                    pai.moverArriba();
                    break;
                case 's':
                    pai.moverAbajo();
                    break;
                case 'W':
                    pai.moverArriba();
                    break;
                case 'S':
                    pai.moverAbajo();
                    break;
                case 'ArrowUp':
                    pad.moverArriba();
                    break;
                case 'ArrowDown':
                    pad.moverAbajo();
                    break;
            }
        })
        /*/
        document.addEventListener("keydown", event=>{
        if(event.key=="w" || event.key=="W"){
            pai.moverArriba();
        }
        if(event.key=="s"|| event.key=="S"){
            pai.moverAbajo();
        }
        if(event.key=="ArrowUp");{
            pad.moverArriba();
        }
        if(event.key=="ArrowDown"){
            pad.moverAbajo();
        }
        });
        /*/
    }
    pintar(){
        document.getElementById("text1").innerHTML = this.ganadas1;
        document.getElementById("text2").innerHTML = this.ganadas2;
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
            this.velx *= -1;
            if(this.velx>=-20){
                this.velx  -=2;
            }
            if(Math.round(Math.random())*3==3){
                if(this.vely>0){
                    this.vely+=1;
                    if(this.vely>10)this.vely=5;
                }else{
                    this.vely+=-1;
                    if(this.vely<-10)this.vely=-5;
                 }
            }
        }
        if(this.x-this.radio<=p1.x.animVal.value+p1.width.animVal.value && this.x >=p1.x.animVal.value && this.y+this.radio>=p1.y.animVal.value && this.y-this.radio<=p1.y.animVal.value+p1.height.animVal.value){
            this.velx *= -1;
            if(this.velx<=20){
            this.velx  +=3;
            }
            if(Math.round(Math.random())*3==3){
                if(this.vely>0){
                    this.vely+=1;
                    if(this.vely>10)this.vely=3;
                }else{
                    this.vely+=-1;
                    if(this.vely<-10)this.vely=-3;
                }
            }
        }   
    }
    dibuja(){
        this.tagcircle.setAttributeNS(null, "cx", this.x);
        this.tagcircle.setAttributeNS(null, "cy", this.y);
    }
    gol(){
        if(this.x>=2450){
            game.ganadas1++;
            this.x= 1250;
            this.velx=aleatorio(3,5);
            this.vely=aleatorio(-3,3);
            
            
        }
        if(this.x<=45){
            game.ganadas2++;
            this.x= 1250;
            this.velx=aleatorio(-5,-3);
            this.vely=aleatorio(-3,3);

            
        }
    }
}


class palo{
    constructor(nombre,x, y,svgcontenedor){
        this.x=x;
        this.y=y;
        this.width=20;
        this.height=180;
        this.nombre=nombre;

        this.tagpalo=document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.tagpalo.setAttributeNS(null,"x",this.x);
        this.tagpalo.setAttributeNS(null,"y",this.y);
        this.tagpalo.setAttributeNS(null,"width",this.width);
        this.tagpalo.setAttributeNS(null,"height",this.height);
        this.tagpalo.setAttributeNS(null,"id",this.nombre);
        this.tagpalo.setAttributeNS(null,"fill","white");
        svgcontenedor.appendChild(this.tagpalo);
        
        /*/
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
            })/*/
        }
        moverArriba(){
            if(this.y>=0){
            this.y=this.y-60;
            }
        }
        moverAbajo(){
            if(this.y<=820){
            this.y=this.y+60;
            }
        }
        pintar(){
            this.tagpalo.setAttributeNS(null,"y",this.y);
            
        }

}
