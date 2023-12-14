export const createAddressBody = (formData) => {
    return {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        address1: formData.address1,
        city: formData.city,
        country_code: formData.countryCode,
        postal_code: formData.postalCode,
    }
}