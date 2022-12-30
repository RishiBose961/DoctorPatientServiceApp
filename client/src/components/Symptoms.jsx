import React, {Component } from 'react';

var apimedicurl = 'https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBpcGlyb3kwM0BnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjExNjA3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIyLTEyLTI5IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2NzIzOTM1NTUsIm5iZiI6MTY3MjM4NjM1NX0.v3x3KwjJ68W3bz5XbnT6k9FdOeSK31Av0gncX_qAn2E&format=json&language=en-gb';

class Symptoms extends Component {

    constructor(props){
      super(props)
  
      this.state = {
        symptoms: [],
        symptomsCount: [],
        // issues: [],
        // bodyLocations: []
        value: ''
      }
    }
  
    componentDidMount() {
      this.callBackendAPI()
        .then(res => this.setState({ 
          symptoms: res.symptoms,
          symptomsCount: res.symptomsCount
          // issues: res.issues, 
          // bodyLocations: rebodyLocationss.course, 
        }))
        .catch(err => console.log(err));
    }
  
    callBackendAPI = async () => {
                                
      const data = await fetch(apimedicurl);
      const dataBody = await data.json();
      
      var ret = {
        symptoms: [],
        symptomsCount: []
      }
  
      for (let i = 0; i < dataBody.length; i++){
        ret.symptoms.push(dataBody[i].Name)
        ret.symptomsCount.push(i)
      }
  
      return ret;
  
    }
  
    handleChange = (event) => {
      this.setState({value: event.target.value});
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      // console.log("symptom selected is", e.target.body.value);
      // console.log(JSON.stringify(e.target.body.value));
  
      const body = e.target.body.value;
      // console.log(this.state.value)
  
      fetch("http://localhost:5000/symptom", {
        method: "POST",
        body: JSON.stringify(this.state.value)
      }).then((response) => response.json())
      .then((result) => {
        console.log(result)
      });
    };
  
  
    render(){
      return (
        <form onSubmit={this.handleSubmit}>
  
                <select 
                  value={this.state.value} 
                  onChange={this.handleChange}
                  className="form-select" 
                  id="symptoms" 
                  name="body" 
                  aria-label="Default select example" >
                    <option> Your Symptoms</option>
                  {
                    this.state.symptomsCount.map((index) => (
                      <option key={index} value={this.state.symptoms[index]}>{this.state.symptoms[index]}</option>
                    ))
                  }
                </select>
                <button type="submit">Submit</button>
  
        </form>
      )
    }
  }
  
  
  export default Symptoms
  