interface DeviceInt {
  device_id:string;
  name: string;
  key:string;
}
interface MeasurementInt {
  _id:string;
  id: string;
  t:string;
  h:string;
}

class Main implements EventListenerObject, GETResponseListener {

  api = new API();
  view = new ViewMainPage();
  devices:DeviceInt[];
  measurements:MeasurementInt[];

  constructor(){
    
  }

  handleGETResponse(status:number, response:string, url:string):void {
    if (url == "device") {
    this.devices= JSON.parse(response);
    this.view.showDevices(this.devices,this);
    }
    if (url == "measurement") {
    this.measurements= JSON.parse(response);
    this.view.showMeasurements(this.measurements,this);
    }
  }

  main():void {
      this.api.requestGET("device",this);
      this.api.requestGET("measurement",this);
      document.getElementById("boton").addEventListener("click",this);
  }

  handleEvent(evt:Event):void{
	  
    let target = <HTMLElement>evt.target;
    let type   = evt.type;
            
    if (target.id=="boton") {
      this.api.requestGET("device",this);
      this.api.requestGET("measurement",this);
      console.log("handling boton");
    }
   
  }
}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
