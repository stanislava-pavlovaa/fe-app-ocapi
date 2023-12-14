import { useState } from 'react';
import Button from 'react-bootstrap/Button';


const VariationAttributes = ({ variatonAttributes, onSelectionChange }) => {
  const [selectedVariations, setSelectedVariations] = useState({});

  const handleSelectionChange = (name, value) => {
    setSelectedVariations((prevSelections) => ({
      ...prevSelections,
      [name]: value,
    }));

    if (onSelectionChange) {
      onSelectionChange(name, value);
    }
  };

  return (
    <div className="my-3">
      {variatonAttributes.map((attribute) => (
        <div key={attribute.id} className="mb-3">
          <strong className="mx-2">{attribute.name}:</strong>
          <div className="btn-group ml-2" role="group">
            {attribute.values
              .filter((value) => value.orderable)
              .map((value) => (
                <Button
                  key={value.value}
                  type="button"
                  variant="outline-danger"
                  className={`btn mx-1 ${
                    selectedVariations[attribute.id] === value.value ? 'active' : ''
                  }`}
                  onClick={() => handleSelectionChange(attribute.id, value.value)}
                >
                  {value.name}
                </Button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariationAttributes;

// import { useState } from 'react';

// const VariationAttributes = ({ variatonAttributes, onSizeChange }) => {
//   const [selectedSize, setSelectedSize] = useState('');
//   console.log(variatonAttributes)
//   const handleSizeChange = (event) => {
//     const newSize = event.target.value;
//     setSelectedSize(newSize);
//     onSizeChange(newSize);
//   };

//   return (
//     <div>
//       {variatonAttributes.map((attribute, index) => {
//         if (attribute.values && attribute.values.length > 0) {
//           return (
//             <div key={attribute.id} className='mb-3'>
//               <label htmlFor={attribute.id} className='form-label'>
//                 {attribute.name}
//               </label>
//               <select
//                 id={attribute.id}
//                 className='form-select'
//                 onChange={handleSizeChange}
//                 value={selectedSize}
//               >
//                 <option value=''>Select {attribute.name}</option>
//                 {attribute.values.map((value) => (
//                   <option key={value.value} value={value.value}>
//                     {value.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>
//   );
// };

// export default VariationAttributes;
