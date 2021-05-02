import React, { Component } from 'react';
import '../style/Contact.css';

export default class Contact extends Component {
  render() {
    return (
      <div class="contact-container">
        <h1> Contact Us</h1><br/>
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="userName">Name</label>
              <input type="name" class="form-control" id="userName" placeholder="Name" />
            </div>
            <div class="form-group col-md-6">
              <label for="userEmail">Email</label>
              <input type="email" class="form-control" id="userEmail" placeholder="Email" />
            </div>
          </div>
          <div class="form-group">
            <label for="enquiryType">Enquiry Type</label>
            <select id="enquiryType" class="form-control">
              <option selected>Choose...</option>
              <option>Questions about data</option>
              <option>Contribution to database</option>
              <option>Suggestions</option>
              <option>Complaints</option>
              <option>Others</option>
            </select></div>

          <div class="form-group">
            <label for="inputMessage">Message</label>
            <input type="text" class="form-control" id="inputMessage" placeholder="Your message here" />
          </div>

<br/>
          <button type="submit" class="btn btn-dark btn-block">Submit ➡</button>

        </form>

      </div>
    )
  }
}
