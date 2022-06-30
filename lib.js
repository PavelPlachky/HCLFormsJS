
var HCLFormsJS = (function(){
  let hclFormsJsMethods = {};
  
  // Validates email format. Returns true if valid.
  let validateEmailSyntax = function(addr) {
    var pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return pattern.test(addr);
  }

  // Returns true if a large, free email provider.
  let isBigProviderEmail = function(addr) {
       var isBPE = /\@mac\.com|\@yahoo\.|\@hotmail\.|\@gmail\.com|\@aol\.com|\@msn\.com|\@comcast\.net|\@att\.net|\@me\.com|\@mail\.com|\@live\.com|\@live\.net|\@live\.ca|\@rogers\.com|\.rr\.com|\@mailinator\.com|\@ymail\.com|\@web\.de|\@sbcglobal\.net|\@bex\.net|\@juno\.com|\@hushmail\.com|\@got\.net|\@planet\.nl|\@companyweb\.com|\@outlook\.com|\@pacbell\.net|\@verizon\.net|\@bestweb\.net|\@charter\.net|\@windstream\.net|\@spammotel\.com|\@tiscalinet\.it|\@primus\.ca|\@dslextreme\.com|\@bellsouth\.net|\@telus\.net|\@email\.com|\@rocketmail\.com|\@yopmail\.com|@gmx\.net|@test\.com|@optimum\.net|@earthlink\.net|@me\.org|@opayq\.com|@googlemail\.com|@icloud\.com|@mail\.ru|@free\.fr|@orange\.fr/;
	   
	   return isBPE.test(addr.toLowerCase())
  }

  // Returns true if email looks generic or like a dist list.
  let isGenericEmail = function(addr) {
    var isGEM = /^junk\@|\.junk\@|^hi\@|^a\@b\.|^sdf\@|^asdf\@|asdf|^admin\@|^listadmin\@|^webmaster\@|^hello\@|^subscribe\@|^support\@|^commercial\@|^contact\@|^spam|^no\@spam|^antispam|^anti-spam|spam\@|^contact|^news\@|^info\@|^admin\@|^test\@|cmswire\@|^sales\@|^abuse\@|^nobody\@|^administrator\@|^billing\@|marketing\@|newsletter\@|advertising\@|list\@|^noreply\@|returns|managers|partners\@|^root\@|^postmaster\@|^support\@/;
    return isGEM.test(addr.toLowerCase());
  }
  
  // set dropdown by text value
  let setSelectedIndex = function(s, v) {
      for ( var i = 0; i < s.options.length; i++ ) {
          if ( s.options[i].text == v ) {
              s.options[i].selected = true;
              return;
          }
      }
  }

  // extract querystring parameter by name
  let getQSParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  let isValidHttpUrl = function(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  hclFormsJsMethods.extend = function(options){
    
    // set default options and paramenters
    options = options || {};
    let validateEmail = options.validateEmail || false;
    let disableReloadButton = options.disableReloadButton || false;
    let setProductGroupFromURL = options.setProductGroupFromURL || false;
    let setUTMParamsFromURL = options.setUTMParamsFromURL || false;
    let appendEmailToRedirectURL = options.appendEmailToRedirectURL || false;
    let setURLField = options.setURLField || false;
    let pathFactoryParams = options.pathFactoryParams || {};
    let pfExternalId = pathFactoryParams.pfExternalId || "";
    let pfTrackName = pathFactoryParams.pfTrackName || "";
    let pfUTMMedium = pathFactoryParams.pfUTMMedium || "";
    let pfUTMSource = pathFactoryParams.pfUTMSource || "";
    let pfUTMCampaign = pathFactoryParams.pfUTMCampaign || "";

    // On Submit handlers
    MsCrmMkt.MsCrmFormLoader.on('formSubmit', function(event) {

      // Add email validation
      let messageEl = document.querySelector('[error-message-for="email"]');
      if( validateEmail && messageEl ) {
        messageEl.style.display = 'none';
        let email = document.getElementById('7f685ebb-7c54-4cff-a1bc-772562d25c38').value;
        if (!validateEmailSyntax(email) || isBigProviderEmail(email) || isGenericEmail(email)) {
          messageEl.style.display = 'block';
          event.preventDefault();
        }
      }
    }); //end on submit handlers

    // After Form Load handlers
    MsCrmMkt.MsCrmFormLoader.on("afterFormLoad", function(event) {
      
      // Set Product Group
      if( setProductGroupFromURL ) {
        const lookup = {
          "https://www.hclindustrysaas.com/telecom-5g/augmented-network-automation":"HCL ANA Platform",
          "https://www.hclindustrysaas.com/telecom-5g/nfv-acceleration":"HCL NFV Acceleration",
          "https://www.hclindustrysaas.com/telecom-5g/iCEX-DeviceMgmt":"HCL iCE.X",
          "https://www.hclindustrysaas.com/telecom-5g/augmented-network-automation/sonflex":"HCL ANA Platform",
          "https://www.hclindustrysaas.com/telecom-5g/x-haul-wireless-modem-ip":"HCL X-Haul",
          "https://www.hclindustrysaas.com/enterprise-cloud-ai":"HCL IntelliService",
          "https://www.hclindustrysaas.com/telecom-5g/hcl-smartwifi":"HCL SMARTWiFi",
          "https://www.hclindustrysaas.com/smartwifi":"HCL SMARTWiFi",
          "https://www.hclindustrysaas.com/augmented-network-automation":"HCL ANA Platform",
          "https://www.hclindustrysaas.com/nfv-acceleration":"HCL NFV Acceleration",
          "https://www.hclindustrysaas.com/iCEX-DeviceMgmt":"HCL iCE.X",
          "https://www.hclindustrysaas.com/x-haul-wireless-modem-ip":"HCL X-Haul",
          "https://dfmpro.com/":"HCL DFMPro",
          "https://www.glovius.com/":"HCL Glovius",
          "https://camworks.com/nestingworks/":"HCL NestingWorks",
          "https://camworks.com/":"HCL CAMWorks",
          "https://geomcaliper.geometricglobal.com/":"HCL GeomCaliper",
          "/DFMPro":"HCL DFMPro",
          "/Glovius":"HCL Glovius",
          "/CAMWorks":"HCL CAMWorks",
          "/NestingWorks":"HCL NestingWorks",
          "/GeomCaliper":"HCL GeomCaliper",
          "/Augmented_Network_Automation":"HCL ANA Platform",
          "/NFV_Acceleration":"HCL NFV Acceleration",
          "/iCE.X":"HCL iCE.X",
          "/X-Haul":"HCL X-Haul",
          "/IntelliService":"HCL IntelliService",
          "/SMARTWiFi":"HCL SMARTWiFi",
        };
        
        let href = location.href;
        let path = location.pathname;
        if( path[0] != '/' ) { //IE Compatibility fix
          path = '/' + path;
        }
        for(index in lookup) {
          if( href.substring(0,index.length).toLowerCase() === index.toLowerCase() ||
              path.substring(0,index.length).toLowerCase() === index.toLowerCase() ) {
            let productGroupField = document.getElementById('e0de53e9-3007-ec11-94ef-00224826ae39');
            if( productGroupField ) {
               setSelectedIndex(productGroupField, lookup[index]);
            }  
            break;
          }
        }
      }

      // Set UTM Parameters
      if( setUTMParamsFromURL ){
        let utmSource = document.getElementById('19d56bd1-d543-ec11-8c62-00224829b74c'); // prod
        if( utmSource ){
          utmSource.value = getQSParameterByName("utm_source");
        }

        let utmMedium = document.getElementById('880b9de3-d543-ec11-8c62-00224829b74c'); // prod
        if( utmMedium ){
          utmMedium.value = getQSParameterByName("utm_medium");
        }
        
        let utmCampaign = document.getElementById('6e5165ad-d543-ec11-8c62-00224829b74c'); // prod
        if( utmCampaign ){
          utmCampaign.value = getQSParameterByName("utm_campaign");
        }
      }
      
      if( setURLField ) {

          //search for string until ? or #
          const re=/^[^\#\?]+/;
          let url=re.exec(location.href)[0]
          let urlField = document.getElementById('37e9882a-1422-ec11-b6e6-00224822e862'); // prod
          if( urlField ){
            urlField.value=url;
          }
      }
      
      // Set values from PathFactory
      if( options.pathFactoryParams ){
          const pfIdLookup = {
            "DFMPro":"HCL DFMPro",
            "Glovius":"HCL Glovius",
            "CAM":"HCL CAMWorks",
            "nest":"HCL NestingWorks",
            "caliper":"HCL GeomCaliper",
            "ANA":"HCL ANA Platform",
            "NFV":"HCL NFV Acceleration",
            "icex":"HCL iCE.X",
            "xhaul":"HCL X-Haul",
            "iTS":"HCL IntelliService",
            "wifi":"HCL SMARTWiFi",
            "WFM":"Blue Yonder WFM",
            "LMS":"INFOR LMS",
            "XM":"INFOR XM",		  
        };
        let externalIdArr = pfExternalId.split("|");
        for(index in pfIdLookup) {
          if( index.toLowerCase() === externalIdArr[0].toLowerCase() ) {
            let productGroupField = document.getElementById('e0de53e9-3007-ec11-94ef-00224826ae39'); // prod

            if( productGroupField ) {
               setSelectedIndex(productGroupField, pfIdLookup[index]);
            }  
            break;
          }
        }
        
        let pFTrackName = document.getElementById('0919491e-d843-ec11-8c62-00224829b74c'); // prod
        if( pFTrackName ){
          pFTrackName.value = pfTrackName;
        }

        let utmSource = document.getElementById('19d56bd1-d543-ec11-8c62-00224829b74c'); // prod
        if( utmSource ){
          utmSource.value = pfUTMSource;
        }

        let utmMedium = document.getElementById('880b9de3-d543-ec11-8c62-00224829b74c'); // prod
        if( utmMedium ){
          utmMedium.value = pfUTMMedium;
        }
        
        let utmCampaign = document.getElementById('6e5165ad-d543-ec11-8c62-00224829b74c'); // prod
        if( utmCampaign ){
          utmCampaign.value = pfUTMCampaign;
        }
      }
      
    }); // End after form load handlers

    // After form submit handlers
    // Redirect Processing - do not combine with PathFactory processing
    if( appendEmailToRedirectURL ){
      MsCrmMkt.MsCrmFormLoader.on("afterFormSubmit", function(event) {
        
        // Watch a success message with http(s) link to appear in the form area and redirect there with email address appended at the end
        const mutationTarget = document.querySelectorAll("div[data-form-block-id]")[0];
        const mutationOptions = {childList: true, subtree: true};
        const emailAddr = document.querySelector('input[type="email"]').value;
        const callback = function(mutationsList, observer) {
           for(const mutation of mutationsList) {
            if (mutation.type === 'childList' ) {
              for( const node of mutation.addedNodes ) {
                const nodeList = node.querySelectorAll("div.onFormSubmittedFeedbackMessage");
                if( nodeList.length > 0 ){
                  
                  // found the message
                  const redirectUrl = nodeList[0].innerText.trim();
                  if( isValidHttpUrl(redirectUrl) ) {
                    let lbLink = document.createElement("a");
                    lbLink.href = redirectUrl;
                    let newURL = redirectUrl + (lbLink.search ? "&" : "?") + "lb_email=" + emailAddr;
                    window.location.href = newURL;
                  }
                }
              }
            }
          }
        };
        
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(mutationTarget, mutationOptions);
      });       
    }
    
    // PathFactory
    else if( options.pathFactoryParams ){
      MsCrmMkt.MsCrmFormLoader.on("afterFormSubmit", function(event) {
        // function to load an image and invoke callback when ready
        let loadImage = function (src,callback = function(){return undefined;}) {
          let img = new Image();
          img.onload = callback;
          img.onerror = callback;
          img.src = src;
        }

        //post email address and location to parent, which will close the modal upon receipt
        let emailAddr = document.querySelector('input[type="email"]').value;
        let postToParent = function(){
          if(emailAddr){
            window.parent.postMessage({
              conversionUrl: document.location.href,
              referrer: document.referrer,
              email: emailAddr,
              lookbookExternalForm: true
              }, "*");
          }
        };
        
        //Use 2nd part of external ID to fire a Google conversion tag
        let externalIdArr = pfExternalId.split("|");  
        
        let googleTagFnc = function() {
          if(typeof gtag === "function" && externalIdArr.length > 1 && externalIdArr[1] !== ""){
            gtag('event', 'conversion', {
                'send_to': externalIdArr[1],
                'event_callback': postToParent
                });
          }
          else
          {
            postToParent();
          }
        };
         
        //Use 3rd part of external ID to fire a LinkedIn conversion tag
        if( externalIdArr.length > 2 && externalIdArr[2] !== "" ){
          loadImage('https://px.ads.linkedin.com/collect/?pid=5579&conversionId=' + externalIdArr[2] + '&fmt=gif' ,googleTagFnc);
        } else {
          googleTagFnc();
        } 
      });
    }


    // Disable reload button
    if( disableReloadButton ) {
      let css = 'button.onFormSubmittedFeedbackButtonSuccess { display: none !important; }',
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');

      head.appendChild(style);
      if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }
  }
  
  return hclFormsJsMethods;
})();









