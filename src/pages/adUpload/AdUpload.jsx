import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonSubmit from "../../common/button/ButtonSubmit";

const AdUploadForm = () => {
  const [formData, setFormData] = useState({
    purpose: "",
    propertyType: "",
    description: "",
    area: "",
    price: "",
    regions: [],
    images: null,
  });

  // State to hold dropdown data
  const [purposes, setPurposes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [areas, setAreas] = useState([]);

  // Fetching data from the server using Axios
  useEffect(() => {
    // Fetch Purpose data from local JSON
    axios
      .get("/data/transactionTypes.json")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPurposes(response.data);
        } else {
          console.error("Invalid data structure for purposes");
        }
      })
      .catch((error) => console.error("Error fetching purposes:", error));

    // Fetch Property Type data from local JSON
    axios
      .get("/data/propertyTypes.json")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPropertyTypes(response.data);
        } else {
          console.error("Invalid data structure for property types");
        }
      })
      .catch((error) => console.error("Error fetching property types:", error));

    // Fetch Area data from local JSON
    axios
      .get("/data/regions.json")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAreas(response.data);
        } else {
          console.error("Invalid data structure for areas");
        }
      })
      .catch((error) => console.error("Error fetching areas:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => {
      const newRegions = prev.regions.includes(value)
        ? prev.regions.filter((region) => region !== value)
        : [...prev.regions, value];
      return { ...prev, regions: newRegions };
    });
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  return (
    <div className="mx-auto mt-16 h-screen max-w-3xl p-8">
      <h1 className="mb-6 text-center text-2xl font-bold">Ad Upload Steps</h1>

      <form className="space-y-4">
        {/* Purpose Dropdown */}
        <div>
          <label className="block text-sm font-medium">Purpose</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border p-2"
          >
            <option value="">Select Purpose</option>
            {purposes.length > 0 ? (
              purposes.map((purpose) => (
                <option key={purpose.id} value={purpose.id}>
                  {purpose.name}
                </option>
              ))
            ) : (
              <option disabled>Loading purposes...</option>
            )}
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div>
          <label className="block text-sm font-medium"></label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border p-2"
          >
            <option value="all">Property Type</option>
            {propertyTypes.length > 0 ? (
              propertyTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))
            ) : (
              <option disabled>Loading property types...</option>
            )}
          </select>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border p-2"
            placeholder="Add a description"
          />
        </div>

        {/* Area Dropdown */}
        <div>
          <label className="block text-sm font-medium">Area</label>
          <select
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border p-2"
          >
            <option value="">Select Area</option>
            {areas.length > 0 ? (
              areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name} ({area.count})
                </option>
              ))
            ) : (
              <option disabled>Loading areas...</option>
            )}
          </select>
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium">Price (KD)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border p-2"
            placeholder="Price in KD"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium">
            Upload Image or Video
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        {/* Submit Button */}
        <div>
          <ButtonSubmit
            text="Upload Your Advertising"
            className="!w-full"
          ></ButtonSubmit>
        </div>
      </form>
    </div>
  );
};

export default AdUploadForm;
