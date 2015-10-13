//this code was adapted from that presented here: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/two-way-duplex-serial-communication-using-p5js/

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var locH, locV;        // location of the circle
 
function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  createCanvas(windowWidth, windowHeight);
  background(190, 190, 190);
}

function serverConnected() {
  println('connected to server.');
}

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}
 
function portOpen() {
  println('the serial port opened.')
}
 
function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 if (inString.length > 0) {
   if (inString !== 'hello') {
     var sensors = split(inString, ',');
     if (sensors.length > 1) {
       locH = map(sensors[0], 0, 1023, 0, width);
       locV = map(sensors[1], 0, 1023, 0, height);
     }
   }
 }
serial.write('x');
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}

function draw() {               // black background
 fill(0);           // fill depends on the button
 ellipse(locH, locV, 10, 10); // draw the circle
}

