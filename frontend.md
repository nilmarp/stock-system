# Front Docs

### Query Selector Component

``` components/QuerySelector/index.js ```

Usage:

```javascript

import QuerySelector from "Put the PATH .../components/QuerySelector"

<QuerySelector
    data={[{id: 1, item: 'anselmo'}, {id: 2, item: 'jessica'}]} // data field   : you must declare a array of objects
    labelKey={'item'}                                           // label key    : you must declare a name (string) of key of the object that contains the "main name" of your option 
    valueKey={'id'}                                             // value key    : you must declare a name (string) of key of the object that contains the "main value" of your option
    value={2}                                                   // value field  : you can declare the value delivered from you register
    editMode={true}                                             // edit mode    : you can declare if your component is used in edit mode (the edit mode mark the value field like default selected)
    onChange={(e)=>console.log(e?.target?.value)}               // onChage      : to capture the change event of this component
    />

```

the building

```javascript

import React from "react";

export default function QuerySelector({ data = [], valueKey, labelKey, editMode = false, value, onChange }) {
    return (
        <select className="form-select" onChange={onChange}>
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

```