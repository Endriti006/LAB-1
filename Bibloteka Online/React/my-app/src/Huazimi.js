import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Huazimi extends Component{

    constructor(props){
        super(props);

        this.state={
            abonuesi:[],
            book:[],
            huazimi:[],
            modalTitle:"",
            HuazimiId:0,
            BookName:"",
            Huazuesi:"",
            HuazimiDate:"",
            ReturnDate:""
        }
    }

    refreshList(){

        fetch(variables.API_URL+'huazimi')
        .then(response=>response.json())
        .then(data=>{
            this.setState({huazimi:data});
        });

        fetch(variables.API_URL+'book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({book:data});
        });

        fetch(variables.API_URL+'abonuesi')
        .then(response=>response.json())
        .then(data=>{
            this.setState({abonuesi:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeBookName =(e)=>{
        this.setState({BookName:e.target.value});
    }
    changeHuazuesi =(e)=>{
        this.setState({Huazuesi:e.target.value});
    }
    changeHuazimiDate =(e)=>{
        this.setState({HuazimiDate:e.target.value});
    }

    changeReturnDate =(e)=>{
        this.setState({ReturnDate:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Huazo",
            HuazimiId:0,
            BookName:"",
            Huazuesi:"",
            HuazimiDate:"",
            ReturnDate:""
        });
    }
    editClick(emp){
        this.setState({
            modalTitle:"Edit Huazimi",
            HuazimiId:emp.HuazimiId,
            BookName:emp.BookName,
            Huazuesi:emp.Huazuesi,
            HuazimiDate:emp.HuazimiDate,
            ReturnDate:emp.ReturnDate
        });
    }

    createClick(){
        fetch(variables.API_URL+'huazimi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BookName:this.state.BookName,
                Huazuesi:this.state.Huazuesi,
                HuazimiDate:this.state.HuazimiDate,
                ReturnDate:this.state.ReturnDate
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
        fetch(variables.API_URL+'huazimi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                HuazimiId:this.state.HuazimiId,
                BookName:this.state.BookName,
                Huazuesi:this.state.Huazuesi,
                HuazimiDate:this.state.HuazimiDate,
                ReturnDate:this.state.ReturnDate
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
        fetch(variables.API_URL+'huazimi/'+id,{
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
            abonuesi,
            book,
            huazimi,
            modalTitle,
            HuazimiId,
            BookName,
            Huazuesi,
            HuazimiDate,
            ReturnDate
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Huazo
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            ID
        </th>
        <th>
            Emri i Librit
        </th>
        <th>
            Emri i Huazuesit
        </th>
        <th>
            Dita e Rrikthimit
        </th>
        <th>
            Opsionet
        </th>
    </tr>
    </thead>
    <tbody>
        {huazimi.map(emp=>
            <tr key={emp.HuazimiId}>
                <td>{emp.HuazimiId}</td>
                <td>{emp.BookName}</td>
                <td>{emp.Huazuesi}</td>
                <td>{emp.ReturnDate}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(emp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(emp.HuazimiId)}>
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
            <span className="input-group-text">Libri</span>
            <select className="form-select"
            onChange={this.changeBookName}
            value={BookName}>
                {book.map(dep=><option key={dep.BookId}>
                    {dep.BookName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Huazuesi</span>
            <select className="form-select"
            onChange={this.changeHuazuesi}
            value={Huazuesi}>
                {abonuesi.map(dep=><option key={dep.AbonuesiId}>
                    {dep.fullName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Data e Huazimit</span>
            <input type="date" className="form-control"
            value={HuazimiDate}
            onChange={this.changeHuazimiDate}/>
        </div>


        <div className="input-group mb-3">
            <span className="input-group-text">Data e Rrikthimit</span>
            <input type="date" className="form-control"
            value={ReturnDate}
            onChange={this.changeReturnDate}/>
        </div>



        
     </div>
    </div>

    {HuazimiId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Krijo</button>
        :null}

        {HuazimiId!=0?
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