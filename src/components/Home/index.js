import React, { Component } from 'react';
import '../../assets/stylesheets/application.css';
import { getWeb3, getNetworkVersion } from '../../utils/blockchainHelpers'
import { Link } from 'react-router-dom'
import { defaultState } from '../../utils/constants'
import { ICOConfig } from '../Common/config'


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState
  }
goToInvestPageH = () => {
  		let queryStr = "";
  		if (!ICOConfig.crowdsaleContractURL || !ICOConfig.networkID) {
  			if (this.state.contracts.crowdsale.addr) {
	  			queryStr = "?addr=" + this.state.contracts.crowdsale.addr[0];
	  			if (this.state.networkID)
	  				queryStr += "&networkID=" + this.state.networkID;
	  		}
  		}

      this.props.history.push('/invest' + queryStr);
  	}
  
  goToCrowdsalePageH = () => {
  		let queryStr = "";
  		if (!ICOConfig.crowdsaleContractURL || !ICOConfig.networkID) {
  			if (this.state.contracts.crowdsale.addr) {
	  			queryStr = "?addr=" + this.state.contracts.crowdsale.addr[0];
	  			if (this.state.networkID)
	  				queryStr += "&networkID=" + this.state.networkID;
	  		}
  		}

      this.props.history.push('/crowdsale' + queryStr);
  	}
  render() {
    return (
      <div>
        <section className="home">
          <div className="crowdsale">
            <div className="container">
              <h1 className="title">YouTweak.iT</h1>
              <p className="description"> 
	      Realise and Monetise your ideas like never before!
              <br/>Based on <a href="https://github.com/TokenMarketNet/ico">TokenMarket</a>. 
	      <br/>We build first worldwide social project on Oracles Network!
	      <br/>Crowdsale STARTS at 23:00 PM 14.12.2017
	      <br/>BE SURE YOU HAVE UPDATED METAMASK PLUGIN INSTALLED!
              </p>
              <div className="buttons">
                 <a href onClick="https://hackmd.io/s/Hk_x516TW"} className="button button_fill" target="_blank">White Paper</a>
                <a onClick={this.goToInvestPageH} className="button button_fill">Invest Page</a> 
              </div>
            </div>
          </div>
          <center>
	    <div className="process">
            <div className="container">
              <div className="process-item">
                <div className="step-icons step-icons_crowdsale-page"></div>
                <p className="title">Crowdsale Page</p>
                <p className="description">
                  Bookmark this page for campaign statistics.
                </p>
              </div>
	    </div>
          </div>
	  </center>
        </section>
      </div>
    );
  }
}
