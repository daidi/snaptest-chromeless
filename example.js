 const {
   Chromeless
 } = require('chromeless')

 const TIMEOUT = 10000;
 const random = "" + parseInt(Math.random() * 1000000);
 const random1 = "" + parseInt(Math.random() * 1000000);
 const random2 = "" + parseInt(Math.random() * 1000000);
 const random3 = "" + parseInt(Math.random() * 1000000);

 /* Test: Example */

 async function run() {

   const baseUrl = "https://www.reddit.com";
   const chromeless = new Chromeless()
   bindShims(chromeless);

   await chromeless
     .goto(baseUrl + "/r/programming/")
     // .viewport(1272, 731)
     .screenshot()

    await chromeless.end();

 };

 run().catch(console.error.bind(console))



 function bindShims(chromeless) {


   chromeless.snapRefresh = () => chromeless.evaluate(() => window.location.reload());

   chromeless.snapBack = () => chromeless.evaluate(() => window.history.back());

   chromeless.snapClearTextInput = (selector) => chromeless.type('', selector).press(8, 50);

   chromeless.snapBlur = (selector) => chromeless.evaluate((selector) => {
     (function(el) {
       var event = new FocusEvent('blur');
       el.dispatchEvent(event);
     })(document.querySelector(selector));
   }, selector)

   chromeless.snapSubmit = (selector) => chromeless.evaluate((selector) => {
     (function(el) {
       var event = new Event('submit');
       el.dispatchEvent(event);
     })(document.querySelector(selector));
   }, selector)

   chromeless.snapGetText = async function(selector) {
     const result = await this.evaluate((selector) => {
       var el = document.querySelector(selector);
       var text = "";
       for (var i = 0; i < el.childNodes.length; ++i)
         if (el.childNodes[i].nodeType === 3)
           if (el.childNodes[i].textContent)
             text += el.childNodes[i].textContent;
       text = text.replace(/(\r\n|\n|\r)/gm, "");
       return text.trim();
     }, selector);

     return result;
   };

   chromeless.snapTextIs = async function(selector, text, timeout) {

     var maxAttempts = 5;
     var currentAttempt = 0;
     var _this = this;

     async function checkForText(selector, text) {
       const thisText = await _this.getText(selector);

       if (thisText === text) {
         return;
       } else if (currentAttempt < maxAttempts) {
         console.log(currentAttempt, maxAttempts)
         currentAttempt++;
         await _this.wait(1000);
         await checkForText(selector, text);

       } else {
         throw new Error("Text doesn't match.")
       }
     }

     await checkForText(selector, text)

   };

 };