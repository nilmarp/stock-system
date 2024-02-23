import React from "react";

export default function QuerySelector({ data = [], valueKey, labelKey, editMode = false, value, onChange, required=false }) {
    return (
        <select className="form-select" onChange={onChange} required={required ? 'required' : false}>
            {
                !editMode ? <option value={0}>Escolha um item</option> : null
            }

            {
                data.map(
                    (option) => {
                        if (option[valueKey] == value && editMode) {
                            return <option value={option[valueKey]} selected>{option[labelKey]}</option>
                        } else {
                            return <option value={option[valueKey]}>{option[labelKey]}</option>
                        }
                    }
                )
            }
        </select>
    )
}