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