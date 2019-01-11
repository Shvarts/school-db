import React, { Component } from 'react';

class Development extends Component {

    render() {
        return (
            <div className="animated fadeIn">
<h1 id="development">Development</h1>
<h2 id="overview">Overview</h2>
<p>Describe here the several apsects of the development process in details.</p>
<p>Place here all the list of references to all the tools, repositories, specifications, test servers, etc. 
that are needed by a developer, who is using the SDK.</p>
<h3 id="acquiring-credentials">Acquiring Credentials</h3>
<p>All users of the inTime SDK must obtain authentication and authorization credentials
and provide them as values for the parameters <code>app_id</code> and <code>app_code</code>.
The credentials are assigned per application.</p>
<p>This document uses the placeholder text <code></code> and <code></code> as placeholders for access and authorization credentials.
Replace these placeholders with your own unique application-specific credentials to access the API resources.</p>
<p>To obtain the credentials for an application, please..... TBD.</p>
<h3 id="intime-sensors-sdk-server-environments">inTime Sensors-SDK Server Environments</h3>
<p>We provide two server environments for handling your requests:</p>
<ul>
<li>a Production environment, and</li>
<li>a Customer Integration Testing (CIT) environment.</li>
</ul>
<p>You can use the CIT Environment when testing your application.</p>
<p>The examples and demos we provide to you use this CIT environment only to provide an illustration of how the service operates.</p>
<p>You are required to use the Production environment for general production use. The CIT environment must not be used for production.</p>
<h3 id="api-versions">API versions</h3>
<p>The SDK use 3-digit <a href="https://semver.org/">semantic versioning</a>.</p>
<p>Given a version number <code>MAJOR.MINOR.PATCH</code>, the subsequent three digits represent (in this order):</p>
<ul>
<li><strong>major version</strong>: changes when the functionality of the API is changed in non-backwards compatible way,</li>
<li><strong>minor version</strong>: is incremented with each release that adds features in a backwards-compatible manner,</li>
<li><strong>patch version</strong>: is incremented with each fully backwards-compatible bug-fix release.</li>
</ul>
<p>See <a href="release-notes.html">Release Notes</a> about changes in several versions.</p>
<h2 id="installation">Installation</h2>
<p>Detailed description of the development environment (per OS), incl. IDE, compiler, configurations, settings, CI environment, etc.</p>
<p>References to the artifacts needed to build the demo as well as the final app with the SDK.</p>
<h2 id="build">Build</h2>
<p>Steps of the build process (per OS).</p>
<h2 id="testing">Testing</h2>
<p>Hints about the testing in general (unit testing, integration testing)</p>
<p>References to the test server, URIs, conventions, etc.</p>
<h2 id="deployment">Deployment</h2>
<p>Describe, how to deploy, publish the apps.</p>
<h2 id="administration">Administration</h2>
<p>Describe here the:</p>
<ul>
<li>configuration management</li>
<li>security related things</li>
<li>logging<ul>
<li>connecting to the log server (FluentD forward endpoint)</li>
<li>access to/search in logs (the hosted ElasticSearch/Kibana service)</li>
</ul>
</li>
</ul>
<h2 id="troubleshooting">Troubleshooting</h2>
<p>What to do if something goes wrong (collect some typical scenarios for troubleshooting, you have been learn during the development of the SDK)
and might be useful to the SDK users as well.</p>
            </div>
        )
    }
}

export default Development;
