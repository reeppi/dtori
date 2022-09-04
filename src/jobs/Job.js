import React, { Component, useState } from "react";
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
                    search:"",
                    
                    order_:1,
                    city_: "",
                    company_:"", 
                    salary_:0, 
                    period_:"",
                    search_:""

                  }
    }

    submit(){
      this.setState( {
        order_: this.state.order,
        city_: this.state.city,
        company_:this.state.company, 
        salary_:this.state.salary, 
        period_:this.state.period,
        search_:this.state.search,
      } )
    }

    keyPress(e) {
      if ( e.key == 'Enter')
        this.submit();
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
                  <tr>
                    <td>Vapaa haku</td>
                    <td><input type="text"  value={this.state.search}  onKeyPress={(e) => this.keyPress(e)}  onChange={ (e)=>{ this.setState({search: e.target.value})}}/></td>
                  </tr>
                  <tr style={{background:"#e8e8e8"}}>
                    <td>Kaupunki  </td>
                    <td><input type="text"  value={this.state.city}  onKeyPress={(e) => this.keyPress(e)}  onChange={ (e)=>{ this.setState({city: e.target.value})}}/></td>
                  </tr>
                  <tr>
                    <td>Yritys  </td>
                    <td><input type="text" value={this.state.company} onKeyPress={(e) => this.keyPress(e)}  onChange={ (e)=>{this.setState({company: e.target.value})}}/></td>
                  </tr>
                  <tr style={{background:"#e8e8e8"}}>
                    <td>Palkka min (€) </td>
                    <td><input type="text" value={this.state.salary} onKeyPress={(e) => this.keyPress(e)}  onChange={ (e)=>{this.setState({salary: e.target.value})}}/></td>
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
                search={this.state.search_}
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

const numPerPage=50;
const JobList = React.memo( function JobList (props)
{
  const [next, setNext] = useState(numPerPage);

  console.log("joblist render");
  var jobList=JobData.jobs;

  jobList=jobList.filter((e)=>e.municipality_name.toLowerCase().includes(props.city.toLowerCase()));
  jobList=jobList.filter((e)=>e.company_name.toLowerCase().includes(props.company.toLowerCase()));

  if ( props.period == "h")    
  jobList=jobList.filter((e)=>{
      if ( e.salary.value_period == "h" )
        return Number(e.salary.low_value)>=Number(props.salary);
      else
        return false;
    }
    );

  if ( props.period == "m")  
  jobList=jobList.filter((e)=>{
      if ( e.salary.value_period == "m" )
        return Number(e.salary.low_value)>=Number(props.salary);
      else
        return false;
  
    }
    );
  
  if ( props.search )
  {
      jobList=jobList.filter((e)=>
         e.descr.toLowerCase().includes(props.search.toLowerCase())
      || e.heading.toLowerCase().includes(props.search.toLowerCase())
      || e.company_name.toLowerCase().includes(props.search.toLowerCase()
      )
      );
  }


  jobList.forEach((jobDetail)=>
  {
      jobDetail.p=parseInt((new Date(jobDetail.date_posted.slice(0,10)).getTime()));
      jobDetail.e=parseInt((new Date(jobDetail.date_ends.slice(0,10)).getTime()));
  });

  if ( props.order == 1 )
     jobList.sort((a,b)=>b.p-a.p);
  if ( props.order == 2 )
     jobList.sort((a,b)=>a.p-b.p); 
  if ( props.order == 3 )
     jobList.sort((a,b)=>b.salary.low_value-a.salary.low_value);

  return (
  <>
       <h4>Löydetyt työpaikat ({jobList.length} kpl)</h4>
          <hr/>
          { jobList.slice(0,next).map((jobDetail, index)=> <JobEntry jobDetail={jobDetail} key={index} index={index}/>)}
          { next < jobList.length && 
            <div onClick={()=> setNext(next+numPerPage)} style={{background:"silver", cursor:"pointer",width:"100%",display:"flex",justifyContent:"center"}}>
            <u> <strong>Avaa lisää ilmoituksia tästä</strong></u></div> }
          <hr/>
        
  </>
  )
})

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

  var d = new Date(jobDetail.p);
  var posted = d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear();
  var e = new Date(jobDetail.e);
  var ends = e.getDate()+"."+(e.getMonth()+1)+"."+e.getFullYear();

  return (
  <div key={index}>{index+1}.<br/>
      <table style={{width:"100%", background: (index+1)%2?"#e8e8e8":"white"}}>
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
        <td>{posted}</td>
      </tr>
      <tr>
        <td>Ilmoitus poistuu</td>
        <td>{ends}</td>
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
      </tbody >
      </table>
      <div style={{width:"100%", background: (index+1)%2?"#e8e8e8":"white"}}>
        <strong>{ jobDetail.heading }</strong>
        <div id={index+"short"}>
          <div style={{whiteSpace: "pre-line"}}>{jobDetail.descr.slice(0,150)}...</div>
          <div onClick={()=> showDesc()} style={{cursor:"pointer"}}> <u>Lue koko ilmoitus tästä</u></div>
        </div>
        <div id={index+"long"} style={{display:"none"}}>
          <div style={{whiteSpace: "pre-line"}} id={index+"a"}>{jobDetail.descr}</div>
          <a onClick={()=> closeDesc()} style={{cursor:"pointer"}}><u>Sulje ilmoitus</u></a>
        </div>
        </div>
      <br/>
  </div>)
}

export default Job;