import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface MyType {
    brandId: number,
    name: string
}

interface Props {
    items: MyType[];
    checked?: MyType[];
    onChange: (items: MyType[]) => void;
}



export default function CheckboxButtons({ items, checked, onChange }: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: MyType) {
        const currentIndex = checkedItems.findIndex(item => item.brandId === value.brandId );
        let newChecked: MyType[] = [];
        if (currentIndex === -1) newChecked = [...checkedItems,  value];
        else newChecked = checkedItems.filter(i => i !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel
                    key={item.brandId}
                    control={<Checkbox
                        checked={checkedItems.indexOf(item) !== -1}
                        onClick={() => handleChecked(item)}
                    />}
                    label={item.name} />
            ))}
        </FormGroup>
    )
}