import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <footer className="bg-secondary text-white py-4">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-4 text-right">
              <h5>Contact Us</h5>
              <table className="table text-white">
                <tbody>
                  <tr>
                    <td className="text-right font-weight-bold">Email:</td>
                    <td className="text-left">tothailinhytbg2003@gmail.com</td>
                  </tr>
                  <tr>
                    <td className="text-right font-weight-bold">Phone:</td>
                    <td className="text-left">(+89) 0329804532</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-dark text-center py-3">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
