# HCLFormsJS
Enhancements for MS Dynamics Marketing Forms @HCL
All source code is in the file lib.js

## Usage:
Load the library from GitHub through jsdelivr

* lib.js - original file
* lib.min.js - automatically minimized file

Call the function HCLFormsJS.extend(options) with options as described below

## Properties of the options parameter:
The options parameter is a JavaScript object with the following properties



### validateEmail
Default value: false

When set to true, it verifies the submitted email address is not invalid and that it is not from a free email provider. If it is, it displays (unhides) an element with an attribute error-message-for="email" and prevents submission of the form. If no such element exists, the function has no effect.

### disableReloadButton
Default value: false

When set to true, hides a "Reload" button after a successful form submission

### setProductGroupFromURL
Default value: false

When set to true, sets the hidden field Product Group to a value inferred from URL, soemtimes based on the URL, sometimes based only on the Path. The comparison is case insensitive.

##### Product Pages (URL starts with ...)
* https://www.hclindustrysaas.com/telecom-5g/augmented-network-automation	---> HCL ANA Platform
* https://www.hclindustrysaas.com/telecom-5g/nfv-acceleration	---> HCL NFV Acceleration
* https://www.hclindustrysaas.com/telecom-5g/iCEX-DeviceMgmt	---> HCL iCE.X
* https://www.hclindustrysaas.com/telecom-5g/augmented-network-automation/sonflex	---> HCL ANA Platform
* https://www.hclindustrysaas.com/telecom-5g/x-haul-wireless-modem-ip	---> HCL X-Haul
* https://www.hclindustrysaas.com/enterprise-cloud-ai	---> HCL IntelliService
* https://www.hclindustrysaas.com/telecom-5g/hcl-smartwifi	---> HCL SMARTWiFi
* https://www.hclindustrysaas.com/smartwifi	---> HCL SMARTWiFi
* https://www.hclindustrysaas.com/augmented-network-automation ---> HCL ANA Platform
* https://www.hclindustrysaas.com/nfv-acceleration ---> HCL NFV Acceleration
* https://www.hclindustrysaas.com/iCEX-DeviceMgmt	---> HCL iCE.X
* https://www.hclindustrysaas.com/x-haul-wireless-modem-ip ---> HCL X-Haul
* https://dfmpro.com/	---> HCL DFMPro
* https://www.glovius.com/ ---> HCL Glovius
* https://camworks.com/nestingworks/ ---> HCL NestingWorks
* https://camworks.com/	---> HCL CAMWorks
* https://geomcaliper.geometricglobal.com/ ---> HCL GeomCaliper

##### D356 Pages (Path starts with ...) 
* /DFMPro	--->	HCL DFMPro
* /Glovius	--->	HCL Glovius
* /CAMWorks	--->	HCL CAMWorks
* /NestingWorks	--->	HCL NestingWorks
* /GeomCaliper	--->	HCL GeomCaliper
* /Augmented_Network_Automation	--->	HCL ANA Platform
* /NFV_Acceleration	--->	HCL NFV Acceleration
* /iCE.X	--->	HCL iCE.X
* /X-Haul	--->	HCL X-Haul
* /IntelliService	--->	HCL IntelliService
* /SMARTWiFi	--->	HCL SMARTWiFi

### setUTMParamsFromURL
Default value: false

When set to true, sets hidden fields utmSource, utmMedium and utmCampaign from URL querystring parameters utm_source, utm_medium and utm_campaign. Note that for PathFactory the UTM parameters are set using the PathFactory variables instead - see the pathFactoryParams option below.

### pathFactoryParams
Default value: none

An embedded JavaScript object that contains values provided by PathFactory when the form is embedded on PathFactory pages. When this option is present, it will trigger a PathFactory specific processing as follows:
* Map External ID (part 1) to Product Group Field as follows
  - DFMPro ---> HCL DFMPro
  - Glovius ---> HCL Glovius
  - CAM ---> HCL CAMWorks
  - nest ---> HCL NestingWorks
  - caliper ---> HCL GeomCaliper
  - ANA ---> HCL ANA Platform
  - NFV ---> HCL NFV Acceleration
  - icex ---> CL iCE.X
  - xhaul ---> HCL X-Haul
  - iTS ---> HCL IntelliService
  - wifi ---> HCL SMARTWiFi
* Send conversion event to Google Tag Manager, label is second part of External ID
* Invoke LinkedIn tracking pixel, conversion ID is 3rd part of External ID
* Set PathFactory Track Name to PF Track Name field
* Set UTM parameters
* Post message to parent, which closes the form

The pathFactoryParams property is a JavaScript object with the following properties

##### pfExternalId
The external ID, accessed through {{experience.external_id}}. It contains three segments separated by a vertical pipe (|) character.
##### pfTrackName
Pathfactory track name, accessed through {{experience.name}}
##### pfUTMMedium
UTM parameter medium, accessed through {{query.utm_medium}}
##### pfUTMSource
UTM parameter source accessed through {{query.utm_source}}
##### pfUTMCampaign
UTM parameter campaign, accessed through {{query.utm_campaign}}

Note that since the forms are loaded on PathFactory using an Iframe, it is necessary to load the global site tag (gtag.js) - Google Ads: 474961795 separately using the following code:
```
<!-- Global site tag (gtag.js) - Google Ads: 474961795 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-474961795"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-474961795');
</script>
```

## Examples
Usage on product pages or D365 pages
```
<!-- Load version 1.0.0 of the library through JSDeliver -->
<script src="https://cdn.jsdelivr.net/gh/PavelPlachky/HCLFormsJS@v1.0.0/lib.min.js"></script>

<!-- Use Library -->
<script>
HCLFormsJS.extend( 
  {
    validateEmail:true,
    disableReloadButton:true,
    setProductGroupFromURL:true,
    setUTMParamsFromURL:true,
  });
</script>
```

Usage on PathFactory
```
<!-- Global site tag (gtag.js) - Google Ads: 474961795 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-474961795"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-474961795');
</script>
<!-- Load version 1.0.0 of the library through JSDeliver -->
<script src="https://cdn.jsdelivr.net/gh/PavelPlachky/HCLFormsJS@v1.0.0/lib.min.js"></script>

<!-- Use Library -->
<script>
HCLFormsJS.extend( 
  {
    pathFactoryParams:{
      pfExternalId:"{{experience.external_id}}",
      pfTrackName:"{{experience.name}}",
      pfUTMMedium:"{{query.utm_medium}}",
      pfUTMSource:"{{query.utm_source}}",
      pfUTMCampaign:"{{query.utm_campaign}}",
    },
  });
</script>
```
