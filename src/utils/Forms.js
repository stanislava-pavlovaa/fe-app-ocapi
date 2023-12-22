export const createAddressBody = (formData) => {
  return {
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone: formData.phone,
    address1: formData.address1,
    city: formData.city,
    country_code: formData.countryCode,
    postal_code: formData.postalCode,
  };
};

export const createPaymentBody = (amount, formData, cardType) => {
  return {
    amount: amount,
    payment_card: {
      number: formData.cardNumber,
      expiration_month: parseInt(formData.expirationMonth),
      expiration_year: parseInt(formData.expirationYear),
      security_code: formData.securityCode,
      card_type: cardType,
    },
    payment_method_id: 'CREDIT_CARD', 
  };
};
