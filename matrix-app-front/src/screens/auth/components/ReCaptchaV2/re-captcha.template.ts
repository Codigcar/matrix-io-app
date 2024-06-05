import { GCP_RECAPTCHA_V2_KEY_ID } from 'src/utils/constants';

const reCaptchaTemplate = `
<!DOCTYPE html>
<html>
  <head> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet">
    <script src="https://www.google.com/recaptcha/enterprise.js"></script> 
    <script type="text/javascript"> 
      var onloadCallback = function() { };  
      var onDataCallback = function(response) { 
        window.ReactNativeWebView.postMessage(response);  
      };  
      var onCancel = function() {  
        window.ReactNativeWebView.postMessage("cancel"); 
        document.getElementById('captcha').style.display = 'none';
      };
      var onDataExpiredCallback = function(error) { 
        window.ReactNativeWebView.postMessage("expired"); 
      };  
      var onDataErrorCallback = function(error) { 
        window.ReactNativeWebView.postMessage("error"); 
      }; 
    </script> 
    <style>
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        height: 70vh;
      }

      body, .title {
        font-family: 'Roboto Serif', serif;
        font-weight: 500;
      }

      .title-container {
        margin-top: 32px; 
        text-align: center;
      }

      .title {
        font-size: 28px; 
        font-weight: 500;
        color: #000000;
        line-height: 34px;
        letter-spacing: 0px;
      }

      .message {
        font-size: 18px; 
        margin-top: 8px;
        margin-bottom: 40px;
        font-family: 'Outfit', sans-serif;
        font-size: 18px;
        color: #3D3D3D;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.1599999964237213px;
      }

      #captcha {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .g-recaptcha {
        display: inline-block; 
        height: auto;
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

      .btn:active,
      .btn:focus {
        outline: none;
      }
    </style>
  </head>
  <body> 
    <!-- Icono SVG -->
    <div style="text-align:center; margin: 20px 0;">
      <svg width="78" height="78" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="32" fill="white" stroke="url(#paint0_linear_444_7971)" stroke-width="6"/>
        <path d="M49.9901 6.72118C45.5184 4.34592 40.4164 3.00024 35 3.00024C17.3269 3.00024 3 17.3271 3 35.0003C3 52.6734 17.3269 67.0003 35 67.0003C48.1796 67.0003 59.4983 59.0327 64.402 47.6514" stroke="url(#paint1_linear_444_7971)" stroke-width="6" stroke-linecap="round"/>
        <circle cx="35" cy="45" r="3" fill="#292929"/>
        <path d="M35 25V36" stroke="#292929" stroke-width="6" stroke-linecap="round"/>
        <defs>
        <linearGradient id="paint0_linear_444_7971" x1="40.2093" y1="1.51163" x2="61.7908" y2="46.907" gradientUnits="userSpaceOnUse">
        <stop stop-color="white"/>
        <stop offset="1" stop-color="#FCC773"/>
        </linearGradient>
        <linearGradient id="paint1_linear_444_7971" x1="3" y1="18" x2="64" y2="51" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FAA219"/>
        <stop offset="1" stop-color="#FCC773"/>
        </linearGradient>
        </defs>
      </svg>
    
    </div>
    <div class="title-container">
      <h1 class="title">
        ¡Validación <br /> requerida!
      </h1>
      <p class="message">
        Para continuar debes <br /> completar la validación
      </p>
    </div>
    <div id="captcha">
      <div class="g-recaptcha" 
          data-sitekey=${GCP_RECAPTCHA_V2_KEY_ID}
          data-callback="onDataCallback"  
          data-expired-callback="onDataExpiredCallback"  
          data-error-callback="onDataErrorCallback">
      </div>
    </div>
  </body>
</html>`;
export default reCaptchaTemplate;
