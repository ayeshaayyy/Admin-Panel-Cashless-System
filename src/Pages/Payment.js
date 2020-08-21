import React, { Component } from 'react';

function submitForm() {

   CalculateHash();
   var CryptoJS;
   var hashString;
     var IntegritySalt = document.getElementById("salt").innerText;
     var hash = CryptoJS.HmacSHA256(document.getElementById("hashValuesString").value, IntegritySalt);
     document.getElementsByName("pp_SecureHash")[0].value = hash + '';

    console.log('string: ' + hashString);
     console.log('hash: ' + document.getElementsByName("pp_SecureHash")[0].value);

     document.jsform.submit();
 }

 function CalculateHash() {
   var IntegritySalt = document.getElementById("salt").innerText;
    var hashString = '';

   hashString += IntegritySalt + '&';

   if (document.getElementsByName("pp_Amount")[0].value != '') {
       hashString += document.getElementsByName("pp_Amount")[0].value + '&';
   }
   if (document.getElementsByName("pp_BankID")[0].value != '') {
       hashString += document.getElementsByName("pp_BankID")[0].value + '&';
   }
   if (document.getElementsByName("pp_BillReference")[0].value != '') {
       hashString += document.getElementsByName("pp_BillReference")[0].value + '&';
   }
   if (document.getElementsByName("pp_Description")[0].value != '') {
       hashString += document.getElementsByName("pp_Description")[0].value + '&';
   }
   if (document.getElementsByName("pp_Language")[0].value != '') {
       hashString += document.getElementsByName("pp_Language")[0].value + '&';
   }
   if (document.getElementsByName("pp_MerchantID")[0].value != '') {
       hashString += document.getElementsByName("pp_MerchantID")[0].value + '&';
   }
   if (document.getElementsByName("pp_Password")[0].value != '') {
       hashString += document.getElementsByName("pp_Password")[0].value + '&';
   }
   if (document.getElementsByName("pp_ProductID")[0].value != '') {
       hashString += document.getElementsByName("pp_ProductID")[0].value + '&';
   }
   if (document.getElementsByName("pp_ReturnURL")[0].value != '') {
       hashString += document.getElementsByName("pp_ReturnURL")[0].value + '&';
   }
   if (document.getElementsByName("pp_SubMerchantID")[0].value != '') {
       hashString += document.getElementsByName("pp_SubMerchantID")[0].value + '&';
   }
   if (document.getElementsByName("pp_TxnCurrency")[0].value != '') {
       hashString += document.getElementsByName("pp_TxnCurrency")[0].value + '&';
   }
   if (document.getElementsByName("pp_TxnDateTime")[0].value != '') {
       hashString += document.getElementsByName("pp_TxnDateTime")[0].value + '&';
   }
   if (document.getElementsByName("pp_TxnExpiryDateTime")[0].value != '') {
       hashString += document.getElementsByName("pp_TxnExpiryDateTime")[0].value + '&';
   }
   if (document.getElementsByName("pp_TxnRefNo")[0].value != '') {
       hashString += document.getElementsByName("pp_TxnRefNo")[0].value + '&';
   }
   if (document.getElementsByName("pp_TxnType")[0].value != '') {
       hashString += document.getElementsByName("pp_TxnType")[0].value + '&';
   }
   if (document.getElementsByName("pp_Version")[0].value != '') {
       hashString += document.getElementsByName("pp_Version")[0].value + '&';
   }
   if (document.getElementsByName("ppmpf_1")[0].value != '') {
       hashString += document.getElementsByName("ppmpf_1")[0].value + '&';
   }
   if (document.getElementsByName("ppmpf_2")[0].value != '') {
       hashString += document.getElementsByName("ppmpf_2")[0].value + '&';
   }
   if (document.getElementsByName("ppmpf_3")[0].value != '') {
       hashString += document.getElementsByName("ppmpf_3")[0].value + '&';
   }
   if (document.getElementsByName("ppmpf_4")[0].value != '') {
       hashString += document.getElementsByName("ppmpf_4")[0].value + '&';
   }
   if (document.getElementsByName("ppmpf_5")[0].value != '') {
       hashString += document.getElementsByName("ppmpf_5")[0].value + '&';
   }

   hashString = hashString.slice(0, -1);
   document.getElementById("hashValuesString").value = hashString;
   }
class Payment extends React.Component {
    render(){
       return (
        <main id="content" className="p-5">
    
        <div class="right">
            
        
         <h3>JazzCash HTTP POST (Page Redirection) Testing</h3>
         <div className="jsformWrapper">
           <form name="jsform" method="post" action="http://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/">
             <input type="hidden" name="pp_Version" defaultValue="1.1" />
             <input type="hidden" name="pp_TxnType" defaultValue />
             <input type="hidden" name="pp_Language" defaultValue="EN" />
             <input type="hidden" name="pp_MerchantID" defaultValue="MC37476" />
             <input type="hidden" name="pp_SubMerchantID" defaultValue />
             <input type="hidden" name="pp_Password" defaultValue="s338y22350" />
             <input type="hidden" name="pp_BankID" defaultValue="TBANK" />
             <input type="hidden" name="pp_ProductID" defaultValue="RETL" />
             <div className="formFielWrapper">
               <label className="active">pp_TxnRefNo: </label>
               <input type="text" name="pp_TxnRefNo" id="pp_TxnRefNo" defaultValue="T20200502114616" />
             </div>
             <div className="formFielWrapper">
               <label className="active">pp_Amount: </label>
               <input type="text" name="pp_Amount" defaultValue={1000} />
             </div>
             <input type="hidden" name="pp_TxnCurrency" defaultValue="PKR" />
             <input type="hidden" name="pp_TxnDateTime" defaultValue={20200502114616} />
             <div className="formFielWrapper">
               <label className="active">pp_BillReference: </label>
               <input type="text" name="pp_BillReference" defaultValue="billRef" />
             </div>
             <div className="formFielWrapper">
               <label className="active">pp_Description: </label>
               <input type="text" name="pp_Description" defaultValue="Description of transaction" />
             </div>
             <input type="hidden" name="pp_TxnExpiryDateTime" defaultValue={20200503114616} />
             <div className="formFielWrapper">
               <label className="active">pp_ReturnURL: </label>
               <input type="text" name="pp_ReturnURL" defaultValue="https://www.youtube.com/watch?v=lkA4rmo7W6k" />
             </div>
             <input type="hidden" name="pp_SecureHash" defaultValue />
             <input type="hidden" name="ppmpf_1" defaultValue={1} />
             <input type="hidden" name="ppmpf_2" defaultValue={2} />
             <input type="hidden" name="ppmpf_3" defaultValue={3} />
             <input type="hidden" name="ppmpf_4" defaultValue={4} />
             <input type="hidden" name="ppmpf_5" defaultValue={5} />
             <button type="button" onclick={'submitForm()'}>Submit</button>
           </form>
           <label id="salt" style={{display: 'none'}}>0t1dw22314</label>
           <br /><br />
           <div className="formFielWrapper">
             <label className="active">Hash values string: </label>
             <input type="text" id="hashValuesString" defaultValue />
             <br /><br />
           </div>
         </div>
       </div>
 </main>
       );
    }
 }
 export default Payment;
 