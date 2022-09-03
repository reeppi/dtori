import React, { Component } from "react";

import JobData from '../data/jobs.json';
import '../style.css';

   class JobList extends Component  {

    constructor() {
      super();
      document.title="harkkatyo";
      this.state = {order:1,city: "Helsinki", company:"", salary:0, period:""};
      this.counter = 0;
    }

    render() {
      console.log("render");
      var jobList=JobData.jobs.filter((e)=>e.municipality_name.toLowerCase().includes(this.state.city.toLowerCase()));
      jobList=jobList.filter((e)=>e.company_name.toLowerCase().includes(this.state.company.toLowerCase()));
      jobList.forEach((jobDetail)=>
      {
          jobDetail.p=parseInt((new Date(jobDetail.date_posted.slice(0,10)).getTime()));
          jobDetail.e=parseInt((new Date(jobDetail.date_ends.slice(0,10)).getTime()));
      });
      
      if ( this.state.period == "h")    
        jobList=jobList.filter((e)=>{
          if ( e.salary.value_period == "h" )
            return Number(e.salary.low_value)>Number(this.state.salary);
        }
        );
      if ( this.state.period == "m")  
        jobList=jobList.filter((e)=>{
          if ( e.salary.value_period == "m" )
            return Number(e.salary.low_value)>Number(this.state.salary);
        }
        );

    
      console.log("-->"+ this.state.order);
      if ( this.state.order == 2 )
        jobList.sort((a,b)=>a.p-b.p); 
      if ( this.state.order == 1 )
        jobList.sort((a,b)=>b.p-a.p);
      if ( this.state.order == 3 )
        jobList.sort((a,b)=>b.salary.low_value-a.salary.low_value);

      const numRows = jobList.length
        return(<div>
          <h2>Demo</h2> 
          Tämä on harjoitustyö. <a href="http://www.duunitori.fi">duunitori.fi</a>
          <hr/>
            <div style={{display:"flex"}}>
            <div>
            <table>
                  <tbody>
                  <tr style={{background:"#e8e8e8"}}>
                    <td>Kaupunki  </td>
                    <td><input type="text" value={this.state.city} onChange={ (e)=>{ this.setState({city: e.target.value})}}/></td>
                  </tr>
                  <tr>
                    <td>Yritys  </td>
                    <td><input type="text" value={this.state.company} onChange={ (e)=>{this.setState({company: e.target.value})}}/></td>
                  </tr>
                  <tr style={{background:"#e8e8e8"}}>
                    <td>Palkka min (€) </td>
                    <td><input type="text" value={this.state.salary} onChange={ (e)=>{this.setState({salary: e.target.value})}}/></td>
                  </tr>
                  <tr >
                    <td>Palkan jakso  </td>
                    <td>
                    <form>
                      <input type="radio" value="h" name="period" onChange={(e)=>this.setState({period:e.target.value})}/>Tunti
                      <input type="radio" value="m" name="period" onChange={(e)=>this.setState({period:e.target.value})}/>Kuukausi
                      <input type="radio" value="" defaultChecked="true"  name="period" onChange={(e)=>this.setState({period:e.target.value})}/>Ei väliä
                    </form>
                    </td>
                  </tr>
                  <tr style={{background:"#e8e8e8"}}>
                    <td>Järjestä  </td>
                    <td>
                    <form>
                      <input type="radio" value="1" defaultChecked="true" name="order" onChange={(e)=>this.setState({order:e.target.value})}/>Uusin ensin<br/>
                      <input type="radio" value="2" name="order" onChange={(e)=>this.setState({order:e.target.value})}/>Vanhin ensin<br/>
                      <input type="radio" value="3" name="order" onChange={(e)=>this.setState({order:e.target.value})}/>Suurin min. palkka<br/>
                    </form>
                    </td>
                  </tr>
                  <tr>
                    <td>Yhteensä työpaikkoja : </td>
                    <td>{JobData.jobs.length}</td>
                  </tr>
                  <tr>
                    <td>Löytyi yhteensä  : </td>
                    <td>{numRows}</td>
                  </tr>
                  </tbody>
              </table>
              </div>
              <div><a href="http://www.duunitori.fi"><img width="200" src="https://duunitori.imgix.net/media/images/logos/logo-duunitori-rgb-vertical-mono.png?auto=format"/></a></div>
              </div>

              <h4>Löydetyt työpaikat</h4>
              <hr/>
              {
              jobList.map((jobDetail, index)=> {

              function showDesc()
              {
                var short = document.getElementById(index+"short");
                var long = document.getElementById(index+"long");
                short.style.display = "none";
                long.style.display = "block";
              }
              function closeDesc()
              {
                var short = document.getElementById(index+"short");
                var long = document.getElementById(index+"long");
                short.style.display="block";
                long.style.display="none";
              }
              
              return (
              <div key={index}>{index+1}.<br/>
                  <table style={{width:"100%", background: index%2?"#e8e8e8":"white"}}>
                  <tbody>
                  <tr>
                    <td>Yritys</td>
                    <td><strong>{jobDetail.company_name}</strong></td>
                  </tr>
                  <tr>
                    <td  style={{width:"150px"}}>Kunta</td>
                    <td>{jobDetail.municipality_name}</td>
                  </tr>
                  <tr>
                    <td>Ilmoitus jätetty</td>
                    <td>{jobDetail.date_posted.slice(0,10)}</td>
                  </tr>
                  <tr>
                    <td>Ilmoitus poistuu</td>
                    <td>{jobDetail.date_ends.slice(0,10)}</td>
                  </tr>

                  <tr>
                    <td>Min. Palkka</td>
                    <td>{jobDetail.salary.low_value} {  jobDetail.salary.value_period == "m" ? "€/kk" : "€/h" }</td>
                  </tr>
                  { jobDetail.salary.low_value != jobDetail.salary.high_value &&
                  <tr>
                    <td>Max. Palkka</td>
                    <td>{jobDetail.salary.high_value} {  jobDetail.salary.value_period == "m" ? "€/kk" : "€/h" }</td>
                  </tr>
                  }
                 <tr>
                    <td valign="top">Kuvaus</td>
                    <td>
                    <div id={index+"short"}>
                      <div style={{whiteSpace: "pre-line"}}>{jobDetail.descr.slice(0,100)}...</div>
                      <strong><a onClick={()=> showDesc()} style={{cursor:"pointer"}}><u>Lue koko kuvaus tästä</u></a></strong>
                    </div>
                    <div id={index+"long"} style={{display:"none"}}>
                      <div style={{whiteSpace: "pre-line"}} id={index+"a"}>{jobDetail.descr}</div>
                      <strong><a onClick={()=> closeDesc()} style={{cursor:"pointer"}}><u>Sulje kuvaus</u></a></strong>
                    </div>
                  </td>
                  </tr>
                  </tbody>
                  </table>
           
              </div>)
              }
              )
              }

              </div>
              )
  
       }
      }
     

export default JobList;