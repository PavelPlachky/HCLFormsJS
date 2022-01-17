# HclFormsJS
Enhancements for MS Dynamics Marketing Forms @HCL
All source code is in the file lib.js

## Usage:
Load the library from GitHub through jsdelivr
* lib.js - original file
* lib.min.js - automatically minimized file

## Functions:
### addEmailValidation()
Verifies that the submitted email address is not invalid and that it is not from a free email provider. If it is, it displays (unhides) an element with an attribute error-message-for="email" and prevents submission of the form. If no such element exists, the function has no effect.

### disableReloadButton()
Hides a "Reload" button after a successful form submission

### setProductGroupFromURL()
Sets the hidden field Product Group to a value inferred from URL, soemtimes based on the URL, sometimes based only on the Path. The function is case insensitive.

##### Product Pages (URL starts with ...)
* https://www.hclindustrysaas.com/telecom-5g/augmented-network-automation	HCL ANA Platform
* https://www.hclindustrysaas.com/telecom-5g/nfv-acceleration	HCL NFV Acceleration
* https://www.hclindustrysaas.com/telecom-5g/iCEX-DeviceMgmt	HCL iCE.X
* https://www.hclindustrysaas.com/telecom-5g/augmented-network-automation/sonflex	HCL ANA Platform
* https://www.hclindustrysaas.com/telecom-5g/x-haul-wireless-modem-ip	HCL X-Haul
* https://www.hclindustrysaas.com/enterprise-cloud-ai	HCL IntelliService
* https://www.hclindustrysaas.com/telecom-5g/hcl-smartwifi	HCL SMARTWiFi
* https://dfmpro.com/	HCL DFMPro
* https://www.glovius.com/	HCL Glovius
* https://camworks.com/nestingworks/	HCL NestingWorks
* https://camworks.com/	HCL CAMWorks
* https://geomcaliper.geometricglobal.com/	HCL GeomCaliper

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

### setUTMParameters()
Sets hidden fields utmSource, utmMedium and utmCampaign from URL querystring parameters utm_source, utm_medium and utm_campaign

## Example
```
<!-- Load version 1.0.0 of the library through JSDeliver -->
<script src="https://cdn.jsdelivr.net/gh/PavelPlachky/hclFormsJS@v1.0.0/lib.min.js"></script>

<!-- Use Library -->
<script>
// Prevents submission of free and obviously bogus email addresses
HclFormsJS.addEmailValidation();
</script>
```
