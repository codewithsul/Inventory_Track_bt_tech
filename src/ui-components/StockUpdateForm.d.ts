/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type StockUpdateFormInputValues = {
    item_name?: string;
    item_description?: string;
    category?: string;
    unit_cost?: string;
};
export declare type StockUpdateFormValidationValues = {
    item_name?: ValidationFunction<string>;
    item_description?: ValidationFunction<string>;
    category?: ValidationFunction<string>;
    unit_cost?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StockUpdateFormOverridesProps = {
    StockUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    item_name?: PrimitiveOverrideProps<TextFieldProps>;
    item_description?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    unit_cost?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StockUpdateFormProps = React.PropsWithChildren<{
    overrides?: StockUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    stock?: any;
    onSubmit?: (fields: StockUpdateFormInputValues) => StockUpdateFormInputValues;
    onSuccess?: (fields: StockUpdateFormInputValues) => void;
    onError?: (fields: StockUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StockUpdateFormInputValues) => StockUpdateFormInputValues;
    onValidate?: StockUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StockUpdateForm(props: StockUpdateFormProps): React.ReactElement;
