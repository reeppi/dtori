import React, { Component, useState } from "react";
import JobData from '../data/jobs.json';
import '../style.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';

var cities = {};
var companies = {};
JobData.jobs.forEach(e => 
  {
      if ( e.municipality_name )
      {
      var arr = e.municipality_name.split("-")
      if ( arr.length > 1 )
        cities[arr[1].trim()]=true;
      else 
        cities[arr[0].trim()]=true;
      }
      if ( e.company_name )
        {
          companies[e.company_name]=true;
        }
  }
)

const allCompanies=Object.keys(companies).sort((a,b)=>
{  
  const nameA = a.toUpperCase();
  const nameB = b.toUpperCase();
  if (nameA < nameB) 
    return -1;
  if (nameA > nameB) 
    return 1;
  return 0;  
})


const allCities=Object.keys(cities).sort((a,b)=>
{
  const nameA = a.toUpperCase();
  const nameB = b.toUpperCase();
  if (nameA < nameB) 
    return -1;
  if (nameA > nameB) 
    return 1;
  return 0;  

});



class Job extends Component  {

    constructor() {
      super();
      document.title="Ennakkotehtävä";
      this.searchInputRef = React.createRef();
      this.cityInputRef = React.createRef();
      this.companyInputRef = React.createRef();
      this.testRef = React.createRef();
      this.state = {
                    order:1,
                    salary:0, 
                    period:"",
                    searchArry:[],
                    companyArry:[],
                    cityArry:[],
                    order_:1,
                    salary_:0, 
                    period_:"",

                  }
    }

    submit(){

      var tmpSearch = this.state.searchArry.slice();
      const tp = this.searchInputRef.current.getValue();
      console.log("---> "+tp);
      if (tp)
      {
        tmpSearch.push(tp);
        this.searchInputRef.current.setValue("");
      }

      var tmpCity = this.state.cityArry.slice();
      const tpCity = this.cityInputRef.current.getValue();
      if (tpCity)
      {
        const split = tpCity.split(" ");
        console.log("split" +split );
        tmpCity.push(...split);
        this.cityInputRef.current.setValue("");
      }

      var tmpCompany = this.state.companyArry.slice();
      const tpCompany = this.companyInputRef.current.getValue();
      if (tpCompany)
      {
        tmpCompany.push(tpCompany);
        this.companyInputRef.current.setValue("");
      }

   
      this.setState( {
        searchArry:tmpSearch,
        cityArry:tmpCity,
        companyArry:tmpCompany,
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

 
    render() 
    {
        
      console.log("main render");
        return(<div>
          
          <div style={{display:"flex"}}>
            <div>
              <a href="http://www.duunitori.fi"><img width="100" src="https://duunitori.imgix.net/media/images/logos/logo-duunitori-rgb-vertical-mono.png?auto=format"/></a>
            </div>
            <div style={{paddingLeft:"20px"}}>
            <h3>DEMO</h3>
            Tämä on ennakkotehtävä<br/>
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
                    <td>
                    <InputEntry fillId="0" ref={this.searchInputRef}  values={this.state.searchArry} set={(e)=> this.setState({searchArry:e}) } />
                    </td>
                  </tr>
                  <tr style={{background:"#e8e8e8"}}>
                    <td>Sijainti  </td>
                    <td><InputEntry fillId="1" datas={allCities} split={true} ref={this.cityInputRef}  values={this.state.cityArry} set={(e)=> this.setState({cityArry:e}) } /></td>
                  </tr>
                  <tr>
                    <td>Yritys  </td>
                    <td><InputEntry fillId="2" datas={allCompanies} split={false}  ref={this.companyInputRef}  values={this.state.companyArry} set={(e)=> this.setState({companyArry:e}) } /></td>
                  </tr>
                  <tr style={{background:"#e8e8e8"}}>
                    <td>Palkka min (€) </td>
                    <td><Form.Control fillId="0" type="text" value={this.state.salary} onKeyPress={(e) => this.keyPress(e)}  onChange={ (e)=>{this.setState({salary: e.target.value})}}/></td>
                  </tr>
                  <tr >
                    <td>Palkan jakso  </td>
                    <td>
                      <input type="radio" value="h" name="period" onChange={(e)=>this.setState({period:e.target.value},()=>this.submit())}/>Tunti<br/>
                      <input type="radio" value="m" name="period" onChange={(e)=>this.setState({period:e.target.value},()=>this.submit())}/>Kuukausi<br/>
                      <input type="radio" value="" defaultChecked="true"  name="period" onChange={(e)=>this.setState({period:e.target.value},()=>this.submit())}/>Ei väliä<br/>
                    </td>
                  </tr>
                  <tr style={{background:"#e8e8e8"}}>
                    <td>Järjestä  </td>
                    <td>
                      <input type="radio" value="1" defaultChecked="true" name="order" onChange={(e)=>this.setState({order:e.target.value},()=>this.submit())}/>Uusin ensin<br/>
                      <input type="radio" value="2"   name="order" onChange={(e)=>this.setState({order:e.target.value},()=>this.submit())}/>Vanhin ensin<br/>
                      <input type="radio" value="3"  name="order" onChange={(e)=>this.setState({order:e.target.value},()=>this.submit())}/>Suurin min. palkka<br/>
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
                search={this.state.searchArry}
                city={this.state.cityArry}
                company={this.state.companyArry}
                period={this.state.period_}
                salary={this.state.salary_}
                order={this.state.order_}
              />
              </div>
              )
  
       }
     
      }

const InputEntry = React.forwardRef((props,ref) =>
{
  const [inputText, setInputText] = useState("");
  const [flagDelete, setFlagDelete] = useState(false);

  const keyHelper = React.useRef(true);
  const inputRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    getValue: () => {
        return inputRef.current.value;
    },
    setValue: (value) => {
      console.log("clear");
      setInputText(value);

    }
  }));


  const keyPress = (e) => {
    if ( e.key == 'Enter') 
    {
    const tmp = props.values.slice();
    if ( e.target.value )
    {
      if ( props.split )
      {
        const split=e.target.value.split(" ");
        tmp.push(...split);  
      } 
      else 
      tmp.push(e.target.value);
    }
    setFlagDelete(false);
    console.log("--> "+inputText);
    setInputText("");
    props.set(tmp);
    }
  }

  const keyDown = (e) => {
    if ( !flagDelete && keyHelper.current && e.key == "Backspace" && inputRef.current.selectionStart == 0)
    {
      keyHelper.current=false;
      setFlagDelete(true);
    } 
     if ( flagDelete && keyHelper.current && e.key == "Backspace" && inputRef.current.selectionStart == 0)
    {
      keyHelper.current=false;
      setFlagDelete(false);
      const tmp = props.values.slice();
      tmp.pop();
      props.set(tmp);
    }
  }

  const keyUp = (e) => {
    keyHelper.current = true;
  }

  const deleteEntry = (index) => {
    const tmp = props.values.slice();
    tmp.splice(index,1);
  props.set(tmp);
  }

return (
  <>
  { props.values.map(
    (e,index)=>
    <div key={index} style={{padding:"1px"}}>
      <Button className="rounded-pill" variant={index==props.values.length-1 && flagDelete? "danger":"primary"} onClick={(e)=>deleteEntry(index)}>{e}</Button>
    </div>
    )
    }

  { Number(props.fillId) > 0 &&
  <datalist id={"fill"+props.fillId}>
    {  props.datas && props.datas.map((e,index)=><option key={index} value={e}/>)  }
  </datalist>
  }

  <Form.Control list={"fill"+props.fillId}
  ref={inputRef} 
  type="text" 
  value={inputText}  
  onKeyDown={e => keyDown(e)}
  onKeyUp={e => keyUp(e)}
  onKeyPress={e => keyPress(e)} 
  onChange={ (e)=>{ setInputText(e.target.value); }}
  onBlur={ (e)=>setFlagDelete(false)}
  />
  


  </>)
})
      

const JobList = React.memo( (props) =>
{
  const numPerPage=50;
  const [next, setNext] = useState(numPerPage);

  console.log("joblist render!");
  var jobList=JobData.jobs;

  if ( props.city && props.city.length > 0 )
  {
  jobList=jobList.filter((e)=> {
    var lowerArry = props.city.map(e=> e.toLowerCase());
    for (var x=0;x<lowerArry.length;x++)
      if( e.municipality_name.toLowerCase().includes(lowerArry[x].toLowerCase()))
        return true;
    }
    )
  }
  if ( props.company && props.company.length > 0 )
  {
    jobList=jobList.filter((e)=> {
      var lowerArry = props.company.map(e=> e.toLowerCase());
      for (var x=0;x<lowerArry.length;x++)
        if( e.company_name.toLowerCase().includes(lowerArry[x].toLowerCase()))
          return true;
      }
    )
  }

  if ( props.search && props.search.length > 0 )
  {
      var lowerArry = props.search.map(e=> e.toLowerCase());
      jobList=jobList.filter((e)=>
      {
        for (var x=0;x<lowerArry.length;x++)
        {
          if ( e.descr.toLowerCase().includes(lowerArry[x])
          || e.heading.toLowerCase().includes(lowerArry[x])
          || e.company_name.toLowerCase().includes(lowerArry[x]))
            return true;
        }
      }
      );
  }

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

  if ( props.period == "")  
  jobList=jobList.filter((e)=>Number(e.salary.low_value)>=Number(props.salary))

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
     jobList.sort((a,b)=>Number(b.salary.low_value)-Number(a.salary.low_value));

  return (
  <>
      
       <strong>Löydetyt työpaikat ({jobList.length} kpl)</strong>
          <hr/>
          { jobList.slice(0,next).map((jobDetail, index)=> <JobEntry jobDetail={jobDetail} key={index} index={index}/>)}
          { next < jobList.length && 
            <div onClick={()=> setNext(next+numPerPage)} style={{background:"silver", cursor:"pointer",width:"100%",display:"flex",justifyContent:"center"}}>
            <u> <strong>Lue lisää ilmoituksia tästä</strong></u></div> }
          <hr/>
        
  </>
  )
})

const  JobEntry = ({jobDetail,index}) =>
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
        <td  style={{width:"150px"}}>Sijainti</td>
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
          <div onClick={()=> showDesc()} style={{cursor:"pointer"}}>&gt; <u>Lue koko ilmoitus tästä</u></div>
        </div>
        <div id={index+"long"} style={{display:"none"}}>
          <div style={{whiteSpace: "pre-line"}} id={index+"a"}>{jobDetail.descr}</div>
          <div onClick={()=> closeDesc()} style={{cursor:"pointer"}}> &gt; <u>Sulje ilmoitus</u></div>
        </div>
        </div>
      <br/>
  </div>)
}

export default Job;