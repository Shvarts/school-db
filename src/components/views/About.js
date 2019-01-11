import React, { Component } from 'react';

class About extends Component {

    render() {
        return (
            <div className="animated fadeIn">
<h1 id="about">About</h1>
<h2 id="basic-concepts">Basic Concepts</h2>
<p>Describe here shortly the fundamental concepts of the intime sensors-sdk system, the sdk, etc.</p>
<h2 id="features">Features</h2>
<p>The features of the inTime sensors-sdk:</p>
<ul>
<li>SDK Feature 1</li>
<li>SDK Feature 2</li>
<li>SDK Feature ...</li>
<li>SDK Feature N</li>
</ul>
<h2 id="architecture">Architecture</h2>
<p>This is the place of the architecture description of the inTime Shadow SDK and its backend...</p>
<p>Draw an image here, that explains the architecture:</p>
<ul>
<li>Find the graphml source file of the architecture drawing under the img folder,</li>
<li>complete the drawing with the <a href="http://www.yworks.com/products/yed">yed graphml editor</a>,</li>
<li>and export the diagram as a png.</li>
</ul>
<p><img src="img/intime-sensors-sdk-architecture.png" alt="The intime sensors-sdk system architecture"/></p>
<p>Describe the system components of the architecture.</p>
            </div>
        )
    }
}

export default About;
