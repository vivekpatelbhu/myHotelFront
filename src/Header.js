import React, { Component } from 'react';
import logo from './logo.svg';
import hotelimage from '../src/hotel.jpg'
import './App.css';
import Modal from 'react-modal';
import createHotel from '../src/createHotel'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
class Header extends Component {
  constructor() {
    super();
    this.state = {
      hotelData: [],
      paymentdata: [],
      modalIsOpen: false,
      signupModalopen: false,
      bookmodalIsOpen: false,
      draftmodalIsOpen: false,
      completebookmodalIsOpen: false,
      userName: "",
      email: "",
      password: "",
      loginemail: "",
      loginpassword: "",
      fromDate: "",
      toDate: "",
      noOFRoom: "1",
      draftData: [],
      completebookData: []
    };
  }
  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/hotel/list/',
      headers: {
        'Accept': 'application/json',
      },
    }).then((response) => {
      console.log('user list hotel', response.data);
      console.log("user data", response.data);
      this.setState({ hotelData: response.data })
      console.log("hotel listdata is coming", this.state.hotelData)
    })
      .catch((error) => {
        console.log('error---> in documents', error.response)
      })
  }
  bookHandler = (id, char) => {
    let userid = Cookies.get("userId")
    let hotelid = id;
    let chargeamout = char;
    Cookies.set("charge", chargeamout)
    Cookies.set("hotelId", hotelid)
    let bookdata = {
      // fromDate: this.state.fromDate,
      // toDate: this.state.toDate,
      // noOFRoom:this.state.noOFRoom,
      // amout:this.state.charge,
      hotelID: hotelid,
      userID: userid,
    }
    console.log("userid--", userid, "hotelid", hotelid)
    if (!Cookies.get("userinfo")) {
      this.setState({ signupModalopen: true });
    }
    else {
      console.log("modal===============>")
      this.setState({ bookmodalIsOpen: true })
      axios({
        method: 'POST',
        url: 'http://localhost:5000/booking/bookingdata',
        headers: {
          'Accept': 'application/json',
        },
        data: bookdata
      }).then((response) => {
        console.log('payment satus', response.data);
        this.setState({ paymentdata: response.data })
        console.log("payment datas", this.state.paymentdata)
      })
        .catch((error) => {
          console.log('error---> book now api response', error.response)
        })
    }
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }
  bookopenModal = () => {
    this.setState({
      bookmodalIsOpen: true,
    })
  }
  bookcloseModal = () => {
    this.setState({
      bookmodalIsOpen: false,
    })
  }
  openModal = () => {
    this.setState({ modalIsOpen: true });
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }
  drafopenModal = () => {
    this.setState({ draftmodalIsOpen: true });
  }
  draftcloseModal = () => {
    this.setState({ draftmodalIsOpen: false });
  }
  completebookopenModal = () => {
    this.setState({ completebookmodalIsOpen: true });
  }
  completebookcloseModal = () => {
    this.setState({ completebookmodalIsOpen: false });
  }
  Modalsignupopen = () => {
    this.setState({ signupModalopen: true });
  }
  Modalsignupclose = () => {
    this.setState({ signupModalopen: false });
  }

  logoutHandler = () => {
    Cookies.remove("userinfo")
    Cookies.remove("userId")
  }
  loginHandler = () => {
    console.log("login handler")
    let data = {
      email: this.state.loginemail,
      password: this.state.loginpassword,
    }
    axios({
      method: 'POST',
      url: 'http://localhost:5000/user/login/',
      headers: {
        'Accept': 'application/json',
      },
      data: data
    }).then((response) => {
      console.log('login', response.data);
      Cookies.set("userinfo", response.data.email)
      Cookies.set("userId", response.data.userId)
      this.setState({ modalIsOpen: false });
      console.log("login is done");
    })
      .catch((error) => {
        console.log('error---> in documents', error.response)
      })
  }
  signupHandler = () => {
    console.log("dfdsfddfdfgfgf")
    let data = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    }
    axios({
      method: 'POST',
      url: 'http://localhost:5000/user/register/',
      headers: {
        'Accept': 'application/json',
      },
      data: data
    }).then((response) => {
      console.log('user signup========>', response.data);
      console.log("user created");
      this.setState({ signupModalopen: false });
      this.setState({ modalIsOpen: true });
    })
      .catch((error) => {
        console.log('error---> in documents', error.response)
      })
  }

  makePaymentHandler = () => {
    console.log("ragghu")
    let userid = Cookies.get("userId")
    let hotelid = Cookies.get("hotelId")
    let amount = Cookies.get("charge")
    let createbook = {
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      noOFRoom: this.state.noOFRoom,
      amount: amount,
      hotelID: hotelid,
      userID: userid,
      status: true,
    }
    axios({
      method: 'POST',
      url: 'http://localhost:5000/booking/book',
      headers: {
        'Accept': 'application/json',
      },
      data: createbook
    }).then((response) => {
      console.log('payment satus', response.data);
      alert("your payment is success")
    })
      .catch((error) => {
        console.log('error---> book now api response', error.response)
        alert("please fill all feild")
      })

  }

  cancelMaymentHandler = () => {
    let userid = Cookies.get("userId")
    let hotelid = Cookies.get("hotelId")
    let amount = Cookies.get("charge")
    let cancelbook = {
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      noOFRoom: this.state.noOFRoom.toString(),
      amount: amount,
      hotelID: hotelid,
      userID: userid,
      status: false,
    }
    axios({
      method: 'POST',
      url: 'http://localhost:5000/booking/cancle',
      headers: {
        'Accept': 'application/json',
      },
      data: cancelbook
    }).then((response) => {
      console.log('cancel patment details', response.data);
      this.setState({
        bookmodalIsOpen: false,
      })
    })
      .catch((error) => {
        console.log('error---> book now api response', error.response)
      })

  }
  draftbookhandler = () => {
    let userid = Cookies.get("userId")
    let hotelid = Cookies.get("hotelId")
    let draftbook = {
      hotelID: hotelid,
      userID: userid,
      status: false,
    }
    axios({
      method: 'POST',
      url: 'http://localhost:5000/booking/draft',
      headers: {
        'Accept': 'application/json',
      },
      data: draftbook
    }).then((response) => {
      console.log('draft booking details details', response.data);
      this.setState({ draftData: response.data })
      console.log("raggghu draftting detisads", this.state.draftData)
      this.setState({
        draftmodalIsOpen: true
      })
    })
      .catch((error) => {
        console.log('error---> book now api response', error.response)
      })

  }
  completebookhandler = () => {
    let userid = Cookies.get("userId")
    let completebook = {
      userID: userid,
      status: true,
    }
    axios({
      method: 'POST',
      url: 'http://localhost:5000/booking/complete',
      headers: {
        'Accept': 'application/json',
      },
      data: completebook
    }).then((response) => {
      console.log('complete booking details details', response.data);
      this.setState({ completebookData: response.data })

      this.setState({
        completebookmodalIsOpen: true
      })
    })
      .catch((error) => {
        console.log('error---> book now api response', error.response)
      })
  }
  render() {
    return (
      <div>
        <div style={{ display: "flex", background: "#233367", height: 60 }}>
          <div className="createHotel">
            <Link to="/createHotel" component={createHotel}>  <button>Create Hotel</button></Link>
          </div>

          {!Cookies.get("userinfo") ?
            <div className="buttondiv">
              <button onClick={this.openModal}>Login</button>
              <button style={{ marginLeft: 20 }} onClick={this.Modalsignupopen} >SIGNUP</button>
            </div>
            :
            <div style={{ display: "flext", marginLeft: 700, marginTop: 10 }}>
              <button className="logoutbutton" onClick={this.logoutHandler}>Logout</button>
              <button onClick={this.draftbookhandler} className="logoutbutton" style={{}}>DreaftBooking</button>
              <button onClick={this.completebookhandler} className="logoutbutton" style={{}}>Complete Booking</button>
            </div>
          }
        </div>

        <div style={{}} className="hoteldatadiv">

          {
            this.state.hotelData.map((value, key) => {
              return <div style={{ display: "flex", border: "2px solid yellow", margin: 50, background: "#233367" }}>
                <div>
                  <img src={hotelimage} style={{ width: 700, height: 500 }} />
                </div>
                <div style={{ marginLeft: 50, border: "1px solid #233367", padding: 30, color: "white" }}>
                  <p>HotelName: {value.hotelName}</p>
                  <p>LocalAdd: {value.localadd}</p>
                  <p>City: {value.city}<span style={{ marginLeft: 75 }}>State: {value.state}</span></p>
                  <p>Phone: {value.phone}</p>
                  <p style={{ fontWeight: "bold", fontSize: 20, color: "green" }}>Facility</p>
                  <p>Parking: {value.parking}<span style={{ marginLeft: 30 }}>Gym. {value.gym}</span></p>
                  <p>Pool.{value.pool}<span style={{ marginLeft: 30 }}>Restaurant.{value.restaurant}</span></p>

                  <p>RoomService.{value.roomService}<span style={{ marginLeft: 30 }}>wifi.{value.wifi}</span></p>
                  <p style={{ color: "blue" }}>Charge.{value.charge}</p>
                  <button onClick={() => { this.bookHandler(value._id, value.charge) }}>BOOK NOW</button>
                </div>
              </div>
            })
          }
        </div>


        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <button onClick={this.closeModal} style={{ marginLeft: 320 }}>close</button>
            <div style={{ height: 30 }}></div>
            <div style={{}}>
              <div><input type="email" placeholder="Enter your Email" value={this.state.loginemail} onChange={(e) => this.setState({ loginemail: e.target.value })} /></div>
              <div style={{ marginTop: 20 }}>
                <input type="password" placeholder="Enter your Password"
                  value={this.state.loginpassword} onChange={(e) => this.setState({ loginpassword: e.target.value })}
                /></div>
              <button style={{ marginTop: 20 }} onClick={this.loginHandler}>LoginUser</button>
            </div>
          </Modal>
        </div>

        <div>
          <Modal
            isOpen={this.state.signupModalopen}
            onAfterOpen={this.Modalsignupopen}
            onRequestClose={this.Modalsignupclose}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <button onClick={this.Modalsignupclose} style={{ marginLeft: 320 }}>close</button>
            <div style={{ height: 30 }}></div>
            <div style={{}}>
              <input type="text" placeholder="User Name" value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value })} />
              <br />
              <br />
              <input type="email" placeholder="Enter your Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
              <div ><input style={{ marginTop: 20 }} type="password" placeholder="Enter your Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} /></div>
              <button style={{ marginTop: 20 }} onClick={this.signupHandler}>Submit</button>
            </div>

          </Modal>
        </div>
        <div>
          <Modal
            isOpen={this.state.bookmodalIsOpen}
            onAfterOpen={this.bookafterOpenModal}
            onRequestClose={this.bookcloseModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <div>
              {/* {
          this.state.paymentdata.map((v,key)=>{
            return (v.status==false)?
            (<p>Your Booking is pending</p>):(<p>Previous Booking</p>)
          })
        } */}
              <h4 style={{ color: "red" }}> Please Fill All Details Before Payment* !</h4>
              <input type="text" placeholder="23-06-2018" value={this.state.fromDate} onChange={(e) => this.setState({ fromDate: e.target.value })} />
              <input type="text" placeholder="24-06-2018" value={this.state.toDate} onChange={(e) => this.setState({ toDate: e.target.value })} />
              <input type="text" placeholder="No OF Room" value={this.state.noOFRoom} onChange={(e) => this.setState({ noOFRoom: e.target.value })} />
              <p>Amount INR:{Cookies.get("charge")}</p>
              <div style={{ display: "flex" }}>
                <button onClick={this.makePaymentHandler} style={{ marginRight: 20 }}>Make Payment</button>
                <button onClick={this.cancelMaymentHandler}>Cancel Payment</button>
              </div>
            </div>

          </Modal>
          <div>

            <Modal
              isOpen={this.state.draftmodalIsOpen}
              onAfterOpen={this.draftafterOpenModal}
              onRequestClose={this.draftcloseModal}
              style={customStyles}
              contentLabel="Example Modal"
            >

              <button onClick={this.draftcloseModal} style={{ marginLeft: 320 }}>close</button>
              <div>Draft Book Details</div>
              {
                this.state.draftData.map((v, k) => {
                  return <div style={{ border: "2px solid #233367", padding: 20 }}>
                    <p>Hotel Name :{v.HotelName}</p>
                    <p>Booking Date:{v.createdAt}</p>
                    <p>No OF Room:{v.noOfRoom}</p>
                    <p>Amount :{v.amount}</p>
                    <p>From Date :{v.fromDate}</p>
                    <p>To Date :{v.toDate}</p>

                    <p style={{ color: "red" }}> Please Make Payment</p>
                  </div>
                })
              }
            </Modal>
          </div>
          <div>
            <Modal
              isOpen={this.state.completebookmodalIsOpen}
              onAfterOpen={this.completebookafterOpenModal}
              onRequestClose={this.completebookcloseModal}
              style={customStyles}
              contentLabel="Example Modal"
            >

              <button onClick={this.completebookcloseModal} style={{ marginLeft: 320 }}>close</button>
              <div>Complete book details</div>

              {
                this.state.completebookData.map((v, k) => {
                  return <div style={{ border: "2px solid #233367", padding: 20 }}>
                  <p>Hotel Name :{v.HotelName}</p>
                    <p>Booking Date:{v.createdAt}</p>
                    <p>No OF Room:{v.noOfRoom}</p>
                    <p>Amount :{v.amount}</p>
                    <p>From Date :{v.fromDate}</p>
                    <p>To Date :{v.toDate}</p>
                    
                  </div>
                })
              }

            </Modal>

          </div>


        </div>

      </div>
    );
  }
}

export default Header;
