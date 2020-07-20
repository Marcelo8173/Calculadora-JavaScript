class CalcController {
    
    constructor(){
        this._display = document.querySelector('#display');
        this._date = document.querySelector('#data');
        this._hour = document.querySelector('#hora')
        this._operation = [];
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

    addEventListenerAll(element, events, fn){
        
        events.split(' ').forEach(event =>{
            element.addEventListener(event, fn, false);
        })
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }
    
    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    isOperator(value){
       return (['+','-','/','*','%'].indexOf(value) > -1);
    }

    setLastOperation(value){
        this._operation[this._operation.length -1] = value;

    }

    pushOperation(value){
        this._operation.push(value);
        
        if(this._operation.length > 3){
            this.calc();
        }
        
    }
    
    calc(){
        let last =  this._operation.pop();
        let result = eval(this._operation.join(""));

        this._operation = [last,result];

        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay(){
        let lastNumber;

        for (let index = this._operation.length - 1; index >= 0; index++) {
            if(!this.isOperator(this._operation[index])){
                lastNumber = this._operation[index];
                break;
            }
        }

        this.displayCalc = lastNumber;
    }

    addOperator(valor){
        if(isNaN(this.getLastOperation())){
            if(this.isOperator(valor)){

                this.setLastOperation(valor);

            }else if(isNaN(valor)) {

            }else{
                this.pushOperation(valor);
                this.setLastNumberToDisplay();
            }

        }else{

            if(this.isOperator(valor)){

                this.pushOperation(valor);

            }else{

                let newValue = this.getLastOperation().toString() + valor.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();
            }
   
        }
    
    }

    setError(){
        this.displayCalc = 'error';
    }

    execBtn(value){
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperator('+');
                break;
            
            case 'subtracao':
                this.addOperator('-');
                break;
                
            case 'multiplicacao':
                this.addOperator('*');
                break;
            
            case 'divisao':
                this.addOperator('/');
                break;

            case 'porcento':
                this.addOperator('%');
                break;

            case 'igual':
                break;
            case 'ponto':
                this.addOperator('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperator(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }
    }

    initButtonEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g'); //todos os elementos

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn,'click drag', (e) =>{
                let textBtn = btn.className.baseVal.replace("btn-","");

                this.execBtn(textBtn);
            })

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e =>{
                btn.style.cursor = "pointer";
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