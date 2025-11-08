import React, { useEffect, useState } from 'react';

const Payment = ({ onBack, onPaymentSuccess, paymentData, plan }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (paymentData?.payuData && paymentData?.payuUrl) {
      submitToPayU();
    } else {
      console.log("No payment data available");
    }
  }, [paymentData]);

  const submitToPayU = () => {
    if (!paymentData?.payuData || !paymentData?.payuUrl) {
      alert('Payment data not available');
      return;
    }

    setIsSubmitting(true);
    
    const requiredParams = ['key', 'txnid', 'amount', 'productinfo', 'firstname', 'email', 'phone', 'surl', 'furl', 'hash'];
    const missingParams = requiredParams.filter(param => !paymentData.payuData[param]);
    
    if (missingParams.length > 0) {
      alert(`Missing required parameters: ${missingParams.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = paymentData.payuUrl;
    form.style.display = 'none';

    Object.keys(paymentData.payuData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = paymentData.payuData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    
    setTimeout(() => {
      form.submit();
    }, 100);
  };

  const handleManualPayment = () => {
    submitToPayU();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isSubmitting ? "Redirecting to PayU..." : "Ready for Payment"}
        </h2>
        
        {!isSubmitting ? (
          <>
            <p className="text-gray-600 mb-6">
              You will be redirected to PayU payment gateway for secure payment processing.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Transaction ID:</strong> {paymentData?.payuData?.txnid}<br/>
                <strong>Amount:</strong> ₹{paymentData?.payuData?.amount}<br/>
                <strong>Plan:</strong> {paymentData?.payuData?.productinfo}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleManualPayment}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Proceed to PayU
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                Please wait while we redirect you to PayU...
              </p>
            </div>
            
            <div className="mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 text-sm mt-2">Redirecting to payment gateway...</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
