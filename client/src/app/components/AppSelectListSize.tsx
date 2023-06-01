import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useController, UseControllerProps} from "react-hook-form";


interface MyType {
    productId?: number;
    id?: number;
    name?: string;
    sizeOfProduct?: string;
}

interface Props extends UseControllerProps {
    label: string;
    items: MyType[];
}

export default function AppSelectListSize(props: Props) {
    
    const {fieldState, field} = useController({...props, defaultValue: ''})

    console.log(field.value);

    return (
        <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                value={field.value}
                label={props.label}
                onChange={field.onChange}
            >
                
                 {props.items.map((item, index) => (
                    <MenuItem key={index} value={item.productId || item.id} >{item.name || item.sizeOfProduct}</MenuItem>
                       
                 ))} 
            </Select>
                       
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    )
}


