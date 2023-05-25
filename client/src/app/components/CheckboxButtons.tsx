import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface MyType {
    productTypeId?: number;
    brandId?: number;
    name: string;
}

interface Props {
    item: MyType;
    checked?: string[];
    onChange: (items: string[]) => void;
}



export default function CheckboxButtons({ item, checked, onChange }: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value );
        let newChecked: string[] = [];
        if (currentIndex === -1) newChecked = [...checkedItems,  value];
        else newChecked = checkedItems.filter(i => i !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            
                <FormControlLabel
                    key={item.productTypeId || item.brandId}
                    control={<Checkbox
                        checked={checkedItems.indexOf(item.name) !== -1}
                        onClick={() => handleChecked(item.name)}
                    />}
                    label={item.name} />
                    
        </FormGroup>
    )
}