package main

import (
  "fmt"
  "time"
  "github.com/stianeikeland/go-rpio/v4"
)

func main() {
  fmt.Println("Servo Time!")

  //Open memory range for GPIO access in /dev/mem
  err := rpio.Open()
  if err != nil {
    panic(err) //panic logs error and exits program
  }
  // Unmap gpio memory when main() exits
  defer rpio.Close()
  //After all done, stop PWMing
  defer rpio.StopPwm()

  //PWM for servo control
  //Pin Numbers are GPIO numbers
  servoLR := rpio.Pin(18)  //servo Left Right rotation physical pin 12
  servoUD := rpio.Pin(19)  //servo Up Down rotation physical pin 35

  servoLR.Mode(rpio.Pwm)
  servoUD.Mode(rpio.Pwm)

  servoLR.Freq(1200000) //1.2MHz
  servoUD.Freq(1200000)

  //Set Duty Cycle
  //params: dutyLength, cycleLength
  servoLR.DutyCycle(1800, 24000)
  servoUD.DutyCycle(1800, 24000)

  //1200000 / 24000 = 50Hz servo PWM period speed
  //From SG90 datasheet: 1ms pulse width = -90 degrees, 2ms pulse = 90 degrees
  //1ms / 20ms = 0.05, 0.05 * 24000 = 1200 = -90 degrees
  //2ms / 20ms = 0.1, 0.1 * 24000 = 2400 = 90 degrees

  for {
    time.Sleep(time.Millisecond)
  }

}
