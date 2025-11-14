const Payment = ({ onBack, paymentData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (paymentData?.payuData && paymentData?.payuUrl) {
      const timer = setTimeout(() => {
        submitToPayU();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [paymentData]);

  const submitToPayU = () => {
    if (!paymentData?.payuData || !paymentData?.payuUrl) {
      setError('Payment data not available');
      return;
    }

    setIsSubmitting(true);
    
    const requiredParams = ['key', 'txnid', 'amount', 'productinfo', 'firstname', 'email', 'phone', 'surl', 'furl', 'hash'];
    const missingParams = requiredParams.filter(param => !paymentData.payuData[param]);
    
    if (missingParams.length > 0) {
      setError(`Missing: ${missingParams.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = paymentData.payuUrl;

    Object.keys(paymentData.payuData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = paymentData.payuData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={onBack} className="px-6 py-2 border rounded-lg">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600">Redirecting to PayU...</p>
      <p className="text-sm text-gray-500 mt-2">Transaction ID: {paymentData?.payuData?.txnid}</p>
    </div>
  );
};
