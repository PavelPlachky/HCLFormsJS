
var HclFormsJS = (function(){
  let hclFormsJsMethods = {};
  
  // Validates email format. Returns true if valid.
  let validateEmailSyntax = function(addr) {
    var pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return pattern.test(addr);
  };

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
  function setSelectedIndex(s, v) {
      for ( var i = 0; i < s.options.length; i++ ) {
          if ( s.options[i].text == v ) {
              s.options[i].selected = true;
              return;
          }
      }
  }

  hclFormsJsMethods.addEmailValidation = function () {
    MsCrmMkt.MsCrmFormLoader.on('formSubmit', function(event) {
      // check if email is ok
      var messageEl = document.querySelector('[error-message-for="email"]');
      if( messageEl ) {
        messageEl.style.display = 'none';
        var email = document.getElementById('7f685ebb-7c54-4cff-a1bc-772562d25c38').value;
        if (!validateEmailSyntax(email) || isBigProviderEmail(email) || isGenericEmail(email)) {
          messageEl.style.display = 'block';
          event.preventDefault();
        }
      }
    });    
  }
  
  return hclFormsJsMethods;
})();









