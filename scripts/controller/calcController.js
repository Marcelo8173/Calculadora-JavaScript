class CalcController {
    
    constructor(){
        this._display = document.querySelector('#display');
        this._date = document.querySelector('#data');
        this._hour = document.querySelector('#hora')

        this._displayCalc = "0";
        this._dataAtual;
        this.intialize();
        this.initButtonEvents();
    }

    intialize(){

        this.setDisplayInterval();

        setInterval(() =>{
            this.setDisplayInterval();
        }, 1000);
       

    }

    initButtonEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g'); //todos os elementos

        buttons.forEach((btn, index) => {
            btn.addEventListener('click', (e) =>{
                console.log(btn.className.baseVal.replace("btn-",""));
            })
        });
    }

    setDisplayInterval(){
        this.displayDate = this.dataAtual.toLocaleDateString('pt-br',{
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        this.displayTime = this.dataAtual.toLocaleTimeString('pt-br');
    }

    get displayTime(){
        return this._hour.innerHTML;
    }

    set displayTime(value){
        this._hour.innerHTML = value;
    }

    get displayDate(){
        return this._date.innerHTML;
    }

    set displayDate(value){
        this._date.innerHTML = value;
    }

    get displayCalc(){
        return this._display.innerHTML;
    }

    set displayCalc(valor){
        this._display.innerHTML = valor;
    }

    get dataAtual(){
        return new Date();
    }

    set dataAtual(valor){
        this._dataAtual = valor;
    }
}