import React from 'react'
import '../../assets/stylesheets/application.css';
import { Link } from 'react-router-dom'

export const Footer = () => (
	<footer className="footer">
		<div className="container">
			<p className="rights">2017 YouTweak.iT on Oracles Network. All rights reserved.</p>
     
			<div className="socials">
	    <a href="https://twitter.com/youtweak" className="social social_twitter"></a>
        <a href="https://www.oracles.org" className="social social_oracles"></a>
        <a href="https://t.me/joinchat/CjJ4_A0iRq0nXC6iIkJpeg" className="social social_telegram"></a>
        <a href="https://github.com/youtweakit/" className="social social_github"></a>
        <a href="https://youtweak.it" className="social social_reddit"></a>
			</div>
		</div>
	</footer>
)
