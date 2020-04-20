import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import Moment from 'react-moment';
import axios from 'axios';
import moment from 'moment'
import './List.scss';
library.add(faEdit, faTrash, faPlus);


class Table extends Component {

  constructor(props){
     super(props);
     this.state = {
      tableData: [],
      booktypeData: [],
      modalAdd: false,
      modalEdit: false,
      modalDelete: false,
      titleValue: '',
      authorValue: '',
      dateValue: '',
      numpageValue: '',
      booktypeValue: '',
      book_id:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
  }

  handleSubmit(event) {
    var data = new FormData();
    data.append('title', this.state.titleValue)
    data.append('author', this.state.authorValue)
    data.append('date', this.state.dateValue)
    data.append('num_page', this.state.numpageValue)
    data.append('book_type', this.state.booktypeValue)
    console.log(this.state.titleValue);
    console.log(this.state.authorValue);
    console.log(this.state.dateValue);
    console.log(this.state.numpageValue);
    console.log(this.state.booktypeValue);

    axios.post('http://localhost:5000/add_book', data)
    .then(res => {
      const _response = res.data;
      if(_response.status == '00'){
        console.log('sukses')
        this.setState({modalAdd:false});
        window.location.reload(false);
      }else if(_response.status == '50'){
        console.log('duplicate')
      }
    })
    event.preventDefault();
  }

  handleSubmitEdit(event) {
    var data = new FormData();
    data.append('id', this.state.book_id);
    data.append('title', this.state.titleValue)
    data.append('author', this.state.authorValue)
    data.append('date', this.state.dateValue)
    data.append('num_page', this.state.numpageValue)
    data.append('book_type', this.state.booktypeValue)
    console.log(this.state.titleValue);
    console.log(this.state.authorValue);
    console.log(this.state.dateValue);
    console.log(this.state.numpageValue);
    console.log(this.state.booktypeValue);

    axios.post('http://localhost:5000/edit_book', data)
    .then(res => {
      const _response = res.data;
      if(_response.status == '00'){
        console.log('sukses')
        this.setState({modalEdit:false});
        window.location.reload(false);
      }else if(_response.status == '50'){
        console.log('duplicate')
      }
    })
    event.preventDefault();
  }

  handleSubmitDelete(event) {
    var data = new FormData();
    data.append('id', this.state.book_id);
    axios.post('http://localhost:5000/delete_book', data)
    .then(res => {
      const _response = res.data;
      if(_response.status == '00'){
        console.log('sukses')
        this.setState({modalDelete:false});
        window.location.reload(false);
      }else if(_response.status == '50'){
        console.log('not found')
      }
    })
    event.preventDefault();
  }

  openModalAdd = async () => {
    this.setState({modalAdd:true});
  };

  closeModalAdd = async () => {
    this.setState({modalAdd:false});
    window.location.reload(false);
  };

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  componentDidMount() {
    this.fetchDataTable();
    this.fetchDataBookType();
  }

  fetchDataTable = async () => {
    axios.get('http://localhost:5000/users')
    .then(res => {
      const _response = res.data;
      if(_response.status == '00'){
        this.setState({ tableData: _response.data });
      }
    })
  };

  fetchDataBookType = async () => {
    axios.get('http://localhost:5000/booktype')
    .then(res => {
      const _response = res.data;
      if(_response.status == '00'){
        this.setState({ booktypeData: _response.data });
      }
    })
  };

  openModalEdit = async (id) => {
    this.setState({modalEdit:true})
    var data = new FormData();
    data.append('id', id);
    axios.post('http://localhost:5000/bookdetail', data)
    .then(res => {
      const _response = res.data;
      console.log(_response.bookdata)
      if(_response.status == '00'){
        this.setState({book_id:_response.bookdata.id})
        this.setState({titleValue:_response.bookdata.title})
        this.setState({authorValue:_response.bookdata.author})
        this.setState({dateValue:moment(new Date(_response.bookdata.date)).format("YYYY-MM-DD")});
        this.setState({numpageValue:_response.bookdata.num_page})
        this.setState({booktypeValue:_response.bookdata.book_type})
      }else if(_response.status == '50'){
        console.log('duplicate')
      }
    })
  };

  closeModalEdit = async () => {
    this.setState({modalEdit:false})
    window.location.reload(false);
  };

  openModalDelete = async (id) => {
    this.setState({modalDelete:true})
    var data = new FormData();
    data.append('id', id);
    axios.post('http://localhost:5000/bookdetail', data)
    .then(res => {
      const _response = res.data;
      console.log(_response.bookdata)
      if(_response.status == '00'){
        this.setState({book_id:_response.bookdata.id})
        this.setState({titleValue:_response.bookdata.title})
        this.setState({authorValue:_response.bookdata.author})
        this.setState({dateValue:moment(new Date(_response.bookdata.date)).format("YYYY-MM-DD")});
        this.setState({numpageValue:_response.bookdata.num_page})
        this.setState({booktypeValue:_response.bookdata.book_type})
      }else if(_response.status == '50'){
        console.log('duplicate')
      }
    })
  };

  closeModalDelete = async () => {
    this.setState({modalDelete:false})
    window.location.reload(false);
  };

  createTable(){
    let i;
    for(i=0;i<this.state.tableData.length;i++){
      console.log(i+1)}
    return this.state.tableData.map((book, index) => {
      const { id, title, author, date, num_page, book_type } = book //destructuring
      if(this.state.tableData.length == 0){
        return(
          <tr>
            <td>Transaksi tidak memiliki diskon</td>
          </tr>
        )
      }else{
          return(
            <tr key={id}>
             <td>{index+1}.</td>
             <td>{author}</td>
             <td>{title}</td>
             <td>{date}</td>
             <td>{num_page}</td>
             <td>{book_type}</td>
             <td>
              <div className="control">
                <FontAwesomeIcon icon="edit" className="iconEdit" onClick={() => this.openModalEdit(id)}/>
              </div>
              <div className="control">
                <FontAwesomeIcon icon="trash" className="iconDelete" onClick={() => this.openModalDelete(id)}/>
              </div>
             </td>
            </tr>
        )
      }})
    return null;
  }


  render() {
    const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
    return (
      <div id="container">
        <h1 id="logo">Book List</h1>
        <table id="students">
          <tbody>
           <tr>
            <th>No.</th>
            <th>Author.</th>
            <th>Title.</th>
            <th>Date.</th>
            <th>Number of Page.</th>
            <th>Book Type.</th>
            <th>Option.</th>
           </tr>
           {this.createTable()}
          </tbody>
        </table>
        <div>
        <div className="addButton" onClick={this.openModalAdd}>
          <FontAwesomeIcon icon="plus"/> Add Book
        </div>
        <Modal
          isOpen={this.state.modalAdd}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModalAdd}
          ariaHideApp={false}
          style={customStyles}
          contentLabel="Example Modal">
          <h2 id="modal">Add Book</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input id="modal" type="text" placeholder="Book Title" value={this.state.titleValue} onChange={event => this.setState({ titleValue: event.target.value })}/>
              <input id="modal" type="text" placeholder="Author Name" value={this.state.authorValue} onChange={event => this.setState({ authorValue: event.target.value })}/>
              <input id="modal" type="date" placeholder="Author Name" value={this.state.dateValue} onChange={event => this.setState({ dateValue: event.target.value })}/>
              <input id="modal" type="number" placeholder="Total Page" value={this.state.numpageValue} onChange={event => this.setState({ numpageValue: event.target.value })}/>
              <select id="modal" value={this.state.booktypeValue} onChange={event => this.setState({booktypeValue: event.target.value})}>
              <option disabled="true">Select Book Type</option>
              {this.state.booktypeData.map(data => (
                <option
                key={data.id}
                value={data.id}>{data.name}
                </option>))}
              </select>
            </div>
            <div className="buttons">
              <input className="submit" type="submit" value="Submit"/>
            </div>
            <div className="buttons">
              <button className="cancel" onClick={this.closeModalAdd}>Cancel</button>
            </div>
          </form>
        </Modal>
        <Modal
          isOpen={this.state.modalEdit}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModalEdit}
          ariaHideApp={false}
          style={customStyles}
          contentLabel="Example Modal">
          <h2 id="modal">Edit Book</h2>
          <form onSubmit={this.handleSubmitEdit}>
            <div>
              <input id="modal" type="text" placeholder="Book Title" value={this.state.titleValue} onChange={event => this.setState({ titleValue: event.target.value })}/>
              <input id="modal" type="text" placeholder="Author Name" value={this.state.authorValue} onChange={event => this.setState({ authorValue: event.target.value })}/>
              <input id="modal" type="date" placeholder="Author Name" value={this.state.dateValue} onChange={event => this.setState({ dateValue: event.target.value })}/>
              <input id="modal" type="number" placeholder="Total Page" value={this.state.numpageValue} onChange={event => this.setState({ numpageValue: event.target.value })}/>
              <select id="modal" value={this.state.booktypeValue} onChange={event => this.setState({booktypeValue: event.target.value})}>
              <option disabled="true">Select Book Type</option>
              {this.state.booktypeData.map(data => (
                <option
                key={data.id}
                value={data.id}>{data.name}
                </option>))}
              </select>
            </div>
            <div className="buttons">
              <input className="submit" type="submit" value="Submit"/>
            </div>
            <div className="buttons">
              <button className="cancel" onClick={this.closeModalEdit}>Cancel</button>
            </div>
          </form>
        </Modal>
        <Modal
          isOpen={this.state.modalDelete}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModalDelete}
          ariaHideApp={false}
          style={customStyles}
          contentLabel="Example Modal">
          <h2 id="modalDelete">Delete Book</h2>
          <form onSubmit={this.handleSubmitDelete}>
            <h3>Are you sure you want to delete '{this.state.titleValue}' book?</h3>
            <div className="deleteButtons">
              <div className="buttons">
                <button className="submit" onClick={this.closeModalEdit}>Cancel</button>
              </div>
              <div className="buttons">
                <input className="cancel" type="submit" value="Delete"/>
              </div>
            </div>
          </form>
        </Modal>
      </div>
      </div>
    )
  }
}

export default Table
