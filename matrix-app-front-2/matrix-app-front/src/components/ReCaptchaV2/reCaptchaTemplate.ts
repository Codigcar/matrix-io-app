const reCaptchaTemplate = `
    <!DOCTYPE html>
    <html>
      <head> 
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
        <script src="https://recaptcha.google.com/recaptcha/api.js?explicit&hl=$'es'"></script> 
        <script type="text/javascript"> 
          var onloadCallback = function() { };  
          var onDataCallback = function(response) { 
            window.ReactNativeWebView.postMessage(response);  
            setTimeout(function () {
              document.getElementById('captcha').style.display = 'none';
            }, 1500);
          };  
          var onCancel = function() {  
            window.ReactNativeWebView.postMessage("cancel"); 
            document.getElementById('captcha').style.display = 'none';
          }
          var onDataExpiredCallback = function(error) {  window.ReactNativeWebView.postMessage("expired"); };  
          var onDataErrorCallback = function(error) {  window.ReactNativeWebView.postMessage("error"); } 
        </script> 
        <style>
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          
          #captcha {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .btn {
            background-color: #c60710; 
            color: #ffffff; 
            padding: 8px 32px; 
            margin-top: 8px; 
            border: none; 
            border-radius: 25px; 
            font-weight: bold;
          }
          
          .btn:active {
            outline: none;
          }
          
          .btn:focus {
            outline: none;
          }
        </style>
      </head>
      <body> 
        <div id="captcha">
          <div class="g-recaptcha" style="display: inline-block; height: auto;" 
              data-sitekey="6LdUveAoAAAAAHE9gpkTBgU9m_oS51QgeKOsNKZz" 
              data-callback="onDataCallback"  
              data-expired-callback="onDataExpiredCallback"  
              data-error-callback="onDataErrorCallback">
          </div>
          <button onclick="onCancel()" class="btn" type="button">
            'Cerrar'
          </button>
        </div>
      </body>
    </html>`;
export default reCaptchaTemplate;
