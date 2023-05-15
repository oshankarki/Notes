export const validate = (formData) => {
    const errors = {};

    // Validate MSSubClass
    if (!formData.MSSubClass) {
        errors.MSSubClass = "Building Type is required";
    } else if (formData.MSSubClass < 1 || formData.MSSubClass > 200) {
        errors.MSSubClass = "Building Type must be a number between 1 and 200";
    }

    // Validate MSZoning
    if (!formData.MSZoning) {
        errors.MSZoning = "Zoning Classification is required";
    }

    // Validate LotArea
    if (!formData.LotArea) {
        errors.LotArea = "Lot Size is required";
    }

    // Validate Street
    if (!formData.Street) {
        errors.Street = "Type of Road Access is required";
    }

    // Validate LandSlope
    if (!formData.LandSlope) {
        errors.LandSlope = "LandSlope is required";
    }

    // Validate BldgType
    if (!formData.BldgType) {
        errors.BldgType = "Dwelling Type is required";
    }

    // Validate OverallQual
    if (!formData.OverallQual) {
        errors.OverallQual = "Material and Finish Quality is required";
    } else if (formData.OverallQual < 1 || formData.OverallQual > 10) {
        errors.OverallQual = "Material and Finish Quality must be between 1 and 10";
    }

    // Validate OverallCond
    if (!formData.OverallCond) {
        errors.OverallCond = "Property Condition is required";
    } else if (formData.OverallCond < 1 || formData.OverallCond > 9) {
        errors.OverallCond = "Property Condition must be between 1 and 9";
    }

    // Validate RoofStyle
    if (!formData.RoofStyle) {
        errors.RoofStyle = "Roof Type is required";
    }

    // Validate BedroomAbvGr
    if (!formData.BedroomAbvGr) {
        errors.BedroomAbvGr = "Number of Bedrooms is required";
    }

    // Validate KitchenQual
    if (!formData.KitchenQual) {
        errors.KitchenQual = "Kitchen Quality is required";
    }

    // Validate TotRmsAbvGrd
    if (!formData.TotRmsAbvGrd) {
        errors.TotRmsAbvGrd = "Number of Rooms is required";
    }

    // Validate SaleType
    if (!formData.SaleType) {
        errors.SaleType = "SaleType is required";
    }
    return errors;
};
export default validate;