import React, { Component } from "react";
import JobData from '../data/jobs.json';
import '../style.css';

   class Job extends Component  {

    constructor() {
      super();
      document.title="harkkatyo";
      this.state = {order:1,
                    city: "",
                    company:"", 
                    salary:0, 
                    period:"",

                    order_:1,
                    city_: "",
                    company_:"", 
                    salary_:0, 
                    period_:"",
                  }
    }

    submit(){
      console.log("");
      this.setState(
        {
          order_:this.state.order,
          city_: this.state.city,
          company_:this.state.company, 
          salary_:this.state.salary, 
          period_:this.state.period,
        }
      )
    }

    render() {
      console.log("main render");
        return(<div>

          <div style={{display:"flex"}}>
            <div>
              <a href="http://www.duunitori.fi"><img width="100" src="https://duunitori.imgix.net/media/images/logos/logo-duunitori-rgb-vertical-mono.png?auto=format"/></a>
            </div>
            <div style={{paddingLeft:"20px"}}>
            <h3>DEMO</h3>
            Tämä on harjoitustyö<br/>
            <a href="http://www.duunitori.fi">duunitori.fi</a>
            </div>
          </div>
          
          <hr/>
            <div style={{display:"flex",flexDirection:"column"}}>
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
                      <input type="radio" value="h" name="period" onChange={(e)=>this.setState({period:e.target.value})}/>Tunti<br/>
                      <input type="radio" value="m" name="period" onChange={(e)=>this.setState({period:e.target.value})}/>Kuukausi<br/>
                      <input type="radio" value="" defaultChecked="true"  name="period" onChange={(e)=>this.setState({period:e.target.value})}/>Ei väliä<br/>
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
                    <td>Yhteensä työpaikkoja</td>
                    <td>{JobData.jobs.length} kpl</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><input type="button" onClick={()=>this.submit()} value="Hae työpaikkoja" /></td>
                  </tr>
                  </tbody>
              </table>
        
              </div>
              </div>

              <JobList 
                period={this.state.period_}
                city={this.state.city_}
                company={this.state.company_}
                salary={this.state.salary_}
                order={this.state.order_}
              />
              </div>
              )
  
       }

      
      
      }


function JobList (props)
{
  console.log("joblist render");
  var jobList=JobData.jobs;

  jobList=jobList.filter((e)=>e.municipality_name.toLowerCase().includes(props.city.toLowerCase()));
  jobList=jobList.filter((e)=>e.company_name.toLowerCase().includes(props.company.toLowerCase()));

  if ( props.period == "h")    
  jobList=jobList.filter((e)=>{
      if ( e.salary.value_period == "h" )
        return Number(e.salary.low_value)>Number(props.salary);
    }
    );
  if ( props.period == "m")  
  jobList=jobList.filter((e)=>{
      if ( e.salary.value_period == "m" )
        return Number(e.salary.low_value)>Number(props.salary);
    }
    );

  jobList.forEach((jobDetail)=>
  {
      jobDetail.p=parseInt((new Date(jobDetail.date_posted.slice(0,10)).getTime()));
      jobDetail.e=parseInt((new Date(jobDetail.date_ends.slice(0,10)).getTime()));
  });

  if ( props.order == 2 )
     jobList.sort((a,b)=>a.p-b.p); 
  if ( props.order == 1 )
     jobList.sort((a,b)=>b.p-a.p);
  if ( props.order == 3 )
     jobList.sort((a,b)=>b.salary.low_value-a.salary.low_value);
  return (
  <>
       <h4>Löydetyt työpaikat ({jobList.length} kpl)</h4>
          <hr/>
          { jobList.map((jobDetail, index)=> <JobEntry jobDetail={jobDetail} key={index} index={index}/>)}
          <hr/>
  </>
  )

}

function JobEntry ({jobDetail,index})
{
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
      </tbody>
      </table>
        <strong>Kuvaus</strong>
        <div id={index+"short"}>
          <div style={{whiteSpace: "pre-line"}}>{jobDetail.descr.slice(0,100)}...</div>
          <strong><a onClick={()=> showDesc()} style={{cursor:"pointer"}}><u>Lue koko kuvaus tästä</u></a></strong>
        </div>
        <div id={index+"long"} style={{display:"none"}}>
          <div style={{whiteSpace: "pre-line"}} id={index+"a"}>{jobDetail.descr}</div>
          <strong><a onClick={()=> closeDesc()} style={{cursor:"pointer"}}><u>Sulje kuvaus</u></a></strong>
        </div>
 
      <br/>
  </div>)
}

export default Job;