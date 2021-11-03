//https://www.npmjs.com/package/rpio
//https://www.raspberrypi.com/documentation/computers/os.html#gpio-and-the-40-pin-header
var rpio = require('rpio');

rpio.init({gpiomem: false});  //to allow for the use of hardware PWM

console.time('start');
console.log('Hello gamers it is time for servo');
console.timeEnd('start');

//Start of progam
//Default pin layout is the physical pins, not the broadcom mappings
//Hardware PWM on physical pins: 12, 32, 33, 35
//=========Pin Setup================
rpio.open(12, rpio.PWM);
rpio.open(32, rpio.PWM);
rpio.open(33, rpio.PWM);
rpio.open(35, rpio.PWM);
//==================================

//Set the PWM refresh rate with pwmSetClockDivider().
//This is a power-of-two divisor of the base 19.2MHz rate, with a maximum value of 4096 (4.6875kHz).
//http://www.ee.ic.ac.uk/pcheung/teaching/DE1_EE/stores/sg90_datasheet.pdf

rpio.pwmSetClockDivider(16); //sets clock to 1.2MHz
rpio.pwmSetRange(12, 24000);  //pwmSetRange takes (pin, max count) (count rolls over to 0 after 24000)

//20 ms (50Hz) is the sg90 servo PWM period
//sets max pulse width, counts from 0 to 24000 at 1.2MHz
//and we want to divide one second into 50 (50Hz) so 1200000/50 = 24000
//so in one second we will count from 0-24000 50 times (50Hz = 50 times per second)
//therefore 0-24000 will take 20ms
//we're just using a 1.2MHz clock so we can get a high level of precision for
//how far to turn servo

//From SG90 datasheet: 1ms pulse width = -90 degrees, 2ms pulse = 90 degrees
//1ms / 20ms = 0.05, 0.05 * 24000 = 1200 = -90 degrees
//2ms / 20ms = 0.1, 0.1 * 24000 = 2400 = 90 degrees

//Turn servo to middle (0 degrees rotation)
rpio.pwmSetData(12, 1800)

//===========Remember: PWM doesn't clean up so setData all to 0 to stop them=====================
setTimeout(function(){
  rpio.pwmSetData(12, 0);
}, 5000);


//rpio.write(15, rpio.LOW);

//console.log(rpio.read(15));
//rpio.pud(15, rpio.PULL_OFF);   //pulls resistor up down or off
//rpio.write(15, rpio.HIGH);
//console.log(rpio.read(15));
/*
var counter = 0;
setInterval(
        function(){
                counter++;
                if(rpio.read(12) == 0){
                        rpio.write(12, rpio.HIGH);
                }else{
                        rpio.write(12, rpio.LOW);
                }
                //rpio.pwmSetClockDivider(64); //set refresh rate, I don't get the other two below?
                //rpio.pwmSetRange(12, 1024);
                //rpio.pwmSetData(12, 512);
                if(counter == 100){
                        clearInterval();
                }
        }, 5000);
*/
//"Rpio automatically unmaps and clears all memory maps when the node process exis"
