import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Orariipunes extends Component{

    constructor(props){
        super(props);

        this.state={
            Orariipunes:[],
            Employee:[],
            Orari:[],
            modalTitle:"",
            OrariipunesId:0,
            EmployeeName:"",
            Fillimi:"",
            Mbarimi:"",
            pushimi:"",
        }
    }

    refreshList(){

        fetch(variables.API_URL+'orariipunes')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Orariipunes:data});
        });

        fetch(variables.API_URL+'orari')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Orari:data});
        });

        fetch(variables.API_URL+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Employee:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeEmployeeName =(e)=>{
        this.setState({EmployeeName:e.target.value});
    }
    changeFillimi =(e)=>{
        this.setState({Fillimi:e.target.value});
    }
    changeMbarimi =(e)=>{
        this.setState({Mbarimi:e.target.value});
    }
    changepushimi =(e)=>{
        this.setState({pushimi:e.target.value});
    }


    addClick(){
        this.setState({
            modalTitle:"Orari",
            OrariipunesId:0,
            EmployeeName:"",
            Fillimi:"",
            Mbarimi:"",
            pushimi:"",

        });
    }
    editClick(or){
        this.setState({
            modalTitle:"Edit OrarinePunes",
            OrariipunesId:or.OrariipunesId,
            EmployeeName:or.EmployeeName,
            Fillimi:or.Fillimi,
            Mbarimi:or.Mbarimi,
            pushimi:or.pushimi
        });
    }

    createClick(){
        fetch(variables.API_URL+'orariipunes',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeName:this.state.EmployeeName,
                Fillimi:this.state.Fillimi,
                Mbarimi:this.state.Mbarimi,
                pushimi:this.state.pushimi
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'orariipunes',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                OrariipunesId:this.state.OrariipunesId,
                EmployeeName:this.state.EmployeeName,
                Fillimi:this.state.Fillimi,
                Mbarimi:this.state.Mbarimi,
                pushimi:this.state.pushimi
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('A jeni te sigurt?')){
        fetch(variables.API_URL+'orariipunes/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            Orari,
            Employee,
            Orariipunes,
            modalTitle,
            OrariipunesId,
            EmployeeName,
            Fillimi,
            Mbarimi,
            pushimi

        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Shto OrarinePunes
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            ID e Orari
        </th>
        <th>
            Emri i Stafit
        </th>
        
        <th>
             Fillimi
        </th>
        <th>
        Mbarimi
        </th>
        <th>
        Pushimi
        </th>
        <th>
            Opsionet
        </th>
    </tr>
    </thead>
    <tbody>
        {Orariipunes.map(or=>
            <tr key={or.OrariipunesId}>
                <td>{or.OrariipunesId}</td>
                <td>{or.EmployeeName}</td>
                <td>{or.Fillimi}</td>
                <td>{or.Mbarimi}</td>
                <td>{or.pushimi}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(or)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(or.OrariipunesId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-50 bd-highlight">
    

     <div className="input-group mb-3">
            <span className="input-group-text">Stafi</span>
            <select className="form-select"
            onChange={this.changeEmployeeName}
            value={EmployeeName}>
                {Employee.map(emp=><option key={emp.EmployeeId}>
                    {emp.EmployeeName}
                </option>)}
            </select>
        </div>


        <div className="input-group mb-3">
            <span className="input-group-text">Data e fillimit</span>
            <input type="date" className="form-control"
            value={Fillimi}
            onChange={this.changeFillimi}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Data e Mbarimi</span>
            <input type="date" className="form-control"
            value={Mbarimi}
            onChange={this.changeMbarimi}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Selekto Pushimin</span>
            <select className="form-select"
            onChange={this.changepushimi}
            value={pushimi}>
                {Orari.map(or=><option key={or.OrariId}>
                    {or.Pushimi}
                </option>)}
            </select>
        </div>


     </div>
    </div>
    
    {OrariipunesId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Krijo</button>
        :null}

        {OrariipunesId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Ruaj ndryshimet</button>
        :null}
   </div>

</div>
</div> 
</div>


</div>
        )
    }
}