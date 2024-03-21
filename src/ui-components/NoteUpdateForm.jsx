/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getNote } from "../graphql/queries";
import { updateNote } from "../graphql/mutations";
const client = generateClient();
export default function NoteUpdateForm(props) {
  const {
    id: idProp,
    note: noteModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    item_name: "",
    item_description: "",
    category: "",
    unit_cost: "",
  };
  const [item_name, setItem_name] = React.useState(initialValues.item_name);
  const [item_description, setItem_description] = React.useState(
    initialValues.item_description
  );
  const [category, setCategory] = React.useState(initialValues.category);
  const [unit_cost, setUnit_cost] = React.useState(initialValues.unit_cost);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = noteRecord
      ? { ...initialValues, ...noteRecord }
      : initialValues;
    setItem_name(cleanValues.item_name);
    setItem_description(cleanValues.item_description);
    setCategory(cleanValues.category);
    setUnit_cost(cleanValues.unit_cost);
    setErrors({});
  };
  const [noteRecord, setNoteRecord] = React.useState(noteModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getNote.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getNote
        : noteModelProp;
      setNoteRecord(record);
    };
    queryData();
  }, [idProp, noteModelProp]);
  React.useEffect(resetStateValues, [noteRecord]);
  const validations = {
    item_name: [{ type: "Required" }],
    item_description: [],
    category: [],
    unit_cost: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          item_name,
          item_description: item_description ?? null,
          category: category ?? null,
          unit_cost: unit_cost ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateNote.replaceAll("__typename", ""),
            variables: {
              input: {
                id: noteRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NoteUpdateForm")}
      {...rest}
    >
      <TextField
        label="Item name"
        isRequired={true}
        isReadOnly={false}
        value={item_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              item_name: value,
              item_description,
              category,
              unit_cost,
            };
            const result = onChange(modelFields);
            value = result?.item_name ?? value;
          }
          if (errors.item_name?.hasError) {
            runValidationTasks("item_name", value);
          }
          setItem_name(value);
        }}
        onBlur={() => runValidationTasks("item_name", item_name)}
        errorMessage={errors.item_name?.errorMessage}
        hasError={errors.item_name?.hasError}
        {...getOverrideProps(overrides, "item_name")}
      ></TextField>
      <TextField
        label="Item description"
        isRequired={false}
        isReadOnly={false}
        value={item_description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              item_name,
              item_description: value,
              category,
              unit_cost,
            };
            const result = onChange(modelFields);
            value = result?.item_description ?? value;
          }
          if (errors.item_description?.hasError) {
            runValidationTasks("item_description", value);
          }
          setItem_description(value);
        }}
        onBlur={() => runValidationTasks("item_description", item_description)}
        errorMessage={errors.item_description?.errorMessage}
        hasError={errors.item_description?.hasError}
        {...getOverrideProps(overrides, "item_description")}
      ></TextField>
      <TextField
        label="Category"
        isRequired={false}
        isReadOnly={false}
        value={category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              item_name,
              item_description,
              category: value,
              unit_cost,
            };
            const result = onChange(modelFields);
            value = result?.category ?? value;
          }
          if (errors.category?.hasError) {
            runValidationTasks("category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("category", category)}
        errorMessage={errors.category?.errorMessage}
        hasError={errors.category?.hasError}
        {...getOverrideProps(overrides, "category")}
      ></TextField>
      <TextField
        label="Unit cost"
        isRequired={false}
        isReadOnly={false}
        value={unit_cost}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              item_name,
              item_description,
              category,
              unit_cost: value,
            };
            const result = onChange(modelFields);
            value = result?.unit_cost ?? value;
          }
          if (errors.unit_cost?.hasError) {
            runValidationTasks("unit_cost", value);
          }
          setUnit_cost(value);
        }}
        onBlur={() => runValidationTasks("unit_cost", unit_cost)}
        errorMessage={errors.unit_cost?.errorMessage}
        hasError={errors.unit_cost?.hasError}
        {...getOverrideProps(overrides, "unit_cost")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || noteModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || noteModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
